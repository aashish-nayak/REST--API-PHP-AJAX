<?php
    include_once "config.php";
    header("content-type:application/json;charset=UTF-8");
    header("Access-Control-Allow-Methods:PUT");
    header("Access-Control-Allow-Origin:*");
    header("Access-Control-Allow-Headers:content-type,Access-Control-Allow-Methods,Access-Control-Allow-Headers,Authorization, X-Requested-With");

    $Jdata = json_decode(file_get_contents("php://input"),true);
    $id = $Jdata['sid'];
    $name = $Jdata['name'];
    $age = $Jdata['age'];
    $city = $Jdata['city'];
    $gender = $Jdata['gender'];
    $sql = "UPDATE api_data SET name='$name',age='$age',city='$city',gender='$gender' WHERE id='$id'";
    if(mysqli_query($conn,$sql)){
        $arr = ["message" => "Record Updated Successfully","status"=>true];
        echo json_encode($arr);
    }else{
        $arr = ["message" => "Record Not Updated","status"=>false];
        echo json_encode($arr);
    }



?>