namespace Iterators {
	let numbers = [1, 2, 3];
	let numbersIterator = numbers[Symbol.iterator]();

	// generator function it returns a iterator
	function* gen() {
		yield "H";
		yield "e";
		yield "l";
		yield "l";
		yield "o";
	}
	let str = gen();

	// **************
	function* myGen0(n: number) {
		for (let i = 0; i < n; i++) yield i * 2;
	}

	function myGen(n: number) {
		let i = 0;
		return {
			next() {
				if (i < n) {
					return {
						value: i++,
						done: false,
					};
				} else {
					return {
						value: undefined,
						done: true,
					};
				}
			},
		};
	}

	let myIterator = myGen(10);
	// let myIterator = myGen0(10);

	/*
		why do we need iterators
		==> we can make any object iterable for example not only arrays
			but also functions and leteral objects
	*/

	let obj = {
		[Symbol.iterator]() {
			return myIterator;
		},
	};

	let foo = Object.assign(() => {
		console.log("hello");
	}, obj);

	foo();

	for (let item of obj) {
		// we can then loop through objects
		console.log(item);
	}

	for (let item of foo) {
		// we can then loop through functions
		console.log(item);
	}
}
