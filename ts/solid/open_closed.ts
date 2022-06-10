namespace OpenClosed {
	type Quiz = object & { type: "text" | "multi-choice" | "boolean"; options: { option: string }[] };

	// Most likely if you see a switch statement you're violating the open-closed principle
	// imagine we want to add an other type ==> range(min, max), then we modify the type and function...

	function printQuiz(questions: Quiz[]) {
		questions.forEach(({ type, options }) => {
			switch (type) {
				case "boolean":
					console.log("1. True");
					console.log("2. False");
					break;

				case "multi-choice":
					options.forEach((option, i) => {
						console.log(`${i + 1}. ${option}`);
					});
					break;

				case "text":
					console.log("Answer: _______________");
					break;

				default:
					break;
			}
			console.log("");
		});
	}

	/*
	 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * * * * * * * * * * *  * * * * * *  OPEN-CLOSED principle * * * * * * * * * * * * * * * * *
	 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 */

	interface Question {
		description?: string;
		print: () => void;
	}

	class BooleanQuestion implements Question {
		public description: string;

		constructor(_description: string) {
			this.description = _description;
		}

		print() {
			console.log("1. True");
			console.log("2. False");
		}
	}

	class MultiChoiceQuestion implements Question {
		public description: string;

		constructor(private options: string[], _description: string) {
			this.description = _description;
		}

		print() {
			this.options.forEach((option, i) => {
				console.log(`${i + 1}. ${option}`);
			});
		}
	}

	class TextQuestion implements Question {
		public description: string;

		constructor(_description: string) {
			this.description = _description;
		}

		print() {
			console.log("Answer: _______________");
		}
	}

	function $printQuiz(questions: Question[]) {
		// this function is open for new question types to be created (added) but closed for change (edit)
		// Got it ? (: =======>  <closed for changes open for extension>
		questions.forEach((question) => {
			console.log(question.description);
			question.print();
			console.log("");
		});
	}

	// now even on new question type added we will just create a new instance and the function won't be changed
	let questions = [new BooleanQuestion("Do you live in morocco"), new MultiChoiceQuestion(["male", "female"], "What is your gender"), new TextQuestion("Describe your experience ...")];

	$printQuiz(questions);
}
