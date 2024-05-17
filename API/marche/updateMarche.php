<?php
    require "../connectDb.php";
    $request = json_decode(file_get_contents("php://input"));

    $res['error'] = true;
    
    if($request != null){
    
        $oldCodeMarche = $request->oldCodeMarche;
        $newCodeMarche = $request->newCodeMarche;
        $nomMarche = $request->nomMarche;
        $nomArrond = $request->nomArrond;

		$sql = "UPDATE marche SET codeMarche = '".$newCodeMarche."', nomMarche = '".$nomMarche."', nomArrond = '".$nomArrond."' WHERE codeMarche = '".$oldCodeMarche."' ";
        $sql1 = "UPDATE place SET codeMarche = '".$newCodeMarche."' WHERE codeMarche = '".$oldCodeMarche."' ";

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