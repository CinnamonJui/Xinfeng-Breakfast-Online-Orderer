<?php

    include_once '../php/Bacon.php';
    //連接database
    $conn = new Bacon();
    if(isset($_POST['getTime'])){
        if($_POST['getTime']==1)
            $data=$conn->getOpeningTime();
        echo $data;
        exit();
    }
    if(isset($_POST['startTime'])&&isset($_POST['endTime'])){
        $flag1=$conn->setTime("openTime",$_POST['startTime']);
        $flag2=$conn->setTime("closeTime",$_POST['endTime']);
        if($flag1==true&&$flag2==true)
            echo true;
        else
            echo false;
        exit();
    }
    die("get/set time fail");
?>