function swap(a, b) {
	let temp;

	temp = a.parent;
	a.parent = b.parent
	b.parent = temp;

	temp = a.left;
	a.left = b.left;
	b.left = temp;

	temp = a.right;
	a.right = b.right;
	b.right = temp;
}

class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if (this.left === null) {
			this.left = node;
			node.parent = this;
		} else if (this.right === null) {
			this.right = node;
			node.parent = this;
		}
	}

	removeChild(node) {
		if (this.left === node) {
			this.left = null;
			node.parent = null;
		} else if (this.right === node) {
			this.right = null;
			node.parent = null;
		} else {
			throw new Error("removeChild");
		}
	}

	remove() {
		if (this.parent !== null) {
			this.parent.removeChild(this);
		}
	}

	swapWithParent() {
		if (this.parent !== null) {
			let parentLeft = this.parent.left;
			let parentRight = this.parent.right;
			let parentParent = this.parent.parent;
			
			let childParent = this.parent;
			let childLeft = this.left;
			let childRight = this.right;
			
			let objArr = [];
			objArr.push(childLeft, childRight, childParent, parentLeft, parentRight, parentParent);

			for (let element of objArr) {
				for (let key in element) {
					if (element[key] === this) {
						element[key] = childParent;
					} else if (element[key] === childParent) {
						element[key] = this;
					}
				}
			}
			swap(childParent, this);
		}
	}
}

module.exports = Node;