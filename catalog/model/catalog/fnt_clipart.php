<?php
class ModelCatalogFntClipart extends Model {
	
	public function getClipart($clipart_id) {
		$query = $this->db->query("SELECT DISTINCT * FROM " . DB_PREFIX . "fnt_clipart WHERE clipart_id = '" . (int)$clipart_id . "'");
				
		return $query->row;
	}
	
	public function getClipartByCategory($category_clipart_id) {
		$clipart_data = array();
		
		$query = $this->db->query("SELECT * FROM " . DB_PREFIX . "fnt_clipart_to_category WHERE category_clipart_id = '" . (int)$category_clipart_id . "'");
		
		foreach ($query->rows as $result) {
			$clipart_data[] = $result['clipart_id'];
		}

		return $clipart_data;
	}
	/*Clipart Categories*/
	public function getCategoryClipart($category_clipart_id) {
	
		$query = $this->db->query("SELECT * FROM " . DB_PREFIX . "fnt_category_clipart fcc LEFT JOIN " . DB_PREFIX . "fnt_category_clipart_description fccd ON (fcc.category_clipart_id = fccd.category_clipart_id) WHERE fcc.category_clipart_id = '" . (int)$category_clipart_id . "' AND fccd.language_id = '" . (int)$this->config->get('config_language_id') . "' AND fcc.status = 1");
		return $query->row;
	}
	public function getCategoriesClipart($product_id) {
		$clipart_category_data = array();
		$sql = "SELECT DISTINCT fcc.category_clipart_id, fccd.name, fcc.parameter FROM " . DB_PREFIX . "fnt_category_clipart fcc LEFT JOIN " . DB_PREFIX . "fnt_category_clipart_description fccd ON (fcc.category_clipart_id = fccd.category_clipart_id) LEFT JOIN " . DB_PREFIX . "fnt_product_to_category_clipart fp2cd ON (fcc.category_clipart_id = fp2cd.category_clipart_id) WHERE fp2cd.product_id = '" . (int)$product_id . "' AND fccd.language_id = '" . $this->config->get('config_language_id') ."' AND fcc.status = 1 ORDER BY fcc.sort_order ASC";
		$query = $this->db->query($sql);
		foreach ($query->rows as $result) {
            $clipart_category_data[] = array(
				'category_clipart_id' => $result['category_clipart_id'],
				'name' => $result['name'],
				'parameter' => $result['parameter']
			);
        }
        return $clipart_category_data;
	}
}