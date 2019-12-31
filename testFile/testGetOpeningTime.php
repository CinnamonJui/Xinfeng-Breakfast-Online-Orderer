<?php
    include_once "../php/Bacon.php";

    $conn = new Bacon();

    $data = $conn->getOpeningTime();
    echo $data."<br>";

    $data = json_decode($data,true);
    print_r($data);