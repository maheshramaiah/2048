import * as types from './actionTypes';

export default {
  start() {
    return {
      type: types.START
    };
  },
  onMove(direction) {
    return {
      type: types.ON_MOVE,
      direction
    };
  },
  undo() {
    return {
      type: types.UNDO
    };
  },
  redo() {
    return {
      type: types.REDO
    };
  }
}