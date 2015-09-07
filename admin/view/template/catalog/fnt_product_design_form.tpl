<?php echo $header; ?><?php echo $column_left; ?>
<div id="content">
    <div class="page-header">
        <div class="container-fluid">
            <div class="pull-right">
                <a onclick="saveProductAndDesign();" data-toggle="tooltip" title="<?php echo $button_save_design; ?>" class="btn btn-primary"><?php echo $button_save_design; ?></a>
                <button type="submit" onclick="saveProduct();" data-toggle="tooltip" title="<?php echo $button_save; ?>" class="btn btn-primary"><i class="fa fa-save"></i></button>
                <a href="<?php echo $cancel; ?>" data-toggle="tooltip" title="<?php echo $button_cancel; ?>" class="btn btn-default"><i class="fa fa-reply"></i></a></div>
            <h1 class="panel-title"><?php echo $heading_title; ?></h1>
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
                    <ul style="margin-bottom:10px" class="nav nav-tabs">
                        <li class="active"><a style="text-decoration:none" href="#tab-general" data-toggle="tab"><?php echo $tab_general; ?></a></li>
                        <li><a style="text-decoration:none" href="#tab-data" data-toggle="tab"><?php echo $tab_data; ?></a></li>
                        <li><a style="text-decoration:none" href="#tab-images" data-toggle="tab"><?php echo $tab_view; ?></a></li>
                    </ul>
                    <div class="tab-content">
                        <div class="tab-pane active" id="tab-general">
                            <ul style="margin-bottom:10px" class="nav nav-tabs" id="language">
                                <?php foreach ($languages as $language) { ?>
                                <li><a href="#language<?php echo $language['language_id']; ?>" data-toggle="tab"><img src="view/image/flags/<?php echo $language['image']; ?>" title="<?php echo $language['name']; ?>" /> <?php echo $language['name']; ?></a></li>
                                <?php } ?>
                            </ul>
                            <div class="tab-content">
                                <?php foreach ($languages as $language) { ?>
                                <div class="tab-pane" id="language<?php echo $language['language_id']; ?>">
                                    <div class="form-group required">
                                        <label class="col-sm-2 control-label" for="input-name<?php echo $language['language_id']; ?>"><?php echo $entry_name; ?></label>
                                        <div class="col-sm-10">
                                            <input type="text" name="fnt_product_design_description[<?php echo $language['language_id']; ?>][name]" value="<?php echo isset($fnt_product_design_description[$language['language_id']]) ? $fnt_product_design_description[$language['language_id']]['name'] : ''; ?>" placeholder="<?php echo $entry_name; ?>" id="input-name" class="form-control" />
                                            <?php if (isset($error_name[$language['language_id']])) { ?>
                                            <div class="text-danger"><?php echo $error_name[$language['language_id']]; ?></div>
                                            <?php } ?>
                                        </div>
                                    </div>
                                </div>
                                <?php } ?>
                            </div>
                        </div>
                        <div class="tab-pane" id="tab-data">
                           
                            <div class="form-group">
                                <label class="col-sm-2 control-label" for="input-product"><?php echo $entry_product; ?></label>
                                <div class="col-sm-10">
                                    <input type="text" name="product" value="<?php echo $product ?>" placeholder="<?php echo $entry_product; ?>" id="input-product" class="form-control" />
                                    <input type="hidden" name="product_id" value="<?php echo $product_id; ?>" />
                                </div>
                                <div class="col-sm-2"></div>
                                <div class="col-sm-10">
                                    <span class="help-block"><?php echo $help_product; ?></span>
                                    <?php if (isset($product_id) && $product_id) { ?>
                                        <input class="btn btn-primary" type="button" name="individual_product_settings" value="Individual Product Settings"/>
                                    <?php } else { ?>
                                        <input class="btn btn-primary hidden" type="button" name="individual_product_settings" value="Individual Product Settings"/>
                                    <?php } ?>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label" for="input-category-design"><?php echo $entry_category_design; ?></label>
                                <div class="col-sm-10">
                                    <input type="text" name="category_design_name" value="<?php echo $category_design_name; ?>" placeholder="<?php echo $entry_category_design; ?>" id="input-category-design" class="form-control" />
                                    <input type="hidden" name="category_design_id" value="<?php echo $category_design_id; ?>" />
                                </div>
                                <div class="col-sm-2"></div>
                                <div class="col-sm-10">
                                    <span class="help-block"><?php echo $help_category; ?></span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label"><?php echo $entry_stage_width; ?></label>
                                <div class="col-sm-10">
                                    <input type="number" name="design_stage_width" value="<?php echo $design_stage_width; ?>" placeholder="0" class="form-control" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label"><?php echo $entry_stage_height; ?></label>
                                <div class="col-sm-10">
                                    <input type="number" name="design_stage_height" value="<?php echo $design_stage_height; ?>" placeholder="0" class="form-control" />
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
                        </div>
                        <div class="tab-pane" id="tab-images">
                            <div class="table-responsive">
                                <p class="toolbar text-right">
									<input type="file" value="Upload" class="hidden" id="fpd-file-import" />
                                    <?php if($product_design_id != 0){ ?>
                                    <a class="btn btn-primary" id="fpd-import"><?php echo $text_import;?></a>
                                    <?php } else { ?>
                                    <a class="btn btn-primary" onClick='alert("Warning: You can not import data when create product!")'><?php echo $text_import;?></a>
                                    <?php }?>
                                    <a class="btn btn-primary" id="fpd-export"><?php echo $text_export;?></a>
                                </p>
                                <table id="images" class="table table-striped table-bordered table-hover">
                                    <thead>
                                    <tr>
                                        <td class="text-left"><?php echo $entry_image; ?></td>
                                        <td class="text-left"><?php echo $entry_view_name; ?></td>
                                        <td class="text-left"><?php echo $entry_sort_order; ?></td>
                                        <td></td>
                                    </tr>
                                    </thead>
                                    <tbody id="tab-design-views">
                                    <?php $image_row = 0; ?>
                                    <?php foreach ($product_images as $product_image) { ?>
                                    <tr id="image-row<?php echo $image_row; ?>">
                                        <td class="text-left">
											<a href="" id="thumb-image<?php echo $image_row; ?>" data-toggle="image" class="img-thumbnail"><img src="<?php echo $product_image['thumb']; ?>" alt="" title="" data-placeholder="<?php echo $placeholder; ?>" /></a><input type="hidden" name="product_image[<?php echo $image_row; ?>][image]" value="<?php echo $product_image['image']; ?>" id="image<?php echo $image_row; ?>" />
											
											<input type="hidden" name="product_image[<?php echo $image_row; ?>][product_design_element_id]" value="<?php echo $product_image['product_design_element_id']; ?>" /></td>
                                        <td class="text-right"><input type="text" name="product_image[<?php echo $image_row; ?>][name]" value="<?php echo $product_image['name']; ?>" placeholder="<?php echo $entry_view_name; ?>" class="form-control" /></td>
                                        <td class="text-left"><input type="text" name="product_image[<?php echo $image_row; ?>][sort_order]" value="<?php echo $product_image['sort_order']; ?>" placeholder="<?php echo $entry_sort_order; ?>" class="form-control" /></td>
                                        <td class="text-left">
                                            <a href="<?php echo $product_image['edit']; ?>" class="btn btn-primary" data-toggle="tooltip" title="<?php echo $text_edit;?>"><i class="fa fa-edit"></i> <?php echo $button_edit; ?></a>
                                            <button type="button" onclick="settingView(<?php echo $image_row; ?>)" class="btn btn-primary" name="fpd-edit-view"> <i class="fa fa-cog"></i> Setting</button>
                                            <button type="button" onclick="$('#image-row<?php echo $image_row; ?>').remove();" class="btn btn-danger" data-toggle="tooltip" title="<?php echo $button_remove;?>"><i class="fa fa-minus-circle"></i> <?php echo $button_remove; ?></button>
                                        </td>
                                        <input type="hidden" name="product_image[<?php echo $image_row; ?>][view_setting_values]" value="<?php echo $product_image['view_setting_values']; ?>" />
                                    </tr>
                                    <?php $image_row++; ?>
                                    <?php } ?>
                                    </tbody>
                                    <tfoot>
                                    <tr>
                                        <td colspan="3"></td>
                                        <td class="text-left"><a onclick="addImage();" class="btn btn-primary" data-toggle="tooltip" title="<?php echo $button_image_add; ?>"><i class="fa fa-plus-circle"></i> <?php echo $button_image_add; ?></a></td>
                                    </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript"><!--
    $('input[name=\'product\']').autocomplete({
        'source': function(request, response) {
            $.ajax({
                url: 'index.php?route=catalog/product/autocomplete&token=<?php echo $token; ?>&filter_name=' +  encodeURIComponent(request)+'&type=fnt_design',
                dataType: 'json',
                success: function(json) {
                    json.unshift({
                        'product_id': '',
                        'name': '<?php echo $text_none; ?>'
                    });

                    response($.map(json, function(item) {
                        return {
                            label: item['name'],
                            value: item['product_id']
                        }
                    }));
                }
            });
        },
        'select': function(item) {
            $('input[name=\'product\']').val(item['label']);
            $('input[name=\'product_id\']').val(item['value']);
        }
    });

    function survey(selector, callback) {
        var input = $(selector);
        var oldvalue = input.val();
        setInterval(function(){
            if (input.val()!=oldvalue && input.val()!=0){
                oldvalue = input.val();
                $('input[name=\'individual_product_settings\']').removeClass('hidden');
                callback();
            }
            if (input.val()!=oldvalue && input.val()==0){
                $('input[name=\'individual_product_settings\']').addClass('hidden');
            }
        }, 100);
    }
    survey('input[name=\'product_id\']', function(){console.log('changed')});

    // Category Design
    $('input[name=\'category_design_name\']').autocomplete({
        'source': function(request, response) {
            $.ajax({
                url: 'index.php?route=catalog/fnt_category/autocomplete&token=<?php echo $token; ?>&filter_name=' +  encodeURIComponent(request),
                dataType: 'json',
                success: function(json) {
                    response($.map(json, function(item) {
                        return {
                            label: item['name'],
                            value: item['category_design_id']
                        }
                    }));
                }
            });
        },
        'select': function(item) {
            $('input[name=\'category_design_name\']').val(item['label']);
            $('input[name=\'category_design_id\']').val(item['value']);
        }
    });

    $('#category-design').delegate('.fa-minus-circle', 'click', function() {
        $(this).parent().remove();
    });

    //--></script>

