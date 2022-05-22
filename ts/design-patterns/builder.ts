namespace Builder {
	class Address {
		constructor(public zip: string, public street: string) {}
	}

	class User {
		constructor(public name: string, public age?: number, public phone?: number, public address?: string) {}
	}

	// it's bad to have these undefined being assigned here imagine we have 20 optional params
	let user = new User("Mourad", undefined, undefined, "CASA");

	/* ************** Builder Pattern the old way ************** */
	class UserBuilder {
		public user: User;

		constructor(public name: string) {
			this.user = new User(name);
		}

		setAge(_age: number) {
			this.user.age = _age;
			return this;
		}

		setPhone(_phone: number) {
			this.user.phone = _phone;
			return this;
		}

		setAddress(_address: string) {
			this.user.address = _address;
			return this;
		}

		build() {
			return this.user;
		}
	}

	let otherUser = new UserBuilder("Mourad").setAge(24).setAddress("CASA").build();

	/* ************** Builder Pattern the new way ************** */

	class CUser {
		public age?: number;
		public phone?: number;
		public address?: string;

		constructor(public name: string, { age, phone, address = "CASA" }: { age?: number; phone?: number; address?: string } = {}) {
			this.age = age;
			this.phone = phone;
			this.address = address;
		}
	}

	let cuser = new CUser("Mourad", { age: 24 });
}
