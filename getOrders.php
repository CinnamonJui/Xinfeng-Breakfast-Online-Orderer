<?php 
    
    $hn = "localhost";
    $un = "root";
    $db ="XBS";
    $pw ="";
    $conn=new mysqli($hn,$un,$pw,$db);
    if ($conn->connect_error) 
        die("Fatal Error");
    if(isset($_POST['order_history'])&&$_POST['order_history']=="歷史訂單"){
        $history="('已結帳','婉拒')";
    }
    else if(isset($_POST['order_history'])&&$_POST['order_history']=="現時訂單"){
        $history="('未確認','準備中','已完成')";
    }
    if(isset($_POST['order_status'])&&isset($_POST['order_ID'])){
        $order_status=$_POST['order_status'];
        $order_ID=$_POST['order_ID'];
        //UPDATE orders SET order_status = '未確認' WHERE order_ID = '19-10-05-023';
        $query="UPDATE orders SET status = '$order_status' WHERE ID = '$order_ID'";
        $result=$conn->query($query);
        if(!$result)
            die($query);
            $result->close();
    }
    
    $query="SELECT * FROM orders WHERE status in $history ORDER BY  status DESC,ID DESC";
    $result=$conn->query($query);
    if(!$result)
        die("get data fail");
    $nrow=$result->num_rows;

    for($i=0; $i<$nrow; $i++){
        $row=$result->fetch_array(MYSQLI_NUM);
        $data[$i]=$row;
    }
    if($data)
        echo json_encode($data);
    $result->close();
    $conn->close();
?>