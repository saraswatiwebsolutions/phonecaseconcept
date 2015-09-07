<?php
class ModelCatalogFntProductDesign extends Model {
	public function addProductDesign($data) {

        $arr_design_stage = array(
            'design_stage_width' => $data['design_stage_width'],
            'design_stage_height' => $data['design_stage_height']
        );

		$this->db->query("INSERT INTO " . DB_PREFIX . "fnt_product_design SET product_id = '" . (int)$data['product_id'] . "', parameters = '" . $this->db->escape(serialize($arr_design_stage)) . "', status = '" . (int)$data['status'] . "', date_added = NOW()");


        $product_design_id = $this->db->getLastId();

        foreach ($data['fnt_product_design_description'] as $language_id => $value) {
            $this->db->query("INSERT INTO " . DB_PREFIX . "fnt_product_design_description SET product_design_id = '" . (int)$product_design_id . "', language_id = '" . (int)$language_id . "', name = '" . $this->db->escape($value['name']) . "'");
        }
		if (isset($data['category_design_id'])) {
            $this->db->query("UPDATE " . DB_PREFIX . "fnt_product_design SET category_design_id = '" . (int)$data['category_design_id'] . "' WHERE product_design_id = '" . (int)$product_design_id . "'");
		}
		
		if (isset($data['product_image'])) {
			foreach ($data['product_image'] as $image) {
				$this->db->query("INSERT INTO " . DB_PREFIX . "fnt_product_design_element SET product_design_id = '" . (int)$product_design_id . "', name = '" . $this->db->escape($image['name']) . "', image = '" . $this->db->escape($image['image']) . "', parameters = '" . base64_decode($image['view_setting_values']) . "', sort_order = '" . (int)$image['sort_order'] . "'");
			}
		}
		if (isset($data['parameters'])) {
			$this->db->query("INSERT INTO " . DB_PREFIX . "fnt_product_setting SET product_design_id = '" . (int)$product_design_id . "', parameters = '" . $this->db->escape(serialize($data['parameters'])) . "'");
		}
		$this->cache->delete('fnt_product_design');
		return $product_design_id;
	}
	
	public function editProductDesign($product_design_id, $data) {

        $arr_design_stage = array(
            'design_stage_width' => (int)$data['design_stage_width'],
            'design_stage_height' => (int)$data['design_stage_height']
        );
		$this->db->query("UPDATE " . DB_PREFIX . "fnt_product_design SET product_id = '" . (int)$data['product_id'] . "', parameters = '" . $this->db->escape(serialize($arr_design_stage)) . "', status = '" . (int)$data['status'] . "' WHERE product_design_id = '" . (int)$product_design_id . "'");

        $this->db->query("DELETE FROM " . DB_PREFIX . "fnt_product_design_description WHERE product_design_id = '" . (int)$product_design_id . "'");

        foreach ($data['fnt_product_design_description'] as $language_id => $value) {
            $this->db->query("INSERT INTO " . DB_PREFIX . "fnt_product_design_description SET product_design_id = '" . (int)$product_design_id . "', language_id = '" . (int)$language_id . "', name = '" . $this->db->escape($value['name']) . "'");
        }

		$this->db->query("DELETE FROM " . DB_PREFIX . "fnt_product_design_element WHERE product_design_id = '" . (int)$product_design_id . "'");

		if (isset($data['product_image'])) {
			foreach ($data['product_image'] as $image) {
				if(isset($image['product_design_element_id']) && $image['product_design_element_id']){

					$this->db->query("INSERT INTO " . DB_PREFIX . "fnt_product_design_element SET product_design_element_id = '" . (int)$image['product_design_element_id'] . "', product_design_id = '" . (int)$product_design_id . "', name = '" . $this->db->escape($image['name']) . "', image = '" . $this->db->escape($image['image']). "', parameters = '" . base64_decode($image['view_setting_values']) . "', sort_order = '" . (int)$image['sort_order'] . "'");
				} else {
					$this->db->query("INSERT INTO " . DB_PREFIX . "fnt_product_design_element SET product_design_id = '" . (int)$product_design_id . "', name = '" . $this->db->escape($image['name']) . "', image = '" . $this->db->escape($image['image']) . "', parameters = '" . base64_decode($image['view_setting_values']) . "', sort_order = '" . (int)$image['sort_order'] . "'");
				}
			}
		}
		if (isset($data['category_design_id'])) {
				$this->db->query("UPDATE " . DB_PREFIX . "fnt_product_design SET category_design_id = '" . (int)$data['category_design_id'] . "' WHERE product_design_id = '" . (int)$product_design_id . "'" );
		}
		$this->cache->delete('fnt_product_design');
	}

