<?php
	require "../connectDb.php";

	$result = $conn->query("SELECT * FROM place");
	$places  = array();
	while ($row = $result->fetch_assoc()) {
		array_push($places, $row);                
	}
	$res['places']= $places;

    print(json_encode($res));
?>
   