<?php

	require_once DIR_TEMPLATE . 'module/mega_filter-fn.tpl';

	if( ! isset( $IDX ) )
		$IDX = 0;

?>

<?php if( empty( $filters_view ) ) { ?>
	<div style="padding:5px">
		<?php echo $text_display_based_on_category; ?>: 
		<?php echo mf_render_btn_group( $text_yes, $text_no, $_filtersName . '[based_on_category]', ! empty( $_filtersValues['based_on_category'] ) ); ?>
	</div>
<?php } ?>

<table class="table table-hover filters" id="<?php echo $IDX; ?>_mf-filters-table">
	<thead>
		<tr>
			<th class="text-center">
				<input type="checkbox" class="check-all" style="float:left;" /> <?php echo $text_filter_name; ?>
			</th>
			<th class="text-left" width="100"><?php echo $text_enabled; ?></th>
			<th class="text-left" width="300"><?php echo $text_display_as_type; ?></th>
			<th class="text-center" width="150"><?php echo $text_collapsed_by_default; ?></th>
			<th class="text-center" width="180"><?php echo $text_display_list_of_items; ?></th>
			<th class="text-center" width="180"><?php echo $text_sort_order_values; ?></th>
			<th class="text-left" width="60"><?php echo $text_sort_order; ?></th>
		</tr>
	</thead>
	<tbody>
		<?php foreach( $filterItems as $item_id => $item ) { ?>
				<tr>
					<td>
						<?php echo $item['name']; ?>
					</td>
					<td>
						<?php echo mf_render_btn_group( $text_yes, $text_no, $_filtersName . '[' . (int)$item['filter_group_id'] . '][enabled]', ! empty( $_filtersValues[(int)$item['filter_group_id']]['enabled'] ) ); ?>
					</td>
					<td>
						<?php $tmpTypes = array( 'checkbox', 'radio', 'select', 'slider' ); ?>
						<select class="form-control" name="<?php echo $_filtersName; ?>[<?php echo (int)$item['filter_group_id']; ?>][type]">
							<?php $idxx = 0; foreach( $tmpTypes as $tmpType ) { ?>
								<option value="<?php echo $tmpType; ?>"<?php echo ! empty( $_filtersValues[(int)$item['filter_group_id']]['type'] ) && $_filtersValues[(int)$item['filter_group_id']]['type'] == $tmpType ? ' selected="selected"' : ''; ?>>
									<?php echo ${'text_type_' . $tmpType}; ?>
								</option>
							<?php $idxx++; } ?>
						</select>
						<br />
						<select class="form-control" name="<?php echo $_filtersName; ?>[<?php echo (int)$item['filter_group_id']; ?>][display_live_filter]">
							<option value=""<?php echo empty( $_filtersValues[(int)$item['filter_group_id']]['display_live_filter'] ) ? ' selected="selected"' : ''; ?>><?php echo $text_display_live_filter; ?> <?php echo $text_by_default; ?></option>
							<option value="1"<?php echo ! empty( $_filtersValues[(int)$item['filter_group_id']]['display_live_filter'] ) && $_filtersValues[(int)$item['filter_group_id']]['display_live_filter'] == '1' ? ' selected="selected"' : ''; ?>><?php echo $text_display_live_filter; ?> - <?php echo $text_yes; ?></option>
							<option value="-1"<?php echo ! empty( $_filtersValues[(int)$item['filter_group_id']]['display_live_filter'] ) && $_filtersValues[(int)$item['filter_group_id']]['display_live_filter'] == '-1' ? ' selected="selected"' : ''; ?>><?php echo $text_display_live_filter; ?> - <?php echo $text_no; ?></option>
						</select>
					</td>
					<td style="width:140px; text-align: center;">
						<?php echo mf_render_btn_collapsed( $text_yes, $text_no, $text_pc, $text_mobile, $_filtersName . '[' . (int)$item['filter_group_id'] . '][collapsed]', empty( $_filtersValues[(int)$item['filter_group_id']]['collapsed'] ) ? '0' : $_filtersValues[(int)$item['filter_group_id']]['collapsed'] ); ?>
					</td>
					<td style="width:140px; text-align: center;">
						<select class="form-control" name="<?php echo $_filtersName; ?>[<?php echo (int)$item['filter_group_id']; ?>][display_list_of_items]">
							<option value=""<?php echo empty( $_filtersValues[(int)$item['filter_group_id']]['display_list_of_items'] ) ? ' selected="selected"' : ''; ?>><?php echo $text_by_default; ?></option>
							<option value="scroll"<?php echo ! empty( $_filtersValues[(int)$item['filter_group_id']]['display_list_of_items'] ) && $_filtersValues[(int)$item['filter_group_id']]['display_list_of_items'] == 'scroll' ? ' selected="selected"' : ''; ?>><?php echo $text_with_scroll; ?></option>
							<option value="button_more"<?php echo ! empty( $_filtersValues[(int)$item['filter_group_id']]['display_list_of_items'] ) && $_filtersValues[(int)$item['filter_group_id']]['display_list_of_items'] == 'button_more' ? ' selected="selected"' : ''; ?>><?php echo $text_with_button_more; ?></option>
						</select>
					</td>
					<td style="width:140px; text-align: center;">
						<select class="form-control" name="<?php echo $_filtersName; ?>[<?php echo (int)$item['filter_group_id']; ?>][sort_order_values]">
							<option value=""<?php echo empty( $_filtersValues[(int)$item['filter_group_id']]['sort_order_values'] ) ? ' selected="selected"' : ''; ?>><?php echo $text_by_default; ?></option>
										
							<?php
										
								$sortOrderValues = array(
									'string_asc'	=> $text_string_asc,
									'string_desc'	=> $text_string_desc,
									'numeric_asc'	=> $text_numeric_asc,
									'numeric_desc'	=> $text_numeric_desc
								);
											
								foreach( $sortOrderValues as $k => $v ) {
									echo '<option value="' . $k . '"';
												
									if( ! empty( $_filtersValues[(int)$item['filter_group_id']]['sort_order_values'] ) && $_filtersValues[(int)$item['filter_group_id']]['sort_order_values'] == $k ) {
										echo ' selected="selected"';
									}
												
									echo '>' . $v . '</option>';
								}
										
							?>
						</select>
					</td>
					<td style="width:90px; text-align: center;">
						<input class="form-control" type="text" name="<?php echo $_filtersName; ?>[<?php echo (int)$item['filter_group_id']; ?>][sort_order]" value="<?php echo ! isset( $_filtersValues[(int)$item['filter_group_id']]['sort_order'] ) ? '' : $_filtersValues[(int)$item['filter_group_id']]['sort_order']; ?>" size="3" />
					</td>
				</tr>
		<?php } ?>
	</tbody>
</table>

<div class="pagination">
	<?php echo $pagination; ?>
</div>

<script type="text/javascript">		
	jQuery('#<?php echo $IDX; ?>_mf-filters-table input[type=checkbox][class=check-all]').change(function(){
		var s = jQuery(this).is(':checked');
		
		jQuery('input[name^="<?php echo $_filtersName; ?>["][name*="][enabled]"][type="radio"]').each(function(){
			var val = $(this).val();
			
			$(this).prop('checked', val==s);
			$(this).parent()[val==s?'addClass':'removeClass']('active');
		});
	});
</script>