<?php
    include_once 'dbh.xbs.php';
    try{
    $sql = "create table Account(	 
        
        ID 			nvarchar(15)     PRIMARY	KEY not null,  	
        password 	nvarchar(20) 	not null	,  	
        name 		nvarchar(20) 	not null	,   
        age			integer(4) 	 	not null	,	
        gender		nvarchar(10) 	not null	,	
        email		nvarchar(40) 	not null	,	
        total		integer(8)		default 0
    );";

    $conn->exec($sql);
    echo "Table Account created successfully";
 
    }catch(PDOException $e){
        echo $e->getMessage();//Remove or change message in production code
    }
    

?>