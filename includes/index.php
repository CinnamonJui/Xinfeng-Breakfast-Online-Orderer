<?php

require_once '../core/init.php';

//$user=DB::getInstance()->get('account',array('name','=','1111'));
//$user=DB::getInstance()->query('SELECT ID FROM xbs.account WHERE ID = ?',array('0912345678'));
//$user=DB::getInstance()->get('xbs.account',array('ID','=','0912345678'));
/*$user=DB::getInstance()->get('xbs.account',array('ID','=','0912345678'));

if(!$user->count()){
    echo 'No user';
}else{
    echo $user->first()->ID;
    
    //echo print_r($user->results());
}*/

$user= DB::getInstance()->update('xbs.account','0912345678',array(
    'password'=>'HEHE',
    'salt'=>'update'
));

//$user=DB::getInstance()->query('INSERT INTO xbs.account (`ID`, `password`, `salt`) VALUES ("0922222222","11","123")');