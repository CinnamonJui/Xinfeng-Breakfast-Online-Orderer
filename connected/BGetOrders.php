<?php

    require_once 'login.php';
    include_once 'Bacon.php';
    
    $conn = new Bacon();
    $result;
    if(isset($_POST['order_history'])&&$_POST['order_history']=="歷史訂單"){
        $result = $conn->getFinishOrder();
    }
    else if(isset($_POST['order_history'])&&$_POST['order_history']=="現時訂單"){
        $result = $conn->getUnFinishOrder();
    }
    if(isset($_POST['order_status'])&&isset($_POST['order_ID'])){
        $order_status=$_POST['order_status'];
        $order_ID=$_POST['order_ID'];
        //UPDATE orders SET order_status = '未確認' WHERE order_ID = '19-10-05-023';
        $conn->changeOrderStatus($order_ID,$order_status);
    }

    if($result!="{}") 
        echo $result;