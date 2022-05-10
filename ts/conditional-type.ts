namespace ConditionalType {
	function someFunction<T>(value: T) {
		type A = T extends boolean ? "Type A" : T extends string ? "Type B" : T extends number ? "Type C" : "Type D";

		return (arg: T extends boolean ? "Type A" : "Type B") => {
			const a: "Type A" | "Type B" = arg;

			return a;
		};
	}

	let foo = someFunction(true);

	type Z = Exclude<"a" | "b" | "c", "a" | "b">;

	// ************************************************************** Distributive effect

	type MyTypeD<T> = T extends string | number ? T : never; // Distributive
	type MyTypeND<T> = (() => T) extends () => string | number ? T : never; // none-Distributive
	type MyTypeND1<T> = [T] extends [string | number] ? T : never; // none-Distributive

	type MyResult = MyTypeND<boolean | "boolean">;

	// **************************************************************
}
