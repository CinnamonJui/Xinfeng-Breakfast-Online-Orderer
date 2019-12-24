<?php

include_once 'Bacon.php';
$bacon = new Bacon();
if ($bacon->login($_POST['tel'], $_POST['password'])) {
    echo true;
} else {
    echo false;
}
