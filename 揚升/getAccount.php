<?php 
    include_once '../php/Bacon.php';
    $conn = new Bacon();
    $data;
    if(isset($_POST['find_str'])&&isset($_POST['find_type'])){
        $find_str=$_POST['find_str'];
        $find_type=$_POST['find_type'];
        $data = $conn->searchCustomer($find_str,$find_type);
    }
    else{
        if(isset($_POST['par'])&&isset($_POST['sort']))
            $data = $conn->getCustomer($_POST['par'],$_POST['sort']);
    }
    if($data !="[]")
        echo ($data);
    else echo ("get data fail");
?>