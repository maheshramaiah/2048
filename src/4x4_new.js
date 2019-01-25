import { randomIndex, getIndex } from './utils';

const nos = [2, 4];
let score = 0;

function arrange(data, reverse = false) {
	let d = reverse ? [...data].reverse() : [...data];
	let summed = false;
	let noMoved = false;

	for (let i = 1; i < 4; i++) {
		if (d[i] !== 0) {
			let itr = i;
			for (let j = i - 1; j >= 0; j--) {
				if (d[j] === 0) {
					d[j] = d[itr];
					d[itr] = 0;
					noMoved = true;
				}
				else if (d[j] === d[itr] && !summed) {
					d[j] += d[itr];
					score += d[j];
					d[itr] = 0;
					summed = true;
					noMoved = true;

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
		noMoved
	};
}

export function game(direction, state) {
	let newState = [...state];
	let arranger = [];
	let updatedList = [];
	let itr = 0;
	let noMoved = false;
	let insertNo = false;

	switch (direction) {
		case 'up':
		case 'bottom': {
			for (let i = 0; i < 4; i++) {
				arranger = [];
				for (let j = 0; j < 16; j = j + 4) {
					arranger.push(newState[i + j]);
				}
				({ noMoved, data: updatedList } = arrange(arranger, direction === 'bottom'));
				if (noMoved && !insertNo) {
					insertNo = true;
				}
				itr = 0;
				for (let k = 0; k < 16; k = k + 4) {
					newState[i + k] = updatedList[itr++];
				}
			}
			break;
		}
		case 'left':
		case 'right': {
			for (let j = 0; j < 16; j = j + 4) {
				arranger = [];
				for (let i = 0; i < 4; i++) {
					arranger.push(newState[i + j]);
				}
				({ noMoved, data: updatedList } = arrange(arranger, direction === 'right'));
				if (noMoved && !insertNo) {
					insertNo = true;
				}
				itr = 0;
				for (let k = 0; k < 4; k++) {
					newState[j + k] = updatedList[itr++];
				}
			}
			break;
		}
	}

	const index = getIndex(newState);

	if (index === undefined) {
		return {};
	}
	if (insertNo) {
		newState[index] = nos[randomIndex(2)];
	}

	return {
		score,
		newState
	};
}

export const colorMap = {
	2: '#eee4da',
	4: '#ede0c8',
	8: '#f2b179',
	16: '#f59563',
	32: '#f67c5f',
	64: '#f65e3b',
	128: '#edcf72',
	256: '#edcc61',
	512: '#edc850',
	1024: '#edc813'
};