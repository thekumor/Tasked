<?php
// ================================================
// 
//	Script: database.php
//	Saves and reads task data into a database.
//	by The Kumor
// 
// ================================================

if (!isset($_POST["date"]) || !isset($_POST["tasks"]) || !isset($_POST["action"]))
	die("Invalid request.");

$config["host"] = "localhost";
$config["user"] = "root";
$config["pass"] = "";
$config["name"] = "tasked";

CreateDatabase();

if ($_POST["action"] == "save") {
	if (GetTasks($_POST["date"]) != null)
		UpdateTasks($_POST["date"], $_POST["tasks"]);
	else
		SaveTasks($_POST["date"], $_POST["tasks"]);
} else if ($_POST["action"] == "delete")
	DeleteTasks($_POST["date"]);
else if ($_POST["action"] == "get_dates"){
	$dates = GetAllTasks(true);
	echo json_encode($dates);
}
else if ($_POST["action"] == "get"){
	$tasks = GetTasks($_POST["date"]);
	echo json_encode($tasks);
}
else
	die("Invalid action.");

function Connect()
{
	global $config;

	$mysqli = new mysqli(
		$config["host"],
		$config["user"],
		$config["pass"],
		$config["name"]
	);

	if ($mysqli->connect_errno)
		die("Failed to connect to database (" . $mysqli->connect_error . ")");

	return $mysqli;
}

function CreateDatabase()
{
	global $config;

	$mysqli = new mysqli(
		$config["host"],
		$config["user"],
		$config["pass"],
	);

	if ($mysqli->connect_errno)
		die("Failed to connect to database (" . $mysqli->connect_error . ")");

	$mysqli->query("CREATE DATABASE IF NOT EXISTS " . $config["name"] . ";");

	$mysqli->close();
}

function SaveTasks($date, $tasks)
{
	$mysqli = Connect();

	$mysqli->query("CREATE TABLE IF NOT EXISTS day(date DATE, tasks TEXT);");

	$stmt = $mysqli->prepare("
		INSERT INTO day(date, tasks)
		VALUES(?, ?);
	");
	$stmt->bind_param(
		"ss",
		$date,
		$tasks
	);
	$stmt->execute();
	$stmt->close();

	$mysqli->close();
}

function DeleteTasks($date)
{
	$mysqli = Connect();

	$stmt = $mysqli->prepare("
		DELETE FROM day
		WHERE date = ?;
	");
	$stmt->bind_param(
		"s",
		$date
	);
	$stmt->execute();
	$stmt->close();

	$mysqli->close();
}

function UpdateTasks($date, $tasks)
{
	$mysqli = Connect();

	$stmt = $mysqli->prepare("
		UPDATE day
		SET tasks = ?
		WHERE date = ?;
	");
	$stmt->bind_param(
		"ss",
		$tasks,
		$date
	);
	$stmt->execute();
	$stmt->close();

	$mysqli->close();
}

function GetTasks($date)
{
	$mysqli = Connect();
	$task = null;

	$stmt = $mysqli->prepare("
		SELECT * FROM day
		WHERE date = ?;
	");
	$stmt->bind_param(
		"s",
		$date
	);
	$stmt->execute();
	$result = $stmt->get_result();

	if ($row = $result->fetch_assoc()) {
		$task = $row;
	}

	$stmt->close();

	$mysqli->close();

	return $task;
}

function GetAllTasks($justDates = false)
{
	$mysqli = Connect();
	$tasks = array();

	$query = $justDates ? "SELECT date FROM day" : "SELECT * FROM day";
	$stmt = $mysqli->prepare($query);
	$stmt->execute();
	$result = $stmt->get_result();

	while ($row = $result->fetch_assoc()) {
		$tasks[] = $row;
	}

	$stmt->close();

	$mysqli->close();

	return $tasks;
}
?>