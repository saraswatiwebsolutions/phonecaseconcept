<div class="panel-body">
<div class="pull-right">
    <button type="submit" form="form-submit" data-toggle="tooltip" title="<?php echo $button_save; ?>" class="btn btn-primary"><i class="fa fa-save"></i></button>
</div>
<form method="post" enctype="multipart/form-data" id="form-setting" class="form-horizontal">
<div class="tab-content">
<div class="fpd-modal-wrapper" id="fpd-modal-settings">
<ul class="nav nav-tabs" id="tab-config" style="margin-bottom:10px">
    <li class="active"><a style="text-decoration:none" href="#tab11" data-toggle="tab"><?php echo $tab_general; ?></a></li>
    <li><a style="text-decoration:none" href="#tab22" data-toggle="tab"><?php echo $tab_image_parameter; ?></a></li>
    <li><a style="text-decoration:none" href="#tab33" data-toggle="tab"><?php echo $tab_custom_text_parameter; ?></a></li>
</ul>
<div class="tab-content">
<div class="tab-pane active" id="tab11">
<div class="form-group">
    <label class="col-sm-3 control-label"><?php echo $entry_keyword; ?></label>
    <div class="col-sm-6">
        <input type="text" name="keyword" value="<?php echo $keyword; ?>" />
    </div>
</div>

<div class="form-group">
    <label class="col-sm-3 control-label"><?php echo $entry_frame_shadow; ?></label>
    <div class="col-sm-6">
        <select name="parameters[designs_parameter_frame_shadow]">
            <?php foreach($arr_frame_shadow as $key => $value) { ?>
                <?php if ($key == $parameters['designs_parameter_frame_shadow']) { ?>
                    <option value="<?php echo $key; ?>" selected="selected"><?php echo $value; ?></option>
                <?php } else { ?>
                    <option value="<?php echo $key; ?>"><?php echo $value; ?></option>
                <?php } ?>
            <?php } ?>
        </select>
        <input type="hidden" name="product_id" value="<?php echo $product_id; ?>" />
    </div>
</div>
<div class="form-group">
    <label class="col-sm-3 control-label"><?php echo $entry_view_selection_position; ?></label>
    <div class="col-sm-6">
        <select name="parameters[designs_parameter_view_selection_position]">
            <?php foreach($arr_select_position as $key => $value) { ?>
                <?php if ($key == $parameters['designs_parameter_view_selection_position']) { ?>
                    <option value="<?php echo $key; ?>" selected="selected"><?php echo $value; ?></option>
                <?php } else { ?>
                    <option value="<?php echo $key; ?>"><?php echo $value; ?></option>
                <?php } ?>
            <?php } ?>
        </select>
    </div>
