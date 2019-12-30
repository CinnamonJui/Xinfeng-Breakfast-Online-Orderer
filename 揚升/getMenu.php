<?php

    include_once '../php/Bacon.php';
    //連接database
    $conn = new Bacon();
    $result;

    if(isset($_POST['check'])){
        $check=$_POST['check'];
        if($check=="item")
            $result = $conn->getItem();
        else if($check=="combo")
            $result = $conn->getCombo();
        else
            die("check error");
    }
    if(isset($_POST['add_check'])){
        $add_check=$_POST['add_check'];
        if($add_check=="item"){
            $fname=$_FILES["file"]["name"];
            $file_dir=".\\images\\item\\".$_POST['ID'].".".substr(strrchr($fname, '.'), 1);
            move_uploaded_file($_FILES["file"]["tmp_name"],".".$file_dir);
            $result = $conn->addItem($_POST['ID'],$_POST['type'],
            $_POST['price'],$file_dir,$_POST['info']);
        }
            
        else if($add_check=="combo"){
            $fname=$_FILES["file"]["name"];
            $file_dir=".\\images\\combo\\".$_POST['ID'].".".substr(strrchr($fname, '.'), 1);
            move_uploaded_file($_FILES["file"]["tmp_name"],".".$file_dir);
            $result = $conn->addCombo($_POST['ID'],$_POST['price'],
            $file_dir,$_POST['items'],$_POST['info']);
        }
        else
            die("add_check error");
        echo $result;
        exit();    
    }
    if(isset($_POST['del_check'])){
        $del_check=$_POST['del_check'];
        unlink(".".$_POST['picture']);
        if($del_check=="item")
            $result = $conn->delItem($_POST['ID']);
        else if($del_check=="combo")
            $result = $conn->delCombo($_POST['ID']);
        else
            die("del_check error");
        echo $result;
        exit();    
    }
    if(isset($_POST['search_check']) && isset($_POST['search_string'])){
        $search_string=$_POST['search_string'];
        $search_check=$_POST['search_check'];
        if($search_check=="item"){
            $result=$conn->searchItem($search_string);
        }
        else if($search_check=="combo"){
            $result=$conn->searchCombo($search_string);
        }
        else
            die("search error");
        if($result !="[]")
            echo $result;
        else
            echo "no matchs";
        exit();    
    }
    /*if(isset($_POST['getType'])){
        if($_POST['getType'])
            $result=$conn->getType();
        else{
            $result=$conn->getType();
        }   
        echo $result;
        return;
    }*/
    if(isset($_POST["typeSelect"])){
        $result=$conn->getItemFromType($_POST["typeSelect"]);
        echo $result;
        exit();
    }
    if($result!="[]") 
        echo ($result);