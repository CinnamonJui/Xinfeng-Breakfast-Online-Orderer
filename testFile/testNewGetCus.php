<?php 
    include_once "../php/bacon.php";
    $conn = new bacon();

    $data = $conn->getCustomer("total","DESC");
    $data= json_decode($data,true);


    foreach($data as $row){
        foreach ($row as $k=>$v){
            echo $k ." ".$v."<br>";
        }
        echo "<br>";
    }