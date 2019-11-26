<?php

    include_once 'dbh.xbs.php';
    include_once 'XBS_mySQL_operation.php';
    $ID= mysqli_real_escape_string($conn,$_POST['tel']);
    $password= mysqli_real_escape_string($conn,$_POST['password']);
    $name= mysqli_real_escape_string($conn,$_POST['name']);
    $age =$_POST['age'];
    $gender= mysqli_real_escape_string($conn,$_POST['gender']);
    $email= mysqli_real_escape_string($conn,$_POST['email']);
    if(register($ID,$password,$name,$age,$gender,$email))
        echo success;
    else echo fail;
    
?>
