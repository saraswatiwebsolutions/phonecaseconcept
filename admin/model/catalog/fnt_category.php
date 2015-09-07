<?php
class ModelCatalogFntCategory extends Model {
	public function addCategory($data) {
		$this->db->query("INSERT INTO " . DB_PREFIX . "fnt_category_design SET sort_order = '" . (int)$data['sort_order'] . "', status = '" . (int)$data['status'] . "', date_added = NOW()");

		$category_design_id = $this->db->getLastId();
		
		foreach ($data['category_description'] as $language_id => $value) {
			$this->db->query("INSERT INTO " . DB_PREFIX . "fnt_category_design_description SET category_design_id = '" . (int)$category_design_id . "', language_id = '" . (int)$language_id . "', name = '" . $this->db->escape($value) . "'");
		}
		$this->cache->delete('fnt_category_design');
	}

	public function editCategory($category_design_id, $data) {
		$this->db->query("UPDATE " . DB_PREFIX . "fnt_category_design SET sort_order = '" . (int)$data['sort_order'] . "', status = '" . (int)$data['status'] . "' WHERE category_design_id = '" . (int)$category_design_id . "'");

		$this->db->query("DELETE FROM " . DB_PREFIX . "fnt_category_design_description WHERE category_design_id = '" . (int)$category_design_id . "'");
		$this->db->query("DELETE FROM " . DB_PREFIX . "url_alias WHERE query = 'category_design_id=" . (int)$category_design_id. "'");

		foreach ($data['category_description'] as $language_id => $value) {
			$this->db->query("INSERT INTO " . DB_PREFIX . "fnt_category_design_description SET category_design_id = '" . (int)$category_design_id . "', language_id = '" . (int)$language_id . "', name = '" . $this->db->escape($value) . "'");
		}
		$this->cache->delete('fnt_category_design');
	}

	public function deleteCategory($category_design_id) {
		$this->db->query("DELETE FROM " . DB_PREFIX . "fnt_category_design WHERE category_design_id = '" . (int)$category_design_id . "'");
		$this->db->query("DELETE FROM " . DB_PREFIX . "fnt_category_design_description WHERE category_design_id = '" . (int)$category_design_id . "'");
		$this->cache->delete('fnt_category_design');
	}

	public function getCategory($category_design_id) {
		$query = $this->db->query("SELECT DISTINCT * FROM " . DB_PREFIX . "fnt_category_design  WHERE category_design_id = '" . (int)$category_design_id . "'");

		return $query->row;
	}

	public function getCategories($data) {
		$sql = "SELECT DISTINCT * FROM " . DB_PREFIX . "fnt_category_design c LEFT JOIN " . DB_PREFIX . "fnt_category_design_description cd2 ON (c.category_design_id = cd2.category_design_id) WHERE cd2.language_id = '" . (int)$this->config->get('config_language_id') . "'";

		if (!empty($data['filter_name'])) {
			$sql .= " AND cd2.name LIKE '" . $this->db->escape($data['filter_name']) . "%'";
		}
		
		$sql .= " GROUP BY c.category_design_id ORDER BY cd2.name";

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

	public function getCategoryDescriptions($category_design_id) {
		$category_description_data = array();

		$query = $this->db->query("SELECT * FROM " . DB_PREFIX . "fnt_category_design_description WHERE category_design_id = '" . (int)$category_design_id . "'");

		foreach ($query->rows as $result) {
			$fnt_category_design_description_data[$result['language_id']] = $result['name'];
		}

		return $fnt_category_design_description_data;
	}

	public function getTotalCategories() {
      	$query = $this->db->query("SELECT COUNT(*) AS total FROM " . DB_PREFIX . "fnt_category_design");

		return $query->row['total'];
	}
}