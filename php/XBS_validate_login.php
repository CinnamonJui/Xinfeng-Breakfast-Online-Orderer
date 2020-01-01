<?php
/*session_start();
if(isset($_GET["logout"]) && $_GET["logout"] == true){
    unset($_SESSION['ID']);
    return;
}
if (isset($_SESSION['ID'])) {
    echo $_SESSION['ID'];
    return true;
} else {
    return false;
}*/
require_once '../core/init.php';
$user = new User();
if($user->isLoggedIn()){
    echo $_SESSION[Config::get('session/session_name')];
    return true;
}else{
    return false;
}
