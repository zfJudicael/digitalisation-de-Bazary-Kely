<?php
	require "../connectDb.php";

	$result = $conn->query("SELECT * FROM occuper");
	$occuper  = array();
	while ($row = $result->fetch_assoc()) {
		array_push($occuper, $row);                
	}
	$res['occuper']= $occuper;

    print(json_encode($res));
?>
   