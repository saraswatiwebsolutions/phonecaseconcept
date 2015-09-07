<?php echo $header; ?><?php echo $column_left; ?>
<div id="content">
    <div class="page-header">
		<div class="container-fluid">
			<div class="pull-right">
				<button type="submit" form="form-featured" data-toggle="tooltip" title="<?php echo $button_save; ?>" class="btn btn-primary"><i class="fa fa-save"></i></button>
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
		<?php if (isset($success)) { ?>
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
	  <div class="form-group">
          <label class="col-sm-2 control-label" for="input-product"><?php echo $entry_fonts; ?></label>
          <div class="col-sm-8">
			<input class="form-control" name="fonts_default" value="<?php echo $fonts_default;?>"/>
			 <span class="help-block"><?php echo $help_fonts; ?></span>
          </div>
        </div>

        <div class="form-group">
          <label class="col-sm-2 control-label" for="input-product"><?php echo $entry_fonts_google; ?></label>
          <div class="col-sm-8">
			<select class="form-control" name="select_font">
				<option value=""></option>
				<?php foreach($content as $val){ ?>
					<?php if(in_array($val, $fonts)){?>
						<option style="color:#d3d3d3" value="<?php echo $val;?>"><?php echo $val;?></option>
					<?php } else {?>	
						<option value="<?php echo $val;?>"><?php echo $val;?></option>
					<?php }?>	
				<?php }?>
			</select>
            <span class="help-block"><?php echo $help_google_fonts; ?></span>
            <div id="list-fonts" class="well well-sm" style="height: 150px; overflow: auto;">
			<?php if($fonts){ ?>	
              <?php foreach ($fonts as $key => $font) { ?>
              <div id="font<?php echo $key; ?>"><i class="fa fa-minus-circle"></i> <?php echo $font; ?>
                <input type="hidden" name="fonts[]" value="<?php echo $font; ?>" />
              </div>
              <?php }} ?>
            </div>
          </div>
        </div>
		<div class="form-group">
          <label class="col-sm-2 control-label" for="input-product"><?php echo $entry_fonts_directory; ?></label>
          <div class="col-sm-8">
			<select class="form-control" name="select_font_woff">
				<option value=""></option>
				<?php foreach($woff_font as $key => $font){ ?>
					<?php if(in_array($font, $title_woff_font_selected)){?>
						<option style="color:#d3d3d3" value="<?php echo $key;?>"><?php echo $font;?></option>
					<?php } else {?>
						<option value="<?php echo $key;?>"><?php echo $font;?></option>
					<?php }?>
				<?php }?>
			</select>
            <span class="help-block"><?php echo $help_directory_fonts; ?></span>
            <div id="list-fonts-woff" class="well well-sm" style="height: 150px; overflow: auto;">
			<?php if($woff_font_selected){ ?>	
				<?php $i=0;?>
              <?php foreach ($woff_font_selected as $key => $font) { ?>
              <div id="font<?php echo $i; ?>"><i class="fa fa-minus-circle"></i> <?php echo $key; ?>
                <input type="hidden" name="fonts_woff[]" value="<?php echo $font; ?>" />
              </div>
			  <?php $i++;?>
              <?php }} ?>
            </div>
          </div>
        </div>
      </form>
	  </div>
	  </div>
    </div>
<script type="text/javascript"><!--
$('select[name=\'select_font\']').bind('change', function() {
	var value = $('select[name=\'select_font\']').find('option:selected').attr('value');
	if($('input[value="' + value + '"]').length == 0){
		if(value != ''){
			$('#list-fonts').append('<div><i class="fa fa-minus-circle"></i> ' + value + '<input type="hidden" name="fonts[]" value="' + value + '" /></div>');	
			$('select[name=\'select_font\']').find('option:selected').css('color','#d3d3d3');
		}
	}	
});
$('#list-fonts').delegate('.fa-minus-circle', 'click', function() {
	var font_unselect = $(this).parent().find('input').attr('value');
	$('select[name=\'select_font\']').find('[value="'+font_unselect+'"]').css('color','#000000');	
	$(this).parent().remove();
});
$('select[name=\'select_font_woff\']').bind('change', function() {
	var value = $('select[name=\'select_font_woff\']').find('option:selected').attr('value');
	var text = $('select[name=\'select_font_woff\']').find('option:selected').text();
	if($('input[value="' + value + '"]').length == 0){
		if(value != ''){
			$('#list-fonts-woff').append('<div><i class="fa fa-minus-circle"></i> ' + text + '<input type="hidden" name="fonts_woff[]" value="' + value + '" /></div>');	
			$('select[name=\'select_font_woff\']').find('option:selected').css('color','#d3d3d3');
		}
	}	
});
$('#list-fonts-woff').delegate('.fa-minus-circle', 'click', function() {
	var font_unselect = $(this).parent().find('input').attr('value');
	$('select[name=\'select_font_woff\']').find('[value="'+font_unselect+'"]').css('color','#000000');	
	$(this).parent().remove();
});
//--></script></div>
<?php echo $footer; ?>