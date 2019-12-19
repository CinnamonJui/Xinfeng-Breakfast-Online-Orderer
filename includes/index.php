<?php

require_once '../core/init.php';

DB::getInstance()->query("SELECT name FROM account WHERE name =?",array('alex'));

