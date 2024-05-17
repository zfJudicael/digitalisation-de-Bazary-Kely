<?php
	require "../connectDb.php";

	$result = $conn->query("SELECT * FROM activite ORDER BY idCateg");
	$activites  = array();
	while ($row = $result->fetch_assoc()) {
		array_push($activites, $row);                
	}
	$res['activites']= $activites;

    print(json_encode($res));
?>
   