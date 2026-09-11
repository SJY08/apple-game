import { COLS, PixelRect, Point, ROWS } from "../types/game"

export const CELL = 48
export const GAP = 12
export const STEP = CELL + GAP
export const BOARD_WIDTH = COLS * CELL + (COLS - 1) * GAP
export const BOARD_HEIGHT = ROWS * CELL + (ROWS - 1) * GAP
export const DRAG_MARGIN = 56

export function cellPosition(row: number, col: number): Point {
    return { x: col * STEP, y: row * STEP }
}

export function cellCenter(row: number, col: number): Point {
    return { x: col * STEP + CELL / 2, y: row * STEP + CELL / 2 }
}

export function clampToBoard(point: Point): Point {
    return {
        x: Math.min(BOARD_WIDTH + DRAG_MARGIN, Math.max(-DRAG_MARGIN, point.x)),
        y: Math.min(BOARD_HEIGHT + DRAG_MARGIN, Math.max(-DRAG_MARGIN, point.y)),
    }
}

export function rectFromPoints(a: Point, b: Point): PixelRect {
    return {
        x: Math.min(a.x, b.x),
        y: Math.min(a.y, b.y),
        width: Math.abs(a.x - b.x),
        height: Math.abs(a.y - b.y),
    }
}

export function containsPoint(rect: PixelRect, point: Point): boolean {
    return point.x >= rect.x && point.x <= rect.x + rect.width && point.y >= rect.y && point.y <= rect.y + rect.height
}
