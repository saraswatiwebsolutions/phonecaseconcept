<?php
class ControllerProductFntProductDesign extends Controller
{
    private $error = array();
    

    
    public function index(){
       
        
        $this->load->language('product/fnt_product_design');
        $data['breadcrumbs'] = array();
		$data['breadcrumbs'][] = array(
			'text' => $this->language->get('text_home'),
			'href' => $this->url->link('common/home')
		);
        $this->load->model('catalog/fnt_product_design');
        $this->load->model('catalog/product');
        $this->load->model('catalog/fnt_clipart');
        $this->load->model('tool/image');
        $data['domain'] = HTTP_SERVER;
        //Load product design by category design.
        $this->document->addStyle('catalog/view/javascript/fancy_design/css/jquery.fancyProductDesigner-fonts.css');
        $this->document->addStyle('catalog/view/javascript/fancy_design/css/jquery-ui.css');
        $this->document->addStyle('catalog/view/javascript/fancy_design/css/jquery.fancyProductDesigner.min.css');
        $this->document->addStyle('catalog/view/javascript/fancy_design/css/fancy-product.css');
        $this->document->addScript('catalog/view/javascript/fancy_design/jquery-ui.min.js');
        $this->document->addScript('catalog/view/javascript/fancy_design/fabric.js');
        $this->document->addScript('catalog/view/javascript/fancy_design/jquery.fancyProductDesigner.min.js');
        $data['config_view_tooltip'] = ($this->config->get('config_designs_view_tooltip'))?1:0;
		$this->document->addScript('catalog/view/javascript/jquery/datetimepicker/moment.js');
		$this->document->addScript('catalog/view/javascript/jquery/datetimepicker/bootstrap-datetimepicker.min.js');
		$this->document->addStyle('catalog/view/javascript/jquery/datetimepicker/bootstrap-datetimepicker.min.css');
        $data['heading_title'] = '';
        $data['text_order']      = $this->language->get('text_order');
        /*Upgrade version V2.1.x*/
		$data['text_tax']      = $this->language->get('text_tax');
        $data['text_discount']      = $this->language->get('text_discount');
        $data['text_option']   = $this->language->get('text_option');
        $data['text_loading']  = $this->language->get('text_loading');
        $data['text_select']   = $this->language->get('text_select');
        
        $data['entry_qty']     = $this->language->get('entry_qty');
        $data['entry_name']    = $this->language->get('entry_name');
        $data['entry_review']  = $this->language->get('entry_review');
      
        $data['button_cart']     = $this->language->get('button_cart');
        $data['button_upload']   = $this->language->get('button_upload');
        //define text default
		$data['text_align_left']                      = $this->language->get('text_align_left');
        $data['text_align_center']                    = $this->language->get('text_align_center');
        $data['text_align_right']                     = $this->language->get('text_align_right');
        $data['text_bold']                            = $this->language->get('text_bold');
        $data['text_italic']                          = $this->language->get('text_italic');
        $data['text_curved_text_spacing']             = $this->language->get('text_curved_text_spacing');
        $data['text_curved_text_radius']              = $this->language->get('text_curved_text_radius');
        $data['text_curved_text_reverse']             = $this->language->get('text_curved_text_reverse');
        $data['text_center_h']                        = $this->language->get('text_center_h');
        $data['text_center_v']                        = $this->language->get('text_center_v');
        $data['text_fb_select_album']                 = $this->language->get('text_fb_select_album');
        $data['text_insta_feed_button']               = $this->language->get('text_insta_feed_button');
        $data['text_insta_recent_image_button']       = $this->language->get('text_insta_recent_image_button');
		$data['text_alert'] = $this->language->get('text_alert');
		$data['text_center'] = $this->language->get('text_center');
		$data['text_left'] = $this->language->get('text_left');
		$data['text_manage_layer'] = $this->language->get('text_manage_layer');
		$data['text_add'] = $this->language->get('text_add');
		$data['text_change_product'] = $this->language->get('text_change_product');
		$data['text_action'] = $this->language->get('text_action');
		$data['text_download_pdf'] = $this->language->get('text_download_pdf');
		$data['text_download_image'] = $this->language->get('text_download_image');
		$data['text_print'] = $this->language->get('text_print');
		$data['text_save'] = $this->language->get('text_save');
		$data['text_load'] = $this->language->get('text_load');
		$data['text_undo'] = $this->language->get('text_undo');
		$data['text_redo'] = $this->language->get('text_redo');
		$data['text_reset_product'] = $this->language->get('text_reset_product');
		$data['text_zoom'] = $this->language->get('text_zoom');
		$data['text_pan'] = $this->language->get('text_pan');
		$data['text_add_image'] = $this->language->get('text_add_image');
		$data['text_add_text'] = $this->language->get('text_add_text');
		$data['text_enter_text'] = $this->language->get('text_enter_text');
		$data['text_add_photo_fb'] = $this->language->get('text_add_photo_fb');
		$data['text_add_photo_instagram'] = $this->language->get('text_add_photo_instagram');
		$data['text_choose_design'] = $this->language->get('text_choose_design');
		$data['text_edit_element'] = $this->language->get('text_edit_element');
		$data['text_fill_option'] = $this->language->get('text_fill_option');
		$data['text_color'] = $this->language->get('text_color');
		$data['text_pattern'] = $this->language->get('text_pattern');
		$data['text_opacity'] = $this->language->get('text_opacity');
		$data['text_filter'] = $this->language->get('text_filter');
		$data['text_text_option'] = $this->language->get('text_text_option');
		$data['text_change_text'] = $this->language->get('text_change_text');
		$data['text_typeface'] = $this->language->get('text_typeface');
		$data['text_line_height'] = $this->language->get('text_line_height');
		$data['text_alignment'] = $this->language->get('text_alignment');
		$data['text_styling'] = $this->language->get('text_styling');
		$data['text_bold'] = $this->language->get('text_bold');
		$data['text_italic'] = $this->language->get('text_italic');
		$data['text_underline'] = $this->language->get('text_underline');
		$data['text_curved_text'] = $this->language->get('text_cuvered_text');
		$data['text_angle'] = $this->language->get('text_angle');
		$data['text_scale'] = $this->language->get('text_scale');
		$data['text_transform'] = $this->language->get('text_transform');
		$data['text_flip_horizontal'] = $this->language->get('text_flip_horizontal');
		$data['text_flip_vertical'] = $this->language->get('text_flip_vertical');
		$data['text_reset_element'] = $this->language->get('text_reset_element');
		$data['text_product_save'] = $this->language->get('text_product_save');
		$data['text_lock'] = $this->language->get('text_lock');
		$data['text_unlock'] = $this->language->get('text_unlock');
		$data['text_remove'] = $this->language->get('text_remove');
		$data['text_alert_containment'] = $this->language->get('text_alert_containment');
		$data['text_init_text'] = $this->language->get('text_init_text');
		$data['text_uploaded_img'] = $this->language->get('text_uploaded_img');
		$data['text_alert_upload_size'] = $this->language->get('text_alert_upload_size');
		$data['text_alert_product_not_created'] = $this->language->get('text_alert_product_not_created');
		
		
        //Get setting config
        $data['config_designs_parameter_x']           = $this->config->get('config_designs_parameter_x') ? $this->config->get('config_designs_parameter_x') : 0;
        $data['config_designs_parameter_y']           = $this->config->get('config_designs_parameter_y') ? $this->config->get('config_designs_parameter_y') : 0;
        $data['config_designs_parameter_z']           = $this->config->get('config_designs_parameter_z') ? $this->config->get('config_designs_parameter_z') : -1;
        $data['config_designs_parameter_price']       = $this->config->get('config_designs_parameter_price') ? $this->config->get('config_designs_parameter_price') : 0;
        $data['config_designs_parameter_colors']      = $this->config->get('config_designs_parameter_colors') ? $this->config->get('config_designs_parameter_colors') : '#000000';
        $data['config_designs_parameter_auto_center'] = $this->config->get('config_designs_parameter_auto_center') ? $this->config->get('config_designs_parameter_auto_center') : 0;
        $data['config_designs_parameter_draggable']   = $this->config->get('config_designs_parameter_draggable') ? $this->config->get('config_designs_parameter_draggable') : 0;
        $data['config_designs_parameter_rotatable']   = $this->config->get('config_designs_parameter_rotatable') ? $this->config->get('config_designs_parameter_rotatable') : 0;
        $data['config_designs_parameter_resizable']   = $this->config->get('config_designs_parameter_resizable') ? $this->config->get('config_designs_parameter_resizable') : 0;
        $data['config_designs_parameter_zchangeable'] = $this->config->get('config_designs_parameter_zchangeable') ? $this->config->get('config_designs_parameter_zchangeable') : 0;
        $data['config_designs_parameter_replace']     = $this->config->get('config_designs_parameter_replace') ? 'image' : '';
        $data['config_designs_parameter_autoselect']  = $this->config->get('config_designs_parameter_autoselect') ? $this->config->get('config_designs_parameter_autoselect') : 0;
		$data['config_designs_topped']  = $this->config->get('config_designs_topped') ? $this->config->get('config_designs_topped') : 0;
		if ($this->config->get('config_designs_parameter_bounding_box')) {
			if ($this->config->get('config_designs_bounding_box_target')) {
				$data['config_designs_parameter_aboundingbox'] = $this->config->get('config_designs_bounding_box_target') ? '"' . $this->config->get('config_designs_bounding_box_target') . '"' : '';
			} elseif ($this->config->get('config_designs_bounding_box_x') != '' && $this->config->get('config_designs_bounding_box_y') != '' && $this->config->get('config_designs_bounding_box_width') != '' && $this->config->get('config_designs_bounding_box_height') != '') {
				$data['config_designs_parameter_aboundingbox'] = '{ "x":' . $this->config->get('config_designs_bounding_box_x') . ', "y":' . $this->config->get('config_designs_bounding_box_y') . ', "width":' . $this->config->get('config_designs_bounding_box_width') . ', "height":' . $this->config->get('config_designs_bounding_box_height') . '}';
			} else {
				$data['config_designs_parameter_aboundingbox'] = '""';
			}
		} else {
				$data['config_designs_parameter_aboundingbox'] = '""';
		}	
        $data['config_designs_parameter_clipping'] = $this->config->get('config_designs_parameter_clipping') ? $this->config->get('config_designs_parameter_clipping') : 0;
        $data['config_min_width']                  = $this->config->get('config_designs_min_width') ? $this->config->get('config_designs_min_width') : 100;
        $data['config_min_height']                 = $this->config->get('config_designs_min_height') ? $this->config->get('config_designs_min_height') : 100;
        $data['config_max_width']                  = $this->config->get('config_designs_max_width') ? $this->config->get('config_designs_max_width') : 1000;
        $data['config_max_height']                 = $this->config->get('config_designs_max_height') ? $this->config->get('config_designs_max_height') : 1000;
        $data['config_resize_width']               = $this->config->get('config_designs_resize_width') ? $this->config->get('config_designs_resize_width') : 300;
        $data['config_resize_height']              = $this->config->get('config_designs_resize_height') ? $this->config->get('config_designs_resize_height') : 300;
        
        $data['config_upload_designs']         = $this->config->get('config_designs_upload_designs') ? 1 : 0;
        $data['config_upload_text']            = $this->config->get('config_designs_upload_text') ? 1 : 0;
        $data['config_download_image']         = $this->config->get('config_designs_download_image') ? 1 : 0;
        $data['config_pdf_button']             = $this->config->get('config_designs_pdf_button') ? 1 : 0;
        $data['config_print_button']           = $this->config->get('config_designs_print_button') ? 1 : 0;
        $data['config_allow_product_saving']   = $this->config->get('config_designs_allow_product_saving') ? 1 : 0;
        $data['config_reset_table']            = $this->config->get('config_designs_reset_table') ? 1 : 0;
        $data['config_font_dropdown']          = $this->config->get('config_designs_font_dropdown') ? 1 : 0;
        $data['config_facebook_app_id']        = $this->config->get('config_designs_facebook_app_id') ? $this->config->get('config_designs_facebook_app_id') : '';
        $data['config_instagram_client_id']    = $this->config->get('config_designs_instagram_client_id') ? $this->config->get('config_designs_instagram_client_id') : '';
        $data['config_instagram_redirect_uri'] = HTTP_SERVER .'catalog/controller/fancy_design/php/instagram_auth.php';;
        $data['config_view_selection_float']   = $this->config->get('config_designs_view_selection_float') ? 1 : 0;
        $data['config_show_popup_view']        = $this->config->get('config_designs_show_popup_view') ? 1 : 0;
        $data['config_zoom']                   = $this->config->get('config_designs_zoom') ? $this->config->get('config_designs_zoom') : 1.2;
        $data['config_zoom_min']               = $this->config->get('config_designs_zoom_min') ? $this->config->get('config_designs_zoom_min') : 0.2;
        $data['config_zoom_max']               = $this->config->get('config_designs_zoom_max') ? $this->config->get('config_designs_zoom_max') : 2;
        $data['config_text_text_default']      = $this->config->get('config_designs_text_text_default') ? $this->config->get('config_designs_text_text_default') : 'Double-click to change text';
        $data['config_tooltip']                = $this->config->get('config_designs_tooltip') ? $this->config->get('config_designs_tooltip') : 0;	
		if($this->config->get('config_designs_text_patternable')){
			$data['patternable'] = 1;
			$data['patterns'] = $this->getPatternUrls();
		} else {
			$data['patterns'] = array();
			$data['patternable'] = 0;
		}
        $data['config_color_sidebar']          = $this->config->get('config_designs_color_sidebar') ? $this->config->get('config_designs_color_sidebar') : '#2c3e50';
        $data['config_color_icon']             = $this->config->get('config_designs_color_icon') ? $this->config->get('config_designs_color_icon') : '#f6f6f6';
        $data['config_selected_color']         = $this->config->get('config_designs_selected_color') ? $this->config->get('config_designs_selected_color') : '#d5d5d5';
        $data['config_bounding_color']         = $this->config->get('config_designs_bounding_color') ? $this->config->get('config_designs_bounding_color') : '#005ede';
        $data['config_out_boundary_color']     = $this->config->get('config_designs_out_boundary_color') ? $this->config->get('config_designs_out_boundary_color') : '#990000';
        $data['config_default_text_size']      = $this->config->get('config_designs_default_text_size') ? $this->config->get('config_designs_default_text_size') : 12;
        $data['config_text_x_position']        = $this->config->get('config_designs_text_x_position') ? $this->config->get('config_designs_text_x_position') : 0;
        $data['config_text_y_position']        = $this->config->get('config_designs_text_y_position') ? $this->config->get('config_designs_text_y_position') : 0;
        $data['config_text_z_position']        = $this->config->get('config_designs_text_z_position') ? $this->config->get('config_designs_text_z_position') : -1;
        $data['config_text_design_color']      = $this->config->get('config_designs_text_design_color') ? $this->config->get('config_designs_text_design_color') : '#000000';
        $data['config_text_design_price']      = $this->config->get('config_designs_text_design_price') ? $this->config->get('config_designs_text_design_price') : 0;
        $data['config_text_auto_center']       = $this->config->get('config_designs_text_auto_center') ? $this->config->get('config_designs_text_auto_center') : 0;
        $data['config_text_draggable']         = $this->config->get('config_designs_text_draggable') ? $this->config->get('config_designs_text_draggable') : 0;
        $data['config_text_rotatable']         = $this->config->get('config_designs_text_rotatable') ? $this->config->get('config_designs_text_rotatable') : 0;
        $data['config_text_resizeable']        = $this->config->get('config_designs_text_resizeable') ? $this->config->get('config_designs_text_resizeable') : 0;
        $data['config_text_zchangeable']       = $this->config->get('config_designs_text_zchangeable') ? $this->config->get('config_designs_text_zchangeable') : 0;
        $data['config_text_autoselected']      = $this->config->get('config_designs_text_autoselected') ? $this->config->get('config_designs_text_autoselected') : 0;
        $data['config_default_text_size']      = $this->config->get('config_designs_default_text_size') ? $this->config->get('config_designs_default_text_size') : 12;
        $data['config_text_text_characters']   = $this->config->get('config_designs_text_text_characters') ? $this->config->get('config_designs_text_text_characters') : 0;
        $data['config_text_curved']            = $this->config->get('config_designs_text_curved') ? $this->config->get('config_designs_text_curved') : 0;
        $data['config_text_replace']           = $this->config->get('config_designs_text_replace') ? $this->config->get('config_designs_text_replace') : '';
        $data['config_curved_spacing']         = $this->config->get('config_designs_curved_spacing') ? $this->config->get('config_designs_curved_spacing') : 10;
        $data['config_curve_radius']         = $this->config->get('config_designs_curve_radius') ? $this->config->get('config_designs_curve_radius') : 80;
        $data['config_curve_reverse']         = $this->config->get('config_designs_curve_reverse') ? $this->config->get('config_designs_curve_reverse') : 0;
        $data['config_text_topped']         = $this->config->get('config_designs_text_topped') ? $this->config->get('config_designs_text_topped') : 0;
        $data['frame_shadow'] = $this->config->get('config_designs_frame_shadow') ? $this->config->get('config_designs_frame_shadow') : 'fpd-shadow-1';
		if ($this->config->get('config_designs_text_bounding_box')) {
			if ($this->config->get('config_designs_text_bounding_box_target')) {
				$data['config_designs_text_aboundingbox'] = $this->config->get('config_designs_text_bounding_box_target') ? '"' . $this->config->get('config_designs_text_bounding_box_target') . '"' : '';
			} elseif ($this->config->get('config_designs_text_bounding_x_position') != '' && $this->config->get('config_designs_text_bounding_y_position') != '' && $this->config->get('config_designs_text_bounding_width') != '' && $this->config->get('config_designs_text_bounding_height') != '') {
				$data['config_designs_text_aboundingbox'] = '{ "x":' . $this->config->get('config_designs_text_bounding_x_position') . ', "y":' . $this->config->get('config_designs_text_bounding_y_position') . ', "width":' . $this->config->get('config_designs_text_bounding_width') . ', "height":' . $this->config->get('config_designs_text_bounding_height') . '}';
			} else {
				$data['config_designs_text_aboundingbox'] = '';
			}
		} else {
				$data['config_designs_text_aboundingbox'] = '';
		}	
        $data['config_designs_text_clipping']     = $this->config->get('config_designs_text_clipping') ? $this->config->get('config_designs_text_clipping') : 0;
        $data['config_stage_width']               = $this->config->get('config_designs_stage_width') ? $this->config->get('config_designs_stage_width') : 650;
        $data['config_stage_height']              = $this->config->get('config_designs_stage_height') ? $this->config->get('config_designs_stage_height') : 550;
        $data['config_padding_controls']          = $this->config->get('config_designs_padding_controls') ? $this->config->get('config_designs_padding_controls') : 7;
        $data['replace_initial_elements']  = $this->config->get('config_designs_replace_initial_elements') ? 1 : 0;
		$data['hide_smartphones'] = $this->config->get('config_designs_disable_on_smartphones');
		$data['hide_tablets'] = $this->config->get('config_designs_disable_on_tablets');
		$data['text_color_prices'] = $this->config->get('config_designs_enable_text_color_prices');
		$data['image_color_prices'] = $this->config->get('config_designs_enable_image_color_prices');
		$data['color_prices'] = $this->getColorPrices($this->config->get('config_designs_color_prices'));
		$data_filter = $this->config->get('config_designs_filters');
		if($data_filter){
			$data['filters'] =  '"' . implode('","',$data_filter) . '"';
		} else {
			$data['filters'] =  '';
		}
		
		if($this->config->get('config_designs_view_selection_position')){
			$data['view_selection_position'] =  $this->config->get('config_designs_view_selection_position');
		} else {
			$data['view_selection_position'] =  'tr';
		}
		
		if($this->config->get('config_designs_custom_texts_parameter_textalign')){
			$data['texts_parameter_textalign'] =  $this->config->get('config_designs_custom_texts_parameter_textalign');
		} else {
			$data['texts_parameter_textalign'] =  'left';
		}
		/*Get configure color background*/
		$data['config_designer_primary_color'] =  $this->config->get('config_designs_designer_primary_color');
		$data['config_designer_secondary_color'] =  $this->config->get('config_designs_designer_secondary_color');
		$data['config_designer_primary_text_color'] =  $this->config->get('config_designs_designer_primary_text_color');
		$data['config_designer_secondary_text_color'] =  $this->config->get('config_designs_designer_secondary_text_color');
		$data['config_selected_color'] =  $this->config->get('config_designs_selected_color');
		$data['config_bounding_box_color'] =  $this->config->get('config_designs_bounding_box_color');
		$data['config_out_of_boundary_color'] =  $this->config->get('config_designs_out_of_boundary_color');
		$data['custom_adds'] = ' {} ';
		/*Get configure fonts*/
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
        //Get list Clipart
        $data['cliparts']           = array();
        $data['products']           = array();
        $data['currency_value']     = round($this->currency->getValue(), (int) $this->currency->getDecimalPlace());
        $data['currency']           = $this->currency->getCode();
		if($this->currency->getSymbolLeft()){
			$data['curency_code']  = $this->currency->getSymbolLeft();
			$data['currency_pos']  = 'left';
			
		} else {
			$data['curency_code']  = $this->currency->getSymbolRight();
			$data['currency_pos']  = 'right';
		}
        $data['decimal_place']      = $this->currency->getDecimalPlace();
		 $product_id = 0;
        //Case exist $this->request->get['product_id']
        if (isset($this->request->get['product'])) {
            $product_id = (int) $this->request->get['product'];
        }
      //Case edit design form session cart
        if (isset($this->request->get['key'])) {
            if (isset($this->session->data['cart-design'][$this->request->get['key']])) {
                $data['design'] = html_entity_decode(base64_decode($this->session->data['cart-design'][$this->request->get['key']]['product']), ENT_QUOTES, 'UTF-8');
				$product_id = $this->session->data['cart-design'][$this->request->get['key']]['product_id'];
            } 
        }
        //Case edit design form order
        if (isset($this->request->get['order_id']) && isset($this->request->get['order_product_id']) && isset($this->request->get['product'])) {
            $this->load->model('account/order');
            $order_product_info = $this->model_account_order->getProductOrderDesign($this->request->get['order_id'], $this->request->get['order_product_id']);
			if ($order_product_info) {
                $data['design'] = html_entity_decode(base64_decode($order_product_info['design']), ENT_QUOTES, 'UTF-8');
                $product_id    = $this->request->get['product'];
            }
        }
		if($product_id){
			$data['product_id'] = $product_id;
			$product_info = $this->model_catalog_product->getProduct($product_id);
			if ($product_info) {
				$this->document->setTitle($product_info['name']);
				$data['breadcrumbs'][] = array(
					'text' => $product_info['name'],
					'href' => $this->url->link('product/fnt_product_design','product=' . $product_id)
				);	
				$data['heading_title'] = $product_info['name'];
				$this->document->setDescription($product_info['meta_description']);
				$this->document->setKeywords($product_info['meta_keyword']);
				if ($product_info['minimum']) {
					$data['minimum'] = $product_info['minimum'];
				} else {
					$data['minimum'] = 1;
				}
				
				if ($product_info['special']) {
					$data['price'] = $product_info['special'];
				} else {
					$data['price'] = $product_info['price'];
				}
				$discounts = $this->model_catalog_product->getProductDiscounts($product_id);

				$data['discounts'] = array();

				foreach ($discounts as $discount) {
					$data['discounts'][] = array(
						'quantity' => $discount['quantity'],
						'price'    => $this->currency->format($this->tax->calculate($discount['price'], $product_info['tax_class_id'], $this->config->get('config_tax')))
					);
				}
				$data['options'] = array();
				foreach ($this->model_catalog_product->getProductOptions($product_id) as $option) {
					$product_option_value_data = array();
					foreach ($option['product_option_value'] as $option_value) {
						if (!$option_value['subtract'] || ($option_value['quantity'] > 0)) {
							if ((($this->config->get('config_customer_price') && $this->customer->isLogged()) || !$this->config->get('config_customer_price')) && (float)$option_value['price']) {
								$price = $this->currency->format($this->tax->calculate($option_value['price'], $product_info['tax_class_id'], $this->config->get('config_tax') ? 'P' : false));
							} else {
								$price = false;
							}

							$product_option_value_data[] = array(
								'product_option_value_id' => $option_value['product_option_value_id'],
								'option_value_id'         => $option_value['option_value_id'],
								'name'                    => $option_value['name'],
								'image'                   => $this->model_tool_image->resize($option_value['image'], 50, 50),
								'price'                   => $price,
								'price_prefix'            => $option_value['price_prefix']
							);
						}
					}

					$data['options'][] = array(
						'product_option_id'    => $option['product_option_id'],
						'product_option_value' => $product_option_value_data,
						'option_id'            => $option['option_id'],
						'name'                 => $option['name'],
						'type'                 => $option['type'],
						'value'                => $option['value'],
						'required'             => $option['required']
					);
				} 
				
				/*Get configure product design*/
				$parameters = $this->model_catalog_fnt_product_design->getSettingParameters($product_id);
				if($parameters){
					$parameters = unserialize($parameters['parameters']);
					$data['config_designs_parameter_price'] = (int)$parameters['designs_parameter_price'];
					if($parameters['background_type'] == 'image'){
						if($parameters['image']){
							$data['image_background'] = HTTP_SERVER . 'image/' . $parameters['image'];
						}
					} else if($parameters['background_type'] == 'color'){
						$data['color_background'] = $parameters['background_color'];
					}
					
					$data['custom_adds'] = ' {';

					if( isset($parameters['hide_custom_image_upload']) ) {
						$data['custom_adds'] .= '"uploads": 0,';
					} else {
						$data['custom_adds'] .= '"uploads": '. $data['config_upload_designs'] . ',';
					}

					if( isset($parameters['hide_custom_text']) ) {
						$data['custom_adds'] .= '"texts": 0,';
					} else {
						$data['custom_adds'] .= '"texts": '. $data['config_upload_text'] . ',';
					}

					if( isset($parameters['hide_facebook_tab']) ) {
						$data['custom_adds'] .= '"facebook": 0,';
					} else {
						$data['custom_adds'] .= '"facebook": 1,';
					}

					if( isset($parameters['hide_instagram_tab']) ) {
						$data['custom_adds'] .= '"instagram": 0,';
					} else {
						$data['custom_adds'] .= '"instagram": 1,';
					}

					if( isset($parameters['disable_designs']) ) {
						$data['custom_adds'] .= '"designs": false,';
					}

					$data['custom_adds'] = trim($data['custom_adds'], ',');
					$data['custom_adds'] .= '}';
				
					if(isset($parameters['hide_designs_tab'])){
						$data['hide_designs_tab'] = 1;
						
					}
					if ($parameters['designs_parameter_bounding_box_control'] == 1) {
						if ($parameters['designs_parameter_bounding_box_x'] != '' && $parameters['designs_parameter_bounding_box_y'] != '' && $parameters['designs_parameter_bounding_box_width'] != '' && $parameters['designs_parameter_bounding_box_height'] != '') {
							$data['config_designs_parameter_aboundingbox'] = '{ "x":' . $parameters['designs_parameter_bounding_box_x'] . ', "y":' . $parameters['designs_parameter_bounding_box_y'] . ', "width":' . $parameters['designs_parameter_bounding_box_width'] . ', "height":' . $parameters['designs_parameter_bounding_box_height'] . '}';
						}
					} elseif($parameters['designs_parameter_bounding_box_control'] == 2){
						$data['config_designs_parameter_aboundingbox'] = '"' . $parameters['designs_parameter_bounding_box_by_other'] . '"';
					}
					$data['config_min_width'] = $parameters['uploaded_designs_parameter_minW'] ? $parameters['uploaded_designs_parameter_minW'] : $data['config_min_width'];
					$data['config_min_height'] = $parameters['uploaded_designs_parameter_minH'] ? $parameters['uploaded_designs_parameter_minH'] : $data['config_min_height'];
					$data['config_max_width'] = $parameters['uploaded_designs_parameter_maxW'] ? $parameters['uploaded_designs_parameter_maxW'] : $data['config_max_width'];
					$data['config_max_height'] = $parameters['uploaded_designs_parameter_maxH'] ? $parameters['uploaded_designs_parameter_maxH'] : $data['config_max_height'];
					$data['config_resize_width'] = $parameters['uploaded_designs_parameter_resizeToW'] ? $parameters['uploaded_designs_parameter_resizeToW'] : $data['config_resize_width'];
					$data['config_resize_height'] = $parameters['uploaded_designs_parameter_resizeToH'] ? $parameters['uploaded_designs_parameter_resizeToH'] : $data['config_resize_height'];
					
					$data['config_upload_designs'] = (isset($parameters['hide_custom_image_upload'])) ? 0 : $data['config_upload_designs'];
					$data['config_upload_text'] = (isset($parameters['hide_custom_text'])) ? 0 : $data['config_upload_text'];
					$data['config_view_selection_float'] = (isset($parameters['view_selection_floated'])) ? 1 : 0;
					$data['config_text_text_default'] = $parameters['default_text'] ? $parameters['default_text'] : $data['config_text_text_default'];
					$data['config_text_design_color'] = $parameters['custom_texts_parameter_colors'] ? $parameters['custom_texts_parameter_colors'] : $data['config_text_design_color'];
					$data['config_text_design_price'] = $parameters['custom_texts_parameter_price'] ? $parameters['custom_texts_parameter_price'] : 0;
					if ($parameters['custom_texts_parameter_bounding_box_control'] == 1) {
						if ($parameters['custom_texts_parameter_bounding_box_x'] != '' && $parameters['custom_texts_parameter_bounding_box_y'] != '' && $parameters['custom_texts_parameter_bounding_box_width'] != '' && $parameters['custom_texts_parameter_bounding_box_height'] != '') {
							$data['config_designs_text_aboundingbox'] = '{ "x":' . $parameters['custom_texts_parameter_bounding_box_x'] . ', "y":' . $parameters['custom_texts_parameter_bounding_box_y'] . ', "width":' . $parameters['custom_texts_parameter_bounding_box_width'] . ', "height":' . $parameters['custom_texts_parameter_bounding_box_height'] . '}';
						}
					} elseif($parameters['custom_texts_parameter_bounding_box_control'] == 2){
						$data['config_designs_text_aboundingbox'] = '"' . $parameters['custom_texts_parameter_bounding_box_by_other'] . '"';
					}
					$data['config_stage_width'] = $parameters['stage_width'] ? $parameters['stage_width'] : $data['config_stage_width'];
					$data['config_stage_height'] = $parameters['stage_height'] ? $parameters['stage_height'] : $data['config_stage_height'];
					/*Configure for upgrade V2.x*/
					if(isset($parameters['designs_parameter_frame_shadow']) && $parameters['designs_parameter_frame_shadow'] != 'default'){
						$data['frame_shadow'] = $parameters['designs_parameter_frame_shadow'];
					}
					if(isset($parameters['designs_parameter_view_selection_position']) && $parameters['designs_parameter_view_selection_position'] != 'default'){
						$data['view_selection_position'] = $parameters['designs_parameter_view_selection_position'];
					}
					if(isset($parameters['designs_parameter_replace_initial_elements']) && $parameters['designs_parameter_replace_initial_elements'] != 'default'){
						if($parameters['designs_parameter_replace_initial_elements'] == 'yes') {
							$data['replace_initial_elements'] = 1;
						} else {
							$data['replace_initial_elements'] = 0;
						}
					}	
					
					if(isset($parameters['designs_parameter_enable_image_color_prices']) && $parameters['designs_parameter_enable_image_color_prices'] != 'default'){
						if($parameters['designs_parameter_enable_text_color_prices'] == 'yes'){
							$data['image_color_prices'] = 'on';
						} else {
							$data['image_color_prices'] = '';
						}	
					}	
					if(isset($parameters['designs_parameter_enable_text_color_prices']) && $parameters['designs_parameter_enable_text_color_prices'] != 'default'){
						if($parameters['designs_parameter_enable_text_color_prices'] == 'yes'){
						$data['text_color_prices'] = 'on';
						} else {
							$data['text_color_prices'] = '';
						}
					}	
					$data['config_designs_parameter_replace'] = $parameters['designs_parameter_replace'];
					if(isset($parameters['designs_parameter_filters'])){
						$data['filters'] = '';
					}	
					if(isset($parameters['view_selection_position']) && $parameters['view_selection_position']){
						$data['view_selection_position'] = $parameters['view_selection_position'];
					}	
					
					if(isset($parameters['clipart_category']) && $parameters['clipart_category']){
						$categories_clipart_list = $parameters['clipart_category'];
					}
				}
				
				//Get product designer only for product ID (No Category design)
				$products_design_no_cat = $this->model_catalog_fnt_product_design->getProductDesigns($data_filter = array('product_id' => $product_id));
				if($products_design_no_cat){
					$data_product_design = array();
					foreach($products_design_no_cat as $product_design){
						if($product_design['parameters']){
							$product_stage = unserialize($product_design['parameters']);
							if($product_stage['design_stage_width']){
								$product_stage_width = $product_stage['design_stage_width'];
							} else {
								$product_stage_width = $this->data['config_stage_width'];
							}
							if($product_stage['design_stage_height']){
								$product_stage_height = $product_stage['design_stage_height'];
							} else {
								$product_stage_height = $this->data['config_stage_height'];
							}
						} else {
							$product_stage_width = $this->data['config_stage_width'];
							$product_stage_height = $this->data['config_stage_height'];
						}
						$products_design_element = $this->model_catalog_fnt_product_design->getProductDesignImages($product_design['product_design_id']);
						if ($products_design_element) {
							$product_element = array();
							foreach ($products_design_element as $product_design_element) {
								$data_options_element = unserialize($product_design_element['parameters']);
								$data_options_element['stage_width'] = $product_stage_width;
								$data_options_element['stage_height'] = $product_stage_height;
								$product_design_element_detail = array();
								$elements = $this->model_catalog_fnt_product_design->getProductDesignElement($product_design_element['product_design_element_id']);
								if ($elements) { 
									foreach ($elements as $element) {
										$parameters = unserialize($element['parameters']);
										$title = $parameters['title_element'];
										unset($parameters['title_element']);
										if($element['type'] == 'image') $parameters['filters'] = $data['filters'];
									   $parameters_string = $this->convertParametersToString($parameters, $element['type']);
										if($element['type'] == 'image'){
											$element['value'] = HTTP_SERVER . 'image/' . $element['value'];
										}
										$product_design_element_detail[] = array(
											'type' => $element['type'],
											'title' => $title,
											'value' => $element['value'],
											'parameters' => $parameters_string
										);
										
									}
								}
								$product_element[] = array(
									'product_design_element_id' => $product_design_element['product_design_element_id'],
									'name' => html_entity_decode($product_design_element['name'], ENT_QUOTES, 'UTF-8'),
									'image' => $this->model_tool_image->resize($product_design_element['image'],100,100),
									'data_options' => $this->buildDataOptionAdds($data_options_element),
									'children' => $product_design_element_detail
								);
							}
						}
						if (isset($product_element[0])) {
							$first_design = $product_element[0];
							unset($product_element[0]);
						} else {
							$first_design = array();
						}
						
						if($first_design){
							$data_product_design[] = array(
								'product_design_element_id' => $product_design_element['product_design_element_id'],
								'name' => html_entity_decode($product_design['name'], ENT_QUOTES, 'UTF-8'),
								'image' => $this->model_tool_image->resize($products_design_element[0]['image'], 100, 100),
								'product_design_id' => $product_design['product_design_id'],
								'first_element' => $first_design,
								'children' => $product_element
							);
						}
					}
					$data['products'][] = array(
						'category_name' => str_replace('"', '', html_entity_decode($product_info['name'], ENT_QUOTES, 'UTF-8')),
						'data_product_design' => $data_product_design
					);
				}
				//Get category and product designer by product ID
				$categories_design = $this->model_catalog_fnt_product_design->getCategoryDesignByProductId($product_id);
				if($categories_design){
					foreach($categories_design as $category){
						$products_design = $this->model_catalog_fnt_product_design->getProductDesigns($data_filter = array('category_design_id' => $category['category_design_id'], 'product_id' => $product_id));
						if($products_design){
							$data_product_design = array();
							foreach($products_design as $product_design){
								 $product_design_info = $this->model_catalog_fnt_product_design->getProductDesign($product_design['product_design_id']);
								   if($product_design_info){
										if($product_design['parameters']){
											$product_stage = unserialize($product_design_info['parameters']);
											if($product_stage['design_stage_width']){
												$product_stage_with = $product_stage['design_stage_width'];
											} else {
												$product_stage_with = $data['config_stage_width'];
											}
											if($product_stage['design_stage_height']){
												$product_stage_height = $product_stage['design_stage_height'];
											} else {
												$product_stage_height = $data['config_stage_height'];
											}
										}
									    $products_design_element = $this->model_catalog_fnt_product_design->getProductDesignImages($product_design['product_design_id']);
										if ($products_design_element) {
											$product_element = array();
											foreach ($products_design_element as $product_design_element) {
												$data_options_element = unserialize($product_design_element['parameters']);
												$data_options_element['stage_width'] = $product_stage_with;
												$data_options_element['stage_height'] = $product_stage_height;
												$product_design_element_detail = array();
												$elements = $this->model_catalog_fnt_product_design->getProductDesignElement($product_design_element['product_design_element_id']);
												if ($elements) { 
													foreach ($elements as $element) {
														$parameters = unserialize($element['parameters']);
														$title = $parameters['title_element'];
														unset($parameters['title_element']);
														if($element['type'] == 'image') $parameters['filters'] = $data['filters'];
													   $parameters_string = $this->convertParametersToString($parameters, $element['type']);
														if($element['type'] == 'image'){
															$element['value'] = HTTP_SERVER . 'image/' . $element['value'];
														}
														$product_design_element_detail[] = array(
															'type' => $element['type'],
															'title' => $title,
															'value' => $element['value'],
															'parameters' => $parameters_string
														);
														
													}
												}
												$product_element[] = array(
													'product_design_element_id' => $product_design_element['product_design_element_id'],
													'name' =>  html_entity_decode($product_design_element['name'], ENT_QUOTES, 'UTF-8'),
													'image' => $this->model_tool_image->resize($product_design_element['image'],100,100),
													'data_options' => $this->buildDataOptionAdds($data_options_element),
													'children' => $product_design_element_detail
												);
											}
										}
										if (isset($product_element[0])) {
											$first_design = $product_element[0];
											unset($product_element[0]);
										} else {
											$first_design = array();
										}
										if($first_design){
											$data_product_design[] = array(
												'product_design_element_id' => $product_design_element['product_design_element_id'],
												'name' => html_entity_decode($product_design['name'], ENT_QUOTES, 'UTF-8'),
												'image' => $this->model_tool_image->resize($products_design_element[0]['image'], 100, 100),
												'product_design_id' => $product_design['product_design_id'],
												'first_element' => $first_design,
												'children' => $product_element
											);
										}	
									}
							}
						}
						$data['products'][] = array(
							'category_name' => html_entity_decode($category['name'], ENT_QUOTES, 'UTF-8'),
							'data_product_design' => $data_product_design
						);
					}
				}
				//Get Clipart 
				if (isset($categories_clipart_list) && $categories_clipart_list) {
					foreach ($categories_clipart_list as $category_clipart_id) {
						$category_clipart = $this->model_catalog_fnt_clipart->getCategoryClipart($category_clipart_id);	
						$parameter_cat_temp = unserialize($category_clipart['parameter']);
						if(isset($parameter_cat_temp['status']) && $parameter_cat_temp['status'])$tem_parameter = $parameter_cat_temp;
						$children_clipart = array();
						$cliparts = $this->model_catalog_fnt_clipart->getClipartByCategory($category_clipart['category_clipart_id']);
							if ($cliparts) {
								foreach ($cliparts as $clipart_id) {
									$clipart_info = $this->model_catalog_fnt_clipart->getClipart($clipart_id);
								
									if ($clipart_info) {
										$parameter_clipart_temp = unserialize($clipart_info['parameter']);
										if (isset($parameter_clipart_temp['status']) && $parameter_clipart_temp['status']) {
											$tem_parameter = $parameter_clipart_temp;								
										}
										if (isset($tem_parameter)) {
											
											$parameters  = '{"x":'.(int)$tem_parameter['x'].',"y":'.(int)$tem_parameter['y'].',"colors": "'.(string)$tem_parameter['colors'].'", "zChangeable":'.$tem_parameter['zChangeable'].', "removable":' . $tem_parameter['removable'].', "draggable":'.$tem_parameter['draggable']. ', "rotatable":'.$tem_parameter['rotatable'] .', "resizable":'. $tem_parameter['resizable'].', "autoCenter":'.$tem_parameter['auto_center']. ',"autoSelect":'.$tem_parameter['auto_select']. ', "price":' . (int)$tem_parameter['price'] . ',"boundingBox": ' . $data['config_designs_parameter_aboundingbox']. ',"scale":'.(float)$tem_parameter['scale'].',"replace":"'.$tem_parameter['replace'].'", "boundingBoxClipping" :'. $data['config_designs_parameter_clipping'] .',"filters":[' . $data['filters'] . ']}';		
										} else {
											$parameters  = '{"x":0,"y":0,"colors": "#000000", "zChangeable": true, "removable": true, "draggable": true, "rotatable": true, "resizable": true, "autoCenter": true, "price":0,"boundingBox": ' . $data['config_designs_parameter_aboundingbox']. ',"scale":0.5, "boundingBoxClipping" :'. $data['config_designs_parameter_clipping'] .',"filters":[' . $data['filters'] . ']}';									
										}								
										$children_clipart[] = array(
											'name' => $clipart_info['name'],
											'image' => HTTP_SERVER . 'image/' . $clipart_info['image'],
											'parameters' => $parameters
										);
										
									}
								}
							}
						
						if ($cliparts) {
							$data['cliparts'][] = array(
								'category_clipart_id' => $category_clipart['category_clipart_id'],
								'name' => html_entity_decode($category_clipart['name'], ENT_QUOTES, 'UTF-8'),
								'children' => $children_clipart
							);
						}
					}
				}
				$data['column_left'] = $this->load->controller('common/column_left');
				$data['column_right'] = $this->load->controller('common/column_right');
				$data['content_top'] = $this->load->controller('common/content_top');
				$data['content_bottom'] = $this->load->controller('common/content_bottom');
				$data['footer'] = $this->load->controller('common/footer');
				$data['header'] = $this->load->controller('common/header');
				if (file_exists(DIR_TEMPLATE . $this->config->get('config_designs_template') . '/template/product/fnt_product_design.tpl')) {
					$this->response->setOutput($this->load->view($this->config->get('config_designs_template') . '/template/product/fnt_product_design.tpl', $data));
				} else {
					$this->response->setOutput($this->load->view('default/template/product/fnt_product_design.tpl', $data));
				}
			} else {
				$this->response->redirect($this->url->link('common/not_found'));
			}
		} else {
			$this->response->redirect($this->url->link('common/not_found'));
		}
    }
   
