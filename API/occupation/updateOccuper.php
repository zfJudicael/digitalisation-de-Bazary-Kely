<?php
    require "../connectDb.php";

	$request = json_decode(file_get_contents("php://input"));

    $res['error'] = true;

    if($request != null){

        $matriculePercep = $request->matriculePercep;
        $numPlace = $request->numPlace;

        $sql = "UPDATE occuper SET dateFin = ( SELECT CURRENT_TIMESTAMP() ) WHERE matriPercep = '".$matriculePercep."' AND numPlace = '".$numPlace."' AND dateFin is NULL ";
        
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