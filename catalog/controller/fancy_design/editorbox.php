<?php
if (file_exists('../../../config.php')) {
	require_once('../../../config.php');
}  
// VQMODDED Startup
require_once(DIR_SYSTEM . 'startup.php');

// Registry
$registry = new Registry();

// Loader
$loader = new Loader($registry);
$registry->set('load', $loader);

// Config
$config = new Config();
$registry->set('config', $config);
// Database 
$db = new DB(DB_DRIVER, DB_HOSTNAME, DB_USERNAME, DB_PASSWORD, DB_DATABASE);
$registry->set('db', $db);

// Store
if (isset($_SERVER['HTTPS']) && (($_SERVER['HTTPS'] == 'on') || ($_SERVER['HTTPS'] == '1'))) {
	$store_query = $db->query("SELECT * FROM " . DB_PREFIX . "store WHERE REPLACE(`ssl`, 'www.', '') = '" . $db->escape('https://' . str_replace('www.', '', $_SERVER['HTTP_HOST']) . rtrim(dirname($_SERVER['PHP_SELF']), '/.\\') . '/') . "'");
} else {
	$store_query = $db->query("SELECT * FROM " . DB_PREFIX . "store WHERE REPLACE(`url`, 'www.', '') = '" . $db->escape('http://' . str_replace('www.', '', $_SERVER['HTTP_HOST']) . rtrim(dirname($_SERVER['PHP_SELF']), '/.\\') . '/') . "'");
}

if ($store_query->num_rows) {
	$config->set('config_store_id', $store_query->row['store_id']);
} else {
	$config->set('config_store_id', 0);
}
	
// Settings
$query = $db->query("SELECT * FROM " . DB_PREFIX . "setting WHERE store_id = '0' OR store_id = '" . (int)$config->get('config_store_id') . "' ORDER BY store_id ASC");

foreach ($query->rows as $setting) {
	if (!$setting['serialized']) {
		$config->set($setting['key'], $setting['value']);
	} else {
		$config->set($setting['key'], unserialize($setting['value']));
	}
}
// Language Detection
$languages = array();

$query = $db->query("SELECT * FROM `" . DB_PREFIX . "language` WHERE status = '1'"); 

foreach ($query->rows as $result) {
	$languages[$result['code']] = $result;
}

session_start();
// Language	
$language = new Language($languages[$config->get('config_admin_language')]['directory']);
$language->load($languages[$config->get('config_admin_language')]['directory']);	
$registry->set('language', $language); 
$loader->language('fancy_design/productdesigner');
//labels
$element_label = $language->get('text_element_label_editorbox');
$position_label = $language->get('text_position_label_editorbox');
$scale_label = $language->get('text_scale');
$dimensions_label = $language->get('text_dimensions_label_editorbox');
$angle_label = $language->get('text_angle');
$colors_label = $language->get('text_colors_label_editorbox');
?>

<div class="fpd-editor-box">
	<p><span><?php echo $element_label; ?>: </span><i class="fpd-current-element"></i></p>
	<p><span><?php echo $position_label; ?>: </span><i class="fpd-position"></i></p>
	<p><span><?php echo $scale_label; ?>: </span><i class="fpd-scale"></i></p>
	<p><span><?php echo $dimensions_label; ?>: </span><i class="fpd-dimensions"></i></p>
	<p><span><?php echo $angle_label; ?>: </span><i class="fpd-degree"></i></p>
	<p><span><?php echo $colors_label; ?>: </span><i class="fpd-color"></i></p>
</div>