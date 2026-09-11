import { AnimatePresence } from 'framer-motion';
import { GameBoard } from './components/GameBoard';
import { GameOverScreen } from './components/GameOverScreen';
import { NoMovesModal } from './components/NoMovesModal';
import { StartScreen } from './components/StartScreen';
import { StatusBar } from './components/StatusBar';
import { useAppleGame } from './hooks/useAppleGame';
import { BOARD_WIDTH, DRAG_MARGIN } from './utils/geometry';

type AppProps = {
  roundSeconds?: number;
};

/** 사과 게임 메인 페이지 */
export function App({ roundSeconds = 120 }: AppProps) {
  const game = useAppleGame(roundSeconds);
  const playing = game.phase === 'playing';

  return (
    <div className="relative flex min-h-full w-full items-center justify-center bg-apple-50 p-8">
      {game.phase === 'start' ?
      <StartScreen
        bestScore={game.bestScore}
        roundSeconds={roundSeconds}
        onStart={game.startGame} /> :


      <div
        className="flex flex-col items-center"
        style={{ width: BOARD_WIDTH + DRAG_MARGIN * 2 }}>

          <div className="no-select pointer-events-none w-full px-14">
            <StatusBar
            score={game.score}
            bestScore={game.bestScore}
            timeLeft={game.timeLeft}
            roundSeconds={roundSeconds}
            onHome={game.goToStart} />
          
          </div>

          <GameBoard
          board={game.board}
          selection={game.selection}
          selectedIds={game.selectedIds}
          active={playing}
          onDragStart={game.beginDrag}
          onDragMove={game.updateDrag}
          onDragEnd={game.endDrag} />
        

          <p className="no-select pointer-events-none px-14 text-center text-xs text-stone-400">
            마우스 왼쪽 버튼을 누른 채 드래그해 사과를 감싸세요. 선택된 사과 숫자의 합이 정확히
            10이면 사라집니다.
          </p>
        </div>
      }

      <AnimatePresence>
        {game.phase === 'stuck' && <NoMovesModal />}
      </AnimatePresence>

      <AnimatePresence>
        {game.phase === 'over' &&
        <GameOverScreen
          score={game.score}
          bestScore={game.bestScore}
          isNewBest={game.isNewBest}
          onRestart={game.startGame}
          onHome={game.goToStart} />

        }
      </AnimatePresence>
    </div>);

}