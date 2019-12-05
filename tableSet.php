<?php

include_once "Bacon.php";

$conn; //PDO connection class

$dbServername = "localhost";
$dbUsername = "root";
$dbPassword = "";
$dbName = "XBS";

try {
    $conn = new PDO('mysql:dbname=' . $dbName . ';host=' . $dbServername, $dbUsername, $dbPassword);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); //Error Handling
    $conn->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
} catch (PDOException $e) {
    echo  $e->getMessage();
}



$sqlInsertData = "INSERT INTO status (data,isNew)
                    VALUES (1,false);";
$sqlOrders = 'create table Orders(

    status      varchar(128)    not NULL,
    ID          varchar(128)    not NULL,
    price       integer(4)      not NULL,
    GetTime     time NULL,
    FnsTime     time NULL,
    user        varchar(128)    not NULL,    
    items       nvarchar(4000)  not NULL,
    isRead      boolean         not NULL,
    Primary key(ID)
);
ALTER TABLE Orders
    DEFAULT false for isRead;';

$sqlStatus = 'create table status(
            data   int(1)   not NULL,
            isNew  boolean  not NULL,
            Primary key(data)
        );';

$sqlAccount = "create table Account(	 
        
            ID 			nvarchar(128)     PRIMARY	KEY not null,  	
            password 	nvarchar(128) 	not null	,  	
            name		nvarchar(128) 	not null	,   
            age			integer(4) 	 	not null	,	
            gender		nvarchar(10) 	not null	,	
            email		nvarchar(40) 	not null	,	
            total		integer(8)		default 0
);";

        
try{
    $conn->exec($sqlOrders);
    echo "Orders table success";
}
catch (PDOException $e){
    echo  $e->getMessage();
}
echo "<br>";
try{
    $conn->exec($sqlStatus);
    echo "status table success";
}
catch (PDOException $e){
    echo  $e->getMessage();
}
echo "<br>";
try{
    $conn->exec($sqlAccount);
    echo "Account table success";
}
catch (PDOException $e){
    echo  $e->getMessage();
}
echo "<br>";
try{
    $conn->exec($sqlInsertData);
    echo "initialize success";
    }
catch (PDOException $e){
    echo  $e->getMessage();
}
    

$conn = new Bacon();

$conn->addOrder("未確認", "19-10-05-029", "30",
 "11:40","12:50", "傑森史塔森", "0975975176", "培根蛋餅 x1 (30)");
$conn->addOrder("準備中", "19-10-05-028", "175",
 "11:38", "12:40", "傑森史塔森", "0975975176", "起司蛋餅 x5 (175)");
$conn->addOrder("已完成", "19-10-05-027", "60",
 "11:34", "12:30", "傑森史塔森", "0975975176", "卡拉雞腿堡 x1 (60)");
$conn->addOrder("已結帳", "19-10-05-026", "40",
 "11:32", "12:30", "傑森史塔森", "0975975176", "鮮奶茶 x1 (40)");
$conn->addOrder("已結帳", "19-10-05-025", "130",
 "11:30", "12:25", "傑森史塔森", "0975975176", "鮪魚三明治 x3 (90)、鮮奶茶 x1 (40)");
$conn->addOrder("婉拒", "19-10-05-024", "30",
 "11:20", "12:20", "傑森史塔森", "0975975176", "培根蛋餅 x1 (30)");
$conn->addOrder("婉拒", "19-10-05-023", "60000",
 "11:10", "12:10", "傑森史塔森", "0975975176", "鮮奶茶 x1500 (60000)");
