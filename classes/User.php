<?php
class User{
    private $_db,
            $_data,
            $_sessionName,
            $_isLoggedIn;

    public function __construct($user = null){
        $this->_db= DB::getInstance();
        $this->_sessionName=Config::get('session/session_name');
        if(!$user){
            if(Session::exists($this->_sessionName)){
                $user =Session::get($this->_sessionName);
                if($this->find($user)){
                    $this->_isLoggedIn=true;
                }else{


                }

            }else{
                $this->find($user);

            }
        }
    }
    public function create($fields=array()){
        if(!$this->_db->insert('account',$fields)){
            throw new Exception('There was a problem creating an account.');
        }
    }
    public function find($user=null){
        if($user){
            //$field = (is_numeric($user))? 'ID' :' name';// he want to find id too
            $field='ID';
            $data= $this->_db->get('account',array($field,'=',$user));
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
                Session::put($this->_sessionName,$this->data()->ID);
                return true;

            }
        }
        echo 'login fail';
        return false;
    }
    public function logout(){
        Session::delete($this->_sessionName);
    }
    public function data(){
        return $this->_data;
    }
    public function isLoggedIn(){
        return $this->_isLoggedIn;
    }
}
