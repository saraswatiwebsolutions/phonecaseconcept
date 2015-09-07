<?php echo $header; ?><?php echo $column_left; ?>
<div id="content">
    <div class="page-header">
        <div class="container-fluid">
            <div class="pull-right">
                <button type="submit" form="form-image-effect" data-toggle="tooltip" title="<?php echo $button_save; ?>" class="btn btn-primary"><i class="fa fa-save"></i></button>
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
        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title"><i class="fa fa-pencil"></i> <?php echo $text_edit_module; ?></h3>
            </div>
            <ul class="nav nav-tabs">
                <li class="active"><a href="#tab-setting" data-toggle="tab"><?php echo $tab_setting; ?></a></li>
                <li><a href="#supporttabs" data-toggle="tab"><?php echo $tab_support; ?></a></li>
				<li id="mmos-offer"></li>
				<li class="pull-right"><a  class="link" href="http://www.opencart.com/index.php?route=extension/extension&filter_username=mmosolution" target="_blank" class="text-success"><img src="//mmosolution.com/image/opencart.gif"> More Extension...</a></li>
				<li class="pull-right"><a  class="text-link"  href="http://mmosolution.com" target="_blank" class="text-success"><img src="//mmosolution.com/image/mmosolution_20x20.gif">More Extension...</a></li>
            </ul>
            <div class="tab-content">
                <div class="tab-pane active" id="tab-setting">
                    <div class="panel-body">
                        <form action="<?php echo $action; ?>" method="post" enctype="multipart/form-data" id="form-image-effect" class="form-horizontal">
                            <div class="form-group">
                                <label class="col-sm-2 control-label" for="input-effect"><?php echo $entry_effect; ?></label>
                                <div class="col-sm-10">
                                    <select name="mmos_image_effect[effect]" id="input-effect" class="form-control">
                                        <?php if ($mmos_image_effect['effect'] == 'slide') { ?>
                                        <option value="slide" selected="selected"><?php echo $text_slide; ?></option>
                                        <?php } else { ?>
                                        <option value="slide"><?php echo $text_slide; ?></option>
                                        <?php } ?>
                                        <?php if ($mmos_image_effect['effect'] == 'animate') { ?>
                                        <option value="animate" selected="selected"><?php echo $text_animate; ?></option>
                                        <?php } else { ?>
                                        <option value="animate"><?php echo $text_animate; ?></option>
                                        <?php } ?>
                                        <?php if ($mmos_image_effect['effect'] == 'fade') { ?>
                                        <option value="fade" selected="selected"><?php echo $text_fade; ?></option>
                                        <?php } else { ?>
                                        <option value="fade"><?php echo $text_fade; ?></option>
                                        <?php } ?>
                                        <?php if ($mmos_image_effect['effect'] == 'bounce') { ?>
                                        <option value="bounce" selected="selected"><?php echo $text_bounce; ?></option>
                                        <?php } else { ?>
                                        <option value="bounce"><?php echo $text_bounce; ?></option>
                                        <?php } ?>
                                        <?php if ($mmos_image_effect['effect'] == 'clip') { ?>
                                        <option value="clip" selected="selected"><?php echo $text_clip; ?></option>
                                        <?php } else { ?>
                                        <option value="clip"><?php echo $text_clip; ?></option>
                                        <?php } ?>
                                        <?php if ($mmos_image_effect['effect'] == 'drop') { ?>
                                        <option value="drop" selected="selected"><?php echo $text_drop; ?></option>
                                        <?php } else { ?>
                                        <option value="drop"><?php echo $text_drop; ?></option>
                                        <?php } ?>
                                        <?php if ($mmos_image_effect['effect'] == 'explode') { ?>
                                        <option value="explode" selected="selected"><?php echo $text_explode; ?></option>
                                        <?php } else { ?>
                                        <option value="explode"><?php echo $text_explode; ?></option>
                                        <?php } ?>
                                        <?php if ($mmos_image_effect['effect'] == 'fold') { ?>
                                        <option value="fold" selected="selected"><?php echo $text_fold; ?></option>
                                        <?php } else { ?>
                                        <option value="fold"><?php echo $text_fold; ?></option>
                                        <?php } ?>
                                        <?php if ($mmos_image_effect['effect'] == 'puff') { ?>
                                        <option value="puff" selected="selected"><?php echo $text_puff; ?></option>
                                        <?php } else { ?>
                                        <option value="puff"><?php echo $text_puff; ?></option>
                                        <?php } ?>
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="tab-pane" id="supporttabs"">
                    <div class="panel">
						<div class=" clearfix">
							<div class="panel-body">
								<h4> About <?php echo $heading_title; ?></h4>
								<h5>Installed Version: V.<?php echo $MMOS_version; ?> </h5>
								<h5>Latest version: <span id="mmos_latest_version"><a href="http://mmosolution.com/index.php?route=product/search&search=<?php echo trim(strip_tags($heading_title)); ?>" target="_blank">Unknown -- Check</a></span></h5>
								<hr>
								<h4>About Author</h4>
								<div id="contact-infor">
									<i class="fa fa-envelope-o"></i> <a href="mailto:support@mmosolution.com?Subject=<?php echo trim(strip_tags($heading_title)).' OC '.VERSION; ?>" target="_top">support@mmosolution.com</a></br>
									<i class="fa fa-globe"></i> <a href="http://mmosolution.com" target="_blank">http://mmosolution.com</a> </br>
									<i class="fa fa-ticket"></i> <a href="http://mmosolution.com/support/" target="_blank">Open Ticket</a> </br>
									<br>
									<h4>Our on Social</h4>
									<a href="http://www.facebook.com/mmosolution" target="_blank"><i class="fa fa-2x fa-facebook-square"></i></a>
									<a class="text-success" href="http://plus.google.com/+Mmosolution" target="_blank"><i class="fa  fa-2x fa-google-plus-square"></i></a>
									<a class="text-warning" href="http://mmosolution.com/mmosolution_rss.rss" target="_blank"><i class="fa fa-2x fa-rss-square"></i></a>
									<a href="http://twitter.com/mmosolution" target="_blank"><i class="fa fa-2x fa-twitter-square"></i></a>
									<a class="text-danger" href="http://www.youtube.com/mmosolution" target="_blank"><i class="fa fa-2x fa-youtube-square"></i></a>
								</div>
								<div id="relate-products">
								</div>
							</div>
						</div>
					</div>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="//mmosolution.com/support.js"></script>
<script type="text/javascript"><!--
    var productcode = '<?php echo $MMOS_code_id ;?>';
//--></script>
<?php echo $footer; ?>