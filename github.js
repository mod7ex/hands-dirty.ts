const jsonfile = require("jsonfile");
const moment = require("moment");
const simpleGit = require("simple-git");

const FILE_PATH = "./bot.json";

let pushFakeCommits = (n) => {
	if (n === 0) return simpleGit().push();

	let x = Math.floor(Math.random() * 55);
	let y = Math.floor(Math.random() * 7);

	let date = moment().subtract(1, "y").add(1, "d").add(x, "w").add(y, "d").format();

	console.log(date);

	jsonfile.writeFile(
		FILE_PATH,
		{
			date,
		},
		() => {
			simpleGit()
				.add(FILE_PATH)
				.commit(date, { "--date": date }, pushFakeCommits.bind(this, --n));
		}
	);
};

pushFakeCommits(1);
