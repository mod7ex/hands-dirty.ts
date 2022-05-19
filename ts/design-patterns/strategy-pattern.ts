namespace Strategy {
	type Packet = object & { from: string; to: string };

	interface IShipping {
		calculate: (packet: Packet) => number | void;
	}

	class Fedex implements IShipping {
		calculate(packet: Packet) {
			// do some stuff
			return 2.5;
		}
	}

	class UPS implements IShipping {
		calculate(packet: Packet) {
			// do some stuff
			return 1.9;
		}
	}

	class USPS implements IShipping {
		calculate(packet: Packet) {
			// do some stuff
			return 2.7;
		}
	}

	class Shipping implements IShipping {
		constructor(public company?: IShipping) {}

		setStrategy(company: IShipping) {
			this.company = company;
			return this;
		}

		calculate(packet: Packet) {
			if (this.company) return this.company.calculate(packet);
		}
	}

	let fedex = new Fedex();
	let ups = new UPS();
	let usps = new USPS();

	let packet = { from: "morocco", to: "russia", weight: 13 };

	fedex.calculate(packet);
	ups.calculate(packet);
	usps.calculate(packet);

	let shipping = new Shipping();

	let fedexCalc = shipping.setStrategy(fedex).calculate(packet);
	let upsCalc = shipping.setStrategy(ups).calculate(packet);
	let uspsCalc = shipping.setStrategy(usps).calculate(packet);
}
