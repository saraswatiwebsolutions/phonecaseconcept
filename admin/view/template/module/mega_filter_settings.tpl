<?php require DIR_TEMPLATE . 'module/' . $_name . '-header.tpl'; ?>

<br />

<ul class="nav nav-tabs attributes">
	<li class="active"><a data-toggle="tab" href="#tab-base-attributes"><i class="glyphicon glyphicon-wrench"></i> <?php echo $tab_base_attributes; ?></a></li>
	<li><a data-toggle="tab" href="#tab-refresh-results"><i class="glyphicon glyphicon-repeat"></i> <?php echo $tab_refresh_results; ?></a></li>
	<li><a data-toggle="tab" href="#tab-display-list-of-items"><i class="glyphicon glyphicon-eye-open"></i> <?php echo $tab_display_list_of_items; ?></a></li>
	<li><a data-toggle="tab" href="#tab-style"><i class="glyphicon glyphicon-adjust"></i> <?php echo $tab_style; ?></a></li>
	<li><a data-toggle="tab" href="#tab-javascript"><i class="glyphicon glyphicon-edit"></i> <?php echo $tab_javascript; ?></a></li>
	<li><a data-toggle="tab" href="#tab-other"><i class="glyphicon glyphicon-pencil"></i> <?php echo $tab_other; ?></a></li>
</ul>

