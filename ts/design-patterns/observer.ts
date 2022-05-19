namespace Observer {
	// One to Many

	type Subscriber = (...args: any[]) => any;

	class Subject<T> {
		constructor(public observers: Set<Subscriber> = new Set<Subscriber>()) {}

		subscribe(fn: Subscriber) {
			this.observers.add(fn);
		}

		unSubscribe(fn: Subscriber) {
			this.observers.delete(fn);
		}

		trigger() {
			this.observers.forEach((run) => run());
		}
	}
}
