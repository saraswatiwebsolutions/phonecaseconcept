<?php

	require_once DIR_TEMPLATE . 'module/mega_filter-fn.tpl';

	if( ! isset( $IDX ) )
		$IDX = 0;

?>

<table class="table table-hover options" id="<?php echo $IDX; ?>_mf-options-table">
	<thead>
		<tr>
			<th class="text-center" style="width: auto;">
				<input type="checkbox" class="check-all" style="float:left;" /> <?php echo $text_option_name; ?>
			</th>
			<th class="text-left" width="90"><?php echo $text_enabled; ?></th>
			<th class="text-left"><?php echo $text_type; ?></th>
			<th class="text-left" width="250"><?php echo $text_display_as_type; ?></th>
			<th class="text-center" width="150"><?php echo $text_collapsed_by_default; ?></th>
			<th class="text-center" width="180"><?php echo $text_display_list_of_items; ?></th>
			<th class="text-center" width="180"><?php echo $text_sort_order_values; ?></th>
			<th class="text-left" width="100"><?php echo $text_sort_order; ?></th>
		</tr>
	</thead>
	<tbody>
		<?php foreach( $optionItems as $item_id => $item ) { ?>
				<tr>
					<td style="width: auto;"><?php echo $item['name']; ?></td>
					<td><?php echo mf_render_btn_group( $text_yes, $text_no, $_optionsName . '[' . $item['option_id'] . '][enabled]', ! empty( $_optionsValues[$item['option_id']]['enabled'] ) ); ?></td>
					<td><?php echo $item['type']; ?></td>
					<td>
						<?php $temp = array( 'checkbox', 'radio', 'select', 'image', 'image_list_radio', 'image_list_checkbox', 'slider' ); ?>
						<select class="form-control" name="<?php echo $_optionsName; ?>[<?php echo $item['option_id']; ?>][type]">
							<?php foreach( $temp as $tmp ) { ?>
								<option value="<?php echo $tmp; ?>"<?php echo ! empty( $_optionsValues[$item['option_id']]['type'] ) && $_optionsValues[$item['option_id']]['type'] == $tmp ? ' selected="selected"' : ''; ?>>
									<?php echo ${'text_type_' . $tmp}; ?>
								</option>
							<?php } ?>
						</select>
						<br />
						<select class="form-control" name="<?php echo $_optionsName; ?>[<?php echo $item['option_id']; ?>][display_live_filter]">
							<option value=""<?php echo empty( $_optionsValues[$item['option_id']]['display_live_filter'] ) ? ' selected="selected"' : ''; ?>><?php echo $text_display_live_filter; ?> <?php echo $text_by_default; ?></option>
							<option value="1"<?php echo ! empty( $_optionsValues[$item['option_id']]['display_live_filter'] ) && $_optionsValues[$item['option_id']]['display_live_filter'] == '1' ? ' selected="selected"' : ''; ?>><?php echo $text_display_live_filter; ?> - <?php echo $text_yes; ?></option>
							<option value="-1"<?php echo ! empty( $_optionsValues[$item['option_id']]['display_live_filter'] ) && $_optionsValues[$item['option_id']]['display_live_filter'] == '-1' ? ' selected="selected"' : ''; ?>><?php echo $text_display_live_filter; ?> - <?php echo $text_no; ?></option>
						</select>
					</td>
					<td style="width:140px; text-align: center;">
						<?php echo mf_render_btn_collapsed( $text_yes, $text_no, $text_pc, $text_mobile, $_optionsName . '[' . $item['option_id'] . '][collapsed]', empty( $_optionsValues[$item['option_id']]['collapsed'] ) ? '0' : $_optionsValues[$item['option_id']]['collapsed'] ); ?>
					</td>
					<td style="width:140px; text-align: center;">
						<select class="form-control" name="<?php echo $_optionsName; ?>[<?php echo $item['option_id']; ?>][display_list_of_items]">
							<option value=""<?php echo empty( $_optionsValues[$item['option_id']]['display_list_of_items'] ) ? ' selected="selected"' : ''; ?>><?php echo $text_by_default; ?></option>
							<option value="scroll"<?php echo ! empty( $_optionsValues[$item['option_id']]['display_list_of_items'] ) && $_optionsValues[$item['option_id']]['display_list_of_items'] == 'scroll' ? ' selected="selected"' : ''; ?>><?php echo $text_with_scroll; ?></option>
							<option value="button_more"<?php echo ! empty( $_optionsValues[$item['option_id']]['display_list_of_items'] ) && $_optionsValues[$item['option_id']]['display_list_of_items'] == 'button_more' ? ' selected="selected"' : ''; ?>><?php echo $text_with_button_more; ?></option>
						</select>
					</td>
					<td style="width:140px; text-align: center;">
						<select class="form-control" name="<?php echo $_optionsName; ?>[<?php echo $item['option_id']; ?>][sort_order_values]">
							<option value=""<?php echo empty( $_optionsValues[$item['option_id']]['sort_order_values'] ) ? ' selected="selected"' : ''; ?>><?php echo $text_by_default; ?></option>
										
							<?php
										
								$sortOrderValues = array(
									'string_asc'	=> $text_string_asc,
									'string_desc'	=> $text_string_desc,
									'numeric_asc'	=> $text_numeric_asc,
									'numeric_desc'	=> $text_numeric_desc
								);
											
								foreach( $sortOrderValues as $k => $v ) {
									echo '<option value="' . $k . '"';
												
									if( ! empty( $_optionsValues[$item['option_id']]['sort_order_values'] ) && $_optionsValues[$item['option_id']]['sort_order_values'] == $k ) {
										echo ' selected="selected"';
									}
												
									echo '>' . $v . '</option>';
								}
										
							?>
						</select>
					</td>
					<td style="width:90px; text-align: center;">
						<input class="form-control" type="text" name="<?php echo $_optionsName; ?>[<?php echo $item['option_id']; ?>][sort_order]" value="<?php echo ! isset( $_optionsValues[$item['option_id']]['sort_order'] ) ? '' : $_optionsValues[$item['option_id']]['sort_order']; ?>" size="3" />
					</td>
				</tr>
		<?php } ?>
	</tbody>
</table>

<div class="pagination">
	<?php echo $pagination; ?>
</div>

<script type="text/javascript">		
	jQuery('#<?php echo $IDX; ?>_mf-options-table input[type=checkbox][class=check-all]').change(function(){
		var s = jQuery(this).is(':checked');
		
		jQuery('input[name^="<?php echo $_optionsName; ?>["][name*="][enabled]"][type="radio"]').each(function(){
			var val = $(this).val();
			
			$(this).prop('checked', val==s);
			$(this).parent()[val==s?'addClass':'removeClass']('active');
		});
	});
</script>