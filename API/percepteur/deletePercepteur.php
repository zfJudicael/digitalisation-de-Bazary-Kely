<?php
    require "../connectDb.php";

	$request = json_decode(file_get_contents("php://input"));

    $res['error'] = true;

    if($request != null){

        $matriculePercep = $request->matriculePercep;

        $sql = "DELETE from percepteur WHERE matriculePercep = '".$matriculePercep."' ";
        
		if ($conn->query($sql) === TRUE) {
            $res['error']   = false;
            $res['message'] = "Suppression bien effectuée";
            $res['errorMessage'] = "Aucune erreur";
		} else {
            $res['message'] = "Suppression non effectuée";
            $res['errorMessage'] = "Error: " . $sql . "\n" . $conn->error;
		}

        $conn->close();
    }else{
        $res['message'] = "Une erreur est survenue";
    }
    
    print(json_encode($res));
?>