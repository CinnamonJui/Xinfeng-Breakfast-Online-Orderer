<?php
    include_once "Bacon.php";

    $conn = new Bacon();
    $data = $conn->searchItem("三");
    $data = json_decode($data,true);
    foreach($data as $row){
        foreach($row as $k=>$v){
            echo $k . " : ".$v."<br>";
        }
    }

    
