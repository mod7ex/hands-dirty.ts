namespace Proxies {
	/*
		proxied array constructor where we have extended Array by adding the findById method
		IndexedArray extends Array but it holdes only indexed objects
	*/
	type Key = number | string | symbol;
	type IndexedObj = object & { id: Key };

	let handler: ProxyHandler<typeof Array> = {
		construct(target, args: IndexedObj[]) {
			let index: { [k in Key]: IndexedObj } = {};

			args.forEach((item) => (index[item.id] = item));

			return new Proxy(new target(...args), {
				get(arr, prop, receiverArr) {
					if (prop === "push") {
						return (item: IndexedObj) => {
							index[item.id] = item;
							arr["push"].call(arr, item);
						};
					}

					if (prop === "findById") {
						return (id: number) => index[id];
					}

					return Reflect.get(arr, prop, receiverArr);
				},
			});
		},
	};

	const IndexedArray = new Proxy(Array, handler);

	let data = new IndexedArray({ id: 1, name: "Mourad" }, { id: 2, name: "Almode" });
}
