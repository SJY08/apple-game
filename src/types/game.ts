export const COLS = 17;
export const ROWS = 10;
export const TARGET_SUM = 10;

export type Cell = {
  id: number;
  value: number | null;
};

export type PixelRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type Point = {
  x: number;
  y: number;
};

export type Phase = 'start' | 'playing' | 'stuck' | 'over';