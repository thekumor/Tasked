// ================================================
// 
//	Script: database.js
//	Reads tasks from the database and displays them.
//	by The Kumor
// 
// ================================================

function Ready() {
	var taskDivs = [];

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
			for (var i = 0; i < taskDivs.length; i++)
				document.body.removeChild(taskDivs[i]);

			taskDivs = [];

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
				console.log(tasks);

				for (var i = 0; i < taskDivs.length; i++)
					document.body.removeChild(taskDivs[i]);

				taskDivs = [];

				for (var i = 0; i < tasks.tasks.length; i++) {
					var taskDiv = document.createElement("div");
					taskDiv.className = "task-container";
					document.body.appendChild(taskDiv);
					taskDivs.push(taskDiv);

					var taskName = document.createElement("h3");
					taskName.innerText = tasks.tasks[i].display;
					taskDiv.appendChild(taskName);

					var taskValue = document.createElement("span");
					taskValue.innerText = "Value: " + tasks.tasks[i].value + " points";
					taskDiv.appendChild(taskValue);
				}
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