</div>
        <div class="form-group">
            <label class="col-sm-3 control-label"><?php echo $entry_view_selection_floated; ?></label>
            <div class="col-sm-6">
                <?php if(isset($parameters['view_selection_floated']) && $parameters['view_selection_floated']){?>
                <input type="checkbox" name="parameters[view_selection_floated]" checked="checked" />
                <?php } else {?>
                <input type="checkbox" name="parameters[view_selection_floated]" />
                <?php }?>
                </div>
        </div>
        <div class="form-group">
            <label class="col-sm-3 control-label"><?php echo $entry_stage_width; ?></label>
            <div class="col-sm-6">
            <input type="number" name="parameters[stage_width]" value="<?php echo (isset($parameters['stage_width']) && $parameters['stage_width']) ? $parameters['stage_width'] : '';?>" placeholder="0" class="form-control" />
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-3 control-label"><?php echo $entry_stage_height; ?></label>
            <div class="col-sm-6">
            <input type="number" name="parameters[stage_height]" value="<?php echo (isset($parameters['stage_height']) && $parameters['stage_height']) ? $parameters['stage_height'] : '';?>" placeholder="0" class="form-control" />
            </div>
        </div>
    <!--fnt new-->
        <div class="form-group">
            <label class="col-sm-3 control-label" for="input-category"><?php echo $entry_category; ?></label>
            <div class="col-sm-6">
                <div style="position: relative;">
                    <input type="text" name="category" value="" placeholder="<?php echo $entry_category; ?>" id="input-category" class="form-control" />
                </div>
                <span class="help-block"><?php echo $help_category; ?></span>
                <div id="clipart-category" class="well well-sm" style="height: 150px; overflow: auto;">
                    <?php foreach ($clipart_categories as $clipart_category) { ?>
                    <div id="clipart-category<?php echo $clipart_category['category_clipart_id']; ?>"><i class="fa fa-minus-circle"></i> <?php echo $clipart_category['name']; ?>
                        <input type="hidden" name="parameters[clipart_category][]" value="<?php echo $clipart_category['category_clipart_id']; ?>" />
                    </div>
                    <?php } ?>
                </div>
            </div>
        </div>
    <div class="form-group">
        <label class="col-sm-3 control-label"><?php echo $entry_replace_initial_elements; ?></label>
        <div class="col-sm-6">
            <select name="parameters[designs_parameter_replace_initial_elements]">
                <?php foreach($arr_yes_no as $key => $value) { ?>
                <?php if ($key == $parameters['designs_parameter_replace_initial_elements']) { ?>
                <option value="<?php echo $key; ?>" selected="selected"><?php echo $value; ?></option>
                <?php } else { ?>
                <option value="<?php echo $key; ?>"><?php echo $value; ?></option>
                <?php } ?>
                <?php } ?>
            </select>
        </div>
    </div>
    <!--fnt new end-->
        <div class="form-group">
        <label class="col-sm-3 control-label"><?php echo $entry_background_type; ?></label>
        <div class="col-sm-6 ">
        <?php if(isset($parameters['background_type']) && $parameters['background_type'] == 'image'){?>
        <input type="radio" name="parameters[background_type]" value="image" checked="checked" /> <?php echo $text_background_type_image; ?>
        <input type="radio" name="parameters[background_type]" value="color" /> <?php echo $text_background_type_color; ?>
        <input type="radio" name="parameters[background_type]" value="none" /> <?php echo $text_background_type_none; ?>
        <?php } elseif(isset($parameters['background_type']) && $parameters['background_type'] == 'color') { ?>
        <input type="radio" name="parameters[background_type]" value="image" /> <?php echo $text_background_type_image; ?>
        <input type="radio" name="parameters[background_type]" value="color" checked="checked" /> <?php echo $text_background_type_color; ?>
        <input type="radio" name="parameters[background_type]" value="none" /> <?php echo $text_background_type_none; ?>
        <?php } else { ?>
        <input type="radio" name="parameters[background_type]" value="image" /> <?php echo $text_background_type_image; ?>
        <input type="radio" name="parameters[background_type]" value="color" /> <?php echo $text_background_type_color; ?>
        <input type="radio" name="parameters[background_type]"  checked="checked" value="none" /> <?php echo $text_background_type_none; ?>
        <?php }?>
    </div>
</div>
<div class="form-group" style="display:none">
    <label class="col-sm-3 control-label"><?php echo $entry_background_image; ?></label>
    <div class="col-sm-6">
        <div class="image"><!--<img src="<?php echo $thumb_background; ?>" alt="" id="background_thumb" /><br />-->
             <a href="" id="thumb-image" data-toggle="image" class="img-thumbnail">
                 <img src="<?php echo $thumb_background; ?>" alt="" title="" data-placeholder="<?php echo $placeholder; ?>" />
             </a>
            <input type="hidden" name="parameters[image]" value="<?php echo (isset($parameters['image']) && $parameters['image']) ? $parameters['image'] : '';?>" id="background_image" />
        </div>
    </div>
</div>
<div class="form-group" style="display:none">
	<label class="col-sm-3 control-label"><?php echo $entry_background_color; ?></label>
	<div class="col-sm-6">
		<input type="text" name="parameters[background_color]" value="<?php echo (isset($parameters['background_color']) && $parameters['background_color']) ? $parameters['background_color'] : '#FFFFFF';?>" class="form-control color {hash:true}" />
	</div>
</div>
<div class="form-group">
	<label class="col-sm-3 control-label"><?php echo $entry_hide_designs_tab; ?></label>
	<div class="col-sm-6">
		<input type="checkbox" name="parameters[hide_designs_tab]" <?php echo (isset($parameters['hide_designs_tab']) && $parameters['hide_designs_tab']) ? 'checked="checked"' : '';?>/>
	</div>
</div>
<div class="form-group">
	<label class="col-sm-3 control-label"><?php echo $entry_hide_facebook_tab; ?></label>
	<div class="col-sm-6">
		<input type="checkbox" name="parameters[hide_facebook_tab]" <?php echo (isset($parameters['hide_facebook_tab']) && $parameters['hide_facebook_tab']) ? 'checked="checked"' : '';?> />
	</div>
