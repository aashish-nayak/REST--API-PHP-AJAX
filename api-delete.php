<?php
    include_once "config.php";
    header("content-type:application/json;charset=UTF-8");
    header("Access-Control-Allow-Methods:DELETE");
    header("Access-Control-Allow-Origin:*");
    header("Access-Control-Allow-Headers:content-type,Access-Control-Allow-Methods,Access-Control-Allow-Headers,Authorization, X-Requested-With");

    $Jdata = json_decode(file_get_contents("php://input"),true);
    $id = $Jdata['sid'];
    $sql = "DELETE FROM api_data WHERE id='$id'";
    if(mysqli_query($conn,$sql)){
        $arr = ["message" => "Record Deleted Successfully","status"=>true];
        echo json_encode($arr);
    }else{
        $arr = ["message" => "Record Not Delete ","status"=>false];
        echo json_encode($arr);
    }



?>