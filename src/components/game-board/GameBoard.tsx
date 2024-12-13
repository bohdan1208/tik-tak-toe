import { GameBoard as GameBoardType } from "../../interfaces";
import "./GameBoard.css";

type GameBoardProps = {
  board: GameBoardType;
  onSelectSquare: (rowIndex: number, colIndex: number) => void;
};

export default function GameBoard({ board, onSelectSquare }: GameBoardProps) {
  return (
    <ol className="board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSmb, colIndex) => (
              <li
                key={colIndex}
                className="cell"
                onClick={
                  !playerSmb
                    ? () => onSelectSquare(rowIndex, colIndex)
                    : undefined
                }
              >
                {playerSmb}
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
