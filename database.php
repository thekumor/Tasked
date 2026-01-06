<?php
// ================================================
// 
//	Project: Tasked
//
//	File: database.php
//	Desc: Controls database responses from client.
// 
//	Modified: 2026/01/06 9:10 AM
//	Authors: The Kumor
// 
// ================================================

if (!isset($_POST["date"]) || !isset($_POST["tasks"]) || !isset($_POST["action"]))
	die("Invalid request.");

$config["name"] = "tasked_txt";

CreateFolderIfNotExists();

$callbacks = [
	"save" => function () {
		if (GetTasks($_POST["date"]) != null)
			UpdateTasks($_POST["date"], $_POST["tasks"]);
		else
			SaveTasks($_POST["date"], $_POST["tasks"]);
	},

	"delete" => function() {
		DeleteTasks($_POST["date"]);
	},

	"get_dates" => function () {
		$dates = GetAllTasks(true);
		echo json_encode($dates);
	},

	"get" => function () {
		$tasks = GetTasks($_POST["date"]);
		echo json_encode($tasks);
	}
];

if (array_key_exists($_POST["action"], $callbacks)) {
	$action = $callbacks[$_POST["action"]];
	$action();
} else {
	die("Invalid action.");
}

function CreateFolderIfNotExists()
{
	global $config;

	if (!file_exists($config['name']))
		mkdir($config['name']);
}

function SaveTasks($date, $tasks)
{
	global $config;

	$file = fopen($config['name'] . '/' . $date . ".txt", "w");
	fwrite($file, $tasks);
	fclose($file);
}

function DeleteTasks($date)
{
	global $config;

	$filePath = $config['name'] . '/' . $date . ".txt";
	if (file_exists($filePath)) {
		unlink($filePath);
	}
}

function UpdateTasks($date, $tasks)
{
	SaveTasks($date, $tasks);
}

function GetTasks($date)
{
	global $config;
	$filePath = $config['name'] . '/' . $date . ".txt";
	$task = null;

	if (file_exists($filePath)) {
		$file = fopen($filePath, "r");
		$task = fread($file, filesize($filePath));
		fclose($file);
	}

	return $task;
}

function GetAllTasks($justDates = false)
{
	global $config;

	$files = scandir($config['name']);
	$tasks = array();

	foreach ($files as $file) {
		if ($file === '.' || $file === '..') {
			continue;
		}

		$date = $file;
		$date = str_replace(".txt", "", $date);

		if ($justDates) {
			$tasks[] = $date;
		} else {
			$taskContent = GetTasks($date);
			$tasks[] = array("date" => $date, "tasks" => $taskContent);
		}
	}

	return $tasks;
}
?>