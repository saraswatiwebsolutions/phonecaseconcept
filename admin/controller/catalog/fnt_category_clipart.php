<?php 
class ControllerCatalogFntCategoryClipart extends Controller { 
	private $error = array();

	public function index() {
		$this->load->language('catalog/fnt_category_clipart');
		$this->document->setTitle($this->language->get('heading_title'));

		$this->load->model('catalog/fnt_category_clipart');

		$this->getList();
	}

	public function insert() {
		$this->load->language('catalog/fnt_category_clipart');
		$this->document->addScript('view/javascript/jquery/jscolor/jscolor.js');
		$this->document->setTitle($this->language->get('heading_title'));

		$this->load->model('catalog/fnt_category_clipart');
		
		if (($this->request->server['REQUEST_METHOD'] == 'POST') && $this->validateForm()) {
			$this->model_catalog_fnt_category_clipart->addCategoryClipart($this->request->post);
			
			$this->session->data['success'] = $this->language->get('text_success');

			$url = '';

			if (isset($this->request->get['page'])) {
				$url .= '&page=' . $this->request->get['page'];
			}

			$this->response->redirect($this->url->link('catalog/fnt_category_clipart', 'token=' . $this->session->data['token'] . $url, 'SSL')); 
		}
		$this->getForm();
	}

	public function update() {
		$this->load->language('catalog/fnt_category_clipart');
		$this->document->addScript('view/javascript/jquery/jscolor/jscolor.js');
		$this->document->setTitle($this->language->get('heading_title'));

		$this->load->model('catalog/fnt_category_clipart');

		if (($this->request->server['REQUEST_METHOD'] == 'POST') && $this->validateForm()) {
			$this->model_catalog_fnt_category_clipart->editCategoryClipart($this->request->get['category_clipart_id'], $this->request->post);

			$this->session->data['success'] = $this->language->get('text_success');

			$url = '';

			if (isset($this->request->get['page'])) {
				$url .= '&page=' . $this->request->get['page'];
			}

			$this->response->redirect($this->url->link('catalog/fnt_category_clipart', 'token=' . $this->session->data['token'] . $url, 'SSL'));
		}

		$this->getForm();
	}

