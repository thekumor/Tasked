<!DOCTYPE html>
<!-- ================================================
-- 
--	Project: Tasked
--
--	File: saved.php
--	Desc: Location where database is read (database
--	section).
--
--	Date: 2025/12/21 7:59 PM
--	Authors: The Kumor
-- 
-- ================================================ -->

<html lang="en">
<head>
	<title>Tasked</title>

	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	
	<!-- This may not work -->
	<meta http-equiv="Cache-Control" content="no-store" />

	<!-- Google Fonts -->
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&display=swap" rel="stylesheet">

	<link rel="stylesheet" href="style.css">
	<script type="text/javascript" src="database.js"></script>
</head>

<body onload="Ready()">
	<div class="welcome">
		<h1>Database</h1>
		<p>Days saved to database:</p>
	</div>

	<!-- May be changeg so it doesn't have to be copy/pasted, but that's for later -->
	<div class="side">
		<h2>Navigation</h2>
		<ul>
			<li><a href="index.php">Tasks</a></li>
			<li><a href="saved.php">Database</a></li>
		</ul>
	</div>
</body>
</html>