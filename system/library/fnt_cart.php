<?php
class FntCart {
	private $config;
	private $db;
	private $data = array();
	
	public function __construct($registry) {
		$this->config = $registry->get('config');
		$this->customer = $registry->get('customer');
		$this->session = $registry->get('session');
		$this->db = $registry->get('db');
		$this->tax = $registry->get('tax');
		$this->weight = $registry->get('weight');
		
		if (!isset($this->session->data['cart']) || !is_array($this->session->data['cart'])) {
			$this->session->data['cart'] = array();
		}
	}

	public function addDesign($product_id, $qty = 1, $option = array(), $recurring_id = 0, $fpd_product = '', $price = 0, $thumbnail = '') {
		$design = base64_encode($fpd_product);

		$this->data = array();
		$product['product_id'] = (int)$product_id;

		if ($option) {
			$product['option'] = $option;
		}

		if ($recurring_id) {
			$product['recurring_id'] = (int)$recurring_id;
		}
		$validate_cart = $this->validate($product, $design);
		
		if ((int) $qty && ((int) $qty > 0)) {
			if ($validate_cart) {
				$this->session->data['cart'][$validate_cart] += (int) $qty;
			}else {
				$product['design'] = md5(mt_rand());
				$key_cart = base64_encode(serialize($product));
				$this->session->data['cart'][$key_cart] = (int) $qty;
				$this->session->data['cart-design'][$key_cart]['product_id'] = $product_id;
				$this->session->data['cart-design'][$key_cart]['product'] = $design;
				$this->session->data['cart-design'][$key_cart]['thumbnail'] = $thumbnail;
				$this->session->data['cart-design'][$key_cart]['price'] = (float)$price;
			}
		}
	}
	public function validate($data, $design){
		if(!empty($this->session->data['cart'])){
			foreach($this->session->data['cart'] as $key => $quantity){
				$product = unserialize(base64_decode($key));
				if($data['product_id'] == $product['product_id'] 
				   && ((empty($data['option']) && empty($product['option'])) || ($data['option'] == $product['option']))
				   && isset($product['design'])
				   && isset($this->session->data['cart-design'][$key]['product']) 
				   && $this->session->data['cart-design'][$key]['product'] == $design){
					return $key;
				}
			}
		}
		return '';
	}	
}
?>