	public function delete() {
		$this->load->language('catalog/fnt_category_clipart');

		$this->document->setTitle($this->language->get('heading_title'));

		$this->load->model('catalog/fnt_category_clipart');

		if (isset($this->request->post['selected']) && $this->validateDelete()) {
			foreach ($this->request->post['selected'] as $category_clipart_id) {
				$this->model_catalog_fnt_category_clipart->deleteCategoryClipart($category_clipart_id);
			}

			$this->session->data['success'] = $this->language->get('text_success');

			$url = '';

			if (isset($this->request->get['page'])) {
				$url .= '&page=' . $this->request->get['page'];
			}

			$this->response->redirect($this->url->link('catalog/fnt_category_clipart', 'token=' . $this->session->data['token'] . $url, 'SSL'));
		}

		$this->getList();
	}
	protected function getList() {
		if (isset($this->request->get['page'])) {
			$page = $this->request->get['page'];
		} else {
			$page = 1;
		}

		$url = '';

		if (isset($this->request->get['page'])) {
			$url .= '&page=' . $this->request->get['page'];
		}

		$data['breadcrumbs'] = array();

		$data['breadcrumbs'][] = array(
			'text' => $this->language->get('text_home'),
			'separator' => false,
			'href' => $this->url->link('common/dashboard', 'token=' . $this->session->data['token'], 'SSL')
		);

		$data['breadcrumbs'][] = array(
			'text' => $this->language->get('heading_title'),
			'separator' => '/',
			'href' => $this->url->link('catalog/fnt_category_clipart', 'token=' . $this->session->data['token'] . $url, 'SSL')
		);

		$data['insert'] = $this->url->link('catalog/fnt_category_clipart/insert', 'token=' . $this->session->data['token'] . $url, 'SSL');
		$data['delete'] = $this->url->link('catalog/fnt_category_clipart/delete', 'token=' . $this->session->data['token'] . $url, 'SSL');
		
		$data['categories'] = array();

		$filter_data = array(
			'start' => ($page - 1) * $this->config->get('config_limit_admin'),
			'limit' => $this->config->get('config_limit_admin')
		);

		$category_clipart_total = $this->model_catalog_fnt_category_clipart->getTotalCategoriesClipart();
		$results = $this->model_catalog_fnt_category_clipart->getCategoriesClipart($filter_data);

		foreach ($results as $result) {
			$data['categories'][] = array(
				'category_clipart_id' => $result['category_clipart_id'],
				'name'        => $result['name'],
				'sort_order'  => $result['sort_order'],
				'edit'        => $this->url->link('catalog/fnt_category_clipart/update', 'token=' . $this->session->data['token'] . '&category_clipart_id=' . $result['category_clipart_id'] . $url, 'SSL'),
				'delete'      => $this->url->link('catalog/fnt_category_clipart/delete', 'token=' . $this->session->data['token'] . '&category_clipart_id=' . $result['category_clipart_id'] . $url, 'SSL')
			);
		}

		$data['heading_title'] = $this->language->get('heading_title');
		$data['text_list'] = $this->language->get('text_list');

		$data['text_no_results'] = $this->language->get('text_no_results');
		
		$data['column_name'] = $this->language->get('column_name');
		$data['column_sort_order'] = $this->language->get('column_sort_order');
		$data['column_action'] = $this->language->get('column_action');

		$data['button_add'] = $this->language->get('button_add');
		$data['button_repair'] = $this->language->get('button_repair');
		$data['button_edit'] = $this->language->get('button_edit');
		$data['button_delete'] = $this->language->get('button_delete');
		$data['text_confirm'] = $this->language->get('text_confirm');
		if (isset($this->error['warning'])) {
			$data['error_warning'] = $this->error['warning'];
		} else {
			$data['error_warning'] = '';
		}

		if (isset($this->session->data['success'])) {
			$data['success'] = $this->session->data['success'];

			unset($this->session->data['success']);
		} else {
			$data['success'] = '';
		}

		if (isset($this->request->post['selected'])) {
			$data['selected'] = (array)$this->request->post['selected'];
		} else {
			$data['selected'] = array();
		}

		$pagination = new Pagination();
		$pagination->total = $category_clipart_total;
		$pagination->page = $page;
		$pagination->limit = $this->config->get('config_admin_limit');
		$pagination->url = $this->url->link('catalog/fnt_category_clipart', 'token=' . $this->session->data['token'] . $url . '&page={page}', 'SSL');

		$data['pagination'] = $pagination->render();
		
		$data['results'] = sprintf($this->language->get('text_pagination'), ($category_clipart_total) ? (($page - 1) * $this->config->get('config_limit_admin')) + 1 : 0, ((($page - 1) * $this->config->get('config_limit_admin')) > ($category_clipart_total - $this->config->get('config_limit_admin'))) ? $category_clipart_total : ((($page - 1) * $this->config->get('config_limit_admin')) + $this->config->get('config_limit_admin')), $category_clipart_total, ceil($category_clipart_total / $this->config->get('config_limit_admin')));
		
		$data['header'] = $this->load->controller('common/header');
		$data['column_left'] = $this->load->controller('common/column_left');
		$data['footer'] = $this->load->controller('common/footer');
				
		$this->response->setOutput($this->load->view('catalog/fnt_category_clipart_list.tpl', $data));
	}

