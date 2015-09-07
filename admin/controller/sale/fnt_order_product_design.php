<?php
class ControllerSaleFntOrderProductDesign extends Controller
{
    private $error = array();

    public function index(){
		if(isset($this->request->get['order_id']) && isset($this->request->get['order_product_id'])){
			$this->load->language('sale/fnt_order_product_design');
			$this->document->setTitle($this->language->get('heading_title'));
			$data['breadcrumbs'] = array();
			
			$data['breadcrumbs'][] = array(
				'text' => $this->language->get('text_home'),
				'href' => $this->url->link('common/dashboard', 'token=' . $this->session->data['token'], 'SSL')
			);
			$data['breadcrumbs'][] = array(
				'text' => $this->language->get('heading_title_order'),
				'href' => $this->url->link('sale/order/info', 'token=' . $this->session->data['token'] . '&order_id=' . $this->request->get['order_id'], 'SSL')		
			);
			
			$data['breadcrumbs'][] = array(
				'text' => $this->language->get('heading_title'),
				'href' => $this->url->link('sale/fnt_order_product_design', 'token=' . $this->session->data['token'] . '&order_id=' . $this->request->get['order_id']. '&order_product_id=' . $this->request->get['order_product_id'], 'SSL')		
			);
			//Include Css, jquery, google font
			$data['fonts'] = '';
			$this->document->addStyle(HTTP_CATALOG.'catalog/view/javascript/fancy_design/css/jquery.fancyProductDesigner-fonts.css');
			$this->document->addStyle(HTTP_CATALOG.'catalog/view/javascript/fancy_design/css/jquery-ui.css');
			$this->document->addStyle(HTTP_CATALOG.'catalog/view/javascript/fancy_design/css/jquery.fancyProductDesigner.min.css');
			$this->document->addStyle(HTTP_CATALOG.'catalog/view/javascript/fancy_design/css/fancy-product.css');
			$this->document->addStyle('view/javascript/js_fancy/css/icon-font.css');
			$this->document->addStyle('view/javascript/js_fancy/css/admin.css');
			$this->document->addScript(HTTP_CATALOG.'catalog/view/javascript/fancy_design/jquery-ui.min.js');
			$this->document->addScript(HTTP_CATALOG.'catalog/view/javascript/fancy_design/fabric.js');
			$this->document->addScript(HTTP_CATALOG.'catalog/view/javascript/fancy_design/jquery.fancyProductDesigner.min.js');
			$this->document->addScript('view/javascript/js_fancy/js/admin.js');
			$fonts_defaults = array();
			if($this->config->get('fonts_default')){
				$fonts_default = explode(',',$this->config->get('fonts_default'));
			} else {
				$fonts_default = array('Arial','Helvetica','Times New Roman','Verdana','Geneva');
			}
			if($fonts_default){
				foreach ($fonts_default as $font) {
					$fonts_defaults[] = "'" . $font . "'";
				}
			}
			$fonts_googles = array();
			$fonts_google = $this->config->get('fonts');
			if ($fonts_google) {
				foreach ($fonts_google as $font) {
					$str = str_replace(' ', '+', $font);
					$this->document->addLink('http://fonts.googleapis.com/css?family=' . $str, 'stylesheet');
					$fonts_googles[] = "'" . $font . "'";
				}
			} 
			$fonts_directorys = array();
			$fonts_directory = $this->config->get('fonts_woff');
			if ($fonts_directory) {
				foreach ($fonts_directory as $font) {
					$fonts_directorys[] = "'" .  preg_replace("/\\.[^.\\s]{3,4}$/", "", $font) . "'";
				}
			}
			$data['fonts']  = implode(',',array_merge($fonts_defaults,$fonts_googles,$fonts_directorys));
			//Get language
			$data['heading_title'] = $this->language->get('heading_title');
			$data['text_created_pdfs'] = $this->language->get('text_created_pdfs');
			$data['text_export'] = $this->language->get('text_export');
			$data['text_output_file'] = $this->language->get('text_output_file');
			$data['text_pdf'] = $this->language->get('text_pdf');
			$data['text_image'] = $this->language->get('text_image');
			$data['text_image_format'] = $this->language->get('text_image_format');
			$data['text_png'] = $this->language->get('text_png');
			$data['text_jpeg'] = $this->language->get('text_jpeg');
			$data['text_size'] = $this->language->get('text_size');
			$data['text_dpi_converter'] = $this->language->get('text_dpi_converter');
			$data['text_pdf_width_in_mm'] = $this->language->get('text_pdf_width_in_mm');
			$data['text_pdf_height_mm'] = $this->language->get('text_pdf_height_mm');
			$data['text_scale_factor'] = $this->language->get('text_scale_factor');
			$data['text_views'] = $this->language->get('text_views');
			$data['text_all'] = $this->language->get('text_all');
			$data['text_current_showing'] = $this->language->get('text_current_showing');
			$data['text_create'] = $this->language->get('text_create');
			$data['text_single_elements'] = $this->language->get('text_single_elements');
			$data['help_single'] = $this->language->get('help_single');
			$data['text_image_format'] = $this->language->get('text_image_format');
			$data['text_svg'] = $this->language->get('text_svg');
			$data['text_title_svg'] = $this->language->get('text_title_svg');
			$data['help_export_svg'] = $this->language->get('help_export_svg');
			$data['text_use_origin_size'] = $this->language->get('text_use_origin_size');
			$data['text_padding_element'] = $this->language->get('text_padding_element');
			$data['text_all_views'] = $this->language->get('text_all_views');
			$data['text_current_view'] = $this->language->get('text_current_view');
			$data['text_warning_create_image'] = $this->language->get('text_warning_create_image');
			$data['text_error_create_image'] = $this->language->get('text_error_create_image');
			$data['text_error_selected'] = $this->language->get('text_error_selected');
			$data['text_warning_popup_block'] = $this->language->get('text_warning_popup_block');
			$data['text_title_image'] = $this->language->get('text_title_image');
			$data['text_warning_set_width'] = $this->language->get('text_warning_set_width');
			$data['text_warning_message'] = $this->language->get('text_warning_message');
			$data['text_error_create_fancy'] = $this->language->get('text_error_create_fancy');
			$data['text_save_export_server'] = $this->language->get('text_save_export_server');
			$data['text_export_without_bounding'] = $this->language->get('text_export_without_bounding');
			$data['text_image_dpi'] = $this->language->get('text_image_dpi');
			$data['text_added_by_customer'] = $this->language->get('text_added_by_customer');
			$data['text_title_added_by_customer'] = $this->language->get('text_title_added_by_customer');
			$data['text_save_images_on_server'] = $this->language->get('text_save_images_on_server');
			$data['text_export_options'] = $this->language->get('text_export_options');
			$data['text_dpi'] = $this->language->get('text_dpi');
			$data['text_title_save_export_server'] = $this->language->get('text_title_save_export_server');
			
			
			if($this->config->get('config_text_patternable')){
				$data['patternable'] = 1;
				$data['patterns'] = $this->getPatternUrls();
			} else {
				$data['patterns'] = array();
				$data['patternable'] = 0;
			}
			$data['images'] = array();
			$data['order_id'] = $this->request->get['order_id'];
			$data['token'] = $this->session->data['token'];
			$data['domain'] = HTTP_SERVER;
			$data['http_catalog'] = HTTP_CATALOG;
			$data['order_product_id'] = $this->request->get['order_product_id'];
			$this->load->model('sale/order');
			$product_design_info = $this->model_sale_order->getProductOrderDesign($this->request->get['order_id'], $this->request->get['order_product_id']);
			if($product_design_info){
				$data['config_stage_width'] = $product_design_info['stage_width'] ? $product_design_info['stage_width'] : 650;
				$data['config_stage_height'] = $product_design_info['stage_height'] ? $product_design_info['stage_height'] : 650;
				$data['design'] = $product_design_info['design'];
				$data['design'] = html_entity_decode(base64_decode($product_design_info['design']), ENT_QUOTES, 'UTF-8');
				$data['design'] = str_replace('removable":false', 'removable":true', $data['design']);
			} else {
				$data['design'] = '';
			}
			
			$pic_types = array("jpg", "jpeg", "png", "svg");

			$dir = 'design_products_orders/images/' . $this->request->get['order_id'] . '/' . $this->request->get['order_product_id'] . '/';
			$item_dir = DIR_IMAGE . $dir;
			if(file_exists($item_dir)){
				$folder = opendir($item_dir);
				while ($file = readdir($folder) ) {
					if(in_array(substr(strtolower($file), strrpos($file,".") + 1),$pic_types)) {
						$data['images'][] = array(
							'title'  => $file,
							'url'    => HTTP_CATALOG . 'image/' . $dir . $file
						);
					}
				}
				closedir($folder);
			}
			$data['header'] = $this->load->controller('common/header');
			$data['column_left'] = $this->load->controller('common/column_left');
			$data['footer'] = $this->load->controller('common/footer');
			$this->response->setOutput($this->load->view('sale/fnt_order_product_design.tpl', $data));
		}	
    }
	public function createImage(){
		if(isset($this->request->post)){
			if($this->request->post['action'] == 'fpd_imagefromdataurl'){
				$this->createImageByData();
			} else {
				$this->createImageFromSvg();
			} 
		}
	}
	private function getPatternUrls() {
		$urls = array();
		$path = DIR_IMAGE . 'catalog/patterns/';
		$folder = opendir($path);
		$pic_types = array("jpg", "jpeg", "png");
		while ($file = readdir ($folder)) {
		  if(in_array(substr(strtolower($file), strrpos($file,".") + 1),$pic_types)) {
			$urls[] = HTTP_CATALOG . 'catalog/patterns/' . $file;
		  }

		}
		closedir($folder);
		return $urls;
	}
	//creates an image from a data url
	private function createImageByData() {
		if ( !isset($this->request->post['order_id']) || !isset($this->request->post['item_id']) || !isset($this->request->post['data_url']) || !isset($this->request->post['title']) || !isset($this->request->post['format']) )
			exit;
		$json = array();
		$order_id = trim($this->request->post['order_id']);
		$item_id = trim($this->request->post['item_id']);
		$data_url = trim($this->request->post['data_url']);
		$title = trim($this->request->post['title']);
		$format = trim($this->request->post['format']);
		$dpi = isset($this->request->post['dpi']) ? intval($this->request->post['dpi']) : 300;

		//create fancy product orders directory
		if( !file_exists(DIR_IMAGE) )
			mkdir(DIR_IMAGE);

		//create uploads dir
		$images_dir = DIR_IMAGE . 'design_products_orders/';
	
		if( !file_exists($images_dir) )
			mkdir($images_dir);
		$images_dir = DIR_IMAGE . 'design_products_orders/images/';
	
		if( !file_exists($images_dir) )
			mkdir($images_dir);

		//create order dir
		$order_dir = $images_dir . $order_id . '/';
		if( !file_exists($order_dir) )
			mkdir($order_dir);

		//create item dir
		$item_dir = $order_dir . $item_id . '/';
		if( !file_exists($item_dir) )
			mkdir($item_dir);

		$image_path = $item_dir.$title.'.'.$format;

		$image_exist = file_exists($image_path);
		//get the base-64 from data
		$base64_str = substr($data_url, strpos($data_url, ",")+1);
		//decode base64 string
		$decoded = base64_decode($base64_str);
		$result = file_put_contents($image_path, $decoded);
		
		if( $format == 'jpeg' ) {

			require_once(DIR_SYSTEM.'/library/resampler.php');

			$source = imagecreatefromjpeg($image_path);
			list($width, $height) = getimagesize($image_path);
			$resampler = new Resampler;
			$im = $resampler->resample($source, $height, $width, $format, $dpi);
			file_put_contents($image_path, $im);

		}
		if($result){
			$image_url = str_replace(DIR_IMAGE,HTTP_CATALOG . 'image/',$image_path);
			$json['code'] = $image_exist ? 302 : 201; 
			$json['url'] = $image_url;
			$json['title'] = $title;
			$this->response->setOutput(json_encode($json));
		}else {
			$json['code'] = 500;
			
			$this->response->setOutput(json_encode($json));
		}
		
	}
	
