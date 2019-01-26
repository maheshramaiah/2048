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
  }, []);

  const index = indices[Math.floor(Math.random() * indices.length)];

  if (force && !index) {
    return randomIndex(15);
  }

  return index;
}

export function getUpdatedData(direction, data) {
  const outer = ['top', 'bottom'].includes(direction) ? COL_ITR : ROW_ITR;
  const inner = ['top', 'bottom'].includes(direction) ? ROW_ITR : COL_ITR;
  let newData = [...data];
  let totalScore = 0;

  for (let i = 0; i < outer.max; i += outer.inc) {
    let arranger = [];
    for (let j = 0; j < inner.max; j += inner.inc) {
      arranger.push(newData[i + j]);
    }

    const { data: updatedList, score } = arrange(arranger, ['bottom', 'right'].includes(direction));
    let itr = 0;

    totalScore += score;

    for (let k = 0; k < inner.max; k += inner.inc) {
      newData[i + k] = updatedList[itr++];
    }
  }

  return {
    data: newData,
    score: totalScore
  };
}

function arrange(data, reverse = false) {
  let d = reverse ? [...data].reverse() : [...data];
  let summed = [];

  for (let i = 1; i < 4; i++) {
    if (d[i] !== 0) {
      let itr = i;
      for (let j = i - 1; j >= 0; j--) {
        if (d[j] === 0) {
          d[j] = d[itr];
          d[itr] = 0;
        }
        else if (d[j] === d[itr] && !summed.length) {
          const sum = d[itr] + d[j];

          d[j] = sum;
          d[itr] = 0;
          summed.push(sum);

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
    score: summed.reduce((ac, v) => ((ac += v), ac), 0)
  };
}

export function compareArrays(a, b) {
  return a.join(',') === b.join(',');
}


