import { useState } from "react";
import "./Player.css";
import {CellValue} from "../../interfaces";

type PlayerProps = {
  name: string;
  symbol: CellValue;
  isActive: boolean;
  onChangeName: (symbol: CellValue, newName: string) => void;
};

export default function Player({ name, symbol, isActive, onChangeName }: PlayerProps) {
  const [playerName, setPlayerName] = useState(name);
  const [isEdit, setIsEdit] = useState(false);

  function handleEditClick(): void {
    setIsEdit((isEdit) => !isEdit);

    if (isEdit) {
      onChangeName(symbol, playerName);
    }
  }

  function handleChangeName(event: React.ChangeEvent<HTMLInputElement>): void {
    setPlayerName(event.target.value);
  }

  let editablePlayerName = (
    <span className="name text-truncate">{playerName}</span>
  );

  if (isEdit) {
    editablePlayerName = (
      <input
        type="text"
        className="form-control"
        value={playerName}
        onChange={handleChangeName}
      />
    );
  }

  return (
    <div className={`player ${isActive ? "active" : ""}`}>
      <span className="symbol">{symbol}</span>
      {editablePlayerName}
      <button
        type="button"
        className="btn btn-secondary"
        onClick={handleEditClick}
      >
        {isEdit ? "Save" : "Edit"}
      </button>
    </div>
  );
}
