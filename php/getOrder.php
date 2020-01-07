<?php
    include_once "Bacon.php";

    $conn = new Bacon();
    
    if(isset($_POST['orderId'])&&isset($_POST['check'])){
        $orderId = $_POST['orderId'];
        $check = $_POST['check'];  
    }
    //echo $orderId;
    //echo check;
    if($check==0){
        $result = $conn -> getOrderByID($orderId);
    }
    else{
        $result = $conn -> getOrderStatus($orderId);
    }
    echo ($result);
?>