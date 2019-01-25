import { randomIndex, randomIndex } from './utils';

const nos = [2, 4];

export function game(direction, data) {
	let newData = [...data];

	switch (direction) {
		case 'down': {
			for (let j = 0; j < 4; j++) {
				for (let i = 2; i >= 0; i--) {
					if (newData[i][j] !== 0) {
						let ii = i;
						for (let k = i + 1; k < 4; k++) {
							if (newData[k][j] === 0) {
								newData[k][j] = newData[ii][j];
								newData[ii][j] = 0;
							}
							else if (newData[ii][j] === newData[k][j]) {
								newData[k][j] += newData[ii][j];
								newData[ii][j] = 0;

								break;
							}
							ii++;
						}
					}
				}
			}
		}
	}

	const indices = getIndices(newData, 16);

	if (!indices) {
		return null;
	}

	newData[indices[0]][indices[1]] = nos[randomIndex(7)]

	return newData;
}

const state = [
	[0, 0, 0, 0],
	[2, 2, 0, 0],
	[2, 0, 0, 0],
	[4, 2, 0, 0]
];

export function game1(ditection) {
	switch (direction) {
		case 'down': {
			let a = [];

			for (j = 0; j < 4; j++) {
				for (i = 0; i < 4; i++) {
					a.push(state[i][j])
				}
			}
		}
	}
}