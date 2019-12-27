<?php
require_once '../core/init.php';

if(Input::exists()){
    if(Token::check(Input::get('token'))){
        echo 'HEHEHEHEHE';
        $validate = new Validate();
        $validation= $validate->check($_POST,array(
            'ID'=>array(
                'required' => true,
                'min' => 2,
                'max' => 20,
                'unique' => 'xbs.account'
            ),
            'password'=>array(
                'required' => true,
                'min' => 6
     
            ),
            'password_again'=>array(
                'required' => true,
                'matches' => 'password'
     
            ),
            'name'=>array(
                'required' =>true,
                'min' => 2,
                'max' => 50
            ) 
            ));
            if($validation->passed()){
                echo 'Passed';
     
            }else{
                print_r($validation->errors());
            }
    }
  
}
?>
<form action="" method="post">
    <div class="field">
        <label for="ID">ID</label>
        <input type="text" name="ID" id="ID" value="<?php echo escape(Input::get('ID')); ?>" autocomplete="off">
    </div>

    <div class="field">
        <label for="password">Choose a password</label>
        <input type="password" name ="password" id="password">
    </div>

    <div class="field">
        <label for="password_again">Enter yout password again</label>
        <input type="password" name ="password_again" id="password_again">
    </div>

    <div class="field">
        <label for="name">Your name</label>
        <input type="text" name ="name" value="<?php echo escape(Input::get('name')); ?>" id="name" >
    </div>
<input type="hidden" name ="token" value="<?php echo Token::generate(); ?>">
<input type="submit" value = "Register">


</form>