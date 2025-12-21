<!DOCTYPE html>
<!-- ================================================
-- 
--	Project: Tasked
--
--	File: index.php
--	Desc: Entry point (tasks section). Tasks get
--	displayed here so that user can select them.
--
--	Date: 2025/12/21 8:00 PM
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
	<script type="module" src="tasks.js"></script>
</head>

<body>
	<div class="welcome">
		<h1>Welcome to Tasked</h1>
		<p>Your task management solution.</p>
	</div>

	<div class="side">
		<h2>Navigation</h2>
		<ul>
			<li><a href="index.php">Tasks</a></li>
			<li><a href="saved.php">Database</a></li>
		</ul>
	</div>

	<!-- Footer is created from tasks.js -->
</body>
</html>