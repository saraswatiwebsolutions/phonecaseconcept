<?php
class ControllerCatalogFntFonts extends Controller {
	private $error = array(); 
	
	public function index() {   
		$this->load->language('catalog/fnt_fonts');

		$this->document->setTitle($this->language->get('heading_title'));
		
		$this->load->model('setting/setting');
				
		if (($this->request->server['REQUEST_METHOD'] == 'POST') && $this->validate()) {			
			$this->model_setting_setting->editSetting('fonts', $this->request->post);		
			$this->saveWoffFontsCss();
			$this->session->data['success'] = $this->language->get('text_success');
			
			$this->response->redirect($this->url->link('catalog/fnt_fonts', 'token=' . $this->session->data['token'], 'SSL'));
		}
				
		$data['heading_title'] = $this->language->get('heading_title');

		$data['text_form'] =  $this->language->get('text_form');
		$data['entry_fonts'] = $this->language->get('entry_fonts');
		$data['entry_fonts_google'] = $this->language->get('entry_fonts_google');
		$data['entry_fonts_directory'] = $this->language->get('entry_fonts_directory');
		$data['help_fonts'] = $this->language->get('help_fonts');
		$data['help_google_fonts'] = $this->language->get('help_google_fonts');
		$data['help_directory_fonts'] = $this->language->get('help_directory_fonts');
		
		$data['button_save'] = $this->language->get('button_save');
		$data['button_cancel'] = $this->language->get('button_cancel');
	
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
       		'text' => $this->language->get('text_home'),
			'separator' => false,
			'href' => $this->url->link('common/home', 'token=' . $this->session->data['token'], 'SSL')
   		);

   		$data['breadcrumbs'][] = array(
       		'text' => $this->language->get('text_module'),
			'separator' => ':',
			'href' => $this->url->link('catalog/fnt_fonts', 'token=' . $this->session->data['token'], 'SSL')
   		);
		
		$data['action'] = $this->url->link('catalog/fnt_fonts', 'token=' . $this->session->data['token'], 'SSL');
		
		$data['cancel'] = $this->url->link('common/home', 'token=' . $this->session->data['token'], 'SSL');

		$data['token'] = $this->session->data['token'];
		$data['fonts'] = $this->config->get('fonts');
		if($this->config->get('fonts_default')) {	
			$data['fonts_default'] = $this->config->get('fonts_default');
		} else {
			$data['fonts_default'] = 'Arial,Helvetica,Times New Roman,Verdana,Geneva';
		}
		$url = DIR_CATALOG . 'view/javascript/fancy_design/css/fonts/webFontNames.txt';
		
		$content = file_get_contents($url);
		if($content){
			$data['content'] = explode(",", $content);
		} else {
			$data['content'] = array();
		}
		//Get woff fonts;
		$data['woff_font'] = $this->getWoffFonts();
		$data['woff_font_selected'] = array();
		$data['title_woff_font_selected'] = array();
		$woff_font_selected = $this->config->get('fonts_woff');
		if($woff_font_selected){
			foreach($woff_font_selected as $value){
				$data['woff_font_selected'][preg_replace("/\\.[^.\\s]{3,4}$/", "", $value)] = $value;
				$data['title_woff_font_selected'][] = preg_replace("/\\.[^.\\s]{3,4}$/", "", $value);
			}
		}
		$data['header'] = $this->load->controller('common/header');
		$data['column_left'] = $this->load->controller('common/column_left');
		$data['footer'] = $this->load->controller('common/footer');
		$this->response->setOutput($this->load->view('catalog/fnt_fonts.tpl', $data));
	}
	
	protected function validate() {
		if (!$this->user->hasPermission('modify', 'catalog/fnt_fonts')) {
			$this->error['warning'] = $this->language->get('error_permission');
		}		
		return !$this->error;
	}
	protected function getWoffFonts() {
		//load woff fonts from fonts directory
		$files = scandir(DIR_CATALOG . 'view/javascript/fancy_design/css/fonts');	
		$woff_files = array();
		foreach($files as $file) {
			if(preg_match("/.woff/", $file)) {
				$woff_files[$file] = preg_replace("/\\.[^.\\s]{3,4}$/", "", $file);
			}
		}

		return $woff_files;
	}
	protected function saveWoffFontsCss() {
		$fonts_css = DIR_CATALOG . 'view/javascript/fancy_design/css/jquery.fancyProductDesigner-fonts.css';	
		chmod($fonts_css, 0775);
		$handle = @fopen($fonts_css, 'w') or print('Cannot open file:  '.$fonts_css);
		$files = scandir(DIR_CATALOG . 'view/javascript/fancy_design/css/fonts');
		$data = '';
		if(is_array($files)) {
			foreach($files as $file) {
				if(preg_match("/.woff/", $file)) {
					$data .= '@font-face {'."\n";
					$data .= '  font-family: "'.preg_replace("/\\.[^.\\s]{3,4}$/", "", $file).'";'."\n";
					$data .= '  src: local("#"), url(fonts/'.$file.') format("woff");'."\n";
					$data .= '  font-weight: normal;'."\n";
					$data .= '  font-style: normal;'."\n";
					$data .= '}'."\n\n\n";
				}
			}
		}

		fwrite($handle, $data);
		fclose($handle);

	}
}
