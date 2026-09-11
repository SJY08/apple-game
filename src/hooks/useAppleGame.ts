import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Cell, Phase, PixelRect, Point, TARGET_SUM } from '../types/game';
import { applesInRect, clearApples, createBoard, hasPossibleMove, sumOf } from '../utils/board';
import { clampToBoard, rectFromPoints } from '../utils/geometry';
import { playPopSound } from '../utils/sound';
import { loadBestScore, saveBestScore } from '../utils/storage';

export type AppleGame = {
  phase: Phase;
  board: Cell[];
  score: number;
  bestScore: number;
  timeLeft: number;
  isNewBest: boolean;
  selection: PixelRect | null;
  selectedIds: Set<number>;
  startGame: () => void;
  goToStart: () => void;
  beginDrag: (point: Point) => void;
  updateDrag: (point: Point) => void;
  endDrag: () => void;
};

const EMPTY_IDS: Set<number> = new Set();
const NO_MOVES_WARNING_DELAY_MS = 2000;
const NO_MOVES_DISPLAY_MS = 3000;

export function useAppleGame(roundSeconds: number): AppleGame {
  const [phase, setPhase] = useState<Phase>('start');
  const [board, setBoard] = useState<Cell[]>(() => createBoard());
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState<number>(() => loadBestScore());
  const [timeLeft, setTimeLeft] = useState(roundSeconds);
  const [isNewBest, setIsNewBest] = useState(false);
  const [anchor, setAnchor] = useState<Point | null>(null);
  const [cursor, setCursor] = useState<Point | null>(null);

  const scoreRef = useRef(score);
  scoreRef.current = score;
  const bestRef = useRef(bestScore);
  bestRef.current = bestScore;
  const deadlineRef = useRef<number>(Date.now() + roundSeconds * 1000);
  const stuckTimeoutRef = useRef<number | null>(null);

  const selection = useMemo(
    () => anchor && cursor ? rectFromPoints(anchor, cursor) : null,
    [anchor, cursor]
  );

  const selectedIds = useMemo(
    () => selection ? applesInRect(board, selection) : EMPTY_IDS,
    [board, selection]
  );

  const selectionSum = useMemo(() => sumOf(board, selectedIds), [board, selectedIds]);

  const clearStuckTimeout = useCallback(() => {
    if (stuckTimeoutRef.current != null) {
      window.clearTimeout(stuckTimeoutRef.current);
      stuckTimeoutRef.current = null;
    }
  }, []);

  const endGame = useCallback(() => {
    clearStuckTimeout();
    setPhase('over');
    setAnchor(null);
    setCursor(null);
    const finalScore = scoreRef.current;
    if (finalScore > bestRef.current) {
      setBestScore(finalScore);
      saveBestScore(finalScore);
      setIsNewBest(true);
    } else {
      setIsNewBest(false);
    }
  }, [clearStuckTimeout]);

  useEffect(() => () => clearStuckTimeout(), [clearStuckTimeout]);

  useEffect(() => {
    if (phase !== 'playing') return;
    const tick = () => {
      const remaining = Math.max(0, Math.ceil((deadlineRef.current - Date.now()) / 1000));
      setTimeLeft(remaining);
    };
    tick();
    const id = window.setInterval(tick, 250);
    document.addEventListener('visibilitychange', tick);
    return () => {
      window.clearInterval(id);
      document.removeEventListener('visibilitychange', tick);
    };
  }, [phase]);

  useEffect(() => {
    if (phase === 'playing' && timeLeft === 0) endGame();
  }, [phase, timeLeft, endGame]);

  const startGame = useCallback(() => {
    clearStuckTimeout();
    setBoard(createBoard());
    setScore(0);
    deadlineRef.current = Date.now() + roundSeconds * 1000;
    setTimeLeft(roundSeconds);
    setAnchor(null);
    setCursor(null);
    setIsNewBest(false);
    setPhase('playing');
  }, [roundSeconds, clearStuckTimeout]);

  const goToStart = useCallback(() => {
    clearStuckTimeout();
    setAnchor(null);
    setCursor(null);
    setPhase('start');
  }, [clearStuckTimeout]);

  const beginDrag = useCallback(
    (point: Point) => {
      if (phase !== 'playing') return;
      const safe = clampToBoard(point);
      setAnchor(safe);
      setCursor(safe);
    },
    [phase]
  );

  const updateDrag = useCallback(
    (point: Point) => {
      if (phase !== 'playing') return;
      setCursor(clampToBoard(point));
    },
    [phase]
  );

  const endDrag = useCallback(() => {
    if (phase === 'playing' && selectedIds.size > 0 && selectionSum === TARGET_SUM) {
      const cleared = selectedIds.size;
      const nextBoard = clearApples(board, selectedIds);
      playPopSound();
      setBoard(nextBoard);
      setScore((prev) => prev + cleared);
      if (!hasPossibleMove(nextBoard)) {
        stuckTimeoutRef.current = window.setTimeout(() => {
          setPhase('stuck');
          stuckTimeoutRef.current = window.setTimeout(endGame, NO_MOVES_DISPLAY_MS);
        }, NO_MOVES_WARNING_DELAY_MS);
      }
    }
    setAnchor(null);
    setCursor(null);
  }, [phase, board, selectedIds, selectionSum, endGame]);

  return {
    phase,
    board,
    score,
    bestScore,
    timeLeft,
    isNewBest,
    selection,
    selectedIds,
    startGame,
    goToStart,
    beginDrag,
    updateDrag,
    endDrag
  };
}