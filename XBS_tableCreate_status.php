<?php
    include_once 'dbh.xbs.php';

    
    try{
        $sql = 'create table status(
            data   int(1)   not NULL,
            isNew  boolean  not NULL,
            Primary key(data)
        );';
        $conn->exec($sql);
        echo "Table status created successfully";

    }catch(PDOException $e){
    echo $e->getMessage();//Remove or change message in production code
}