import { PointerEvent, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Cell, COLS, PixelRect, Point, ROWS } from '../types/game';
import { BOARD_HEIGHT, BOARD_WIDTH, CELL, DRAG_MARGIN, GAP } from '../utils/geometry';
import { AppleTile } from './AppleTile';

type GameBoardProps = {
  board: Cell[];
  selection: PixelRect | null;
  selectedIds: Set<number>;
  active: boolean;
  onDragStart: (point: Point) => void;
  onDragMove: (point: Point) => void;
  onDragEnd: () => void;
};

/** 사과 게임판 컴포넌트 */
export function GameBoard({
  board,
  selection,
  selectedIds,
  active,
  onDragStart,
  onDragMove,
  onDragEnd
}: GameBoardProps) {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const dragging = useRef(false);

  const pointFromEvent = useCallback((event: PointerEvent): Point | null => {
    const el = gridRef.current;
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }, []);

  const handlePointerDown = (event: PointerEvent) => {
    if (!active || event.button !== 0) return;
    const point = pointFromEvent(event);
    if (!point) return;
    dragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    onDragStart(point);
  };

  const handlePointerMove = (event: PointerEvent) => {
    if (!dragging.current) return;
    const point = pointFromEvent(event);
    if (point) onDragMove(point);
  };

  const finishDrag = (event: PointerEvent) => {
    if (!dragging.current) return;
    dragging.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    onDragEnd();
  };

  return (
    <div
      role="application"
      aria-label="사과 게임판. 마우스로 드래그해 영역을 선택하세요."
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={finishDrag}
      onPointerCancel={finishDrag}
      className="no-select cursor-default"
      style={{ padding: DRAG_MARGIN, touchAction: 'none' }}>
      
      <div
        ref={gridRef}
        className="relative"
        style={{
          width: BOARD_WIDTH,
          height: BOARD_HEIGHT,
          display: 'grid',
          gridTemplateColumns: `repeat(${COLS}, ${CELL}px)`,
          gridTemplateRows: `repeat(${ROWS}, ${CELL}px)`,
          gap: GAP
        }}>
        
        {board.map((cell) =>
        <AppleTile
          key={cell.id}
          value={cell.value}
          selected={selectedIds.has(cell.id)}
          interactive={active}
          exitDelay={cell.id % COLS * 0.012} />

        )}

        <AnimatePresence>
          {selection &&
          <motion.div
            key="selection"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12, ease: [0.23, 1, 0.32, 1] }}
            className="pointer-events-none absolute rounded-md border-2 border-apple-500"
            style={{
              left: selection.x,
              top: selection.y,
              width: selection.width,
              height: selection.height,
              backgroundColor: 'rgba(224, 57, 47, 0.12)'
            }} />

          }
        </AnimatePresence>
      </div>
    </div>);

}