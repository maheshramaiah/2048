import * as types from '../actionTypes';
import { randomIndex, getInsertionIndex, getUpdatedData, compareArrays } from '../helpers';
import Storage from '../../storage';

export default function(state, action) {
  switch (action.type) {
    case types.START: {
      const { present: { data }, insertion } = state;
      const insertionIndex = getInsertionIndex(data, true);
      const insertionNo = insertion[randomIndex(2)];

      return {
        ...state,
        past: null,
        present: {
          ...state.present,
          data: data.map((d, i) => {
            if (i === insertionIndex) {
              return insertionNo;
            }
            return 0;
          }),
          score: 0,
          finish: false
        },
        future: null,
        higestScore: Storage.get('HIGHEST_SCORE') || 0
      };
    }
    case types.ON_MOVE: {
      const { direction } = action;
      const { data, score } = getUpdatedData(direction, state.present.data);
      const insertionIndex = getInsertionIndex(data);

      if (compareArrays(data, state.present.data) && insertionIndex !== undefined) {
        return state;
      }

      if (insertionIndex === undefined) {
        return {
          ...state,
          past: {
            ...state.present
          },
          present: {
            ...state.present,
            finish: true
          }
        };
      }
      else {
        const insertionNo = state.insertion[randomIndex(2)];

        return {
          ...state,
          past: {
            ...state.present
          },
          present: {
            ...state.present,
            data: data.map((d, i) => {
              if (i === insertionIndex) {
                return insertionNo;
              }
              return d;
            }),
            score: state.present.score + score
          },
          future: null
        };
      }
    }
    case types.UNDO: {
      return {
        ...state,
        past: null,
        present: {
          ...state.past
        },
        future: {
          ...state.present
        }
      };
    }
    case types.REDO: {
      return {
        ...state,
        past: {
          ...state.present
        },
        present: {
          ...state.future
        },
        future: null
      };
    }
  }
}