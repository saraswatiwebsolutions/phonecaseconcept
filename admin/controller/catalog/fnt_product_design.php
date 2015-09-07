<?php 
class ControllerCatalogFntProductDesign extends Controller {
	private $error = array(); 

	public function index() {
		$this->load->language('catalog/fnt_product_design');

		$this->document->setTitle($this->language->get('heading_title'));
        $this->document->addScript('catalog/view/javascript/jquery/jscolor/jscolor.js');

		$this->load->model('catalog/fnt_product_design');

		$this->getList();
	}

	public function insert() {
		$this->load->language('catalog/fnt_product_design');

		$this->document->setTitle($this->language->get('heading_title'));

		$this->load->model('catalog/fnt_product_design');

		if (($this->request->server['REQUEST_METHOD'] == 'POST') && $this->validateForm()) {
		
			$product_design_id = $this->model_catalog_fnt_product_design->addProductDesign($this->request->post);

			$this->session->data['success'] = $this->language->get('text_success');

			$url = '';

			if (isset($this->request->get['filter_name'])) {
				$url .= '&filter_name=' . urlencode(html_entity_decode($this->request->get['filter_name'], ENT_QUOTES, 'UTF-8'));
			}

			if (isset($this->request->get['filter_status'])) {
				$url .= '&filter_status=' . $this->request->get['filter_status'];
			}
			if (isset($this->request->get['sort'])) {
				$url .= '&sort=' . $this->request->get['sort'];
			}
			if (isset($this->request->get['order'])) {
				$url .= '&order=' . $this->request->get['order'];
			}
			if (isset($this->request->get['page'])) {
				$url .= '&page=' . $this->request->get['page'];
			}
			if(isset($this->request->get['design'])){
				$this->response->redirect($this->url->link('catalog/fnt_custom_design', 'token=' . $this->session->data['token'] .'&product_design_id=' . $product_design_id));
			} else {
				$this->response->redirect($this->url->link('catalog/fnt_product_design', 'token=' . $this->session->data['token'] . $url, 'SSL'));
			}
		}

		$this->getForm();
	}

	public function update() {
		$this->load->language('catalog/fnt_product_design');

		$this->document->setTitle($this->language->get('heading_title'));

		$this->load->model('catalog/fnt_product_design');

		if (($this->request->server['REQUEST_METHOD'] == 'POST') && $this->validateForm()) {
			$this->model_catalog_fnt_product_design->editProductDesign($this->request->get['product_design_id'], $this->request->post);

			$this->session->data['success'] = $this->language->get('text_success');

			$url = '';

			if (isset($this->request->get['filter_name'])) {
				$url .= '&filter_name=' . urlencode(html_entity_decode($this->request->get['filter_name'], ENT_QUOTES, 'UTF-8'));
			}
			if (isset($this->request->get['filter_status'])) {
				$url .= '&filter_status=' . $this->request->get['filter_status'];
			}
			if (isset($this->request->get['sort'])) {
				$url .= '&sort=' . $this->request->get['sort'];
			}
			if (isset($this->request->get['order'])) {
				$url .= '&order=' . $this->request->get['order'];
			}
			if (isset($this->request->get['page'])) {
				$url .= '&page=' . $this->request->get['page'];
			}
			if(isset($this->request->get['design'])){
				$this->response->redirect($this->url->link('catalog/fnt_custom_design', 'token=' . $this->session->data['token'] .'&product_design_id=' . $this->request->get['product_design_id']));
			} else {
				$this->response->redirect($this->url->link('catalog/fnt_product_design', 'token=' . $this->session->data['token'] . $url, 'SSL'));
			}
		}

		$this->getForm();
	}

	public function delete() {
		$this->load->language('catalog/fnt_product_design');

		$this->document->setTitle($this->language->get('heading_title'));

		$this->load->model('catalog/fnt_product_design');

		if (isset($this->request->post['selected']) && $this->validateDelete()) {
			foreach ($this->request->post['selected'] as $product_design_id) {
				$this->model_catalog_fnt_product_design->deleteProductDesign($product_design_id);
			}

			$this->session->data['success'] = $this->language->get('text_success');

			$url = '';

			if (isset($this->request->get['filter_name'])) {
				$url .= '&filter_name=' . urlencode(html_entity_decode($this->request->get['filter_name'], ENT_QUOTES, 'UTF-8'));
			}
			if (isset($this->request->get['filter_status'])) {
				$url .= '&filter_status=' . $this->request->get['filter_status'];
			}
			if (isset($this->request->get['sort'])) {
				$url .= '&sort=' . $this->request->get['sort'];
			}
			if (isset($this->request->get['order'])) {
				$url .= '&order=' . $this->request->get['order'];
			}
			if (isset($this->request->get['page'])) {
				$url .= '&page=' . $this->request->get['page'];
			}

			$this->response->redirect($this->url->link('catalog/fnt_product_design', 'token=' . $this->session->data['token'] . $url, 'SSL'));
		}

		$this->getList();
	}

	protected function getList() {
		if (isset($this->request->get['filter_name'])) {
			$filter_name = $this->request->get['filter_name'];
		} else {
			$filter_name = null;
		}
		if (isset($this->request->get['filter_status'])) {
			$filter_status = $this->request->get['filter_status'];
		} else {
			$filter_status = null;
		}
		$url = '';
		if (isset($this->request->get['sort'])) {
			$url .= '&sort=' . $this->request->get['sort'];
		}
		if (isset($this->request->get['sort'])) {
			$sort = $this->request->get['sort'];
		} else {
			$sort = 'name';
		}
		if (isset($this->request->get['order'])) {
			$order = $this->request->get['order'];
		} else {
			$order = 'ASC';
		}

		if (isset($this->request->get['page'])) {
			$page = $this->request->get['page'];
		} else {
			$page = 1;
		}

		$url = '';

		if (isset($this->request->get['filter_name'])) {
			$url .= '&filter_name=' . urlencode(html_entity_decode($this->request->get['filter_name'], ENT_QUOTES, 'UTF-8'));
		}
		if (isset($this->request->get['filter_status'])) {
			$url .= '&filter_status=' . $this->request->get['filter_status'];
		}
		if (isset($this->request->get['order'])) {
			$url .= '&sort=' . $this->request->get['sort'];
		}if (isset($this->request->get['order'])) {
			$url .= '&order=' . $this->request->get['order'];
		}
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
			'href' => $this->url->link('catalog/fnt_product_design', 'token=' . $this->session->data['token'] . $url, 'SSL')
		);

		$data['insert'] = $this->url->link('catalog/fnt_product_design/insert', 'token=' . $this->session->data['token'] . $url, 'SSL');
		$data['copy'] = $this->url->link('catalog/fnt_product_design/copy', 'token=' . $this->session->data['token'] . $url, 'SSL');	
		$data['delete'] = $this->url->link('catalog/fnt_product_design/delete', 'token=' . $this->session->data['token'] . $url, 'SSL');

