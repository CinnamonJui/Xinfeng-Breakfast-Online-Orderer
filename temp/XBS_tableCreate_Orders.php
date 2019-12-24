<?php
    include_once 'dbh.xbs.php';

    
    try{
        $sqlOrders = 'create table Orders(

            ID          varchar(15)     not NULL,
            GetTime     TIMESTAMP NULL,
            FnsTime     TIMESTAMP NULL,
            user        varchar(15)     not NULL,
            status      varchar(15)     not NULL,
            price       integer(4)      not NULL,
            items       nvarchar(4000)  not NULL,
            isRead      boolean         not NULL,
            Primary key(ID)
        );
        ALTER TABLE Orders
            DEFAULT false for isRead;';

        $conn->exec($sql);
        echo "Table Orders created successfully";

    }catch(PDOException $e){
    echo $e->getMessage();//Remove or change message in production code
}