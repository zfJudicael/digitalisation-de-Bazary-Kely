<?php
require "../connectDb.php";

$request = json_decode(file_get_contents("php://input"));

$res['error']   = true;

if($request != null){
    
    $cin = $request->cin;

    $sql = "DELETE FROM marchand WHERE cin = ".$cin."";

    if ($conn->query($sql) === TRUE) {
        $res['error']   = false;
        $res['message'] = "Suppression bien effectué";
        $res['errorMessage'] = "Aucune erreur";
    } else {
        $res['message'] = "Suppression non effectué";
        $res['errorMessage'] = "Error: " . $sql . "\n" . $conn->error;
    }

    $conn->close();
}else{
    $res['message'] = "Une erreur de requet";
}

print(json_encode($res));
?>