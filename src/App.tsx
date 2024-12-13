import { useState } from "react";
import "./App.css";
import GameBoard from "./components/game-board/GameBoard";
import Log from "./components/log/Log";
import Player from "./components/player/Player";
import {
  CellValue,
  GameBoard as GameBoardInterface,
  GameLog,
  Player as PlayerInterface,
} from "./interfaces";
import {
  INITIAL_GAME_BOARD,
  INITIAL_PLAYERS,
  WINNING_COMBINATIONS,
} from "./components/constants";
import GameOver from "./components/game-over/GameOver";

function getActivePlayer(logs: GameLog[]): CellValue {
  let currentPlayer: CellValue = CellValue.X;

  if (logs.length > 0 && logs[0].player.symbol === "X") {
    currentPlayer = CellValue.O;
  }

  return currentPlayer;
}

function getGameBoard(logs: GameLog[]): GameBoardInterface {
  const board = [...INITIAL_GAME_BOARD.map((row) => [...row])];

  logs.forEach(({ square, player }) => {
    board[square.row][square.col] = player.symbol;
  });

  return board as GameBoardInterface;
}

function getWinner(board: GameBoardInterface, players: PlayerInterface): string | undefined {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = board[combination[0].row][combination[0].column];
    const secondSquareSymbol = board[combination[1].row][combination[1].column];
    const thirdSquareSymbol = board[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
}

function App() {
  const [players, setPlayers] = useState<PlayerInterface>(INITIAL_PLAYERS);
  const [logs, setLogs] = useState<GameLog[]>([]);

  const activePlayer = getActivePlayer(logs);
  const board: GameBoardInterface = getGameBoard(logs);
  const winner: string | undefined = getWinner(board, players);
  const isGameFinished: boolean = logs.length === 9;

  function handleSelectSquare(rowIndex: number, colIndex: number): void {
    setLogs((prevLogs) => {
      const activePlayer = getActivePlayer(prevLogs);
      const newLog: GameLog = {
        square: { row: rowIndex, col: colIndex },
        player: { name: players[activePlayer], symbol: activePlayer },
      };

      return [newLog, ...prevLogs];
    });
  }

  function handleNameChange(symbol: CellValue, newName: string): void {
    setPlayers((players) => ({
      ...players,
      [symbol]: newName,
    }));
  }

  function restart(): void {
    setLogs(() => []);
  }

  return (
    <>
      <header className="d-flex justify-content-center align-items-center flex-column">
        <img className="logo" src="src/assets/download.png" alt="Tik Tac Toe" />
        <h1 className="text-dark">Tic Tac Toe</h1>
      </header>
      <main className="row position-relative">
        <div className="col"></div>
        <div className="col-6">
          <div className="game-container">
            <div className="players">
              <Player
                name={INITIAL_PLAYERS[CellValue.X]}
                symbol={CellValue.X}
                isActive={activePlayer === CellValue.X}
                onChangeName={handleNameChange}
              />
              <Player
                name={INITIAL_PLAYERS[CellValue.O]}
                symbol={CellValue.O}
                isActive={activePlayer === CellValue.O}
                onChangeName={handleNameChange}
              />
            </div>

            {(winner || isGameFinished) && (
              <GameOver winner={winner} restart={restart} />
            )}
            <GameBoard board={board} onSelectSquare={handleSelectSquare} />
          </div>
        </div>
        <div className="col">
          <Log logs={logs} />
        </div>
      </main>
    </>
  );
}

export default App;
