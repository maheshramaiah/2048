const COL_ITR = {
  max: 4,
  inc: 1
};
const ROW_ITR = {
  max: 16,
  inc: 4
};

export function randomIndex(max) {
  return Math.floor(Math.random() * max);
}

export function getInsertionIndex(data, force = false) {
  const indices = data.reduce((acc, val, i) => {
    if (val === 0) {
      acc = [...acc, i];
    }

    return acc;
  });

  const index = indices[Math.floor(Math.random() * indices.length)];

  if (force && !index) {
    return randomIndex(15);
  }

  return index;
}

export function getUpdatedData(direction, { data, insertion, score }) {
  const outer = ['top', 'bottom'].includes(direction) ? COL_ITR : ROW_ITR;
  const inner = ['top', 'bottom'].includes(direction) ? ROW_ITR : COL_ITR;
  let newData = [...data];
  let arranger = [];
  let updatedList = [];
  let itr = 0;
  let moved = false;
  let insertNo = false;

  for (let i = 0; i < outer.max; i += outer.inc) {
    arranger = [];
    for (let j = 0; j < inner.max; j += inner.inc) {
      arranger.push(newData[i + j]);
    }
    ({ moved, data: updatedList, score } = arrange(arranger, ['bottom', 'right'].includes(direction), score));
    if (moved && !insertNo) {
      insertNo = true;
    }
    itr = 0;
    for (let k = 0; k < inner.max; k += inner.inc) {
      newData[i + k] = updatedList[itr++];
    }
  }

  const index = getInsertionIndex(newData);

  if (index === undefined) {
    return {};
  }
  if (insertNo) {
    newData[index] = insertion[randomIndex(2)];
  }

  return {
    score,
    newData
  };
}

function arrange(data, reverse = false, score) {
  let d = reverse ? [...data].reverse() : [...data];
  let summed = false;
  let moved = false;

  for (let i = 1; i < 4; i++) {
    if (d[i] !== 0) {
      let itr = i;
      for (let j = i - 1; j >= 0; j--) {
        if (d[j] === 0) {
          d[j] = d[itr];
          d[itr] = 0;
          moved = true;
        }
        else if (d[j] === d[itr] && !summed) {
          d[j] += d[itr];
          score += d[j];
          d[itr] = 0;
          summed = true;
          moved = true;

          break;
        }
        else {
          break;
        }
        itr--;
      }
    }
  }

  return {
    data: reverse ? [...d].reverse() : d,
    moved,
    score
  };
}

