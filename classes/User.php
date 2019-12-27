<?php
class User{
    private $_db;

    public function __constructor($user = null){
        $this->_db= DB::getInstance();


    }
    public function create($field){
        if($this->_db->insert('xbs.account',$field)){
            throw new Exception('There was a problem creating an account.');
            

        }
    }
}