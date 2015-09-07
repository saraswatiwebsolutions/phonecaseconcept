<?php
class ModelCatalogFntCategoryClipart extends Model {
	public function addCategoryClipart($data) {
		$this->db->query("INSERT INTO " . DB_PREFIX . "fnt_category_clipart SET parameter = '" . $this->db->escape(serialize($data['parameter'])) . "', sort_order = '" . (int)$data['sort_order'] . "', status = '" . (int)$data['status'] . "', date_added = NOW()");

		$category_clipart_id = $this->db->getLastId();
		
		foreach ($data['category_clipart_description'] as $language_id => $value) {
			$this->db->query("INSERT INTO " . DB_PREFIX . "fnt_category_clipart_description SET category_clipart_id = '" . (int)$category_clipart_id . "', language_id = '" . (int)$language_id . "', name = '" . $this->db->escape($value) . "'");
		}
		$this->cache->delete('fnt_category_clipart');
	}

	public function editCategoryClipart($category_clipart_id, $data) {
		$this->db->query("UPDATE " . DB_PREFIX . "fnt_category_clipart SET parameter = '" . $this->db->escape(serialize($data['parameter'])) . "', sort_order = '" . (int)$data['sort_order'] . "', status = '" . (int)$data['status'] . "' WHERE category_clipart_id = '" . (int)$category_clipart_id . "'");

		$this->db->query("DELETE FROM " . DB_PREFIX . "fnt_category_clipart_description WHERE category_clipart_id = '" . (int)$category_clipart_id . "'");
		
		foreach ($data['category_clipart_description'] as $language_id => $value) {
			$this->db->query("INSERT INTO " . DB_PREFIX . "fnt_category_clipart_description SET category_clipart_id = '" . (int)$category_clipart_id . "', language_id = '" . (int)$language_id . "', name = '" . $this->db->escape($value) . "'");
		}
		$this->cache->delete('fnt_category_clipart');
	}

	public function deleteCategoryClipart($category_clipart_id) {
		$this->db->query("DELETE FROM " . DB_PREFIX . "fnt_category_clipart WHERE category_clipart_id = '" . (int)$category_clipart_id . "'");
		$this->db->query("DELETE FROM " . DB_PREFIX . "fnt_category_clipart_description WHERE category_clipart_id = '" . (int)$category_clipart_id . "'");
		$this->cache->delete('fnt_category_clipart');
	}

	public function getCategoryClipart($category_clipart_id) {
		$query = $this->db->query("SELECT DISTINCT * FROM " . DB_PREFIX . "fnt_category_clipart  WHERE category_clipart_id = '" . (int)$category_clipart_id . "'");

		return $query->row;
	}

	public function getCategoriesClipart($data) {
		$sql = "SELECT DISTINCT * FROM " . DB_PREFIX . "fnt_category_clipart c LEFT JOIN " . DB_PREFIX . "fnt_category_clipart_description cd2 ON (c.category_clipart_id = cd2.category_clipart_id) WHERE cd2.language_id = '" . (int)$this->config->get('config_language_id') . "'";

		if (!empty($data['filter_name'])) {
			$sql .= " AND cd2.name LIKE '" . $this->db->escape($data['filter_name']) . "%'";
		}
		
		$sql .= " GROUP BY c.category_clipart_id ORDER BY cd2.name";

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

	public function getCategoryClipartDescriptions($category_clipart_id) {
		$category_clipart_description_data = array();

		$query = $this->db->query("SELECT * FROM " . DB_PREFIX . "fnt_category_clipart_description WHERE category_clipart_id = '" . (int)$category_clipart_id . "'");

		foreach ($query->rows as $result) {
			$fnt_category_clipart_description_data[$result['language_id']] = $result['name'];
		}

		return $fnt_category_clipart_description_data;
	}

	public function getTotalCategoriesClipart() {
      	$query = $this->db->query("SELECT COUNT(*) AS total FROM " . DB_PREFIX . "fnt_category_clipart");

		return $query->row['total'];
	}
}