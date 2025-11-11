var tasks = {};

tasks["Coffee time"] = {
	display: "Coffee time ☕",
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

tasks["Go to uni"] = {
	display: "Go to uni 🎓",
	value: 10,
	img: "img/uni.png",

	subtasks: {
		electronic: {
			display: "Electronic classes",
			value: 2,
			img: "img/uni_electronic.png"
		},
		maths: {
			display: "Math classes",
			value: 2,
			img: "img/uni_maths.png"
		},
		programming: {
			display: "Programming classes",
			value: 3,
			img: "img/uni_programming.png"
		}
	}
};

function popoulateTable() {
	console.log("Populating table...");

	const table = document.getElementById("task-table");

	for (var taskName in tasks) {
		let task = tasks[taskName];
		let row = table.insertRow();

		let name = row.insertCell(0);
		name.innerHTML = task.display;

		let value = row.insertCell(1);
		value.innerHTML = task.value;

		if (task.hasOwnProperty("subtasks")) {
			for (var subtaskName in task.subtasks) {
				let subtask = task.subtasks[subtaskName];
				let row = table.insertRow();

				let name = row.insertCell(0);
				name.innerHTML = subtask.display;

				let value = row.insertCell(1);
				value.innerHTML = subtask.value;
			}
		}
	};
}

function ready() {
	popoulateTable();
}

// $(document).ready(function() {
// 	popoulateTable();
// });