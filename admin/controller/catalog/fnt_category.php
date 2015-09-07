<?php 
class ControllerCatalogFntCategory extends Controller { 
	private $error = array();

	public function index() {
		$this->load->language('catalog/fnt_category');
		$this->document->setTitle($this->language->get('heading_title'));

		$this->load->model('catalog/fnt_category');

		$this->getList();
	}

	public function insert() {
		$this->load->language('catalog/fnt_category');

		$this->document->setTitle($this->language->get('heading_title'));

		$this->load->model('catalog/fnt_category');
		
		if (($this->request->server['REQUEST_METHOD'] == 'POST') && $this->validateForm()) {
			$this->model_catalog_fnt_category->addCategory($this->request->post);
			
			$this->session->data['success'] = $this->language->get('text_success');

			$url = '';

			if (isset($this->request->get['page'])) {
				$url .= '&page=' . $this->request->get['page'];
			}

			$this->response->redirect($this->url->link('catalog/fnt_category', 'token=' . $this->session->data['token'] . $url, 'SSL')); 
		}
		$this->getForm();
	}

	public function update() {
		$this->load->language('catalog/fnt_category');

		$this->document->setTitle($this->language->get('heading_title'));

		$this->load->model('catalog/fnt_category');

		if (($this->request->server['REQUEST_METHOD'] == 'POST') && $this->validateForm()) {
			$this->model_catalog_fnt_category->editCategory($this->request->get['category_design_id'], $this->request->post);

			$this->session->data['success'] = $this->language->get('text_success');

			$url = '';

			if (isset($this->request->get['page'])) {
				$url .= '&page=' . $this->request->get['page'];
			}

			$this->response->redirect($this->url->link('catalog/fnt_category', 'token=' . $this->session->data['token'] . $url, 'SSL'));
		}

		$this->getForm();
	}

	public function delete() {
		$this->load->language('catalog/fnt_category');

		$this->document->setTitle($this->language->get('heading_title'));

		$this->load->model('catalog/fnt_category');

		if (isset($this->request->post['selected']) && $this->validateDelete()) {
			foreach ($this->request->post['selected'] as $category_design_id) {
				$this->model_catalog_fnt_category->deleteCategory($category_design_id);
			}

			$this->session->data['success'] = $this->language->get('text_success');

			$url = '';

			if (isset($this->request->get['page'])) {
				$url .= '&page=' . $this->request->get['page'];
			}

			$this->response->redirect($this->url->link('catalog/fnt_category', 'token=' . $this->session->data['token'] . $url, 'SSL'));
		}

		$this->getList();
	}
	protected function getList() {
		//$this->document->addScript('view/javascript/bootstrap/js/bootstrap.js');
		//$this->document->addStyle('view/javascript/font-awesome/css/font-awesome.min.css');
		//$this->document->addStyle('view/javascript/bootstrap/css/bootstrap.css');
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
			'separator' => ':',
			'href' => $this->url->link('catalog/fnt_category', 'token=' . $this->session->data['token'] . $url, 'SSL')
		);

		$data['insert'] = $this->url->link('catalog/fnt_category/insert', 'token=' . $this->session->data['token'] . $url, 'SSL');
		$data['delete'] = $this->url->link('catalog/fnt_category/delete', 'token=' . $this->session->data['token'] . $url, 'SSL');
		
		$data['categories'] = array();

		$filter_data = array(
			'start' => ($page - 1) * $this->config->get('config_limit_admin'),
			'limit' => $this->config->get('config_limit_admin')
		);

		$category_clipart_total = $this->model_catalog_fnt_category->getTotalCategories();
		$results = $this->model_catalog_fnt_category->getCategories($filter_data);

//        echo "<pre>";
//        print_r($results);
//        echo "</pre>";
//        exit();


        foreach ($results as $result) {
			$data['categories'][] = array(
				'category_design_id' => $result['category_design_id'],
				'name'        => $result['name'],
				'sort_order'  => $result['sort_order'],
				'status'  => $result['status']==1?'Enable':'Disable',
				'edit'        => $this->url->link('catalog/fnt_category/update', 'token=' . $this->session->data['token'] . '&category_design_id=' . $result['category_design_id'] . $url, 'SSL'),
				'delete'      => $this->url->link('catalog/fnt_category/delete', 'token=' . $this->session->data['token'] . '&category_design_id=' . $result['category_design_id'] . $url, 'SSL')
			);
		}

		$data['heading_title'] = $this->language->get('heading_title');
		$data['text_list'] = $this->language->get('text_list');

		$data['text_no_results'] = $this->language->get('text_no_results');
		