<div class="tab-content">
	<div class="tab-pane active" id="tab-base-attributes">
		<br /><?php echo $entry_default_values; ?><br /><br />
		<?php 

			$_baseName		= $_name . '_settings[attribs]';
			$_baseValues	= $settings['attribs'];

			require DIR_TEMPLATE . 'module/' . $_name . '-base-attribs.tpl';

		?>
	</div>

	<div class="tab-pane" id="tab-refresh-results">
		<table class="table table-tbody">
			<tbody>
				<tr>
					<td width="200"><?php echo $entry_show_loader_over_results; ?></td>
					<td>
						<input type="checkbox" name="<?php echo $_name; ?>_settings[show_loader_over_results]" value="1" <?php echo ! empty( $settings['show_loader_over_results'] ) ? 'checked="checked"' : ''; ?> />
					</td>
				</tr>
				<tr>
					<td><?php echo $entry_show_loader_over_filter; ?></td>
					<td>
						<input type="checkbox" name="<?php echo $_name; ?>_settings[show_loader_over_filter]" value="1" <?php echo ! empty( $settings['show_loader_over_filter'] ) ? 'checked="checked"' : ''; ?> />
					</td>
				</tr>
				<tr>
					<td><?php echo $entry_auto_scroll_to_results; ?></td>
					<td>
						<input style="vertical-align: middle" type="checkbox" name="<?php echo $_name; ?>_settings[auto_scroll_to_results]" value="1" <?php echo ! empty( $settings['auto_scroll_to_results'] ) ? 'checked="checked"' : ''; ?> />
						- <?php echo $entry_add; ?>
						<input size="4" type="text" name="<?php echo $_name; ?>_settings[add_pixels_from_top]" value="<?php echo empty( $settings['add_pixels_from_top'] ) ? 0 : $settings['add_pixels_from_top']; ?>" />
						<?php echo $text_pixels_from_top; ?>
					</td>
				</tr>
				<tr>
					<td><?php echo $entry_ajax_pagination; ?></td>
					<td>
						<input type="checkbox" name="<?php echo $_name; ?>_settings[ajax_pagination]" value="1" <?php echo ! empty( $settings['ajax_pagination'] ) ? 'checked="checked"' : ''; ?> />
					</td>
				</tr>
				<tr>
					<td rowspan="3">
						<?php echo $entry_refresh_results; ?>
					</td>
					<td>
						<input id="refresh_results_a" type="radio" name="<?php echo $_name; ?>_settings[refresh_results]" value="immediately" <?php echo empty( $settings['refresh_results'] ) || $settings['refresh_results'] == 'immediately' ? 'checked="checked"' : ''; ?> />
						<label for="refresh_results_a"><?php echo $text_immediately; ?></label>

						<div class="help"><?php echo $text_immediately_help; ?></div>
					</td>
				</tr>
				<tr>
					<td style="width: auto">
						<input id="refresh_results_b" type="radio" name="<?php echo $_name; ?>_settings[refresh_results]" value="with_delay" <?php echo ! empty( $settings['refresh_results'] ) && $settings['refresh_results'] == 'with_delay' ? 'checked="checked"' : ''; ?> />
						<label for="refresh_results_b"><?php echo $text_with_delay; ?></label>

						<div class="help"><?php echo $text_with_delay_guide; ?></div><br />
						<?php echo $text_with_delay_help; ?><input type="text" size="5" name="<?php echo $_name; ?>_settings[refresh_delay]" value="<?php echo empty( $settings['refresh_delay'] ) ? '1000' : $settings['refresh_delay']; ?>" /> <?php echo $text_milliseconds; ?>
					</td>
				</tr>
				<tr>
					<td style="width: auto">
						<input id="refresh_results_c" type="radio" name="<?php echo $_name; ?>_settings[refresh_results]" value="using_button" <?php echo ! empty( $settings['refresh_results'] ) && $settings['refresh_results'] == 'using_button' ? 'checked="checked"' : ''; ?> />
						<label for="refresh_results_c"><?php echo $text_using_button; ?></label>

						<div class="help"><?php echo $text_using_button_help; ?></div><br />

						<table style="margin-left: -4px"><tr><td width="100" style="vertical-align: top;"><b><?php echo $text_place_button; ?>:</b></td><td style="line-height: 20px">
							<input style="vertical-align: middle; margin-top: 0" <?php echo empty( $settings['place_button'] ) || $settings['place_button'] == 'bottom' ? ' checked="checked"' : ''; ?> type="radio" name="<?php echo $_name; ?>_settings[place_button]" value="bottom" id="place_button_a" /> <label for="place_button_a"><?php echo $text_place_button_bottom; ?></label><br />
							<input style="vertical-align: middle; margin-top: 0" <?php echo ! empty( $settings['place_button'] ) && $settings['place_button'] == 'top' ? ' checked="checked"' : ''; ?> type="radio" name="<?php echo $_name; ?>_settings[place_button]" value="top" id="place_button_b" /> <label for="place_button_b"><?php echo $text_place_button_top; ?></label><br />
							<input style="vertical-align: middle; margin-top: 0" <?php echo ! empty( $settings['place_button'] ) && $settings['place_button'] == 'bottom_top' ? ' checked="checked"' : ''; ?> type="radio" name="<?php echo $_name; ?>_settings[place_button]" value="bottom_top" id="place_button_c" /> <label for="place_button_c"><?php echo $text_place_button_bottom_top; ?></label><br />
							</td></tr></table>
					</td>
				</tr>
			</tbody>
		</table>
	</div>

	<div class="tab-pane" id="tab-display-list-of-items">
		<table class="table table-tbody">
			<tbody>
				<tr>
					<td width="200">
						<label for="display-list-of-items_a">
							<img src="<?php echo $HTTP_URL; ?>view/stylesheet/mf/images/display-list-of-items-scroll.png?v2" />
						</label>
						<center><input id="display-list-of-items_a" type="radio" name="<?php echo $_name; ?>_settings[display_list_of_items][type]" value="scroll"<?php echo empty( $settings['display_list_of_items']['type'] ) || $settings['display_list_of_items']['type'] == 'scroll' ? ' checked="checked"' : ''; ?> /></center>
					</td>
					<td style="vertical-align: top">
						<?php echo $entry_max_height; ?><br />
						<input type="text" name="<?php echo $_name; ?>_settings[display_list_of_items][max_height]" value="<?php echo empty( $settings['display_list_of_items']['max_height'] ) ? 155 : (int) $settings['display_list_of_items']['max_height']; ?>" /> px
					</td>
				</tr>
				<tr>
					<td>
						<label for="display-list-of-items_b">
							<img src="<?php echo $HTTP_URL; ?>view/stylesheet/mf/images/display-list-of-items-button-more.png?v2" />
						</label>
						<center><input id="display-list-of-items_b" type="radio" name="<?php echo $_name; ?>_settings[display_list_of_items][type]" value="button_more"<?php echo ! empty( $settings['display_list_of_items']['type'] ) && $settings['display_list_of_items']['type'] == 'button_more' ? ' checked="checked"' : ''; ?> /></center>
					</td>
					<td style="vertical-align: top">
						<?php echo $entry_limit_of_items; ?><br />
						<input type="text" name="<?php echo $_name; ?>_settings[display_list_of_items][limit_of_items]" value="<?php echo empty( $settings['display_list_of_items']['limit_of_items'] ) ? 4 : (int) $settings['display_list_of_items']['limit_of_items']; ?>" />
					</td>
				</tr>
				<tr>
					<td>
						<img src="<?php echo $HTTP_URL; ?>view/stylesheet/mf/images/display-live-filter.png" />
					</td>
					<td style="vertical-align: top">						
						<?php echo $text_enabled; ?>:
						<input type="checkbox" name="<?php echo $_name; ?>_settings[display_live_filter][enabled]" value="button_more"<?php echo ! empty( $settings['display_live_filter']['enabled'] ) ? ' checked="checked"' : ''; ?> />
						<br /><br />
						
						<?php echo $entry_limit_live_filter; ?><br />
						
						<input type="text" name="<?php echo $_name; ?>_settings[display_live_filter][items]" value="<?php echo empty( $settings['display_live_filter']['items'] ) ? '' : (int) $settings['display_live_filter']['items']; ?>" />
					</td>
				</tr>
			</tbody>
		</table>
	</div>

	<div class="tab-pane" id="tab-style">
		<table class="table table-tbody">
			<tr>
				<td style="width: 230px;"><?php echo $entry_color_counter_background; ?></td>
				<td width="300">
					<input class="mf-colorPicker" type="text" name="<?php echo $_name; ?>_settings[background_color_counter]" value="<?php echo ! empty( $settings['background_color_counter'] ) ? $settings['background_color_counter'] : '#428bca'; ?>" />
					
					<img src="<?php echo $HTTP_URL; ?>view/stylesheet/mf/images/couter-color.png" />
				</td>
				<td width="200"><?php echo $entry_color_counter_text; ?></td>
				<td>
					<input class="mf-colorPicker" type="text" name="<?php echo $_name; ?>_settings[text_color_counter]" value="<?php echo ! empty( $settings['text_color_counter'] ) ? $settings['text_color_counter'] : '#ffffff'; ?>" />
					
					<img src="<?php echo $HTTP_URL; ?>view/stylesheet/mf/images/couter-color.png" />
				</td>
			</tr>
			<tr>
				<td><?php echo $entry_color_search_button_background; ?></td>
				<td>
					<input class="mf-colorPicker" type="text" name="<?php echo $_name; ?>_settings[background_color_search_button]" value="<?php echo ! empty( $settings['background_color_search_button'] ) ? $settings['background_color_search_button'] : '#428bca'; ?>" />
					
					<img src="<?php echo $HTTP_URL; ?>view/stylesheet/mf/images/search-button-color.png" />
				</td>
				<td><?php echo $entry_color_slider_background; ?></td>
				<td>
					<input class="mf-colorPicker" type="text" name="<?php echo $_name; ?>_settings[background_color_slider]" value="<?php echo ! empty( $settings['background_color_slider'] ) ? $settings['background_color_slider'] : ''; ?>" />
					
					<img src="<?php echo $HTTP_URL; ?>view/stylesheet/mf/images/slider-color.png" />
				</td>
			</tr>
			<tr>
				<td><?php echo $entry_color_header_background; ?></td>
				<td width="300">
					<input class="mf-colorPicker" type="text" name="<?php echo $_name; ?>_settings[background_color_header]" value="<?php echo ! empty( $settings['background_color_header'] ) ? $settings['background_color_header'] : ''; ?>" />
					
					<img src="<?php echo $HTTP_URL; ?>view/stylesheet/mf/images/header-color.png" />
				</td>
				<td width="200"><?php echo $entry_color_header_text; ?></td>
				<td>
					<input class="mf-colorPicker" type="text" name="<?php echo $_name; ?>_settings[text_color_header]" value="<?php echo ! empty( $settings['text_color_header'] ) ? $settings['text_color_header'] : ''; ?>" />
					
					<img src="<?php echo $HTTP_URL; ?>view/stylesheet/mf/images/header-color.png" />
				</td>
			</tr>
			<tr>
				<td style="width: 230px;"><?php echo $entry_color_header_border_bottom; ?></td>
				<td width="300">
					<input class="mf-colorPicker" type="text" name="<?php echo $_name; ?>_settings[border_bottom_color_header]" value="<?php echo ! empty( $settings['border_bottom_color_header'] ) ? $settings['border_bottom_color_header'] : ''; ?>" />
					
					<img src="<?php echo $HTTP_URL; ?>view/stylesheet/mf/images/header-border-bottom-color.png" />
				</td>
				<td width="200"><?php echo $entry_image_size; ?></td>
				<td>
					<input type="text" name="<?php echo $_name; ?>_settings[image_size_width]" size="5" value="<?php echo ! empty( $settings['image_size_width'] ) ? $settings['image_size_width'] : '20'; ?>" /> x
					<input type="text" name="<?php echo $_name; ?>_settings[image_size_height]" size="5" value="<?php echo ! empty( $settings['image_size_height'] ) ? $settings['image_size_height'] : '20'; ?>" />
					
					<img src="<?php echo $HTTP_URL; ?>view/stylesheet/mf/images/image-size.png" />
				</td>
			</tr>
			<tr>
				<td><?php echo $entry_css_style; ?></td>
				<td colspan="3">
					<textarea name="<?php echo $_name; ?>_settings[css_style]" cols="150" rows="20"><?php echo empty( $settings['css_style'] ) ? '' : $settings['css_style']; ?></textarea>
				</td>
			</tr>
		</table>
	</div>

	<div class="tab-pane" id="tab-javascript">
		<table class="table table-tbody">
			<tr>
				<td width="200"><?php echo $entry_javascript; ?></td>
				<td>
