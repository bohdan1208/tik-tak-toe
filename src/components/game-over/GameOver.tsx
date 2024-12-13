import './GameOver.css';

type GameOver = {
  winner: string | undefined;
  restart: () => void
}

export default function GameOver({winner, restart }: GameOver) {
  return <div className='game-over'>
    <h1>Game Over</h1>
    <span className='mb-2'>{ winner && `Win ${winner}!`}</span>
    <button className="btn btn-secondary" onClick={restart}>Restart</button>
  </div>
}