	protected function getForm() {
		$data['heading_title'] = $this->language->get('heading_title');
		$data['text_form'] = !isset($this->request->get['category_clipart_id']) ? $this->language->get('text_add') : $this->language->get('text_edit');
		$data['text_enabled'] = $this->language->get('text_enabled');
		$data['text_disabled'] = $this->language->get('text_disabled');		
		$data['entry_name'] = $this->language->get('entry_name');
		$data['entry_sort_order'] = $this->language->get('entry_sort_order');
		$data['entry_status'] = $this->language->get('entry_status');
		$data['button_save'] = $this->language->get('button_save');
		$data['button_cancel'] = $this->language->get('button_cancel');
		$data['tab_general'] = $this->language->get('tab_general');
		$data['tab_data'] = $this->language->get('tab_data');
		//entry
		$data['text_yes'] = $this->language->get('text_yes');
		$data['text_no'] = $this->language->get('text_no');
		$data['text_check'] = $this->language->get('text_check');
		$data['tab_setting'] = $this->language->get('tab_setting');
		$data['entry_name'] = $this->language->get('entry_name');
		$data['entry_price'] = $this->language->get('entry_price');
		$data['entry_image'] = $this->language->get('entry_image');
		$data['entry_category'] = $this->language->get('entry_category');
		$data['entry_sort_order'] = $this->language->get('entry_sort_order');
		$data['entry_status'] = $this->language->get('entry_status');
		$data['text_image_manager'] = $this->language->get('text_image_manager');
		$data['entry_clipart_parameter_x'] = $this->language->get('entry_clipart_parameter_x');
		$data['entry_clipart_parameter_y'] = $this->language->get('entry_clipart_parameter_y');
		$data['entry_clipart_parameter_z'] = $this->language->get('entry_clipart_parameter_z');
		$data['entry_clipart_parameter_scale'] = $this->language->get('entry_clipart_parameter_scale');
		$data['entry_clipart_parameter_colors'] = $this->language->get('entry_clipart_parameter_colors');
		$data['entry_clipart_parameter_price'] = $this->language->get('entry_clipart_parameter_price');
		$data['entry_clipart_parameter_auto_center'] = $this->language->get('entry_clipart_parameter_auto_center');
		$data['entry_clipart_parameter_draggable'] = $this->language->get('entry_clipart_parameter_draggable');
		$data['entry_clipart_parameter_rotatable'] = $this->language->get('entry_clipart_parameter_rotatable');
		$data['entry_clipart_parameter_resizable'] = $this->language->get('entry_clipart_parameter_resizable');
		$data['entry_clipart_parameter_replace'] = $this->language->get('entry_clipart_parameter_replace');
		$data['entry_clipart_parameter_stay_to_top'] = $this->language->get('entry_clipart_parameter_stay_to_top');
		$data['entry_clipart_parameter_auto_select'] = $this->language->get('entry_clipart_parameter_auto_select');
		$data['entry_clipart_parameter_zChangeable'] = $this->language->get('entry_clipart_parameter_zChangeable');
		$data['entry_clipart_parameter_removable'] = $this->language->get('entry_clipart_parameter_removable');
		$data['entry_clipart_parameter_bounding_box_control'] = $this->language->get('entry_clipart_parameter_bounding_box_control');
		$data['entry_clipart_parameter_bounding_box_x'] = $this->language->get('entry_clipart_parameter_bounding_box_x');
		$data['entry_clipart_parameter_bounding_box_y'] = $this->language->get('entry_clipart_parameter_bounding_box_y');
		$data['entry_clipart_parameter_bounding_box_width'] = $this->language->get('entry_clipart_parameter_bounding_box_width');
		$data['entry_clipart_parameter_bounding_box_height'] = $this->language->get('entry_clipart_parameter_bounding_box_height');
		$data['entry_clipart_parameter_bounding_box_by_other'] = $this->language->get('entry_clipart_parameter_bounding_box_by_other');
		$data['text_use_option_main_setting'] = $this->language->get('text_use_option_main_setting');
		$data['text_custom_bounding_box'] = $this->language->get('text_custom_bounding_box');
		$data['text_use_another_element_as_bounding_box'] = $this->language->get('text_use_another_element_as_bounding_box');
		if (isset($this->error['warning'])) {
			$data['error_warning'] = $this->error['warning'];
		} else {
			$data['error_warning'] = '';
		}

		if (isset($this->error['name'])) {
			$data['error_name'] = $this->error['name'];
		} else {
			$data['error_name'] = array();
		}

		if (isset($this->error['meta_title'])) {
			$data['error_meta_title'] = $this->error['meta_title'];
		} else {
			$data['error_meta_title'] = array();
		}	

		$data['breadcrumbs'] = array();

		$data['breadcrumbs'][] = array(
			'text' => $this->language->get('text_home'),
			'separator' => false,
			'href' => $this->url->link('common/dashboard', 'token=' . $this->session->data['token'], 'SSL')
		);

		$data['breadcrumbs'][] = array(
			'text' => $this->language->get('heading_title'),
			'separator' => '/',
			'href' => $this->url->link('catalog/fnt_category_clipart', 'token=' . $this->session->data['token'], 'SSL')
		);

		if (!isset($this->request->get['category_clipart_id'])) {
			$data['action'] = $this->url->link('catalog/fnt_category_clipart/insert', 'token=' . $this->session->data['token'], 'SSL');
		} else {
			$data['action'] = $this->url->link('catalog/fnt_category_clipart/update', 'token=' . $this->session->data['token'] . '&category_clipart_id=' . $this->request->get['category_clipart_id'], 'SSL');
		}

		$data['cancel'] = $this->url->link('catalog/fnt_category_clipart', 'token=' . $this->session->data['token'], 'SSL');

		if (isset($this->request->get['category_clipart_id']) && ($this->request->server['REQUEST_METHOD'] != 'POST')) {
			$category_clipart_info = $this->model_catalog_fnt_category_clipart->getCategoryClipart($this->request->get['category_clipart_id']);
		}

		$data['token'] = $this->session->data['token'];

		$this->load->model('localisation/language');
		$this->load->model('tool/image');
		$data['languages'] = $this->model_localisation_language->getLanguages();

		if (isset($this->request->post['category_clipart_id'])) {
			$data['category_clipart_id'] = $this->request->post['category_clipart_id'];
		} elseif (isset($this->request->get['category_clipart_id'])) {
			$data['category_clipart_id'] = $this->model_catalog_fnt_category_clipart->getCategoryClipartDescriptions($this->request->get['category_clipart_id']);
		} else {
			$data['category_clipart_id'] = array();
		}

		if (isset($this->request->post['sort_order'])) {
			$data['sort_order'] = $this->request->post['sort_order'];
		} elseif (!empty($category_clipart_info)) {
			$data['sort_order'] = $category_clipart_info['sort_order'];
		} else {
			$data['sort_order'] = 0;
		}

		if (isset($this->request->post['status'])) {
			$data['status'] = $this->request->post['status'];
		} elseif (!empty($category_clipart_info)) {
			$data['status'] = $category_clipart_info['status'];
		} else {
			$data['status'] = 1;
		}
		
		if (isset($this->request->post['category_clipart_description'])) {
			$data['category_clipart_description'] = $this->request->post['category_clipart_description'];
		} elseif (!empty($category_clipart_info)) {
			$data['category_clipart_description'] = $this->model_catalog_fnt_category_clipart->getCategoryClipartDescriptions($this->request->get['category_clipart_id']);
		} else {
			$data['category_clipart_description'] = array();
		}
		
		if (isset($this->request->post['parameter'])) {
			$data['parameter'] = $this->request->post['parameter'];
		} elseif (!empty($category_clipart_info)) {
			$data['parameter'] = unserialize($category_clipart_info['parameter']);
		} else {
			$data['parameter'] = array(
				'x' 		 			 => 0,
				'y' 		 			 => 0,
				'z' 				     => -1,
				'scale'      			 => 1,
				'colors'	 			 => '#ffffff',
				'price' 	 			 => 0,
				'auto_center'			 => 1,
				'draggable'  			 => 1,
				'rotatable'  			 => 1,
				'resizable'  			 => 1,
				'replace'  			     => '',
				'auto_select'			 => 0,
				'stay_to_top'			 => 0,
				'zChangeable'			 => 1,
				'removable'  			 => 1,
				'bounding_box_control'   => 0,
				'bounding_box_x'  		 => 0,
				'bounding_box_y' 		 => 0,
				'bounding_box_width'  	 => 0,
				'bounding_box_height'    => 0,
				'bounding_box_by_other'  => '',
				'status'    			 => 0
			);	
		}
		$data['header'] = $this->load->controller('common/header');
		$data['column_left'] = $this->load->controller('common/column_left');
		$data['footer'] = $this->load->controller('common/footer');
				
		$this->response->setOutput($this->load->view('catalog/fnt_category_clipart_form.tpl', $data));	
	}

