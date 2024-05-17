<?php
	require "../connectDb.php";

	$result = $conn->query("SELECT * FROM contrat");
	$contrats  = array();
	while ($row = $result->fetch_assoc()) {
		array_push($contrats, $row);                
	}
	$res['contrats']= $contrats;

    print(json_encode($res));
?>
   