</div>
<div class="form-group">
	<label class="col-sm-3 control-label"><?php echo $entry_hide_instagram_tab; ?></label>
	<div class="col-sm-6">
		<input type="checkbox" name="parameters[hide_instagram_tab]" <?php echo (isset($parameters['hide_instagram_tab']) && $parameters['hide_instagram_tab']) ? 'checked="checked"' : '';?> />
	</div>
</div>
<div class="form-group">
	<label class="col-sm-3 control-label"><?php echo $entry_hide_custom_image_upload; ?></label>
	<div class="col-sm-6">
		<input type="checkbox" name="parameters[hide_custom_image_upload]" <?php echo (isset($parameters['hide_custom_image_upload']) && $parameters['hide_custom_image_upload']) ? 'checked="checked"' : '';?> />
	</div>
</div>
<div class="form-group">
	<label class="col-sm-3 control-label"><?php echo $entry_hide_custom_text; ?></label>
	<div class="col-sm-6">
		<input type="checkbox" name="parameters[hide_custom_text]" <?php echo (isset($parameters['hide_custom_text']) && $parameters['hide_custom_text']) ? 'checked="checked"' : '';?> />
	</div>
</div>
<!--fnt new-->
<div class="form-group">
<label class="col-sm-3 control-label"><?php echo $entry_color_prices_for_images; ?></label>
<div class="col-sm-6">
<select name="parameters[designs_parameter_enable_image_color_prices]">
<?php foreach($arr_yes_no as $key => $value) { ?>
<?php if ($key == $parameters['designs_parameter_enable_image_color_prices']) { ?>
<option value="<?php echo $key; ?>" selected="selected"><?php echo $value; ?></option>
<?php } else { ?>
<option value="<?php echo $key; ?>"><?php echo $value; ?></option>
<?php } ?>
<?php } ?>
</select>
</div>
</div>
<div class="form-group">
<label class="col-sm-3 control-label"><?php echo $entry_color_prices_for_texts; ?></label>
<div class="col-sm-6">
<select name="parameters[designs_parameter_enable_text_color_prices]">
<?php foreach($arr_yes_no as $key => $value) { ?>
<?php if ($key == $parameters['designs_parameter_enable_text_color_prices']) { ?>
<option value="<?php echo $key; ?>" selected="selected"><?php echo $value; ?></option>
<?php } else { ?>
<option value="<?php echo $key; ?>"><?php echo $value; ?></option>
<?php } ?>
<?php } ?>
</select>
</div>
</div>
<!--fnt new end-->
</div>
<div class="tab-pane" id="tab22">
<h3><?php echo $text_custom_control; ?></h3>
<div class="form-group">
	<label class="col-sm-3 control-label"><?php echo $entry_designs_parameter_price; ?></label>
	<div class="col-sm-6">
		<input type="number" min="0" step="0.01" name="parameters[designs_parameter_price]" value="<?php echo (isset($parameters['designs_parameter_price']) && $parameters['designs_parameter_price']) ? $parameters['designs_parameter_price'] : '';?>" placeholder="0" class="form-control" />
	</div>
</div>
<div class="form-group">
	<label class="col-sm-3 control-label"><?php echo $entry_designs_parameter_replace; ?></label>
	<div class="col-sm-6">
		<input type="text" name="parameters[designs_parameter_replace]" value="<?php echo (isset($parameters['designs_parameter_replace']) && $parameters['designs_parameter_replace']) ? $parameters['designs_parameter_replace'] : '';?>" placeholder="" class="form-control" />
	</div>
