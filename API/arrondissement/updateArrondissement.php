<?php
    require "../connectDb.php";
    $request = json_decode(file_get_contents("php://input"));

    $res['error'] = true;

    if($request != null){
    
        $oldNomArrond = $request->oldNomArrond;
        $newNomArrond = $request->newNomArrond;

		$sql = "UPDATE arrondissement SET nomArrond = '".$newNomArrond."' WHERE nomArrond = '".$oldNomArrond."' ";
        $sql1 = "UPDATE marche SET nomArrond = '".$newNomArrond."' WHERE nomArrond = '".$oldNomArrond."' ";

		if ($conn->query($sql) === TRUE) {
            $conn->query($sql1);
            $res['error']   = false;
            $res['message'] = "Modification bien effectuée";
            $res['errorMessage'] = "Aucune erreur";
		} else {
            $res['message'] = "Modification non effectuée";
            $res['errorMessage'] = "Error: " . $sql . "\n" . $conn->error;
		}

        $conn->close();
    }else{
        $res['message'] = "Une erreur est survenue";
    }
    
    print(json_encode($res));
?>