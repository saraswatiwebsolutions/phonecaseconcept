<?php

class ControllerModuleMmosImageEffect extends Controller {

    private $error = array();

    public function index() {
        $this->language->load('module/mmos_image_effect');

        $this->document->setTitle($this->language->get('heading_title1'));

        $this->load->model('setting/setting');

        if (($this->request->server['REQUEST_METHOD'] == 'POST') && $this->validate()) {
            $this->model_setting_setting->editSetting('mmos_image_effect', $this->request->post);

            $this->session->data['success'] = $this->language->get('text_success');

            $this->response->redirect($this->url->link('module/mmos_image_effect', 'token=' . $this->session->data['token'], 'SSL'));
        }
		
		//WWw.MMOsolution.com config data -- DO NOT REMOVE--- 
		$data['MMOS_version'] = '2.0';
		$data['MMOS_code_id'] = 'MMOSOC105';

		$data['tab_setting'] = $this->language->get('tab_setting');
		$data['tab_support'] = $this->language->get('tab_support');

        $data['heading_title'] = $this->language->get('heading_title1');
        $data['entry_effect'] = $this->language->get('entry_effect');
        $data['text_animate'] = $this->language->get('text_animate');
        $data['text_slide'] = $this->language->get('text_slide');
        $data['text_fade'] = $this->language->get('text_fade');
        $data['text_bounce'] = $this->language->get('text_bounce');
        $data['text_clip'] = $this->language->get('text_clip');
        $data['text_drop'] = $this->language->get('text_drop');
        $data['text_explode'] = $this->language->get('text_explode');
        $data['text_fold'] = $this->language->get('text_fold');
        $data['text_puff'] = $this->language->get('text_puff');
        $data['text_edit_module'] = $this->language->get('text_edit_module');

        $data['button_save'] = $this->language->get('button_save');
        $data['button_cancel'] = $this->language->get('button_cancel');
        
        if (isset($this->error['warning'])) {
            $data['error_warning'] = $this->error['warning'];
        } else {
            $data['error_warning'] = '';
        }

        $data['breadcrumbs'] = array();

        $data['breadcrumbs'][] = array(
            'text' => $this->language->get('text_home'),
            'href' => $this->url->link('common/dashboard', 'token=' . $this->session->data['token'], 'SSL')
        );

        $data['breadcrumbs'][] = array(
            'text' => $this->language->get('text_module'),
            'href' => $this->url->link('extension/module', 'token=' . $this->session->data['token'], 'SSL')
        );

        $data['breadcrumbs'][] = array(
            'text' => $this->language->get('heading_title1'),
            'href' => $this->url->link('module/mmos_image_effect', 'token=' . $this->session->data['token'], 'SSL')
        );

        $data['action'] = $this->url->link('module/mmos_image_effect', 'token=' . $this->session->data['token'], 'SSL');

        $data['cancel'] = $this->url->link('extension/module', 'token=' . $this->session->data['token'], 'SSL');

        $data['token'] = $this->session->data['token'];

        if (isset($this->request->post['mmos_image_effect'])) {
            $data['mmos_image_effect'] = $this->request->post['mmos_image_effect'];
        } else {
            $data['mmos_image_effect'] = $this->config->get('mmos_image_effect');
        }

        $data['header'] = $this->load->controller('common/header');
        $data['column_left'] = $this->load->controller('common/column_left');
        $data['footer'] = $this->load->controller('common/footer');

        $this->response->setOutput($this->load->view('module/mmos_image_effect.tpl', $data));
    }

    private function validate() {
        if (!$this->user->hasPermission('modify', 'module/mmos_image_effect')) {
            $this->error['warning'] = $this->language->get('error_permission');
        }

        return !$this->error;
    }

    public function uninstall() {
        if ($this->validate()) {
            $this->load->model('setting/setting');
            $this->model_setting_setting->deleteSetting('mmos_image_effect');
            if (!defined('MMOS_ROOT_DIR'))
                define('MMOS_ROOT_DIR', substr(DIR_APPLICATION, 0, strrpos(DIR_APPLICATION, '/', -2)) . '/');
            rename(MMOS_ROOT_DIR . 'vqmod/xml/MMOSolution_mmos_image_effect.xml', MMOS_ROOT_DIR . 'vqmod/xml/MMOSolution_mmos_image_effect.xml_mmosolution');
        }
    }

    public function install() {
        $initial = array(
            'mmos_image_effect' => array(
                'effect' => 'animate'
            )
        );
        if ($this->validate()) {
            $this->load->model('setting/setting');
            $this->model_setting_setting->editSetting('mmos_image_effect', $initial);
            if (!defined('MMOS_ROOT_DIR'))
                define('MMOS_ROOT_DIR', substr(DIR_APPLICATION, 0, strrpos(DIR_APPLICATION, '/', -2)) . '/');
            rename(MMOS_ROOT_DIR . 'vqmod/xml/MMOSolution_mmos_image_effect.xml_mmosolution', MMOS_ROOT_DIR . 'vqmod/xml/MMOSolution_mmos_image_effect.xml');
            $this->response->redirect($this->url->link('module/mmos_image_effect', 'token=' . $this->session->data['token'], 'SSL'));
        }
    }

}

?>