	protected function validateForm() {
		if (!$this->user->hasPermission('modify', 'catalog/fnt_category_clipart')) {
			$this->error['warning'] = $this->language->get('error_permission');
		}

		foreach ($this->request->post['category_clipart_description'] as $language_id => $value) {
			if ((utf8_strlen($value) < 2) || (utf8_strlen($value) > 255)) {
				$this->error['name'][$language_id] = $this->language->get('error_name');
			}
		}

		if ($this->error && !isset($this->error['warning'])) {
			$this->error['warning'] = $this->language->get('error_warning');
		}

		return !$this->error;
	}

	protected function validateDelete() {
		if (!$this->user->hasPermission('modify', 'catalog/fnt_category_clipart')) {
			$this->error['warning'] = $this->language->get('error_permission');
		}

		return !$this->error;
	}

	public function autocomplete() {
		$json = array();

		if (isset($this->request->get['filter_name'])) {
			$this->load->model('catalog/fnt_category_clipart');

			$filter_data = array(
				'filter_name' => $this->request->get['filter_name'],
				'start'       => 0,
				'limit'       => 5
			);

			$results = $this->model_catalog_fnt_category_clipart->getCategoriesClipart($filter_data);

			foreach ($results as $result) {
				$json[] = array(
					'category_clipart_id' => $result['category_clipart_id'], 
					'name'        => strip_tags(html_entity_decode($result['name'], ENT_QUOTES, 'UTF-8'))
				);
			}		
		}

		$sort_order = array();

		foreach ($json as $key => $value) {
			$sort_order[$key] = $value['name'];
		}

		array_multisort($sort_order, SORT_ASC, $json);

		$this->response->addHeader('Content-Type: application/json');
		$this->response->setOutput(json_encode($json));
	}		
}