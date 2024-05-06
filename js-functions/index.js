function myParseInt(str) {
  const symbols = str.trim();
  let result = 0;
  for (let i = 0; i < symbols.length; i++) {
    const digit = symbols.charCodeAt(i) - 48;
    const isDigit = digit >= 0 && digit <= 9;
    if (i === 0 && !isDigit) {
      return NaN;
    } if (isDigit) {
      result = result * 10 + digit;
    } else {
      break;
    }
  }

  return result;
}

function printSpiralMatrix(matrix) {
  if (!matrix || matrix.length === 0) {
      return;
  }

  let rows = matrix.length;
  let cols = matrix[0].length;

  let topRow = 0, bottomRow = rows - 1;
  let leftCol = 0, rightCol = cols - 1;

  while (topRow <= bottomRow && leftCol <= rightCol) {
      for (let i = leftCol; i <= rightCol; i++) {
          console.log(matrix[topRow][i]);
      }
      topRow++;

      for (let i = topRow; i <= bottomRow; i++) {
          console.log(matrix[i][rightCol]);
      }
      rightCol--;

      if (topRow <= bottomRow) {
          for (let i = rightCol; i >= leftCol; i--) {
              console.log(matrix[bottomRow][i]);
          }
          bottomRow--;
      }

      if (leftCol <= rightCol) {
          for (let i = bottomRow; i >= topRow; i--) {
              console.log(matrix[i][leftCol]);
          }
          leftCol++;
      }
  }
}