    //fnt new function
    public function getProductIdFromProductDesign ($product_design_id = 0) {
        $sql = "SELECT product_id FROM " . DB_PREFIX . "fnt_product_design WHERE product_design_id = '" . (int)$product_design_id . "'";
        $query = $this->db->query($sql);
        return $query->row['product_id'];
    }
    public function countValue($product_id = 0) {
        $sql = "SELECT COUNT(*) AS total FROM " . DB_PREFIX . "fnt_product_design WHERE product_id = '" . (int)$product_id . "'";
        $query = $this->db->query($sql);
        return $query->row['total'];
    }
    //end fnt new function

	public function deleteProductDesign($product_design_id) {
        $product_id = $this->getProductIdFromProductDesign($product_design_id);

        $this->db->query("DELETE FROM " . DB_PREFIX . "fnt_product_design WHERE product_design_id = '" . (int)$product_design_id . "'");
		//$this->db->query("DELETE FROM " . DB_PREFIX . "fnt_product_to_category_design WHERE product_design_id = '" . (int)$product_design_id . "'");

        $total = $this->countValue($product_id);
        if($total == 0) {
            $this->db->query("DELETE FROM " . DB_PREFIX . "fnt_product_setting WHERE product_id = '" . (int)$product_id . "'");
        }

		$product_designs = $this->db->query("SELECT product_design_element_id FROM " . DB_PREFIX ."fnt_product_design_element WHERE product_design_id ='".(int)$product_design_id."'");
		if ($product_designs) {
			foreach ($product_designs->rows as $product_design) {
				$this->db->query("DELETE FROM " . DB_PREFIX . "fnt_product_design_element_detail WHERE product_design_element_id = '" . (int)$product_design['product_design_element_id'] . "'");
			}
		}
		$this->db->query("DELETE FROM " . DB_PREFIX . "fnt_product_design_element WHERE product_design_id = '" . (int)$product_design_id . "'");
		$this->cache->delete('fnt_product_design');
	}
	
