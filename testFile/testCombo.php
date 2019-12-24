<?php
    include_once "Bacon.php";

    function myprinter($data){
        foreach($data as $row){
            echo "<br>";
            foreach($row as $key => $value){
                echo $key . " : ". $value;
                echo "<br>";
            }
        }
    }

    $conn = new Bacon();

    echo "插入兩筆資料<br>";
    $conn->addCombo("美式早餐","180","./picture/gif3","火腿+蛋+熱狗+奶茶","豪ㄘ");
    $conn->addCombo("內湖熱狗堡","90","./picture/gif4","熱狗*50","金寶逼你食");

    echo "取得全部資料<br>";
    $data = $conn->getCombo();
    $data = json_decode($data,true);
    myprinter($data);

    echo "修改 '美式早餐'<br>";
    $conn->editCombo("美式早餐","199","./picture/gif3","火腿+蛋+熱狗+可樂","胖");

    echo "取得 '美式早餐'<br>";
    $data = $conn->searchCombo("美式早餐");
    $data = json_decode($data,true);
    myprinter($data);

    echo "刪除 '美式早餐'<br>";
    $conn->delCombo("美式早餐");

    echo "取得全部資料<br>";
    $data = $conn->getCombo();
    $data = json_decode($data,true);
    myprinter($data);
    
    

    