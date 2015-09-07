<?php require DIR_TEMPLATE . 'module/' . $_name . '-header.tpl'; ?>

<div class="col-xs-2">
	<ul class="nav nav-tabs tabs-left">
		<li class="active"><a data-toggle="tab" href="#attribs-list"><i class="glyphicon glyphicon-align-justify"></i> <?php echo $text_list; ?></a></li>
		<li><a data-toggle="tab" href="#attribs_sort-values"><i class="glyphicon glyphicon-sort-by-attributes"></i> <?php echo $text_sort_values; ?></a></li>
		<li><a data-toggle="tab" href="#attribs_images"><i class="glyphicon glyphicon glyphicon-picture"></i> <?php echo $text_images; ?></a></li>
	</ul>
</div>

<div class="col-xs-10">
	<div class="tab-content">
		<br />
		<div class="tab-pane active" id="attribs-list">
			<?php echo $entry_default_values; ?><br /><br />
			<?php 

				$_attribsName		= $_name . '_attribs';
				$_attribsValues		= $attribs;

				require DIR_TEMPLATE . 'module/' . $_name . '-attribs.tpl';

			?>
		</div>
		<?php $tmpTypes = array( 'sort-values', 'images' ); ?>
		<?php foreach( $tmpTypes as $tmpType ) { ?>
			<div class="tab-pane" id="attribs_<?php echo $tmpType; ?>">
				<table class="table table-without-thead">
					<tr>
						<td class="vertical-middle" width="150">
							<?php if( $tmpType == 'images' ) { ?>
								<i class="glyphicon glyphicon glyphicon-picture"></i> <?php echo $entry_set_images; ?>
							<?php } else { ?>
								<i class="glyphicon glyphicon-sort-by-attributes"></i> <?php echo $entry_set_default_sort_for; ?>
							<?php } ?>
						</td>
						<td class="vertical-middle" width="200" height="60">
							<select id="attrib-language_<?php echo $tmpType; ?>" class="form-control">
								<?php foreach( $languages as $language ) { ?>
									<option value="<?php echo $language['language_id']; ?>"><?php echo $language['name']; ?></option>
								<?php } ?>
							</select>
						</td>
						<td class="vertical-middle" width="200" height="60">
							<select id="attrib-group_<?php echo $tmpType; ?>" class="form-control">
								<option value=""><?php echo $text_select_group; ?></option>
								<?php foreach( $attribGroups as $group ) { ?>
									<option value="<?php echo $group['attribute_group_id']; ?>"><?php echo $group['name']; ?></option>
								<?php } ?>
							</select>
						</td>
						<td class="vertical-middle" width="200">
							<select id="attrib-item_<?php echo $tmpType; ?>" class="form-control">
								<option value=""><?php echo $text_select_attribute; ?></option>
							</select>
						</td>
						<td class="vertical-middle">
							<a href="#" id="save-sort-values_<?php echo $tmpType; ?>" class="btn btn-success btn-sm"><i class="glyphicon glyphicon-ok"></i> <?php echo $text_save; ?></a>
							<img src="view/stylesheet/mf/img/loading.gif" id="save-sort-loader_<?php echo $tmpType; ?>" />
							<a href="#" id="reset-sort-values_<?php echo $tmpType; ?>" class="btn btn-danger btn-sm"><i class="glyphicon glyphicon-repeat"></i> <?php echo $text_reset; ?></a>
						</td>
					</tr>
					<tr>
						<td colspan="5" id="attrib-values-cnt_<?php echo $tmpType; ?>"></td>
					</tr>
				</table>
			</div>
		<?php } ?>
	</div>
</div>

<div class="clearfix"></div>

