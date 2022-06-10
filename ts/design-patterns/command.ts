namespace Command {
	interface Command {
		execute: (v: number) => number;
		undo: (v: number) => number;
	}

	class Calculator {
		private commands: Command[] = [];

		constructor(private _value: number = 0) {}

		get value() {
			return this._value;
		}

		execute(command: Command) {
			this._value = command.execute(this._value);
			this.commands.push(command);
		}

		undo() {
			let command = this.commands.pop();
			command?.undo(this._value);
		}
	}

	class AddCommand implements Command {
		constructor(public _value: number) {}

		execute(v: number) {
			return v + this._value;
		}

		undo(v: number) {
			return v - this._value;
		}
	}

	class SubtractCommand implements Command {
		constructor(public _value: number) {}

		execute(v: number) {
			return v - this._value;
		}

		undo(v: number) {
			return v + this._value;
		}
	}

	class MultiplyCommand implements Command {
		constructor(public _value: number) {}

		execute(v: number) {
			return v * this._value;
		}

		undo(v: number) {
			return v / this._value;
		}
	}

	class DividCommand implements Command {
		constructor(public _value: number) {}

		execute(v: number) {
			return v / this._value;
		}

		undo(v: number) {
			return v * this._value;
		}
	}

	// *******************

	let calculator = new Calculator();

	calculator.execute(new AddCommand(10));
	calculator.execute(new MultiplyCommand(2));

	console.log(calculator.value);
}
