<?php

require_once '../core/init.php';

/*$users = DB::Instance()->query('SELECT name FROM Account');
if($users->count()){
    foreach($users as $user){
        echo $user->name;
    }
}*/
DB::getInstance();

//echo Config::get('mysql/host'); //localhost