<script type="text/javascript">
	var MF_AJAX_PARAMS = '<?php echo $HTTP_URL ? "&option=com_mijoshop&format=raw" : ""; ?>';
	
	function initByType( _TYPE_ ){
		var $group		= jQuery('#attrib-group_' + _TYPE_),
			$attrib		= jQuery('#attrib-item_' + _TYPE_),
			$language	= jQuery('#attrib-language_' + _TYPE_),
			$attribCnt	= $attrib.parent(),
			$save		= jQuery('#save-sort-values_' + _TYPE_).hide(),
			$reset		= jQuery('#reset-sort-values_' + _TYPE_).hide(),
			$saveLoader	= jQuery('#save-sort-loader_' + _TYPE_).hide(),
			$cnt		= jQuery('#attrib-values-cnt_' + _TYPE_),
			loader		= '<img src="view/stylesheet/mf/img/loading.gif" />',
			last_group	= null,
			last_attr	= null;
			
		$save.click(function(){
			$save.hide();
			$reset.hide();
			$saveLoader.show();
			
			var data = {
				'group_id'	: last_group,
				'attr_id'	: last_attr,
				'lang_id'	: $language.val(),
				'type'		: _TYPE_
			};
			
			$cnt.find('> ul > li').each(function(i){
				data['items[' + i + '][key]'] = jQuery(this).attr('data-key');
			});
			$cnt.find('input[name^="image"]').each(function(i){
				var key = jQuery(this).attr('id').split('-')[1],
					val = jQuery(this).val();
			
				if( val != '' ) {
					data['items[' + i + '][key]'] = key;
					data['items[' + i + '][img]'] = val;
				}
			});
			
			jQuery.post( '<?php echo $action_attribs_save; ?>'.replace(/&amp;/g, '&')+MF_AJAX_PARAMS, data, function(){
				$saveLoader.hide();
				$reset.show();
				
				if( _TYPE_ == 'images' )
					$save.show();
			});
			
			return false;
		});
		
		$reset.click(function(){
			var hSave = $save.is(':visible');
			
			if( hSave )	$save.hide();
			
			$reset.hide();
			$saveLoader.show();
			
			jQuery.post( '<?php echo $action_attribs_reset; ?>'.replace(/&amp;/g, '&')+MF_AJAX_PARAMS, {
				'group_id'	: last_group,
				'attr_id'	: last_attr,
				'lang_id'	: $language.val(),
				'type'		: _TYPE_
			}, function(){
				$saveLoader.hide();
				
				if( hSave )
					$save.show();
				
				changeAttrib( last_attr );
			});
			
			return false;
		});
		
		$language.change(function(){
			$attrib.trigger('change');
		});
	
		$group.change(function(){
			if( ! jQuery(this).val() ) return;
		
			$attribCnt.html(loader);
			$cnt.html('');
			$save.hide();
			$reset.hide();
			
			last_group = jQuery(this).val();
			
			jQuery.ajax({
				'url'		: '<?php echo $action_attribs_by_group; ?>'.replace(/&amp;/g,'&')+MF_AJAX_PARAMS, 
				'type'		: 'get',
				'data'		: { 'attribute_group_id' : jQuery(this).val(), 'lang_id'	: $language.val() }, 
				'success'	: function(response){
					var json = jQuery.parseJSON(response),
						html = '<select id="attrib-item_' + _TYPE_ + '" class="form-control"><option value=""><?php echo $text_select_attribute; ?></option>';
					
					for( var i = 0; i < json.length; i++ ) {
						html += '<option value="' + json[i].attribute_id + '">' + json[i].name + '</option>';
					}
					
					$attribCnt.html( html + '</select>' );
					$attrib = jQuery('#attrib-item_' + _TYPE_).change(function(){
						changeAttrib();
					});
				}
			});
		});
			
		function changeAttrib( id ) {
			if( ! $attrib.val() && typeof id == 'undefined' ) return;
			
			$cnt.html('<center>'+loader+'</center>');
			
			last_attr = typeof id == 'undefined' ? $attrib.val() : id;
			
			jQuery.ajax({
				'url'		: '<?php echo $action_values_by_attrib; ?>'.replace(/&amp;/g,'&')+MF_AJAX_PARAMS,
				'type'		: 'get',
				'data'		: { 'attribute_id' : last_attr, 'type' : _TYPE_, 'lang_id'	: $language.val() },
				'success'	: function(response){
					var json	= jQuery.parseJSON(response),
						$cnt2, i;
					
					if( json.length ) {
						if( _TYPE_ == 'images' ) {
							$cnt2	= jQuery('<table class="table">')
								.append(jQuery('<thead>')
									.append('<tr><th width="200"><?php echo $text_attribute_value; ?></th><th><?php echo $text_image; ?></th></tr>')
								)
								.append('<tbody>');
							
							for( i = 0; i < json.length; i++ ) {
								$cnt2.find('tbody').append(jQuery('<tr>')
									.append(jQuery('<td>')
										.html( json[i].val )
									)
									.append(jQuery('<td>')
										.append(jQuery('<div class="col-sm-10">')
											.append(jQuery('<a href="" id="thumb-' + json[i].key + '" data-toggle="image" class="img-thumbnail">')
												.append('<img src="' + ( json[i].img ? json[i].img : '<?php echo $no_image; ?>' ) + '" alt="" title="" data-placeholder="<?php echo $no_image; ?>" />')
												.append('<input type="hidden" name="image[' + json[i].key + ']" value="' + ( json[i].ival ) + '" id="input-' + json[i].key + '" />')
											)
										)
									)
								);
							}
							
							$cnt.css('padding', '8px 0');
							$save.show();
						} else {
							var changed = false;

							$cnt2 = jQuery('<ul class="sort-order-items">');

							for( i = 0; i < json.length; i++ ) {
								jQuery('<li>')
									.attr('data-key', json[i].key)
									.html( '<span><i class="glyphicon glyphicon-sort"></i> ' + json[i].val + '</span>' )
									.appendTo( $cnt2 );
							}

							$cnt2.sortable({
								'change' : function(){
									changed = true;
								},
								'stop' : function(){
									if( ! changed ) return;

									$save.show();
								}
							});
						}

					
						$cnt.html('').append($cnt2);
						$reset.show();
					} else {
						$reset.hide();
						$cnt.html('<?php echo $text_list_is_empty; ?>');
					}
				}
			});
		}
		
		$attrib.bind('change', function(){
			changeAttrib();
		});
	};
	
	initByType( 'sort-values' );
	initByType( 'images' );
</script> 

<?php require DIR_TEMPLATE . 'module/' . $_name . '-footer.tpl'; ?>