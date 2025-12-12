// ================================================
// 
//	Script: tasks.js
//	Handles task display and interaction.
//	by The Kumor
// 
// ================================================

import { tasks } from "./tasks_data.js";

// Compute standard deviation
var values = [];
var avg = 0;
var min = Infinity;
var max = 0;
for (var key in tasks) {
	const task = tasks[key];
	values.push(task.value);

	avg += task.value;
	max = task.value > max ? task.value : max;
	min = task.value < min ? task.value : min;
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
const star5 = avg + standardDeviation
const star4 = avg + 0.5 * standardDeviation;
const star3 = avg - 0.5 * standardDeviation;
const star2 = avg - standardDeviation;
// star1 doesn't exist, the range for it is 0 - star2

console.log("star5: " + star5);
console.log("star4: " + star4);
console.log("star3: " + star3);
console.log("star2: " + star2);
console.log("avg: " + avg);
console.log("stddev: " + standardDeviation);
console.log("min: " + min);
console.log("max: " + max);

var stars = {};
for (var key in tasks) {

	const task = tasks[key];

	stars[key] = { value: 0, subtasks: {} };
	var taskStars = stars[key];

	if (task.value >= star5)
		taskStars.value = 5;
	else if (task.value >= star4)
		taskStars.value = 4;
	else if (task.value >= star3)
		taskStars.value = 3;
	else if (task.value >= star2)
		taskStars.value = 2;
	else
		taskStars.value = 1;

	for (var subkey in tasks[key].subtasks || {}) {
		const subtask = task.subtasks[subkey];

		stars[key].subtasks[subkey] = { value: 0 };
		var subtaskStars = stars[key].subtasks[subkey];

		if (subtask.value >= star5)
			subtaskStars.value = 5;
		else if (subtask.value >= star4)
			subtaskStars.value = 4;
		else if (subtask.value >= star3)
			subtaskStars.value = 3;
		else if (subtask.value >= star2)
			subtaskStars.value = 2;
		else
			subtaskStars.value = 1;
	}
}

var checkedPoints = 0;
var checkedTasks = [];
function FillCard(parent, key, task, starValue) {
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

	check.addEventListener("change", (event) => {
		var checked = event.target.checked;

		if (checked) {
			name.innerText = "[ ✅ ]" + stars + " " + task.display;
			parent.style.backgroundColor = "rgba(109, 146, 109, 1)";

			if (task.custom === undefined) {
				checkedPoints += task.value;
				console.log(task.display + " points added: " + task.value)

				checkedTasks.push(task);
			}
			else {
				for (var customKey in task.custom) {
					if (task.custom[customKey] == false) continue;

					console.log("Including custom task in checked tasks: " + customKey);
					checkedTasks.push(tasks[customKey]);
					checkedPoints += tasks[customKey].value;
				}
			}
		}
		else {
			name.innerText = stars + " " + task.display;
			parent.style.backgroundColor = "brown";

			if (task.custom === undefined) {
				checkedPoints -= task.value;
				console.log(task.display + " points removed: " + task.value);

				checkedTasks = checkedTasks.filter(t => t !== task);
			}
			else {
				for (var customKey in task.custom) {
					if (task.custom[customKey] == false) continue;

					console.log("Removing custom task from checked tasks: " + customKey);
					checkedTasks = checkedTasks.filter(t => t !== tasks[customKey]);
					checkedPoints -= tasks[customKey].value;
				}
			}
		}

		var footerPoints = document.getElementById("points");
		footerPoints.innerText = "Total value: " + checkedPoints + " points\n";
	});

	if (task.custom !== undefined) {
		var addCustom = document.createElement("button");
		addCustom.innerText = "Add";
		addCustom.style.float = "right";
		parent.appendChild(addCustom);

		addCustom.addEventListener("click", () => {
			var customTaskName = prompt("Enter custom task name:");
			var customKey = key + customTaskName;

			if (customTaskName && !tasks[customKey]) {
				tasks[customKey] = {
					display: task.display + " " + customTaskName,
					value: task.value,
					img: task.img
				};

				task.custom[customKey] = true;

				var customTaskInfo = document.createElement("span");
				customTaskInfo.innerText = "\n----\n" + tasks[customKey].display + "\nValue: " + tasks[customKey].value + "\n----\n";
				customTaskInfo.id = customKey;
				parent.appendChild(customTaskInfo);

				if (check.checked) {
					checkedTasks.push(tasks[customKey]);
					checkedPoints += tasks[customKey].value;

					var footerPoints = document.getElementById("points");
					footerPoints.innerText = "Total value: " + checkedPoints + " points\n";
				}

				console.log("Custom task added: " + customKey);
			}
		});

		var removeCustom = document.createElement("button");
		removeCustom.innerText = "Remove";
		removeCustom.style.float = "right";
		parent.appendChild(removeCustom);

		removeCustom.addEventListener("click", () => {
			var customTaskName = prompt("Enter custom task name to remove:");
			var customKey = key + customTaskName;

			if (customTaskName && tasks[customKey]) {
				task.custom[customKey] = false;

				var customTaskInfo = document.getElementById(customKey);
				if (customTaskInfo) {
					customTaskInfo.remove();
				}

				if (checkedTasks.includes(tasks[customKey])) {
					checkedTasks = checkedTasks.filter(t => t !== tasks[customKey]);
					checkedPoints -= tasks[customKey].value;

					var footerPoints = document.getElementById("points");
					footerPoints.innerText = "Total value: " + checkedPoints + " points\n";
				}

				console.log("Custom task removed: " + customKey);
			}
		});
	}
}

function PopoulateTable() {
	console.log("Populating table...");

	for (var key in tasks) {
		var task = tasks[key];

		var parent = document.createElement("div");
		parent.className = "task-card";
		document.body.appendChild(parent);

		parent.addEventListener("click", (event) => {
			var input = event.target.getElementsByTagName("input")[0];

			if (input) {
				input.checked = !input.checked;
				var event = new Event('change');
				input.dispatchEvent(event);
			}
		});

		FillCard(parent, key, task, stars[key].value);

		for (var subkey in task.subtasks || {}) {
			var subtask = task.subtasks[subkey];

			var subparent = document.createElement("div");
			subparent.className = "task-subcard";
			parent.appendChild(subparent);
			FillCard(subparent, subkey, subtask, stars[key].subtasks[subkey].value);
		}
	}
}

function CreateFooter() {
	var footer = document.createElement("div");
	footer.className = "footer";
	document.body.appendChild(footer);

	var dateLabel = document.createElement("span");
	dateLabel.innerText = "Select Date: ";
	footer.appendChild(dateLabel);

	var dateSelect = document.createElement("input");
	dateSelect.type = "date";
	footer.appendChild(dateSelect);

	var separator = document.createElement("hr");
	footer.appendChild(separator);

	var points = document.createElement("span");
	points.id = "points";
	points.innerText = "Total value: 0 points\n";
	footer.appendChild(points);

	var save = document.createElement("button");
	save.innerText = "Save Progress";
	footer.appendChild(save);

	save.addEventListener("click", () => {
		console.log("Requesting save...");
		alert("Progress saved!");

		fetch("database.php", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: "date=" + encodeURIComponent(dateSelect.value) + "&tasks=" + JSON.stringify(checkedTasks) + "&action=save",
		})
			.then(response => response.text())
			.then(data => {
				console.log("Response from server: " + data);
			})
			.catch(error => {
				console.error("Error:", error);
			});

	});

	var footerPadding = document.createElement("div");
	footerPadding.className = "footer-padding";
	document.body.appendChild(footerPadding);
}

// function Ready() {
PopoulateTable();
CreateFooter();
// }