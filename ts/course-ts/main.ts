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
	// const api = promisifyAll(oldApi);

	// ***********************************************************************

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

	type Funcky = <T>(cb: Callback<T>) => void;

	type Funcs = { [key in string]: Funcky };

	function promisifyAll<T>(oldAPi: Funcs) {
		let api: { [key in KeysOf<typeof oldAPi>]: Funcky } = {};

		Object.keys(oldAPi).forEach((item: KeysOf<typeof oldAPi>) => {
			api[item] = promisify(oldAPi[item]!);
		});

		return api;
	}
}