<script type="text/javascript"><!--
    var image_row = <?php echo $image_row; ?>;

    function addImage() {
        html  = '<tr id="image-row' + image_row + '">';
       	html += '  <td class="text-left"><a href="" id="thumb-image' + image_row + '"data-toggle="image" class="img-thumbnail"><img src="<?php echo $placeholder; ?>" alt="" title="" data-placeholder="<?php echo $placeholder; ?>" /><input type="hidden" name="product_image[' + image_row + '][image]" value="" id="input-image' + image_row + '" /><input type="hidden" name="product_image[' +image_row+'][product_design_element_id]" value="" /></td>';
        html += '  <td class="text-right"><input type="text" name="product_image[' + image_row + '][name]" value="" placeholder="<?php echo $entry_view_name; ?>" class="form-control" /></td>';
        html += '  <td class="text-right"><input type="text" name="product_image[' + image_row + '][sort_order]" value="" placeholder="<?php echo $entry_sort_order; ?>" class="form-control" /></td>';
        html += '  <td class="text-left">';
        html += '  <button type="button" onclick="settingView(' + image_row + ')" class="btn btn-primary" name="fpd-edit-view">' + '<i class="fa fa-cog"></i> Setting</button>';
        html += '  <button type="button" onclick="$(\'#image-row' + image_row  + '\').remove();" class="btn btn-danger"><i class="fa fa-minus-circle"></i> <?php echo $button_remove; ?></button>';
        html += '  </td>';
        html += '  <input type="hidden" name="product_image[' + image_row + '][view_setting_values]" value="" />';
        html += '</tr>';
        $('#images tbody').append(html);
        image_row++;
    }
    function saveProductAndDesign() {
		$('#modal-settings').remove();
        var action = $('#form-product').attr('action') + '&design=1'
        $('#form-product').attr('action',action);
        $('#form-product').submit();
    }
	function saveProduct() {
		$('#modal-settings').remove();	
        $('#form-product').submit();
    }
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
    //--></script>

