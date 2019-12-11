<?php
    include_once "Bacon.php";

    $conn = new Bacon();
    $items = $_POST['item_list'];
    $finishTime = $_POST['finishTime'];
    //echo $items;
    echo $finishTime;
    //print_r($items);
    $jsonitems  = json_decode($items,true);
    //echo $items;
    $total_price = 0;
    foreach($jsonitems as $k=> $v){
      $temp = explode(",",$v); 
      $total_price  += $temp[1];
}
    $getTime = (string)(date("H:i",time()+7*3600));
    session_start();
    $userID = $_SESSION['ID'];
    $orderID = date("Y-m-d")."-".date("H-i",time()+7*3600)."-".$userID;
    
    $conn->addOrder("未確認",$orderID,$total_price,$getTime,$finishTime,$userID,$items);
?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../stylesheets/訂單.css">
    <title>訂單狀態</title>
</head>

<body onload="ShowTime()">
    <div id="page">
        <div id="option-bar">
            <span id="title">訂單進度</span>
            <span id="display-userID"></span>
        </div>
        <div class=panel>
            <table>
                <tbody>
                    <tr>
                        <th class=title>編號</th>
                        <th class=value><?php echo $orderID?></th>
                    </tr>
                    <tr>
                        <th class=title>總計</th>
                        <th class=value><?php echo $total_price?></th>
                    </tr>
                    <tr>
                        <th class=title>狀態</th>
                        <th class=value>未確認</th>
                    </tr>
                    <tr>
                        <th class=title>預定</th>
                        <th class=value><?php echo $finishTime?></th>
                    </tr>
                </tbody>
            </table>

            <textarea name="myTextBox" readonly><?php
               foreach($jsonitems as $k=> $v){
                  $temp = explode(",",$v);
                  echo "NT$" .$temp[1]." -". $k. " *".$temp[0]."\n"; 
                  $total_price  += $temp[1];
            }
            ?> 
            </textarea>
        </div>


        <div class=time_and_button>
            <form class=time id="form1" runat="server">
                <div id="showbox"></div>
            </form>
            <button class=action_btn onclick="location.href='../main.html';">返回</button>
        </div>
        <script src="../javascripts/訂單.js"></script>
    </div>
</body>

</html>

