<?php
class User{
    private $_db,
            $_data,
            $_sessionName;

    public function __construct($user = null){
        $this->_db= DB::getInstance();
        $this->_sessionName=Config::get('session/session_name');


    }
    public function create($fields=array()){
        if(!$this->_db->insert('xbs.account',$fields)){
            throw new Exception('There was a problem creating an account.');
        }
    }
    public function find($user=null){
        if($user){
            //$field = (is_numeric($user))? 'ID' :' name';// he want to find id too
            $field='ID';
            $data= $this->_db->get('xbs.account',array($field,'=',$user));
            if($data->count()){
                $this->_data=$data->first();
                
                return true;
            }

        }
        return false;

    }
    public function login($ID=null,$password=null){
        $user=$this->find($ID);
        if($user){
            if($this->data()->password ==Hash::make($password, $this->data()->salt)){
                Session::put($this->_sessionName,$this->data()->ID);//might be trouble
                echo $this->data()->ID . '<br>';
                return true;

            }
        }
      
        return false;
    }
    public function data(){
        return $this->_data;
    }
}
