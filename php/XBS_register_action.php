<?php

require_once '../core/init.php';
if (Input::exists()) {
    //if (Token::check(Input::get('token'))) {
        $user = new User();
        $salt = Hash::salt(32);
        try {
            $user->create(array(
                'user_ID' => Input::get('tel'),
                'password' => Hash::make(Input::get('password'), $salt),
                'salt' => $salt,
                'name' => Input::get('name'),
                'age' => Input::get('age'),
                'gender' => Input::get('gender'),
                'email' => Input::get('email'),
                'total' => '0'
            ));
            $login = $user->login(Input::get('tel'), Input::get('password'));//
            //Session::flash('home', 'You have been registered and can now log in!');
            //Redirect::to('../login.html');
            //echo 'success';
        } catch (Exception $e) {
            die($e->getMessage());
        }
    //}
}
echo 'fail';
