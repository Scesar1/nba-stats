"use client";
import { player } from "@prisma/client";
import React, { useEffect, useState } from "react";

type AutoCompleteInputProps = {
  onSelect: (selectedPlayer: player) => void;
  players: player[];
  label: string;
};

export default function AutoCompleteInput({
  onSelect,
  players,
  label,
}: AutoCompleteInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [allSuggestions, setAllSuggestions] = useState(players);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [displayedSuggestions, setDisplayedSuggestions] = useState<player[]>(
    []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value;
    setInputValue(inputText);
    setShowSuggestions(true);

    const filtered = allSuggestions
      .filter((player: player) =>
        player.player_name.toLowerCase().includes(inputText.toLowerCase())
      )
      .slice(0, 5);

    setDisplayedSuggestions(filtered);
  };

  const handleSuggestionClick = (selectedPlayer: player) => {
    setInputValue(selectedPlayer.player_name);
    setShowSuggestions(false);
    onSelect(selectedPlayer);
  };

  return (
    <div>
      <label className="w-full max-w-xs">
        <input
          className="input input-bordered w-full max-w-xs"
          id="players"
          list="player1"
          name="players"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          required
          autoComplete="off"
          pattern={players.map((player) => player.player_name).join("|")}
          placeholder={label}
        />
        <div className="w-fit">
          {showSuggestions && inputValue.length > 0 && (
            <ul className="list-none absolute bg-neutral text-base-content">
              {displayedSuggestions.map((player) => (
                <li
                  key={player.player_id}
                  className="p-2 hover:bg-base-200 cursor-pointer"
                  onClick={() => handleSuggestionClick(player)}
                >
                  {player.player_name +
                    "\t" +
                    `(${player.from} - ${player.to})`}
                </li>
              ))}
            </ul>
          )}
        </div>
      </label>
    </div>
  );
}
