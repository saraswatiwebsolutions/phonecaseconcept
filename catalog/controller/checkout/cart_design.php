<?php 
class ControllerCheckoutCartDesign extends Controller {
	private $error = array();
	public function add() {
		$this->load->library('fnt_cart');
		$this->fnt_cart = new FntCart($this->registry);
		$json = array();
		if(isset($this->request->post['fpd_product_price'])){
			$this->load->language('checkout/cart');
			
			if (isset($this->request->post['product_id'])) {
				$product_id = $this->request->post['product_id'];
			} else {
				$product_id = 0;
			}
			
			if (isset($this->request->post['fpd_product_thumbnail'])) {
				$thumbnail = $this->request->post['fpd_product_thumbnail'];
			} else {
				$thumbnail = '';
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
				if (isset($this->request->post['recurring_id'])) {
					$recurring_id = $this->request->post['recurring_id'];
				} else {
					$recurring_id = 0;
				}

				$recurrings = $this->model_catalog_product->getProfiles($product_info['product_id']);

				if ($recurrings) {
					$recurring_ids = array();

					foreach ($recurrings as $recurring) {
						$recurring_ids[] = $recurring['recurring_id'];
					}

					if (!in_array($recurring_id, $recurring_ids)) {
						$json['error']['recurring'] = $this->language->get('error_recurring_required');
					}
				}
				
				if (!$json) {
					$this->fnt_cart->addDesign($product_id, $quantity, $option, $recurring_id, urldecode($this->request->post['fpd_product']), (float)$this->request->post['fpd_product_price'] - (float)$product_info['price'], $thumbnail);
				$json['success'] = sprintf($this->language->get('text_success'), $this->url->link('product/product', 'product_id=' . $this->request->post['product_id']), $product_info['name'], $this->url->link('checkout/cart'));

				unset($this->session->data['shipping_method']);
				unset($this->session->data['shipping_methods']);
				unset($this->session->data['payment_method']);
				unset($this->session->data['payment_methods']);

				// Totals
				$this->load->model('extension/extension');

				$total_data = array();
				$total = 0;
				$taxes = $this->cart->getTaxes();

				// Display prices
				if (($this->config->get('config_customer_price') && $this->customer->isLogged()) || !$this->config->get('config_customer_price')) {
					$sort_order = array();

					$results = $this->model_extension_extension->getExtensions('total');

					foreach ($results as $key => $value) {
						$sort_order[$key] = $this->config->get($value['code'] . '_sort_order');
					}

					array_multisort($sort_order, SORT_ASC, $results);

					foreach ($results as $result) {
						if ($this->config->get($result['code'] . '_status')) {
							$this->load->model('total/' . $result['code']);

							$this->{'model_total_' . $result['code']}->getTotal($total_data, $total, $taxes);
						}
					}

					$sort_order = array();

					foreach ($total_data as $key => $value) {
						$sort_order[$key] = $value['sort_order'];
					}

					array_multisort($sort_order, SORT_ASC, $total_data);
				}

				$json['total'] = sprintf($this->language->get('text_items'), $this->cart->countProducts() + (isset($this->session->data['vouchers']) ? count($this->session->data['vouchers']) : 0), $this->currency->format($total));
				} else {
					$json['redirect'] = str_replace('&amp;', '&', $this->url->link('product/product', 'product_id=' . $this->request->post['product_id']));
				}
			}
		}
		$this->response->addHeader('Content-Type: application/json');	
		$this->response->setOutput(json_encode($json));		
	}
}
?>
