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
/*Check version PHP*/
$php_version = str_replace('.','',phpversion());
if(strlen($php_version) < 4) $php_version = $php_version * 10;
if((int)$php_version >= 5400){
	if(session_status() == PHP_SESSION_NONE) {
		session_start();
	}
} else {
	if(session_id() == '') {
		session_start();
	}
}

// Language	
$language = new Language($languages[$config->get('config_language')]['directory']);
$language->load($languages[$config->get('config_language')]['directory']);	
$registry->set('language', $language); 
$loader->language('fancy_design/productdesigner');
//main bar
$layers_btn = $language->get('text_layers_btn');
$adds_btn = $language->get('text_adds_btn');
$products_btn = $language->get('text_products_btn');
$more_btn = $language->get('text_more_btn');
$download_image = $language->get('text_download_image');
$print = $language->get('text_print');
$pdf = $language->get('text_pdf');
$save_product = $language->get('text_save_product');
$load_saved_products = $language->get('text_load_saved_products');
//sub bar
$undo_btn = $language->get('text_undo_btn');
$redo_btn = $language->get('text_redo_btn');
$reset_product_btn = $language->get('text_reset_product_btn');
$zoom_btn = $language->get('text_zoom_btn');
$pan_btn = $language->get('text_pan_btn');

//adds
$add_image_btn = $language->get('text_add_image_btn');
$add_text_btn = $language->get('text_add_text_btn');
$enter_text = $language->get('text_enter_text');
$add_fb_btn = $language->get('text_add_fb_btn');
$add_insta_btn = $language->get('text_add_insta_btn');
$add_design_btn = $language->get('text_add_design_btn');

//Fill Options
$fill_options = $language->get('text_fill_options');
$color = $language->get('text_color');
$patterns = $language->get('text_patterns');
$opacity = $language->get('text_opacity');

//Filter Options
$filter = $language->get('text_filter');

//Text Options
$text_options = $language->get('text_text_options');
$change_text = $language->get('text_change_text');
$typeface = $language->get('text_typeface');
$line_height = $language->get('text_line_height');
$text_align = $language->get('text_text_align');
$text_align_left = $language->get('text_text_align_left');
$text_align_center = $language->get('text_text_align_center');
$text_align_right = $language->get('text_text_align_right');
$text_styling = $language->get('text_text_styling');
$bold = $language->get('text_bold');
$italic = $language->get('text_italic');
$underline = $language->get('text_underline');

//Curved Text Options
$curved_text = $language->get('text_curved_text');
$curved_text_spacing = $language->get('text_curved_text_spacing');
$curved_text_radius = $language->get('text_curved_text_radius');

//Transform Options
$curved_text_reverse = $language->get('text_curved_text_reverse');
$transform = $language->get('text_transform');
$angle = $language->get('text_angle');
$scale = $language->get('text_scale');

//Helper Buttons
$center_h = $language->get('text_center_h');
$center_v = $language->get('text_center_v');
$flip_horizontal = $language->get('text_flip_horizontal');
$flip_vertical = $language->get('text_flip_vertical');
$reset_element = $language->get('text_reset_element');

//facebook
$fb_select_album = $language->get('text_fb_select_album');

//instagram
$insta_feed_button = $language->get('text_insta_feed_button');
$insta_recent_images_button = $language->get('text_insta_recent_images_button');
?>

