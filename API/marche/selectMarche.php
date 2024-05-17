<?php
	require "../connectDb.php";

	$result = $conn->query("SELECT * FROM marche");
	$marches  = array();
	while ($row = $result->fetch_assoc()) {
		array_push($marches, $row);                
	}
	$res['marches']= $marches;

    print(json_encode($res));
?>
   