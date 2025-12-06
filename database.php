<?php
// ================================================
// 
//	Script: database.php
//	Saves and reads task data into a database.
//	by The Kumor
// 
// ================================================

$config["host"] = "localhost";
$config["user"] = "root";
$config["pass"] = "";
$config["name"] = "tasked";

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

	$mysqli->query("CREATE TABLE IF NOT EXISTS day(date DATE, tasks BLOB);");

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

function GetTasks()
{
	$mysqli = Connect();
	$tasks = array();

	$stmt = $mysqli->prepare("
		SELECT * FROM day;
	");
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