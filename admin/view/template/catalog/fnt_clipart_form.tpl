<?php echo $header; ?><?php echo $column_left; ?>
<div id="content"> 
    <div class="page-header">
		<div class="container-fluid">
			<div class="pull-right">
				<button type="submit" form="form-product" data-toggle="tooltip" title="<?php echo $button_save; ?>" class="btn btn-primary"><i class="fa fa-save"></i></button>
				<a href="<?php echo $cancel; ?>" data-toggle="tooltip" title="<?php echo $button_cancel; ?>" class="btn btn-default"><i class="fa fa-reply"></i></a>
			</div>
			<h1> <?php echo $heading_title; ?></h1>
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
	<div class="panel panel-default">
		<div class="panel-heading">
			<h3 class="panel-title"><i class="fa fa-pencil"></i> <?php echo $text_form; ?></h3>
		</div>
    <div class="panel-body">
      <form action="<?php echo $action; ?>" method="post" enctype="multipart/form-data" id="form-product" class="form-horizontal">
       
        <div class="tab-content">
		<ul class="nav nav-tabs" style="margin-bottom:20px">
		<li class="active" ><a href="#general" data-toggle="tab"><?php echo $clipart;?></a></li>
		<li><a href="#setting" data-toggle="tab"><?php echo $setting;?></a></li>
		</ul>
		<div id="general" class="tab-pane active">
            <div class="form-group required">
              <label class="col-sm-2 control-label" for="input-name"><?php echo $entry_name; ?></label>
              <div class="col-sm-10">
                <input type="text" name="name" value="<?php echo $name; ?>" placeholder="<?php echo $entry_name; ?>" id="input-name" class="form-control" />
                <?php if ($error_name) { ?>
                <div class="text-danger"><?php echo $error_name; ?></div>
                <?php } ?>
              </div>
            </div>
			<div class="form-group">
			  <label class="col-sm-2 control-label" for="input-image"><?php echo $entry_image; ?></label>
              <div class="col-sm-10">
                  <input type="hidden" name="image" value="<?php echo $image; ?>" id="input-image" />
				   <a href="" id="thumb-image" data-toggle="image" class="img-thumbnail"><img src="<?php echo $thumb; ?>" alt="" title="" data-placeholder="<?php echo $placeholder; ?>" /></a>
              </div>
			</div> 
			 <div class="form-group">
              <label class="col-sm-2 control-label" for="input-category"><?php echo $entry_category; ?></label>
              <div class="col-sm-10">
                <input type="text" name="category" value="" placeholder="<?php echo $entry_category; ?>" id="input-category" class="form-control" />
                <span class="help-block"><?php echo $help_category; ?></span>
                <div id="clipart-category" class="well well-sm" style="height: 150px; overflow: auto;">
                  <?php foreach ($clipart_categories as $clipart_category) { ?>
                  <div id="clipart-category<?php echo $clipart_category['category_clipart_id']; ?>"><i class="fa fa-minus-circle"></i> <?php echo $clipart_category['name']; ?>
                    <input type="hidden" name="clipart_category[]" value="<?php echo $clipart_category['category_clipart_id']; ?>" />
                  </div>
                  <?php } ?>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label" for="input-status"><?php echo $entry_status; ?></label>
              <div class="col-sm-10">
                <select name="status" id="input-status" class="form-control">
                  <?php if ($status) { ?>
                  <option value="1" selected="selected"><?php echo $text_enabled; ?></option>
                  <option value="0"><?php echo $text_disabled; ?></option>
                  <?php } else { ?>
                  <option value="1"><?php echo $text_enabled; ?></option>
                  <option value="0" selected="selected"><?php echo $text_disabled; ?></option>
                  <?php } ?>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label" for="input-sort-order"><?php echo $entry_sort_order; ?></label>
              <div class="col-sm-10">
                <input type="text" name="sort_order" value="<?php echo $sort_order; ?>" placeholder="<?php echo $entry_sort_order; ?>" id="input-sort-order" class="form-control" />
              </div>
            </div>
        </div>
		<div id="setting" class="tab-pane">
			<div class="form-group">
				<label class="col-sm-3 control-label">
					<?php echo $text_check;?>
				</label>
				<div class="col-sm-2">
					<?php if(!empty($parameter['status'])) { ?>
						<input name="parameter[status]" type="checkbox" value="1" checked > 
					<?php } else { ?>
						<input name="parameter[status]" type="checkbox" value="1" >
					<?php } ?>
				</div>	
			</div>
			<div class="form-group">
				<label class="col-sm-3 control-label"><?php echo $entry_clipart_parameter_x; ?>:</label>
				<div class="col-sm-2">
					<input type="text" name="parameter[x]" value="<?php echo $parameter['x']; ?>" placeholder="<?php echo $entry_clipart_parameter_x; ?>" class="form-control" />
				</div>
			</div>
			<div class="form-group">
            <label class="col-sm-3 control-label"><?php echo $entry_clipart_parameter_y; ?>:</label>
			<div class="col-sm-2">
				<input type="text" name="parameter[y]" value="<?php echo $parameter['y']; ?>" placeholder="<?php echo $entry_clipart_parameter_y; ?>" class="form-control" />
			</div>
			</div>
			<div class="form-group">
            <label class="col-sm-3 control-label"><?php echo $entry_clipart_parameter_z; ?>:</label>
			<div class="col-sm-2">
				<input type="text" name="parameter[z]" value="<?php echo $parameter['z']; ?>" placeholder="<?php echo $entry_clipart_parameter_z; ?>" class="form-control" />
			</div>
			</div>
			<div class="form-group">
				<label class="col-sm-3 control-label"><?php echo $entry_designs_parameter_scale; ?>:</label>
				<div class="col-sm-2">
					<input type="text" name="parameter[scale]" value="<?php echo $parameter['scale']; ?>" placeholder="<?php echo $entry_designs_parameter_scale; ?>" class="form-control" />
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-3 control-label"><?php echo $entry_clipart_parameter_colors; ?>:</label>
				<div class="col-sm-2">
					<input type="text" name="parameter[colors]" value="<?php echo $parameter['colors']; ?>" placeholder="<?php echo $entry_clipart_parameter_colors; ?>" class="form-control" />
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-3 control-label"><?php echo $entry_clipart_parameter_price; ?>:</label>
				<div class="col-sm-1">
					<input type="text" name="parameter[price]" value="<?php echo $parameter['price']; ?>" placeholder="<?php echo $entry_clipart_parameter_price; ?>" class="form-control" />
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-3 control-label"><?php echo $entry_clipart_parameter_zChangeable; ?>:</label>
				<div class="col-sm-9 ">
					<?php if($parameter['zChangeable']){?>
						<input type="radio" name="parameter[zChangeable]" value="1" checked="checked" />
						<?php echo $text_yes; ?>
						<input type="radio" name="parameter[zChangeable]" value="0" />
						<?php echo $text_no; ?>
						<?php } else { ?>
						<input type="radio" name="parameter[zChangeable]" value="1" />
						<?php echo $text_yes; ?>
						<input type="radio" name="parameter[zChangeable]" value="0" checked="checked" />
						<?php echo $text_no; ?>
						<?php } ?>						
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-3 control-label"><?php echo $entry_clipart_parameter_removable; ?>:</label>
				<div class="col-sm-9 ">
					<?php if($parameter['removable']){?>
						<input type="radio" name="parameter[removable]" value="1" checked="checked" />
						<?php echo $text_yes; ?>
						<input type="radio" name="parameter[removable]" value="0" />
						<?php echo $text_no; ?>
						<?php } else { ?>
						<input type="radio" name="parameter[removable]" value="1" />
						<?php echo $text_yes; ?>
						<input type="radio" name="parameter[removable]" value="0" checked="checked" />
						<?php echo $text_no; ?>
						<?php } ?>						
				</div>
			</div><div class="form-group">
				<label class="col-sm-3 control-label"><?php echo $entry_clipart_parameter_auto_center; ?>:</label>
				<div class="col-sm-9 ">
					<?php if($parameter['auto_center']){?>
						<input type="radio" name="parameter[auto_center]" value="1" checked="checked" />
						<?php echo $text_yes; ?>
						<input type="radio" name="parameter[auto_center]" value="0" />
						<?php echo $text_no; ?>
						<?php } else { ?>
						<input type="radio" name="parameter[auto_center]" value="1" />
						<?php echo $text_yes; ?>
						<input type="radio" name="parameter[auto_center]" value="0" checked="checked" />
						<?php echo $text_no; ?>
						<?php } ?>						
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-3 control-label"><?php echo $entry_clipart_parameter_draggable; ?>:</label>
				<div class="col-sm-9 ">
					<?php if($parameter['draggable']){?>
						<input type="radio" name="parameter[draggable]" value="1" checked="checked" />
						<?php echo $text_yes; ?>
						<input type="radio" name="parameter[draggable]" value="0" />
						<?php echo $text_no; ?>
						<?php } else { ?>
						<input type="radio" name="parameter[draggable]" value="1" />
						<?php echo $text_yes; ?>
						<input type="radio" name="parameter[draggable]" value="0" checked="checked" />
						<?php echo $text_no; ?>
						<?php } ?>						
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-3 control-label"><?php echo $entry_clipart_parameter_rotatable; ?>:</label>
				<div class="col-sm-9 ">
					<?php if($parameter['rotatable']){?>
						<input type="radio" name="parameter[rotatable]" value="1" checked="checked" />
						<?php echo $text_yes; ?>
						<input type="radio" name="parameter[rotatable]" value="0" />
						<?php echo $text_no; ?>
						<?php } else { ?>
						<input type="radio" name="parameter[rotatable]" value="1" />
						<?php echo $text_yes; ?>
						<input type="radio" name="parameter[rotatable]" value="0" checked="checked" />
						<?php echo $text_no; ?>
						<?php } ?>						
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-3 control-label"><?php echo $entry_clipart_parameter_resizable; ?>:</label>
				<div class="col-sm-9 ">
					<?php if($parameter['resizable']){?>
						<input type="radio" name="parameter[resizable]" value="1" checked="checked" />
						<?php echo $text_yes; ?>
						<input type="radio" name="parameter[resizable]" value="0" />
						<?php echo $text_no; ?>
						<?php } else { ?>
						<input type="radio" name="parameter[resizable]" value="1" />
						<?php echo $text_yes; ?>
						<input type="radio" name="parameter[resizable]" value="0" checked="checked" />
						<?php echo $text_no; ?>
						<?php } ?>						
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-3 control-label"><?php echo $entry_clipart_parameter_replace; ?>:</label>
				<div class="col-sm-3">
					<input type="text" name="parameter[replace]" value="<?php echo $parameter['replace']; ?>" class="form-control" />
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-3 control-label"><?php echo $entry_clipart_parameter_auto_select; ?></label>
				<div class="col-sm-9 ">
					<?php if($parameter['auto_select']){?>
						<input type="radio" name="parameter[auto_select]" value="1" checked="checked" />
						<?php echo $text_yes; ?>
						<input type="radio" name="parameter[auto_select]" value="0" />
						<?php echo $text_no; ?>
						<?php } else { ?>
						<input type="radio" name="parameter[auto_select]" value="1" />
						<?php echo $text_yes; ?>
						<input type="radio" name="parameter[auto_select]" value="0" checked="checked" />
						<?php echo $text_no; ?>
						<?php } ?>						
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-3 control-label"><?php echo $entry_clipart_parameter_stay_to_top; ?>:</label>
				<div class="col-sm-9 ">
					<?php if($parameter['stay_to_top']){?>
						<input type="radio" name="parameter[stay_to_top]" value="1" checked="checked" />
						<?php echo $text_yes; ?>
						<input type="radio" name="parameter[stay_to_top]" value="0" />
						<?php echo $text_no; ?>
					<?php } else { ?>
						<input type="radio" name="parameter[stay_to_top]" value="1" />
						<?php echo $text_yes; ?>
						<input type="radio" name="parameter[stay_to_top]" value="0" checked="checked" />
						<?php echo $text_no; ?>
					<?php } ?>						
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-3 control-label"><?php echo $entry_clipart_parameter_bounding_box_control; ?></label>
				<div class="col-sm-3">
					<select name="parameter[bounding_box_control]" class="form-control">
						<?php if(isset($parameter['bounding_box_control']) && $parameter['bounding_box_control'] == 1){?>
							<option value="0"><?php echo $text_use_option_main_setting; ?></option>
							<option value="1" data-class="custom-bb" selected="selected"><?php echo $text_custom_bounding_box; ?></option>
							<option value="2" data-class="target-bb"><?php echo $text_use_another_element_as_bounding_box; ?></option>
						<?php } elseif(isset($parameter['bounding_box_control']) && $parameter['bounding_box_control'] == 2){?>	
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
				<label class="col-sm-3 control-label"><?php echo $entry_clipart_parameter_bounding_box_x; ?></label>
				<div class="col-sm-3">
					<input type="number" name="parameter[bounding_box_x]" min="0" step="1" value="<?php echo (isset($parameter['bounding_box_x']) && $parameter['bounding_box_x']) ? $parameter['bounding_box_x'] : '';?>" placeholder="0" class="form-control" />
				</div>
			</div>
			<div class="form-group custom-bb">
				<label class="col-sm-3 control-label"><?php echo $entry_clipart_parameter_bounding_box_y; ?></label>
				<div class="col-sm-3">
					<input type="number" name="parameter[bounding_box_y]" min="0" step="1" value="<?php echo (isset($parameter['bounding_box_y']) && $parameter['bounding_box_y']) ? $parameter['bounding_box_y'] : '';?>" placeholder="0" class="form-control" />
				</div>
			</div>
			
			<div class="form-group custom-bb">
				<label class="col-sm-3 control-label"><?php echo $entry_clipart_parameter_bounding_box_width; ?></label>
				<div class="col-sm-3">
					<input type="number" name="parameter[bounding_box_width]" min="0" step="1" value="<?php echo (isset($parameter['bounding_box_width']) && $parameter['bounding_box_width']) ? $parameter['bounding_box_width'] : '';?>" placeholder="0" class="form-control" />
				</div>
			</div>
			
			<div class="form-group custom-bb">
				<label class="col-sm-3 control-label"><?php echo $entry_clipart_parameter_bounding_box_height; ?></label>
				<div class="col-sm-3">
					<input type="number" name="parameter[bounding_box_height]" min="0" step="1" value="<?php echo (isset($parameter['bounding_box_height']) && $parameter['bounding_box_height']) ? $parameter['bounding_box_height'] : '';?>" placeholder="0" class="form-control" />
				</div>
			</div>
			
			<div class="form-group target-bb">
				<label class="col-sm-3 control-label"><?php echo $entry_clipart_parameter_bounding_box_by_other; ?></label>
				<div class="col-sm-3">
					<input type="text" name="parameter[bounding_box_by_other]" value="<?php echo (isset($parameter['bounding_box_by_other']) && $parameter['bounding_box_by_other']) ? $parameter['bounding_box_by_other'] : '';?>" placeholder="" class="form-control" />
				</div>
			</div>
		</div>
		</div>
		</div>		
      </form>
	  </div>
	 </div>
    </div>
<script type="text/javascript"><!--
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
		$('input[name=\'category_clipart\']').val('');
		
		$('#clipart-category' + item['value']).remove();
		
		$('#clipart-category').append('<div id="clipart-category' + item['value'] + '"><i class="fa fa-minus-circle"></i> ' + item['label'] + '<input type="hidden" name="clipart_category[]" value="' + item['value'] + '" /></div>');	
	}
});

