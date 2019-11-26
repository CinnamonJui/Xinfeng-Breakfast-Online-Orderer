<?php
    include_once 'dbh.xbs.php';

    
    try{
        $sql = 'create table Orders(

            ID          varchar(15)     not NULL,
            GetTime     TIMESTAMP NULL,
            FnsTime     TIMESTAMP NULL,
            user        varchar(15)     not NULL,
            status      varchar(15)     not NULL,
            price       integer(4)      not NULL,
            items       nvarchar(4000)  not NULL,
            Primary key(ID)
        );';
        $conn->exec($sql);
        echo "Table Orders created successfully";

    }catch(PDOException $e){
    echo $e->getMessage();//Remove or change message in production code
}