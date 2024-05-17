<?php
    require "../connectDb.php";
    $request = json_decode(file_get_contents("php://input"));

    $res['error'] = true;

    if($request != null){
    
        $oldIdCateg = $request->oldIdCateg;
        $newIdCateg = $request->newIdCateg;
        $designCateg = $request->designCateg;

		$sql = "UPDATE categorie SET idCateg = '".$newIdCateg."', designCateg = '".$designCateg."' WHERE idCateg = '".$oldIdCateg."' ";
        $sql1 = "UPDATE activite SET idCateg = '".$newIdCateg."' WHERE idCateg = '".$oldIdCateg."' ";

		if ($conn->query($sql) === TRUE) {
            $res['error']   = false;
            $res['message'] = "Modification bien effectuée";
            $res['errorMessage'] = "Aucune erreur";
            $conn->query($sql1);
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