// ================================================
// 
//	Script: tasks_data.js
//	Contains all data about tasks and their values.
//	by The Kumor
// 
// ================================================

var tasks = {};

tasks["Coffee"] = {
	display: "Drink coffee",
	value: 5,
	img: "img/coffee.png",
};

tasks["Walk the dog"] = {
	display: "Walk the dog",
	value: 7,
	img: "img/dog.png",
};

tasks["Go fishing"] = {
	display: "Go fishing",
	value: 3,
	img: "img/fish.png"
};

tasks["Study"] = {
	display: "Study",
	value: 8,
	img: "img/study.png"
};

tasks["Grocery shopping"] = {
	display: "Grocery shopping",
	value: 4,
	img: "img/grocery.png"
};

tasks["Exercise"] = {
	display: "Exercise",
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
	display: "Read a book",
	value: 3,
	img: "img/book.png"
};

tasks["Clean the house"] = {
	display: "Clean the house",
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

tasks["Developing"] = {
	display: "Developing",
	value: 10,
	img: "img/developing.png",
	
	custom: {}
}

export { tasks };