namespace Singleton {
	class ProcessManager {
		constructor(public numProcess: number = 0) {}
	}

	const Singleton = (function () {
		let pManager: ProcessManager;

		return {
			getProcessManager: () => {
				if (!pManager) pManager = new ProcessManager();

				return pManager;
			},
		};
	})();

	let pm = Singleton.getProcessManager();
	let pm1 = Singleton.getProcessManager();

	console.log(pm == pm1);

	/* ***************** Handle Singlton logic inside the class ***************** */
	// =======+> the prefered way
	class Logger {
		private static _instance: Logger | undefined; // here we will handle the uniqueness of the instance

		constructor(private logs: string[] = []) {
			if (!Logger._instance) {
				Logger._instance = this;
			}

			return Logger._instance;
		}

		log(msg: string) {
			this.logs.push(msg);
		}

		logsCount() {
			return this.logs.length;
		}
	}

	let a = new Logger();

	let b = new Logger();

	console.log(a === b); // true
}