<?php
			
$javascript_example_code = 
"MegaFilter.prototype.beforeRequest = function() {
	var self = this;
};

MegaFilter.prototype.beforeRender = function( htmlResponse, htmlContent, json ) {
	var self = this;
};

MegaFilter.prototype.afterRender = function( htmlResponse, htmlContent, json ) {
	var self = this;
};
";
					
					?>
					<textarea name="<?php echo $_name; ?>_settings[javascript]" cols="150" rows="20"><?php echo empty( $settings['javascript'] ) ? $javascript_example_code : $settings['javascript']; ?></textarea>
				</td>
			</tr>
			<tr>
				<td><?php echo $entry_content_selector; ?></td>
				<td>
					<table>
						<tr>
							<td>
								<input type="text" name="<?php echo $_name; ?>_settings[content_selector]" value="<?php echo ! empty( $settings['content_selector'] ) ? $settings['content_selector'] : '#mfilter-content-container'; ?>" />
							</td>
							<td>
								<?php echo $text_content_selector_guide; ?><br />
								<img src="<?php echo $HTTP_URL; ?>view/stylesheet/mf/images/content_selector.jpg" />
							</td>
						</tr>
					</table>
				</td>
			</tr>
			<tr>
				<td><?php echo $entry_home_page_by_ajax; ?></td>
				<td>
					<input type="checkbox" name="<?php echo $_name; ?>_settings[home_page_ajax]" value="1" <?php echo ! empty( $settings['home_page_ajax'] ) ? 'checked="checked"' : ''; ?> />
					<br /><br />
					<input size="50" type="text" placeholder="<?php echo $text_content_selector; ?>" name="<?php echo $_name; ?>_settings[home_page_content_selector]" value="<?php echo ! empty( $settings['home_page_content_selector'] ) ? $settings['home_page_content_selector'] : '#content'; ?>" />
				</td>
			</tr>
		</table>
	</div>

	<div class="tab-pane" id="tab-other">
		<table class="table table-tbody">
			<tr>
				<td><?php echo $entry_type_of_condition; ?></td>
				<td>
					<select name="<?php echo $_name; ?>_settings[type_of_condition]">
						<option value="or" <?php echo ! empty( $settings['type_of_condition'] ) && $settings['type_of_condition'] == 'or' ? 'selected="selected"' : ''; ?>>OR</option>
						<option value="and" <?php echo ! empty( $settings['type_of_condition'] ) && $settings['type_of_condition'] == 'and' ? 'selected="selected"' : ''; ?>>AND</option>
					</select>
				</td>
			</tr>
			<tr>
				<td width="300"><?php echo $entry_calculate_number_of_products; ?></td>
				<td>
					<input type="checkbox" name="<?php echo $_name; ?>_settings[calculate_number_of_products]" value="1" <?php echo ! empty( $settings['calculate_number_of_products'] ) ? 'checked="checked"' : ''; ?> />
				</td>
			</tr>
			<tr>
				<td><?php echo $entry_show_products; ?></td>
				<td>
					<input type="checkbox" name="<?php echo $_name; ?>_settings[show_number_of_products]" value="1" <?php echo ! empty( $settings['show_number_of_products'] ) ? 'checked="checked"' : ''; ?> />
				</td>
			</tr>
			<tr>
				<td>
					<?php echo $entry_hide_inactive_values; ?>
				</td>
				<td>
					<input type="checkbox" name="<?php echo $_name; ?>_settings[hide_inactive_values]" value="1" <?php echo ! empty( $settings['hide_inactive_values'] ) ? 'checked="checked"' : ''; ?> />
					<img src="<?php echo $HTTP_URL; ?>view/stylesheet/mf/images/hide-inactive-values.png" style="vertical-align: middle; margin-left: 20px;" />
				</td>
			</tr>
			<tr>
				<td><?php echo $entry_show_reset_button; ?></td>
				<td>
					<input type="checkbox" name="<?php echo $_name; ?>_settings[show_reset_button]" value="1" <?php echo ! empty( $settings['show_reset_button'] ) ? 'checked="checked"' : ''; ?> />
				</td>
			</tr>
			<tr>
				<td><?php echo $entry_show_top_reset_button; ?></td>
				<td>
					<input type="checkbox" name="<?php echo $_name; ?>_settings[show_top_reset_button]" value="1" <?php echo ! empty( $settings['show_top_reset_button'] ) ? 'checked="checked"' : ''; ?> />
				</td>
			</tr>
			<tr>
				<td><?php echo $entry_enable_cache; ?></td>
				<td>
					<input type="checkbox" name="<?php echo $_name; ?>_settings[cache_enabled]" value="1" <?php echo ! empty( $settings['cache_enabled'] ) ? 'checked="checked"' : ''; ?> />
					<a style="margin-top: -6px;" href="<?php echo $action_clear_cache; ?>" class="btn btn-xs btn-danger"><i class="glyphicon glyphicon-trash"></i> <?php echo $text_clear_cache; ?></a>
				</td>
			</tr>
			<tr>
				<td><?php echo $entry_show_products_from_subcategories; ?></td>
				<td>
					<?php if( version_compare( VERSION, '1.5.5', '>=' ) ) { ?>
						<input style="vertical-align: middle; margin-top: -2px;" type="checkbox" name="<?php echo $_name; ?>_settings[show_products_from_subcategories]" value="1" <?php echo ! empty( $settings['show_products_from_subcategories'] ) ? 'checked="checked"' : ''; ?> />

						- <?php echo $text_start_level; ?>
						<select name="<?php echo $_name; ?>_settings[level_products_from_subcategories]">
							<?php for( $i = 1; $i <= 10; $i++ ) { ?>
								<option <?php echo ! empty( $settings['level_products_from_subcategories'] ) && $settings['level_products_from_subcategories'] == $i ? ' selected="selected"' : ''; ?> value="<?php echo $i; ?>"><?php echo $i; ?></option>
							<?php } ?>
						</select>

						<span class="help"><?php echo $text_start_level_help; ?></span>
					<?php } else { ?>
						<?php echo $text_oc_155; ?>
					<?php } ?>
				</td>
			</tr>
			<tr>
				<td>
					<?php echo $entry_layout_category; ?>
				</td>
				<td>
					<select name="<?php echo $_name; ?>_settings[layout_c]">
						<?php foreach( $layouts as $layout ) { ?>
							<option value="<?php echo $layout['layout_id']; ?>"<?php if( $settings['layout_c'] == $layout['layout_id'] ) { ?> selected="selected"<?php } ?>><?php echo $layout['name']; ?></option>
						<?php } ?>
					</select>
				</td>
			</tr>
			<tr>
				<td>
					<?php echo $entry_in_stock_status; ?>
				</td>
				<td>
					<select name="<?php echo $_name; ?>_settings[in_stock_status]" style="margin-bottom: 8px">
						<?php foreach( $stockStatuses as $stock_status ) { ?>
							<option value="<?php echo $stock_status['stock_status_id']; ?>"<?php if( $settings['in_stock_status'] == $stock_status['stock_status_id'] ) { ?> selected="selected"<?php } ?>><?php echo $stock_status['name']; ?></option>
						<?php } ?>
					</select>
					<br />
					<input type="checkbox" id="in_stock_default_selected" name="<?php echo $_name; ?>_settings[in_stock_default_selected]" style="vertical-align: middle; margin: 0;" value="1" <?php echo ! empty( $settings['in_stock_default_selected'] ) ? 'checked="checked"' : ''; ?> /> <label for="in_stock_default_selected"><?php echo $text_in_stock_default_selected; ?></label>
										
					<?php if( ! empty( $mfp_plus_version ) ) { ?>
						<br />
						<input type="checkbox" id="stock_for_options_plus" name="<?php echo $_name; ?>_settings[stock_for_options_plus]" style="vertical-align: middle; margin: 0;" value="1" <?php echo ! empty( $settings['stock_for_options_plus'] ) ? 'checked="checked"' : ''; ?> /> <label for="stock_for_options_plus"><?php echo $text_stock_for_options_plus; ?></label>
					<?php } ?>
				</td>
			</tr>
			<tr>
				<td>
					<?php echo $entry_not_remember_filter_for_subcategories; ?>
				</td>
				<td>
					<input type="checkbox" name="<?php echo $_name; ?>_settings[not_remember_filter_for_subcategories]" value="1" <?php echo ! empty( $settings['not_remember_filter_for_subcategories'] ) ? 'checked="checked"' : ''; ?> />
					<img src="<?php echo $HTTP_URL; ?>view/stylesheet/mf/images/not-remember-filter-for-subcategories.png" style="vertical-align: middle; margin-left: 20px;" />
				</td>
			</tr>
			<tr>
				<td>
					<?php echo $entry_attribute_separator; ?>
					<span class="help"><?php echo $text_attribute_separator_guide; ?></span>
				</td>
				<td>
					<?php $separators = array( ',', '|', ';', '#', '/' ); ?>
					<select name="<?php echo $_name; ?>_settings[attribute_separator]">
						<option value=""><?php echo $text_none; ?></option>
						<?php foreach( $separators as $separator ) { ?>
							<option value="<?php echo $separator; ?>"<?php if( ! empty( $settings['attribute_separator'] ) && $settings['attribute_separator'] == $separator ) { ?> selected="selected"<?php } ?>><?php echo $separator; ?></option>
						<?php } ?>
					</select>
					<img src="<?php echo $HTTP_URL; ?>view/stylesheet/mf/images/attribute-spearator.png?v2" style="vertical-align: middle; margin-left: 20px;" />
				</td>
			</tr>
			<tr>
				<td><?php echo $entry_manual_init; ?></td>
				<td>
					<input type="checkbox" name="<?php echo $_name; ?>_settings[manual_init]" value="1" <?php echo ! empty( $settings['manual_init'] ) ? 'checked="checked"' : ''; ?> />
					<img src="<?php echo $HTTP_URL; ?>view/stylesheet/mf/images/manual-init.png" style="vertical-align: middle; margin-left: 20px;" />
				</td>
			</tr>
			<tr>
				<td><?php echo $entry_change_top_to_column_on_mobile; ?></td>
				<td>
					<input type="checkbox" name="<?php echo $_name; ?>_settings[change_top_to_column_on_mobile]" value="1" <?php echo ! empty( $settings['change_top_to_column_on_mobile'] ) ? 'checked="checked"' : ''; ?> />
				</td>
			</tr>
		</table>
	</div>
