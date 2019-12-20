<?php
class DB{
    private static  $_instance = null;
    private $_pdo,
            $_query,
            $_error = false,
            $_results,
            $_count=0;
    private function __construct(){
        try{
            $this->_pdo = new PDO('mysql:dbname='.Config::get('mysql/db').';host='.Config::get('mysql/host'),
            Config::get('mysql/username'),Config::get('mysql/password'));
            //echo 'Connected';
        }catch(PDOException $e){
            die($e->getMessage());
        }

    }
    public static function getInstance(){
        if(!isset(self::$_instance)){
            self::$_instance=new DB();

        }
        return self::$_instance;
    }
    public function query($sql,$params = array()){
        $this->_error=false;
        if($this->_query = $this->_pdo->prepare($sql)){
            $x=1;
            if(count($params))
            foreach($params as $param){
                $this->_query->bindValue($x,$param);
                $x++;
                
            }

        }
        if($this->_query->execute()){
            $this->results = $this->_query->fetchAll(PDO::FETCH_OBJ);
            $this->_count=$this_query->rowCount();

        }else{
            $this->_error = true;
        }
        return  $this;
    }
    public function action($action,$table,$where=array()){
        if(count($where)===3){
            $operators = array('=','>','<','>=','<=');

            $field      = $where[0];
            $operator   = $where[1];
            $value      = $where[2];
            if(in_array($operator,$operators)){
                $sql ='{$action} FROM {$table} WHERE {$field} {$operator} ?'; 
                if(!$this->query($sql,array($value))->error()){

                }
            }
        }
    }
    public function get($table,$where){
        return $this->action('SELECT *',$table,$where);

    }
    public function delete($table,$where){
        return $this->action('DELETE',$table,$where);
    }
    public function error(){
        return $this->_error;
    }
    public function count(){
        return $this->_count;
    }
}
        
