<?php
    require_once "../Bacon.php";

    $conn = new Bacon();
    $conn->addCombo("美式套餐",70,"./picture/pic1","漢堡+薯條","好吃");
    $conn->addItem("蘿蔔糕","點心",70,"./picture/pic1","好吃");
    $conn->addItem("炸雞塊","點心",70,"./picture/pic1","好吃");
    $conn->addItem("熱狗","點心",70,"./picture/pic1","好吃");
    $conn->addItem("蛋餅","點心",70,"./picture/pic1","好吃");
    $conn->addItem("包子","點心",70,"./picture/pic1","好吃");

    $conn->addItem("鮪魚三明治","三明治",70,"./picture/pic1","好吃");
    $conn->addItem("肌肉三明治","三明治",70,"./picture/pic1","好吃");
    $conn->addItem("牛肉三明治","三明治",70,"./picture/pic1","好吃");
    $conn->addItem("總匯三明治","三明治",70,"./picture/pic1","好吃");
    $conn->addItem("里肌三明治","三明治",70,"./picture/pic1","好吃");

    
    $queryResult= $conn->getType();
    $queryResult = json_decode($queryResult,true);
    print_r($queryResult);
    /*foreach($queryResult as $row)
        $types .= $row['type'] . ',';*/
    //echo $types;