namespace Index {
	type Falsy = null | undefined | false | "" | 0;

	type NotFalsy<T = Falsy> = T extends Falsy ? never : T;

	let x: NotFalsy<string> = "";

	// ********************************************************************************* Distribution

	// it filters U from T --- called Exclude in ts ---
	type Filter<T, U> = T extends U ? never : T;

	type FilteredResult = Filter<"a" | "b" | "c", "a" | "z">;

	// *********************************************************************************
}

namespace Ts {
	const a = [1, 2, 3, 4, 5] as const;
	// const a = [1, 2, 3, 4, 5];
	const b = a[2];

	/*
		type X = typeof a["length"];

		const arr = [1, 2, 3] as const;
		type N = typeof arr[number];
	*/

	type IndexesOf<T extends readonly unknown[], S extends number[] = []> = T["length"] extends S["length"] ? S[number] : IndexesOf<T, [S["length"], ...S]>;
	type TypeKeys<T extends object> = T extends { [k in infer V]: any } ? V : never;

	type IndexesOfA = IndexesOf<typeof a>;

	a.map((_, i: IndexesOfA) => {
		const c = a[i];
	});

	// *********************************************************************************

	type Row = "a" | "b";
	type Col = 1 | 2;

	const toPosition = (position: `${Row}${Col}`) => {};

	// *********************************************************************************

	type CountTo<N extends number, S extends 0[] = []> = S["length"] extends N ? S : CountTo<N, [...S, 0]>;
	type Inc<N extends number> = [...CountTo<N>, 0]["length"];
	type Dec<N extends number> = CountTo<N> extends [infer H, ...infer T] ? T["length"] : 0;

	type Result = CountTo<10>;

	// ********************************************************************************* Look up types

	type A = ["a", 0, "b", 1];
	type Index = A[number];

	type Person = {
		name: {
			first: string;
			last: string;
		};
		age: number;
		address: {
			country: string;
			state: string;
			city: string;
			zip_code: number;
		};
		friends: Person[];
		gender: "male" | "female";
	};

	type PersonFields = keyof Person;
	let fields: PersonFields[] = ["gender", "friends"];

	let name: Person["name"];
	let friend: Person["friends"][0];
	let oneOfTheFriends: Person["friends"][number];

	// *********************************************************************************************
	type User = {
		id: number;
		firstName: string;
		lastName: string;
		email: string;
	};

	// all possible combinations will be there
	type Primitive = string | number | symbol;
	type TupleUnion<U extends Primitive, R extends Primitive[] = []> = { [S in U]: Exclude<U, S> extends never ? [...R, S] : TupleUnion<Exclude<U, S>, [...R, S]> }[U] & string[];

	// ----------------------------------------------------------------------------------------------
	type ValueOf<T extends object> = T[keyof T];
	type KeyOf<T extends object, V extends ValueOf<T>> = ValueOf<{ [K in keyof T]: V extends T[K] ? K : never }>;

	// Impliment IndexOf
}
