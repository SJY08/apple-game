import { Cell, COLS, PixelRect, ROWS, TARGET_SUM } from '../types/game';
import { cellCenter, containsPoint } from './geometry';

export function createBoard(): Cell[] {
  const cells: Cell[] = [];
  for (let i = 0; i < ROWS * COLS; i++) {
    cells.push({
      id: i,
      value: 1 + Math.floor(Math.random() * 9)
    });
  }
  return cells;
}

export function rowOf(id: number): number {
  return Math.floor(id / COLS);
}

export function colOf(id: number): number {
  return id % COLS;
}

export function applesInRect(board: Cell[], rect: PixelRect): Set<number> {
  const ids = new Set<number>();
  for (const cell of board) {
    if (cell.value == null) continue;
    if (containsPoint(rect, cellCenter(rowOf(cell.id), colOf(cell.id)))) {
      ids.add(cell.id);
    }
  }
  return ids;
}

export function sumOf(board: Cell[], ids: Set<number>): number {
  let sum = 0;
  for (const id of ids) {
    sum += board[id]?.value ?? 0;
  }
  return sum;
}

export function clearApples(board: Cell[], ids: Set<number>): Cell[] {
  return board.map((cell) => ids.has(cell.id) ? { ...cell, value: null } : cell);
}

export function hasPossibleMove(board: Cell[]): boolean {
  const prefix: number[][] = Array.from({ length: ROWS + 1 }, () => new Array(COLS + 1).fill(0));
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const value = board[r * COLS + c]?.value ?? 0;
      prefix[r + 1][c + 1] = value + prefix[r][c + 1] + prefix[r + 1][c] - prefix[r][c];
    }
  }

  const sumRegion = (r1: number, c1: number, r2: number, c2: number) =>
    prefix[r2 + 1][c2 + 1] - prefix[r1][c2 + 1] - prefix[r2 + 1][c1] + prefix[r1][c1];

  for (let r1 = 0; r1 < ROWS; r1++) {
    for (let r2 = r1; r2 < ROWS; r2++) {
      for (let c1 = 0; c1 < COLS; c1++) {
        for (let c2 = c1; c2 < COLS; c2++) {
          if (sumRegion(r1, c1, r2, c2) === TARGET_SUM) return true;
        }
      }
    }
  }
  return false;
}