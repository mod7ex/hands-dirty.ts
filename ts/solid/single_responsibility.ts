namespace SingleRespo {
	/*
    // Wrong !!!
	class CalorieTracker {
		private currentCalories: number = 0;

		constructor(private maxCalories: number) {}

		logCalorieSurplus() {
			// the responsability of logging shouldn't be inside the class (single responsability)
			console.log("Max calories exceeded");
		}

		trackCalories(count: number) {
			this.currentCalories += count;

			if (this.currentCalories > this.maxCalories) {
				this.logCalorieSurplus();
			}
		}
	}
    */

	class Logger {
		// better to move it to a separated module
		constructor() {}

		error(err: Error) {
			console.error(err);
		}

		info(msg: string) {
			console.log(msg);
			// ADD email() for example
		}
	}

	let logger = new Logger();

	class CalorieTracker {
		private currentCalories: number = 0;
		// private logger: Logger = new Logger();

		constructor(private maxCalories: number) {}

		trackCalories(count: number) {
			this.currentCalories += count;

			if (this.currentCalories > this.maxCalories) {
				// this.logger.info("Max calories exceeded");
				logger.info("Max calories exceeded");
			}
		}
	}
}
