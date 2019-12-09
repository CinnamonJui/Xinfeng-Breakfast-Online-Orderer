<?php

    include_once 'Bacon.php';
    //連接database
    $conn = new Bacon();
    $result;
    //決定要取歷史訂單還是現時訂單 然後直接取出來
    if(isset($_POST['order_history'])&&$_POST['order_history']=="歷史訂單"){
        $result = $conn->getFinishOrder(); 
    }
    else if(isset($_POST['order_history'])&&$_POST['order_history']=="現時訂單"){
        $result = $conn->getUnFinishOrder();
    }

    //更新訂單狀態
    if(isset($_POST['order_status'])&&isset($_POST['order_ID'])){
        $order_status=$_POST['order_status'];
        $order_ID=$_POST['order_ID'];
        //UPDATE orders SET order_status = '未確認' WHERE order_ID = '19-10-05-023';
        $conn->changeOrderStatus($order_ID,$order_status);
    }

    //回傳資料
    if($result!="[]") 
        echo ($result);