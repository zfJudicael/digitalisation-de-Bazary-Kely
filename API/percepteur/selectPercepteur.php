<?php
	require "../connectDb.php";

	$result = $conn->query("SELECT * FROM percepteur");
	$percepteurs  = array();
	while ($row = $result->fetch_assoc()) {
		array_push($percepteurs, $row);                
	}
	$res['percepteurs']= $percepteurs;

    print(json_encode($res));
?>
   