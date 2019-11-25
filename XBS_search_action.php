<?php

include_once 'dbh.xbs.php';
include_once 'XBS_mySQL_operation.php';


$str= mysqli_real_escape_string($conn,$_POST['search']);
$result = searchCustomer($str);
print_r($result);
