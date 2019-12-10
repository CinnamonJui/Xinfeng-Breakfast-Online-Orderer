<?php 
    include_once '../php/Bacon.php';
    /*$conn=new mysqli($hn,$un,$pw,$db);
    if ($conn->connect_error) 
        die("Fatal Error");
    */
    $conn = new Bacon();
    $data;
    if(isset($_POST['find_str'])&&isset($_POST['find_type'])){
        $find_str=$_POST['find_str'];
        $find_type=$_POST['find_type'];
       /* $query="SELECT * FROM account WHERE $find_type IN ('$find_str') ORDER BY  total DESC";
        $result=$conn->query($query);
        $nrow=$result->num_rows;
        if(!$nrow){
            die("get data fail");
        }
         */
        $data = $conn->searchCustomer($find_str,$find_type);
       // echo $data;
    }
    else{
        /*$query="SELECT * FROM account ORDER BY  total DESC";
        $result=$conn->query($query);
        if(!$result)
            die("get data fail");
        $nrow=$result->num_rows;
        */
        $data = $conn->getCustomer();
    }
    /*for($i=0; $i<$nrow; $i++){
        $row=$result->fetch_array(MYSQLI_NUM);
        $data[$i]=$row;
    }
    if($data)
        echo JSON_encode($data);
    $result->close();
    $conn->close();
    */
    if($data !="[]")
        echo ($data);
    else echo ("get data fail");
?>