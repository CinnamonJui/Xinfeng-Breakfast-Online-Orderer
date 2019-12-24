<?php

include_once 'Bacon.php';
$bacon = new Bacon();

if ($bacon->checkIfIDAlreadyTaken($_POST["tel"]))
    echo 'Taken';
else
    echo 'Can';
    