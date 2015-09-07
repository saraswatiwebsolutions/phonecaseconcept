<?php
class ControllerCatalogFntCustomDesign extends Controller
{
    private $error = array();

    public function index()
    {
        $this->load->language('catalog/fnt_custom_design');
        //Include Css, jquery, google font		
        $data['fonts'] = '';
        $this->document->addStyle('view/stylesheet/css_fancy/plugins.min.css');
        $this->document->addStyle('view/stylesheet/css_fancy/jquery.fancyProductDesigner.css');
        $this->document->addStyle('view/stylesheet/css_fancy/tagmanager.css');
        $this->document->addStyle('view/javascript/js_fancy/css/admin.css');
        $this->document->addStyle('view/javascript/js_fancy/css/icon-font.css');
        $this->document->addStyle('view/javascript/js_fancy/css/buttons.min.css');
		$this->document->addStyle(HTTP_CATALOG.'catalog/view/javascript/fancy_design/css/jquery.fancyProductDesigner-fonts.css');
        $this->document->addScript('view/javascript/js_fancy/js/jquery.tooltipster.min.js');
        $this->document->addScript('view/javascript/js_fancy/js/fabric.js');
        $this->document->addScript('view/javascript/js_fancy/js/fancy.min.js');
        $this->document->addScript('view/javascript/js_fancy/js/webfont.js');
		$this->document->addScript('view/javascript/js_fancy/js/plugins.min.js');
        $this->document->addScript('view/javascript/js_fancy/js/jquery.fancyProductDesigner.min.js');
        $this->document->addScript('view/javascript/js_fancy/js/product-builder.js');
        $this->document->addScript('view/javascript/js_fancy/js/tagmanager.js');
        $this->document->addScript('view/javascript/js_fancy/js/admin.js');
		$data['domain']   = HTTP_CATALOG;
		$fonts_defaults = array();
		$fonts_default = explode(',',$this->config->get('fonts_default'));
		if($fonts_default){
			foreach ($fonts_default as $font) {
				$fonts_defaults[] = $font;
            }
		}
        $fonts_googles = array();
        $fonts_google = $this->config->get('fonts');
        if ($fonts_google) {
            foreach ($fonts_google as $font) {
                $str = str_replace(' ', '+', $font);
                $this->document->addLink('http://fonts.googleapis.com/css?family=' . $str, 'stylesheet');
                $fonts_googles[] = $font;
            }
        } 
		
		$fonts_directorys = array();
        $fonts_directory = $this->config->get('fonts_woff');
        if ($fonts_directory) {
            foreach ($fonts_directory as $font) {
                $fonts_directorys[] = preg_replace("/\\.[^.\\s]{3,4}$/", "", $font);
            }
        }
		$data['fonts']  = array_merge($fonts_defaults,$fonts_googles,$fonts_directorys);
		$data['config_stage_width']           = $this->config->get('config_stage_width') ? $this->config->get('config_stage_width') : 650;
        $data['config_stage_height']          = $this->config->get('config_stage_height') ? $this->config->get('config_stage_height') : 550;
        $this->document->setTitle($this->language->get('heading_title'));
		$data['heading_title'] = $this->language->get('heading_title');
        $this->load->model('catalog/fnt_product_design');
		$data['breadcrumbs'] = array();

		$data['breadcrumbs'][] = array(
			'text' => $this->language->get('text_home'),
			'separator' => false,
			'href' => $this->url->link('common/home', 'token=' . $this->session->data['token'], 'SSL')
		);

		$data['breadcrumbs'][] = array(
			'text' => $this->language->get('heading_title'),
			'separator' => ':',
			'href' => $this->url->link('catalog/fnt_custom_design', 'token=' . $this->session->data['token'], 'SSL')
		);
		
        $data['products_design_element'] = array();
		$data['product_design_element_id'] = 0;
		$data['text_form'] = $this->language->get('text_form');
		//define parameter
		$data['text_select_product'] = $this->language->get('text_select_product');
		$data['text_postion'] = $this->language->get('text_postion');
		$data['text_position'] = $this->language->get('text_position');
		$data['text_x'] = $this->language->get('text_x');
		$data['text_y'] = $this->language->get('text_y');
		$data['text_scale'] = $this->language->get('text_scale');
		$data['text_angle'] = $this->language->get('text_angle');
		$data['text_price'] = $this->language->get('text_price');
		$data['text_opacity'] = $this->language->get('text_opacity');
		$data['text_colors'] = $this->language->get('text_colors');
		$data['text_removable'] = $this->language->get('text_removable');
		$data['text_draggable'] = $this->language->get('text_draggable');
		$data['text_rotatable'] = $this->language->get('text_rotatable');
		$data['text_resizable'] = $this->language->get('text_resizable');
		$data['text_z_position'] = $this->language->get('text_z_position');
		$data['text_stay_on_top'] = $this->language->get('text_stay_on_top');
		$data['text_auto_select'] = $this->language->get('text_auto_select');
		$data['text_bounding_box'] = $this->language->get('text_bounding_box');
		$data['text_use_another_element'] = $this->language->get('text_use_another_element');
		$data['text_clip_element_into_bounding_box'] = $this->language->get('text_clip_element_into_bounding_box');
		$data['text_modifications'] = $this->language->get('text_modifications');
		$data['text_width'] = $this->language->get('text_width');
		$data['text_height'] = $this->language->get('text_height');
		$data['text_title_of_an_image_element'] = $this->language->get('text_title_of_an_image_element');
		$data['text_replace'] = $this->language->get('text_replace');
		$data['text_elements_with'] = $this->language->get('text_elements_with');
		$data['text_font'] = $this->language->get('text_font');
		$data['text_select_a_font'] = $this->language->get('text_select_a_font');
		$data['text_styling'] = $this->language->get('text_styling');
		$data['text_alignment'] = $this->language->get('text_alignment');
		$data['text_text_alignment'] = $this->language->get('text_text_alignment');
		$data['text_maximum_characters'] = $this->language->get('text_maximum_characters');
		$data['text_editable'] = $this->language->get('text_editable');
		$data['text_patternable'] = $this->language->get('text_patternable');
		$data['text_curvable'] = $this->language->get('text_curvable');
		$data['text_use_always_a_dot'] = $this->language->get('text_use_always_a_dot');
		$data['text_a_value_between'] = $this->language->get('text_a_value_between');
		$data['text_one_color_value'] = $this->language->get('text_one_color_value');
		$data['text_enter_hex_colors_by'] = $this->language->get('text_enter_hex_colors_by');
		$data['text_e_g'] = $this->language->get('text_e_g');
		$data['text_select_view'] = $this->language->get('text_select_view');
		$data['text_manage_elements'] = $this->language->get('text_manage_elements');
		$data['text_add_image'] = $this->language->get('text_add_image');
		$data['text_add_text'] = $this->language->get('text_add_text');
		$data['text_drag_list'] = $this->language->get('text_drag_list');
		$data['text_edit_parameters'] = $this->language->get('text_edit_parameters');
		$data['text_product_stage'] = $this->language->get('text_product_stage');
		$data['text_problems'] = $this->language->get('text_problems');
		$data['text_help_text_problems'] = $this->language->get('text_help_text_problems');
		$data['text_add_curved_text'] = $this->language->get('text_add_curved_text');
		$data['text_add_upload_zone'] = $this->language->get('text_add_upload_zone');
		$data['text_current_color'] = $this->language->get('text_current_color');
		$data['text_curved'] = $this->language->get('text_curved');
		$data['text_spacing'] = $this->language->get('text_spacing');
		$data['text_radius'] = $this->language->get('text_radius');
		$data['text_reverse'] = $this->language->get('text_reverse');
		$data['text_x_reference_point'] = $this->language->get('text_x_reference_point');
		$data['text_general'] = $this->language->get('text_general');
		$data['text_text'] = $this->language->get('text_text');
		$data['text_add'] = $this->language->get('text_add');
		$data['text_media_type'] =$this->language->get('text_media_type');
		$data['text_colors'] = $this->language->get('text_colors');
		$data['title_price'] = $this->language->get('title_price');
		$data['title_replace'] = $this->language->get('title_replace');
		$data['text_enable_color'] = $this->language->get('text_enable_color');
		$data['title_enable_color'] = $this->language->get('title_enable_color');
		$data['title_add'] = $this->language->get('title_add');
		$data['title_current_color'] = $this->language->get('title_current_color');
		$data['title_opacity'] = $this->language->get('title_opacity');
		$data['text_unlock_layer_position'] = $this->language->get('text_unlock_layer_position');
		$data['text_define_bounding'] = $this->language->get('text_define_bounding');
		$data['text_line_height'] = $this->language->get('text_line_height');
		$data['title_curvable'] = $this->language->get('title_curvable');
		$data['text_curvable_spacing'] = $this->language->get('text_curvable_spacing');
		$data['text_curvable_radius'] = $this->language->get('text_curvable_radius');
		$data['text_curvable_reserve'] = $this->language->get('text_curvable_reserve');
		$data['text_image_upload'] = $this->language->get('text_image_upload');
		$data['text_yes'] = $this->language->get('text_yes');
		$data['text_no'] = $this->language->get('text_no');
		$data['text_custom_text'] = $this->language->get('text_custom_text');
		$data['text_design'] = $this->language->get('text_design');
		$data['text_fb_photo'] = $this->language->get('text_fb_photo');
		$data['text_instagram_photo'] = $this->language->get('text_instagram_photo');
		$data['text_center_horizontal'] = $this->language->get('text_center_horizontal');
		$data['text_center_vertical'] = $this->language->get('text_center_vertical');
		$data['text_duplicate_layer'] = $this->language->get('text_duplicate_layer');
		$data['text_curvable_reverse'] = $this->language->get('text_curvable_reverse');
		
		$data['button_save_design'] = $this->language->get('button_save_design');
		$data['button_cancel'] = $this->language->get('button_cancel');
		$data['cancel'] = $this->url->link('catalog/fnt_product_design', 'token=' . $this->session->data['token'], 'SSL');
		
        if (isset($this->request->get['product_design_id'])) {
            $data['product_design_id'] = $this->request->get['product_design_id'];
			$product_design_info = $this->model_catalog_fnt_product_design->getProductDesign($this->request->get['product_design_id']);
			if($product_design_info){
				$product_design_stage = unserialize($product_design_info['parameters']);
				if($product_design_stage['design_stage_width']) $data['config_stage_width'] = $product_design_stage['design_stage_width'];
				if($product_design_stage['design_stage_height']) $data['config_stage_height'] = $product_design_stage['design_stage_height'];
			}
            if (isset($this->request->get['product_design_element_id'])) {
                $data['product_design_element_id'] = $this->request->get['product_design_element_id'];
                $product_design_element = $this->model_catalog_fnt_product_design->getProductDesignImage($this->request->get['product_design_element_id']);
                if ($product_design_element) {
                    $data['name'] = $product_design_element['name'];
                    $data['image'] = HTTP_CATALOG . 'image/' . $product_design_element['image'];
                }
            } else {
                $product_design_element = $this->model_catalog_fnt_product_design->getProductDesignFirstImage($this->request->get['product_design_id']);
                if ($product_design_element) {
                    $data['product_design_element_id'] = $product_design_element['product_design_element_id'];
                    $data['name'] = $product_design_element['name'];
                    $data['image'] = HTTP_CATALOG . 'image/' . $product_design_element['image'];
                }
            }

            //Get All list product element
            $products_design = $this->model_catalog_fnt_product_design->getProductDesigns();
            if ($products_design) {
                foreach ($products_design as $product_design) {
                    $children = array();
                    $products_design_element = $this->model_catalog_fnt_product_design->getProductDesignImages($product_design['product_design_id']);
                    if ($products_design_element) {
                        foreach ($products_design_element as $product_design_element) {
                            $children[] = array(
                                'product_design_element_id' => $product_design_element['product_design_element_id'],
                                'name' => $product_design_element['name']
                            );
                        }
                    }
                    $data['products_design_element'][] = array(
                        'id' => $product_design['product_design_id'],
                        'name' => $product_design['name'],
                        'children' => $children
                    );				
                }
				
            }
        }
        $data['products_design'] = array();

        $data['token'] = $this->request->get['token'];
        $data['dir_image'] = HTTP_CATALOG . 'image/';
       
		if (isset($data['product_design_id'])) {
			$elements = $this->model_catalog_fnt_product_design->getProductDesignElement($data['product_design_element_id']);
		   
			if ($elements) {
				foreach ($elements as $element) {
					$parameters = unserialize($element['parameters']);
					$title = $parameters['title_element'];
					unset($parameters['title_element']);
					$data['products_design'][] = array(
						'type' => $element['type'],
						'title' => $title,
						'value' => $element['value'],
						'parameters' => http_build_query($parameters)
					);
				}
			
			}
		}
		$data['header'] = $this->load->controller('common/header');
		$data['column_left'] = $this->load->controller('common/column_left');
		$data['footer'] = $this->load->controller('common/footer');
		$this->response->setOutput($this->load->view('catalog/fnt_custom_design.tpl', $data));
    }

