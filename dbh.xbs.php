<?php

$dbServername = "localhost";
$dbUsername="root";
$dbPassword="";
$dbName="XBS";

//$conn = mysqli_connect($dbServername,$dbUsername,$dbPassword,$dbName);
$conn = new PDO('mysql:host='.$dbServername.';dbname='.$dbName.';charset=utf8', $dbUsername, $dbPassword);
