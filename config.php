<?php $conn = mysqli_connect('localhost','root','','php_api')or die(); 

function prx($arr){
    echo '<pre>';
    print_r($arr);
    echo '</pre>';
    die();
}

?>