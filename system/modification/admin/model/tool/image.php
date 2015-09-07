<?php
class ModelToolImage extends Model {
	public function resize($filename, $width, $height) {
		if (!is_file(DIR_IMAGE . $filename)) {
			return;
		}

		$extension = pathinfo($filename, PATHINFO_EXTENSION);

		$old_image = $filename;
		$new_image = 'cache/' . utf8_substr($filename, 0, utf8_strrpos($filename, '.')) . '-' . $width . 'x' . $height . '.' . $extension;

		if (!is_file(DIR_IMAGE . $new_image) || (filectime(DIR_IMAGE . $old_image) > filectime(DIR_IMAGE . $new_image))) {
			$path = '';

			$directories = explode('/', dirname(str_replace('../', '', $new_image)));

			foreach ($directories as $directory) {
				$path = $path . '/' . $directory;

				if (!is_dir(DIR_IMAGE . $path)) {
					@mkdir(DIR_IMAGE . $path, 0777);
				}
			}

			list($width_orig, $height_orig) = getimagesize(DIR_IMAGE . $old_image);

			if ($width_orig != $width || $height_orig != $height) {
				$image = new Image(DIR_IMAGE . $old_image);
				$image->resize($width, $height);
				$image->save(DIR_IMAGE . $new_image);
if($extension == 'svg'){
					$svg = file_get_contents(DIR_IMAGE . $old_image);

					// I prefer to use DOM, because it's safer and easier as to use preg_match
					$svg_dom = new DOMDocument();

					libxml_use_internal_errors(true);
					$svg_dom->loadXML($svg);
					libxml_use_internal_errors(false);

					//get width and height values from your svg
					$tmp_obj = $svg_dom->getElementsByTagName('svg')->item(0);
					$svg_width = floatval($tmp_obj->getAttribute('width'));
					$svg_height = floatval($tmp_obj->getAttribute('height'));

					// set width and height of your svg to preferred dimensions
					$tmp_obj->setAttribute('width', $width);
					$tmp_obj->setAttribute('height', $height);

					// check if width and height of your svg is smaller than the width and 
					// height you set above => no down scaling is needed
					if ($svg_width < $width && $svg_height < $height) {
						//center your svg content in new box
						$x = abs($svg_width - $width) / 2;
						$y = abs($svg_height - $height) / 2;
						$tmp_obj->getElementsByTagName('g')->item(0)->setAttribute('transform', "translate($x,$y)");
					} else {
						// scale down your svg content and center it in new box
						$scale = 1;

						// set padding to 0 if no gaps are desired
						$padding = 2;

						// get scale factor
						if ($svg_width > $svg_height) {
							$scale = ($width - $padding) / $svg_width;
						} else {
							$scale = ($height - $padding) / $svg_height;
						}

						$x = abs(($scale * $svg_width) - $width) / 2;
						$y = abs(($scale * $svg_height) - $height) / 2;
						$tmp_obj->getElementsByTagName('g')->item(0)->setAttribute('transform', "translate($x,$y) scale(1,1)");

						file_put_contents(DIR_IMAGE . $new_image, $svg_dom->saveXML());
					}
				}
			} else {
				copy(DIR_IMAGE . $old_image, DIR_IMAGE . $new_image);
			}
		}

		if ($this->request->server['HTTPS']) {
			return HTTPS_CATALOG . 'image/' . $new_image;
		} else {
			return HTTP_CATALOG . 'image/' . $new_image;
		}
	}
}