namespace Index {
	/*
    --> the function countSubStrings counts how many (separated or not) times the srearchSubject appears in str
    --> countSubStrings('sss', 'ss', true) => 1
    --> countSubStrings('sss', 'ss') => 2
*/

	/*

const countSubStrings = (str: string, srearchSubject: string, separated: boolean): number => {
	if (!srearchSubject) return 0;

	let step: number = separated ? srearchSubject.length : 1,
		count: number = 0,
		i: number = 0,
		r: number;

	while (true) {
		r = str.indexOf(srearchSubject, i);
		if (r !== -1) [count, i] = [count + 1, r + step];
		else return count;
	}
};

let maybeRun = function (cb: Function, allow: boolean, ctx: object = window) {
	return function () {
		if (!allow) return;

		cb.call(ctx, ...arguments);
		// cb.apply(ctx, arguments);
	};
};

*/

	// *********************************************************************************

	type Falsy = null | undefined | false | "" | 0;

	type NotFalsy<T = Falsy> = T extends Falsy ? never : T;

	let x: NotFalsy<string> = "";

	// *********************************************************************************

	// it filters U from T --- called Exclude in ts ---
	type Filter<T, U> = T extends U ? never : T;

	type FilteredResult = Filter<"a" | "b" | "c", "a" | "z">;

	// *********************************************************************************

	// *********************************************************************************
}
