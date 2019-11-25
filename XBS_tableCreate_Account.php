<?php
    include_once 'dbh.xbs.php';

    $sql = "create table Account(	 
        
        ID 			nvarchar(15)     PRIMARY	KEY not null,  	
        password 	nvarchar(20) 	not null	,  	
        name 		nvarchar(20) 	not null	,   
        age			integer(4) 	 	not null	,	
        gender		nvarchar(10) 	not null	,	
        email		nvarchar(40) 	not null	,	
        total		integer(8)		default 0
    );";

    if (mysqli_query($conn, $sql)) {
        echo "Table Account created successfully";
    } else {
        echo "Error creating table: " . mysqli_error($conn);
    }
    mysqli_close($conn);

?>