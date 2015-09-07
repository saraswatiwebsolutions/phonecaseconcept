<?php
class ModelCatalogFntProductDesign extends Model
{

    public function getProductDesign($product_design_id)
    {
        $query = $this->db->query("SELECT DISTINCT * FROM " . DB_PREFIX . "fnt_product_design WHERE product_design_id = '" . (int)$product_design_id . "'");

        return $query->row;
    }

	public function getProductDesignByProduct($product_id)
    {
        $query = $this->db->query("SELECT DISTINCT * FROM " . DB_PREFIX . "fnt_product_design WHERE product_id = '" . (int)$product_id . "' AND status = 1");
        return $query->row;
    }
    public function getProductDesigns($data = array())
    {
        $sql = "SELECT * FROM " . DB_PREFIX . "fnt_product_design fpd LEFT JOIN " . DB_PREFIX . "fnt_product_design_description fpdd ON (fpd.product_design_id = fpdd.product_design_id)";
		
		$sql .= " WHERE fpd.product_design_id != 0";
		if(!empty($data['category_design_id'])){
			$sql .= " AND fpd.category_design_id = '" . (int)$data['category_design_id'] . "'";
		} else {
			$sql .= " AND fpd.category_design_id = 0";
		}
		if(!empty($data['product_id'])){
			$sql .= " AND fpd.product_id = '" . (int)$data['product_id'] . "'";
		}
		$sql .= " AND fpdd.language_id = '" . (int)$this->config->get('config_language_id') . "' AND fpd.status = 1";
        $sql .= " GROUP BY fpd.product_design_id ASC";

        $query = $this->db->query($sql);

        return $query->rows;
    }

    public function getProductDesignImages($product_design_id)
    {
        $query = $this->db->query("SELECT * FROM " . DB_PREFIX . "fnt_product_design_element WHERE product_design_id = '" . (int)$product_design_id . "' ORDER BY sort_order ASC");

        return $query->rows;
    }

    public function getProductDesignImage($product_design_element_id)
    {
        $query = $this->db->query("SELECT * FROM " . DB_PREFIX . "fnt_product_design_element WHERE product_design_element_id = '" . (int)$product_design_element_id . "'");

        return $query->row;
    }

    public function addProductDesignElement($product_design_element_id, $type, $source, $parameters, $sort_order)
    {
        $query = $this->db->query("INSERT INTO " . DB_PREFIX . "fnt_product_design_element_detail SET product_design_element_id = '" . (int)$product_design_element_id . "', type = '" . $this->db->escape($type) . "', value = '" . $this->db->escape($source) . "', parameters = '" . $this->db->escape($parameters) . "', sort_order = '" . (int)$sort_order . "'");
    }

    public function getProductDesignElement($product_design_element_id)
    {
        $query = $this->db->query("SELECT * FROM " . DB_PREFIX . "fnt_product_design_element_detail WHERE product_design_element_id = '" . (int)$product_design_element_id . "' ORDER BY sort_order");
        return $query->rows;
    }
	
	public function getSettingParameters($product_id){
		$query = $this->db->query("SELECT * FROM " . DB_PREFIX . "fnt_product_setting WHERE product_id = '" . (int)$product_id . "'");
		return $query->row;
	}
	public function getCategoryDesignByProductId($product_id){
		$query = $this->db->query("SELECT DISTINCT fpd.category_design_id, fcdd.name FROM " . DB_PREFIX . "fnt_product_design fpd LEFT JOIN " . DB_PREFIX . "fnt_category_design_description fcdd ON (fpd.category_design_id = fcdd.category_design_id) WHERE  fpd.product_id= '". (int)$product_id . "' AND fcdd.language_id = '" . (int)$this->config->get('config_language_id') . "'");
		return $query->rows;
	}
}