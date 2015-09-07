<?php

//Returns the data url of an image

$url = trim($_POST['url']);

if(!function_exists('getimagesize')) {
	echo json_encode(array('error' => 'The php function getimagesize is not installed on your server. Please contact your server provider!'));
	die;
}

if(!function_exists('file_get_contents')) {
	echo json_encode(array('error' => 'The php function file_get_contents is not installed on your server. Please contact your server provider!'));
	die;
}


$info = getimagesize($url);
$data_url =  'data: '.$info['mime'].';base64,'.base64_encode(file_get_contents($url));
echo json_encode(array( 'data_url' => $data_url));

?>