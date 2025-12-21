// ================================================
// 
//	Project: Tasked
//
//	File: database.js
//	Desc: Database view, gets each task so they
//	can be viewed/cleared.
// 
//	Date: 2025/12/21 7:55 PM
//	Authors: The Kumor
// 
// ================================================

function RemoveTask(date, dynamicElements, select) {
	if (!confirm("Are you sure you want to clear all tasks for " + date + "?"))
		return;

	fetch("database.php", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: "date=" + encodeURIComponent(date) + "&tasks=*&action=delete",
	})
		.then(response => response.text())
		.then(data => {
			alert("Tasks cleared for " + date + ".");
			window.location.reload();
		})
		.catch(error => {
			console.error("Error:", error);
		});

	for (var i = 0; i < dynamicElements.length; i++)
		document.body.removeChild(dynamicElements[i]);
	dynamicElements = [];
	select.value = "Select date";
}

function Ready() {
	var dynamicElements = [];

	var div = document.createElement("div");
	div.className = "task-container";
	document.body.appendChild(div);

	var select = document.createElement("select");
	select.id = "date-select";
	select.style.textAlign = "center";
	select.style.margin = "0 auto";
	select.style.fontSize = "16px";
	select.style.width = "100%";
	select.addEventListener("change", (event) => {
		var date = event.target.value;

		if (date == "Select date") {
			for (var i = 0; i < dynamicElements.length; i++)
				document.body.removeChild(dynamicElements[i]);

			dynamicElements = [];

			return;
		}

		fetch("database.php", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: "date=" + encodeURIComponent(date) + "&tasks=*&action=get",
		})
			.then(response => response.text())
			.then(data => {
				var tasks = JSON.parse(data);
				tasks.tasks = JSON.parse(tasks.tasks);

				for (var i = 0; i < dynamicElements.length; i++)
					document.body.removeChild(dynamicElements[i]);

				dynamicElements = [];
				var points = 0;

				for (var i = 0; i < tasks.tasks.length; i++) {
					var taskDiv = document.createElement("div");
					taskDiv.className = "task-container";
					document.body.appendChild(taskDiv);
					dynamicElements.push(taskDiv);

					var taskName = document.createElement("h3");
					taskName.innerText = tasks.tasks[i].display;
					taskDiv.appendChild(taskName);

					var taskValue = document.createElement("span");
					taskValue.innerText = "Value: " + tasks.tasks[i].value + " points";
					taskDiv.appendChild(taskValue);

					points += tasks.tasks[i].value;
				}

				var pointsDiv = document.createElement("div");
				pointsDiv.className = "points-container";
				document.body.appendChild(pointsDiv);
				dynamicElements.push(pointsDiv);

				var totalPoints = document.createElement("span");
				totalPoints.style.fontWeight = "bold";
				totalPoints.style.fontSize = "1.2em";
				totalPoints.innerText = "Total points: " + points;
				pointsDiv.appendChild(totalPoints);

				var removeButton = document.createElement("button");
				removeButton.className = "button";
				removeButton.innerText = "Clear Tasks";

				removeButton.addEventListener("click", () => {
					RemoveTask(date);
				})

				document.body.appendChild(removeButton);
				dynamicElements.push(removeButton);
			})
			.catch(error => {
				console.error("Error:", error);
			});
	});
	div.appendChild(select);

	fetch("database.php", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: "date=*&tasks=*&action=get_dates",
	})
		.then(response => response.text())
		.then(data => {
			var dates = JSON.parse(data);

			var option = document.createElement("option");
			option.value = "Select date";
			option.innerText = "-- Select date ---";
			select.appendChild(option);
			option.selected = true;

			var optionsAvailable = [];

			for (var i = 0; i < dates.length; i++)
				optionsAvailable.push(dates[i].date);

			for (var i = optionsAvailable.length - 1; i >= 0; i--) {
				var option = document.createElement("option");
				option.value = optionsAvailable[i];
				option.innerText = optionsAvailable[i];
				select.appendChild(option);
			}
		})
		.catch(error => {
			console.error("Error:", error);
		});
}