		$data['products'] = array();

		$filter_data = array(
			'filter_name'	  => $filter_name, 
			'filter_status'   => $filter_status,
			'sort'            => $sort,
			'order'           => $order,
			'start'           => ($page - 1) * $this->config->get('config_limit_admin'),
			'limit'           => $this->config->get('config_limit_admin')
		);

		$this->load->model('tool/image');

		$product_design_total = $this->model_catalog_fnt_product_design->getTotalProductDesigns($filter_data);

		$results = $this->model_catalog_fnt_product_design->getProductDesigns($filter_data);

		foreach ($results as $result) {
			$data['products'][] = array(
				'product_design_id' => $result['product_design_id'],
				'name'       => $result['name'],
				'status'     => ($result['status'] ? $this->language->get('text_enabled') : $this->language->get('text_disabled')),
				'edit'       => $this->url->link('catalog/fnt_product_design/update', 'token=' . $this->session->data['token'] . '&product_design_id=' . $result['product_design_id'] . $url, 'SSL')
			);
		}

		$data['heading_title'] = $this->language->get('heading_title');		
		$data['text_list'] = $this->language->get('text_list');		

		$data['text_enabled'] = $this->language->get('text_enabled');			
		$data['text_disabled'] = $this->language->get('text_disabled');		
		$data['text_no_results'] = $this->language->get('text_no_results');	
		$data['text_confirm'] = $this->language->get('text_confirm');
		
		$data['column_name'] = $this->language->get('column_name');		
		$data['column_status'] = $this->language->get('column_status');		
		$data['column_action'] = $this->language->get('column_action');		

		$data['entry_name'] = $this->language->get('entry_name');		
		$data['entry_status'] = $this->language->get('entry_status');

		$data['button_copy'] = $this->language->get('button_copy');		
		$data['button_add'] = $this->language->get('button_add');		
		$data['button_edit'] = $this->language->get('button_edit');
		$data['button_delete'] = $this->language->get('button_delete');		
		$data['button_filter'] = $this->language->get('button_filter');

		$data['token'] = $this->session->data['token'];

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

		$url = '';

		if (isset($this->request->get['filter_name'])) {
			$url .= '&filter_name=' . urlencode(html_entity_decode($this->request->get['filter_name'], ENT_QUOTES, 'UTF-8'));
		}
		
		if (isset($this->request->get['filter_status'])) {
			$url .= '&filter_status=' . $this->request->get['filter_status'];
		}
		if ($order == 'ASC') {
			$url .= '&order=DESC';
		} else {
			$url .= '&order=ASC';
		}
		if (isset($this->request->get['page'])) {
			$url .= '&page=' . $this->request->get['page'];
		}

		$data['sort_name'] = $this->url->link('catalog/fnt_product_design', 'token=' . $this->session->data['token'] . '&sort=name' . $url, 'SSL');
		$data['sort_status'] = $this->url->link('catalog/fnt_product_design', 'token=' . $this->session->data['token'] . '&sort=status' . $url, 'SSL');
		$data['sort_order'] = $this->url->link('catalog/fnt_product_design', 'token=' . $this->session->data['token'] . '&sort=sort_order' . $url, 'SSL');

		$url = '';

		if (isset($this->request->get['filter_name'])) {
			$url .= '&filter_name=' . urlencode(html_entity_decode($this->request->get['filter_name'], ENT_QUOTES, 'UTF-8'));
		}
		if (isset($this->request->get['filter_status'])) {
			$url .= '&filter_status=' . $this->request->get['filter_status'];
		}
		if (isset($this->request->get['sort'])) {
			$url .= '&sort=' . $this->request->get['sort'];
		}

		if (isset($this->request->get['order'])) {
			$url .= '&order=' . $this->request->get['order'];
		}
		$pagination = new Pagination();
		$pagination->total = $product_design_total;
		$pagination->page = $page;
		$pagination->limit = $this->config->get('config_admin_limit');
		$pagination->url = $this->url->link('catalog/fnt_product_design', 'token=' . $this->session->data['token'] . $url . '&page={page}', 'SSL');

		$data['pagination'] = $pagination->render();
		
		$data['results'] = sprintf($this->language->get('text_pagination'), ($product_design_total) ? (($page - 1) * $this->config->get('config_limit_admin')) + 1 : 0, ((($page - 1) * $this->config->get('config_limit_admin')) > ($product_design_total - $this->config->get('config_limit_admin'))) ? $product_design_total : ((($page - 1) * $this->config->get('config_limit_admin')) + $this->config->get('config_limit_admin')), $product_design_total, ceil($product_design_total / $this->config->get('config_limit_admin')));
		
