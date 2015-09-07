<?php
class ControllerCatalogFntSetting extends Controller {
	private $error = array(); 
	
	public function index() {   
		$this->document->addScript('view/javascript/js_fancy/js/admin_config.js');
		$this->document->addStyle('view/javascript/js_fancy/css/admin_config.css');
		$this->language->load('catalog/fnt_setting');

		$this->document->setTitle($this->language->get('heading_title'));
		
		$this->load->model('setting/setting');
		$this->load->model('tool/image');
		if (($this->request->server['REQUEST_METHOD'] == 'POST') && $this->validate()) {			
			$this->model_setting_setting->editSetting('config_design', $this->request->post);
			
			$this->session->data['success'] = $this->language->get('text_success');
			
			$this->response->redirect($this->url->link('catalog/fnt_setting', 'token=' . $this->session->data['token'], 'SSL'));
		}

        $data['arr_frame_shadow'] = array(
            'fpd-shadow-1' => 'Shadow 1',
            'fpd-shadow-2' => 'Shadow 2',
            'fpd-shadow-3' => 'Shadow 3',
            'fpd-shadow-4' => 'Shadow 4',
            'fpd-shadow-5' => 'Shadow 5',
            'fpd-shadow-6' => 'Shadow 6',
            'fpd-shadow-7' => 'Shadow 7',
            'fpd-shadow-8' => 'Shadow 8',
            'fpd-shadow-0' => 'No Shadow'
        );
		
        $data['arr_view_selection_position'] = array(
            'tr' => 'Top-Right in Product Stage',
            'tl' => 'Top-Left in Product Stage',
            'br' => 'Bottom-Right in Product Stage',
            'bl' => 'Bottom-Left in Product Stage',
            'outside' => 'Under the Product Stage',
        );
			
        $data['filters'] = array(
			'grayscale' => 'Grayscale',
			'sepia' 	=> 'Sepia',
			'sepia2'	=>'Sepia 2'
        );
		
        $data['aligns'] = array(
			'left' => 'Left',
			'center'	=>'Center',
			'right' 	=> 'Right'
        );
		$data['placeholder'] = $this->model_tool_image->resize('no_image.png', 100, 100);				
		$data['heading_title'] = $this->language->get('heading_title');
		$data['text_form'] = $this->language->get('text_form');
		$data['text_design_upload_image'] = $this->language->get('text_design_upload_image');
		$data['text_cumstom'] = $this->language->get('text_cumstom');
		$data['text_label_patternable'] = $this->language->get('text_label_patternable');		
		$data['entry_stage_width'] = $this->language->get('entry_stage_width');			
		$data['entry_stage_height'] = $this->language->get('entry_stage_height');
		$data['entry_default_text_size'] = $this->language->get('entry_default_text_size');			
		$data['help_default_text'] = $this->language->get('help_default_text');			
		$data['help_view_selection_float'] = $this->language->get('help_view_selection_float');
		$data['entry_allow_product_saving'] = $this->language->get('entry_allow_product_saving');
		$data['entry_pdf_button'] = $this->language->get('entry_pdf_button');
		$data['entry_upload_designs'] = $this->language->get('entry_upload_designs');			
		$data['entry_upload_designs_logged_in'] = $this->language->get('entry_upload_designs_logged_in');			
		$data['entry_zoom'] = $this->language->get('entry_zoom');			
		$data['entry_zoom_min'] = $this->language->get('entry_zoom_min');			
		$data['entry_zoom_max'] = $this->language->get('entry_zoom_max');			
		$data['entry_instagram_client_id'] = $this->language->get('entry_instagram_client_id');
		$data['entry_designs_autoselect'] = $this->language->get('entry_designs_autoselect');			
		$data['entry_designs_replace'] = $this->language->get('entry_designs_replace');			
		$data['entry_designs_clipping'] = $this->language->get('entry_designs_clipping');			
		$data['entry_designs_bounding_box'] = $this->language->get('entry_designs_bounding_box');			
		$data['entry_bounding_box_target'] = $this->language->get('entry_bounding_box_target');			
		$data['entry_text_curved'] = $this->language->get('entry_text_curved');						
		$data['entry_text_characters'] = $this->language->get('entry_text_characters');						
		$data['entry_config_text_default'] = $this->language->get('entry_config_text_default');						
		$data['entry_hide_on_smartphones'] = $this->language->get('entry_hide_on_smartphones');
		$data['entry_hide_on_tablets'] = $this->language->get('entry_hide_on_tablets');
		$data['entry_designer_primary_color'] = $this->language->get('entry_designer_primary_color');
		$data['entry_designer_secondary_color'] = $this->language->get('entry_designer_secondary_color');
		$data['entry_designer_primary_text_color'] = $this->language->get('entry_designer_primary_text_color');
		$data['entry_designer_secondary_text_color'] = $this->language->get('entry_designer_secondary_text_color');
		$data['entry_selected_color'] = $this->language->get('entry_selected_color');
		$data['entry_bounding_box_color'] = $this->language->get('entry_bounding_box_color');
		$data['entry_out_of_boundary_color'] = $this->language->get('entry_out_of_boundary_color');
		$data['entry_minimum_dpi'] = $this->language->get('entry_minimum_dpi');
		$data['entry_padding_controls'] = $this->language->get('entry_padding_controls');
		$data['entry_replace_initial_elements'] = $this->language->get('entry_replace_initial_elements');

		$data['entry_show_popup_view'] = $this->language->get('entry_show_popup_view');						
		$data['entry_view_selection_float'] = $this->language->get('entry_view_selection_float');						
		$data['entry_download_image'] = $this->language->get('entry_download_image');						
		$data['entry_print_button'] = $this->language->get('entry_print_button');						
		$data['entry_upload_text'] = $this->language->get('entry_upload_text');

		$data['entry_frame_shadow'] = $this->language->get('entry_frame_shadow');
		$data['entry_facebook_app_id']=$this->language->get('entry_facebook_app_id');
		$data['entry_designs_parameter_x']=$this->language->get('entry_designs_parameter_x');
		$data['entry_designs_parameter_y']=$this->language->get('entry_designs_parameter_y');
		$data['entry_designs_parameter_z']=$this->language->get('entry_designs_parameter_z');
		$data['entry_designs_parameter_price']=$this->language->get('entry_designs_parameter_price');		
		$data['entry_designs_parameter_auto_center']=$this->language->get('entry_designs_parameter_auto_center');		
		$data['entry_designs_parameter_draggable']=$this->language->get('entry_designs_parameter_draggable');		
		$data['entry_designs_parameter_rotatable']=$this->language->get('entry_designs_parameter_rotatable');		
		$data['entry_designs_parameter_resizable']=$this->language->get('entry_designs_parameter_resizable');		
		$data['entry_designs_parameter_zchangeable']=$this->language->get('entry_designs_parameter_zchangeable');		
		$data['entry_bounding_box_x']=$this->language->get('entry_bounding_box_x');		
		$data['entry_bounding_box_y']=$this->language->get('entry_bounding_box_y');		
		$data['entry_bounding_box_width']=$this->language->get('entry_bounding_box_width');		
		$data['entry_bounding_box_height']=$this->language->get('entry_bounding_box_height');		
		$data['entry_min_width']=$this->language->get('entry_min_width');		
		$data['entry_min_height']=$this->language->get('entry_min_height');		
		$data['entry_max_width']=$this->language->get('entry_max_width');		
		$data['entry_max_height']=$this->language->get('entry_max_height');		
		$data['entry_resize_width']=$this->language->get('entry_resize_width');		
		$data['entry_resize_height']=$this->language->get('entry_resize_height');		
		$data['entry_text_x_position']=$this->language->get('entry_text_x_position');		
		$data['entry_text_patternable']=$this->language->get('entry_text_patternable');		
		$data['entry_text_bounding_x_position']=$this->language->get('entry_text_bounding_x_position');
		$data['entry_enable_text_color_prices']=$this->language->get('entry_enable_text_color_prices');
		$data['entry_enable_image_color_prices']=$this->language->get('entry_enable_image_color_prices');
		$data['entry_designs_parameter_colors']=$this->language->get('entry_designs_parameter_colors');
		$data['entry_designs_parameter_remove']=$this->language->get('entry_designs_parameter_remove');

		
		$data['help_position_y_text']=$this->language->get('help_position_y_text');
		$data['help_position_x_text']=$this->language->get('help_position_x_text');
		$data['help_replace']=$this->language->get('help_replace');
		$data['help_hex_color']=$this->language->get('help_hex_color');
		$data['help_sidebar_nav_width']=$this->language->get('help_sidebar_nav_width');
		$data['help_sidebar_content_width']=$this->language->get('help_sidebar_content_width');
		$data['help_stage_width']=$this->language->get('help_stage_width');
		$data['help_stage_height']=$this->language->get('help_stage_height');		
		$data['help_stage_max_width']=$this->language->get('help_stage_max_width');		
		$data['help_product'] = $this->language->get('help_product');								
		$data['help_zoom'] = $this->language->get('help_zoom');								
		$data['help_zoom_min'] = $this->language->get('help_zoom_min');								
		$data['help_zoom_max'] = $this->language->get('help_zoom_max');								
		$data['help_facebook_app_id'] = $this->language->get('help_facebook_app_id');
		$data['help_instagram_client_id'] = $this->language->get('help_instagram_client_id');
		$data['help_instagram_redirect_uri'] = $this->language->get('help_instagram_redirect_uri');		
		$data['help_designs_parameter_z'] = $this->language->get('help_designs_parameter_z');
		$data['help_bounding_box_target'] = $this->language->get('help_bounding_box_target');
		$data['help_designs_parameter_colors'] = $this->language->get('help_designs_parameter_colors');
		$data['help_designs_parameter_price'] = $this->language->get('help_designs_parameter_price');				
		$data['help_designs_parameter_zchangeable'] = $this->language->get('help_designs_parameter_zchangeable');
		$data['help_bounding_box_x'] = $this->language->get('help_bounding_box_x');					
		$data['help_min_width'] = $this->language->get('help_min_width');
		$data['help_min_height'] = $this->language->get('help_min_height');
		$data['help_max_width'] = $this->language->get('help_max_width');
		$data['help_max_height'] = $this->language->get('help_max_height');
		$data['help_resize_width'] = $this->language->get('help_resize_width');
		$data['help_resize_height'] = $this->language->get('help_resize_height');
		$data['help_text_patternable'] = $this->language->get('help_text_patternable');		
		$data['help_text_curved'] = $this->language->get('help_text_curved');		
		$data['help_default_text_size'] = $this->language->get('help_default_text_size');		
		$data['help_text_characters'] = $this->language->get('help_text_characters');		
		$data['help_replace_initial_elements'] = $this->language->get('help_replace_initial_elements');

		$data['button_save'] = $this->language->get('button_save');
		$data['button_cancel'] = $this->language->get('button_cancel');
		$data['text_yes'] = $this->language->get('text_yes');
		$data['text_no'] = $this->language->get('text_no');		
		$data['text_image_manager'] = $this->language->get('text_image_manager');		
		$data['text_save_edit'] = $this->language->get('text_save_edit');		
		$data['text_default_element_options'] = $this->language->get('text_default_element_options');
		$data['text_general'] = $this->language->get('text_general');
		$data['text_custom_text'] = $this->language->get('text_custom_text');
		$data['text_custom_image_options'] = $this->language->get('text_custom_image_options');
		$data['text_title_general'] = $this->language->get('text_title_general');
		$data['text_use_option_main_setting'] = $this->language->get('text_use_option_main_setting');
		$data['text_advanced_color_config'] = $this->language->get('text_advanced_color_config');
		$data['text_layout_skin'] = $this->language->get('text_layout_skin');
		$data['text_colors'] = $this->language->get('text_colors');
		$data['text_user_interface'] = $this->language->get('text_user_interface');
		$data['text_miscellaneous'] = $this->language->get('text_miscellaneous');
		$data['text_image_options'] = $this->language->get('text_image_options');
		$data['text_color_prices'] = $this->language->get('text_color_prices');
		$data['text_hexa_color'] = $this->language->get('text_hexa_color');
		$data['text_custom_text_help'] = $this->language->get('text_custom_text_help');
		$data['text_custom_image_help'] = $this->language->get('text_custom_image_help');

		$data['entry_filters'] = $this->language->get('entry_filters');
		$data['entry_view_selection_position'] = $this->language->get('entry_view_selection_position');
		$data['entry_texts_parameter_textalign'] = $this->language->get('entry_texts_parameter_textalign');
		$data['entry_curved_spacing'] = $this->language->get('entry_curved_spacing');
		$data['entry_curve_radius'] = $this->language->get('entry_curve_radius');
		$data['entry_text_curve_reverse'] = $this->language->get('entry_text_curve_reverse');
		$data['entry_designs_parameter_stay_top'] = $this->language->get('entry_designs_parameter_stay_top');
		$data['entry_view_tooltip'] = $this->language->get('entry_view_tooltip');
		if (isset($this->session->data['success'])) {
			$data['success'] = $this->session->data['success'];

			unset($this->session->data['success']);
		} else {
			$data['success'] = '';
		}		
 		if (isset($this->error['warning'])) {
			$data['error_warning'] = $this->error['warning'];
		} else {
			$data['error_warning'] = '';
		}
		
  		$data['breadcrumbs'] = array();

   		$data['breadcrumbs'][] = array(
       		'text' => $this->language->get('text_home'),
			'separator' => false,
			'href' => $this->url->link('common/home', 'token=' . $this->session->data['token'], 'SSL')
   		);

   		$data['breadcrumbs'][] = array(
       		'text' => $this->language->get('heading_title'),
			'separator' => ':',
			'href' => $this->url->link('catalog/fnt_setting', 'token=' . $this->session->data['token'], 'SSL')
   		);
		$data['action'] = $this->url->link('catalog/fnt_setting', 'token=' . $this->session->data['token'], 'SSL');
		
		$data['cancel'] = $this->url->link('common/home', 'token=' . $this->session->data['token'], 'SSL');
		$data['edit'] = $this->url->link('catalog/fnt_setting', 'token=' . $this->session->data['token'], 'SSL');

		$data['token'] = $this->session->data['token'];
		
		if(isset($this->request->post['config_view_tooltip'])){
			$data['config_view_tooltip']=$this->request->post['config_view_tooltip'];		
		}elseif($this->config->get('config_designs_view_tooltip')){
			$data['config_view_tooltip']=$this->config->get('config_designs_view_tooltip');			
		}else{
			$data['config_view_tooltip'] = 0;
		}

		if(isset($this->request->post['config_minimum_dpi'])){
			$data['config_minimum_dpi']=$this->request->post['config_minimum_dpi'];
		}elseif($this->config->get('config_designs_minimum_dpi')){
			$data['config_minimum_dpi']=$this->config->get('config_designs_minimum_dpi');
		}else{
			$data['config_minimum_dpi'] = 0;
		}
		
		if(isset($this->request->post['config_stage_width'])){
			$data['config_stage_width']=$this->request->post['config_stage_width'];		
		}elseif($this->config->get('config_designs_stage_width')){
			$data['config_stage_width']=$this->config->get('config_designs_stage_width');			
		}else{
			$data['config_stage_width'] = 0;
		}
		
		if(isset($this->request->post['config_stage_height'])){
			$data['config_stage_height']=$this->request->post['config_stage_height'];		
		}elseif($this->config->get('config_designs_stage_height')){
			$data['config_stage_height']=$this->config->get('config_designs_stage_height');			
		}else{
			$data['config_stage_height'] = 0;
		}

		if(isset($this->request->post['config_frame_shadow'])){
			$data['config_frame_shadow']=$this->request->post['config_frame_shadow'];
		}elseif($this->config->get('config_designs_frame_shadow')){
			$data['config_frame_shadow']=$this->config->get('config_designs_frame_shadow');
		}else{
			$data['config_frame_shadow'] = '';
		}
		
		if(isset($this->request->post['config_default_text_size'])){
			$data['config_default_text_size']=$this->request->post['config_default_text_size'];		
		}elseif($this->config->get('config_designs_default_text_size')){
			$data['config_default_text_size']=$this->config->get('config_designs_default_text_size');			
		}else{
			$data['config_default_text_size'] = 25;
		}
		if(isset($this->request->post['config_text_default'])){
			$data['config_text_default']=$this->request->post['config_text_default'];		
		}elseif($this->config->get('config_designs_text_default')){
			$data['config_text_default']=$this->config->get('config_designs_text_default');			
		}else{
			$data['config_text_default']= 'Double-click to change text';
		}
		
		if(isset($this->request->post['config_allow_product_saving'])){
			$data['config_allow_product_saving']=$this->request->post['config_allow_product_saving'];		
		}elseif($this->config->get('config_designs_allow_product_saving')){
			$data['config_allow_product_saving']=$this->config->get('config_designs_allow_product_saving');			
		}else{
			$data['config_allow_product_saving']='';
		}
		
		if(isset($this->request->post['config_pdf_button'])){
			$data['config_pdf_button']=$this->request->post['config_pdf_button'];		
		}elseif($this->config->get('config_designs_pdf_button')){
			$data['config_pdf_button']=$this->config->get('config_designs_pdf_button');			
		}else{
			$data['config_pdf_button']='';
		}
		
		if(isset($this->request->post['config_disable_on_smartphones'])){
			$data['config_disable_on_smartphones']=$this->request->post['config_disable_on_smartphones'];
		}elseif($this->config->get('config_designs_disable_on_smartphones')){
			$data['config_disable_on_smartphones']=$this->config->get('config_designs_disable_on_smartphones');
		}else{
			$data['config_disable_on_smartphones']='';
		}

		if(isset($this->request->post['config_disable_on_tablets'])){
			$data['config_disable_on_tablets']=$this->request->post['config_disable_on_tablets'];
		}elseif($this->config->get('config_designs_disable_on_tablets')){
			$data['config_disable_on_tablets']=$this->config->get('config_designs_disable_on_tablets');
		}else{
			$data['config_disable_on_tablets']='';
		}

        if(isset($this->request->post['config_designer_primary_color'])){
			$data['config_designer_primary_color']=$this->request->post['config_designer_primary_color'];
		}elseif($this->config->get('config_designs_designer_primary_color')){
			$data['config_designer_primary_color']=$this->config->get('config_designs_designer_primary_color');
		}else{
			$data['config_designer_primary_color']='';
		}

        if(isset($this->request->post['config_designer_secondary_color'])){
            $data['config_designer_secondary_color']=$this->request->post['config_designer_secondary_color'];
        }elseif($this->config->get('config_designs_designer_secondary_color')){
            $data['config_designer_secondary_color']=$this->config->get('config_designs_designer_secondary_color');
        }else{
            $data['config_designer_secondary_color']='';
        }

        if(isset($this->request->post['config_designer_primary_text_color'])){
			$data['config_designer_primary_text_color']=$this->request->post['config_designer_primary_text_color'];
		}elseif($this->config->get('config_designs_designer_primary_text_color')){
			$data['config_designer_primary_text_color']=$this->config->get('config_designs_designer_primary_text_color');
		}else{
			$data['config_designer_primary_text_color']='';
		}

        if(isset($this->request->post['config_designer_secondary_text_color'])){
			$data['config_designer_secondary_text_color']=$this->request->post['config_designer_secondary_text_color'];
		}elseif($this->config->get('config_designs_designer_secondary_text_color')){
			$data['config_designer_secondary_text_color']=$this->config->get('config_designs_designer_secondary_text_color');
		}else{
			$data['config_designer_secondary_text_color']='';
		}

        if(isset($this->request->post['config_selected_color'])){
			$data['config_selected_color']=$this->request->post['config_selected_color'];
		}elseif($this->config->get('config_designs_selected_color')){
			$data['config_selected_color']=$this->config->get('config_designs_selected_color');
		}else{
			$data['config_selected_color']='';
		}

        if(isset($this->request->post['config_bounding_box_color'])){
			$data['config_bounding_box_color']=$this->request->post['config_bounding_box_color'];
		}elseif($this->config->get('config_designs_bounding_box_color')){
			$data['config_bounding_box_color']=$this->config->get('config_designs_bounding_box_color');
		}else{
			$data['config_bounding_box_color']='';
		}

        if(isset($this->request->post['config_out_of_boundary_color'])){
			$data['config_out_of_boundary_color']=$this->request->post['config_out_of_boundary_color'];
		}elseif($this->config->get('config_designs_out_of_boundary_color')){
			$data['config_out_of_boundary_color']=$this->config->get('config_designs_out_of_boundary_color');
		}else{
			$data['config_out_of_boundary_color']='';
		}

        if(isset($this->request->post['config_view_selection_float'])){
            $data['config_view_selection_float']=$this->request->post['config_view_selection_float'];
        }elseif($this->config->get('config_designs_view_selection_float')){
            $data['config_view_selection_float']=$this->config->get('config_designs_view_selection_float');
        }else{
            $data['config_view_selection_float']='';
        }

		if(isset($this->request->post['config_download_image'])){
			$data['config_download_image']=$this->request->post['config_download_image'];		
		}elseif($this->config->get('config_designs_download_image')){
			$data['config_download_image']=$this->config->get('config_designs_download_image');			
		}else{
			$data['config_download_image']='';
		}
		if(isset($this->request->post['config_print_button'])){
			$data['config_print_button']=$this->request->post['config_print_button'];		
		}elseif($this->config->get('config_designs_print_button')){
			$data['config_print_button']=$this->config->get('config_designs_print_button');			
		}else{
			$data['config_print_button']='';
		}
		if(isset($this->request->post['config_upload_text'])){
			$data['config_upload_text']=$this->request->post['config_upload_text'];		
		}elseif($this->config->get('config_designs_upload_text')){
			$data['config_upload_text']=$this->config->get('config_designs_upload_text');			
		}else{
			$data['config_upload_text']='';
		}
		
		if(isset($this->request->post['config_upload_designs'])){
			$data['config_upload_designs']=$this->request->post['config_upload_designs'];		
		}elseif($this->config->get('config_designs_upload_designs')){
			$data['config_upload_designs']=$this->config->get('config_designs_upload_designs');			
		}else{
			$data['config_upload_designs']='';
		}
		if(isset($this->request->post['config_zoom'])){
			$data['config_zoom']=$this->request->post['config_zoom'];		
		}elseif($this->config->get('config_designs_zoom')){
			$data['config_zoom']=$this->config->get('config_designs_zoom');			
		}else{
			$data['config_zoom']='1.1';
		}

		if(isset($this->request->post['config_zoom_max'])){
			$data['config_zoom_max']=$this->request->post['config_zoom_max'];		
		}elseif($this->config->get('config_designs_zoom_max')){
			$data['config_zoom_max']=$this->config->get('config_designs_zoom_max');			
		}else{
			$data['config_zoom_max']='3';
		}

		if(isset($this->request->post['config_padding_controls'])){
			$data['config_padding_controls']=$this->request->post['config_padding_controls'];
		}elseif($this->config->get('config_designs_padding_controls')){
			$data['config_padding_controls']=$this->config->get('config_designs_padding_controls');
		}else{
			$data['config_padding_controls']='0';
		}

		if(isset($this->request->post['config_replace_initial_elements'])){
			$data['config_replace_initial_elements']=$this->request->post['config_replace_initial_elements'];
		}elseif($this->config->get('config_designs_replace_initial_elements')){
			$data['config_replace_initial_elements']=$this->config->get('config_designs_replace_initial_elements');
		}else{
			$data['config_replace_initial_elements']='';
		}

		if(isset($this->request->post['config_instagram_client_id'])){
			$data['config_instagram_client_id']=$this->request->post['config_instagram_client_id'];		
		}elseif($this->config->get('config_designs_instagram_client_id')){
			$data['config_instagram_client_id']=$this->config->get('config_designs_instagram_client_id');			
		}else{
			$data['config_instagram_client_id']='';
		}
		
		if(isset($this->request->post['config_facebook_app_id'])){
			$data['config_facebook_app_id']=$this->request->post['config_facebook_app_id'];		
		}elseif($this->config->get('config_designs_facebook_app_id')){
			$data['config_facebook_app_id']=$this->config->get('config_designs_facebook_app_id');			
		}else{
			$data['config_facebook_app_id']='';
		}
		if(isset($this->request->post['config_designs_parameter_x'])){
			$data['config_designs_parameter_x']=$this->request->post['config_designs_parameter_x'];		
		}elseif($this->config->get('config_designs_parameter_x')){
			$data['config_designs_parameter_x']=$this->config->get('config_designs_parameter_x');			
		}else{
			$data['config_designs_parameter_x']= 0;
		}
		if(isset($this->request->post['config_designs_parameter_y'])){
			$data['config_designs_parameter_y']=$this->request->post['config_designs_parameter_y'];		
		}elseif($this->config->get('config_designs_parameter_y')){
			$data['config_designs_parameter_y']=$this->config->get('config_designs_parameter_y');			
		}else{
			$data['config_designs_parameter_y']= 0;
		}

		if(isset($this->request->post['config_designs_parameter_z'])){
			$data['config_designs_parameter_z']=$this->request->post['config_designs_parameter_z'];		
		}elseif($this->config->get('config_designs_parameter_z')){
			$data['config_designs_parameter_z']=$this->config->get('config_designs_parameter_z');			
		}else{
			$data['config_designs_parameter_z']= -1;
		}

		if(isset($this->request->post['config_designs_parameter_colors'])){
			$data['config_designs_parameter_colors']=$this->request->post['config_designs_parameter_colors'];
		}elseif($this->config->get('config_designs_parameter_colors')){
			$data['config_designs_parameter_colors']=$this->config->get('config_designs_parameter_colors');
		}else{
			$data['config_designs_parameter_colors']= 0;
		}

		if(isset($this->request->post['config_designs_parameter_price'])){
			$data['config_designs_parameter_price']=$this->request->post['config_designs_parameter_price'];		
		}elseif($this->config->get('config_designs_parameter_price')){
			$data['config_designs_parameter_price']=$this->config->get('config_designs_parameter_price');			
		}else{
			$data['config_designs_parameter_price']= 0;
		}
		if(isset($this->request->post['config_designs_parameter_auto_center'])){
			$data['config_designs_parameter_auto_center']=$this->request->post['config_designs_parameter_auto_center'];		
		}elseif($this->config->get('config_designs_parameter_auto_center')){
			$data['config_designs_parameter_auto_center']=$this->config->get('config_designs_parameter_auto_center');			
		}else{
			$data['config_designs_parameter_auto_center']='';
		}
		
		if(isset($this->request->post['config_designs_parameter_draggable'])){
			$data['config_designs_parameter_draggable']=$this->request->post['config_designs_parameter_draggable'];		
		}elseif($this->config->get('config_designs_parameter_draggable')){
			$data['config_designs_parameter_draggable']=$this->config->get('config_designs_parameter_draggable');			
		}else{
			$data['config_designs_parameter_draggable']='';
		}
		if(isset($this->request->post['config_designs_parameter_rotatable'])){
			$data['config_designs_parameter_rotatable']=$this->request->post['config_designs_parameter_rotatable'];		
		}elseif($this->config->get('config_designs_parameter_rotatable')){
			$data['config_designs_parameter_rotatable']=$this->config->get('config_designs_parameter_rotatable');			
		}else{
			$data['config_designs_parameter_rotatable']='';
		}
		if(isset($this->request->post['config_designs_parameter_resizable'])){
			$data['config_designs_parameter_resizable']=$this->request->post['config_designs_parameter_resizable'];		
		}elseif($this->config->get('config_designs_parameter_resizable')){
			$data['config_designs_parameter_resizable']=$this->config->get('config_designs_parameter_resizable');			
		}else{
			$data['config_designs_parameter_resizable']='';
		}
		if(isset($this->request->post['config_designs_parameter_zchangeable'])){
			$data['config_designs_parameter_zchangeable']=$this->request->post['config_designs_parameter_zchangeable'];		
		}elseif($this->config->get('config_designs_parameter_zchangeable')){
			$data['config_designs_parameter_zchangeable']=$this->config->get('config_designs_parameter_zchangeable');			
		}else{
			$data['config_designs_parameter_zchangeable']='';
		}
		if(isset($this->request->post['config_designs_topped'])){
			$data['config_designs_topped']=$this->request->post['config_designs_topped'];		
		}elseif($this->config->get('config_designs_topped')){
			$data['config_designs_topped']=$this->config->get('config_designs_topped');			
		}else{
			$data['config_designs_topped']='';
		}
		if(isset($this->request->post['config_designs_parameter_autoselect'])){
			$data['config_designs_parameter_autoselect']=$this->request->post['config_designs_parameter_autoselect'];		
		}elseif($this->config->get('config_designs_parameter_autoselect')){
			$data['config_designs_parameter_autoselect']=$this->config->get('config_designs_parameter_autoselect');			
		}else{
			$data['config_designs_parameter_autoselect']='';
		}
		if(isset($this->request->post['config_designs_parameter_replace'])){
			$data['config_designs_parameter_replace']=$this->request->post['config_designs_parameter_replace'];		
		}elseif($this->config->get('config_designs_parameter_replace')){
			$data['config_designs_parameter_replace']=$this->config->get('config_designs_parameter_replace');			
		}else{
			$data['config_designs_parameter_replace']='';
		}
		if(isset($this->request->post['config_designs_parameter_clipping'])){
			$data['config_designs_parameter_clipping']=$this->request->post['config_designs_parameter_clipping'];		
		}elseif($this->config->get('config_designs_parameter_clipping')){
			$data['config_designs_parameter_clipping']=$this->config->get('config_designs_parameter_clipping');			
		}else{
			$data['config_designs_parameter_clipping']='';
		}
		if(isset($this->request->post['config_designs_parameter_bounding_box'])){
			$data['config_designs_parameter_bounding_box']=$this->request->post['config_designs_parameter_bounding_box'];		
		}elseif($this->config->get('config_designs_parameter_bounding_box')){
			$data['config_designs_parameter_bounding_box']=$this->config->get('config_designs_parameter_bounding_box');			
		}else{
			$data['config_designs_parameter_bounding_box']='';
		}
		if(isset($this->request->post['config_bounding_box_target'])){
			$data['config_bounding_box_target']=$this->request->post['config_bounding_box_target'];		
		}elseif($this->config->get('config_designs_bounding_box_target')){
			$data['config_bounding_box_target']=$this->config->get('config_designs_bounding_box_target');			
		}else{
			$data['config_bounding_box_target']='';
		}
		if(isset($this->request->post['config_text_bounding_box_target'])){
			$data['config_text_bounding_box_target']=$this->request->post['config_text_bounding_box_target'];		
		}elseif($this->config->get('config_designs_text_bounding_box_target')){
			$data['config_text_bounding_box_target']=$this->config->get('config_designs_text_bounding_box_target');			
		}else{
			$data['config_text_bounding_box_target']='';
		}
		if(isset($this->request->post['config_bounding_box_x'])){
			$data['config_bounding_box_x']=$this->request->post['config_bounding_box_x'];		
		}elseif($this->config->get('config_designs_bounding_box_x')){
			$data['config_bounding_box_x']=$this->config->get('config_designs_bounding_box_x');			
		}else{
			$data['config_bounding_box_x']='';
		}
		if(isset($this->request->post['config_bounding_box_y'])){
			$data['config_bounding_box_y']=$this->request->post['config_bounding_box_y'];		
		}elseif($this->config->get('config_designs_bounding_box_y')){
			$data['config_bounding_box_y']=$this->config->get('config_designs_bounding_box_y');			
		}else{
			$data['config_bounding_box_y']='';
		}
		if(isset($this->request->post['config_bounding_box_width'])){
			$data['config_bounding_box_width']=$this->request->post['config_bounding_box_width'];		
		}elseif($this->config->get('config_designs_bounding_box_width')){
			$data['config_bounding_box_width']=$this->config->get('config_designs_bounding_box_width');			
		}else{
			$data['config_bounding_box_width']='';
		}
		if(isset($this->request->post['config_bounding_box_height'])){
			$data['config_bounding_box_height']=$this->request->post['config_bounding_box_height'];		
		}elseif($this->config->get('config_designs_bounding_box_height')){
			$data['config_bounding_box_height']=$this->config->get('config_designs_bounding_box_height');			
		}else{
			$data['config_bounding_box_height']='';
		}
		if(isset($this->request->post['config_min_width'])){
			$data['config_min_width']=$this->request->post['config_min_width'];		
		}elseif($this->config->get('config_designs_min_width')){
			$data['config_min_width']=$this->config->get('config_designs_min_width');			
		}else{
			$data['config_min_width']='';
		}
		if(isset($this->request->post['config_min_height'])){
			$data['config_min_height']=$this->request->post['config_min_height'];		
		}elseif($this->config->get('config_designs_min_height')){
			$data['config_min_height']=$this->config->get('config_designs_min_height');			
		}else{
			$data['config_min_height']='';
		}
		if(isset($this->request->post['config_max_width'])){
			$data['config_max_width']=$this->request->post['config_max_width'];		
		}elseif($this->config->get('config_designs_max_width')){
			$data['config_max_width']=$this->config->get('config_designs_max_width');			
		}else{
			$data['config_max_width']='';
		}
		if(isset($this->request->post['config_max_height'])){
			$data['config_max_height']=$this->request->post['config_max_height'];		
		}elseif($this->config->get('config_designs_max_height')){
			$data['config_max_height']=$this->config->get('config_designs_max_height');			
		}else{
			$data['config_max_height']='';
		}
		if(isset($this->request->post['config_resize_width'])){
			$data['config_resize_width']=$this->request->post['config_resize_width'];		
		}elseif($this->config->get('config_designs_resize_width')){
			$data['config_resize_width']=$this->config->get('config_designs_resize_width');			
		}else{
			$data['config_resize_width']='';
		}
		if(isset($this->request->post['config_resize_height'])){
			$data['config_resize_height']=$this->request->post['config_resize_height'];		
		}elseif($this->config->get('config_designs_resize_height')){
			$data['config_resize_height']=$this->config->get('config_designs_resize_height');			
		}else{
			$data['config_resize_height']='';
		}
		if(isset($this->request->post['config_text_x_position'])){
			$data['config_text_x_position']=$this->request->post['config_text_x_position'];		
		}elseif($this->config->get('config_designs_text_x_position')){
			$data['config_text_x_position']=$this->config->get('config_designs_text_x_position');			
		}else{
			$data['config_text_x_position']=0;
		}
		if(isset($this->request->post['config_text_y_position'])){
			$data['config_text_y_position']=$this->request->post['config_text_y_position'];		
		}elseif($this->config->get('config_designs_text_y_position')){
			$data['config_text_y_position']=$this->config->get('config_designs_text_y_position');			
		}else{
			$data['config_text_y_position']=0;
		}
		if(isset($this->request->post['config_text_z_position'])){
			$data['config_text_z_position']=$this->request->post['config_text_z_position'];		
		}elseif($this->config->get('config_designs_text_z_position')){
			$data['config_text_z_position']=$this->config->get('config_designs_text_z_position');			
		}else{
			$data['config_text_z_position']='';
		}

        if(isset($this->request->post['config_text_design_color'])){
			$data['config_text_design_color']=$this->request->post['config_text_design_color'];
		}elseif($this->config->get('config_designs_text_design_color')){
			$data['config_text_design_color']=$this->config->get('config_designs_text_design_color');
		}else{
			$data['config_text_design_color']='';
		}

		if(isset($this->request->post['config_text_replace'])){
			$data['config_text_replace']=$this->request->post['config_text_replace'];		
		}elseif($this->config->get('config_designs_text_replace')){
			$data['config_text_replace']=$this->config->get('config_designs_text_replace');			
		}else{
			$data['config_text_replace']='';
		}
		if(isset($this->request->post['config_text_design_price'])){
			$data['config_text_design_price']=$this->request->post['config_text_design_price'];		
		}elseif($this->config->get('config_designs_text_design_price')){
			$data['config_text_design_price']=$this->config->get('config_designs_text_design_price');			
		}else{
			$data['config_text_design_price']= 0;
		}
		if(isset($this->request->post['config_text_auto_center'])){
			$data['config_text_auto_center']=$this->request->post['config_text_auto_center'];		
		}elseif($this->config->get('config_designs_text_auto_center')){
			$data['config_text_auto_center']=$this->config->get('config_designs_text_auto_center');			
		}else{
			$data['config_text_auto_center']=0;
		}
		if(isset($this->request->post['config_text_draggable'])){
			$data['config_text_draggable']=$this->request->post['config_text_draggable'];		
		}elseif($this->config->get('config_designs_text_draggable')){
			$data['config_text_draggable']=$this->config->get('config_designs_text_draggable');			
		}else{
			$data['config_text_draggable']='';
		}
		if(isset($this->request->post['config_text_rotatable'])){
			$data['config_text_rotatable']=$this->request->post['config_text_rotatable'];		
		}elseif($this->config->get('config_designs_text_rotatable')){
			$data['config_text_rotatable']=$this->config->get('config_designs_text_rotatable');			
		}else{
			$data['config_text_rotatable']='';
		}
		if(isset($this->request->post['config_text_resizeable'])){
			$data['config_text_resizeable']=$this->request->post['config_text_resizeable'];		
		}elseif($this->config->get('config_designs_text_resizeable')){
			$data['config_text_resizeable']=$this->config->get('config_designs_text_resizeable');			
		}else{
			$data['config_text_resizeable']='';
		}
		if(isset($this->request->post['config_text_zchangeable'])){
			$data['config_text_zchangeable']=$this->request->post['config_text_zchangeable'];		
		}elseif($this->config->get('config_designs_text_zchangeable')){
			$data['config_text_zchangeable']=$this->config->get('config_designs_text_zchangeable');			
		}else{
			$data['config_text_zchangeable']=0;
		}
		if(isset($this->request->post['config_text_topped'])){
			$data['config_text_topped']=$this->request->post['config_text_topped'];		
		}elseif($this->config->get('config_designs_text_topped')){
			$data['config_text_topped']=$this->config->get('config_designs_text_topped');			
		}else{
			$data['config_text_topped']=0;
		}
		if(isset($this->request->post['config_designs_text_autoselect'])){
			$data['config_designs_text_autoselect']=$this->request->post['config_designs_text_autoselect'];		
		}elseif($this->config->get('config_designs_text_autoselect')){
			$data['config_designs_text_autoselect']=$this->config->get('config_designs_text_autoselect');			
		}else{
			$data['config_designs_text_autoselect']=0;
		}
		if(isset($this->request->post['config_designs_text_replace'])){
			$data['config_designs_text_replace']=$this->request->post['config_designs_text_replace'];		
		}elseif($this->config->get('config_designs_text_replace')){
			$data['config_designs_text_replace']=$this->config->get('config_designs_text_replace');			
		}else{
			$data['config_designs_text_replace']='';
		}
		if(isset($this->request->post['config_designs_text_clipping'])){
			$data['config_designs_text_clipping']=$this->request->post['config_designs_text_clipping'];		
		}elseif($this->config->get('config_designs_text_clipping')){
			$data['config_designs_text_clipping']=$this->config->get('config_designs_text_clipping');			
		}else{
			$data['config_designs_text_clipping']='';
		}
		if(isset($this->request->post['config_designs_text_bounding_box'])){
			$data['config_designs_text_bounding_box']=$this->request->post['config_designs_text_bounding_box'];		
		}elseif($this->config->get('config_designs_text_bounding_box')){
			$data['config_designs_text_bounding_box']=$this->config->get('config_designs_text_bounding_box');			
		}else{
			$data['config_designs_text_bounding_box']='';
		}
		if(isset($this->request->post['config_text_curved'])){
			$data['config_text_curved']=$this->request->post['config_text_curved'];		
		}elseif($this->config->get('config_designs_text_curved')){
			$data['config_text_curved']=$this->config->get('config_designs_text_curved');			
		}else{
			$data['config_text_curved']='';
		}		
		if(isset($this->request->post['config_text_text_characters'])){
			$data['config_text_text_characters']=$this->request->post['config_text_text_characters'];		
		}elseif($this->config->get('config_designs_text_text_characters')){
			$data['config_text_text_characters']=$this->config->get('config_designs_text_text_characters');			
		}else{
			$data['config_text_text_characters'] = 0;
		}
		if(isset($this->request->post['config_text_patternable'])){
			$data['config_text_patternable']=$this->request->post['config_text_patternable'];		
		}elseif($this->config->get('config_designs_text_patternable')){
			$data['config_text_patternable']=$this->config->get('config_designs_text_patternable');			
		}else{
			$data['config_text_patternable']='';
		}
		if(isset($this->request->post['config_text_bounding_x_position'])){
			$data['config_text_bounding_x_position']=$this->request->post['config_text_bounding_x_position'];		
		}elseif($this->config->get('config_designs_text_bounding_x_position')){
			$data['config_text_bounding_x_position']=$this->config->get('config_designs_text_bounding_x_position');			
		}else{
			$data['config_text_bounding_x_position']='';
		}
		if(isset($this->request->post['config_text_bounding_y_position'])){
			$data['config_text_bounding_y_position']=$this->request->post['config_text_bounding_y_position'];		
		}elseif($this->config->get('config_designs_text_bounding_y_position')){
			$data['config_text_bounding_y_position']=$this->config->get('config_designs_text_bounding_y_position');			
		}else{
			$data['config_text_bounding_y_position']='';
		}
		if(isset($this->request->post['config_text_bounding_width'])){
			$data['config_text_bounding_width']=$this->request->post['config_text_bounding_width'];		
		}elseif($this->config->get('config_designs_text_bounding_width')){
			$data['config_text_bounding_width']=$this->config->get('config_designs_text_bounding_width');			
		}else{
			$data['config_text_bounding_width']='';
		}
		if(isset($this->request->post['config_text_bounding_height'])){
			$data['config_text_bounding_height']=$this->request->post['config_text_bounding_height'];		
		}elseif($this->config->get('config_designs_text_bounding_height')){
			$data['config_text_bounding_height']=$this->config->get('config_designs_text_bounding_height');			
		}else{
			$data['config_text_bounding_height']='';
		}

        /*Advanced Color Config*/

        if(isset($this->request->post['config_enable_text_color_prices'])){
            $data['config_enable_text_color_prices']=$this->request->post['config_enable_text_color_prices'];
        }elseif($this->config->get('config_designs_enable_text_color_prices')){
            $data['config_enable_text_color_prices']=$this->config->get('config_designs_enable_text_color_prices');
        }else{
            $data['config_enable_text_color_prices']='';
        }

        if(isset($this->request->post['config_enable_image_color_prices'])){
            $data['config_enable_image_color_prices']=$this->request->post['config_enable_image_color_prices'];
        }elseif($this->config->get('config_designs_enable_image_color_prices')){
            $data['config_enable_image_color_prices']=$this->config->get('config_designs_enable_image_color_prices');
        }else{
            $data['config_enable_image_color_prices']='';
        }
		
        if(isset($this->request->post['config_designs_color_prices'])){
            $data['config_designs_color_prices']=$this->request->post['config_designs_color_prices'];
        }elseif($this->config->get('config_designs_color_prices')){
            $data['config_designs_color_prices']=$this->config->get('config_designs_color_prices');
        }else{
            $data['config_designs_color_prices']='';
        }
		
        if(isset($this->request->post['config_designs_filters'])){
            $data['config_designs_filters']=$this->request->post['config_designs_filters'];
        }elseif($this->config->get('config_designs_filters')){
            $data['config_designs_filters']=$this->config->get('config_designs_filters');
        }else{
            $data['config_designs_filters']= array();
        }

        if(isset($this->request->post['config_view_selection_position'])){
            $data['config_view_selection_position']=$this->request->post['config_view_selection_position'];
        }elseif($this->config->get('config_designs_view_selection_position')){
            $data['config_view_selection_position']=$this->config->get('config_designs_view_selection_position');
        }else{
            $data['config_view_selection_position']= '';
        }
		
        if(isset($this->request->post['config_custom_texts_parameter_textalign'])){
            $data['config_custom_texts_parameter_textalign']=$this->request->post['config_custom_texts_parameter_textalign'];
        }elseif($this->config->get('config_designs_custom_texts_parameter_textalign')){
            $data['config_custom_texts_parameter_textalign']=$this->config->get('config_designs_custom_texts_parameter_textalign');
        }else{
            $data['config_custom_texts_parameter_textalign']= '';
        }

        if(isset($this->request->post['config_curved_spacing'])){
            $data['config_curved_spacing']=$this->request->post['config_curved_spacing'];
        }elseif($this->config->get('config_designs_curved_spacing')){
            $data['config_curved_spacing']=$this->config->get('config_designs_curved_spacing');
        }else{
            $data['config_curved_spacing']= '';
        }
        if(isset($this->request->post['config_curve_radius'])){
            $data['config_curve_radius']=$this->request->post['config_curve_radius'];
        }elseif($this->config->get('config_designs_curve_radius')){
            $data['config_curve_radius']=$this->config->get('config_designs_curve_radius');
        }else{
            $data['config_curve_radius']= '';
        }

        if(isset($this->request->post['config_curve_reverse'])){
            $data['config_curve_reverse']=$this->request->post['config_curve_reverse'];
        }elseif($this->config->get('config_designs_curve_reverse')){
            $data['config_curve_reverse']=$this->config->get('config_designs_curve_reverse');
        }else{
            $data['config_curve_reverse']= '';
        }
		$data['header'] = $this->load->controller('common/header');
		$data['column_left'] = $this->load->controller('common/column_left');
		$data['footer'] = $this->load->controller('common/footer');
		$this->response->setOutput($this->load->view('catalog/fnt_setting.tpl', $data));
	}
	
	protected function validate() {
		if (!$this->user->hasPermission('modify', 'catalog/fnt_setting')) {
			$this->error['warning'] = $this->language->get('error_permission');
		}	
		return true;	
	}
}