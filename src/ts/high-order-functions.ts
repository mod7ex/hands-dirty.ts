let fib = (n: number, x?: any): number => {
	if (n <= 0) return 0;
	if (n === 1) return 1;
	return fib(n - 1) + fib(n - 2);
};

let delayedSum = (a: number, b: number): Promise<number> => {
	const sum = a + b;
	return new Promise((resolve) => setTimeout(() => resolve(sum), sum));
};

type Fn = (...args: any[]) => any;

function latency<T extends Fn>(fn: T, label: string) {
	// label is used in case function is used for logs or to notice the log in console ... for observing
	// tracks how long a function takes to run
	return (...args: Parameters<T>): ReturnType<T> => {
		let start = Date.now();
		let val = fn(...args);
		console.log(label, Date.now() - start);
		return val;
	};
}

type PromiseIner<T> = T extends Promise<infer N> ? N : never; // built-in api in typescript called 'Awaited'

// implementation for async functions
function latencyAsync<T extends Fn>(fn: T, label: string) {
	return async (...args: Parameters<T>): Promise<Awaited<ReturnType<T>>> => {
		// return async (...args: Parameters<T>): Promise<PromiseIner<ReturnType<T>>> => {
		let start = Date.now();
		let val = await fn(...args);
		console.log(label, Date.now() - start);
		return val;
	};
}
