<?php

    class Bacon{
        private $conn; //PDO connection class

        private $dbServername = "localhost";
        private $dbUsername = "root";
        private $dbPassword = "";
        private $dbName="XBS";
        

        function __construct(){
            try{
                $this->conn = new PDO('mysql:dbname='.$this->dbName.';host='.$this->dbServername, $this->dbUsername, $this->dbPassword );
                $this->conn->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );//Error Handling
                $this->conn->setAttribute(PDO::ATTR_EMULATE_PREPARES , false);
            }
            catch (PDOException $e){
                echo "No Bacon ".$e->getMessage();
            }
            
        }

        function __destruct(){
            $this->conn = null;
        }

        /*訂單***********************************/
        //存入訂單(顧客)
        function addOrder($ID,$GT,$FT,$user,$status,$price,$items){

            $sql = "INSERT INTO Orders (ID,GetTime,
                                        FnsTime,user,
                                        status,price,items)
                    VALUES ($ID,$GT,$FT,$user,$status,$price,$items);";
        
            $this->conn->exec($sql);
        }

        //取得訂單資訊(老闆) push
        function getFinishOrder(){
        
            $sql = "SELECT * 
                from Orders
                WHERE status in ('已付款','拒絕') ;";

            $this->conn->exec($sql);
        }

        function getNotFinishOrder(){

            $sql = "SELECT * 
                    from Orders
                    WHERE status in ('未確認','未完成','已完成');";
                    
            $this->conn->exec($sql);
        }

        /*顧客資料*******************************/
        //登入(顧客/老闆)
        function login($ID,$pw){


        }

        //註冊(顧客) boolen true表示註冊成功 false表示有重複ID
        function register($ID,$pw,$name,$age,$gender,$email){
            
            
            $sqlFind = "SELECT COUNT(*) 
                    from Account
                    WHERE ID=?;";
            $stmtF = $this->conn->prepare($sqlFind);
            $stmtF-> bindParam(1,$ID);
            $stmtF->execute();
            $count = $stmtF->fetchColumn();
            echo "123".$count;

            if($count>0){
                return false;
            }
            else{
                $sqlInsert = "INSERT INTO Account (ID,password,
                                        name,age,
                                        gender,email)
                    VALUES (?,?,?,?,?,?);";
                    
                $stmtI = $this->conn->prepare($sqlInsert);
                $stmtI->bindParam(1,$ID);
                $stmtI->bindParam(2,$pw);
                $stmtI->bindParam(3,$name);
                $stmtI->bindParam(4,$age);
                $stmtI->bindParam(5,$gender);
                $stmtI->bindParam(6,$email);
                
                $stmtI->execute();
                
                return true;
            }

        }

        //取得顧客資料(老闆)
        function getCustomer(){
        
            $customerData = array();
            $sql = "SELECT * FROM Account;";

            try{
                $result = $this->conn->query($sql);
                $customerData = $result->fetchAll();
                $customerData = json_encode($customerData);
                return $customerData;
            }
            catch (PDOException $e){
                echo $e->getMessage();
            }
        }

        //搜尋顧客資料(老闆)
        function searchCustomer($str){

            $searchResult =array();
            $sql = "select * 
                    from Account
                    where ID like '%".$str."%'
                    or name like '%".$str."%';";
            try{
                $result = $this->conn->query($sql);
                $searchResult = $result->fetchAll();
                $searchResult = json_encode($searchResult);
                return $searchResult;
            }
            catch (PDOException $e){
                echo $e->getMessage();
            }
        }

    }

    