<script type="text/javascript"><!--
    //Product design popup
    $('input[name=\'individual_product_settings\']').on('click', function() {
        $('#modal-settings').remove();

        $.ajax({
            url: 'index.php?route=catalog/fnt_product_design/popupIndividualSetting&token=<?php echo $token;?>' + '&product_id=' + $('input[name=\'product_id\']').val(),
            type: 'get',
            dataType: 'html',
            success: function(data) {
                html  = '<div id="modal-settings" class="modal">';
                html += '  <div class="modal-dialog">';
                html += '    <div class="modal-content">';
                html += '      <div class="modal-header">';
                html += '        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
                html += '        <h3 class="modal-title"><?php echo $entry_individual_settings;?></h3>';
                html += '        <p class="description"><?php echo $entry_individual_help;?></p>';
                html += '      </div>';
                html += '<div id="alert-setting">';
                html += '</div>';
                html += '      <div class="modal-body">';
                html += data ;
                html += '</div>';
                html += '    </div';
                html += '  </div>';
                html += '</div>';
                $('body').append(html);
                $('#modal-settings').modal('show');
            }
        });

    });
//--></script>
<script type="text/javascript">
    function settingView(a) {
        var element_select = '#image-row' + a;
        $('#modal-settings').remove();

        var valdata = $(element_select + " input[name=\'product_image[" + a +"][view_setting_values]\']").val();

        //alert(valdata);
        $.ajax({
            url: 'index.php?route=catalog/fnt_product_design/popupViewSetting&token=<?php echo $token;?>&element='+a,
            type: 'post',
            data: 'view_setting_values=' + valdata,
            dataType: 'html',
            success: function(data) {
                html  = '<div id="modal-settings" class="modal">';
                html += '  <div class="modal-dialog">';
                html += '    <div class="modal-content">';
                html += '      <div class="modal-header">';
                html += '        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
                html += '        <h3 class="modal-title"><?php echo $entry_view_option;?></h3>';
                html += '        <p class="description"><?php echo $entry_view_help;?></p>';
                html += '      </div>';
                html += '<div id="alert-setting">';
                html += '</div>';
                html += '      <div class="modal-body">';
                html += data ;
                html += '</div>';
                html += '    </div';
                html += '  </div>';
                html += '</div>';
                $('body').append(html);
                $('#modal-settings').modal('show');
            }
        });
    }

