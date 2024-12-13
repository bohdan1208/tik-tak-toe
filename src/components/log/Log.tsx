import "./Log.css";
import { GameLog } from "../../interfaces";

type LogProps = {
  logs: GameLog[];
};

export default function Log({ logs }: LogProps) {
  return (
    <>
      <h4 className="text-center">History:</h4>

      <ul className="logs">
        {logs.map(({ player, square }, index) => (
          <li key={index} className="log">
            {player.name}: row: {square.row}, col: {square.col}
          </li>
        ))}
      </ul>
    </>
  );
}
