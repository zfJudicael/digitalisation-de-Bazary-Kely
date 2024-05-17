<?php
	require "../connectDb.php";

	$result = $conn->query("SELECT * FROM marchand ORDER BY cin DESC");
	$marchands  = array();
	while ($row = $result->fetch_assoc()) {
		array_push($marchands, $row);                
	}
	$res['marchands']= $marchands;

    print(json_encode($res));
?>
   