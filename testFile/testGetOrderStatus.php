<?php

    include_once "../php/Bacon.php";

    $conn = new Bacon();

    $data = $conn->getOrderStatus("2019-12-11-19-22-0975975176");
    print_r($data);