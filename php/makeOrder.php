<?php
    include_once "Bacon.php";

    $conn = new Bacon();
    $items = $_POST['item_list'];
    $finishTime = $_POST['finishTime'];
    //echo $items;
    
    //print_r($items);
    $jsonitems  = json_decode($items,true);
    //echo $items;
    $total_price = 0;
    foreach($jsonitems as $k=> $v){
       echo $k . " : ". $v ."<br>";
       $price  = explode(",",$v);
       $total_price  += $price[1];
    }

    //$items = json_encode($items);
    // echo $total_price."<br>";
    echo gettype($finishTime);
    $getTime = (string)(date("H:i",time()+7*3600));
    session_start();
    $userID = $_SESSION['ID'];
    echo $userID;
    $orderID = date("Y-m-d")."-".date("H-i",time()+7*3600)."-".$userID;
    $conn->addOrder("未確認",$orderID,$total_price,$getTime,$finishTime,$userID,$items);