//--></script>

<script type="text/javascript">
    $viewsList = $('#tab-design-views'),
    $modalWrapper = $('#fpd-modal-settings');
    //export product
    $('#fpd-export').click(function(evt) {
        if($viewsList.children('tr').length == 0) {

            alert("Nothing to export. You have not created views for this product. Please create one or more views!");
            return;
        }

        var urlAjaxExport = 'index.php?route=catalog/fnt_product_design/export&token=<?php echo $token; ?>&product_design_id=<?php echo $product_design_id;?>';
        location.href = urlAjaxExport;

        evt.preventDefault();

    });
    //import product
    $('#fpd-import').click(function(evt) {
        $('#fpd-file-import').click();
        evt.preventDefault();

    });

    $('#fpd-file-import').change(function(evt) {

        if(window.FileReader) {

            var reader = new FileReader();
            reader.readAsText(evt.target.files[0]);
            reader.onload = function (evt) {

                var file = evt.target.result,
                        json;

                try {
                    json = JSON.parse(file);
                } catch (exception) {
                    json = null;
                }

                if(json == null) {
                    alert('Sorry, but the selected file is not a valid JSON object. Are you sure you have selected the correct file to import?');
                }
                else {
                    _importViews(json);
                }

            };
        }

        $('#fpd-file-import').val('');
    });
    function _importViews(views) {

        var keys = Object.keys(views),
                viewCount = 0;

        function _importView(view) {
            $.ajax({
                url: 'index.php?route=catalog/fnt_product_design/import&token=<?php echo $token; ?>&product_design_id=<?php echo $product_design_id;?>',
                data: {
                    elements: view.elements,
                    thumbnail: view.thumbnail,
                    title: view.title,
                    thumbnail_name: view.thumbnail_name ? view.thumbnail_name : view.title,
                    product_design_id: <?php echo $product_design_id;?>
        },
        type: 'post',
                dataType: 'json',
                success: function(data) {

            viewCount++;

            if(data == 0) {
                alert('Could not create view. Please try again!');

            }
            else {
                $viewsList.append(data['success']);
                image_row++;
            }

            if(viewCount < keys.length) {
                _importView(views[keys[viewCount]]);
            }
            else {

            }

        }
    });

    }

    if(!keys.length == 0) {

        _importView(views[keys[0]]);
    }

    };

    function _serializeObject(fields) {
        var o = {};
        var a = fields.serializeArray();
        $.each(a, function() {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                if(this.value) {
                    o[this.name].push(this.value || '');
                }

            } else {
                if(this.value) {
                    o[this.name] = this.value || '';
                }
            }
        });
        return o;
    };

    function _serializedStringToObject(string) {

        var splitParams = string.split("&");

        //convert parameter string into object
        var object = {};
        for(var i=0; i < splitParams.length; ++i) {
            var splitIndex = splitParams[i].indexOf("=");
            object[splitParams[i].substr(0, splitIndex)] = splitParams[i].substr(splitIndex+1).replace(/\_/g, ' ');
        }
        return object;
    };
    $(document).ready(function() {
        $modalWrapper.find('[name="parameters[background_type]"]:checked').change();
        $modalWrapper.find('select').trigger('change');
    });
    //background type switcher
    $modalWrapper.find('[name="parameters[background_type]"]').change(function() {

        if(this.value == 'image') {
            $modalWrapper.find('#background_thumb').parents('.form-group').show();
            $modalWrapper.find('[name="parameters[background_color]"]').parents('.form-group').hide();
        }
        else if(this.value == 'color') {
            $modalWrapper.find('[name="parameters[background_color]"]').parents('.form-group').show();
            $modalWrapper.find('#background_thumb').parents('.form-group').hide();
        } else if(this.value == 'none') {
            $modalWrapper.find('#background_thumb').parents('.form-group').hide();
            $modalWrapper.find('[name="parameters[background_color]"]').parents('.form-group').hide();
        }
    });
    //bounding box switcher
    $('[name="parameters[designs_parameter_bounding_box_control]"], [name="parameters[custom_texts_parameter_bounding_box_control]"]').change(function() {
        var $this = $(this),
                $tbody = $this.parents('.tab-pane:first');
        $tbody.find('.custom-bb, .target-bb').hide().addClass('no-serialization');
        if(this.value != '') {
            $tbody.find('.'+$this.find(":selected").data('class')).show().removeClass('no-serialization');
        }
    });
</script>
<script type="text/javascript"><!--
    $('#language a:first').tab('show');
    $('#option a:first').tab('show');
    //--></script></div>
<?php echo $footer; ?>