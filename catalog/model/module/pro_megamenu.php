<?php
class ModelModuleProMegamenu extends Model {

	public function listSubWithoutUl($parent_id) {
		$lang_id = $this->config->get('config_language_id');
		$query = $this->db->query("SELECT * FROM " . DB_PREFIX . "pro_megamenu  WHERE " . DB_PREFIX . "pro_megamenu.parent_id = '".$parent_id."' ORDER BY " . DB_PREFIX . "pro_megamenu.id ASC");
		$result=array();
		foreach ($query->rows as $value) {
			$result[] = $value;
		}
		if($result){
			foreach($result as $key=> $value) :
				$title = json_decode(base64_decode($value['title']), true);
				if($value['type']=='category')
					$value['url'] = $this->url->link('product/category', 'path=' . $value['type_id']);
				if($value['type']=='infomation')
					$value['url'] = $this->url->link('information/information', 'information_id=' . $value['type_id']);
				if($value['type']=='manufacturer')
					$value['url'] = $this->url->link('product/manufacturer/info', 'manufacturer_id=' . $value['type_id']);
					?>
					<li><a href="<?php echo $value['url']; ?>"><?php echo html_entity_decode(html_entity_decode($title[$lang_id])); ?></a></li>
					<?php
					$this->listSubWithoutUl($value['id']);
			endforeach ;
		}
	}
	public function list_submenu_mega($parent_id) {
		$lang_id = $this->config->get('config_language_id');
		$query = $this->db->query("SELECT * FROM " . DB_PREFIX . "pro_megamenu  WHERE " . DB_PREFIX . "pro_megamenu.id = '".$parent_id."'");
		$result=array();
		foreach ($query->rows as $value) {
			$result[] = $value;
		}
		$parent_info = $result;
		$query = $this->db->query("SELECT * FROM " . DB_PREFIX . "pro_megamenu  WHERE " . DB_PREFIX . "pro_megamenu.parent_id = '".$parent_id."' ORDER BY " . DB_PREFIX . "pro_megamenu.id ASC");
		$result=array();
		foreach ($query->rows as $value) {
			$result[] = $value;
		}
		?>
			<div class="pro-mega-menu-dropdown">
				<div class="pro-mega-menu-dropdown-inner">
					<div class="sub-menu megamenu-sub columns<?php echo $parent_info[0]['columns'] ?>" style="width:<?php echo $parent_info[0]['widths']; ?>px">
						<div class='mega-content'>
							<?php
								$content = json_decode(base64_decode($parent_info[0]['subcontent']), true);
							?>
							<?php echo html_entity_decode(html_entity_decode($content[$lang_id]));?>
						</div>
						<?php
						if($result!=null){
						echo "<ul class='sub-menu-mega'>";
							foreach($result as $key=> $value) : ?>
								<?php
								$title = json_decode(base64_decode($value['title']), true);
								if($value['type']=='category')
									$value['url'] = $this->url->link('product/category', 'path=' . $value['type_id']);
								if($value['type']=='infomation')
									$value['url'] = $this->url->link('information/information', 'information_id=' . $value['type_id']);
								if($value['type']=='manufacturer')
									$value['url'] = $this->url->link('product/manufacturer/info', 'manufacturer_id=' . $value['type_id']);
								?>
								<li><a href="<?php echo $value['url']; ?>"><?php echo html_entity_decode(html_entity_decode($title[$lang_id])); ?></a></li>
								<?php $this->listSubWithoutUl($value['id']);?>
							<?php
							endforeach ;
						echo "</ul>";
						}
						?>
					</div>
				</div>
			</div>
		<?php
	}
	public function list_submenu($parent_id) {
		$lang_id = $this->config->get('config_language_id');
		$query = $this->db->query("SELECT * FROM " . DB_PREFIX . "pro_megamenu  WHERE " . DB_PREFIX . "pro_megamenu.parent_id = '".$parent_id."' ORDER BY " . DB_PREFIX . "pro_megamenu.id ASC");
		$result=array();
		foreach ($query->rows as $value) {
			$result[] = $value;
		}
		if($result) {
		?>
			<div class="pro-mega-menu-dropdown">
				<div class="pro-mega-menu-dropdown-inner">
					<ul class="normal-submenu">
						<?php foreach($result as $key=>$value) : ?>
							<?php
								$title = json_decode(base64_decode($value['title']), true);
								if($value['type']=='category')
									$value['url'] = $this->url->link('product/category', 'path=' . $value['type_id']);
								if($value['type']=='infomation')
									$value['url'] = $this->url->link('information/information', 'information_id=' . $value['type_id']);
								if($value['type']=='manufacturer')
									$value['url'] = $this->url->link('product/manufacturer/info', 'manufacturer_id=' . $value['type_id']);
								?>
							<li>
								<a href="<?php echo $value['url']; ?>"><?php echo html_entity_decode(html_entity_decode($title[$lang_id])); ?></a>
								<?php $this->list_submenu($value['id']); ?>
							</li>
						<?php endforeach ; ?>
					</ul>
				</div>
			</div>
		<?php
		}
	}
	public function getlist() {
      $query = $this->db->query("SELECT * FROM " . DB_PREFIX . "pro_megamenu  WHERE " . DB_PREFIX . "pro_megamenu.parent_id = '0' ORDER BY " . DB_PREFIX . "pro_megamenu.id ASC");
	  $result=array();
	  foreach ($query->rows as $value) {
				$result[] = $value;
	  }
	  return $result;
	}
	public function getOptions(){
		$query = $this->db->query("SELECT * FROM " . DB_PREFIX . "pro_megamenu_options");
		return $query->rows ? $query->rows : array();
	}
}
?>