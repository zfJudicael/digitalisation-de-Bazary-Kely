<?php
require "../connectDb.php";

$request = json_decode(file_get_contents("php://input"));

$res['error']   = true;

if($request != null){
    
    $idCateg = $request->idCateg;

    $sql = "DELETE FROM categorie WHERE idCateg = '".$idCateg."' ";

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
    $res['message'] = "Une erreur de requet";
}

print(json_encode($res));
?>