	public function createImageFromSvg() {
		if ( !isset($this->request->post['order_id']) || !isset($this->request->post['item_id']) || !isset($this->request->post['svg']) || !isset($this->request->post['title']) )
			exit;
		require_once(DIR_SYSTEM.'library/svglib/svglib.php');
		$order_id = trim($this->request->post['order_id']);
		$item_id = trim($this->request->post['item_id']);
		$svg = stripslashes(trim($this->request->post['svg']));
		$width = trim($this->request->post['width']);
		$height = trim($this->request->post['height']);
		$title = trim($this->request->post['title']);

		//create fancy product orders directory
		if( !file_exists(DIR_IMAGE) )
			mkdir(DIR_IMAGE);

		//create uploads dir
		$images_dir = DIR_IMAGE . 'design_products_orders/';
	
		if( !file_exists($images_dir) )
			mkdir($images_dir);
		$images_dir = DIR_IMAGE . 'design_products_orders/images/';
	
		if( !file_exists($images_dir) )
			mkdir($images_dir);

		//create order dir
		$order_dir = $images_dir . $order_id . '/';
		if( !file_exists($order_dir) )
			mkdir($order_dir);

		//create item dir
		$item_dir = $order_dir . $item_id . '/';
		if( !file_exists($item_dir) )
			mkdir($item_dir);

		$image_path = $item_dir.$title.'.svg';

		$image_exist = file_exists($image_path);

		header('Content-Type: application/json');

		try {
			$svg = '<?xml version="1.0" encoding="UTF-8" standalone="no" ?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
			<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="'.$width.'" height="'.$height.'" xml:space="preserve">'.$svg.'</svg>';
			$svg_doc = new SVGDocument(html_entity_decode($svg, ENT_QUOTES, 'UTF-8'));
			$svg_doc->asXML($image_path);
			$image_url = str_replace(DIR_IMAGE,HTTP_CATALOG . 'image/',$image_path);
			$this->response->setOutput(json_encode(array('code' => $image_exist ? 302 : 201, 'url' => $image_url, 'title' => $title)));
		}
		catch(Exception $e) {
			$this->response->setOutput(json_encode(array('code' => 500)));
		}
	}
	public function createPdfFromDataUrl() {
		
		if ( !isset($this->request->post['order_id']) || !isset($this->request->post['data_strings']) )
			exit;
		if( !class_exists('TCPDF') ) {
			require_once(DIR_SYSTEM.'library/tcpdf/tcpdf.php');
		}
		$order_id = trim($this->request->post['order_id']);
		$item_id = trim($this->request->post['item_id']);
		//if memory limit is too small, a fatal php error will thrown here
		$data_strings = $this->request->post['data_strings'];
		
		$width = trim($this->request->post['width']);
		$height = trim($this->request->post['height']);
		$image_format = trim($this->request->post['image_format']);
		$orientation = trim($this->request->post['orientation']);
		$dpi = isset($this->request->post['dpi']) ? intval($this->request->post['dpi']) : 300;

		//create fancy product orders directory
		if( !file_exists(DIR_IMAGE . 'design_products_orders/') )
			mkdir(DIR_IMAGE . 'design_products_orders/');

		//create pdf dir
		$pdf_dir = DIR_IMAGE . 'design_products_orders/pdfs/';
		if( !file_exists($pdf_dir) )
			mkdir($pdf_dir);

		$pdf_path = $pdf_dir.$order_id.'-'.$item_id.'.pdf';
		$this->pdf = new TCPDF($orientation, 'mm', array($width, $height), true, 'UTF-8', false);
	
		// set document information
		$this->pdf->SetCreator(-1);
		$this->pdf->SetTitle($order_id);

		// remove default header/footer
		$this->pdf->setPrintHeader(false);
		$this->pdf->setPrintFooter(false);
		foreach($data_strings as $data_str) {
			$this->pdf->AddPage();
			
			if( $image_format == 'svg' ) {
				if( !class_exists('SVGDocument') )
					require_once(DIR_SYSTEM.'library/svglib/svglib.php');

				//$svg_doc = new SVGDocument($svg_data);
				//$svg_doc->asXML($svg_path);
				$this->pdf->ImageSVG('@'.$data_str);
			}
			else {
				$data_str = base64_decode(substr($data_str, strpos($data_str, ",") + 1));
				$this->pdf->Image('@'.$data_str,'', '', 0, 0, '', '', '', false, $dpi);
			}
		}
		$this->pdf->Output($pdf_path, 'F');

		$pdf_url = str_replace(DIR_IMAGE,HTTP_CATALOG . 'image/',$pdf_path);
		$this->response->setOutput(json_encode( array('code' => 201, 'url' => $pdf_url)));
	}
}