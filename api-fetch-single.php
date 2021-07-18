<?php
    include_once "config.php";
    
    header("content-type:application/json;charset=UTF-8");
    header("Access-Control-Allow-Methods:GET");
    header("Access-Control-Allow-Origin:*");
    header("Access-Control-Allow-Headers:content-type,Access-Control-Allow-Methods,Access-Control-Allow-Headers,Authorization, X-Requested-With");

    $Jdata = json_decode(file_get_contents("php://input"),true);
    $id = $Jdata['sid'];
    $sql = "SELECT * FROM api_data WHERE id='$id'";
    $result = mysqli_query($conn,$sql);
    if(mysqli_num_rows($result)>0){
        $rows = mysqli_fetch_assoc($result);
        $data = json_encode($rows);
        echo $data;
    }else{
        $arr = ["message" => "No Record Found","status"=>false];
        echo json_encode($arr);
    }



?>