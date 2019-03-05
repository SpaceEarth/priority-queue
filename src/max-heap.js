const Node = require('./node');

function updateParentNodes(parentNodes, node) {
	let iNode, iParentNode;

	iNode = parentNodes.findIndex((elem) => {
		if (elem === node) {
			return true;
		}
	})
	iParentNode = parentNodes.findIndex((elem) => {
		if (elem === node.parent) {
			return true;
		}
	})
	if (iNode >= 0) {
		parentNodes[iNode] = node.parent;
	}
	if (iParentNode >= 0) {
		parentNodes[iParentNode] = node;
	}
}

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.nodeCount = 0;
		this.lastInserted = null;
	}

	push(data, priority) {
		let node = new Node(data, priority);

		this.nodeCount++;

		this.insertNode(node);
		this.shiftNodeUp(node);

		if (this.parentNodes.length > 0) {
			this.lastInserted = this.parentNodes[this.parentNodes.length - 1];
		}
	}

	pop() {
		if (this.isEmpty()) {
			return;
		}

		let root = this.detachRoot();

		this.nodeCount--;

		this.restoreRootFromLastInsertedNode(root);
		this.shiftNodeDown(this.root);

		return root.data;
	}

	detachRoot() {
		let root = this.root;

		if (this.parentNodes[0] === root) {
			this.parentNodes.shift();
		}
		
		this.root = null;

		return root;
	}

	restoreRootFromLastInsertedNode(detached) {
		if (this.lastInserted !== null) {
			if (this.lastInserted.parent !== null) {
				this.parentNodes.pop();
				this.parentNodes.unshift(this.lastInserted.parent);
			}
			for (let i = 0; i < this.parentNodes.length; i++) {
				if (this.parentNodes[i] === detached) {
					this.parentNodes[i] = this.lastInserted;
					break;
				}
			}
			this.lastInserted.remove();

			if (detached.left !== null && detached.left !== undefined) {
				detached.left.parent = this.lastInserted;
				this.lastInserted.left = detached.left;
			}
			if (detached.right !== null && detached.right !== undefined) {
				detached.right.parent = this.lastInserted;
				this.lastInserted.right = detached.right;
			}

			this.root = this.lastInserted;
		}
	}

	size() {
		return this.nodeCount;
	}

	isEmpty() {
		if (this.nodeCount === 0) {
			return true;
		}
		return false;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.nodeCount = 0;
	}

	insertNode(node) {
		let prntNd = this.parentNodes;

		if (this.root === null) {
			this.root = node;
			prntNd.push(node);
		} else {
			if (prntNd.length > 0) {
				if (prntNd[0].left === null) {
					prntNd[0].left = node;
					node.parent = prntNd[0];
					prntNd.push(node);
				} else if (prntNd[0].right === null) {
					prntNd[0].right = node;
					node.parent = prntNd[0];
					prntNd.shift();
					prntNd.push(node);
				}
			}
		}
	}

	shiftNodeUp(node) {
		if (node.parent !== null) {
			if (node.priority > node.parent.priority) {
				updateParentNodes(this.parentNodes, node);
				node.swapWithParent();
				this.shiftNodeUp(node);
			}
		} else {
			this.root = node;
		}
	}

	shiftNodeDown(node) {
		let left = node.left;
		let right = node.right;
		let leftPriority, rightPriority;

		if (left !== null || right !== null) {
			leftPriority = rightPriority = 0;
			if (left !== null) {
				leftPriority = left.priority;
			}
			if (right !== null) {
				rightPriority = right.priority;
			}
			if (leftPriority >= rightPriority) {
				if (leftPriority < this.priority) {
					return;
				}
				if (this.root === node) {
					this.root = left;
				}
				updateParentNodes(this.parentNodes, left);
				left.swapWithParent();
			} else {
				if (rightPriority < this.priority) {
					return;
				}
				if (this.root === node) {
					this.root = right;
				}
				updateParentNodes(this.parentNodes, right);
				right.swapWithParent();
			}
			this.shiftNodeDown(node);
		}
	}
}

module.exports = MaxHeap;