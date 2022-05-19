function Process(state) {
	this.state = state;
}

function ProcessManager() {
	this.numProcess = 0;
}

const Singleton = (function () {
	let pManager;

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
