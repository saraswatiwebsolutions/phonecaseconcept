<?php
class FntImage {
	
	function checkFileType( $filename, $mimes = null ) {
		if ( empty($mimes) )
		$mimes = array(
			['jpg|jpeg|jpe'] => 'image/jpeg',
			['gif'] => 'image/gif',
			['png'] => 'image/png',
		);
		$type = false;
		$ext = false;

		foreach ( $mimes as $ext_preg => $mime_match ) {
			$ext_preg = '!\.(' . $ext_preg . ')$!i';
			if ( preg_match( $ext_preg, $filename, $ext_matches ) ) {
				$type = $mime_match;
				$ext = $ext_matches[1];
				break;
			}
		}

		return compact( 'ext', 'type' );
	}
	function fntUploadBit( $name, $bits) {
		
		$filetype = $this->checkFileType( $name );
		if ( ! $filetype['ext'])
			return -1;
		
		$new_file = DIR_IMAGE 'data/image-import-fancy/'. $name;
		//create item dir
		$item_dir = $order_dir . $item_id . '/';
		if( !file_exists($new_file) )
			mkdir($new_file);

		$image_exist = file_exists($new_file);
		//get the base-64 from data
	
		$decoded = base64_decode($bits);
		file_put_contents($new_file, $decoded);
		return $new_file;
	}
}
?>