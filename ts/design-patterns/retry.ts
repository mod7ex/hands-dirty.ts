namespace Retry {
	/*
	 * don't (retry for example in case of password incorrect)
	 * retry immediatly
	 * retry after delay
	 */

	// function used for delay in the loop
	function sleep(ms: number) {
		return new Promise((resolve) => {
			setTimeout(resolve, ms);
		});
	}

	let fetchData = () => {
		setTimeout(() => {
			console.log("data fetched");
		}, 1500);

		let random = Math.random();

		if (random < 0.4) throw new Error("ops");

		return true;
	};

	async function retryOperation(maxCount = 5, delay: boolean, ms: number = 3000) {
		let retryCount = 0;

		while (true) {
			try {
				fetchData();
				console.log("succeeded");
				break;
			} catch (error: any) {
				retryCount++;
				console.log(`failed attempt ${retryCount}`);

				if (retryCount > maxCount) {
					console.log("Retry maximum reached. Exiting");
					break;
				}
			}

			if (delay) await sleep(ms);
		}
	}
}
