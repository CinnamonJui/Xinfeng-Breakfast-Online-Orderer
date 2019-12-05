<?php

include_once 'Bacon.php';

$bacon = new Bacon();

$result = $bacon->login($_POST['search'],1);
//print_r($result);
echo $result;