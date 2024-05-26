const N = 4; // Dimension of the puzzle grid (4x4)

// Calculate the inversion count in the array
function getInvCount(arr) {
  let inv_count = 0;
  for (let i = 0; i < N * N - 1; i++) {
    for (let j = i + 1; j < N * N; j++) {
      // Count inversions, ignoring the empty tile (represented by 16)
      if (arr[j] !== 16 && arr[i] !== 16 && arr[i] > arr[j]) inv_count++;
    }
  }
  return inv_count;
}

// Find the row position of the empty tile (16) from the bottom
function findXPosition(nums) {
  for (let i = nums.length - 1; i >= 0; i--) {
    if (nums[i] === 16) return N - Math.floor(i / N);
  }
  return -1; // Return -1 if the empty tile is not found
}

// Determine if the puzzle is solvable based on inversion count and empty tile position
export function isSolvable(numbers) {
  let invCount = getInvCount(numbers);
  let pos = findXPosition(numbers);
  // Check solvability based on position of the empty tile and inversion count
  if (pos % 2 === 1) return invCount % 2 === 0;
  else return invCount % 2 === 1;
}
