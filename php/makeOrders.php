<?php
    include_once "Bacon.php";

    $conn = new Bacon();
    
    if(isset($_POST['item_list'])&&isset($_POST['finishTime'])){
        $items = $_POST['item_list'];
        $finishTime = $_POST['finishTime'];
    }
    //echo $items;
    //echo $finishTime;
    //print_r($items);
    $jsonitems  = json_decode($items,true);
    //echo $items;
    $total_price = 0;
    foreach($jsonitems as $k=> $v){
      $temp = explode(",",$v); 
      $total_price  += $temp[1];
}
    $getTime = (string)(date("H:i",time()+7*3600));
    session_start();
    $userID = $_SESSION['ID'];
    $orderID = date("Y-m-d")."-".date("H-i",time()+7*3600)."-".$userID;
    
    $conn->addOrder("未確認",$orderID,$total_price,$getTime,$finishTime,$userID,$items);
    echo ($orderID);
?>