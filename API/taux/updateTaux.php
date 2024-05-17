<?php
    require "../connectDb.php";
    $request = json_decode(file_get_contents("php://input"));

    $res['error'] = true;

    if($request != null){
    
        $annee = $request->annee;
        $idCateg = $request->idCateg;
        $taux = $request->taux;

		$sql = "UPDATE taux SET taux = ".$taux." WHERE annee = '".$annee."' AND idCateg = '".$idCateg."' ";

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