</div>
<div class="form-group">
	<label class="col-sm-3 control-label"><?php echo $entry_designs_parameter_bounding_box_control; ?></label>
	<div class="col-sm-6">
		<select name="parameters[designs_parameter_bounding_box_control]" class="form-control">
			<?php if(isset($parameters['designs_parameter_bounding_box_control']) && $parameters['designs_parameter_bounding_box_control'] == 1){?>
				<option value="0"><?php echo $text_use_option_main_setting; ?></option>
				<option value="1" data-class="custom-bb" selected="selected"><?php echo $text_custom_bounding_box; ?></option>
				<option value="2" data-class="target-bb"><?php echo $text_use_another_element_as_bounding_box; ?></option>
				<?php } elseif(isset($parameters['designs_parameter_bounding_box_control']) && $parameters['designs_parameter_bounding_box_control'] == 2){?>
				<option value="0"><?php echo $text_use_option_main_setting; ?></option>
				<option value="1" data-class="custom-bb"><?php echo $text_custom_bounding_box; ?></option>
				<option value="2" data-class="target-bb" selected="selected"><?php echo $text_use_another_element_as_bounding_box; ?></option>
				<?php }else{?>
				<option value="0"><?php echo $text_use_option_main_setting; ?></option>
				<option value="1" data-class="custom-bb"><?php echo $text_custom_bounding_box; ?></option>
				<option value="2" data-class="target-bb"><?php echo $text_use_another_element_as_bounding_box; ?></option>
			<?php }?>
			</select>
	</div>
</div>

<div class="form-group custom-bb">
	<label class="col-sm-3 control-label"><?php echo $entry_designs_parameter_bounding_box_x; ?></label>
	<div class="col-sm-6">
		<input type="number" name="parameters[designs_parameter_bounding_box_x]" min="0" step="1" value="<?php echo (isset($parameters['designs_parameter_bounding_box_x']) && $parameters['designs_parameter_bounding_box_x']) ? $parameters['designs_parameter_bounding_box_x'] : '';?>" placeholder="0" class="form-control" />
	</div>
</div>
<div class="form-group custom-bb">
	<label class="col-sm-3 control-label"><?php echo $entry_designs_parameter_bounding_box_y; ?></label>
	<div class="col-sm-6">
		<input type="number" name="parameters[designs_parameter_bounding_box_y]" min="0" step="1" value="<?php echo (isset($parameters['designs_parameter_bounding_box_y']) && $parameters['designs_parameter_bounding_box_y']) ? $parameters['designs_parameter_bounding_box_y'] : '';?>" placeholder="0" class="form-control" />
	</div>
</div>

<div class="form-group custom-bb">
	<label class="col-sm-3 control-label"><?php echo $entry_designs_parameter_bounding_box_width; ?></label>
	<div class="col-sm-6">
		<input type="number" name="parameters[designs_parameter_bounding_box_width]" min="0" step="1" value="<?php echo (isset($parameters['designs_parameter_bounding_box_width']) && $parameters['designs_parameter_bounding_box_width']) ? $parameters['designs_parameter_bounding_box_width'] : '';?>" placeholder="0" class="form-control" />
	</div>
</div>

<div class="form-group custom-bb">
	<label class="col-sm-3 control-label"><?php echo $entry_designs_parameter_bounding_box_height; ?></label>
	<div class="col-sm-6">
		<input type="number" name="parameters[designs_parameter_bounding_box_height]" min="0" step="1" value="<?php echo (isset($parameters['designs_parameter_bounding_box_height']) && $parameters['designs_parameter_bounding_box_height']) ? $parameters['designs_parameter_bounding_box_height'] : '';?>" placeholder="0" class="form-control" />
	</div>
</div>

<div class="form-group target-bb">
	<label class="col-sm-3 control-label"><?php echo $entry_designs_parameter_bounding_box_by_other; ?></label>
	<div class="col-sm-6">
		<input type="text" name="parameters[designs_parameter_bounding_box_by_other]" value="<?php echo (isset($parameters['designs_parameter_bounding_box_by_other']) && $parameters['designs_parameter_bounding_box_by_other']) ? $parameters['designs_parameter_bounding_box_by_other'] : '';?>" placeholder="" class="form-control" />
	</div>
</div>
<!--fnt new-->
<div class="form-group">
	<label class="col-sm-3 control-label"><?php echo $entry_hide_filters; ?></label>
	<div class="col-sm-6">
		<?php if(isset($parameters['designs_parameter_filters']) && $parameters['designs_parameter_filters']) { ?>
			<input type="checkbox" name="parameters[designs_parameter_filters]" checked="checked" />
		<?php } else { ?>
			<input type="checkbox" name="parameters[designs_parameter_filters]" />
		<?php } ?>
	</div>