    public function upload(){
        $this->language->load('product/product');
        
        $json = array();
        
        if (!empty($this->request->files['file']['name'])) {
            $filename = basename(preg_replace('/[^a-zA-Z0-9\.\-\s+]/', '', html_entity_decode($this->request->files['file']['name'], ENT_QUOTES, 'UTF-8')));
            
            if ((utf8_strlen($filename) < 3) || (utf8_strlen($filename) > 64)) {
                $json['error'] = $this->language->get('error_filename');
            }
            
            // Allowed file extension types
            $allowed = array();
            
            $filetypes = explode("\n", $this->config->get('config_designs_file_extension_allowed'));
            
            foreach ($filetypes as $filetype) {
                $allowed[] = trim($filetype);
            }
            
            if (!in_array(substr(strrchr($filename, '.'), 1), $allowed)) {
                $json['error'] = $this->language->get('error_filetype');
            }
            
            // Allowed file mime types        
            $allowed = array();
            
            $filetypes = explode("\n", $this->config->get('config_designs_file_mime_allowed'));
            
            foreach ($filetypes as $filetype) {
                $allowed[] = trim($filetype);
            }
            
            if (!in_array($this->request->files['file']['type'], $allowed)) {
                $json['error'] = $this->language->get('error_filetype');
            }
            
            if ($this->request->files['file']['error'] != UPLOAD_ERR_OK) {
                $json['error'] = $this->language->get('error_upload_' . $this->request->files['file']['error']);
            }
        } else {
            $json['error'] = $this->language->get('error_upload');
        }
        
        if (!$json && is_uploaded_file($this->request->files['file']['tmp_name']) && file_exists($this->request->files['file']['tmp_name'])) {
            $file = basename($filename) . '.' . md5(mt_rand());
            
            // Hide the uploaded file name so people can not link to it directly.
            $json['file'] = $this->encryption->encrypt($file);
            
            move_uploaded_file($this->request->files['file']['tmp_name'], DIR_DOWNLOAD . $file);
            
            $json['success'] = $this->language->get('text_upload');
        }
        
        $this->response->setOutput(json_encode($json));
    }
	private function getPatternUrls() {
		
		$urls = array();
		$path = DIR_IMAGE . 'catalog/patterns/';
		$folder = opendir($path);
		$pic_types = array("jpg", "jpeg", "png");
		while ($file = readdir ($folder)) {
		  if(in_array(substr(strtolower($file), strrpos($file,".") + 1),$pic_types)) {
			  $urls[] = HTTP_SERVER . 'image/catalog/patterns/' . $file;
		  }
		}
		closedir($folder);
		return $urls;
	}
		public function convertParametersToString($parameters, $type = '' ) {
		if( empty($parameters) ) { return '{}'; }

		$params_object = '{';
		foreach($parameters as $key => $value) {

			if( $this->fpdNotEmpty($value) ) {

					//convert boolean value to integer
					if(is_bool($value)) { $value = (int) $value; }

					switch($key) {
						case 'x':
							$params_object .= '"x":'. $value .',';
						break;
						case 'y':
							$params_object .= '"y":'. $value .',';
						break;
						case 'z':
							$params_object .= '"z":'. $value .',';
						break;
						case 'colors':
							$params_object .= '"colors":"'. (is_array($value) ? implode(", ", $value) : $value) .'",';
						break;
						case 'removable':
							$params_object .= '"removable":'. $value .',';
						break;
						case 'draggable':
							$params_object .= '"draggable":'. $value .',';
						break;
						case 'rotatable':
							$params_object .= '"rotatable":'. $value .',';
						break;
						case 'resizable':
							$params_object .= '"resizable":'. $value .',';
						break;
						case 'removable':
							$params_object .= '"removable":'. $value .',';
						break;
						case 'zChangeable':
							$params_object .= '"zChangeable":'. $value .',';
						break;
						case 'scale':
							$params_object .= '"scale":'. $value .',';
						break;
						case 'angle':
							$params_object .= '"degree":'. $value .',';
						break;
						case 'price':
							$params_object .= '"price":'. $value .',';
						break;
						case 'autoCenter':
							$params_object .= '"autoCenter":'. $value .',';
						break;
						case 'replace':
							$params_object .= '"replace":"'. $value .'",';
						break;
						case 'autoSelect':
							$params_object .= '"autoSelect":'. $value .',';
						break;
						case 'topped':
							$params_object .= '"topped":'. $value .',';
						break;
						case 'boundingBoxClipping':
							$params_object .= '"boundingBoxClipping":'. $value .',';
						break;
						case 'opacity':
							$params_object .= '"opacity":'. $value .',';
						break;
						case 'minW':
							$params_object .= '"minW":'. $value .',';
						break;
						case 'minH':
							$params_object .= '"minH":'. $value .',';
						break;
						case 'maxW':
							$params_object .= '"maxW":'. $value .',';
						break;
						case 'maxH':
							$params_object .= '"maxH":'. $value .',';
						break;
						case 'resizeToW':
							$params_object .= '"resizeToW":'. $value .',';
						break;
						case 'resizeToH':
							$params_object .= '"resizeToH":'. $value .',';
						break;
						case 'currentColor':
							$params_object .= '"currentColor":"'. $value .'",';
						break;
						case 'uploadZone':
							$params_object .= '"uploadZone":'. $value .',';
						break;
						case 'filters':
							$params_object .= '"filters":['. $value .'],';
						break;
						case 'filter':
							$params_object .= '"filter":'. $value .',';
						break;
					}

					if( $type == 'text' ) {

						switch($key) {
							case 'font':
								$params_object .= '"font":"'. $value .'",';
							break;
							case 'patternable':
								$params_object .= '"patternable":'. $value .',';
							break;
							case 'textSize':
								$params_object .= '"textSize":'. $value .',';
							break;
							case 'editable':
								$params_object .= '"editable":'. $value .',';
							break;
							case 'lineHeight':
								$params_object .= '"lineHeight":'. $value .',';
							break;
							case 'textDecoration':
								$params_object .= '"textDecoration":"'. $value .'",';
							break;
							case 'maxLength':
								$params_object .= '"maxLength":'. $value .',';
							break;
							case 'fontWeight':
								$params_object .= '"fontWeight":"'. $value .'",';
							break;
							case 'fontStyle':
								$params_object .= '"fontStyle":"'. $value .'",';
							break;
							case 'textAlign':
								$params_object .= '"textAlign":"'. $value .'",';
							break;
							case 'originX':
								$params_object .= '"originX":"'. $value .'",';
							break;
							case 'curvable':
								$params_object .= '"curvable":'. $value .',';
							break;
							case 'curved':
								$params_object .= '"curved":'. $value .',';
							break;
							case 'curveSpacing':
								$params_object .= '"curveSpacing":'. $value .',';
							break;
							case 'curveRadius':
								$params_object .= '"curveRadius":'. $value .',';
							break;
							case 'curveReverse':
								$params_object .= '"curveReverse":'. $value .',';
							break;
						}
					}
				}
			}
		//bounding box
		if( empty($parameters['bounding_box_control']) ) {

			//use custom bounding box
			if(isset($parameters['bounding_box_x']) &&
			   isset($parameters['bounding_box_y']) &&
			   isset($parameters['bounding_box_width']) &&
			   isset($parameters['bounding_box_height'])
			   ) {

				if( $this->fpdNotEmpty($parameters['bounding_box_x']) && $this->fpdNotEmpty($parameters['bounding_box_y']) && $this->fpdNotEmpty($parameters['bounding_box_width']) && $this->fpdNotEmpty($parameters['bounding_box_height']) ) {
					$params_object .= '"boundingBox": { "x":'. $parameters['bounding_box_x'] .', "y":'. $parameters['bounding_box_y'] .', "width":'. $parameters['bounding_box_width'] .', "height":'. $parameters['bounding_box_height'] .'}';

				}
			}

		}
		else if ( isset($parameters['bounding_box_by_other']) && $this->fpdNotEmpty(trim($parameters['bounding_box_by_other'])) ) {
			$params_object .= '"boundingBox": "'. $parameters['bounding_box_by_other'] .'"';
		}

		$params_object = trim($params_object, ',');
		$params_object .= '}';
		$params_object = str_replace('_', ' ', $params_object);

		return $params_object;
	}
	
