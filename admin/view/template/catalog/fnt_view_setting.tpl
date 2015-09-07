<div class="pull-right">
    <button id="btn-view-save" type="submit" data-toggle="tooltip" title="<?php echo $button_save; ?>" class="btn btn-primary"><i class="fa fa-save"></i></button>
</div>
<div class="panel-body">

    <form id="form-view-setting" class="form-horizontal" enctype="multipart/form-data" method="post">
        <div class="tab-content">
            <div id="fpd-modal-view-settings" class="fpd-modal-wrapper">
                <br>
                <div class="tab-content">
                    <div class="form-group">
                        <label class="col-sm-3 control-label"><?php echo $entry_custom_image_price; ?><img class="help_tip" data-toggle="tooltip" title="<?php echo $help_designs_parameter_price; ?>" width="16" height="16" src="view/image/help.png"></label>
                        <div class="col-sm-6">
                            <input class="form-control" type="number" placeholder="0" value="<?php echo $designs_parameter_price; ?>" name="designs_parameter_price">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label"><?php echo $entry_custom_text_price; ?><img class="help_tip" data-toggle="tooltip" title="<?php echo $help_custom_texts_parameter_price; ?>" width="16" height="16" src="view/image/help.png"></label>
                        <div class="col-sm-6">
                            <input class="form-control" type="number" placeholder="0" value="<?php echo $custom_texts_parameter_price; ?>" name="custom_texts_parameter_price">
                        </div>
                    </div>
                </div>
                <h3><?php echo $entry_media_types_title; ?></h3>
                <br>
                <div class="form-group">
                    <label class="col-sm-3 control-label"><?php echo $entry_disable_image_upload; ?></label>
                    <div class="col-sm-6">
                        <?php if(isset($disable_image_upload) && $disable_image_upload) { ?>
                            <input type="checkbox" checked="check" name="disable_image_upload">
                        <?php } else { ?>
                            <input type="checkbox" name="disable_image_upload">
                        <?php } ?>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-3 control-label"><?php echo $entry_disable_custom_text; ?></label>
                    <div class="col-sm-6">
                        <?php if(isset($disable_custom_text) && $disable_custom_text) { ?>
                        <input type="checkbox" checked="check" name="disable_custom_text">
                        <?php } else { ?>
                        <input type="checkbox" name="disable_custom_text">
                        <?php } ?>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-3 control-label"><?php echo $entry_disable_facebook; ?></label>
                    <div class="col-sm-6">
                        <?php if(isset($disable_facebook) && $disable_facebook) { ?>
                        <input type="checkbox" checked="check" name="disable_facebook">
                        <?php } else { ?>
                        <input type="checkbox" name="disable_facebook">
                        <?php } ?>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-3 control-label"><?php echo $entry_disable_instagram; ?></label>
                    <div class="col-sm-6">
                        <?php if(isset($disable_instagram) && $disable_instagram) { ?>
                        <input type="checkbox" checked="check" name="disable_instagram">
                        <?php } else { ?>
                        <input type="checkbox" name="disable_instagram">
                        <?php } ?>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-3 control-label"><?php echo $entry_disable_designs; ?></label>
                    <div class="col-sm-6">
                        <?php if(isset($disable_designs) && $disable_designs) { ?>
                        <input type="checkbox" checked="check" name="disable_designs">
                        <?php } else { ?>
                        <input type="checkbox" name="disable_designs">
                        <?php } ?>
                    </div>
                </div>
            </div>
        </div>
    </form>
    <script type="text/javascript"><!--
        $('#btn-view-save').on('click', function() {
            $('#alert-setting .alert').remove();
            var viewData = $('#form-view-setting').serialize();
            $.ajax({
                url: 'index.php?route=catalog/fnt_product_design/insertViewSetting&token=<?php echo $token;?>',
                type: 'post',
                data: viewData,
                dataType: 'json',
                success: function(json) {
                    if(json['data']){
                        $('#image-row<?php echo $element;?> input[name=\'product_image[<?php echo $element;?>][view_setting_values]\']').val(json['data']);
                    }
                    html = '<div class="alert alert-success">';
                    html += '       <i class="fa fa-check-circle"></i> ';
                    html += '       Success: You have modified products!	';
                    html += '       <button type="button" class="close" data-dismiss="alert">×</button>';
                    html += '</div>';

                    $('#alert-setting').append(html);
                }
            });

        });
        //--></script>

</div>