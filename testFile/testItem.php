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
    $conn->addItem("法式總匯","三明治","60","./picture/gif1","豪ㄘ");
    $conn->addItem("烤土司","三明治","70","./picture/gif2","不豪ㄘ");

    echo "取得全部資料<br>";
    $data = $conn->getItem();
    $data = json_decode($data,true);
    myprinter($data);

    echo "修改 '烤土司'<br>";
    $conn->editItem("烤土司","三明治","90","./picture/gif2","超豪ㄘ");

    echo "取得 '烤土司'<br>";
    $data = $conn->searchItem("烤土司");
    $data = json_decode($data,true);
    myprinter($data);

    echo "刪除 '烤土司'<br>";
    $conn->delItem("烤土司");

    echo "取得全部資料<br>";
    $data = $conn->getItem();
    $data = json_decode($data,true);
    myprinter($data);
    
    

    