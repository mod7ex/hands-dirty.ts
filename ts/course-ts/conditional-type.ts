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

    type TypeName<T> = 
        T extends string ? 'string' :
        T extends number ? 'number' : 
        T extends symbol ? 'symbol' : 
        T extends Function ? 'function' : 
        T extends null ? 'null' : 
        T extends undefined ? 'undefined' : 
        T extends boolean ? 'boolean' : 
        'object';

    function typeName<T>(t: T): TypeName<T>{
        return typeof t as TypeName<T>
    }

    let str = typeName("Modex98");
    let n = typeName(null);
}
