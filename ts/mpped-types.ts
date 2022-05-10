namespace MappedTypes {
	type Z = { [key in string]: key };

	let z: Z = {
		mod: "hello",
	};

	type Props = "propA" | "propB" | "propC";
	type D = { [key in Props]: key } & { id: number };

	type MappedProps<Properties extends string | number | symbol, T = string> = { [key in Properties]: T };

	type ObjectFromExtractedProps<T, V = string> = { [key in keyof T]: V };

	type C_ObjectFromExtractedProps<T> = { readonly [key in keyof T]?: T[key] };

	type C_Record<Keys extends string | number | symbol, Val> = { [k in Keys]: Val };

	type C_Pick<T extends object, Props extends keyof T> = { [k in Props]: T[k] };
}
