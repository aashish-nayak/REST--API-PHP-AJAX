<?php
    include_once "config.php";
    header("content-type:application/json;charset=UTF-8");
    header("Access-Control-Allow-Methods:POST");
    header("Access-Control-Allow-Origin:*");
    header("Access-Control-Allow-Headers:content-type,Access-Control-Allow-Methods,Access-Control-Allow-Headers,Authorization, X-Requested-With");

    $Jdata = json_decode(file_get_contents("php://input"),true);
    $name = $Jdata['name'];
    $age = $Jdata['age'];
    $state = $Jdata['state'];
    $city = $Jdata['city'];
    $gender = $Jdata['gender'];
    $sql = "INSERT INTO api_data(name,age,state,city,gender)VALUES('$name','$age','$state','$city','$gender')";
    if(mysqli_query($conn,$sql)){
        $arr = ["message" => "Record Inserted Successfully","status"=>true];
        echo json_encode($arr);
    }else{
        $arr = ["message" => "Record Not Inserted","status"=>false];
        echo json_encode($arr);
    }



?>