$('#clipart-category').delegate('.fa-minus-circle', 'click', function() {
	$(this).parent().remove();
});

//--></script> 

<script type="text/javascript"><!--
function image_upload(field, thumb) {
	$('#dialog').remove();
	
	$('#content').prepend('<div id="dialog" style="padding: 3px 0px 0px 0px;"><iframe src="index.php?route=common/filemanager&token=<?php echo $token; ?>&field=' + encodeURIComponent(field) + '" style="padding:0; margin: 0; display: block; width: 100%; height: 100%;" frameborder="no" scrolling="auto"></iframe></div>');
	
	$('#dialog').dialog({
		title: '<?php echo $text_image_manager; ?>',
		close: function (event, ui) {
			if ($('#' + field).attr('value')) {
				$.ajax({
					url: 'index.php?route=common/filemanager/image&token=<?php echo $token; ?>&image=' + encodeURIComponent($('#' + field).attr('value')),
					dataType: 'text',
					success: function(text) {
						$('#' + thumb).replaceWith('<img src="' + text + '" alt="" id="' + thumb + '" />');
					}
				});
			}
		},	
		bgiframe: false,
		width: 800,
		height: 400,
		resizable: false,
		modal: false
	});
};
$(document).ready(function() {
		$('[name="parameter[bounding_box_control]"]').trigger('change');
});
//bounding box switcher
	$('[name="parameter[bounding_box_control]"]').change(function() {
		var $this = $(this),
		$tbody = $this.parents('.tab-pane:first');
		$tbody.find('.custom-bb, .target-bb').hide().addClass('no-serialization');
		if(this.value != '') {
			$tbody.find('.'+$this.find(":selected").data('class')).show().removeClass('no-serialization');
		}
	});
//--></script></div>
<?php echo $footer; ?>