<!-- MAIN BAR -->
<section class="fpd-main-bar fpd-clearfix fpd-primary-bg-color">

	<!-- Left -->
	<div class="fpd-left">
		<div class="fpd-btn fpd-primary-text-color" data-context="layers">
			<i class="fpd-icon-layers"></i><span><?php echo $layers_btn; ?></span>
		</div>
		<div class="fpd-btn fpd-primary-text-color" data-context="adds">
			<i class="fpd-icon-add"></i><span><?php echo $adds_btn; ?></span>
		</div>
		<div class="fpd-btn fpd-primary-text-color" data-context="products">
			<i class="fpd-icon-product"></i><span><?php echo $products_btn; ?></span>
		</div>
	</div>

	<!-- Right -->
	<div class="fpd-right">
		<div class="fpd-more fpd-btn fpd-dropdown" >
			<i class="fpd-icon-more fpd-tooltip fpd-primary-text-color" title="<?php echo $more_btn; ?>"></i>
			<div class="fpd-dropdown-menu fpd-shadow-1  fpd-scale-tr">
				<span class="fpd-download-image fpd-btn"><?php echo $download_image; ?></span>
				<span class="fpd-save-pdf fpd-btn"><?php echo $pdf; ?></span>
				<span class="fpd-print fpd-btn"><?php echo $print; ?></span>
				<span class="fpd-save-product fpd-btn"><?php echo $save_product; ?></span>
				<span class="fpd-load-saved-products fpd-btn"><?php echo $load_saved_products; ?></span>
			</div>
			<a href="" download="" target="_blank" class="fpd-download-anchor" style="display: none;"></a> <!-- Hidden anchor -->
		</div>

	</div>
</section>

<!-- SUB-BAR -->
<section class="fpd-sub-bar fpd-clearfix">

	<!-- Left -->
	<div class="fpd-left">
		<div class="fpd-undo fpd-btn fpd-disabled fpd-tooltip" title="<?php echo $undo_btn; ?>">
			<i class="fpd-icon-undo"></i>
		</div>
		<div class="fpd-redo fpd-btn fpd-disabled fpd-tooltip" title="<?php echo $redo_btn; ?>">
			<i class="fpd-icon-redo"></i>
		</div>
		<div class="fpd-reset-product fpd-btn fpd-tooltip" title="<?php echo $reset_product_btn; ?>">
			<i class="fpd-icon-reset"></i>
		</div>
	</div>

	<!-- Right -->
	<div class="fpd-right">
		<div class="fpd-zoom fpd-option-group">
			<div class="fpd-btn fpd-tooltip" title="<?php echo $zoom_btn; ?>">
				<i class="fpd-icon-zoom-in"></i>
			</div>
			<div class="fpd-option-content">
				<div data-value="1" data-min="1" data-max="3" data-step="0.02" class="fpd-set-zoom fpd-slider"></div>
				<div class="fpd-stage-pan fpd-btn fpd-tooltip" title="<?php echo $pan_btn; ?>">
					<i class="fpd-icon-drag"></i>
				</div>
			</div>
		</div>
	</div>

</section>

