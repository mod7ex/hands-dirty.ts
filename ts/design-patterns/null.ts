namespace NullPattern {
	class User {
		constructor(public id: number, public name: string) {}

		hasAccess() {
			return this.name === "Mourad";
		}
	}

	class NullUser {
		// the null version of class User
		constructor(public id: number = -1, public name: string = "Mourad") {}

		hasAccess() {
			return false;
		}
	}

	const users = [new User(1, "Mourad"), new User(2, "Ali")];

	function getUser(uId: number) {
		// this function takes care of all the checkes if(!user) in our code
		let user = users.find(({ id }) => id === uId) ?? new NullUser();

		return user;
	}
}
