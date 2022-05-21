namespace Mediator {
	// visitor object and receiver object

	class Employee {
		constructor(public name: string, private _salary: number) {}

		get salary() {
			return this._salary;
		}

		set salary(v: number) {
			this._salary = v;
		}

		accept(visitor: Function) {
			// visitor.call(this, this); // accept it as context and argument
			visitor.call(this);
		}
	}

	function extraSalary(this: Employee) {
		this.salary = this.salary * 2;
	}

	let mourad = new Employee("Mourad EL CADI", 5000);

	console.log(mourad.salary);

	mourad.accept(extraSalary);

	console.log(mourad.salary);
}