    public function saveProductDesign()
    {
        $json = array();
        $this->load->language('catalog/fnt_custom_design');
        if (isset($this->request->get['product_design_id'])) {
            $this->load->model('catalog/fnt_product_design');
            if ($this->request->post) {
            $this->model_catalog_fnt_product_design->deleteProductDesignElement($this->request->get['product_design_element_id']);
                $product_design_element_id = $this->request->get['product_design_element_id'];
				for($i=0; $i < sizeof($this->request->post['element_types']); $i++) {

						$element = array();

						$element['type'] = $this->request->post['element_types'][$i];
						if ($element['type'] == 'image') {
							$element['source'] = str_replace(HTTP_CATALOG .'image/', '', $this->request->post['element_sources'][$i]);
						} else {
							$element['source'] = $this->request->post['element_sources'][$i];
						}

						$parameters = array();
						parse_str(html_entity_decode($this->request->post['element_parameters'][$i]), $parameters);
						if(is_array($parameters)) {
							foreach($parameters as $key => $value) {
								if($value == '') {
									$parameters[$key] = NULL;
								}
								else {
									$parameters[$key] = preg_replace('/\s+/', '', $value);
								}
							}
						}
						$parameters['title_element'] = $this->request->post['element_titles'][$i];
						$element['parameters'] = serialize($parameters);
						$this->model_catalog_fnt_product_design->addProductDesignElement($product_design_element_id, $element,$i);
					}
                $json['success'] = $this->language->get('text_success');
            }
        }
        $this->response->setOutput(json_encode($json));
    }
}