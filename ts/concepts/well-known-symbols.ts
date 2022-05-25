namespace WellKnownSymbols {
	namespace HasInstance {
		class A {
			[Symbol.hasInstance]() {
				return true;
			}
		}
		let a = new A();
		a instanceof A; //  output is true
		// is the same as
		A[Symbol.hasInstance](a); // this is how it works in the background

		/*
            now we can play with this
            in fact we can assign this method to any function
            (foo[Symbol.hasInstance](a)) where foo is a function
            (--or any object :)--)
        */
		let foo = () => "";
		foo[Symbol.hasInstance] = () => true;

		Number instanceof foo; // output is true

		String instanceof (a as any); //  output is true
		A instanceof (a as any); //  output is true

		/*
        Object.getOwnPropertyDescriptors(A.__proto__)
            {length: {…}, name: {…}, arguments: {…}, caller: {…}, constructor: {…}, …}
                apply: {writable: true, enumerable: false, configurable: true, value: ƒ}
                arguments: {enumerable: false, configurable: true, get: ƒ, set: ƒ}
                bind: {writable: true, enumerable: false, configurable: true, value: ƒ}
                call: {writable: true, enumerable: false, configurable: true, value: ƒ}
                caller: {enumerable: false, configurable: true, get: ƒ, set: ƒ}
                constructor: {writable: true, enumerable: false, configurable: true, value: ƒ}
                length: {value: 0, writable: false, enumerable: false, configurable: true}
                name: {value: '', writable: false, enumerable: false, configurable: true}
                toString: {writable: true, enumerable: false, configurable: true, value: ƒ}
                Symbol(Symbol.hasInstance): <------
                    configurable: false   <------
                    enumerable: false
                    value: ƒ [Symbol.hasInstance]()
                    writable: false
                    [[Prototype]]: Object
                [[Prototype]]: Object
        */

		// Object.defineProperty will ignore the fact that the property is not configurable
		Object.defineProperty(A, Symbol.hasInstance, {
			value: (instance: object) => {
				// Also strings are instances of A
				if (instance instanceof String) return true;

				return instance.constructor === A;
			},

			// value: () => true, // now any object is an instance of class A
		});
	}

	namespace Split {
		let splitter = {
			[Symbol.split](str: string) {
				console.log(str);
				return ["hello"];
				// the sky is the limit (TSITL)
			},
		};

		console.log("Mourad".split(splitter, 2));
	}

	namespace Species {
		class MyArray extends Array {
			static get [Symbol.species]() {
				return Array;
			}
		}

		let a = new MyArray(1);

		let mapped = a.map((x) => x * x);

		console.log(mapped instanceof MyArray);
		console.log(mapped instanceof Array);
	}

	namespace ToPrimitive {
		let obj = {
			toString() {
				return "some stuff";
			},

			valueOf() {
				return 1;
			},
		};

		let obj1 = {
			toString() {
				return "some stuff obj 1";
			},
		};

		let obj2 = {
			valueOf() {
				return 1;
			},
		};

		/*
            console.log(`${obj}`);
            console.log(`${obj1}`);
            console.log(`${obj2}`);
          
            console.log(obj + 1);
            console.log(obj1 + 1);
            console.log(obj2 + 1);
        */

		let myObj = {
			[Symbol.toPrimitive](hint: string) {
				// hight priority is for 'string'
				if (hint === "string") return "a";
				return 0;
			},
		};

		console.log(`${myObj}`);

		console.log((myObj as any) + 1);
	}

	namespace ToStringTag {
		// this symbol is maybe just for some cool debuging or styling
		let obj = {};

		console.log(Object.prototype.toString === obj.toString);
		console.log(Object.prototype.toString.call(obj)); // "[object object]"
		obj[Symbol.toStringTag] = "Some random shit";
		console.log(Object.prototype.toString.call(obj)); // "[object Some random shit]"

		class A {
			[Symbol.toStringTag] = "A";
		}
		let a = new A();
		console.log(Object.prototype.toString.call(a)); // "[object A]"
	}

	namespace Unscopable {
		// bad practice
		/*
            let obj = {
                a: 1,
                b: 2,
            };

            with (obj) {
                console.log(a, b);
            }

            obj[Symbol.unscopables] = {
                a: true,
            };

            with (obj) {
                console.log(a, b);
            }
        */
	}

	namespace IsConcatSpreadable {}
}
