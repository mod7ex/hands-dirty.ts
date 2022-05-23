import fetch from "node-fetch";

namespace Facade {
	// imagine for example later we will use axios instead so we will change it once (:

	// The facade function
	async function getFetch(url: string, params: { [k: string | number]: string | number } = {}) {
		let query = Object.entries(params)
			.map(([key, val]) => `${key}=${val}`)
			.join("&");

		return fetch(`${url}?${query}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		}).then((res) => res.json());
	}

	function getUsers() {
		return getFetch("localhost:300/users");
	}

	function getUser(id: number) {
		return getFetch("localhost:300/users", { id });
	}
}
