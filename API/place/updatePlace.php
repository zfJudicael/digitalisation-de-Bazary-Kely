<?php
    require "../connectDb.php";
    $request = json_decode(file_get_contents("php://input"));

    $res['error'] = true;
    
    if($request != null){
    
        $oldNumPlace = $request->oldNumPlace;
        $newNumPlace = $request->newNumPlace;
        $oldLotPlace = $request->oldLotPlace;
        $newLotPlace = $request->newLotPlace;

        if($newNumPlace === ''){
            $sql = "UPDATE place SET lotPlace = '".$newLotPlace."' WHERE numPlace = '".$oldNumPlace."' ";
        }else {
            $sql = "UPDATE place SET numPlace = '".$newNumPlace."', lotPlace = '".$newLotPlace."' WHERE numPlace = '".$oldNumPlace."' AND lotPlace = '".$oldLotPlace."' ";
        }

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