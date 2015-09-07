<?php
class ControllerModuleProMegaMenu extends Controller {
	private $error = array();
	public function install(){
		$this->load->model('module/pro_megamenu');
		$this->model_module_pro_megamenu->install();
	}
	public function index() {
		$this->load->model('module/pro_megamenu');
		$data['menu_data'] = $this->model_module_pro_megamenu->getlist();
		$this->load->language('module/pro_megamenu');

		$this->document->setTitle($this->language->get('meta_title'));

		$this->load->model('setting/setting');

		if (($this->request->server['REQUEST_METHOD'] == 'POST') && $this->validate()) {
			$this->save();
			$this->session->data['success'] = $this->language->get('text_success');
			$this->response->redirect($this->url->link('extension/module', 'token=' . $this->session->data['token'], 'SSL'));
		}

		$data['heading_title'] = $this->language->get('meta_title');
		$data['text_edit'] = $this->language->get('text_edit');
		$data['button_save'] = $this->language->get('button_save');
		$data['button_cancel'] = $this->language->get('button_cancel');
		$data['button_remove'] = $this->language->get('button_remove');
		$data['button_add_menu'] = $this->language->get('button_add_menu');
		$data['button_add_option'] = $this->language->get('button_add_option');
		$data['button_remove_option'] = $this->language->get('button_remove_option');

 		if (isset($this->error['warning'])) {
			$data['error_warning'] = $this->error['warning'];
		} else {
			$data['error_warning'] = '';
		}
		if (isset($this->session->data['success'])) {
			$data['success'] = $this->session->data['success'];
			unset($this->session->data['success']);
		}
		$data['breadcrumbs'] = array();
   		$data['breadcrumbs'][] = array(
       		'text'      => $this->language->get('text_home'),
			'href'      => $this->url->link('common/home', 'token=' . $this->session->data['token'], 'SSL'),
      		'separator' => false
   		);

   		$data['breadcrumbs'][] = array(
       		'text'      => $this->language->get('text_module'),
			'href'      => $this->url->link('extension/module', 'token=' . $this->session->data['token'], 'SSL'),
      		'separator' => ' :: '
   		);

   		$data['breadcrumbs'][] = array(
       		'text'      => $this->language->get('heading_title'),
			'href'      => $this->url->link('module/pro_megamenu', 'token=' . $this->session->data['token'], 'SSL'),
      		'separator' => ' :: '
   		);

		$data['action'] = $this->url->link('module/pro_megamenu/index', 'token=' . $this->session->data['token'], 'SSL');
		$data['option_action'] = $this->url->link('module/pro_megamenu/getOption');

		$data['cancel'] = $this->url->link('extension/module', 'token=' . $this->session->data['token'], 'SSL');

		$data['token'] 	= $this->session->data['token'];

		$this->load->model('catalog/category');
		$data['categories'] = $this->model_catalog_category->getCategories(0);

		$this->load->model('catalog/manufacturer');
		$results = $this->model_catalog_manufacturer->getManufacturers();

        foreach ($results as $result) {
			$data['manufacturers'][] = array(
                'id' 	=> $result['manufacturer_id'],
                'name'	=> $result['name']
            );
        }

		$this->load->model('catalog/information');
		$results_info = $this->model_catalog_information->getInformations();
		/* Multi Language */
		$this->load->model('localisation/language');
		$data['languages'] = $this->model_localisation_language->getLanguages();
    	foreach ($results_info as $result) {
			$data['informations'][] = array(
				'id'   	=> $result['information_id'],
				'title'	=> $result['title']
			);
		}
		$data['model'] = $this->model_module_pro_megamenu;
		$this->document->addScript('view/javascript/pro_megamenu/jquery.nestable.js');
		$this->document->addScript('view/javascript/pro_megamenu/pro_megamenu.js');
		$this->document->addStyle('view/stylesheet/pro_megamenu/pro_megamenu.css');
		$data['header'] = $this->load->controller('common/header');
		$data['column_left'] = $this->load->controller('common/column_left');
		$data['footer'] = $this->load->controller('common/footer');
		$this->response->setOutput($this->load->view('module/pro_megamenu.tpl', $data));
	}
	public function getOption() {
		$this->load->model('module/pro_megamenu');
		$this->load->language('module/pro_megamenu');

		$this->document->setTitle($this->language->get('meta_title'));

		$this->load->model('setting/setting');

		$data['heading_title'] = $this->language->get('meta_title');
		$data['text_edit'] = $this->language->get('text_edit');
		$data['button_save'] = $this->language->get('button_save');
		$data['button_cancel'] = $this->language->get('button_cancel');
		$data['button_remove'] = $this->language->get('button_remove');
		$data['button_add_menu'] = $this->language->get('button_add_menu');
		$data['button_add_option'] = $this->language->get('button_add_option');
		$data['button_remove_option'] = $this->language->get('button_remove_option');

		if (isset($this->error['warning'])) {
			$data['error_warning'] = $this->error['warning'];
		} else {
			$data['error_warning'] = '';
		}
		
		if (isset($this->session->data['error_warning'])) {
			$data['error_warning'] = $this->session->data['error_warning'];
			unset($this->session->data['error_warning']);
		}
  		$data['breadcrumbs'] = array();

   		$data['breadcrumbs'][] = array(
       		'text'      => $this->language->get('text_home'),
			'href'      => $this->url->link('common/home', 'token=' . $this->session->data['token'], 'SSL'),
      		'separator' => false
   		);

   		$data['breadcrumbs'][] = array(
       		'text'      => $this->language->get('text_module'),
			'href'      => $this->url->link('extension/module', 'token=' . $this->session->data['token'], 'SSL'),
      		'separator' => ' :: '
   		);

   		$data['breadcrumbs'][] = array(
       		'text'      => $this->language->get('heading_title'),
			'href'      => $this->url->link('module/pro_megamenu', 'token=' . $this->session->data['token'], 'SSL'),
      		'separator' => ' :: '
   		);

		$data['save_action'] = $this->url->link('module/pro_megamenu/postOption', 'token=' . $this->session->data['token'], 'SSL');

		$data['cancel'] = $this->url->link('extension/module', 'token=' . $this->session->data['token'], 'SSL');

		$data['token'] 	= $this->session->data['token'];
		$options = $this->model_module_pro_megamenu->getOptions();
		foreach($options as $val){
			$data[$val['name']] = $val['value'];
		}
		$data['model'] = $this->model_module_pro_megamenu;
		$this->document->addScript('view/javascript/pro_megamenu/jquery.nestable.js');
		$this->document->addScript('view/javascript/pro_megamenu/colorpicker.js');
		$this->document->addScript('view/javascript/pro_megamenu/pro_megamenu.js');
		$this->document->addStyle('view/stylesheet/pro_megamenu/pro_megamenu.css');
		$this->document->addStyle('view/stylesheet/pro_megamenu/colorpicker.css');
		$data['header'] = $this->load->controller('common/header');
		$data['column_left'] = $this->load->controller('common/column_left');
		$data['footer'] = $this->load->controller('common/footer');
		$this->response->setOutput($this->load->view('module/pro_megamenu.tpl', $data));
		$this->response->setOutput($this->load->view('module/pro_megamenu_options.tpl', $data));
	}
	public function postOption() {
		$this->load->language('module/pro_megamenu');
		if(!$this->validate()){
			$this->session->data['error_warning'] = $this->error['warning'];
			$this->response->redirect($this->url->link('module/pro_megamenu/getOption', 'token=' . $this->session->data['token'], 'SSL'));
		}
		if (($this->request->server['REQUEST_METHOD'] == 'POST') && $this->validate()) {
			$this->load->model('module/pro_megamenu');
			$this->model_module_pro_megamenu->saveOptions($this->request->post);
			$this->session->data['success'] = $this->language->get('text_success');
			$this->response->redirect($this->url->link('module/pro_megamenu/index', 'token=' . $this->session->data['token'], 'SSL'));
		} else {
			$this->response->redirect($this->url->link('module/pro_megamenu/getOptions', 'token=' . $this->session->data['token'], 'SSL'));
		}
	}
	protected function save() {
		$this->load->model('module/pro_megamenu');
		$this->model_module_pro_megamenu->empty_data();
		if(isset($this->request->post['title'])){
			$data['title'] = $this->request->post['title'];
			$data['type'] = $this->request->post['type'];
			$data['parent_id'] = $this->request->post['parent_id'];
			$data['type_id'] = $this->request->post['type_id'];
			$data['url'] = $this->request->post['url'];
			$data['columns'] = $this->request->post['columns'];
			$data['widths'] = $this->request->post['widths'];
			$data['content_submenu'] = $this->request->post['content_submenu'];
			$data['activemega'] = $this->request->post['activemega'];
			$this->model_module_pro_megamenu->insert($data);
		}

	}
	private function validate() {
		if (!$this->user->hasPermission('modify', 'module/pro_megamenu')) {
			$this->error['warning'] = $this->language->get('error_permission');
		}

		if (!$this->error) {
			return true;
		} else {
			return false;
		}
	}
}
?>