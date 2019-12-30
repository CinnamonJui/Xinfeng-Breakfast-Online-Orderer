<?php

    include_once 'Bacon.php';
    $bacon = new Bacon();
    
    if($bacon->register($_POST['tel'],$_POST['password'],$_POST['name']
                        ,$_POST['age'],$_POST['gender'],$_POST['email']))
        echo "success";
    else echo "fail";


?>
