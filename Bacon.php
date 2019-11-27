<?php
    include_once 'dbh.xbs.php';

    class Bacon{
        private $conn; //PDO connection class

        private $dbServername = "localhost";
        private $dbUsername = "root";
        private $dbPassword = "";
        private $dbName="XBS";
        
 


        function __construct(){
            
            $this->conn = new PDO('mysql:dbname='.$this->dbName.';host='.$this->dbServername, $this->dbUsername, $this->dbPassword );
            $this->conn->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );//Error Handling
            $this->conn->setAttribute(PDO::ATTR_EMULATE_PREPARES , false);
            $this->conn->close();
        }

        function __destruct(){
            $this->conn = null;
        }
            
        

    }

    