<?php
    require "../connectDb.php";
    $request = json_decode(file_get_contents("php://input"));

    $res['error'] = true;

    if($request != null){
        
        $oldCodeActivite = $request->oldCodeActivite;
        $newCodeActivite = $request->newCodeActivite;
        $designActivite = $request->designActivite;
        $idCateg = $request->idCateg;

		$sql = "UPDATE activite SET codeActivite = '".$newCodeActivite."',designActivite = '".$designActivite."', idCateg = '".$idCateg."' WHERE codeActivite = '".$oldCodeActivite."' ";

		if ($conn->query($sql) === TRUE) {
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