import * as types from './actionTypes';
import { randomIndex, getInsertionIndex, getUpdatedData, compareArrays } from './helpers';

const initialState = {
  data: [
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0
  ],
  insertion: [2, 4],
  score: 0,
  finish: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.START: {
      const { data, insertion } = state;
      const insertionIndex = getInsertionIndex(data, true);
      const insertionNo = insertion[randomIndex(2)];

      return {
        ...state,
        data: data.map((d, i) => {
          if (i === insertionIndex) {
            return insertionNo;
          }
          return 0;
        }),
        finish: false
      };
    }
    case types.ON_MOVE: {
      const { direction } = action;
      const { data, score } = getUpdatedData(direction, state.data);
      const insertionIndex = getInsertionIndex(data);

      if (compareArrays(data, state.data) && insertionIndex !== undefined) {
        return state;
      }

      if (insertionIndex === undefined) {
        return {
          ...state,
          finish: true
        };
      }
      else {
        const insertionNo = state.insertion[randomIndex(2)];

        return {
          ...state,
          data: data.map((d, i) => {
            if (i === insertionIndex) {
              return insertionNo;
            }
            return d;
          }),
          score: state.score + score
        };
      }
    }
    default: return state;
  }
}


