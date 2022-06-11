namespace Dependency_Inversion {
	namespace BAD {
		// imagine we want to switch to paypal and stop using stripe
		// we will have to change the store logic and code ======> bad

		class Paypal {
			constructor(private user: object) {}

			makePayment(dollars: number) {
				console.log(`${this.user} made payment of $${dollars} with Paypal`);
			}
		}

		class Stripe {
			constructor(private user: object) {}

			makePayment(cents: number) {
				console.log(`${this.user} made payment of $${cents / 100} with Stripe`);
			}
		}

		class Store {
			private stripe: Stripe;

			constructor(private user: object) {
				this.stripe = new Stripe(user);
			}

			purchaseBike(quantity: number) {
				this.stripe.makePayment(200 * quantity * 100);
			}

			purchaseHelmet(quantity: number) {
				this.stripe.makePayment(15 * quantity * 100);
			}
		}

		let user = {
			first_name: "Mourad",
			last_name: "EL CADI",

			[Symbol.toPrimitive]: function () {
				return `${this.first_name} ${this.last_name}`;
			},
		};

		let store = new Store(user);
		store.purchaseBike(2);
		store.purchaseHelmet(3);
	}

	namespace GOOD {
		class PaymentProcessor {
			constructor(private user: object, private _name: string) {}

			pay(cents: number) {
				console.log(`${this.user} made payment of $${cents / 100} with ${this._name}`);
			}
		}

		class Paypal extends PaymentProcessor {
			constructor(private _user: object) {
				super(_user, "Paypal");
			}
		}

		class Stripe extends PaymentProcessor {
			constructor(private _user: object) {
				super(_user, "Stripe");
			}
		}

		class Store {
			constructor(private payment_processor: PaymentProcessor) {}

			purchaseBike(quantity: number) {
				this.payment_processor.pay(200 * quantity);
			}

			purchaseHelmet(quantity: number) {
				this.payment_processor.pay(15 * quantity);
			}
		}

		let user = {
			first_name: "Mourad",
			last_name: "EL CADI",

			[Symbol.toPrimitive]: function () {
				return `${this.first_name} ${this.last_name}`;
			},
		};

		let store = new Store(new Paypal(user));
		store.purchaseBike(2);
		store.purchaseHelmet(3);
	}
}
