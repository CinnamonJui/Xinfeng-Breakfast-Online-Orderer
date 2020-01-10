<?php

require_once '../core/init.php'; //this code works on register

if (Input::exists()) {
    $user = new User();
    $login = $user->login(Input::get('tel'), Input::get('password'));
    if ($login) {
        if(Input::get('tel')=='0000000000'){
            //Redirect::to('../揚昇/主控台頁面.html');//to boss
            echo './揚昇/主控台頁面.html';
        }else{
            echo './main.html';
        }
    } else {
        echo false;
    }
}


/*include_once 'Bacon.php'; //previous code
$bacon = new Bacon();

if ($bacon->login($_POST['tel'], $_POST['password']))
    echo true;
else
    echo false;*/
    