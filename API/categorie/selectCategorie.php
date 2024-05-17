<?php
	require "../connectDb.php";

	$result = $conn->query("SELECT * FROM categorie ORDER BY idCateg");
	$categories  = array();
	while ($row = $result->fetch_assoc()) {
		array_push($categories, $row);                
	}
	$res['categories']= $categories;

    print(json_encode($res));
?>
   