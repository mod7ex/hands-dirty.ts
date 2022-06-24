namespace MappedTypes {
	type Z = { [key in string]: string };

	let z: Z = {
		mod: "hello",
	};

	type Props = "propA" | "propB" | "propC";
	type D = { [key in Props]: string } & { id: number };

	type MappedProps<Properties extends string | number | symbol, T = string> = { [key in Properties]: T };

	type ObjectFromExtractedProps<T extends object, V = string> = { [key in keyof T]: V };

	type C_ObjectFromExtractedProps<T> = { readonly [key in keyof T]?: T[key] };

	type C_Record<Keys extends string | number | symbol, Val> = { [k in Keys]: Val };

	type C_Pick<T extends object, Props extends keyof T> = { [k in Props]: T[k] };

	// *********************************************************************************
	type Point = {
		x: number;
		y: number;
	};
	// can be done in this way also
	type A_Point = {
		[key in "x" | "y"]: number;
	};

	type Readonly_Point = {
		readonly [key in keyof Point]: A_Point[key];
	};

	type A_Readonly<T> = {
		+readonly [key in keyof T]: T[key];
	};
	type C_Readonly<T> = T extends { [key in keyof T]: any } ? { readonly [key in keyof T]: T[key] } : never;

	// origine can't be changed, we can use built-in Readonly utility type but !
	let origine: C_Readonly<Point> = {
		x: 0,
		y: 0,
	};
	let an_origine: Readonly_Point = {
		x: 0,
		y: 0,
	};

	// origine.x = 10000000; // this will give an error now --> readonly

	// *********************************************************************************

	type Readonly_Dot = {
		readonly [key in "x" | "y"]: number;
	};

	type Optional_Dot = {
		[key in "x" | "y"]?: number;
	};

	type ChangeableProps<T> = T extends { readonly [key in keyof T]: any } ? { -readonly [key in keyof T]: T[key] } : never;
	type ModifiableCords = ChangeableProps<Readonly_Dot>;

	type RequireProps<T> = T extends { [key in keyof T]?: any } ? { [key in keyof T]-?: T[key] } : never;
	type RequireCords = RequireProps<Optional_Dot>;

	type OptionalProps<T> = T extends { [key in keyof T]: any } ? { [key in keyof T]?: T[key] } : never;
	type OptionalCords = OptionalProps<Readonly_Dot>;

	type C_Partial<T> = {
		[K in keyof T]?: T[K];
	};
}

namespace Interfaces_Types {
	// *************************** Declaration Merging ***************************

	// Ex --> Express Base
	interface Request {
		body: any;
	}

	// Ex Json
	interface Request {
		json: any;
	}

	// Tow declarations will merged

	let middleware = (req: Request) => {
		let { body, json } = req;
	};

	// *********************************************************************************

	/*
		// For types we can't declare a type twice they won't be merged
		type T = "a";
		type T = "b";

		let gg: T;
	*/

	// Where to use types and where to use Interfaces

	/*
									Types | Interfaces
				************************* | *************************
							  	   Unions | Declaration Merging
				************************* | *************************
							   Primitives | Familiarity (extends)
				************************* | *************************
					  Shorthand Functions | *************************
				************************* | *************************
				  Advanced Type Functions | *************************
										  | 
	*/
}

namespace Mapped_Types_Ex {
	type C_Partial<T> = {
		[K in keyof T]?: T[K];
	};

	class State<T extends object> {
		constructor(public current: T) {}

		update(next: C_Partial<T>) {
			this.current = { ...this.current, ...next };
		}
	}

	let state = new State({ x: 0, y: 0, z: 0 });
	state.update({ x: 1 }); // we can pass only the update no need to pass all params

	// ***********************************************************************

	type C_Required<T> = {
		[K in keyof T]-?: T[K];
	};

	type C_Readonly<T> = {
		readonly [K in keyof T]: T[K];
	};

	let makeReadonly = <T extends object>(target: T): C_Readonly<T> => {
		return Object.freeze({ ...target });
	};

	type C_Changeable<T> = {
		-readonly [K in keyof T]: T[K];
	};
}
