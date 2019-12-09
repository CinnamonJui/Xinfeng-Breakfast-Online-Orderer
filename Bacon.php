<?php

class Bacon
{
    private $conn; //PDO connection class

    private $dbServername = "localhost";
    private $dbUsername = "root";
    private $dbPassword = "";
    private $dbName = "XBS";


    function __construct()
    {
        try {
            $this->conn = new PDO('mysql:dbname=' . $this->dbName . ';host=' . $this->dbServername, $this->dbUsername, $this->dbPassword);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); //Error Handling
            $this->conn->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
            $this->conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            //echo "No Bacon " . $e->getMessage();
        }
    }

    function __destruct()
    {
        $this->conn = null;
    }

    /*訂單***********************************/
    //存入訂單(顧客)
    function addOrder($status, $ID, $price, $GT, $FT, $user, $items) //ok
    {

        $sql = "INSERT INTO Orders (status,ID,price,
                                    GetTime,FnsTime,
                                    user_ID,items)
                    VALUES (?,?,?,?,?,?,?);";

        $stmtI = $this->conn->prepare($sql);
        $stmtI->bindParam(1, $status);
        $stmtI->bindParam(2, $ID);
        $stmtI->bindParam(3, $price);
        $stmtI->bindParam(4, $GT);
        $stmtI->bindParam(5, $FT);
        $stmtI->bindParam(6, $user);
        $stmtI->bindParam(7, $items);

        try{
            $stmtI->execute();
            $sql = "UPDATE status SET isNew = true;";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
        }
        catch (PDOException $e){
           // echo $e->getMessage();
        }
        
    }
    //確認有無新訂單
    function checkNewOrder()
    {
        $result = $this->conn->query("SELECT isNew from status where isNew=true;");
        $result = $result->fetch();
        print_r($result);
        if ($result["isNew"]) return true;
        else return false;
    }
    //取得訂單資訊(老闆)
    function getFinishOrder() //ok
    {

        $sql = "SELECT status,ID,price,
                GetTime,FnsTime,name,
                user_ID,items
                from Orders natural join account
                WHERE status in ('已結帳','婉拒') 
                ORDER BY  status DESC,ID DESC;";

        try {
            $result = $this->conn->query($sql);
            $data = $result->fetchAll();
            $data = json_encode($data);
            return $data;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    //取得結束訂單
    function getUnFinishOrder() //ok
    {

        $sql = "SELECT status,ID,price,
                GetTime,FnsTime,name,
                user_ID,items
                from Orders natural join account
                WHERE status in ('未確認','準備中','已完成') 
                ORDER BY status DESC,ID DESC;";

        try {
            $result = $this->conn->query($sql);
            $data = $result->fetchAll();
            
            //echo "<br>count =".count($data)."<br>";
            /*
            foreach($data as $row)
            {
                foreach($row as $key => $value)
                {
                    echo $key." : ".$value."<br />";
                }
            }   
            */
            $data = json_encode($data);
            return $data;
        } catch (PDOException $e) {
            //echo $e->getMessage();
        }
    }

    //只取得新的未讀訂單
    function getNewOrder() //ok
    {
        $sql = "SELECT status,ID,price,
                GetTime,FnsTime,name,
                user_ID,items
                from Orders natural join account
                WHERE isRead = 0
                ORDER BY status DESC,ID DESC;";
        $sql2 = "UPDATE Orders SET isRead = 1 WHERE isRead= 0;";
        $sql3 = "UPDATE status SET isNew = 0;";
        
        

        try {
            $result = $this->conn->query($sql);
            $data = $result->fetchAll();
            $data = json_encode($data);
            //print_r($data);
            //return $data;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }

        try{
            $stmt = $this->conn->prepare($sql2);
            $stmt->execute();

            $stmt = $this->conn->prepare($sql3);
            $stmt->execute();
        }
        catch( PDOException $e){

        }
        return $data;
    }

    function changeOrderStatus($ID, $status)
    {
        $sql = "UPDATE Orders
                SET status = $status
                WHERE ID = $ID;";

        $this->conn->exec($sql);
    }

    /*顧客資料*******************************/
    //登入(顧客/老闆)
    function login($ID, $pw)
    {
         $sql = "SELECT user_ID,password
                from Account
                Where user_ID=:ID;";
        try {
            $query = $this->conn->prepare($sql);
            $query->bindParam(":ID",$ID);
            $query->execute();
            $data = $query->fetch();
            $checkpw = $data["password"];
            if($checkpw==$pw)return true;
            else return false;
            
            //return $customerData;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
 }

    //註冊(顧客) boolen true表示註冊成功 false表示有重複ID
    function register($ID, $pw, $name, $age, $gender, $email)
    {

        $sqlFind = "SELECT COUNT(*) 
                    from Account
                    WHERE user_ID=?;";
        $stmtF = $this->conn->prepare($sqlFind);
        $stmtF->bindParam(1, $ID);
        $stmtF->execute();
        $count = $stmtF->fetchColumn();
        
        //echo "count is " .$count;

        if ($count > 0) {
            return false;
        } else {
            $sqlInsert = "INSERT INTO Account (user_ID,password,
                                        name,age,
                                        gender,email)
                    VALUES (?,?,?,?,?,?);";

            $stmtI = $this->conn->prepare($sqlInsert);
            $stmtI->bindParam(1, $ID);
            $stmtI->bindParam(2, $pw);
            $stmtI->bindParam(3, $name);
            $stmtI->bindParam(4, $age);
            $stmtI->bindParam(5, $gender);
            $stmtI->bindParam(6, $email);

            $stmtI->execute();

            return true;
        }
    }

    //取得顧客資料(老闆)
    function getCustomer()
    {

        $customerData = array();
        $sql = "SELECT * FROM Account;";

        try {
            $result = $this->conn->query($sql);
            $customerData = $result->fetchAll();
            $customerData = json_encode($customerData);
            return $customerData;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }

    //搜尋顧客資料(老闆)
    function searchCustomer($str)
    {

        $searchResult = array();
        $sql = "select * 
                    from Account
                    where ID like '%" . $str . "%'
                    or name like '%" . $str . "%';";
        try {
            $result = $this->conn->query($sql);
            $searchResult = $result->fetchAll();
            $searchResult = json_encode($searchResult);
            return $searchResult;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }

    /***********************菜單*********************/
    
    function addItem($ID,$type,$price,$picture,$info){
        $sqlFind = "SELECT COUNT(*) 
                    from Item
                    WHERE ID=?;";
        $stmtF = $this->conn->prepare($sqlFind);
        $stmtF->bindParam(1, $ID);
        $stmtF->execute();
        $count = $stmtF->fetchColumn();
        if($count>0){
            return false;
        }
        else {
            $sql = "INSERT INTO Item (ID,type,price,picture,info) VALUES (?,?,?,?,?);";
            $stmtI = $this->conn->prepare($sql);
            $stmtI->bindParam(1, $ID);
            $stmtI->bindParam(2, $type);
            
            $stmtI->bindParam(3, $price);
            $stmtI->bindParam(4, $picture);
            $stmtI->bindParam(5, $info);
            $stmtI->execute();

            return true;
        }
    }
    function editItem($ID,$type,$price,$picture,$info){

        $sql = "UPDATE Item SET type = ? ,price = ?,picture = ?, info = ? WHERE ID = ?;";
        $stmt = $this->conn->prepare($sql);
        
        $stmt->bindParam(1, $type);
        $stmt->bindParam(2, $price);
        $stmt->bindParam(3, $picture);
        $stmt->bindParam(4, $info);
        $stmt->bindParam(5, $ID);
        
        try{
            $stmt->execute();
            return true;
        }
        catch (PDOException $e){
           return false;
        }
    }
    function delItem($ID){
        $sql = "DELETE from Item where ID = ?;";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(1,$ID);
        try{
            $stmt->execute();
            return true;
        }
        catch(PDOException $e){
            return false;
        }
    }
    function searchItem($str)
    {
        $searchResult = array();
        /*$sql = "SELECT * FROM Item WHERE ID LIKE '%" . $str . "%'
                or type like '%" . $str . "%';";*/
        
        $sql = "SELECT * FROM Item WHERE ID LIKE :keyword1
                or type like :keyword2;";
        try 
		{
            
            /*$result = $this->conn->query($sql);
            $searchResult = $result->fetchAll();
            $searchResult = json_encode($searchResult);
            return $searchResult;*/
            
            $query = $this->conn->prepare($sql);
            $query->bindValue(':keyword1','%'.$str.'%',PDO::PARAM_STR);
            $query->bindValue(':keyword2','%'.$str.'%',PDO::PARAM_STR);
            $query->execute();
            $result= $query->fetchAll();
            $result = json_encode($result);
            return $result;
        } 
		catch (PDOException $e) 
		{
            echo $e->getMessage();
        }
    }
	function getItem()
    {
       
        $sql = "SELECT * FROM Item;";
        try 
		{
            $result = $this->conn->query($sql);
            $itemData = $result->fetchAll();
            $itemData = json_encode($itemData);
            return $itemData;
        } 
		catch (PDOException $e) 
		{
            echo $e->getMessage();
        }
    }

    function getType(){
        $sql = "SELECT distinct type
                from Item
                ORDER BY `type` ASC;";
        try{
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchAll();
            $result = json_encode($result);
            return $result;
        }
        catch(PDOException $e){

        }
        
    }
    /*******************combo***********************/
    function addCombo($ID, $price, $picture, $items,$info)
    {

        $sqlFind = "SELECT COUNT(*) 
                    from Combo
                    WHERE ID=?;";
        $stmtF = $this->conn->prepare($sqlFind);
        $stmtF->bindParam(1, $ID);
        $stmtF->execute();
        $count = $stmtF->fetchColumn();

        if ($count > 0) {
            return false;
        } else {
            try{
                $sqlInsert = "INSERT INTO Combo (ID,
                                        price,picture,items,info)
                    VALUES (?,?,?,?,?);";

            $stmtI = $this->conn->prepare($sqlInsert);
            $stmtI->bindParam(1, $ID);
            $stmtI->bindParam(2, $price);
            $stmtI->bindParam(3, $picture);
            $stmtI->bindParam(4, $items);
            $stmtI->bindParam(5, $info);

            $stmtI->execute();
            }catch(PDOException $e){
                echo $e->getMessage();            
            }
            
            return true;
        }
    }
    //編輯combo
	function editCombo($ID,$price,$picture,$items,$info)
	{
        $sql = "UPDATE Combo SET price = ?, picture = ?, items = ?,info = ? WHERE ID = ?;";
        
		try
		{
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(1,$price);
            $stmt->bindParam(2,$picture);
            $stmt->bindParam(3,$items);
            $stmt->bindParam(4,$info);
            $stmt->bindParam(5,$ID);

            $stmt->execute();
        }
        catch (PDOException $e)
		{
           echo $e->getMessage();   
        }
	}
	//刪除combo
	function delCombo($ID)
	{
		$sql = "DELETE FROM Combo where ID = ?";
		try
		{
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(1,$ID);
            $stmt->execute();
        }
        catch (PDOException $e)
		{
            echo $e->getMessage();   
        }
	}
	function searchCombo($str)
    {
        $searchResult = array();
        $sql = "SELECT * FROM Combo WHERE ID LIKE '%" . $str . "%';";
                
        try 
		{
            $result = $this->conn->query($sql);
            $searchResult = $result->fetchAll();
            $searchResult = json_encode($searchResult);
            return $searchResult;
        }
		catch (PDOException $e) 
		{
            echo $e->getMessage();   
        }
    }
	function getCombo()
    {
        $comboData = array();
        $sql = "SELECT * FROM Combo;";
        try 
		{
            $result = $this->conn->query($sql);
            $comboData = $result->fetchAll();
            $comboData = json_encode($comboData);
            return $comboData;
        } 
		catch (PDOException $e) 
		{
            echo $e->getMessage();   
        }
    }
}
