<?php

require_once '../core/init.php';

$user=DB::getInstance()->get('Account',array('ID','=','0912345678'));

if(!$user->count()){
    echo 'No user';
}else{
    echo 'OK!';
}

