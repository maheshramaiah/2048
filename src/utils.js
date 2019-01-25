export function randomIndex(div) {
	return Math.floor(Math.random() * (div));
}

export function getIndex(data, force = false) {
	let indices = [];
	let index;

	for (let i = 0; i < data.length; i++) {
		if (data[i] === 0) {
			indices.push(i);
		}
	}

	index = indices[Math.floor(Math.random() * indices.length)];

	if (force && !index) {
		index = Math.floor(Math.random() * 15)
	}

	return index;
}