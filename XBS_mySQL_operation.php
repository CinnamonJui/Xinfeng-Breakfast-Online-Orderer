
<?php
    //輸入資料前先跑formAction php再呼叫function
    include_once 'dbh.xbs.php'; //db連接
    
    /*訂單***********************************/
    //存入訂單(顧客)
    function addOrder($ID,$GT,$FT,$user,$status,$price,$items){
        global $conn;
        $sql = "INSERT INTO Orders (ID,GetTime,
                                    FnsTime,user,
                                    status,price,items)
                VALUES ($ID,$GT,$FT,$user,$status,$price,$items);";
    

        mysqli_query($conn, $sql);
        //$stmt = mysqli_stmt_init($conn);
        //mysqli_stmt_prepare($stmt,$sql);
    
        //mysqli_stmt_bind_param($stmt,"sssssis",$ID,$pw,$GT,$FT,$user,$status,$price,$items);
        //mysqli_stmt_execute($stmt);
    }
    //取得訂單資訊(老闆) push
    function getFinishOrder(){
        global $conn;
        $sql = "SELECT * 
                from Orders
                WHERE status in ('已付款','拒絕') ;";
    }
    function getNotFinishOrder(){
        global $conn;
        $sql = "SELECT * 
                from Orders
                WHERE status in ('未確認','未完成','已完成');";
    }
    //更改訂單狀態
    function changeOrderStatus($ID,$status){
        global $conn;
        $sql = "UPDATE Orders
                SET status = $status
                WHERE ID = $ID;";

        
        mysqli_query($conn,$sql);
    }

    /*菜單***********************************/
    //取得菜單(首頁/顧客)
    function getMenu(){
        
    }
    //新增菜單(老闆)
    function addMenu(){

    }
    //菜單修改(老闆)
    function menuModiy(){

    }
    //菜單刪除(老闆)
    function menuDel(){
        
    }
    //菜單搜尋
    function searchMenu(){

    }
    /*套餐************************************/
    //combo新增(老闆)
    function addCombo(){

    }
    //combo修改(老闆)
    function comboModify(){

    }
    //combo刪除(老闆)
    function comboDel(){

    }
    /*顧客資料*******************************/
    //登入(顧客/老闆)
    function login($ID,$pw){


    }
    //註冊(顧客)
    function register($ID,$pw,$name,$age,$gender,$email){
        
        global $conn;
        $sql = "INSERT INTO Account (ID,password,
                                        name,age,
                                        gender,email)
                VALUES (?,?,?,?,?,?);";
    
        $stmt = mysqli_stmt_init($conn);
        mysqli_stmt_prepare($stmt,$sql);
    
        mysqli_stmt_bind_param($stmt,"sssiss",$ID,$pw,$name,$age,$gender,$email);
        return mysqli_stmt_execute($stmt);
        
    }
    //取得顧客資料(老闆)
    function getCustomer(){
        global $conn;
        $customerData = array();
        $sql = "SELECT * FROM Account;";
        $result = mysqli_query($conn,$sql);
        $resultCheck=mysqli_num_rows($result);

        if($resultCheck>0){
            while($row=mysqli_fetch_assoc($result)){
                $customerData[]=$row;
            }
        }

        $customerData = json_encode($customerData);
        return $customerData;
    }
    //搜尋顧客資料(老闆)
    function searchCustomer($str){
        global $conn;

        $searchResult =array();
        $sql = "select * 
                from Account
                where ID like '%".$str."%'
                      or name like '%".$str."%';";
        $result = mysqli_query($conn,$sql);
        $resultCheck=mysqli_num_rows($result);

        if($resultCheck>0){
            while($row=mysqli_fetch_assoc($result)){
                $searchResult[]=$row;
            }
        }

        $searchResult = json_encode($searchResult);
        return $searchResult;
    }

    


?>