</div>
<!--fnt end-->
<h3><?php echo $text_custom_image; ?></h3>
<div class="form-group">
	<label class="col-sm-3 control-label"><?php echo $entry_uploaded_designs_parameter_minW; ?></label>
	<div class="col-sm-6">
		<input type="number" name="parameters[uploaded_designs_parameter_minW]" min="1" step="1" value="<?php echo (isset($parameters['uploaded_designs_parameter_minW']) && $parameters['uploaded_designs_parameter_minW']) ? $parameters['uploaded_designs_parameter_minW'] : '';?>" placeholder="0" class="form-control" />
	</div>
</div>
<div class="form-group">
	<label class="col-sm-3 control-label"><?php echo $entry_uploaded_designs_parameter_minH; ?></label>
	<div class="col-sm-6">
		<input type="number" name="parameters[uploaded_designs_parameter_minH]" min="1" step="1" value="<?php echo (isset($parameters['uploaded_designs_parameter_minH']) && $parameters['uploaded_designs_parameter_minH']) ? $parameters['uploaded_designs_parameter_minH'] : '';?>" placeholder="0" class="form-control" />
	</div>
</div>
<div class="form-group">
	<label class="col-sm-3 control-label"><?php echo $entry_uploaded_designs_parameter_maxW; ?></label>
	<div class="col-sm-6">
		<input type="number" name="parameters[uploaded_designs_parameter_maxW]" min="1" step="1" value="<?php echo (isset($parameters['uploaded_designs_parameter_maxW']) && $parameters['uploaded_designs_parameter_maxW']) ? $parameters['uploaded_designs_parameter_maxW'] : '';?>" placeholder="0" class="form-control" />
	</div>
</div>
<div class="form-group">
	<label class="col-sm-3 control-label"><?php echo $entry_uploaded_designs_parameter_maxH; ?></label>
	<div class="col-sm-6">
		<input type="number" name="parameters[uploaded_designs_parameter_maxH]" min="1" step="1" value="<?php echo (isset($parameters['uploaded_designs_parameter_maxH']) && $parameters['uploaded_designs_parameter_maxH']) ? $parameters['uploaded_designs_parameter_maxH'] : '';?>" placeholder="0" class="form-control" />
	</div>
</div>
<div class="form-group">
	<label class="col-sm-3 control-label"><?php echo $entry_uploaded_designs_parameter_resizeToW; ?></label>
	<div class="col-sm-6">
		<input type="number" name="parameters[uploaded_designs_parameter_resizeToW]" min="1" step="1" value="<?php echo (isset($parameters['uploaded_designs_parameter_resizeToW']) && $parameters['uploaded_designs_parameter_resizeToW']) ? $parameters['uploaded_designs_parameter_resizeToW'] : '';?>" placeholder="0" class="form-control" />
	</div>
</div>
<div class="form-group">
	<label class="col-sm-3 control-label"><?php echo $entry_uploaded_designs_parameter_resizeToH; ?></label>
	<div class="col-sm-6">
		<input type="number" name="parameters[uploaded_designs_parameter_resizeToH]" min="1" step="1" value="<?php echo (isset($parameters['uploaded_designs_parameter_resizeToH']) && $parameters['uploaded_designs_parameter_resizeToH']) ? $parameters['uploaded_designs_parameter_resizeToH'] : '';?>" placeholder="0" class="form-control" />
	</div>
