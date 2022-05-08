let modex = {
	f_name: "Mourad",
	l_name: "EL CADI",
};

let printFullName = function (x, y) {
	console.log(this.f_name + " " + this.l_name, x, y);
};

/* *********** default bind function *********** */

let foo = printFullName.bind(modex, "3");
foo(55);

/* *********** custom bind function *********** */

Function.prototype.myBind = function (...args) {
	let fonc = this;

	return function () {
		fonc.call(args[0], ...args.slice(1), ...arguments);
		// fonc.apply(args[0], [...args.slice(1), ...arguments]);
	};
};

let goo = printFullName.myBind(modex, "aroo");
goo(9663);
