<?php
class ModelCatalogFntClipart extends Model {
	public function addclipart($data) {
		$this->db->query("INSERT INTO " . DB_PREFIX . "fnt_clipart SET name = '" . $this->db->escape($data['name']) . "', image = '" . $this->db->escape($data['image']) . "', sort_order = '" . (int)$data['sort_order'] . "', status = '" . (int)$data['status'] . "', parameter = '" . $this->db->escape(serialize($data['parameter'])) . "', date_added = NOW()");
		
		$clipart_id = $this->db->getLastId();
		
		if (isset($data['clipart_category'])) {
			foreach ($data['clipart_category'] as $category_clipart_id) {
				$this->db->query("INSERT INTO " . DB_PREFIX . "fnt_clipart_to_category SET clipart_id = '" . (int)$clipart_id . "', category_clipart_id = '" . (int)$category_clipart_id . "'");
			}
		}
		
		$this->cache->delete('fnt_clipart');
	}
	
	public function editclipart($clipart_id, $data) {		
		$this->db->query("UPDATE " . DB_PREFIX . "fnt_clipart SET name = '" . $this->db->escape($data['name']) . "', image = '" . $this->db->escape($data['image']) . "', sort_order = '" . (int)$data['sort_order'] . "', status = '" . (int)$data['status'] . "' , parameter = '" . $this->db->escape(serialize($data['parameter'])) . "' WHERE clipart_id = '" . (int)$clipart_id . "'");

		$this->db->query("DELETE FROM " . DB_PREFIX . "fnt_clipart_to_category WHERE clipart_id = '" . (int)$clipart_id . "'");
		
		if (isset($data['clipart_category'])) {
			foreach ($data['clipart_category'] as $category_clipart_id) {
				$this->db->query("INSERT INTO " . DB_PREFIX . "fnt_clipart_to_category SET clipart_id = '" . (int)$clipart_id . "', category_clipart_id = '" . (int)$category_clipart_id . "'");
			}		
		}
			
		$this->cache->delete('fnt_clipart');
	}
	
	public function deleteClipart($clipart_id) {
		$this->db->query("DELETE FROM " . DB_PREFIX . "fnt_clipart WHERE clipart_id = '" . (int)$clipart_id . "'");
		$this->db->query("DELETE FROM " . DB_PREFIX . "fnt_clipart_to_category WHERE clipart_id = '" . (int)$clipart_id . "'");
		$this->cache->delete('fnt_clipart');
	}
	
	public function getClipart($clipart_id) {
		$query = $this->db->query("SELECT DISTINCT * FROM " . DB_PREFIX . "fnt_clipart WHERE clipart_id = '" . (int)$clipart_id . "'");
				
		return $query->row;
	}
	
	public function getCliparts($data = array()) {
		$sql = "SELECT * FROM " . DB_PREFIX . "fnt_clipart WHERE clipart_id != 0";
		
		if (!empty($data['filter_name'])) {
			$sql .= " AND name LIKE '" . $this->db->escape($data['filter_name']) . "%'";
		}
		if (isset($data['filter_status']) && $data['filter_status'] !== null) {
			$sql .= " AND status = '" . (int)$data['filter_status'] . "'";
		}
		
		$sql .= " GROUP BY clipart_id";
					
		$sort_data = array(
			'name',
			'status'
		);	
		if (isset($data['sort']) && in_array($data['sort'], $sort_data)) {
			$sql .= " ORDER BY " . $data['sort'];	
		} else {
			$sql .= " ORDER BY name";	
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
	
	public function getClipartCategories($clipart_id) {
		$clipart_category_data = array();
		
		$query = $this->db->query("SELECT * FROM " . DB_PREFIX . "fnt_clipart_to_category WHERE clipart_id = '" . (int)$clipart_id . "'");
		
		foreach ($query->rows as $result) {
			$clipart_category_data[] = $result['category_clipart_id'];
		}

		return $clipart_category_data;
	}
	
	public function getClipartByCategory($category_clipart_id) {
		$clipart_data = array();
		
		$query = $this->db->query("SELECT * FROM " . DB_PREFIX . "fnt_clipart_to_category WHERE category_clipart_id = '" . (int)$category_clipart_id . "'");
		
		foreach ($query->rows as $result) {
			$clipart_data[] = $result['clipart_id'];
		}

		return $clipart_data;
	}
	
	public function getTotalcliparts($data = array()) {
		$sql = "SELECT COUNT(DISTINCT clipart_id) AS total FROM " . DB_PREFIX . "fnt_clipart WHERE clipart_id != 0";
					
		if (!empty($data['filter_name'])) {
			$sql .= " AND name LIKE '" . $this->db->escape($data['filter_name']) . "%'";
		}
		
		if (isset($data['filter_status']) && $data['filter_status'] !== null) {
			$sql .= " AND status = '" . (int)$data['filter_status'] . "'";
		}
		
		$query = $this->db->query($sql);
		
		return $query->row['total'];
	}	
}