</div>
</div>
<div class="tab-pane" id="tab33">
<div class="form-group">
	<label class="col-sm-3 control-label"><?php echo $entry_custom_texts_parameter_bounding_box_control; ?></label>
	<div class="col-sm-6">
		<select name="parameters[custom_texts_parameter_bounding_box_control]" class="form-control">
			<?php if(isset($parameters['custom_texts_parameter_bounding_box_control']) && $parameters['custom_texts_parameter_bounding_box_control'] == 1){?>
		<option value="0"><?php echo $text_use_option_main_setting; ?></option>
		<option value="1" data-class="custom-bb" selected="selected"><?php echo $text_custom_bounding_box; ?></option>
		<option value="2" data-class="target-bb"><?php echo $text_use_another_element_as_bounding_box; ?></option>
		<?php } elseif(isset($parameters['custom_texts_parameter_bounding_box_control']) && $parameters['custom_texts_parameter_bounding_box_control'] == 2){?>
		<option value="0"><?php echo $text_use_option_main_setting; ?></option>
		<option value="1" data-class="custom-bb"><?php echo $text_custom_bounding_box; ?></option>
		<option value="2" data-class="target-bb" selected="selected"><?php echo $text_use_another_element_as_bounding_box; ?></option>
		<?php }else{?>
		<option value="0"><?php echo $text_use_option_main_setting; ?></option>
		<option value="1" data-class="custom-bb"><?php echo $text_custom_bounding_box; ?></option>
		<option value="2" data-class="target-bb"><?php echo $text_use_another_element_as_bounding_box; ?></option>
		<?php }?>
		</select>
		</div>
		</div>
		<div class="form-group custom-bb">
		<label class="col-sm-3 control-label"><?php echo $entry_custom_texts_parameter_bounding_box_x; ?></label>
		<div class="col-sm-6">
		<input type="number" name="parameters[custom_texts_parameter_bounding_box_x]" min="0" step="1" value="<?php echo (isset($parameters['custom_texts_parameter_bounding_box_x']) && $parameters['custom_texts_parameter_bounding_box_x']) ? $parameters['custom_texts_parameter_bounding_box_x'] : '';?>" placeholder="0" class="form-control" />
		</div>
		</div>
		<div class="form-group custom-bb">
		<label class="col-sm-3 control-label"><?php echo $entry_custom_texts_parameter_bounding_box_y; ?></label>
		<div class="col-sm-6">
		<input type="number" name="parameters[custom_texts_parameter_bounding_box_y]" min="0" step="1" value="<?php echo (isset($parameters['custom_texts_parameter_bounding_box_y']) && $parameters['custom_texts_parameter_bounding_box_y']) ? $parameters['custom_texts_parameter_bounding_box_y'] : '';?>" placeholder="0" class="form-control" />
		</div>
		</div>
		<div class="form-group custom-bb">
		<label class="col-sm-3 control-label"><?php echo $entry_custom_texts_parameter_bounding_box_width; ?></label>
		<div class="col-sm-6">
		<input type="number" name="parameters[custom_texts_parameter_bounding_box_width]" min="0" step="1" value="<?php echo (isset($parameters['custom_texts_parameter_bounding_box_width']) && $parameters['custom_texts_parameter_bounding_box_width']) ? $parameters['custom_texts_parameter_bounding_box_width'] : '';?>" placeholder="0" class="form-control" />
		</div>
		</div>
		<div class="form-group custom-bb">
		<label class="col-sm-3 control-label"><?php echo $entry_custom_texts_parameter_bounding_box_height; ?></label>
		<div class="col-sm-6">
		<input type="number" name="parameters[custom_texts_parameter_bounding_box_height]" min="0" step="1" value="<?php echo (isset($parameters['custom_texts_parameter_bounding_box_height']) && $parameters['custom_texts_parameter_bounding_box_height']) ? $parameters['custom_texts_parameter_bounding_box_height'] : '';?>" placeholder="0" class="form-control" />
		</div>
		</div>
		<div class="form-group target-bb">
		<label class="col-sm-3 control-label"><?php echo $entry_custom_texts_parameter_bounding_box_by_other; ?></label>
		<div class="col-sm-6">
		<input type="text" name="parameters[custom_texts_parameter_bounding_box_by_other]" value="<?php echo (isset($parameters['custom_texts_parameter_bounding_box_by_other']) && $parameters['custom_texts_parameter_bounding_box_by_other']) ? $parameters['custom_texts_parameter_bounding_box_by_other'] : '';?>" placeholder="" class="form-control" />
		</div>
		</div>
		<div class="form-group">
		<label class="col-sm-3 control-label"><?php echo $entry_default_text; ?></label>
		<div class="col-sm-6">
		<input type="text" name="parameters[default_text]" value="<?php echo (isset($parameters['default_text']) && $parameters['default_text']) ? $parameters['default_text'] : '';?>" placeholder="" class="form-control" />
		</div>
		</div>
		<div class="form-group">
		<label class="col-sm-3 control-label"><?php echo $entry_custom_texts_parameter_price; ?></label>
		<div class="col-sm-6">
		<input type="number" min="0" step="0.01" name="parameters[custom_texts_parameter_price]" value="<?php echo (isset($parameters['custom_texts_parameter_price']) && $parameters['custom_texts_parameter_price']) ? $parameters['custom_texts_parameter_price'] : '';?>" placeholder="0" class="form-control" />
		</div>
		</div>
		<div class="form-group">
		<label class="col-sm-3 control-label"><?php echo $entry_custom_texts_parameter_colors; ?></label>
		<div class="col-sm-6">
		<input type="text" name="parameters[custom_texts_parameter_colors]" value="<?php echo (isset($parameters['custom_texts_parameter_colors']) && $parameters['custom_texts_parameter_colors']) ? $parameters['custom_texts_parameter_colors'] : '';?>" placeholder="0" class="form-control color {hash:true}" />
	</div>
