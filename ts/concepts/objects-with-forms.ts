namespace ObjectsWithForms {
	/*
        Not completed yet !!!!
    */
	let dirty = Symbol("Missed with form");

	let form = {
		[Symbol.iterator]() {},
	};

	let handler: ProxyHandler<object> = {
		get(target, prop, receiver) {
			if (typeof prop === "string") {
				if (prop.startsWith("__dirty__")) {
					return !!Reflect.get(target, prop, receiver);
				}
			}

			return Reflect.get(target, prop, receiver);
		},

		set(target, prop, value, receiver) {
			if (typeof prop === "string" && !prop.startsWith("__dirty__")) {
				let oldValue = Reflect.get(target, prop, receiver);
				if (oldValue != value) {
					Reflect.set(target, `__dirty__${prop}`, true, receiver);
					Reflect.set(target, "__dirty__$", true, receiver);
				}
			}

			return Reflect.set(target, prop, value, receiver);
		},

		has(target, prop) {
			if (typeof prop === "string" && prop.startsWith("__dirty__")) {
				return false;
			}

			return Reflect.has(target, prop);
		},

		ownKeys(target) {
			return Reflect.ownKeys(target).filter((prop) => {
				if (typeof prop === "symbol") return true;
				return !prop.startsWith("__dirty__");
			});
		},
	};

	let proxiedForm = new Proxy(form, handler);
}
