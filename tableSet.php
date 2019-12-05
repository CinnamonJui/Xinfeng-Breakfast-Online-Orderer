<?php

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
    