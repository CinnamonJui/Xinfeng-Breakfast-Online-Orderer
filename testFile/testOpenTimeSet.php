<?php 
    include_once "../php/bacon.php";

    $conn= new Bacon();
    if($conn->setTime("openTime","05:00")){
        echo "set openTime success<br>";
    }
    else echo "set openTime fail<br>";
    if($conn->setTime("closeTime","13:00")){
        echo "set closeTime success<br>";
    }
    else echo "set openTime fail<br>";
    