	public function getProductDesign($product_design_id) {
		$query = $this->db->query("SELECT DISTINCT *
		                            FROM " . DB_PREFIX . "fnt_product_design pd
		                            LEFT JOIN " . DB_PREFIX . "fnt_product_design_description pdd ON (pd.product_design_id = pdd.product_design_id)
		                            WHERE pd.product_design_id = '" . (int)$product_design_id . "'");
		return $query->row;
	}
	
	public function getProductDesigns($data = array()) {
		$sql = "SELECT * FROM " . DB_PREFIX . "fnt_product_design pd
		        LEFT JOIN " . DB_PREFIX . "fnt_product_design_description pdd ON pd.product_design_id = pdd.product_design_id
		        WHERE pd.product_design_id != 0";
		
		if (!empty($data['filter_name'])) {
			$sql .= " AND pdd.name LIKE '" . $this->db->escape($data['filter_name']) . "%'";
		}
		if (isset($data['filter_status']) && $data['filter_status'] !== null) {
			$sql .= " AND status = '" . (int)$data['filter_status'] . "'";
		}
		
		$sql .= " GROUP BY pd.product_design_id";
					
		$sort_data = array(
			'pdd.name',
			'pd.status'
		);	
		if (isset($data['sort']) && in_array($data['sort'], $sort_data)) {
			$sql .= " ORDER BY " . $data['sort'];	
		}
        else {
			$sql .= " ORDER BY pdd.name";
		}
		if (isset($data['order']) && ($data['order'] == 'DESC')) {
			$sql .= " DESC";
		} else {
			$sql .= " ASC";
		}
		if (isset($data['start']) || isset($data['limit'])) {
			if ($data['start'] < 0) {
				$data['start'] = 0;
			}				

			if ($data['limit'] < 1) {
				$data['limit'] = 20;
			}	
		
			$sql .= " LIMIT " . (int)$data['start'] . "," . (int)$data['limit'];
		}	
		
		$query = $this->db->query($sql);
		return $query->rows;
	}
	
	public function getProductDesignCategories($product_design_id) {
		$clipart_category_data = array();
		
		$query = $this->db->query("SELECT * FROM " . DB_PREFIX . "fnt_product_design_to_category_clipart WHERE product_design_id = '" . (int)$product_design_id . "'");
		
		foreach ($query->rows as $result) {
			$clipart_category_data[] = $result['category_clipart_id'];
		}

		return $clipart_category_data;
	}

    public function getProductDesignDescriptions($product_design_id) {
        $product_design_description_data = array();

        $query = $this->db->query("SELECT * FROM " . DB_PREFIX . "fnt_product_design_description WHERE product_design_id = '" . (int)$product_design_id . "'");

        foreach ($query->rows as $result) {
            $product_design_description_data[$result['language_id']] = array(
                'name'             => $result['name']
            );
        }

        return $product_design_description_data;
    }
			
	public function getProductDesignImages($product_design_id) {
		$query = $this->db->query("SELECT * FROM " . DB_PREFIX . "fnt_product_design_element WHERE product_design_id = '" . (int)$product_design_id . "' ORDER BY sort_order ASC");
		
		return $query->rows;
	}
		
	public function getProductDesignFirstImage($product_design_id) {
		$query = $this->db->query("SELECT * FROM " . DB_PREFIX . "fnt_product_design_element WHERE product_design_id = '" . (int)$product_design_id . "' ORDER BY sort_order ASC");
		
		return $query->row;
	}
	public function getTotalProductDesignImages($product_design_id) {
		$query = $this->db->query("SELECT COUNT(*) AS total FROM " . DB_PREFIX . "fnt_product_design_element WHERE product_design_id = '" . (int)$product_design_id . "'");
		return $query->row['total'];
	}
		
	public function getProductDesignImage($product_design_element_id) {
		$query = $this->db->query("SELECT * FROM " . DB_PREFIX . "fnt_product_design_element WHERE product_design_element_id = '" . (int)$product_design_element_id . "'");
		
		return $query->row;
	}
	
	public function addProductDesignElement($product_design_element_id,$data,$sort_order){
		$query = $this->db->query("INSERT INTO " . DB_PREFIX . "fnt_product_design_element_detail SET product_design_element_id = '" . (int)$product_design_element_id . "', type = '" . $this->db->escape($data['type']) . "', value = '" . $this->db->escape($data['source']) . "', parameters = '" . $this->db->escape($data['parameters']) . "', sort_order = '" . (int)$sort_order . "'");
	}
	public function getProductCategories($product_design_id) {
		$category_data = array();
		
		$query = $this->db->query("SELECT * FROM " . DB_PREFIX . "fnt_product_to_category_design WHERE product_design_id = '" . (int)$product_design_id . "'");
		
		foreach ($query->rows as $result) {
			$category_data[] = $result['category_design_id'];
		}

		return $category_data;
	}
    public function getProductCategorie($category_design_id) {

        $query = $this->db->query("SELECT *
                                FROM " . DB_PREFIX . "fnt_category_design cd
                                LEFT JOIN " . DB_PREFIX . "fnt_category_design_description cdd ON cd.category_design_id = cdd.category_design_id
                                WHERE cd.category_design_id = '" . (int)$category_design_id . "'");
        return $query->row;
    }
	public function getProductDesignElement($product_design_element_id) {
		$query = $this->db->query("SELECT * FROM " . DB_PREFIX . "fnt_product_design_element_detail WHERE product_design_element_id = '" . (int)$product_design_element_id . "' ORDER BY sort_order ASC");
		return $query->rows;
	}
	public function getProductDesignElementAll() {
		$query = $this->db->query("SELECT * FROM " . DB_PREFIX . "fnt_product_ideas_element_detail");
		return $query->rows;
	}
	public function editProductDesignElement($product_ideas_element_detail_id,$parameters) {
		$query = $this->db->query("UPDATE " . DB_PREFIX . "fnt_product_ideas_element_detail SET parameters = '" . $parameters ."' WHERE product_ideas_element_detail_id = '" . (int)$product_ideas_element_detail_id . "'");
	}

	public function deleteProductDesignElement($product_design_element_id){
		$query = $this->db->query("DELETE FROM " . DB_PREFIX . "fnt_product_design_element_detail WHERE product_design_element_id = " . (int)$product_design_element_id . "");
	}
	public function getTotalProductDesigns($data = array()) {
		$sql = "SELECT COUNT(DISTINCT pd.product_design_id) AS total
		        FROM " . DB_PREFIX . "fnt_product_design pd
		        LEFT JOIN " . DB_PREFIX . "fnt_product_design_description pdd ON pd.product_design_id = pdd.product_design_id
		        WHERE pdd.language_id = '" . (int)$this->config->get('config_language_id') . "'";
					
		if (!empty($data['filter_name'])) {
			$sql .= " AND pdd.name LIKE '" . $this->db->escape($data['filter_name']) . "%'";
		}
		
		if (isset($data['filter_status']) && $data['filter_status'] !== null) {
			$sql .= " AND pd.status = '" . (int)$data['filter_status'] . "'";
		}
		$query = $this->db->query($sql);
		if($query->num_rows) {return $query->row['total'];}
		else {return 0;}
	}	
	public function addviewDesignByImport($product_design_id,$title,$thumbnail){
		$total_view = $this->getMaxSortOrderOfView($product_design_id);
		$this->db->query("INSERT INTO " . DB_PREFIX . "fnt_product_design_element SET product_design_id = '" . (int)$product_design_id . "', name = '" . $this->db->escape($title) . "', image = '" . $this->db->escape($thumbnail) . "', sort_order = '" . (int)$total_view . "'");
		return  $this->db->getLastId();
	}
	
	public function getMaxSortOrderOfView($product_design_id){
		$query = $this->db->query("SELECT MAX(sort_order) AS max_order FROM " . DB_PREFIX . "fnt_product_design_element WHERE product_design_id = '" . (int)$product_design_id . "'");
		
		return $query->row['max_order']+1;
	}
	public function getParametersByProduct($product_id){
		$query = $this->db->query("SELECT * FROM " . DB_PREFIX . "fnt_product_setting WHERE product_id = '" . (int)$product_id . "'");
		
		return $query->row;
	}
    public function insertIndividualSetting ($product_id, $data) {
        $this->db->query("DELETE FROM " . DB_PREFIX . "fnt_product_setting WHERE product_id = '" . (int)$product_id . "'");
        $this->db->query("INSERT INTO " . DB_PREFIX . "fnt_product_setting SET product_id = '" . (int)$product_id . "', parameters = '" . $this->db->escape(serialize($data['parameters'])) . "'");
		/*Insert keyword*/
        $this->db->query("DELETE FROM " . DB_PREFIX . "url_alias WHERE query = 'product=" . (int)$product_id . "'");
       $this->db->query("INSERT INTO " . DB_PREFIX . "url_alias SET query = 'product=" . (int)$product_id . "', keyword = '" . $this->db->escape($data['keyword']) . "'");
    }
	public function getKeyword($product_id){
		$query = $this->db->query("SELECT keyword FROM " . DB_PREFIX . "url_alias WHERE query = 'product=" . (int)$product_id . "'");
		return $query->row;
	}
}