<?php

    include_once 'Bacon.php';
    $bacon = new Bacon();
/*
    $ID= mysqli_real_escape_string($conn,$_POST['tel']);
    $password= mysqli_real_escape_string($conn,);
    $name= mysqli_real_escape_string($conn,);
    $age =$_POST['age'];
    $gender= mysqli_real_escape_string($conn,$_POST['gender']);
    $email= mysqli_real_escape_string($conn,$_POST['email']);
*/
    
    if($bacon->login($_POST['tel'],$_POST['password'])){
        echo "success";
        header("Location:../main.html");
    }
    else echo "fail";
    
?>
