<?php

require_once '../core/init.php'; //this code works on register

if (Input::exists()) {
    $user = new User();
    $login = $user->login(Input::get('tel'), Input::get('password'));
    if ($login) {
        if(Input::get('tel')=='0000000000'){
            Redirect::to('./../register.html');//to boss
        }
        echo true;
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
    