<?php echo $header;?><?php echo $column_left;?>
	<div id="content">
		 <div class="page-header">
			<div class="container-fluid">
			  <div class="pull-right">
				<a href="<?php echo $cancel; ?>" data-toggle="tooltip" title="<?php echo $button_cancel; ?>" class="btn btn-default"><i class="fa fa-reply"></i></a></div>
			  <h1><?php echo $heading_title; ?></h1>
			  <ul class="breadcrumb">
				<?php foreach ($breadcrumbs as $breadcrumb) { ?>
				<li><a href="<?php echo $breadcrumb['href']; ?>"><?php echo $breadcrumb['text']; ?></a></li>
				<?php } ?>
			  </ul>
			</div>
		</div>	
		<div class="container-fluid">
			<div id="success"></div>
		  <div class="panel panel-default">
			<div class="panel-heading">
				<h3 class="panel-title"><i class="fa fa-pencil"></i> <?php echo $text_form; ?></h3>
			</div>
		<div class="panel-body">
		<div id="fpd-product-builder" class="wrap">
				<p class="description"><strong><i><?php echo $text_select_view;?></i></strong></p>
				<?php if($products_design_element){?>
					<select id="fpd-view-switcher">
						<?php foreach($products_design_element as $product_design_element){?>
							<?php if($product_design_element['children']){?>
								<optgroup id="<?php echo $product_design_element['id'];?>" label="<?php echo $product_design_element['name'];?>" style="padding-left:5px;">
									<?php foreach($product_design_element['children'] as $children){?>
										<?php if($product_design_element_id == $children['product_design_element_id']){?>
												<option selected="selected" value="<?php echo $children['product_design_element_id'];?>"><?php echo $children['name'];?></option>
											<?php } else {?>
												<option value="<?php echo $children['product_design_element_id'];?>"><?php echo $children['name'];?></option>
											<?php }?>
									<?php }?>
								</optgroup>
							<?php }?>	
						<?php }?>
					</select>
				<?php }?>	
			<div class="pull-right">	
				<input type="button" class="btn btn-primary" name="save_elements" id="save_elements" value="Save Elements" />
			</div>	
			<!-- Manage elements -->
			<div id="fpd-layers-container" class="fpd-clearfix">	
				<div id="fpd-manage-elements" class="fpd-panel">
					<h3><?php echo $text_manage_elements;?></h3>
					<div id="fpd-add-element">
						<button id="fpd-add-image-element" class="btn btn-info"><?php echo $text_add_image;?></button>
						<button id="fpd-add-text-element" class="btn btn-info"><?php echo $text_add_text;?></button>
						<button id="fpd-add-curved-text-element" class="btn btn-info"><?php echo $text_add_curved_text;?></button>
						<button id="fpd-add-upload-zone" class="btn btn-info"><?php echo $text_add_upload_zone;?></button>
					</div>
					<form id="fpd-submit" method="post">

						<input type="hidden" name="view_id" value="1">
						<input type="hidden" name="fnt_image_upload" id="fnt_image_upload" value="">
						<input type="hidden" name="http_server" id="http_server" value="<?php echo $domain;?>">
						<input type="hidden" name="fnt_image_upload" id="fnt_image_upload" value="">
						<input type="hidden" name="fnt_title" id="fnt_title" value="">
						<input type="hidden" name="fnt_type_upload" id="fnt_type_upload" value="">
						<ul id="fpd-elements-list" class="fpd-clearfix ui-sortable">
							<?php if($products_design){ $index = 0;?>
								<?php foreach($products_design as $product_design){?>
									<?php $change_image_icon = $product_design['type'] == 'image' ? '<a href="#" class="fpd-change-image fpd-admin-tooltip" title="Change Image Source"><i class="fpd-admin-icon-repeat"></i></a>' : '';
									$element_identifier = $product_design['type'] == 'image' ? '<img src="'.$dir_image . $product_design['value'].'" />' : '<i class="fpd-admin-icon-text-format"></i>';
									$lock_icon = 'fpd-admin-icon-lock-open';
									if(strpos($product_design['parameters'],'locked=1') !== false) {
										$lock_icon = 'fpd-admin-icon-lock';
									}?>
									<li class="fpd-clearfix" id="<?php echo $index;?>">
										<div>
											<span class="fpd-element-identifier"><?php echo $element_identifier;?></span>
											<input type="text" name="element_titles[]" value="<?php echo $product_design['type'] == 'image' ? $product_design['title'] : $product_design['value'];?>" />
										</div>
										<div>
											<?php echo $change_image_icon;?>
											<a href="#" class="fpd-lock-element"><i class="<?php echo $lock_icon;?>"></i></a>
											<a href="#" class="fpd-trash-element"><i class="fpd-admin-icon-close"></i></a>
										</div>
										<textarea name="element_sources[]"><?php echo $product_design['type'] == 'image' ? $dir_image . $product_design['value'] : $product_design['value'];?></textarea>
										<input type="hidden" value="<?php echo $product_design['type'];?>" name="element_types[]">
										<input type="hidden" value="<?php echo $product_design['parameters'];?>" name="element_parameters[]">
									</li>
									<?php $index++;?>
								<?php }?>
							<?php }?>	
						</ul>
						<p class="description"><?php echo $text_drag_list;?></p>
					</form>

				</div>

				<!-- Edit Parameters -->
				<div id="fpd-edit-parameters" class="fpd-panel">
					<h3><?php echo $text_edit_parameters;?> "<span id="fpd-edit-parameters-for"></span>"</h3>
					<div class="fpd-form-tabs fpd-clearfix">
						<a href="general-options" class="fpd-active"><?php echo $text_general; ?></a>
						<a href="modifications-options"><?php echo $text_modifications; ?></a>
						<a href="bb-options"><?php echo $text_bounding_box; ?></a>
						<a href="text-options" class="only-for-text-elements"><?php echo $text_text; ?></a>
						<a href="upload-zone-options" class="only-for-upload-zones"><?php echo $text_media_type; ?></a>
					</div>

					<form role="form" id="fpd-elements-form" class="">

						<!-- Hidden inputs for parameters set are set to true by default -->
						<input type="hidden" name="editable" value="0" />
						<input type="checkbox" name="locked" value="1" class="fpd-hidden" />
						<input type="checkbox" name="uploadZone" value="1" class="fpd-hidden" />

						<div class="fpd-form-tabs-content">

							<!-- General Options -->
							<table class="form-table fpd-active" id="general-options">
								<tbody>
									<tr>
										<th><?php echo $text_postion; ?>:</th>
										<td>
											<label><?php echo $text_x; ?>=<input type="text" name="x" size="3" placeholder="0" class="fpd-only-numbers"></label>
											<label><?php echo $text_y; ?>=<input type="text" name="y" size="3" placeholder="0" class="fpd-only-numbers"></label>
										</td>
									</tr>
									<tr>
										<th><?php echo $text_scale; ?>:</th>
										<td>
											<input type="text" name="scale" size="3" placeholder="1" class="fpd-only-numbers fpd-allow-dots">
										</td>
									</tr>
									<tr>
										<th><?php echo $text_angle; ?>:</th>
										<td>
											<input type="text" name="angle" size="3" placeholder="0" class="fpd-only-numbers">
										</td>
									</tr>
									<tr>
										<th><?php echo $text_price; ?>:</th>
										<td>
											<input type="text" name="price" size="3" placeholder="0" class="fpd-prevent-whitespace fpd-only-numbers fpd-allow-dots">
											<i class="fpd-admin-icon-info-outline fpd-admin-tooltip" title="<?php echo $title_price; ?>Always use a dot as the decimal separator!"></i>
										</td>
									</tr>
									<tr>
										<th><?php echo $text_replace; ?>:</th>
										<td>
											<input type="text" name="replace" value="" class="input-sm">
											<i class="fpd-admin-icon-info-outline fpd-admin-tooltip" title="<?php echo $title_replace;?>Elements with the same replace name will replace each other."></i>
										</td>
									</tr>
									<tr class="fpd-color-options">
										<th><?php echo $text_colors?>:</th>
										<td>
											<label class="checkbox-inline" style="margin-bottom: 15px;">
												<input type="checkbox" name="color_control" value="1"> <?php echo $text_enable_color; ?>
												<i class="fpd-admin-icon-info-outline fpd-admin-tooltip" title="<?php echo $title_enable_color; ?>"></i>
											</label>
											<input type="text" name="color_control_title" class="widefat fpd-color-control-fields" placeholder="Enter the title of an image element in the first view!" />
											<div id="fpd-color-inputs">
												<input type="text" name="colors" class="tm-input" placeholder="e.g. #000000,#ffffff" size="20" />
												<a href="#" class="button button-secondary" id="fpd-add-color"><?php echo $text_add; ?></a>
												<i class="fpd-admin-icon-info-outline fpd-admin-tooltip" title="<?php echo $title_add?>"></i>
											</div>
										</td>
									</tr>
									<tr class="fpd-color-options">
										<th><?php echo $text_current_color;?></th>
										<td>
											<input type="text" name="currentColor" placeholder="e.g. #000000" size="12" />
											<i class="fpd-admin-icon-info-outline fpd-admin-tooltip" title="<?php echo $title_current_color; ?>"></i>
										</td>
									</tr>
									<tr>
										<th><?php echo $text_opacity; ?>:</th>
										<td>
											<input type="text" name="opacity" size="3" placeholder="1" class="fpd-only-numbers fpd-allow-dots">
											<i class="fpd-admin-icon-info-outline fpd-admin-tooltip" title="<?php echo $title_opacity; ?>"></i>
										</td>
									</tr>
								</tbody>
							</table>

							<!-- Modifications Options -->
							<table class="form-table" id="modifications-options">
								<tbody>
									<tr>
										<th><label for="opt-removable"><?php echo $text_removable; ?></label></th>
										<td>
											<input type="checkbox" name="removable" id="opt-removable" value="1">
										</td>
									</tr>
									<tr>
										<th><label for="opt-draggable"><?php echo $text_draggable; ?></label></th>
										<td>
											<input type="checkbox" name="draggable" id="opt-draggable" value="1">
										</td>
									</tr>
									<tr>
										<th><label for="opt-rotatable"><?php echo $text_rotatable; ?></label></th>
										<td>
											<input type="checkbox" name="rotatable" id="opt-rotatable" value="1">
										</td>
									</tr>
									<tr>
										<th><label for="opt-resizable"><?php echo $text_resizable; ?></label></th>
										<td>
											<input type="checkbox" name="resizable" id="opt-resizable" value="1">
										</td>
									</tr>
									<tr>
										<th><label for="opt-zChangeable"><?php echo $text_unlock_layer_position; ?></label></th>
										<td>
											<input type="checkbox" name="zChangeable" id="opt-zChangeable" value="1">
										</td>
									</tr>
									<tr>
										<th><label for="opt-topped"><?php echo $text_stay_on_top; ?></label></th>
										<td>
											<input type="checkbox" name="topped" id="opt-topped" value="1">
										</td>
									</tr>
									<tr>
										<th><label for="opt-autoSelect"><?php echo $text_auto_select;?></label></th>
										<td>
											<input type="checkbox" name="autoSelect" id="opt-autoSelect" value="1">
										</td>
									</tr>
								</tbody>
							</table>

							<!-- Bounding Box Options -->
							<table class="form-table" id="bb-options">
								<tbody>
									<tr>
										<th><label for="opt-bounding_box_control"><?php echo $text_use_another_element;?></label></th>
										<td>
											<input type="checkbox" name="bounding_box_control" id="opt-bounding_box_control" value="1">
										</td>
									</tr>
									<tr>
										<th><?php echo $text_define_bounding; ?></th>
										<td>
											<div id="boundig-box-params">
												<label><?php echo $text_x; ?>:</label><input type="text" name="bounding_box_x" size="3" placeholder="0">
												<label><?php echo $text_y; ?>:</label><input type="text" name="bounding_box_y" size="3" placeholder="0">
												<label><?php echo $text_width; ?>:</label><input type="text" name="bounding_box_width" size="3" placeholder="0">
												<label><?php echo $text_height?>:</label><input type="text" name="bounding_box_height" size="3" placeholder="0">
											</div>
											<input type="text" name="bounding_box_by_other" class="widefat input-sm" placeholder="<?php echo $text_title_of_an_image_element; ?>" style="display: none;" />
										</td>
									</tr>
									<tr>
										<th><label for="opt-boundingBoxClipping"><?php echo $text_clip_element_into_bounding_box; ?></label></th>
										<td>
											<input type="checkbox" name="boundingBoxClipping" id="opt-boundingBoxClipping" value="1">
										</td>
									</tr>

								</tbody>
							</table>

							<!-- Text Options -->
							<table class="form-table" id="text-options">
								<tbody>
									<tr>
										<th><?php echo $text_font; ?></th>
										<td>
											<select name="font" data-placeholder="<?php echo $text_select_a_font;?>" class="fpd-font-changer radykal-select2" style="width: 100%">
												<?php foreach($fonts as $font) {?>
													<option value='<?php echo $font;?>' style='font-family: <?php echo $font;?>'><?php echo $font;?></option>
												<?php }?>
											</select>
										</td>
									</tr>
									<tr>
										<th><?php echo $text_styling;?></th>
										<td
											<span class="fpd-text-styling" style="margin-right: 20px;">
												<a href="#" class="fpd-bold button"><i class="fpd-admin-icon-format-bold"></i></a>
												<a href="#" class="fpd-italic button"><i class="fpd-admin-icon-format-italic"></i></a>
												<a href="#" class="fpd-underline button"><i class="fpd-admin-icon-format-underline"></i></a>
												<input type="checkbox" name="fontWeight" value="bold" class="fpd-hidden" />
												<input type="checkbox" name="fontStyle" value="italic" class="fpd-hidden" />
												<input type="checkbox" name="textDecoration" value="underline" class="fpd-hidden" />
											</span>
										</td>
									</tr>
									<tr>
										<th><?php echo $text_alignment;?></th>
										<td>
											<span class="fpd-text-align">
												<a href="#" class="fpd-align-left button" data-value="left"><i class="fpd-admin-icon-format-align-left"></i></a>
												<a href="#" class="fpd-align-center button" data-value="center"><i class="fpd-admin-icon-format-align-center"></i></a>
												<a href="#" class="fpd-align-right button" data-value="right"><i class="fpd-admin-icon-format-align-right"></i></a>
												<input type="hidden" name="textAlign" value="left" />
											</span>
										</td>
									</tr>
									<tr>
										<th><?php echo $text_x_reference_point; ?></th>
										<td>
											<span class="fpd-text-originX">
												<a href="#" class="fpd-originX-left button" data-value="left"><i class="fpd-admin-icon-originX-left"></i></a>
												<a href="#" class="fpd-originX-center button" data-value="center"><i class="fpd-admin-icon-originX-center"></i></a>
												<a href="#" class="fpd-originX-right button" data-value="right"><i class="fpd-admin-icon-originX-right"></i></a>
												<input type="hidden" name="originX" value="center" />
											</span>
										</td>
									</tr>
									<tr>
										<th><?php echo $text_maximum_characters; ?></th>
										<td><input type="text" name="maxLength" size="3" placeholder="0" class="fpd-only-numbers"></td>
									</tr>
									<tr>
										<th><?php echo $text_line_height; ?></th>
										<td><input type="text" name="lineHeight" size="3" placeholder="1" class="fpd-only-numbers fpd-allow-dots"></td>
									</tr>
									<tr>
										<th>
											<label for="opt-editable"><?php echo $text_editable?></label>
										</th>
										<td>
											<input type="checkbox" name="editable" id="opt-editable" value="1">
										</td>
									</tr>
									<tr>
										<th>
											<label for="opt-patternable"><?php echo $text_patternable;?></label>
										</th>
										<td>
											<input type="checkbox" name="patternable" id="opt-patternable" value="1">
										</td>
									</tr>
									<tr>
										<th>
											<label for="opt-curvable"><?php echo $text_curvable; ?></label>
										</th>
										<td>
											<input type="checkbox" name="curvable" id="opt-curvable" value="1">
											<i class="fpd-admin-icon-info-outline fpd-admin-tooltip" title="<?php echo $title_curvable; ?>"></i>
										</td>
									</tr>
									<tr class="fpd-curved-text-opts">
										<th>
											<?php echo $text_curvable_spacing;?>
										</th>
										<td>
											<input type="checkbox" name="curved" value="1" class="fpd-hidden">
											<input type="text" name="curveSpacing" size="3" placeholder="10" class="fpd-only-numbers">
										</td>
									</tr>
									<tr class="fpd-curved-text-opts">
										<th>
											<?php echo $text_curvable_radius; ?>
										</th>
										<td>
											<input type="text" name="curveRadius" size="3" placeholder="80" class="fpd-only-numbers">
										</td>
									</tr>
									<tr class="fpd-curved-text-opts">
										<th>
											<label for="opt-curveReverse"><?php echo $text_curvable_reverse; ?></label>
										</th>
										<td>
											<input type="checkbox" name="curveReverse" id="opt-curveReverse" value="1">
										</td>
									</tr>
								</tbody>
							</table>

							<!-- Upload Zone Options -->
							<table class="form-table" id="upload-zone-options">
								<tbody>
									<tr>
										<th><label><?php echo $text_image_upload; ?></label></th>
										<td class="radio-group">
											<label><input type="radio" name="adds_uploads" value="1"><?php echo $text_yes; ?></label>
											<label><input type="radio" name="adds_uploads" value="0"><?php echo $text_no; ?></label>
										</td>
									</tr>
									<tr>
										<th><label><?php echo $text_custom_text; ?></label></th>
										<td class="radio-group">
											<label><input type="radio" name="adds_texts" value="1"><?php echo $text_yes; ?></label>
											<label><input type="radio" name="adds_texts" value="0"><?php echo $text_no; ?></label>
										</td>
									</tr>
									<tr>
										<th><label><?php echo $text_design; ?></label></th>
										<td class="radio-group">
											<label><input type="radio" name="adds_designs" value="1"><?php echo $text_yes; ?></label>
											<label><input type="radio" name="adds_designs" value="0"><?php echo $text_no; ?></label>
										</td>
									</tr>
									<tr>
										<th><label><?php echo $text_fb_photo; ?></label></th>
										<td class="radio-group">
											<label><input type="radio" name="adds_facebook" value="1"><?php echo $text_yes; ?></label>
											<label><input type="radio" name="adds_facebook" value="0"><?php echo $text_no; ?></label>
										</td>
									</tr>
									<tr>
										<th><label><?php echo $text_instagram_photo; ?></label></th>
										<td class="radio-group">
											<label><input type="radio" name="adds_instagram" value="1"><?php echo $text_no; ?></label>
											<label><input type="radio" name="adds_instagram" value="0"><?php echo $text_no; ?></label>
										</td>
									</tr>
								</tbody>
							</table>

						</div>

					</form>
				</div>
			</div>
			<!-- Product Stage -->
			<div id="fpd-product-stage">
				<h3 class="fpd-clearfix"><?php echo $text_product_stage;?> <span class="description"><?php echo $config_stage_width;?>px * <?php echo $config_stage_height;?>px</span>
					<a style="float: right;" data-toggle="tooltip" title="<?php echo $text_help_text_problems;?>" class="fpd-help"><?php echo $text_problems;?></a>
				</h3>
				<div id="fpd-element-toolbar">
				<a href="#" class="button button-secondary fpd-center-horizontal"><?php echo $text_center_horizontal; ?></a>
				<a href="#" class="button button-secondary fpd-center-vertical"><?php echo $text_center_vertical; ?></a>
				<a href="#" class="button button-secondary fpd-dupliacte-layer"><?php echo $text_duplicate_layer; ?></a>
			</div>
				<div id="fpd-fabric-stage-wrapper">
				<canvas id="fpd-fabric-stage" width="<?php echo $config_stage_width;?>" height="<?php echo $config_stage_height;?>"></canvas>
			</div>
			</div>
		</div>
	</div>	
	</div>	
	</div>	
	<script type='text/javascript'>
	/* <![CDATA[ */
	var fpd_product_builder_opts = {"originX":"center","originY":"center","paddingControl":"7","defaultFont":"Arial","enterTitlePrompt":"Enter a title for the element","chooseElementImageTitle":"Choose an element image","set":"Set","enterYourText":"Enter your text.","removeElement":"Remove element?","notChanged":"You have not save your changes!","changeImageSource":"Change Image Source"};
	/* ]]> */
	jQuery(document).ready(function($) {
		$('body').addClass('wp-core-ui').addClass('fancy-product-designer_page_fpd_product_builder');
	});
	$('#fpd-view-switcher').live('change', function (){
		var id = $(this).find('option:selected').parent().attr('id');
		var url = 'index.php?route=catalog/fnt_custom_design&token=<?php echo $token;?>&product_design_element_id=' + this.value + '&product_design_id=' + id;	
		window.location = url;
	});
	$('#save_elements').live('click', function(){
				
		var url = 'index.php?route=catalog/fnt_custom_design/saveProductDesign&token=<?php echo $token; ?>&product_design_element_id=<?php echo $product_design_element_id; ?>&product_design_id=<?php echo $product_design_id;?>';
		$.ajax({	
			url: url,
			dataType: 'json',		
			type:'post',
			data: $('#fpd-submit').serialize(),
			success: function(json) {
				$('.alert').remove();
				if(json['success']){
					$('#fpd-product-builder').before('<div class="alert alert-success"><i class="fa fa-check-circle"></i>' + json['success'] + '<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
				}
			}
		});

	return false;
	});
</script>
</div>
<?php echo $footer;?>