		$data['column_name'] = $this->language->get('column_name');
		$data['column_sort_order'] = $this->language->get('column_sort_order');
		$data['column_status'] = $this->language->get('column_status');
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
		$pagination->url = $this->url->link('catalog/fnt_category', 'token=' . $this->session->data['token'] . $url . '&page={page}', 'SSL');

		$data['pagination'] = $pagination->render();
		
		$data['results'] = sprintf($this->language->get('text_pagination'), ($category_clipart_total) ? (($page - 1) * $this->config->get('config_limit_admin')) + 1 : 0, ((($page - 1) * $this->config->get('config_limit_admin')) > ($category_clipart_total - $this->config->get('config_limit_admin'))) ? $category_clipart_total : ((($page - 1) * $this->config->get('config_limit_admin')) + $this->config->get('config_limit_admin')), $category_clipart_total, ceil($category_clipart_total / $this->config->get('config_limit_admin')));



		$data['header'] = $this->load->controller('common/header');
		$data['column_left'] = $this->load->controller('common/column_left');
		$data['footer'] = $this->load->controller('common/footer');
				
		$this->response->setOutput($this->load->view('catalog/fnt_category_list.tpl', $data));
	}

	protected function getForm() {
		$data['heading_title'] = $this->language->get('heading_title');
		$data['text_form'] = !isset($this->request->get['category_id']) ? $this->language->get('text_add') : $this->language->get('text_edit');
		$data['text_enabled'] = $this->language->get('text_enabled');
		$data['text_disabled'] = $this->language->get('text_disabled');
		
		$data['entry_name'] = $this->language->get('entry_name');
		$data['entry_sort_order'] = $this->language->get('entry_sort_order');
		$data['entry_status'] = $this->language->get('entry_status');
		$data['button_save'] = $this->language->get('button_save');
		$data['button_cancel'] = $this->language->get('button_cancel');
		$data['tab_general'] = $this->language->get('tab_general');
		$data['tab_data'] = $this->language->get('tab_data');

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
			'separator' => ':',
			'href' => $this->url->link('catalog/fnt_category', 'token=' . $this->session->data['token'], 'SSL')
		);

		if (!isset($this->request->get['category_design_id'])) {
			$data['action'] = $this->url->link('catalog/fnt_category/insert', 'token=' . $this->session->data['token'], 'SSL');
		} else {
			$data['action'] = $this->url->link('catalog/fnt_category/update', 'token=' . $this->session->data['token'] . '&category_design_id=' . $this->request->get['category_design_id'], 'SSL');
		}

		$data['cancel'] = $this->url->link('catalog/fnt_category', 'token=' . $this->session->data['token'], 'SSL');

		if (isset($this->request->get['category_design_id']) && ($this->request->server['REQUEST_METHOD'] != 'POST')) {
			$category_clipart_info = $this->model_catalog_fnt_category->getCategory($this->request->get['category_design_id']);
		}

		$data['token'] = $this->session->data['token'];

		$this->load->model('localisation/language');
		$this->load->model('tool/image');
		$data['languages'] = $this->model_localisation_language->getLanguages();
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
		
		if (isset($this->request->post['category_description'])) {
			$data['category_description'] = $this->request->post['category_description'];
		} elseif (!empty($category_clipart_info)) {
			$data['category_description'] = $this->model_catalog_fnt_category->getCategoryDescriptions($this->request->get['category_design_id']);
		} else {
			$data['category_description'] = array();
		}
		$data['header'] = $this->load->controller('common/header');
		$data['column_left'] = $this->load->controller('common/column_left');
		$data['footer'] = $this->load->controller('common/footer');
				
		$this->response->setOutput($this->load->view('catalog/fnt_category_form.tpl', $data));	
	}

	protected function validateForm() {
		if (!$this->user->hasPermission('modify', 'catalog/fnt_category')) {
			$this->error['warning'] = $this->language->get('error_permission');
		}

		foreach ($this->request->post['category_description'] as $language_id => $value) {
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
		if (!$this->user->hasPermission('modify', 'catalog/fnt_category')) {
			$this->error['warning'] = $this->language->get('error_permission');
		}

		return !$this->error;
	}

	public function autocomplete() {
		$json = array();

		if (isset($this->request->get['filter_name'])) {
			$this->load->model('catalog/fnt_category');

			$filter_data = array(
				'filter_name' => $this->request->get['filter_name'],
				'start'       => 0,
				'limit'       => 5
			);

			$results = $this->model_catalog_fnt_category->getCategories($filter_data);

			foreach ($results as $result) {
				$json[] = array(
					'category_design_id' => $result['category_design_id'], 
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