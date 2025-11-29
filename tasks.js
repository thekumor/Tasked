var tasks = {};

tasks["Coffee"] = {
	display: "Drink coffee ☕",
	value: 5,
	img: "img/coffee.png",
};

tasks["Walk the dog"] = {
	display: "Walk the dog 🐕",
	value: 7,
	img: "img/dog.png",
};

tasks["Go fishing"] = {
	display: "Go fishing 🐟",
	value: 3,
	img: "img/fish.png"
};

tasks["Study"] = {
	display: "Study 📚",
	value: 8,
	img: "img/study.png"
};

tasks["Grocery shopping"] = {
	display: "Grocery shopping 🛒",
	value: 4,
	img: "img/grocery.png"
};

tasks["Exercise"] = {
	display: "Exercise 🏋️",
	value: 6,
	img: "img/exercise.png",

	subtasks: {
		cardio: {
			display: "Cardio",
			value: 3,
		},
		weights: {
			display: "Weight training",
			value: 3,
		},
		stretching: {
			display: "Stretching",
			value: 2,
		}
	}
};

tasks["Read a book"] = {
	display: "Read a book 📖",
	value: 3,
	img: "img/book.png"
};

tasks["Clean the house"] = {
	display: "Clean the house 🧹",
	value: 5,
	img: "img/clean.png",

	subtasks: {
		vacuum: {
			display: "Vacuuming",
			value: 2,
		},
		dusting: {
			display: "Dusting",
			value: 2,
		},
		mopping: {
			display: "Mopping",
			value: 2,
		}
	}
};

// Compute standard deviation
var values = [];
var avg = 0;
for (var key in tasks) {
	const task = tasks[key];
	values.push(task.value);
	avg += task.value;
}
avg /= values.length;
const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
const squaredDiffs = values.map(val => {
	const diff = val - mean;
	return diff * diff;
});
const variance = squaredDiffs.reduce((sum, val) => sum + val, 0) / (values.length - 1);
const standardDeviation = Math.sqrt(variance);

// Assign stars based on standard deviation.
var stars = {};
for (var key in tasks) {
	const task = tasks[key];

	stars[key] = { value: 0, subtasks: {} };

	if (task.value >= avg + 1.0 * standardDeviation)
		stars[key].value = 5;
	else if (task.value >= avg + 0.5 * standardDeviation)
		stars[key].value = 4;
	else if (task.value >= avg)
		stars[key].value = 3;
	else if (task.value >= avg - 0.5 * standardDeviation)
		stars[key].value = 2;
	else
		stars[key].value = 1;

	for (var subkey in tasks[key].subtasks || {}) {
		const subtask = task.subtasks[subkey];

		stars[key].subtasks[subkey] = { value: 0 };

		if (subtask.value >= avg + 0.9 * standardDeviation)
			stars[key].subtasks[subkey].value = 5;
		else if (subtask.value >= avg + 0.5 * standardDeviation)
			stars[key].subtasks[subkey].value = 4;
		else if (subtask.value >= avg)
			stars[key].subtasks[subkey].value = 3;
		else if (subtask.value >= avg - 0.5 * standardDeviation)
			stars[key].subtasks[subkey].value = 2;
		else
			stars[key].subtasks[subkey].value = 1;
	}
}

function fillCard(parent, task, starValue) {
	var stars = "";
	for (var i = 0; i < starValue || 0; i++)
		stars += "⭐";

	var name = document.createElement("span");
	name.style.fontWeight = "bold";
	name.style.fontSize = "1.2em";
	name.innerText = stars + " " + task.display;
	parent.appendChild(name);

	var value = document.createElement("span");
	value.innerText = "\nValue: " + task.value;
	value.style.marginLeft = "2vw";
	parent.appendChild(value);

	var check = document.createElement("input");
	check.type = "checkbox";
	check.style.float = "right";
	parent.appendChild(check);
}

function popoulateTable() {
	console.log("Populating table...");

	for (var key in tasks) {
		var task = tasks[key];

		var parent = document.createElement("div");
		parent.className = "task-card";
		document.body.appendChild(parent);

		fillCard(parent, task, stars[key].value);

		for (var subkey in task.subtasks || {}) {
			var subtask = task.subtasks[subkey];

			var subparent = document.createElement("div");
			subparent.className = "task-subcard";
			parent.appendChild(subparent);
			fillCard(subparent, subtask, stars[key].subtasks[subkey].value);
		}
	}
}

function createFooter() {
	var footer = document.createElement("div");
	footer.className = "footer";
	document.body.appendChild(footer);

	var points = document.createElement("span");
	points.innerText = "Total value: 0 points\n";
	footer.appendChild(points);

	var save = document.createElement("button");
	save.innerText = "Save Progress";
	footer.appendChild(save);
}

function ready() {
	popoulateTable();
	createFooter();
}