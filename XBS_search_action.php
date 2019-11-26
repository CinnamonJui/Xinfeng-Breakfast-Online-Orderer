<?php

include_once 'Bacon.php';

$bacon = new Bacon();

$result = $bacon->searchCustomer($_POST['search']);
print_r($result);
