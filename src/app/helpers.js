const COL_ITR = {
  max: 4,
  inc: 1
};
const ROW_ITR = {
  max: 16,
  inc: 4
};

export function compareArrays(a, b) {
  return a.every((v, i) => b[i] == v);
}

export function randomIndex(max) {
  return Math.floor(Math.random() * max);
}

export function getInsertionIndex(data) {
  const indices = data.reduce((acc, val, i) => {
    val === 0 && acc.push(i);

    return acc;
  }, []);
  const index = indices[randomIndex(indices.length)]

  return index;
}

export function getUpdatedData(direction, data) {
  const isVertical = ['top', 'bottom'].includes(direction);
  const reverseImpl = ['bottom', 'right'].includes(direction);
  const outer = isVertical ? COL_ITR : ROW_ITR;
  const inner = isVertical ? ROW_ITR : COL_ITR;
  let newData = [];
  let totalScore = 0;

  for (let i = 0; i < outer.max; i += outer.inc) {
    let elems = [];

    for (let j = 0; j < inner.max; j += inner.inc) {
      elems.push(data[i + j]);
    }

    reverseImpl && elems.reverse();

    let { arr, score } = squash(arrange(elems));

    reverseImpl && arr.reverse();

    for (let k = 0; k < inner.max; k += inner.inc) {
      newData[i + k] = arr.shift();
    }

    totalScore += score;
  }

  return {
    data: newData,
    score: totalScore
  };
}

function arrange(arr) {
  let res = [];
  let count = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== 0) {
      res[count++] = arr[i];
    }
  }

  while (count < arr.length) {
    res[count++] = 0;
  }

  return res;
}

function squash(arr) {
  let score = 0;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] !== 0) {
      if (arr[i - 1] === 0) {
        arr[i - 1] = arr[i];
        arr[i] = 0;
      }
      else if (arr[i - 1] === arr[i]) {
        const sum = arr[i - 1] + arr[i];

        arr[i - 1] = sum;
        arr[i] = 0;
        score += sum;
      }
    }
  }

  return {
    arr,
    score
  };
}


