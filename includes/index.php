<?php

require_once '../core/init.php';

$user=DB::getInstance()->get('Account',array('ID','=','0988843568'));

if(!$user->count()){
    echo 'No user';
}else{
    echo 'OK!';
}