<!-- MAIN CONTAINER -->
<section class="fpd-main-container">

	<!-- Product Stage -->
	<div class="fpd-product-stage">
		<canvas></canvas>
		<div class="fpd-element-tooltip"></div>
	</div>

	<!-- Context Dialog -->
	<div class="fpd-context-dialog fpd-shadow-2 fpd-columns-3" data-columns="3">
		<nav class="fpd-dialog-head fpd-clearfix fpd-primary-bg-color fpd-primary-text-color">
			<div class="fpd-left fpd-dialog-drag-handle">
				<div><i class="fpd-icon-drag"></i><span class="fpd-dialog-title"></span></div>
			</div>
			<div class="fpd-right">
				<div class="fpd-content-back fpd-btn">
					<i class="fpd-icon-back"></i>
				</div>
				<div class="fpd-close-dialog fpd-btn">
					<i class="fpd-icon-close"></i>
				</div>
			</div>
		</nav>
		<div class="fpd-dialog-content">

			<!-- Manage Layers -->
			<div class="fpd-content-layers">
				<div class="fpd-list"></div>
			</div>

			<!-- Edit Element -->
			<div class="fpd-content-edit">
				<div class="fpd-list">

					<!-- Fill Options -->
					<div class="fpd-fill-options fpd-head-options fpd-list-row">
						<div class="fpd-cell-full">
							<label><?php echo $fill_options; ?></label>
						</div>
					</div>
					<div class="fpd-fill-options fpd-sub-option fpd-list-row">
						<div class="fpd-cell-0">
							<label><?php echo $color; ?></label>
						</div>
						<div class="fpd-cell-1">
							<div class="fpd-color-picker">
								<input type="text" value="">
							</div>
						</div>
					</div>
					<div class="fpd-fill-options fpd-sub-option fpd-list-row">
						<div class="fpd-cell-0">
							<label><?php echo $patterns; ?></label>
						</div>
						<div class="fpd-cell-1">
							<div class="fpd-patterns">
								<div class="fpd-grid fpd-grid-contain"></div>
							</div>
						</div>
					</div>
					<div class="fpd-fill-options fpd-sub-option fpd-list-row">
						<div class="fpd-cell-0">
							<label><?php echo $opacity; ?></label>
						</div>
						<div class="fpd-cell-1">
							<div>
								<div data-value="0.5" data-min="0" data-max="1" data-step="0.01" class="fpd-opacity-slider fpd-slider"></div>
							</div>
						</div>
					</div>

					<!-- Filter Options -->
					<div class="fpd-filter-options fpd-head-options fpd-list-row">
						<div class="fpd-cell-0">
							<label><?php echo $filter; ?></label>
						</div>
						<div class="fpd-cell-1">
							<div class="fpd-grid fpd-grid-cover">
								<div class="fpd-filter-no fpd-item" data-filter="no"><picture></picture></div>
								<div class="fpd-filter-grayscale fpd-item" data-filter="grayscale"><picture></picture></div>
								<div class="fpd-filter-sepia fpd-item" data-filter="sepia"><picture></picture></div>
								<div class="fpd-filter-sepia2 fpd-item" data-filter="sepia2"><picture></picture></div>
							</div>
						</div>
					</div>

					<!-- Text Options -->
					<div class="fpd-text-options fpd-head-options fpd-list-row">
						<div class="fpd-cell-full">
							<label><?php echo $text_options; ?></label>
						</div>
					</div>
					<div class="fpd-text-options fpd-sub-option fpd-list-row">
						<div class="fpd-cell-0">
							<label><?php echo $change_text; ?></label>
						</div>
						<div class="fpd-cell-1">
							<textarea class="fpd-change-text fpd-border-color"></textarea>
						</div>
					</div>
					<div class="fpd-text-options fpd-sub-option fpd-list-row">
						<div class="fpd-cell-0">
							<label><?php echo $typeface; ?></label>
						</div>
						<div class="fpd-cell-1">
							<div>
								<select class="fpd-fonts-dropdown"></select>
							</div>
						</div>
					</div>
					<div class="fpd-text-options fpd-sub-option fpd-list-row">
						<div class="fpd-cell-0">
							<label><?php echo $line_height; ?></label>
						</div>
						<div class="fpd-cell-1">
							<div>
								<div data-value="1" data-min="0.1" data-max="10" data-step="0.1" class="fpd-line-height-slider fpd-slider"></div>
							</div>
						</div>
					</div>
					<div class="fpd-text-options fpd-sub-option fpd-list-row">
						<div class="fpd-cell-0">
							<label><?php echo $text_align; ?></label>
						</div>
						<div class="fpd-cell-1">
							<div class="fpd-set-alignment">
								<span title="<?php echo $text_align_left; ?>" class="fpd-text-align-left fpd-btn fpd-tooltip"><i class=" fpd-icon-format-align-left"></i></span>
								<span title="<?php echo $text_align_center; ?>" class="fpd-text-align-center fpd-btn fpd-tooltip"><i class=" fpd-icon-format-align-center"></i></span>
								<span title="<?php echo $text_align_right; ?>" class="fpd-text-align-right fpd-btn fpd-tooltip"><i class=" fpd-icon-format-align-right"></i></span>
							</div>

						</div>
					</div>
					<div class="fpd-text-options fpd-sub-option fpd-list-row">
						<div class="fpd-cell-0">
							<label><?php echo $text_styling; ?></label>
						</div>
						<div class="fpd-cell-1">
							<div class="fpd-set-style">
								<span title="<?php echo $bold; ?>" class="fpd-text-style-bold fpd-btn fpd-tooltip"><i class=" fpd-icon-format-bold"></i></span>
								<span title="<?php echo $italic; ?>" class="fpd-text-style-italic fpd-btn fpd-tooltip"><i class=" fpd-icon-format-italic"></i></span>
								<span title="<?php echo $underline; ?>" class="fpd-text-style-underline fpd-btn fpd-tooltip"><i class=" fpd-icon-format-underline"></i></span>
							</div>
						</div>
					</div>

					<!-- Curved Text Options -->
					<div class="fpd-text-options fpd-curved-text-options fpd-sub-option fpd-list-row">
						<div class="fpd-cell-0">
							<label><?php echo $curved_text; ?></label>
						</div>
						<div class="fpd-cell-1">
							<div>
								<div class="fpd-curved-text-switcher fpd-switch-container">
									<div class="fpd-switch-bar"></div>
									<div class="fpd-switch-toggle"></div>
								</div>
							</div>
						</div>
					</div>
					<div class="fpd-text-options fpd-curved-text-options fpd-sub-option fpd-sub-2 fpd-list-row">
						<div class="fpd-cell-0">
							<label><?php echo $curved_text_radius; ?></label>
						</div>
						<div class="fpd-cell-1">
							<div>
								<div data-value="100" data-min="0" data-max="200" data-step="1" class="fpd-curved-text-radius-slider fpd-slider"></div>
							</div>
						</div>
					</div>
					<div class="fpd-text-options fpd-curved-text-options fpd-sub-option fpd-sub-2 fpd-list-row">
						<div class="fpd-cell-0">
							<label><?php echo $curved_text_spacing; ?></label>
						</div>
						<div class="fpd-cell-1">
							<div>
								<div data-value="50" data-min="0" data-max="100" data-step="1" class="fpd-curved-text-spacing-slider fpd-slider"></div>
							</div>
						</div>
					</div>
					<div class="fpd-text-options fpd-curved-text-options fpd-sub-option fpd-sub-2 fpd-list-row">
						<div class="fpd-cell-0">
							<label><?php echo $curved_text_reverse; ?></label>
						</div>
						<div class="fpd-cell-1">
							<div>
								<div class="fpd-curved-text-reverse-switcher fpd-switch-container">
									<div class="fpd-switch-bar"></div>
									<div class="fpd-switch-toggle"></div>
								</div>
							</div>
						</div>
					</div>

					<!-- Transform Options -->
					<div class="fpd-transform-options fpd-head-options fpd-list-row">
						<div class="fpd-cell-full">
							<label><?php echo $transform; ?></label>
						</div>
					</div>
					<div class="fpd-transform-options fpd-list-row fpd-sub-option">
						<div class="fpd-cell-0">
							<label><?php echo $angle; ?></label>
						</div>
						<div class="fpd-cell-1">
							<div>
								<div data-value="0" data-min="0" data-max="359" data-step="1" class="fpd-angle-slider fpd-slider"></div>
							</div>
						</div>
					</div>
					<div class="fpd-transform-options fpd-list-row fpd-sub-option">
						<div class="fpd-cell-0">
							<label><?php echo $scale; ?></label>
						</div>
						<div class="fpd-cell-1">
							<div>
								<div data-value="1" data-min="0" data-max="20" data-step="0.1" class="fpd-scale-slider fpd-slider"></div>
							</div>
						</div>
					</div>

					<!-- Helper Buttons -->
					<div class="fpd-helper-btns fpd-list-row">
						<div class="fpd-cell-full">
							<div>
								<span>
									<span title="<?php echo $center_h; ?>" class="fpd-center-horizontal fpd-btn fpd-tooltip">
										<i class="fpd-icon-align-horizontal"></i>
									</span>
									<span title="<?php echo $center_v; ?>" class="fpd-center-vertical fpd-btn fpd-tooltip">
										<i class="fpd-icon-align-vertical"></i>
									</span>
								</span>
								<span>
									<span title="<?php echo $flip_horizontal; ?>" class="fpd-flip-horizontal fpd-btn fpd-tooltip">
										<i class="fpd-icon-flip-horizontal"></i>
									</span>
									<span title="<?php echo $flip_vertical; ?>" class="fpd-flip-vertical fpd-btn fpd-tooltip">
										<i class="fpd-icon-flip-vertical "></i>
									</span>
								</span>
								<span title="<?php echo $reset_element; ?>" class="fpd-reset-element fpd-btn fpd-tooltip">
									<i class="fpd-icon-reset"></i>
								</span>
							</div>
						</div>
					</div>

				</div>
			</div>

			<!-- Add Something -->
			<div class="fpd-content-adds">

				<!-- Choose add option -->
				<div class="fpd-choose-add">
					<div class="fpd-add-image fpd-btn-raised fpd-secondary-bg-color fpd-secondary-text-color">
						<i class="fpd-icon-file-upload"></i><span><?php echo $add_image_btn; ?></span>
					</div>
					<div class="fpd-add-text fpd-btn-raised fpd-secondary-bg-color fpd-secondary-text-color">
						<i class="fpd-icon-text-format"></i><span><?php echo $add_text_btn; ?></span>
						<div class="fpd-input-text fpd-clearfix fpd-trans">
							<input type="text" placeholder="<?php echo $enter_text; ?>" />
							<span class="fpd-btn"><i class="fpd-icon-done"></i></span>
						</div>
					</div>
					<div class="fpd-add-facebook-photo fpd-btn-raised fpd-secondary-bg-color fpd-secondary-text-color">
						<i class="fpd-icon-facebook"></i><span><?php echo $add_fb_btn; ?></span>
					</div>
					<div class="fpd-add-instagram-photo fpd-btn-raised fpd-secondary-bg-color fpd-secondary-text-color">
						<i class="fpd-icon-instagram"></i><span><?php echo $add_insta_btn; ?></span>
					</div>
					<div class="fpd-add-design fpd-btn-raised fpd-secondary-bg-color fpd-secondary-text-color">
						<i class="fpd-icon-design-library"></i><span><?php echo $add_design_btn; ?></span>
					</div>
					<form class="fpd-upload-form" style="display: block;">
						<input type="file" class="fpd-input-image" name="uploaded_file" style="position:absolute;left:-9999999px;visibility:hidden;"  />
					</form>

					<!-- Facebook Wrapper -->
					<div class="fpd-add-facebook-photo-wrapper fpd-content-sub" data-subContext="facebook">
						<div class="fpd-content-head fpd-clearfix">
							<fb:login-button data-max-rows="1" data-show-faces="false" data-scope="user_photos" autologoutlink="true"></fb:login-button>
							<select class="fpd-fb-user-albums" data-placeholder="<?php echo $fb_select_album; ?>">
							</select>
						</div>
						<div class="fpd-content-main">
							<div class="fpd-grid fpd-grid-cover fpd-photo-grid fpd-dynamic-columns"></div>
						</div>
					</div>

					<!-- Instagram Wrapper -->
					<div class="fpd-add-instagram-photo-wrapper fpd-content-sub" data-subContext="instagram">
						<div class="fpd-tabs fpd-primary-bg-color fpd-primary-text-color">
							<span class="fpd-insta-feed fpd-btn"><?php echo $insta_feed_button; ?></span>
							<span class="fpd-insta-recent-images fpd-btn"><?php echo $insta_recent_images_button; ?></span>
						</div>
						<div class="fpd-content-main">
							<div class="fpd-grid fpd-grid-cover fpd-photo-grid fpd-dynamic-columns"></div>

						</div>
						<span class="fpd-insta-load-next fpd-btn fpd-disabled">
								<i class="fpd-icon-more-horizontal"></i>
							</span>

					</div>

					<!-- Designs Wrapper -->
					<div class="fpd-add-design-wrapper fpd-content-sub" data-subContext="designs">
						<div class="fpd-content-head"></div>
						<div class="fpd-content-main">
							<div class="fpd-grid fpd-grid-contain fpd-padding fpd-dynamic-columns"></div>
						</div>
					</div>

				</div>

			</div>

			<!-- Products -->
			<div class="fpd-content-products">
				<div class="fpd-content-head"></div>
				<div class="fpd-content-main">
					<div class="fpd-grid fpd-grid-contain fpd-padding fpd-dynamic-columns"></div>
				</div>
			</div>

			<!-- Saved Products -->
			<div class="fpd-content-saved-products">
				<div class="fpd-grid fpd-grid-contain fpd-padding fpd-dynamic-columns"></div>
			</div>

			<!-- Loader -->
			<div class="fpd-context-loader">
				<div class="fpd-loading"></div>
			</div>
		</div>

	</div>

</section>

<!-- Full Loader -->
<div class="fpd-full-loader">
	<div class="fpd-loading"></div>
</div>