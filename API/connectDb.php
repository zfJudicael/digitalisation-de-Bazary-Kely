<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, PUT, DELETE, OPTIONS');
    header("Access-Control-Max-Age", "3600");
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Cookie,Accept');
    header("Access-Control-Allow-Credentials", "true");

    $conn = new mysqli("localhost", "root", "", "cut");
    if ($conn->connect_error) {
        die("Database connection failed!");
    }
?>