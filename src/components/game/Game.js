import React, { useState } from "react";
import "./Game.css";
import Tile from "./Tile";
import Tag from "../Tag";
import { solvePuzzle } from "./SolvePuzzle";
import { isSolvable } from "./IsSolvable";

// Initial numbers for the puzzle
const initialNumbers = Array.from({ length: 16 }, (_, i) => i + 1);

function Game() {
  const [isSolve, setIsSolve] = useState(""); // To track if the puzzle is solvable
  const [numbers, setNumbers] = useState(initialNumbers); // To hold the numbers in the puzzle
  const [previousMove, setPreviousMove] = useState(""); // To store the previous move

  // Function to shuffle the numbers in the puzzle
  const shuffleNumbers = () => {
    const shuffledNumbers = [...initialNumbers];
    for (let i = shuffledNumbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledNumbers[i], shuffledNumbers[j]] = [
        shuffledNumbers[j],
        shuffledNumbers[i],
      ];
    }
    setNumbers(shuffledNumbers);
    setIsSolve(isSolvable(shuffledNumbers)); // Checking if the shuffled puzzle is solvable
  };

  // Function to handle tile click
  const handleTileClick = (clickedNumber) => {
    const clickedIndex = numbers.indexOf(clickedNumber);
    const emptyIndex = numbers.indexOf(16); // Index of the empty tile (16 represents the empty tile)

    // Checking if the clicked move is valid
    if (isMoveValid(clickedIndex, emptyIndex)) {
      const newNumbers = [...numbers];
      [newNumbers[clickedIndex], newNumbers[emptyIndex]] = [
        newNumbers[emptyIndex],
        newNumbers[clickedIndex],
      ];
      setNumbers(newNumbers);
    }
    setIsSolve(isSolvable(numbers)); // Checking if the current puzzle is solvable
  };

  // Function to check if the move is valid
  const isMoveValid = (clickedIndex, emptyIndex) => {
    const rowDiff = Math.abs(
      Math.floor(clickedIndex / 4) - Math.floor(emptyIndex / 4)
    );
    const colDiff = Math.abs((clickedIndex % 4) - (emptyIndex % 4));
    return (rowDiff === 1 && colDiff === 0) || (colDiff === 1 && rowDiff === 0);
  };

  // Function to provide a hint to solve the puzzle
  const helpMe = () => {
    const { newNumbers, finalMove } = solvePuzzle(numbers, previousMove);
    setNumbers(newNumbers);
    setPreviousMove(finalMove);
    setIsSolve(isSolvable(newNumbers)); // Checking if the puzzle after the hint is solvable
  };

  // Rendering the Game component
  return (
    <div className="game-container">
      {/* Buttons for starting new game, shuffling, and getting help */}
      <div className="game-buttons">
        {isSolve === "" ? (
          <button
            className="game-button green-gradient"
            onClick={shuffleNumbers}
          >
            <b>START NEW GAME</b>
          </button>
        ) : (
          <>
            <button
              className="game-button red-gradient"
              onClick={shuffleNumbers}
            >
              <b>SHUFFLE</b>
            </button>

            <button
              className={`game-button ${
                isSolve ? "blue-gradient" : "disabled-help-me"
              }`}
              disabled={!isSolve}
              onClick={helpMe}
            >
              <b>HELP ME</b>
            </button>
          </>
        )}
      </div>

      {/* Displaying the puzzle grid */}
      <div className="grid-bg">
        <div className="grid-container">
          {numbers.map((number) => (
            <Tile
              key={number}
              number={number}
              onClick={() => handleTileClick(number)}
            />
          ))}
        </div>
      </div>

      {/* Displaying whether the puzzle is solvable or not */}
      <div>
        <Tag
          title={`${isSolve ? "Solvable Puzzle" : "Unsolvable Puzzle"}`}
          isSolve={isSolve}
        />
      </div>
    </div>
  );
}

export default Game; // Exporting the Game component
