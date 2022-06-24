namespace Mixins_Multiple_Class_Inheritance {
	class Disposable {
		isDisposed: boolean = false;
		dispose() {
			this.isDisposed = true;
		}
	}

	class Activatable {
		isActive: boolean = false;
		activate() {
			this.isActive = true;
		}
		deactivate() {
			this.isActive = false;
		}
	}

	// We want to create a 'Example' class that inherits from both classes, but in typescript it's not allowed
	// so we use Mixins

	// create mixins
	type Class = new (...args: any[]) => any; // any class can be written this way
	function SomeMixin<Base extends Class>(base: Base) {
		return class extends base {
			// basic mixin logic ...
		};
	}

	function DisposableMixin<Base extends Class>(base: Base) {
		return class extends base {
			isDisposed: boolean = false;
			dispose() {
				this.isDisposed = true;
			}
		};
	}

	function ActivatableMixin<Base extends Class>(base: Base) {
		return class extends base {
			isActive: boolean = false;
			activate() {
				this.isActive = true;
			}
			deactivate() {
				this.isActive = false;
			}
		};
	}

	class Example extends DisposableMixin(
		ActivatableMixin(
			class {
				member = 101;
			}
		)
	) {
		constructor(_a: boolean, _b: boolean) {
			// using this way typescript will create both the class and the type
			super();
			this.isActive = _a;
			this.isDisposed = _b;
			this.activate();
			// ...
		}
	}
	let exm: Example = new Example(false, true);

	/*
    // ******************** One way ********************
        const Example = DisposableMixin(
            ActivatableMixin(
                class {
                    member = 101;
                }
            )
        );

        let ex = new Example();
        ex.activate();
        ex.dispose();

        type Example = InstanceType<typeof Example>;

        let takeExample = (example: Example) => {
            example.activate();
            example.dispose();
            console.log(example.member);
        };
    */
}
