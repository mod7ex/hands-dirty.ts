namespace IteratorNameSpace {
	class Iterator<T> {
		constructor(public items: T[], public index: number = 0) {}

		hasNext() {
			return this.index < this.items.length;
		}

		next() {
			return this.items[this.index++];
		}
	}

	let collection = [false, "hello", 12, 1.6];

	let iterator = new Iterator(collection);

	console.log(iterator.next());
}
