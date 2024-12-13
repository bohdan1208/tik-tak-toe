export type GameBoardValue = CellValue | null;

export enum CellValue {
  X = "X",
  O = "O",
};

export type GameBoard = [
  [GameBoardValue, GameBoardValue, GameBoardValue],
  [GameBoardValue, GameBoardValue, GameBoardValue],
  [GameBoardValue, GameBoardValue, GameBoardValue]
];

export interface GameLog {
  square: {row: number, col: number};
  player: {name: string, symbol: GameBoardValue}
}

export type Player = {
  [key in CellValue]: string;
}
