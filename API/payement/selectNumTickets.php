<?php
  require "../connectDb.php";

  $numTickets = array();

  $result = $conn->query("SELECT numTicket from payement");

  while($row = $result->fetch_assoc())
    array_push($numTickets, $row);
  
  $conn->close();

  $res['numTickets'] = $numTickets;

  print(json_encode($res));

?>