	public function fpdNotEmpty($value) {

		$value = trim($value);
		return $value == '0' || !empty($value);

	}
	public function validateOption(){
		$this->language->load('checkout/cart');
		$json = array();

		if (isset($this->request->post['product_id'])) {
			$product_id = $this->request->post['product_id'];
		} else {
			$product_id = 0;
		}

		$this->load->model('catalog/product');

		$product_info = $this->model_catalog_product->getProduct($product_id);

		if ($product_info) {			
			if (isset($this->request->post['quantity'])) {
				$quantity = $this->request->post['quantity'];
			} else {
				$quantity = 1;
			}

			if (isset($this->request->post['option'])) {
				$option = array_filter($this->request->post['option']);
			} else {
				$option = array();	
			}
			
			$product_options = $this->model_catalog_product->getProductOptions($this->request->post['product_id']);

			foreach ($product_options as $product_option) {
				if ($product_option['required'] && empty($option[$product_option['product_option_id']])) {
					$json['error']['option'][$product_option['product_option_id']] = sprintf($this->language->get('error_required'), $product_option['name']);
				}
			}
			$this->response->setOutput(json_encode($json));		
		}
	}
	private function buildDataOptionAdds($parameters){
		if( empty($parameters) ) { return '{}'; }

		$params_object = '{';
		foreach($parameters as $key => $value) {

			if( $this->fpdNotEmpty($value) ) {

				//convert boolean value to integer
				if(is_bool($value)) { $value = (int) $value; }

				switch($key) {
					case 'stage_width':
						$params_object .= '"width":'. $value .',';
					break;
					case 'stage_height':
						$params_object .= '"stageHeight":'. $value .',';
					break;
					case 'designs_parameter_price':
						$params_object .= '"customImageParameters": {"price": '. $value .'},';
					break;
					case 'custom_texts_parameter_price':
						$params_object .= '"customTextParameters": {"price": '. $value .'},';
					break;
				}
			}
		}


		$params_object .= '"customAdds": {';

		if( isset($parameters['disable_image_upload']) ) {
			$params_object .= '"uploads": false,';
		}

		if( isset($parameters['disable_custom_text']) ) {
			$params_object .= '"texts": false,';
		}

		if( isset($parameters['disable_facebook']) ) {
			$params_object .= '"facebook": false,';
		}

		if( isset($parameters['disable_instagram']) ) {
			$params_object .= '"instagram": false,';
		}

		if( isset($parameters['disable_designs']) ) {
			$params_object .= '"designs": false,';
		}

		$params_object = trim($params_object, ',');
		$params_object .= '}}';
		$params_object = str_replace('_', ' ', $params_object);

		return $params_object;
	}	
	public function getColorPrices($color_price) {
		$color_prices = '{}';
		if($color_price) {
			$color_prices = '{"'.str_replace('#', '', $color_price) ;
			$color_prices = str_replace(':', '":', $color_prices);
			$color_prices = str_replace(',', ',"', $color_prices);
			$color_prices .= '}';
		}
		return $color_prices;
	}
	public function calculateTaxPrice() {
		$json = array();
		if(isset($this->request->get['product_id']) && isset($this->request->get['price'])){
			$this->load->model('catalog/product');
			$product_info = $this->model_catalog_product->getProduct($this->request->get['product_id']);
			if($product_info){
				if (($this->config->get('config_customer_price') && $this->customer->isLogged()) || !$this->config->get('config_customer_price')) {
					$json['price'] = $this->currency->format($this->tax->calculate((float)$this->request->get['price'], $product_info['tax_class_id'], $this->config->get('config_tax')));
				} else {
					$json['price'] = '';
				}
				if ($this->config->get('config_tax')) {
					$json['tax'] = $this->currency->format((float)$this->request->get['price']);
				} else {
					$json['tax'] = '';
				}
			}	
		}
		$this->response->addHeader('Content-Type: application/json');
		$this->response->setOutput(json_encode($json));
	}	
}