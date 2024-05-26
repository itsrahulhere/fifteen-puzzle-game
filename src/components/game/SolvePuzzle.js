const N = 4; // Dimension of the puzzle grid (4x4)
const goal = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16],
]; // Goal state of the puzzle

// Check if the move is within the puzzle grid boundaries
const isValidMove = (drow, dcol) => {
  return drow < 4 && dcol < 4 && drow >= 0 && dcol >= 0;
};

// Convert a linear array to a 2D array
function linearTo2DArray(linearArray) {
  const array2D = [];
  for (let i = 0; i < linearArray.length; i += N) {
    array2D.push(linearArray.slice(i, i + N));
  }
  return array2D;
}

// Convert a 2D array to a linear array
function twoDArrayToLinear(array2D) {
  const linearArray = [];
  for (let i = 0; i < array2D.length; i++) {
    linearArray.push(...array2D[i]);
  }
  return linearArray;
}

// Count the total number of incorrect positions in the puzzle
function totalIncorrectPositions(puzzle) {
  let incorrectPositions = 0;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (puzzle[i][j] !== goal[i][j]) {
        incorrectPositions++;
      }
    }
  }
  return incorrectPositions;
}

// Find the row and column index of a value in a 2D array
function findIndex2DArray(array2D, value) {
  for (let i = 0; i < array2D.length; i++) {
    for (let j = 0; j < array2D[i].length; j++) {
      if (array2D[i][j] === value) {
        return { row: i, col: j };
      }
    }
  }
  return null; // Return null if the value is not found
}

// Determine the direction of the move
function getMove(dr, dc) {
  switch ((dr, dc)) {
    case (0, 1):
      return "right";
    case (0, -1):
      return "left";
    case (-1, 0):
      return "down";
    case (1, 0):
      return "up";
    default:
      return "none";
  }
}

// Check if the move should be performed based on the previous move
function shouldMove(move, previousMove) {
  if (move === "right" && previousMove === "left") return false;
  if (move === "left" && previousMove === "right") return false;
  if (move === "up" && previousMove === "down") return false;
  if (move === "down" && previousMove === "up") return false;
  return true;
}

// Solve the puzzle by finding the optimal next move
export function solvePuzzle(numbers, previousMove) {
  const puzzle = linearTo2DArray(numbers);
  let finalMove = "";
  const index = findIndex2DArray(puzzle, 16); // Find the empty tile (represented by 16)
  if (puzzle === goal) return numbers; // If the puzzle is already solved, return the numbers
  let newNumbers = numbers;
  let diff = Infinity;
  const dc = [1, 0, 0, -1];
  const dr = [0, 1, -1, 0];
  for (let i = 0; i < 4; i++) {
    const dcol = index.col + dc[i];
    const drow = index.row + dr[i];
    if (isValidMove(drow, dcol)) {
      // Swap the empty tile with the adjacent tile
      const temp = puzzle[index.row][index.col];
      puzzle[index.row][index.col] = puzzle[drow][dcol];
      puzzle[drow][dcol] = temp;
      const newDiff = totalIncorrectPositions(puzzle);
      const tempLinearNumbers = twoDArrayToLinear(puzzle);

      const move = getMove(dc[i], dr[i]);
      if (diff >= newDiff && shouldMove(move, previousMove)) {
        diff = newDiff;
        newNumbers = tempLinearNumbers;
        finalMove = move;
      }

      // Swap back to the original configuration
      const temp2 = puzzle[index.row][index.col];
      puzzle[index.row][index.col] = puzzle[drow][dcol];
      puzzle[drow][dcol] = temp2;
    }
  }
  return { newNumbers, finalMove };
}
