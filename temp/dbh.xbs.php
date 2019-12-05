<?php

$dbServername = "localhost";
$dbUsername="root";
$dbPassword="";
$dbName="XBS";


$conn = new PDO('mysql:dbname='.$dbName.';host='.$dbServername, $dbUsername, '' );
$conn->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );//Error Handling