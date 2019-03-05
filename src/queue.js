const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize = 30) {
		this.currentSize = 0;
		this.maxSize = maxSize;
		this.heap = new MaxHeap();
	}

	push(data, priority) {
		if (this.currentSize + 1 <= this.maxSize) {
			this.currentSize++;
			this.heap.push(data, priority);
		} else {
			throw new Error("push error. maxsize overflow");
		}
	}

	shift() {
		if (this.isEmpty()) {
			throw new Error("queue empty");
		}

		this.currentSize--;

		let data = this.heap.pop();

		return data;
	}

	size() {
		return this.currentSize;
	}

	isEmpty() {
		if (this.currentSize === 0) {
			return true;
		}
		return false;
	}
}

module.exports = PriorityQueue;
