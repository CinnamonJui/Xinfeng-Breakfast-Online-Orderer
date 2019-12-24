<?php

require_once '../core/init.php';

//$user=DB::getInstance()->get('account',array('name','=','1111'));
//$user=DB::getInstance()->query('SELECT ID FROM xbs.account WHERE ID = ?',array('0912345678'));
$user=DB::getInstance()->get('xbs.account',array('ID','=','0912345678'));
if(!$user->count()){
    echo 'No user';
}else{
    echo 'OK!';
}

