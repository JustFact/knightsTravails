function getKnightMoves(start) {
  //Calculating all the possible steps where knight can go (including wrong ones).
  let startX, startY;
  startX = start[0];
  startY = start[1];
  let temp = [
    [startX + 2, startY + 1],
    [startX + 2, startY - 1],
    [startX - 2, startY + 1],
    [startX - 2, startY - 1],
    [startX + 1, startY + 2],
    [startX + 1, startY - 2],
    [startX - 1, startY + 2],
    [startX - 1, startY - 2],
  ];

  //Filtering out all the invalid steps
  let result = [];
  for (let i = 0; i < 8; i++) {
    if (
      temp[i][0] <= 7 &&
      temp[i][1] <= 7 &&
      temp[i][0] >= 0 &&
      temp[i][1] >= 0
    ) {
      result.push(temp[i]);
    }
  }
  return result;
}

function knightMoved(start, end) {
  if (start === end) {
    return end;
  }
  let movesToCheck = [start];
  let isTraversed = Array(8)
    .fill(0)
    .map((e) => Array(8).fill(false));
  let pointer = 0;
  let path = [];
  while (movesToCheck.length !== 0) {
    let move = movesToCheck[pointer];

    if (!isTraversed[move[0]][move[1]]) {
      if (move[0] === end[0] && move[1] === end[1]) {
        return getPath(path, start, end);
      } else {
        isTraversed[move[0]][move[1]] = true;
        let nextMoves = getKnightMoves(move);
        movesToCheck.push(...nextMoves);
        nextMoves.forEach((newMove) => path.push([move, newMove]));
      }
    }
    pointer++;
  }
}

function getPath(path, start, end) {
  //Cleaning up the path of steps taken
  let cleanPath = [];
  path.some((moveSet) => {
    if (moveSet[1][0] === end[0] && moveSet[1][1] === end[1]) {
      cleanPath.push(moveSet);
      return true;
    } else {
      cleanPath.push(moveSet);
    }
  });

  //Moving from the end to the start
  let [parentNode, childNode] = cleanPath.pop();
  let result = [parentNode, childNode];
  while (true) {
    if (parentNode[0] === start[0] && parentNode[1] === start[1]) {
      break;
    }
    for (let i = 0; i < cleanPath.length; i++) {
      if (
        cleanPath[i][1][0] === parentNode[0] &&
        cleanPath[i][1][1] === parentNode[1]
      ) {
        [[parentNode, childNode]] = cleanPath.splice(i, 1);
        result.unshift(parentNode);
        break;
      }
    }
  }
  return result;
}

let moves = knightMoved([0, 0], [2, 4]); //[ 0, 0 ], [ 1, 2 ], [ 2, 4 ]
console.log(moves);

moves = knightMoved([0, 0], [3, 3]); //[ 0, 0 ], [ 2, 1 ], [ 3, 3 ]
console.log(moves);

moves = knightMoved([3, 3], [0, 0]); //[ 3, 3 ], [ 1, 2 ], [ 0, 0 ]
console.log(moves);

moves = knightMoved([0, 0], [7, 7]); //[ 0, 0 ], [ 2, 1 ], [ 4, 2 ], [ 6, 3 ], [ 4, 4 ], [ 6, 5 ], [ 7, 7 ]
console.log(moves);

moves = knightMoved([3, 3], [4, 3]); //[ 3, 3 ], [ 5, 4 ], [ 3, 5 ], [ 4, 3 ]
console.log(moves);

moves = knightMoved([0, 0], [1, 2]); //[ 0, 0 ], [ 1, 2 ]
console.log(moves);
