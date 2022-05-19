namespace Singleton {
	// name space just to scope variable names
	class Process<T> {
		constructor(public state: T) {}
	}

	class ProcessManager {
		constructor(public numProcess: number = 0) {}
	}

	const Singleton = (function () {
		let pManager: ProcessManager;

		function createProcessManager() {
			pManager = new ProcessManager();
		}

		return {
			getProcessManager: () => {
				if (!pManager) createProcessManager();

				return pManager;
			},
		};
	})();

	let pm = Singleton.getProcessManager();
	let pm1 = Singleton.getProcessManager();

	console.log(pm == pm1);
}
