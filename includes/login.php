<?php
require_once '../core/init.php';
if(Input::exists()){
    if(Token::check(Input::get('token'))){
        $validate=new Validate();
        $validation=$validate->check($_POST,array(
            'ID'      =>array('required'=>true),
            'password'=>array('required'=>true)
        ));
        if($validation->passed()){
            $user=new User();
            $login = $user->login(Input::get('ID'),Input::get('password'));
            if($login){
                Redirect::to('index.php');
               
            }else{
                echo 'fail???';
            }
        }else{
            foreach($validation->errors() as $error){
                echo $error, '<br>';
            }
        }
    }
}
?>


<form action="" method="post">
    <div class="field">
        <label for="ID">ID</label>
        <input type="text" name="ID" id="ID" autocomplete="off">
    </div>
    <div>
        <label for="password">Password</label>
        <input type="password" name="password" id="password" autocomplete="off">
    </div>
    <input type="hidden" name="token" value="<?php echo Token::generate(); ?>">
    <input type="submit" value="Log in">

</form>