<?php
require_once '../core/init.php';
                    //not test yet
$user = new User(); //constructor will check current session value
$user->logout();

Redirect::to('../login.html');