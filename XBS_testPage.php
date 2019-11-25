<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>


<form action="XBS_test_action.php" method="POST">
<input type="text" name="ID" placeholder="ID">
<br>
<input type="password" name="pw" placeholder="pw">
<br>
<input type="text" name="name" placeholder="name">
<br>
<input type="number" name="age" placeholder="age">
<br>
<input type="text" name="gender" placeholder="gender">
<br>
<input type = "text" name="email" placeholder="email">
<br> 
<button type="submit" name = "submit">Sign up</button>
</form>



<?php
    include_once 'XBS_mySQL_operation.php';

    $customer = array();
    $customer = getCustomer();
    print_r($customer);
?>
</body>
</html>

<!DOCTYPE>