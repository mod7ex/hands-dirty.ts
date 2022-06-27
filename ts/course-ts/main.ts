namespace Generic_Types {
	// ***************** Types *****************
	type A<T> = (x: T) => T;
	type B = <T>(x: T) => T;

	let numToNum: A<number> = (x: number) => {
		return x + 10;
	};

	let strToStr: A<string> = (x: string) => {
		return `${x}-mod`;
	};

	let indetity: B = <T>(x: T) => {
		return x;
	};

	// ***************** Interfaces *****************

	interface GA_Executable<T> {
		(x: T): T;
	}

	interface GB_Executable {
		<T>(x: T): T;
	}

	let foo: GA_Executable<string> = strToStr;
	let res = foo("t");
}

namespace Union_Never {
	let error = (msg: string = "error message") => {
		throw new Error(msg);
	};

	let allowed: never = error();

	// Never type is assignable to any other type

	let variable: string = error();

	// ***************************************** Distribution

	type Dis_NoEmpty<T> = T extends null | undefined ? never : T;
	type NoneDis_NoEmpty<T> = [T] extends [null | undefined] ? never : T;

	type V = Dis_NoEmpty<null | string | boolean | undefined>;
}

namespace Exercices {
	export type ApiResponse<T> = { status: "success"; data: T } | { status: "error"; error: string };

	type Callback<T> = (responce: ApiResponse<T>) => void;
	type Func<T> = (cb: Callback<T>) => void;

	function promisify<T>(fn: Func<T>): () => Promise<T> {
		return () => {
			return new Promise((resolve, reject) => {
				fn((responce) => {
					if (responce.status === "success") {
						resolve(responce.data);
					} else {
						reject(new Error(responce.error));
					}
				});
			});
		};
	}

	type KeysOf<T extends object> = T extends { [k in infer V]: any } ? V : never;

	type FuncsObj<T extends object> = { [K in keyof T]: Func<T[K]> };
	type PromisifiedFuncsObj<T extends object> = { [K in keyof T]: () => Promise<T[K]> };

	function promisifyAll<T extends object>(oldAPi: FuncsObj<T>) {
		let api: Partial<PromisifiedFuncsObj<T>> = {};

		for (let key of Object.keys(oldAPi) as (keyof T)[]) {
			api[key] = promisify(oldAPi[key]);
		}

		return api as PromisifiedFuncsObj<T>;
	}

	// ***********************************************************************
	// https://dev.to/svehla/typescript-transform-case-strings-450b

	// Really important exo https://typescript-exercises.github.io/#exercise=11

	type StrReverse<T extends string> = T extends `${infer A}${infer B}` ? `${StrReverse<B>}${A}` : T;

	// -----------------------------------------------------------

	type LowToUp = {
		a: "A";
		b: "B";
		c: "C";
		d: "D";
		e: "E";
		f: "F";
		g: "G";
		h: "H";
		i: "I";
		j: "J";
		k: "K";
		l: "L";
		m: "M";
		n: "N";
		o: "O";
		p: "P";
		q: "Q";
		r: "R";
		s: "S";
		t: "T";
		u: "U";
		v: "V";
		w: "W";
		x: "X";
		y: "Y";
		z: "Z";
	};

	type ArrayToUnion<T extends any[]> = T[number];

	type ValueOf<T extends object> = T[keyof T];

	type KeyOf<T extends object, V extends ValueOf<T>> = ValueOf<{ [K in keyof T]: V extends T[K] ? K : never }>;

	type Reverse<T extends { [k in string]: string }> = { [V in ValueOf<T>]: KeyOf<T, V> };

	type UpToLow = Reverse<LowToUp>;
}
