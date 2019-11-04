import produce from 'immer';
import * as types from './actionTypes';
import { randomIndex, getInsertionIndex, getUpdatedData, compareArrays } from './helpers';

export const initialState = {
  past: null,
  present: {
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    score: 0,
    finish: false
  },
  future: null
};

const INSERTION_NOS = [2, 4, 2, 4];

export default produce((draft, action) => {
  switch (action.type) {
    case types.START: {
      let data = [...initialState.present.data];
      const insertionIndex = getInsertionIndex(data);
      const insertionNo = INSERTION_NOS[randomIndex(INSERTION_NOS.length)];
      
      data[insertionIndex] = insertionNo;

      draft.past = null;
      draft.present.data = data;
      draft.present.score = 0;
      draft.present.finish = false;
      draft.future = null;

      break;
    }
    case types.ON_MOVE: {
      let { data, score } = getUpdatedData(action.direction, draft.present.data);
      const insertionIndex = getInsertionIndex(data);

      if (compareArrays(data, draft.present.data) && insertionIndex !== undefined) {
        return draft;
      }

      // Game finish
      if (insertionIndex === undefined) {
        draft.past = draft.present;
        draft.present.finish = true;
      }
      else {
        const insertionNo = INSERTION_NOS[randomIndex(INSERTION_NOS.length)];

        data[insertionIndex] = insertionNo;

        draft.past = { ...draft.present };
        draft.present.data = data;
        draft.present.score += score;
        draft.future = null;
      }

      break;
    }
    case types.UNDO: {
      draft.future = { ...draft.present };
      draft.present = { ...draft.past };
      draft.past = null;

      break;
    }
    case types.REDO: {
      draft.past = { ...draft.present };
      draft.present = { ...draft.future };
      draft.future = null;

      break;
    }
  }
});