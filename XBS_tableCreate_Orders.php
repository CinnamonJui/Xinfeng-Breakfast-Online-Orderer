<?php
    include_once 'dbh.xbs.php';

    $sql = 'create table Orders(

            ID          varchar(15)     not NULL,
            GetTime     time,
            FnsTime     time,
            user        varchar(15)     not NULL,
            status      varchar(15)     not NULL,
            price       integer(4)      not NULL,
            items       nvarchar(4000)  not NULL,
            Primary key(ID)
        );';

    if (mysqli_query($conn, $sql)) {
        echo "Table Orders created successfully";
    } else {
        echo "Error creating table: " . mysqli_error($conn);
    }
    mysqli_close($conn);
        