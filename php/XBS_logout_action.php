<?php
require_once '../core/init.php';
                    //not test yet
$user = new User(); //constructor will check current session value
$user->logout();

echo './login.html';
//Redirect::to('../login.html');