		$data['filter_name'] = $filter_name;
		$data['filter_status'] = $filter_status;
		$data['sort'] = $sort;
		$data['order'] = $order;
		$data['header'] = $this->load->controller('common/header');
		$data['column_left'] = $this->load->controller('common/column_left');
		$data['footer'] = $this->load->controller('common/footer');
		$this->response->setOutput($this->load->view('catalog/fnt_product_design_list.tpl', $data));
	}
	protected function getForm() {
		$this->document->addScript('view/javascript/common-fancy.js');
		$this->document->addScript('view/javascript/jquery/jscolor/jscolor.js');
		$data['heading_title'] = $this->language->get('heading_title');
		
		$data['text_form'] = !isset($this->request->get['product_design_id']) ? $this->language->get('text_add') : $this->language->get('text_edit');
		$data['text_enabled'] = $this->language->get('text_enabled');
		$data['text_disabled'] = $this->language->get('text_disabled');
		$data['text_none'] = $this->language->get('text_none');
		$data['text_yes'] = $this->language->get('text_yes');
		$data['text_no'] = $this->language->get('text_no');
		$data['text_default'] = $this->language->get('text_default');
		$data['text_select'] = $this->language->get('text_select');
		$data['text_image_manager'] = $this->language->get('text_image_manager');	
		$data['text_browse'] = $this->language->get('text_browse');
		$data['text_clear'] = $this->language->get('text_clear');
		$data['text_edit'] = $this->language->get('text_edit');
		$data['text_import'] = $this->language->get('text_import');
		$data['text_export'] = $this->language->get('text_export');
		$data['text_individual_setting'] = $this->language->get('text_individual_setting');
		$data['text_des_individual_setting'] = $this->language->get('text_des_individual_setting');
		$data['text_custom_control'] = $this->language->get('text_custom_control');		
		$data['text_custom_image'] = $this->language->get('text_custom_image');
		$data['text_background_type_image'] = $this->language->get('text_background_type_image');
		$data['text_background_type_color'] = $this->language->get('text_background_type_color');
		$data['text_background_type_none'] = $this->language->get('text_background_type_none');
		$data['text_use_option_main_setting'] = $this->language->get('text_use_option_main_setting');
		$data['text_custom_bounding_box'] = $this->language->get('text_custom_bounding_box');
		$data['text_use_another_element_as_bounding_box'] = $this->language->get('text_use_another_element_as_bounding_box');
		
		$data['entry_name'] = $this->language->get('entry_name');
		$data['entry_price'] = $this->language->get('entry_price');
		$data['entry_image'] = $this->language->get('entry_image');
		$data['entry_view_name'] = $this->language->get('entry_view_name');
		$data['entry_category'] = $this->language->get('entry_category');
		$data['entry_sort_order'] = $this->language->get('entry_sort_order');
		$data['entry_status'] = $this->language->get('entry_status');
		$data['entry_product'] = $this->language->get('entry_product');
		$data['entry_category_design'] = $this->language->get('entry_category_design');
		$data['entry_theme'] = $this->language->get('entry_theme');
		$data['entry_view_selection_floated'] = $this->language->get('entry_view_selection_floated');
		$data['entry_stage_width'] = $this->language->get('entry_stage_width');
		$data['entry_stage_height'] = $this->language->get('entry_stage_height');
		$data['entry_background_type'] = $this->language->get('entry_background_type');
		$data['entry_background_image'] = $this->language->get('entry_background_image');
		$data['entry_background_color'] = $this->language->get('entry_background_color');
		$data['entry_hide_designs_tab'] = $this->language->get('entry_hide_designs_tab');
		$data['entry_hide_facebook_tab'] = $this->language->get('entry_hide_facebook_tab');
		$data['entry_hide_instagram_tab'] = $this->language->get('entry_hide_instagram_tab');
		$data['entry_hide_custom_image_upload'] = $this->language->get('entry_hide_custom_image_upload');
		$data['entry_hide_custom_text'] = $this->language->get('entry_hide_custom_text');
		$data['entry_designs_parameter_price'] = $this->language->get('entry_designs_parameter_price');
		$data['entry_designs_parameter_replace'] = $this->language->get('entry_designs_parameter_replace');
		$data['entry_designs_parameter_bounding_box_control'] = $this->language->get('entry_designs_parameter_bounding_box_control');
		$data['entry_designs_parameter_bounding_box_x'] = $this->language->get('entry_designs_parameter_bounding_box_x');
		$data['entry_designs_parameter_bounding_box_y'] = $this->language->get('entry_designs_parameter_bounding_box_y');
		$data['entry_designs_parameter_bounding_box_width'] = $this->language->get('entry_designs_parameter_bounding_box_width');
		$data['entry_designs_parameter_bounding_box_height'] = $this->language->get('entry_designs_parameter_bounding_box_height');
		$data['entry_designs_parameter_bounding_box_by_other'] = $this->language->get('entry_designs_parameter_bounding_box_by_other');
		$data['entry_uploaded_designs_parameter_minW'] = $this->language->get('entry_uploaded_designs_parameter_minW');
		$data['entry_uploaded_designs_parameter_minH'] = $this->language->get('entry_uploaded_designs_parameter_minH');
		$data['entry_uploaded_designs_parameter_maxW'] = $this->language->get('entry_uploaded_designs_parameter_maxW');
		$data['entry_uploaded_designs_parameter_maxH'] = $this->language->get('entry_uploaded_designs_parameter_maxH');
		$data['entry_uploaded_designs_parameter_resizeToW'] = $this->language->get('entry_uploaded_designs_parameter_resizeToW');
		$data['entry_uploaded_designs_parameter_resizeToH'] = $this->language->get('entry_uploaded_designs_parameter_resizeToH');
		$data['entry_custom_texts_parameter_bounding_box_control'] = $this->language->get('entry_custom_texts_parameter_bounding_box_control');
		$data['entry_custom_texts_parameter_bounding_box_x'] = $this->language->get('entry_custom_texts_parameter_bounding_box_x');
		$data['entry_custom_texts_parameter_bounding_box_y'] = $this->language->get('entry_custom_texts_parameter_bounding_box_y');
		$data['entry_custom_texts_parameter_bounding_box_width'] = $this->language->get('entry_custom_texts_parameter_bounding_box_width');
		$data['entry_custom_texts_parameter_bounding_box_height'] = $this->language->get('entry_custom_texts_parameter_bounding_box_height');
		$data['entry_custom_texts_parameter_bounding_box_by_other'] = $this->language->get('entry_custom_texts_parameter_bounding_box_by_other');
		$data['entry_default_text'] = $this->language->get('entry_default_text');
		$data['entry_custom_texts_parameter_price'] = $this->language->get('entry_custom_texts_parameter_price');
		$data['entry_custom_texts_parameter_colors'] = $this->language->get('entry_custom_texts_parameter_colors');
		$data['entry_individual_settings'] = $this->language->get('entry_individual_settings');
		$data['entry_individual_help'] = $this->language->get('entry_individual_help');
		$data['entry_view_option'] = $this->language->get('entry_view_option');
		$data['entry_view_help'] = $this->language->get('entry_view_help');

		$data['help_category'] = $this->language->get('help_category');
		$data['help_product'] = $this->language->get('help_product');
		
		$data['tab_data'] = $this->language->get('tab_data');
		$data['tab_view'] = $this->language->get('tab_view');
		$data['tab_setting'] = $this->language->get('tab_setting');
		$data['tab_general'] = $this->language->get('tab_general');
		$data['tab_image_parameter'] = $this->language->get('tab_image_parameter');
		$data['tab_custom_text_parameter'] = $this->language->get('tab_custom_text_parameter');
		
		$data['button_save'] = $this->language->get('button_save');
		$data['button_save_design'] = $this->language->get('button_save_design');
		$data['button_cancel'] = $this->language->get('button_cancel');
		$data['button_image_add'] = $this->language->get('button_image_add');
		$data['button_edit'] = $this->language->get('button_edit');
		$data['button_remove'] = $this->language->get('button_remove');
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

		$url = '';

		if (isset($this->request->get['filter_name'])) {
			$url .= '&filter_name=' . urlencode(html_entity_decode($this->request->get['filter_name'], ENT_QUOTES, 'UTF-8'));
		}

		if (isset($this->request->get['filter_status'])) {
			$url .= '&filter_status=' . $this->request->get['filter_status'];
		}
		
		if (isset($this->request->get['sort'])) {
			$url .= '&sort=' . $this->request->get['sort'];
		}
		if (isset($this->request->get['order'])) {
			$url .= '&order=' . $this->request->get['order'];
		}
		if (isset($this->request->get['page'])) {
			$url .= '&page=' . $this->request->get['page'];
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
			'href' => $this->url->link('catalog/fnt_product_design', 'token=' . $this->session->data['token'] . $url, 'SSL')
		);

		if (!isset($this->request->get['product_design_id'])) {
			$data['action'] = $this->url->link('catalog/fnt_product_design/insert', 'token=' . $this->session->data['token'] . $url, 'SSL');
		} else {
			$data['action'] = $this->url->link('catalog/fnt_product_design/update', 'token=' . $this->session->data['token'] . '&product_design_id=' . $this->request->get['product_design_id'] . $url, 'SSL');
		}

		$data['cancel'] = $this->url->link('catalog/fnt_product_design', 'token=' . $this->session->data['token'] . $url, 'SSL');
		if(isset($this->request->get['product_design_id'])){
			$data['product_design_id'] = $this->request->get['product_design_id'];
		} else {
			$data['product_design_id'] = 0;
		}	
		if (isset($this->request->get['product_design_id']) && ($this->request->server['REQUEST_METHOD'] != 'POST')) {
            $product_design_info = $this->model_catalog_fnt_product_design->getProductDesign($this->request->get['product_design_id']);
		}

		$data['token'] = $this->session->data['token'];

        $this->load->model('localisation/language');

        $data['languages'] = $this->model_localisation_language->getLanguages();


        if (isset($this->request->post['fnt_product_design_description'])) {
            $data['fnt_product_design_description'] = $this->request->post['fnt_product_design_description'];
        } elseif (isset($this->request->get['product_design_id'])) {
            $data['fnt_product_design_description'] = $this->model_catalog_fnt_product_design->getProductDesignDescriptions($this->request->get['product_design_id']);
        } else {
            $data['fnt_product_design_description'] = array();
        }

		if (isset($this->request->post['name'])) {
			$data['name'] = $this->request->post['name'];
		} elseif (!empty($product_design_info)) {
			$data['name'] = $product_design_info['name'];
		} else {
			$data['name'] = '';
		}
		

		if (isset($this->request->post['status'])) {
			$data['status'] = $this->request->post['status'];
		} elseif (!empty($product_design_info)) {
			$data['status'] = $product_design_info['status'];
		} else {
			$data['status'] = 1;
		}
		
		$this->load->model('catalog/product');

		if (isset($this->request->post['product_id'])) {
			$data['product_id'] = $this->request->post['product_id'];
		} elseif (!empty($product_design_info)) {
			$data['product_id'] = $product_design_info['product_id'];
		} else {
			$data['product_id'] = 0;
		}

		if (isset($this->request->post['product'])) {
			$data['product'] = $this->request->post['product'];
		} elseif (!empty($product_design_info)) {
			$product_info = $this->model_catalog_product->getProduct($product_design_info['product_id']);

			if ($product_info) {		
				$data['product'] = $product_info['name'];
			} else {
				$data['product'] = '';
			}	
		} else {
			$data['product'] = '';
		}
	
        // Categories Design
		$this->load->model('catalog/fnt_category');

        if (isset($this->request->post['category_design_id'])) {
            $data['category_design_id'] = $this->request->post['category_design_id'];
        } elseif (isset($product_design_info)) {
            $data['category_design_id'] = $product_design_info['category_design_id'];
        } else {
            $data['category_design_id'] = 0;
        }

		if (isset($this->request->post['category_design_name'])) {
            $data['category_design_name'] = $this->request->post['category_design_name'];
		} elseif (isset($product_design_info['category_design_id'])) {
            $catory_design = $this->model_catalog_fnt_product_design->getProductCategorie($product_design_info['category_design_id']);
            if($catory_design) {
                $data['category_design_name'] = $catory_design['name'];
            } else {
                $data['category_design_name'] = '';
            }
		} else {
            $data['category_design_name'] = '';
		}
		//end category design

		//Product stage
        if (isset($this->request->post['design_stage_width'])) {
            $data['design_stage_width'] = $this->request->post['design_stage_width'];
        } elseif (isset($product_design_info['parameters'])) {
            $product_stage = unserialize($product_design_info['parameters']);
            $data['design_stage_width'] = $product_stage['design_stage_width'];
        } else {
            $data['design_stage_width'] = $this->config->get('config_stage_width');
        }

        if (isset($this->request->post['design_stage_height'])) {
            $data['design_stage_height'] = $this->request->post['design_stage_height'];
        } elseif (isset($product_design_info['parameters'])) {
            $product_stage = unserialize($product_design_info['parameters']);
            $data['design_stage_height'] = $product_stage['design_stage_height'];
        } else {
            $data['design_stage_height'] = $this->config->get('config_stage_height');
        }
		//end Product stage

		if (isset($this->request->post['product_image'])) {
			$product_images = $this->request->post['product_image'];
		} elseif (isset($this->request->get['product_design_id'])) {
			$product_images = $this->model_catalog_fnt_product_design->getProductDesignImages($this->request->get['product_design_id']);
		} else {
			$product_images = array();
		}
		
		$this->load->model('tool/image');
		$data['product_images'] = array();
		foreach ($product_images as $product_image) {
			if (is_file(DIR_IMAGE . $product_image['image'])) {
				$image = $product_image['image'];
			} else {
				$image = 'no_image.jpg';
			}
		
			$data['product_images'][] = array(
				'product_design_element_id'  => $product_image['product_design_element_id'],
				'image'     			 	 => $image,
				'view_setting_values'        => base64_encode($product_image['parameters']),
				'name'      				 => $product_image['name'],
				'edit'      				 => $this->url->link('catalog/fnt_custom_design','product_design_element_id=' . $product_image['product_design_element_id'] . '&token=' . $this->session->data['token'] . '&product_design_id=' . $this->request->get['product_design_id']),
				'thumb'   					 => $this->model_tool_image->resize($image, 100, 100),
				'sort_order'				 => $product_image['sort_order']
			);
		}
		if(isset($data['parameters']['image']) && $data['parameters']['image']){
			$data['thumb_background'] = $this->model_tool_image->resize($data['parameters']['image'], 100, 100);
		} else {
			$data['thumb_background'] = $this->model_tool_image->resize('no_image.jpg', 100, 100);
		}	
		$data['placeholder'] = $this->model_tool_image->resize('no_image.png', 100, 100);
		$data['no_image'] = $this->model_tool_image->resize('no_image.png', 100, 100);
		$data['header'] = $this->load->controller('common/header');
		$data['column_left'] = $this->load->controller('common/column_left');
		$data['footer'] = $this->load->controller('common/footer');
		$this->response->setOutput($this->load->view('catalog/fnt_product_design_form.tpl', $data));
	}

	protected function validateForm() {

		if (!$this->user->hasPermission('modify', 'catalog/fnt_product_design')) {
			$this->error['warning'] = $this->language->get('error_permission');
		}

        foreach ($this->request->post['fnt_product_design_description'] as $language_id => $value) {
            if ((utf8_strlen($value['name']) < 1) || (utf8_strlen($value['name']) > 255)) {
                $this->error['name'][$language_id] = $this->language->get('error_name');
            }
        }

//		if ((utf8_strlen($this->request->post['name']) < 1) || (utf8_strlen($this->request->post['name']) > 128)) {
//			$this->error['model'] = $this->language->get('error_name');
//		}
		if ($this->error && !isset($this->error['warning'])) {
			$this->error['warning'] = $this->language->get('error_warning');
		}

		return !$this->error;
	}

	protected function validateDelete() {
		if (!$this->user->hasPermission('modify', 'catalog/fnt_product_design')) {
			$this->error['warning'] = $this->language->get('error_permission');
		}

		return !$this->error;
	}

	public function autocomplete() {
		$json = array();

		if (isset($this->request->get['filter_name'])) {
			$this->load->model('catalog/fnt_product_design');
			
			if (isset($this->request->get['filter_name'])) {
				$filter_name = $this->request->get['filter_name'];
			} else {
				$filter_name = '';
			}

			if (isset($this->request->get['limit'])) {
				$limit = $this->request->get['limit'];	
			} else {
				$limit = 5;	
			}			

			$filter_data = array(
				'filter_name'  => $filter_name,
				'start'        => 0,
				'limit'        => $limit
			);

			$results = $this->model_catalog_fnt_product_design->getProductDesigns($filter_data);

			foreach ($results as $result) {
				$json[] = array(
					'product_design_id' => $result['product_design_id'],
					'name'       => strip_tags(html_entity_decode($result['name'], ENT_QUOTES, 'UTF-8'))
				);	
			}
		}

		$this->response->setOutput(json_encode($json));
	}
	public function export() {
		$this->load->model('catalog/fnt_product_design');
		if ( !isset($this->request->get['product_design_id']) )
			exit;
		$product_design_id = $this->request->get['product_design_id'];
		$products_design_element = $this->model_catalog_fnt_product_design->getProductDesignImages($product_design_id);
		header('Content-Type: text/csv; charset=utf-8');
		header('Content-Disposition: attachment; filename=fancy_product_'.$product_design_id.'.json');
		$output = '{';
		foreach($products_design_element as $view) {

			$output .= '"'.$view['product_design_element_id'].'": {';
			$output .= '"title": "'.$view['name'].'",';
			$elements = $this->model_catalog_fnt_product_design->getProductDesignElement($view['product_design_element_id']);	
			$temp = array();
			for($i=0; $i < sizeof($elements); $i++) {

				$source = $elements[$i]['value'];

				if($elements[$i]['type'] == 'image' && base64_encode(base64_decode(HTTP_CATALOG . 'image/' . $source, true)) !== $source) {

					$image_content = base64_encode($this->fpdGetFileContent(HTTP_CATALOG . 'image/' . $source));
					if($image_content !== false) {
						$image_type = explode(".", basename($source), 2);
						$image_type = $image_type[1];
						$elements[$i]['source'] = $image_type.','.$image_content;
					}

				} elseif($elements[$i]['type'] == 'text'){
					$elements[$i]['source'] = $source;
				}
				$temp[] = array(
					'type'	 	=> $elements[$i]['type'],
					'source'	=> $elements[$i]['source'],
					'parameters'=> unserialize($elements[$i]['parameters'])
				);
			}
			
			$output .= '"elements": '.stripslashes(json_encode($temp)).',';
			$output .= '"thumbnail_name": "'.basename($view['image']).'",';
			$thumbnail_content = base64_encode($this->fpdGetFileContent(stripslashes(HTTP_CATALOG . 'image/' . $view['image'])));
			$output .= '"thumbnail": "'.($thumbnail_content === false ? stripslashes($view->thumbnail) : $thumbnail_content).'"},';

		}

		$output = rtrim($output, ",");

		$output .= '}';

		echo $output;

		die;
	}
	//add a new view to a fancy product
	public function import() {
		$json = array();
		$thumbnail = trim($this->request->post['thumbnail']);
		$title = trim($this->request->post['title']);
		$product_design_id = trim($this->request->post['product_design_id']);
		$elements = isset($this->request->post['elements']) ? $this->request->post['elements'] : false;
		//check if thumbnail is base64 encoded, if yes, create and upload image to library image
		$thumbnail = $this->fntUploadBit($this->request->post['thumbnail_name'], $thumbnail);
		//check if elements are posted
		$this->load->model('catalog/fnt_product_design');
		$product_design_element_id = $this->model_catalog_fnt_product_design->addviewDesignByImport($product_design_id,$title,$thumbnail);
		if($elements !== false) {
			//loop through all elements
			for($i=0;  $i < sizeof($elements); $i++) {

				$element = $elements[$i];

				if( $element['type'] == 'image' ) {
					//get parts of source string
					$image_parts = explode(',', $element['source']);
					$type = $image_parts[0]; //type of image
					$base64_image = $image_parts[1]; //the base 64 encoded image string
					if( !is_null($base64_image) && base64_encode(base64_decode($base64_image, true)) === $base64_image ) {
						$elements[$i]['source'] = $this->fntUploadBit($elements[$i]['parameters']['title_element'] . '.' . $image_parts[0], $base64_image);
					}
				}
				$elements[$i]['parameters'] = serialize($elements[$i]['parameters']);
				$this->model_catalog_fnt_product_design->addProductDesignElement($product_design_element_id,$elements[$i],$i);
				
			}
		}
		$sort_order = $this->model_catalog_fnt_product_design->getTotalProductDesignImages($product_design_id);
		$json['success'] = $this->getViewListItem($product_design_id,$product_design_element_id, $title, $thumbnail,$sort_order - 1 ,$this->request->get['token']);
		$this->response->addHeader('Content-Type: application/json');
		$this->response->setOutput(json_encode($json));
	}
	public function fpdGetFileContent( $file ) {

		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $file);
		curl_setopt($ch, CURLOPT_HEADER, 0);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_BINARYTRANSFER,1);
		$result = curl_exec($ch);
		curl_close($ch);

		//if curl does not work, use file_get_contents
		if( $result == false && function_exists('file_get_contents') ) {
			$result = @file_get_contents($file);
		}

		if($result !== false) {
			return $result;
		}
		else {
			return false;
		}

	}
	public function checkFileType( $filename, $mimes = null ) {
		if ( empty($mimes) )
		$mimes = array(
			'jpg|jpeg|jpe' => 'image/jpeg',
			'gif' => 'image/gif',
			'png' => 'image/png'
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
	public function fntUploadBit( $name, $bits) {
		$filetype = $this->checkFileType( $name );
		if ( ! $filetype['ext'])
			return -1;
		
		$new_file = DIR_IMAGE . 'catalog/image-import-fancy/';
		//create item dir
		if( !file_exists($new_file) )
			mkdir($new_file);

		$image_exist = file_exists($new_file . $name);
		$name =  $image_exist ? strtotime("now") . '-' . $name : $name; 
		$result = file_put_contents($new_file . $name, base64_decode($bits));
		return 'catalog/image-import-fancy/' . $name;
	}
	public function getViewListItem($product_design_id,$product_design_element_id, $title, $thumbnail, $sort_order, $token) {
		$this->load->model('tool/image');
		$this->load->language('catalog/fnt_product_design');
		$image = $this->model_tool_image->resize($thumbnail, 100, 100);
		$no_image = $this->model_tool_image->resize('no_image.png', 100, 100);
		$html = '<tr id="image-row' . $sort_order . '"><td class="text-left">';
		$html .= '<a href="" id="thumb-image' . $sort_order  . '"data-toggle="image" class="img-thumbnail"><img src="' . $image . '" alt="" title="" data-placeholder="' . $no_image . '" /><input type="hidden" name="product_image[' . $sort_order  . '][image]" value="" id="input-image' . $sort_order  . '" />';
		$html .= '<input type="hidden" id="image' . $sort_order  . '" value="' . $thumbnail . '" name="product_image[' . $sort_order  . '][image]">';
		$html .= '<input type="hidden" value="' . $product_design_element_id . '" name="product_image[' . $sort_order . '][product_design_element_id]"></td>';
        $html .= '<td class="text-right"><input type="text" class="form-control" placeholder="' . $this->language->get('entry_view_name') . '" value="' . $title . '" name="product_image[' . $sort_order . '][name]"></td>';
       $html .= '<td class="text-left"><input type="text" class="form-control" placeholder="' . $this->language->get('entry_sort_order') . '" value="' . $sort_order . '" name="product_image[' . $sort_order . '][sort_order]"></td>';
	   $html .= '<td class="text-left"> <a title="" data-toggle="tooltip" class="btn btn-primary" href="index.php?route=catalog/fnt_custom_design&product_design_element_id='.$product_design_element_id.'&token=' . $token . '&product_design_id=' . $product_design_id . '" data-original-title="' .$this->language->get('text_edit') . '"><i class="fa fa-edit"></i> ' . $this->language->get('button_edit') . '</a>';
	   $html .= ' <button type="button" onclick="settingView(' . $sort_order . ')" class="btn btn-primary" name="fpd-edit-view"> <i class="fa fa-cog"></i> Setting</button>';
	   $html .= ' <button type="button" onclick="$(\'#image-row' . $sort_order . '\').remove();" class="btn btn-danger"><i class="fa fa-minus-circle"></i> ' . $this->language->get('button_remove') . '</button></td>';
	   $html .= ' <input type="hidden" name="product_image[' . $sort_order . '][view_setting_values]" value="" />';
	   $html .= ' </tr>';
	return $html;
}

    public function popupIndividualSetting() {
        $this->load->language('catalog/fnt_product_design');

        $this->load->model('catalog/fnt_product_design');

        if (($this->request->server['REQUEST_METHOD'] == 'POST') ) {
            $this->model_catalog_fnt_product_design->insertIndividualSetting($this->request->post['product_id'],$this->request->post);
        }

        $data['product_id'] = $this->request->get['product_id'];
        $data['text_form'] = !isset($this->request->get['product_design_id']) ? $this->language->get('text_add') : $this->language->get('text_edit');
        $data['text_enabled'] = $this->language->get('text_enabled');
        $data['text_disabled'] = $this->language->get('text_disabled');
        $data['text_none'] = $this->language->get('text_none');
        $data['text_yes'] = $this->language->get('text_yes');
        $data['text_no'] = $this->language->get('text_no');
        $data['text_default'] = $this->language->get('text_default');
        $data['text_select'] = $this->language->get('text_select');
        $data['text_image_manager'] = $this->language->get('text_image_manager');
        $data['text_browse'] = $this->language->get('text_browse');
        $data['text_clear'] = $this->language->get('text_clear');
        $data['text_edit'] = $this->language->get('text_edit');
        $data['text_import'] = $this->language->get('text_import');
        $data['text_export'] = $this->language->get('text_export');
        $data['text_individual_setting'] = $this->language->get('text_individual_setting');
        $data['text_des_individual_setting'] = $this->language->get('text_des_individual_setting');
        $data['text_custom_control'] = $this->language->get('text_custom_control');
        $data['text_custom_image'] = $this->language->get('text_custom_image');
        $data['text_background_type_image'] = $this->language->get('text_background_type_image');
        $data['text_background_type_color'] = $this->language->get('text_background_type_color');
        $data['text_background_type_none'] = $this->language->get('text_background_type_none');
        $data['text_use_option_main_setting'] = $this->language->get('text_use_option_main_setting');
        $data['text_custom_bounding_box'] = $this->language->get('text_custom_bounding_box');
        $data['text_use_another_element_as_bounding_box'] = $this->language->get('text_use_another_element_as_bounding_box');
        $data['text_top_right_product_stage'] = $this->language->get('text_top_right_product_stage');
        $data['text_bottom_right_product_stage'] = $this->language->get('text_bottom_right_product_stage');
        $data['text_top_left_product_stage'] = $this->language->get('text_top_left_product_stage');
        $data['text_bottom_left_product_stage'] = $this->language->get('text_bottom_left_product_stage');
        $data['text_under_product_stage'] = $this->language->get('text_under_product_stage');

        $data['entry_keyword'] = $this->language->get('entry_keyword');
        $data['entry_name'] = $this->language->get('entry_name');
        $data['entry_price'] = $this->language->get('entry_price');
        $data['entry_image'] = $this->language->get('entry_image');
        $data['entry_view_name'] = $this->language->get('entry_view_name');
        $data['entry_category'] = $this->language->get('entry_category');
        $data['entry_sort_order'] = $this->language->get('entry_sort_order');
        $data['entry_status'] = $this->language->get('entry_status');
        $data['entry_product'] = $this->language->get('entry_product');
        $data['entry_category_design'] = $this->language->get('entry_category_design');
        $data['entry_theme'] = $this->language->get('entry_theme');
        $data['entry_view_selection_floated'] = $this->language->get('entry_view_selection_floated');
        $data['entry_stage_width'] = $this->language->get('entry_stage_width');
        $data['entry_stage_height'] = $this->language->get('entry_stage_height');
        $data['entry_background_type'] = $this->language->get('entry_background_type');
        $data['entry_background_image'] = $this->language->get('entry_background_image');
        $data['entry_background_color'] = $this->language->get('entry_background_color');
        $data['entry_hide_designs_tab'] = $this->language->get('entry_hide_designs_tab');
        $data['entry_hide_facebook_tab'] = $this->language->get('entry_hide_facebook_tab');
        $data['entry_hide_instagram_tab'] = $this->language->get('entry_hide_instagram_tab');
        $data['entry_hide_custom_image_upload'] = $this->language->get('entry_hide_custom_image_upload');
        $data['entry_hide_custom_text'] = $this->language->get('entry_hide_custom_text');
        $data['entry_designs_parameter_price'] = $this->language->get('entry_designs_parameter_price');
        $data['entry_designs_parameter_replace'] = $this->language->get('entry_designs_parameter_replace');
        $data['entry_designs_parameter_bounding_box_control'] = $this->language->get('entry_designs_parameter_bounding_box_control');
        $data['entry_designs_parameter_bounding_box_x'] = $this->language->get('entry_designs_parameter_bounding_box_x');
        $data['entry_designs_parameter_bounding_box_y'] = $this->language->get('entry_designs_parameter_bounding_box_y');
        $data['entry_designs_parameter_bounding_box_width'] = $this->language->get('entry_designs_parameter_bounding_box_width');
        $data['entry_designs_parameter_bounding_box_height'] = $this->language->get('entry_designs_parameter_bounding_box_height');
        $data['entry_designs_parameter_bounding_box_by_other'] = $this->language->get('entry_designs_parameter_bounding_box_by_other');
        $data['entry_uploaded_designs_parameter_minW'] = $this->language->get('entry_uploaded_designs_parameter_minW');
        $data['entry_uploaded_designs_parameter_minH'] = $this->language->get('entry_uploaded_designs_parameter_minH');
        $data['entry_uploaded_designs_parameter_maxW'] = $this->language->get('entry_uploaded_designs_parameter_maxW');
        $data['entry_uploaded_designs_parameter_maxH'] = $this->language->get('entry_uploaded_designs_parameter_maxH');
        $data['entry_uploaded_designs_parameter_resizeToW'] = $this->language->get('entry_uploaded_designs_parameter_resizeToW');
        $data['entry_uploaded_designs_parameter_resizeToH'] = $this->language->get('entry_uploaded_designs_parameter_resizeToH');
        $data['entry_custom_texts_parameter_bounding_box_control'] = $this->language->get('entry_custom_texts_parameter_bounding_box_control');
        $data['entry_custom_texts_parameter_bounding_box_x'] = $this->language->get('entry_custom_texts_parameter_bounding_box_x');
        $data['entry_custom_texts_parameter_bounding_box_y'] = $this->language->get('entry_custom_texts_parameter_bounding_box_y');
        $data['entry_custom_texts_parameter_bounding_box_width'] = $this->language->get('entry_custom_texts_parameter_bounding_box_width');
        $data['entry_custom_texts_parameter_bounding_box_height'] = $this->language->get('entry_custom_texts_parameter_bounding_box_height');
        $data['entry_custom_texts_parameter_bounding_box_by_other'] = $this->language->get('entry_custom_texts_parameter_bounding_box_by_other');
        $data['entry_default_text'] = $this->language->get('entry_default_text');
        $data['entry_custom_texts_parameter_price'] = $this->language->get('entry_custom_texts_parameter_price');
        $data['entry_custom_texts_parameter_colors'] = $this->language->get('entry_custom_texts_parameter_colors');
        $data['entry_view_selection_position'] = $this->language->get('entry_view_selection_position');
        $data['entry_frame_shadow'] = $this->language->get('entry_frame_shadow');
        $data['entry_color_prices_for_images'] = $this->language->get('entry_color_prices_for_images');
        $data['entry_color_prices_for_texts'] = $this->language->get('entry_color_prices_for_texts');
        $data['entry_hide_filters'] = $this->language->get('entry_hide_filters');
        $data['entry_replace_initial_elements'] = $this->language->get('entry_replace_initial_elements');
        $data['entry_selected_color'] = $this->language->get('entry_selected_color');

        $data['help_category'] = $this->language->get('help_category');
        $data['help_product'] = $this->language->get('help_product');

        $data['tab_data'] = $this->language->get('tab_data');
        $data['tab_view'] = $this->language->get('tab_view');
        $data['tab_setting'] = $this->language->get('tab_setting');
        $data['tab_general'] = $this->language->get('tab_general');
        $data['tab_image_parameter'] = $this->language->get('tab_image_parameter');
        $data['tab_custom_text_parameter'] = $this->language->get('tab_custom_text_parameter');

        $data['button_save'] = $this->language->get('button_save');
        $data['button_save_design'] = $this->language->get('button_save_design');
        $data['button_cancel'] = $this->language->get('button_cancel');
        $data['button_image_add'] = $this->language->get('button_image_add');
        $data['button_edit'] = $this->language->get('button_edit');
        $data['button_remove'] = $this->language->get('button_remove');
        if (isset($this->error['warning'])) {
            $data['error_warning'] = $this->error['warning'];
        } else {
            $data['error_warning'] = '';
        }

        $data['token'] = $this->session->data['token'];
		 $this->load->model('tool/image');
		$data['placeholder'] = $this->model_tool_image->resize('no_image.png', 100, 100);
        $parameters_info = $this->model_catalog_fnt_product_design->getParametersByProduct($data['product_id']);

        if (isset($this->request->post['parameters'])) {
            $data['parameters'] = $this->request->post['parameters'];
        }elseif($parameters_info){
            $data['parameters'] = unserialize($parameters_info['parameters']);
        } else {
            $data['parameters'] = array();
            $data['parameters']['layout'] = $this->config->get('config_theme');
            $data['parameters']['view_selection_floated'] = $this->config->get('config_view_selection_float');
            $data['parameters']['stage_width'] = $this->config->get('config_stage_width');
            $data['parameters']['stage_height'] = $this->config->get('config_stage_height');
            $data['parameters']['designs_parameter_price'] = $this->config->get('config_designs_parameter_price');
            $data['parameters']['designs_parameter_replace'] = $this->config->get('config_designs_parameter_replace');
            $data['parameters']['designs_parameter_bounding_box_x'] = $this->config->get('config_bounding_box_x');
            $data['parameters']['designs_parameter_bounding_box_y'] = $this->config->get('config_bounding_box_y');
            $data['parameters']['designs_parameter_bounding_box_width'] = $this->config->get('config_bounding_box_width');
            $data['parameters']['designs_parameter_bounding_box_height'] = $this->config->get('config_bounding_box_height');
            $data['parameters']['uploaded_designs_parameter_minW'] = $this->config->get('config_min_width');
            $data['parameters']['uploaded_designs_parameter_minH'] = $this->config->get('config_min_height');
            $data['parameters']['uploaded_designs_parameter_maxW'] = $this->config->get('config_max_width');
            $data['parameters']['uploaded_designs_parameter_maxH'] = $this->config->get('config_max_height');
            $data['parameters']['uploaded_designs_parameter_resizeToW'] = $this->config->get('config_resize_width');
            $data['parameters']['uploaded_designs_parameter_resizeToH'] = $this->config->get('config_resize_height');
            $data['parameters']['designs_parameter_bounding_box_by_other'] = $this->config->get('config_bounding_box_target');
            $data['parameters']['custom_texts_parameter_price'] = $this->config->get('config_text_design_price');
            $data['parameters']['custom_texts_parameter_replace'] = $this->config->get('config_text_replace');
            $data['parameters']['custom_texts_parameter_bounding_box_x'] = $this->config->get('config_text_bounding_x_position');
            $data['parameters']['custom_texts_parameter_bounding_box_y'] = $this->config->get('config_text_bounding_y_position');
            $data['parameters']['custom_texts_parameter_bounding_box_width'] = $this->config->get('config_text_bounding_width');
            $data['parameters']['custom_texts_parameter_bounding_box_height'] = $this->config->get('config_text_bounding_height');
            $data['parameters']['custom_texts_parameter_bounding_box_by_other'] = $this->config->get('config_text_bounding_box_target');
            $data['parameters']['default_text'] = $this->config->get('config_text_default');
            $data['parameters']['custom_texts_parameter_colors'] = $this->config->get('config_text_design_color');
        }
		$keyword = $this->model_catalog_fnt_product_design->getKeyword($data['product_id']);
        if (isset($this->request->post['keyword'])) {
            $data['keyword'] = $this->request->post['keyword'];
        }elseif($keyword){
            $data['keyword'] = $keyword['keyword'];
        } else {
			$data['keyword'] = '';
		}

        $this->load->model('catalog/fnt_category_clipart');

        if (isset($this->request->post['parameters']['clipart_category'])) {
            $categories = $this->request->post['parameters']['clipart_category'];
        } elseif (isset($parameters_info) && $parameters_info && isset($data['parameters']['clipart_category'])) {
            $categories = $data['parameters']['clipart_category'];
        } else {
            $categories = array();
        }

        $data['clipart_categories'] = array();
        foreach ($categories as $category_clipart_id) {
            $category_info = $this->model_catalog_fnt_category_clipart->getCategoryClipartDescriptions($category_clipart_id);
            if ($category_info) {
                $data['clipart_categories'][] = array(
                    'category_clipart_id' => $category_clipart_id,
                    'name'                => $category_info[(int)$this->config->get('config_language_id')]
                );
            }
        }

        $data['arr_frame_shadow'] = array(
            'default' => $this->language->get('text_use_option_main_setting'),
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

        $data['arr_select_position'] = array(
            'default' => $this->language->get('text_use_option_main_setting'),
            'tr' => $this->language->get('text_top_right_product_stage'),
            'tl' => $this->language->get('text_top_left_product_stage'),
            'br' => $this->language->get('text_bottom_right_product_stage'),
            'bl' => $this->language->get('text_bottom_left_product_stage'),
            'outside' => $this->language->get('text_under_product_stage')
        );
        $data['arr_yes_no'] = array(
            'default' => $this->language->get('text_use_option_main_setting'),
            'no' => 'No',
            'yes' => 'Yes',
        );
		
		$this->response->setOutput($this->load->view('catalog/fnt_individual_product_settings_popup.tpl', $data));
    }

    public function insertIndividualSetting(){
        $json = array();

        $this->load->model('catalog/fnt_product_design');

        if (($this->request->server['REQUEST_METHOD'] == 'POST') ) {
            $this->model_catalog_fnt_product_design->insertIndividualSetting($this->request->post['product_id'],$this->request->post);
        }
        $json['warning'] = '';
		$this->response->setOutput(json_encode($json));
    }

    public function popupViewSetting() {
        $this->load->language('catalog/fnt_product_design');

        $data['entry_media_types_title'] = $this->language->get('entry_media_types_title');
        $data['entry_custom_image_price'] = $this->language->get('entry_custom_image_price');
        $data['entry_custom_text_price'] = $this->language->get('entry_custom_text_price');
        $data['entry_disable_image_upload'] = $this->language->get('entry_disable_image_upload');
        $data['entry_disable_custom_text'] = $this->language->get('entry_disable_custom_text');
        $data['entry_disable_facebook'] = $this->language->get('entry_disable_facebook');
        $data['entry_disable_instagram'] = $this->language->get('entry_disable_instagram');
        $data['entry_disable_designs'] = $this->language->get('entry_disable_designs');

        $data['help_designs_parameter_price'] = $this->language->get('help_designs_parameter_price');
        $data['help_custom_texts_parameter_price'] = $this->language->get('help_custom_texts_parameter_price');

        $this->load->model('catalog/fnt_product_design');

        $data['button_save'] = $this->language->get('button_save');

        $data['token'] = $this->session->data['token'];

        if (($this->request->server['REQUEST_METHOD'] == 'POST') ) {
            $arr_temp = unserialize(base64_decode($this->request->post['view_setting_values']));
        }
        $data['element'] = $this->request->get['element'];

        if (isset($arr_temp['designs_parameter_price']) && $arr_temp['designs_parameter_price']) {
            $data['designs_parameter_price'] = $arr_temp['designs_parameter_price'];
        } else {
            $data['designs_parameter_price'] = 0;
        }

        if (isset($arr_temp['custom_texts_parameter_price']) && $arr_temp['custom_texts_parameter_price']) {
            $data['custom_texts_parameter_price'] = $arr_temp['custom_texts_parameter_price'];
        } else {
            $data['custom_texts_parameter_price'] = 0;
        }

        if (isset($arr_temp['disable_image_upload']) && $arr_temp['disable_image_upload']) {
            $data['disable_image_upload'] = $arr_temp['disable_image_upload'];
        } else {
            $data['disable_image_upload'] = '';
        }

        if (isset($arr_temp['disable_custom_text']) && $arr_temp['disable_custom_text']) {
            $data['disable_custom_text'] = $arr_temp['disable_custom_text'];
        } else {
            $data['disable_custom_text'] = '';
        }

        if (isset($arr_temp['disable_facebook']) && $arr_temp['disable_facebook']) {
            $data['disable_facebook'] = $arr_temp['disable_facebook'];
        } else {
            $data['disable_facebook'] = '';
        }

        if (isset($arr_temp['disable_instagram']) && $arr_temp['disable_instagram']) {
            $data['disable_instagram'] = $arr_temp['disable_instagram'];
        } else {
            $data['disable_instagram'] = '';
        }

        if (isset($arr_temp['disable_designs']) && $arr_temp['disable_designs']) {
            $data['disable_designs'] = $arr_temp['disable_designs'];
        } else {
            $data['disable_designs'] = '';
        }

		$this->response->setOutput($this->load->view('catalog/fnt_view_setting.tpl', $data));
    }

    public function insertViewSetting(){
        $json = array();

        $this->load->model('catalog/fnt_product_design');

        if (($this->request->server['REQUEST_METHOD'] == 'POST') ) {
            $json['data'] = base64_encode(serialize($this->request->post));
        }
        $json['warning'] = '';

        $this->response->setOutput(json_encode($json));
    }
}