</div>
</div>
</div>
</div>
</div>
</form>
</div>
<script type="text/javascript">
    // Category
    $('input[name=\'category\']').autocomplete({
        'source': function(request, response) {
            $.ajax({
                url: 'index.php?route=catalog/fnt_category_clipart/autocomplete&token=<?php echo $token; ?>&filter_name=' +  encodeURIComponent(request),
                dataType: 'json',
                success: function(json) {
                    response($.map(json, function(item) {
                        return {
                            label: item['name'],
                            value: item['category_clipart_id']
                        }
                    }));
                }
            });
        },
        'select': function(item) {
            $('input[name=\'category\']').val('');

            $('#clipart-category' + item['value']).remove();

            $('#clipart-category').append('<div id="clipart-category' + item['value'] + '"><i class="fa fa-minus-circle"></i> ' + item['label'] + '<input type="hidden" name="parameters[clipart_category][]" value="' + item['value'] + '" /></div>');
        }
    });

    $('#clipart-category').delegate('.fa-minus-circle', 'click', function() {
        $(this).parent().remove();
    });

    $viewsList = $('#tab-design-views'),
    $modalWrapper = $('#fpd-modal-settings');
  
    //background type switcher
    $modalWrapper.find('[name="parameters[background_type]"]').change(function() {

        if(this.value == 'image') {
            $modalWrapper.find('#background_image').parents('.form-group').show();
            $modalWrapper.find('[name="parameters[background_color]"]').parents('.form-group').hide();
        }
        else if(this.value == 'color') {
            $modalWrapper.find('[name="parameters[background_color]"]').parents('.form-group').show();
            $modalWrapper.find('#background_image').parents('.form-group').hide();
        } else if(this.value == 'none') {
            $modalWrapper.find('#background_image').parents('.form-group').hide();
            $modalWrapper.find('[name="parameters[background_color]"]').parents('.form-group').hide();
        }
    });
    //bounding box switcher
    $('[name="parameters[designs_parameter_bounding_box_control]"], [name="parameters[custom_texts_parameter_bounding_box_control]"]').change(function() {
        var $this = $(this),
                $tbody = $this.parents('.tab-pane:first');
        $('#form-setting .active').find('.custom-bb, .target-bb').hide().addClass('no-serialization');
        $tbody.find('.custom-bb, .target-bb').hide().addClass('no-serialization');
        if(this.value != '') {
           //$('#form-setting .active').find(":selected").data('class').show().removeClass('no-serialization');
            $tbody.find('.'+$this.find(":selected").data('class')).show().removeClass('no-serialization');
        }
    });
</script>
<script type="text/javascript"><!--
    $('#tab-config a:first').tab('show');
	$modalWrapper.find('[name="parameters[background_type]"]:checked').change();
    $modalWrapper.find('select').trigger('change');
//--></script>
<script type="text/javascript"><!--
    $('button[form=\'form-submit\']').on('click', function() {
        $('#alert-setting .alert-success').remove();
        var data = $('#form-setting').serialize();
        $.ajax({
            url: 'index.php?route=catalog/fnt_product_design/insertIndividualSetting&token=<?php echo $token;?>',
            type: 'post',
            data: data,
            dataType: 'json',
            success: function() {
                html = '<div class="alert alert-success">';
                html += '       <i class="fa fa-check-circle"></i> ';
                html += '       Success: You have modified products!	';
                html += '       <button type="button" class="close" data-dismiss="alert">×</button>';
                html += '</div>';
                $('#alert-setting').append(html);
            }
        });

    });

    $('#thumb-image img').change().load(function(){
        $('body').addClass('modal-open');
        var hVal = $('#modal-settings .modal-content').height()   + 70;

        $('#modal-settings .modal-backdrop').css({'height':hVal + 'px'});
    });

    $('#fpd-modal-settings input[name=\'parameters[background_type]\']').change(function(){
        var hVal = $('#modal-settings .modal-content').height()   + 70;
        $('#modal-settings .modal-backdrop').css({'height':hVal + 'px'});
    });
//--></script>
</div>