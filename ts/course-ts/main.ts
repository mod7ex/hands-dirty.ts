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