</div>

<link type="text/css" href="<?php echo $HTTP_URL; ?>view/stylesheet/mf/css/colorpicker.css" rel="stylesheet" />
<script type="text/javascript" src="<?php echo $HTTP_URL; ?>view/stylesheet/mf/js/colorpicker.js"></script>
<script type="text/javascript">	
	(function($){
		$('input[name="<?php echo $_name; ?>_settings[calculate_number_of_products]"]').change(function(){
			var checked = $(this).is(':checked');
			
			$('input[name="<?php echo $_name; ?>_settings[show_number_of_products]"],input[name="<?php echo $_name; ?>_settings[hide_inactive_values]"]').parent().parent()[checked?'show':'hide']();
		}).trigger('change');
	})(jQuery);
	
	jQuery('input[name="<?php echo $_name; ?>_settings[refresh_results]"]').change(function(){
		jQuery('input[name="<?php echo $_name; ?>_settings[refresh_results]"]').each(function(){
			var $inputs = jQuery(this).parent().find('input:not([name="<?php echo $_name; ?>_settings[refresh_results]"])');

			if( jQuery(this).is(':checked') ) {
				$inputs.removeAttr('disabled');
			} else {
				$inputs.attr('disabled', true);
			}
		});
	}).trigger('change');
	
	//Color Pickers
		jQuery("input.mf-colorPicker").each(function(){
			var tis = jQuery(this);

		    tis.ColorPicker({
				onSubmit: function(hsb, hex, rgb, el) {
					jQuery(el).val("#"+hex).next().css("background-color","#"+hex);
					jQuery(el).ColorPickerHide();
				},
				onChange: function(hsb, hex, rgb) {
					tis.val("#"+hex).next().css("background-color","#"+hex);
				},
				onBeforeShow: function() {
					tis.ColorPickerSetColor(tis.val());
				}
			}).bind('keyup', function(){
				tis.ColorPickerSetColor("#"+tis.val());
			});
		});
</script>

<?php require DIR_TEMPLATE . 'module/' . $_name . '-footer.tpl'; ?>