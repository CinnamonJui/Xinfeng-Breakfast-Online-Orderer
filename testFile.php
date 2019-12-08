<?php
    include_once "Bacon.php";

    $conn = new Bacon();

    $conn->addItem(2,"三明治","法式總匯","60","./picture/gif1","豪ㄘ");
    $data = $conn->getItem();
    $data = json_decode($data,true);
    foreach($data as $row){
        echo "<br>";
        foreach($row as $key => $value){
            echo "<b>".$key . " : ". $value."</b>";
            echo "<br>";
        }
    }
    //$conn->editItem("1","三明治","烤土司","70","./picture/gif2","不豪ㄘ");

    $data = $conn->searchItem("法式總匯");
    $data = json_decode($data,true);
    foreach($data as $row){
        echo "<br>";
        foreach($row as $key => $value){
            echo "<b>".$key . " : ". $value."</b>";
            echo "<br>";
        }
    }