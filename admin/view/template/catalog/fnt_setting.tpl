<?php echo $header; ?><?php echo $column_left; ?>
<div id="content">
<script type="text/javascript" src="view/javascript/jquery/jscolor/jscolor.js"></script>
  <div class="page-header">
    <div class="container-fluid">
      <div class="pull-right">
				<!--<button type="submit" form="form-featured" data-toggle="tooltip" title="<?php echo $button_save; ?>" class="btn btn-primary"><i class="fa fa-save"></i></button> -->
				<button type="submit" form="form-featured" data-toggle="tooltip" title="<?php echo $text_save_edit; ?>" class="btn btn-primary"><i class="fa fa-save"></i> <?php echo $text_save_edit;?></button>
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
		<?php if ($error_warning) { ?>
		<div class="alert alert-danger"><i class="fa fa-exclamation-circle"></i> <?php echo $error_warning; ?>
			<button type="button" class="close" data-dismiss="alert">&times;</button>
		</div>
		<?php } ?>
		<?php if ($success) { ?>
		<div class="alert alert-success"><i class="fa fa-check-circle"></i> <?php echo $success; ?>
			<button type="button" class="close" data-dismiss="alert">&times;</button>
		</div>
		<?php } ?>
	<div class="panel panel-default">
		<div class="panel-heading">
			<h3 class="panel-title"><i class="fa fa-pencil"></i> <?php echo $text_form; ?></h3>
		</div>
	<div class="panel-body">		
      <form action="<?php echo $action; ?>" method="post" enctype="multipart/form-data" id="form-featured" class="form-horizontal">
		<div class="tab-content">
	  	<ul class="nav nav-tabs">
		<li class="active" ><a href="#general" data-toggle="tab"><?php echo $text_general;?></a></li>
		<li><a href="#design" data-toggle="tab"><?php echo $text_default_element_options;?></a></li>
		<!--<li><a href="#custom" data-toggle="tab"><?php echo $text_custom;?></a></li>-->
		<li><a href="#color-config" data-toggle="tab"><?php echo $text_advanced_color_config; ?></a></li>
		</ul>
		<div id="general" class="tab-pane active">
		<br>
		<fieldset>
		<legend><?php echo $text_layout_skin;?></legend>
		<div class="form-group">
            <label class="col-sm-3 control-label"><?php echo $entry_stage_width; ?> <img class="help_tip" data-toggle="tooltip" title="<?php echo $help_stage_width;?>" width="16" height="16" src="view/image/help.png"></label>
			<div class="col-sm-2">
				<input type="number" name="config_designs_stage_width" value="<?php echo $config_stage_width; ?>" placeholder="<?php echo $entry_stage_width; ?>" class="form-control" />
			</div>
		</div>
		<div class="form-group">
            <label class="col-sm-3 control-label"><?php echo $entry_stage_height; ?> <img class="help_tip" data-toggle="tooltip" title="<?php echo $help_stage_height;?>" width="16" height="16" src="view/image/help.png"></label>
			<div class="col-sm-2">
				<input type="number" name="config_designs_stage_height" value="<?php echo $config_stage_height; ?>" placeholder="<?php echo $entry_stage_height; ?>" class="form-control" />
			</div>
		</div>
        <div class="form-group">
            <label class="col-sm-3 control-label"><?php echo $entry_frame_shadow; ?></label>
            <div class="col-sm-6">
                <select class="form-control" name="config_designs_frame_shadow">
                    <?php foreach($arr_frame_shadow as $key => $value) { ?>
                    <?php if ($key == $config_frame_shadow) { ?>
                    <option value="<?php echo $key; ?>" selected="selected"><?php echo $value; ?></option>
                    <?php } else { ?>
                    <option value="<?php echo $key; ?>"><?php echo $value; ?></option>
                    <?php } ?>
                    <?php } ?>
                </select>
            </div>
        </div>
		<div class="form-group">
            <label class="col-sm-3 control-label"><?php echo $entry_view_selection_position; ?></label>
            <div class="col-sm-6">
                <select class="form-control" name="config_designs_view_selection_position">
                    <?php foreach($arr_view_selection_position as $key => $value) { ?>
                    <?php if ($key == $config_view_selection_position) { ?>
                    <option value="<?php echo $key; ?>" selected="selected"><?php echo $value; ?></option>
                    <?php } else { ?>
                    <option value="<?php echo $key; ?>"><?php echo $value; ?></option>
                    <?php } ?>
                    <?php } ?>
                </select>
            </div>
        </div>

        <div class="form-group">
            <label class="col-sm-3 control-label"><?php echo $entry_view_selection_float; ?> <img class="help_tip" data-toggle="tooltip" title="<?php echo $help_view_selection_float; ?>" width="16" height="16" src="view/image/help.png"></label>
            <div class="col-sm-3">
                <?php if($config_view_selection_float){ ?>
                <input type="checkbox" name="config_designs_view_selection_float" checked="checked" />
                <?php } else { ?>
                <input type="checkbox" name="config_designs_view_selection_float" />
                <?php }?>
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-3 control-label"><?php echo $entry_hide_on_smartphones; ?> <img class="help_tip" data-toggle="tooltip" title="Hide product designer on smartphones" width="16" height="16" src="view/image/help.png"></label>
            <div class="col-sm-3">
                <?php if($config_disable_on_smartphones){ ?>
                <input type="checkbox" name="config_designs_disable_on_smartphones" checked="checked"/>
                <?php } else { ?>
                <input type="checkbox" name="config_designs_disable_on_smartphones"/>
                <?php }?>
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-3 control-label"><?php echo $entry_hide_on_tablets; ?> <img class="help_tip" data-toggle="tooltip" title="Hide product designer on tablets" width="16" height="16" src="view/image/help.png"></label>
            <div class="col-sm-3">
                <?php if($config_disable_on_tablets){ ?>
                <input type="checkbox" name="config_designs_disable_on_tablets" checked="checked"/>
                <?php } else { ?>
                <input type="checkbox" name="config_designs_disable_on_tablets"/>
                <?php }?>
            </div>
        </div>
		</fieldset>
        <!--fpd new-->
		<fieldset>
		<legend><?php echo $text_colors; ?></legend>
        <div class="form-group">
            <label class="col-sm-3 control-label"><?php echo $entry_designer_primary_color; ?> </label>
            <div class="col-sm-1">
                <input type="text" name="config_designs_designer_primary_color" value="<?php echo $config_designer_primary_color; ?>" placeholder="<?php echo $entry_selected_color; ?>" class="form-control color {hash:true}" />
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-3 control-label"><?php echo $entry_designer_secondary_color; ?> </label>
            <div class="col-sm-1">
                <input type="text" name="config_designs_designer_secondary_color" value="<?php echo $config_designer_secondary_color; ?>" placeholder="<?php echo $entry_selected_color; ?>" class="form-control color {hash:true}" />
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-3 control-label"><?php echo $entry_designer_primary_text_color; ?> </label>
            <div class="col-sm-1">
                <input type="text" name="config_designs_designer_primary_text_color" value="<?php echo $config_designer_primary_text_color; ?>" placeholder="<?php echo $entry_selected_color; ?>" class="form-control color {hash:true}" />
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-3 control-label"><?php echo $entry_designer_secondary_text_color; ?> </label>
            <div class="col-sm-1">
                <input type="text" name="config_designs_designer_secondary_text_color" value="<?php echo $config_designer_secondary_text_color; ?>" placeholder="<?php echo $entry_selected_color; ?>" class="form-control color {hash:true}" />
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-3 control-label"><?php echo $entry_selected_color; ?> </label>
            <div class="col-sm-1">
                <input type="text" name="config_designs_selected_color" value="<?php echo $config_selected_color; ?>" placeholder="<?php echo $entry_selected_color; ?>" class="form-control color {hash:true}" />
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-3 control-label"><?php echo $entry_bounding_box_color; ?> </label>
            <div class="col-sm-1">
                <input type="text" name="config_designs_bounding_box_color" value="<?php echo $config_bounding_box_color; ?>" placeholder="<?php echo $entry_selected_color; ?>" class="form-control color {hash:true}" />
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-3 control-label"><?php echo $entry_out_of_boundary_color; ?> </label>
            <div class="col-sm-1">
                <input type="text" name="config_designs_out_of_boundary_color" value="<?php echo $config_out_of_boundary_color; ?>" placeholder="<?php echo $entry_selected_color; ?>" class="form-control color {hash:true}" />
            </div>
        </div>
		</fieldset>
        <!--fpd end-->
		<fieldset>
		<legend><?php echo $text_user_interface; ?></legend>
        <div class="form-group">
            <label class="col-sm-3 control-label"><?php echo $entry_upload_designs; ?><img class="help_tip" data-toggle="tooltip" title="Let customers upload their own images to products?" width="16" height="16" src="view/image/help.png"></label>
            <div class="col-sm-9">
                <?php if($config_upload_designs){ ?>
                <input type="checkbox" name="config_designs_upload_designs" checked="checked" />
                <?php } else { ?>
                <input type="checkbox" name="config_designs_upload_designs" />
                <?php }?>
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-3 control-label"><?php echo $entry_upload_text; ?><img class="help_tip" data-toggle="tooltip" title="Let customers add their own text elements to products?" width="16" height="16" src="view/image/help.png"></label>
            <div class="col-sm-9">
                <?php if($config_upload_text){ ?>
                <input type="checkbox" name="config_designs_upload_text" checked="checked" />
                <?php } else { ?>
                <input type="checkbox" name="config_designs_upload_text" />
                <?php }?>
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-3 control-label"><?php echo $entry_download_image; ?><img class="help_tip" data-toggle="tooltip" title="Let customers download a product image?" width="16" height="16" src="view/image/help.png"></label>
            <div class="col-sm-9">
                <?php if($config_download_image){ ?>
                <input type="checkbox" name="config_designs_download_image" checked="checked" />
                <?php } else { ?>
                <input type="checkbox" name="config_designs_download_image" />
                <?php }?>
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-3 control-label"><?php echo $entry_pdf_button; ?><img class="help_tip" data-toggle="tooltip" title="Let customers save the product as PDF?" width="16" height="16" src="view/image/help.png"></label>
            <div class="col-sm-9">
                <?php if($config_pdf_button){ ?>
                <input type="checkbox" name="config_designs_pdf_button" checked="checked" />
                <?php } else { ?>
                <input type="checkbox" name="config_designs_pdf_button" />
                <?php }?>
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-3 control-label"><?php echo $entry_print_button; ?><img class="help_tip" data-toggle="tooltip" title="Let customers print the product?" width="16" height="16" src="view/image/help.png"></label>
            <div class="col-sm-9">
                <?php if($config_print_button){ ?>
                <input type="checkbox" name="config_designs_print_button" checked="checked" />
                <?php } else { ?>
                <input type="checkbox" name="config_designs_print_button" />
                <?php }?>
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-3 control-label"><?php echo $entry_allow_product_saving; ?><img class="help_tip" data-toggle="tooltip" title="Let customers save their customized products?" width="16" height="16" src="view/image/help.png"></label>
            <div class="col-sm-9">
                <?php if($config_allow_product_saving){ ?>
                <input type="checkbox" name="config_designs_allow_product_saving" checked="checked" />
                <?php } else { ?>
                <input type="checkbox" name="config_designs_allow_product_saving" />
                <?php }?>

            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-3 control-label"><?php echo $entry_view_tooltip; ?><img class="help_tip" data-toggle="tooltip" title="Use tooltips in the product designer." width="16" height="16" src="view/image/help.png"></label>
            <div class="col-sm-9">
                <?php if($config_view_tooltip){ ?>
                <input type="checkbox" name="config_designs_view_tooltip" checked="checked" />
                <?php } else { ?>
                <input type="checkbox" name="config_designs_view_tooltip" />
                <?php }?>
            </div>
        </div>
		</fieldset>
		<fieldset>
		<legend><?php echo $text_miscellaneous; ?></legend>
        <div class="form-group">
            <label class="col-sm-3 control-label"><?php echo $entry_minimum_dpi; ?> <img class="help_tip" data-toggle="tooltip" title="The minimum allowed DPI, when using the PHP uploader." width="16" height="16" src="view/image/help.png"></label>
            <div class="col-sm-2">
                <input type="number" name="config_designs_minimum_dpi" value="<?php echo $config_minimum_dpi; ?>" placeholder="72" class="form-control" />
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-3 control-label"><?php echo $entry_facebook_app_id; ?> <img class="help_tip" data-toggle="tooltip" title="<?php echo $help_facebook_app_id;?>" width="16" height="16" src="view/image/help.png"></label>
            <div class="col-sm-9">
                <input type="text" name="config_designs_facebook_app_id" value="<?php echo $config_facebook_app_id; ?>" placeholder="<?php echo $entry_facebook_app_id; ?>" class="form-control" />
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-3 control-label"><?php echo $entry_instagram_client_id; ?> <img class="help_tip" data-toggle="tooltip" title="<?php echo $help_instagram_client_id;?>" width="16" height="16" src="view/image/help.png"></label>
            <div class="col-sm-9">
                <input type="text" name="config_designs_instagram_client_id" value="<?php echo $config_instagram_client_id; ?>" placeholder="<?php echo $entry_instagram_client_id; ?>" class="form-control" />
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-3 control-label"><?php echo $entry_zoom; ?> <img class="help_tip" data-toggle="tooltip" title="<?php echo $help_zoom;?>" width="16" height="16" src="view/image/help.png"></label>
            <div class="col-sm-2">
                <input type="number" name="config_designs_zoom" value="<?php echo $config_zoom; ?>" placeholder="<?php echo $entry_zoom; ?>" class="form-control" />
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-3 control-label"><?php echo $entry_zoom_max; ?> <img class="help_tip" data-toggle="tooltip" title="<?php echo $help_zoom_max;?>" width="16" height="16" src="view/image/help.png"></label>
            <div class="col-sm-2">
                <input type="number" name="config_designs_zoom_max" value="<?php echo $config_zoom_max; ?>" placeholder="<?php echo $entry_zoom_max; ?>" class="form-control" />
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-3 control-label"><?php echo $entry_padding_controls; ?> <img class="help_tip" data-toggle="tooltip" title="The padding of the controls when an element is selected in the product stage." width="16" height="16" src="view/image/help.png"></label>
            <div class="col-sm-2">
                <input type="number" name="config_designs_padding_controls" value="<?php echo $config_padding_controls; ?>" placeholder="0" class="form-control" />
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-3 control-label"><?php echo $entry_replace_initial_elements; ?><img class="help_tip" data-toggle="tooltip" title="<?php echo $help_replace_initial_elements; ?>" width="16" height="16" src="view/image/help.png"></label>
            <div class="col-sm-3">
                <?php if(isset($config_replace_initial_elements) && $config_replace_initial_elements){ ?>
                <input type="checkbox" name="config_designs_replace_initial_elements" checked="checked" />
                <?php } else { ?>
                <input type="checkbox" name="config_designs_replace_initial_elements" />
                <?php }?>
            </div>
        </div>
		</fieldset>
		</div>
		<div id="design" class="tab-pane">
		<br>
		<fieldset>
                <legend><?php echo $text_image_options; ?></legend>
		<h4><?php echo $text_design_upload_image;?></h4>
		<div class="form-group">
				<label class="col-sm-3 control-label"><?php echo $entry_designs_parameter_x; ?></label>
				<div class="col-sm-3">
					<input type="number" name="config_designs_parameter_x" value="<?php echo $config_designs_parameter_x; ?>" placeholder="<?php echo $entry_designs_parameter_x; ?>" class="form-control" />
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-3 control-label"><?php echo $entry_designs_parameter_y; ?></label>
				<div class="col-sm-3">
					<input type="number" name="config_designs_parameter_y" value="<?php echo $config_designs_parameter_y; ?>" placeholder="<?php echo $entry_designs_parameter_y; ?>" class="form-control" />
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-3 control-label"><?php echo $entry_designs_parameter_z; ?> <img class="help_tip pull-right" data-toggle="tooltip" title="<?php echo $help_designs_parameter_z;?>" width="16" height="16" src="view/image/help.png"></label>
				<div class="col-sm-3">
					<input type="number" name="config_designs_parameter_z" value="<?php echo $config_designs_parameter_z; ?>" placeholder="<?php echo $entry_designs_parameter_z; ?>" class="form-control" />
				</div>
			</div>
            <div class="form-group">
                <label class="col-sm-3 control-label"><?php echo $entry_designs_parameter_colors; ?><img class="help_tip pull-right" data-toggle="tooltip" title="<?php echo $help_hex_color;?>" width="16" height="16" src="view/image/help.png"></label>
                <div class="col-sm-3">
                    <input type="text" name="config_designs_parameter_colors" value="<?php echo $config_designs_parameter_colors ;?>" placeholder="#000000" class="form-control" />
                </div>
            </div>
			<div class="form-group">
				<label class="col-sm-3 control-label"><?php echo $entry_designs_parameter_price; ?> <img class="help_tip pull-right" data-toggle="tooltip" title="<?php echo $help_designs_parameter_price;?>" width="16" height="16" src="view/image/help.png"></label>
				<div class="col-sm-3">
					<input type="number" name="config_designs_parameter_price" value="<?php echo $config_designs_parameter_price; ?>" placeholder="<?php echo $entry_designs_parameter_price; ?>" class="form-control" />
				</div>
			</div>
			
			<div class="form-group">
				<label class="col-sm-3 control-label"><?php echo $entry_designs_parameter_auto_center; ?></label>
				<div class="col-sm-9 ">
					<?php if ($config_designs_parameter_auto_center){ ?>
						<input type="radio" name="config_designs_parameter_auto_center" value="1" checked="checked" />
						<?php echo $text_yes; ?>
						<input type="radio" name="config_designs_parameter_auto_center" value="0" />
						<?php echo $text_no; ?>
						<?php } else { ?>
						<input type="radio" name="config_designs_parameter_auto_center" value="1" />
						<?php echo $text_yes; ?>
						<input type="radio" name="config_designs_parameter_auto_center" value="0" checked="checked" />
						<?php echo $text_no; ?>
						<?php } ?>
				</div>
			</div>
			
			<div class="form-group">
				<label class="col-sm-3 control-label"><?php echo $entry_designs_parameter_draggable; ?></label>
				<div class="col-sm-9">
					<?php if($config_designs_parameter_draggable){ ?>
						<input type="radio" name="config_designs_parameter_draggable" value="1" checked="checked" />
						<?php echo $text_yes; ?>
						<input type="radio" name="config_designs_parameter_draggable" value="0" />
						<?php echo $text_no; ?>
						<?php } else { ?>
						<input type="radio" name="config_designs_parameter_draggable" value="1" />
						<?php echo $text_yes; ?>
						<input type="radio" name="config_designs_parameter_draggable" value="0" checked="checked" />
						<?php echo $text_no; ?>
						<?php } ?>
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-3 control-label"><?php echo $entry_designs_parameter_rotatable; ?></label>
				<div class="col-sm-9">
					<?php if($config_designs_parameter_rotatable){ ?>
						<input type="radio" name="config_designs_parameter_rotatable" value="1" checked="checked" />
						<?php echo $text_yes; ?>
						<input type="radio" name="config_designs_parameter_rotatable" value="0" />
						<?php echo $text_no; ?>
						<?php } else { ?>
						<input type="radio" name="config_designs_parameter_rotatable" value="1" />
						<?php echo $text_yes; ?>
						<input type="radio" name="config_designs_parameter_rotatable" value="0" checked="checked" />
						<?php echo $text_no; ?>
						<?php } ?>
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-3 control-label"><?php echo $entry_designs_parameter_resizable; ?></label>
				<div class="col-sm-9">
					<?php if($config_designs_parameter_resizable){ ?>
						<input type="radio" name="config_designs_parameter_resizable" value="1" checked="checked" />
						<?php echo $text_yes; ?>
						<input type="radio" name="config_designs_parameter_resizable" value="0" />
						<?php echo $text_no; ?>
						<?php } else { ?>
						<input type="radio" name="config_designs_parameter_resizable" value="1" />
						<?php echo $text_yes; ?>
						<input type="radio" name="config_designs_parameter_resizable" value="0" checked="checked" />
						<?php echo $text_no; ?>
						<?php } ?>
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-3 control-label"><?php echo $entry_designs_parameter_zchangeable; ?></label>
				<div class="col-sm-9">
					<?php if($config_designs_parameter_zchangeable){ ?>
						<input type="radio" name="config_designs_parameter_zchangeable" value="1" checked="checked" />
						<?php echo $text_yes; ?>
						<input type="radio" name="config_designs_parameter_zchangeable" value="0" />
						<?php echo $text_no; ?>
						<?php } else { ?>
						<input type="radio" name="config_designs_parameter_zchangeable" value="1" />
						<?php echo $text_yes; ?>
						<input type="radio" name="config_designs_parameter_zchangeable" value="0" checked="checked" />
						<?php echo $text_no; ?>
						<?php } ?>
				</div>
			</div>
            <div class="form-group">
                <label class="col-sm-3 control-label"><?php echo $entry_designs_replace; ?><img class="help_tip pull-right" data-toggle="tooltip" title="<?php echo $help_replace;?>" width="16" height="16" src="view/image/help.png"></label>
                <div class="col-sm-2">
                    <input type="text" name="config_designs_parameter_replace" value="<?php echo $config_designs_parameter_replace; ?>" placeholder="<?php echo $entry_designs_replace; ?>" class="form-control" />
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-3 control-label"><?php echo $entry_designs_autoselect; ?></label>
                <div class="col-sm-9">
                    <?php if($config_designs_parameter_autoselect){ ?>
                    <input type="radio" name="config_designs_parameter_autoselect" value="1" checked="checked" />
                    <?php echo $text_yes; ?>
                    <input type="radio" name="config_designs_parameter_autoselect" value="0" />
                    <?php echo $text_no; ?>
                    <?php } else { ?>
                    <input type="radio" name="config_designs_parameter_autoselect" value="1" />
                    <?php echo $text_yes; ?>
                    <input type="radio" name="config_designs_parameter_autoselect" value="0" checked="checked" />
                    <?php echo $text_no; ?>
                    <?php } ?>
                </div>
            </div>
			<div class="form-group">
            <label class="col-sm-3 control-label"><?php echo $entry_designs_parameter_stay_top; ?></label>
			<div class="col-sm-9">
				<?php if($config_designs_topped){ ?>
					<input type="radio" name="config_designs_topped" value="1" checked="checked" />
					<?php echo $text_yes; ?>
					<input type="radio" name="config_designs_topped" value="0" />
					<?php echo $text_no; ?>
					<?php } else { ?>
					<input type="radio" name="config_designs_topped" value="1" />
					<?php echo $text_yes; ?>
					<input type="radio" name="config_designs_topped" value="0" checked="checked" />
					<?php echo $text_no; ?>
					<?php } ?>
			</div>
		</div>
            <div class="form-group">
                <label class="col-sm-3 control-label"><?php echo $entry_designs_bounding_box; ?></label>
                <div class="col-sm-9">
                    <?php if($config_designs_parameter_bounding_box){ ?>
                    <input type="radio" name="config_designs_parameter_bounding_box" value="1" checked="checked" />
                    <?php echo $text_yes; ?>
                    <input type="radio" name="config_designs_parameter_bounding_box" value="0" />
                    <?php echo $text_no; ?>
                    <?php } else { ?>
                    <input type="radio" name="config_designs_parameter_bounding_box" value="1" />
                    <?php echo $text_yes; ?>
                    <input type="radio" name="config_designs_parameter_bounding_box" value="0" checked="checked" />
                    <?php echo $text_no; ?>
                    <?php } ?>
                </div>
            </div>
                <div class="form-group hide target-bb">
                    <label class="col-sm-3 control-label"><?php echo $entry_bounding_box_target; ?> <img class="help_tip pull-right" data-toggle="tooltip" title="<?php echo $help_bounding_box_target;?>" width="16" height="16" src="view/image/help.png"></label>
                    <div class="col-sm-3">
                        <input type="text" name="config_designs_bounding_box_target" value="<?php echo $config_bounding_box_target; ?>" class="form-control" />
                    </div>
                </div>
                <div class="form-group custom-bb">
                    <label class="col-sm-3 control-label"><?php echo $entry_bounding_box_x; ?></label>
                    <div class="col-sm-3">
                        <input type="number" name="config_designs_bounding_box_x" value="<?php echo $config_bounding_box_x; ?>" placeholder="0" class="form-control" />
                    </div>
                </div>
                <div class="form-group custom-bb">
                    <label class="col-sm-3 control-label"><?php echo $entry_bounding_box_y; ?></label>
                    <div class="col-sm-3">
                        <input type="number" name="config_designs_bounding_box_y" value="<?php echo $config_bounding_box_y; ?>" placeholder="0" class="form-control" />
                    </div>
                </div>
                <div class="form-group custom-bb">
                    <label class="col-sm-3 control-label"><?php echo $entry_bounding_box_width; ?></label>
                    <div class="col-sm-3">
                        <input type="number" name="config_designs_bounding_box_width" value="<?php echo $config_bounding_box_width; ?>" placeholder="0" class="form-control" />
                    </div>
                </div>
                <div class="form-group custom-bb">
                    <label class="col-sm-3 control-label"><?php echo $entry_bounding_box_height; ?></label>
                    <div class="col-sm-3">
                        <input type="number" name="config_designs_bounding_box_height" value="<?php echo $config_bounding_box_height; ?>" placeholder="0" class="form-control" />
                    </div>
                </div>
                <div class="form-group">
				<label class="col-sm-3 control-label"><?php echo $entry_designs_clipping; ?></label>
				<div class="col-sm-9">
					<?php if($config_designs_parameter_clipping){ ?>
						<input type="radio" name="config_designs_parameter_clipping" value="1" checked="checked" />
						<?php echo $text_yes; ?>
						<input type="radio" name="config_designs_parameter_clipping" value="0" />
						<?php echo $text_no; ?>
						<?php } else { ?>
						<input type="radio" name="config_designs_parameter_clipping" value="1" />
						<?php echo $text_yes; ?>
						<input type="radio" name="config_designs_parameter_clipping" value="0" checked="checked" />
						<?php echo $text_no; ?>
						<?php } ?>
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-3 control-label"><?php echo $entry_filters; ?></label>
				<div class="col-sm-9">
					<?php if($filters){ ?>
						<?php foreach($filters as $key => $value){?>
							<?php if(in_array($key, $config_designs_filters) ){?>
								<input type="checkbox" checked="checked" name="config_designs_filters[]" value="<?php echo $key;?>" id="<?php echo $key;?>" />  
							<?php } else {?>
								<input type="checkbox" name="config_designs_filters[]" value="<?php echo $key;?>" id="<?php echo $key;?>" /> 
							<?php }?>
							<label for="<?php echo $key;?>" class="control-label"><?php echo $value; ?></label>
						<?php }?>
					<?php } ?>
				</div>
			</div>
            <!--Custom Image Options-->
            <legend><?php echo $text_custom_image_options;?></legend>
            <h4><?php echo $text_custom_image_help; ?></h4>
			<div class="form-group">
            <label class="col-sm-3 control-label"><?php echo $entry_min_width; ?> <img class="help_tip pull-right" data-toggle="tooltip" title="<?php echo $help_min_width;?>" width="16" height="16" src="view/image/help.png"></label>
			<div class="col-sm-3">
				<input type="number" name="config_designs_min_width" value="<?php echo $config_min_width; ?>" placeholder="100" class="form-control"  />
			</div>
			</div>
			<div class="form-group">
            <label class="col-sm-3 control-label"><?php echo $entry_min_height; ?><img class="help_tip pull-right" data-toggle="tooltip" title="<?php echo $help_min_height;?>" width="16" height="16" src="view/image/help.png"></label>
			<div class="col-sm-3">
				<input type="number" name="config_designs_min_height" value="<?php echo $config_min_height; ?>" placeholder="100" class="form-control"  />
			</div>
			</div>
			<div class="form-group">
            <label class="col-sm-3 control-label"><?php echo $entry_max_width; ?><img class="help_tip pull-right" data-toggle="tooltip" title="<?php echo $help_max_width;?>" width="16" height="16" src="view/image/help.png"></label>
			<div class="col-sm-3">
				<input type="number" name="config_designs_max_width" value="<?php echo $config_max_width; ?>" placeholder="1000" class="form-control"  />
			</div>
			</div>
			<div class="form-group">
            <label class="col-sm-3 control-label"><?php echo $entry_max_height; ?> <img class="help_tip pull-right" data-toggle="tooltip" title="<?php echo $help_max_height;?>" width="16" height="16" src="view/image/help.png"></label>
			<div class="col-sm-3">
				<input type="number" name="config_designs_max_height" value="<?php echo $config_max_height; ?>" placeholder="1000" class="form-control"  />
			</div>
			</div>
			<div class="form-group">
            <label class="col-sm-3 control-label"><?php echo $entry_resize_width; ?> <img class="help_tip pull-right" data-toggle="tooltip" title="<?php echo $help_resize_width;?>" width="16" height="16" src="view/image/help.png"></label>
			<div class="col-sm-3">
				<input type="number" name="config_designs_resize_width" value="<?php echo $config_resize_width; ?>" placeholder="300" class="form-control"  />
			</div>
			</div>
			<div class="form-group">
            <label class="col-sm-3 control-label"><?php echo $entry_resize_height; ?> <img class="help_tip pull-right" data-toggle="tooltip" title="<?php echo $help_resize_height;?>" width="16" height="16" src="view/image/help.png"></label>
			<div class="col-sm-3">
				<input type="number" name="config_designs_resize_height" value="<?php echo $config_resize_height; ?>" placeholder="300" class="form-control"  />
			</div>
			</div>
            <!--Custom Text Options-->
            <legend><?php echo $text_custom_text;?></legend>
            <h4><?php echo $text_custom_text_help; ?></h4>
            <div class="form-group">
                <label class="col-sm-3 control-label"><?php echo $entry_text_x_position; ?><img class="help_tip pull-right" data-toggle="tooltip" title="<?php echo $help_position_x_text;?>" width="16" height="16" src="view/image/help.png"></label>
                <div class="col-sm-3">
                    <input type="number" name="config_designs_text_x_position" value="<?php echo $config_text_x_position; ?>" placeholder="0" class="form-control" />
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-3 control-label"><?php echo $entry_designs_parameter_y; ?><img class="help_tip pull-right" data-toggle="tooltip" title="<?php echo $help_position_y_text;?>" width="16" height="16" src="view/image/help.png"></label>
                <div class="col-sm-3">
                    <input type="number" name="config_designs_text_y_position" value="<?php echo $config_text_y_position; ?>" placeholder="0" class="form-control" />
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-3 control-label"><?php echo $entry_designs_parameter_z; ?><img class="help_tip pull-right" data-toggle="tooltip" title="<?php echo $help_designs_parameter_z;?>" width="16" height="16" src="view/image/help.png"></label>
                <div class="col-sm-3">
                    <input type="number" name="config_designs_text_z_position" value="<?php echo $config_text_z_position; ?>" placeholder="-1" class="form-control" />
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-3 control-label"><?php echo $entry_designs_parameter_colors; ?><img class="help_tip pull-right" data-toggle="tooltip" title="<?php echo $help_hex_color;?>" width="16" height="16" src="view/image/help.png"></label>
                <div class="col-sm-3">
                    <input type="text" name="config_designs_text_design_color" value="<?php echo (isset($config_text_design_color) && $config_text_design_color) ? $config_text_design_color : '';?>" placeholder="#000000" class="form-control" />
                </div>
            </div>

            <div class="form-group">
                <label class="col-sm-3 control-label"><?php echo $entry_designs_parameter_price; ?><img class="help_tip pull-right" data-toggle="tooltip" title="<?php echo $help_designs_parameter_price;?>" width="16" height="16" src="view/image/help.png"></label>
                <div class="col-sm-3">
                    <input type="number" name="config_designs_text_design_price" value="<?php echo $config_text_design_price; ?>" placeholder="<?php echo $entry_designs_parameter_price; ?>" class="form-control" />
                </div>
            </div>

            <div class="form-group">
                <label class="col-sm-3 control-label"><?php echo $entry_designs_parameter_auto_center; ?></label>
                <div class="col-sm-9">
                    <?php if($config_text_auto_center){ ?>
                    <input type="radio" name="config_designs_text_auto_center" value="1" checked="checked" />
                    <?php echo $text_yes; ?>
                    <input type="radio" name="config_designs_text_auto_center" value="0" />
                    <?php echo $text_no; ?>
                    <?php } else { ?>
                    <input type="radio" name="config_designs_text_auto_center" value="1" />
                    <?php echo $text_yes; ?>
                    <input type="radio" name="config_designs_text_auto_center" value="0" checked="checked" />
                    <?php echo $text_no; ?>
                    <?php } ?>
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-3 control-label"><?php echo $entry_designs_parameter_draggable; ?></label>
                <div class="col-sm-9">
                    <?php if($config_text_draggable){ ?>
                    <input type="radio" name="config_designs_text_draggable" value="1" checked="checked" />
                    <?php echo $text_yes; ?>
                    <input type="radio" name="config_designs_text_draggable" value="0" />
                    <?php echo $text_no; ?>
                    <?php } else { ?>
                    <input type="radio" name="config_designs_text_draggable" value="1" />
                    <?php echo $text_yes; ?>
                    <input type="radio" name="config_designs_text_draggable" value="0" checked="checked" />
                    <?php echo $text_no; ?>
                    <?php } ?>
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-3 control-label"><?php echo $entry_designs_parameter_rotatable; ?></label>
                <div class="col-sm-9">
                    <?php if($config_text_rotatable){ ?>
                    <input type="radio" name="config_designs_text_rotatable" value="1" checked="checked" />
                    <?php echo $text_yes; ?>
                    <input type="radio" name="config_designs_text_rotatable" value="0" />
                    <?php echo $text_no; ?>
                    <?php } else { ?>
                    <input type="radio" name="config_designs_text_rotatable" value="1" />
                    <?php echo $text_yes; ?>
                    <input type="radio" name="config_designs_text_rotatable" value="0" checked="checked" />
                    <?php echo $text_no; ?>
                    <?php } ?>
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-3 control-label"><?php echo $entry_designs_parameter_resizable; ?></label>
                <div class="col-sm-9">
                    <?php if($config_text_resizeable){ ?>
                    <input type="radio" name="config_designs_text_resizeable" value="1" checked="checked" />
                    <?php echo $text_yes; ?>
                    <input type="radio" name="config_designs_text_resizeable" value="0" />
                    <?php echo $text_no; ?>
                    <?php } else { ?>
                    <input type="radio" name="config_designs_text_resizeable" value="1" />
                    <?php echo $text_yes; ?>
                    <input type="radio" name="config_designs_text_resizeable" value="0" checked="checked" />
                    <?php echo $text_no; ?>
                    <?php } ?>
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-3 control-label"><?php echo $entry_designs_parameter_zchangeable; ?></label>
                <div class="col-sm-9">
                    <?php if($config_text_zchangeable){ ?>
                    <input type="radio" name="config_designs_text_zchangeable" value="1" checked="checked" />
                    <?php echo $text_yes; ?>
                    <input type="radio" name="config_designs_text_zchangeable" value="0" />
                    <?php echo $text_no; ?>
                    <?php } else { ?>
                    <input type="radio" name="config_designs_text_zchangeable" value="1" />
                    <?php echo $text_yes; ?>
                    <input type="radio" name="config_designs_text_zchangeable" value="0" checked="checked" />
                    <?php echo $text_no; ?>
                    <?php } ?>
                </div>
            </div>
                <div class="form-group">
                    <label class="col-sm-3 control-label"><?php echo $entry_designs_replace; ?><img class="help_tip pull-right" data-toggle="tooltip" title="<?php echo $help_replace;?>" width="16" height="16" src="view/image/help.png"></label>
                    <div class="col-sm-2">
                        <input type="text" name="config_designs_text_replace" value="<?php echo $config_text_replace; ?>" placeholder="<?php echo $entry_designs_replace; ?>" class="form-control" />
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-3 control-label"><?php echo $entry_designs_autoselect; ?></label>
                    <div class="col-sm-9">
                        <?php if($config_designs_text_autoselect){ ?>
                        <input type="radio" name="config_designs_text_autoselect" value="1" checked="checked" />
                        <?php echo $text_yes; ?>
                        <input type="radio" name="config_designs_text_autoselect" value="0" />
                        <?php echo $text_no; ?>
                        <?php } else { ?>
                        <input type="radio" name="config_designs_text_autoselect" value="1" />
                        <?php echo $text_yes; ?>
                        <input type="radio" name="config_designs_text_autoselect" value="0" checked="checked" />
                        <?php echo $text_no; ?>
                        <?php } ?>
                    </div>
                </div>
            <div class="form-group">
                <label class="col-sm-3 control-label"><?php echo $entry_designs_parameter_stay_top; ?></label>
                <div class="col-sm-9">
                    <?php if($config_text_topped){ ?>
                    <input type="radio" name="config_designs_text_topped" value="1" checked="checked" />
                    <?php echo $text_yes; ?>
                    <input type="radio" name="config_designs_text_topped" value="0" />
                    <?php echo $text_no; ?>
                    <?php } else { ?>
                    <input type="radio" name="config_designs_text_topped" value="1" />
                    <?php echo $text_yes; ?>
                    <input type="radio" name="config_designs_text_topped" value="0" checked="checked" />
                    <?php echo $text_no; ?>
                    <?php } ?>
                </div>
            </div>
                <div class="form-group">
                    <label class="col-sm-3 control-label"><?php echo $entry_text_patternable; ?><img class="help_tip pull-right" data-toggle="tooltip" title="<?php echo $help_text_patternable;?>" width="16" height="16" src="view/image/help.png"></label>
                    <div class="col-sm-9">
                        <?php if($config_text_patternable){ ?>
                        <input type="radio" name="config_designs_text_patternable" value="1" checked="checked" />
                        <?php echo $text_yes; ?>
                        <input type="radio" name="config_designs_text_patternable" value="0" />
                        <?php echo $text_no; ?>
                        <?php } else { ?>
                        <input type="radio" name="config_designs_text_patternable" value="1" />
                        <?php echo $text_yes; ?>
                        <input type="radio" name="config_designs_text_patternable" value="0" checked="checked" />
                        <?php echo $text_no; ?>
                        <?php } ?>
                       <a href="" id="thumb-image" data-toggle="image" class="img-thumbnail"><img src="<?php echo $placeholder; ?>" alt="" title="" data-placeholder="<?php echo $placeholder; ?>" /></a>
                    </div>

                </div>
                <div class="form-group">
                    <label class="col-sm-3 control-label"><?php echo $entry_text_curved; ?><img class="help_tip pull-right" data-toggle="tooltip" title="<?php echo $help_text_curved;?>" width="16" height="16" src="view/image/help.png"></label>
                    <div class="col-sm-9">
                        <?php if($config_text_curved){ ?>
                        <input type="radio" name="config_designs_text_curved" value="1" checked="checked" />
                        <?php echo $text_yes; ?>
                        <input type="radio" name="config_designs_text_curved" value="0" />
                        <?php echo $text_no; ?>
                        <?php } else { ?>
                        <input type="radio" name="config_designs_text_curved" value="1" />
                        <?php echo $text_yes; ?>
                        <input type="radio" name="config_designs_text_curved" value="0" checked="checked" />
                        <?php echo $text_no; ?>
                        <?php } ?>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-3 control-label"><?php echo $entry_curved_spacing; ?></label>
                    <div class="col-sm-3">
                        <input type="text" name="config_designs_curved_spacing" value="<?php echo $config_curved_spacing; ?>" placeholder="<?php echo $entry_curved_spacing; ?>" class="form-control" />
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-3 control-label"><?php echo $entry_curve_radius; ?></label>
                    <div class="col-sm-3">
                        <input type="text" name="config_designs_curve_radius" value="<?php echo $config_curve_radius; ?>" placeholder="<?php echo $entry_curve_radius; ?>" class="form-control" />
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-3 control-label"><?php echo $entry_text_curve_reverse; ?></label>
                    <div class="col-sm-9">
                        <?php if($config_curve_reverse){ ?>
                        <input type="radio" name="" value="1" checked="checked" />
                        <?php echo $text_yes; ?>
                        <input type="radio" name="config_designs_curve_reverse" value="0" />
                        <?php echo $text_no; ?>
                        <?php } else { ?>
                        <input type="radio" name="config_designs_curve_reverse" value="1" />
                        <?php echo $text_yes; ?>
                        <input type="radio" name="config_designs_curve_reverse" value="0" checked="checked" />
                        <?php echo $text_no; ?>
                        <?php } ?>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-3 control-label"><?php echo $entry_designs_bounding_box; ?></label>
                    <div class="col-sm-9">
                        <?php if($config_designs_text_bounding_box){ ?>
                        <input type="radio" name="config_designs_text_bounding_box" value="1" checked="checked" />
                        <?php echo $text_yes; ?>
                        <input type="radio" name="config_designs_text_bounding_box" value="0" />
                        <?php echo $text_no; ?>
                        <?php } else { ?>
                        <input type="radio" name="config_designs_text_bounding_box" value="1" />
                        <?php echo $text_yes; ?>
                        <input type="radio" name="config_designs_text_bounding_box" value="0" checked="checked" />
                        <?php echo $text_no; ?>
                        <?php } ?>
                    </div>
                </div>
                <div class="form-group hide target-text">
                    <label class="col-sm-3 control-label"><?php echo $entry_bounding_box_target; ?> <img class="help_tip pull-right" data-toggle="tooltip" title="<?php echo $help_bounding_box_target;?>" width="16" height="16" src="view/image/help.png"></label>
                    <div class="col-sm-3">
                        <input type="text" name="config_designs_text_bounding_box_target" value="<?php echo $config_text_bounding_box_target; ?>" class="form-control" />
                    </div>
                </div>
                <div class="form-group custom-text">
                    <label class="col-sm-3 control-label"><?php echo $entry_text_bounding_x_position; ?></label>
                    <div class="col-sm-3">
                        <input type="number" name="config_designs_text_bounding_x_position" value="<?php echo $config_text_bounding_x_position; ?>" placeholder="0" class="form-control" />
                    </div>
                </div>
                <div class="form-group custom-text">
                    <label class="col-sm-3 control-label"><?php echo $entry_bounding_box_y; ?></label>
                    <div class="col-sm-3">
                        <input type="number" name="config_designs_text_bounding_y_position" value="<?php echo $config_text_bounding_y_position; ?>" placeholder="0" class="form-control" />
                    </div>
                </div>
                <div class="form-group custom-text">
                    <label class="col-sm-3 control-label"><?php echo $entry_bounding_box_width; ?></label>
                    <div class="col-sm-3">
                        <input type="number" name="config_designs_text_bounding_width" value="<?php echo $config_text_bounding_width; ?>" placeholder="0" class="form-control" />
                    </div>
                </div>
                <div class="form-group custom-text">
                    <label class="col-sm-3 control-label"><?php echo $entry_bounding_box_height; ?></label>
                    <div class="col-sm-3">
                        <input type="number" name="config_designs_text_bounding_height" value="<?php echo $config_text_bounding_height; ?>" placeholder="0" class="form-control" />
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-3 control-label"><?php echo $entry_designs_clipping; ?></label>
                    <div class="col-sm-9">
                        <?php if($config_designs_text_clipping){ ?>
                        <input type="radio" name="config_designs_text_clipping" value="1" checked="checked" />
                        <?php echo $text_yes; ?>
                        <input type="radio" name="config_designs_text_clipping" value="0" />
                        <?php echo $text_no; ?>
                        <?php } else { ?>
                        <input type="radio" name="config_designs_text_clipping" value="1" />
                        <?php echo $text_yes; ?>
                        <input type="radio" name="config_designs_text_clipping" value="0" checked="checked" />
                        <?php echo $text_no; ?>
                        <?php } ?>
                    </div>
                </div>
            <div class="form-group">
                <label class="col-sm-3 control-label"><?php echo $entry_default_text_size; ?>: <img class="help_tip" data-toggle="tooltip" title="<?php echo $help_default_text_size;?>" width="16" height="16" src="view/image/help.png"></label>
                <div class="col-sm-3">
                    <input type="number" name="config_designs_default_text_size" value="<?php echo $config_default_text_size; ?>" placeholder="<?php echo $entry_default_text_size; ?>" class="form-control" />
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-3 control-label"><?php echo $entry_config_text_default; ?>: <img class="help_tip" data-toggle="tooltip" title="<?php echo $help_default_text;?>" width="16" height="16" src="view/image/help.png"></label>
                <div class="col-sm-3">
                    <input type="text" name="config_designs_text_default" value="<?php echo $config_text_default; ?>" placeholder="<?php echo $entry_config_text_default; ?>" class="form-control" />
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-3 control-label"><?php echo $entry_text_characters; ?><img class="help_tip pull-right" data-toggle="tooltip" title="<?php echo $help_text_characters;?>" width="16" height="16" src="view/image/help.png"></label>
                <div class="col-sm-3">
                    <input type="number" name="config_designs_text_text_characters" value="<?php echo $config_text_text_characters; ?>" placeholder="<?php echo $entry_text_characters; ?>" class="form-control" />
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-3 control-label"><?php echo $entry_texts_parameter_textalign; ?></label>
                <div class="col-sm-6">
                    <select class="form-control" name="config_designs_custom_texts_parameter_textalign">
                        <?php foreach($aligns as $key => $value) { ?>
                        <?php if ($key == $config_custom_texts_parameter_textalign) { ?>
                        <option value="<?php echo $key; ?>" selected="selected"><?php echo $value; ?></option>
                        <?php } else { ?>
                        <option value="<?php echo $key; ?>"><?php echo $value; ?></option>
                        <?php } ?>
                        <?php } ?>
                    </select>
                </div>
            </div>
			 </fieldset>
			</div>

        <div id="color-config" class="tab-pane">
            <h3>Set own prices for your hexadecimal colors.</h3>
            <div class="form-group">
                <label class="col-sm-3 control-label"><?php echo $entry_enable_text_color_prices; ?><img class="help_tip" data-toggle="tooltip" title="Use the color prices for all text elements." width="16" height="16" src="view/image/help.png"></label>
                <div class="col-sm-3">
                    <?php if($config_enable_text_color_prices){ ?>
                    <input type="checkbox" name="config_designs_enable_text_color_prices" checked="checked" />
                    <?php } else { ?>
                    <input type="checkbox" name="config_designs_enable_text_color_prices" />
                    <?php }?>
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-3 control-label"><?php echo $entry_enable_image_color_prices; ?><img class="help_tip" data-toggle="tooltip" title="Use the color prices for all image elements." width="16" height="16" src="view/image/help.png"></label>
                <div class="col-sm-3">
                    <?php if($config_enable_image_color_prices){ ?>
                    <input type="checkbox" name="config_designs_enable_image_color_prices" checked="checked" />
                    <?php } else { ?>
                    <input type="checkbox" name="config_designs_enable_image_color_prices" />
                    <?php }?>
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-3 control-label"><?php echo $text_color_prices; ?> <img class="help_tip" data-toggle="tooltip" title="You can set different prices based on the selected color. This works only for color palette, so if you define a range of allowed colors for an element." width="16" height="16" src="view/image/help.png"></label>
				<div class="col-sm-8" id="fpd_color_prices">
				<table>
					<thead>
						<tr>
							<th><?php echo $text_hexa_color; ?><span class="radykal-values-group-prefix">( # )</span></th>
							<th>Price</th>
							<th></th>
							</tr>
						<tr>
							<td>
								<span style="display:none" class="radykal-values-group-prefix">#</span><input class="form-control" type="text" data-regex="^[0-9a-f]{6}$" id="radykal-values-group-input--hex_key">
							</td>
							<td>
								<span class="radykal-values-group-prefix"></span>
								<input class="form-control" type="text" data-regex="^\d+(\.\d{1,2})?$" id="radykal-values-group-input--price">
							</td>
							<td>
								<a id="radykal-values-group-add--fpd_color_prices" class="radykal-values-group-add btn btn-primary" href="#">Add</a>
							</td>
						</tr>
					</thead>
					<tbody>
					</tbody>
				</table>
				<input value="<?php echo $config_designs_color_prices;?>" name="config_designs_color_prices" class="radykal-option-value" type="hidden">		
			</div>				
			</div>
		</div>
		</div>
      </form>
	 </div>
   </div>
  </div>
</div>
<script type="text/javascript"><!--
//bounding box image switcher
    $('input[name=\'config_designs_parameter_bounding_box\']').change(function() {
        if (this.checked && this.value == 1) {
            $('#form-featured .active').find('.custom-bb').hide();
            $('#form-featured .active').find('.target-bb').removeClass('hide');
        }
        if (this.checked && this.value == 0) {
            $('#form-featured .active').find('.custom-bb').show();
            $('#form-featured .active').find('.target-bb').addClass('hide');
        }
    });
//bounding box text switcher
    $('input[name=\'config_designs_text_bounding_box\']').change(function() {
        if (this.checked && this.value == 1) {
            $('#form-featured .active').find('.custom-text').hide();
            $('#form-featured .active').find('.target-text').removeClass('hide');
        }
        if (this.checked && this.value == 0) {
            $('#form-featured .active').find('.custom-text').show();
            $('#form-featured .active').find('.target-text').addClass('hide');
        }
    });
//--></script>
<?php echo $footer; ?>