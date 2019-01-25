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
	}
}