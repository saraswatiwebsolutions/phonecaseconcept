<?php echo $header; ?><?php echo $column_left; ?>
<div id="content">
	<div class="page-header">
		<div class="container-fluid">
			<div class="pull-right">
				<a onclick="$('#config-form').submit();" class="btn btn-primary"><?php echo $button_save; ?></a>
				<a href="<?php echo $cancel; ?>" data-toggle="tooltip" title="<?php echo $button_cancel; ?>" class="btn btn-default"><i class="fa fa-reply"></i></a>
			</div>
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
			<h3 class="panel-title"><i class="fa fa-pencil"></i><?php echo $text_edit; ?></h3>
		</div>
		<div id="configuration-table" class="container-fluid">
			<form id="config-form" method="post" action="<?php echo $save_action?>">
			<br/>
			<div class="row-title">Size Configuration</div>
			<div class="row show-grid">
				<div class="col-md-4">
					<label for="main_width">Root Menu Height</label>
					<div class="input-group">
						<input class="form-control" name="menu_height" type="text" value="<?php echo $menu_height;?>">
						<div class="input-group-addon">Px</div>
					</div>
				</div>
				<div class="col-md-4">
					<label for="main_width">Submenu Width</label>
					<div class="input-group">
						<input class="form-control" name="submenu_width" type="text" value="<?php echo $submenu_width;?>">
						<div class="input-group-addon">Px</div>
					</div>
				</div>
				<div class="col-md-4">
					<label for="main_width">Submenu Height</label>
					<div class="input-group">
						<input class="form-control" name="submenu_height" type="text" value="<?php echo $submenu_height;?>">
						<div class="input-group-addon">Px</div>
					</div>
				</div>
			</div>
			<br/>
			<div class="row-title">Font Configuration</div>
			<div class="row show-grid">
				<div class="col-md-3">
					<label for="main_width">Root Menu Font Style</label>
					<div class="">
						<select name="menu_font_style" class="form-control">
							<option value="uppercase" <?php if($menu_font_style=='uppercase') echo " selected='selected'";?>>Uppercase</option>
							<option value="lowercase" <?php if($menu_font_style=='lowercase') echo " selected='selected'";?>>Lowercase</option>
							<option value="capitalize" <?php if($menu_font_style=='capitalize') echo " selected='selected'";?>>Capitalize</option>
						</select>
					</div>
				</div>
				<div class="col-md-3">
					<label for="main_width">Root Menu Font Size</label>
					<div class="input-group">
						<input class="form-control" name="menu_font_size" type="text" value="<?php echo $menu_font_size;?>">
						<div class="input-group-addon">Px</div>
					</div>
				</div>
				<div class="col-md-3">
					<label for="main_width">Root Menu Font Color</label>
					<div class="input-group">
						<div class="input-group-addon">#</div>
						<input id="menu_font_color" style="background:#<?php echo $menu_font_color;?>" class="form-control" name="menu_font_color" type="text" value="<?php echo $menu_font_color;?>">
					</div>
					<script type="text/javascript">
						$(document).ready(function(){
							treodenSetColorPicker('#menu_font_color');
						})
					</script>
				</div>
				<div class="col-md-3">
					<label for="main_width">Root Menu Font Color Hover</label>
					<div class="input-group">
						<div class="input-group-addon">#</div>
						<input id="menu_font_color_hover" style="background:#<?php echo $menu_font_color_hover;?>" class="form-control" name="menu_font_color_hover" type="text" value="<?php echo $menu_font_color_hover;?>">
					</div>
					<script type="text/javascript">
						$(document).ready(function(){
							treodenSetColorPicker('#menu_font_color_hover');
						})
					</script>					
				</div>
			</div>
			<br/>
			<div class="row show-grid">
				<div class="col-md-3">
					<label for="main_width">Submenu Font Style</label>
					<div class="">
						<select name="submenu_font_style" class="form-control">
							<option value="uppercase" <?php if($submenu_font_style=='uppercase') echo " selected='selected'";?>>Uppercase</option>
							<option value="lowercase" <?php if($submenu_font_style=='lowercase') echo " selected='selected'";?>>Lowercase</option>
							<option value="capitalize" <?php if($submenu_font_style=='capitalize') echo " selected='selected'";?>>Capitalize</option>
						</select>
					</div>
				</div>
				<div class="col-md-3">
					<label for="main_width">Submenu Font Size</label>
					<div class="input-group">
						<input class="form-control" name="submenu_font_size" type="text" value="<?php echo $submenu_font_size;?>">
						<div class="input-group-addon">Px</div>
					</div>
				</div>
				<div class="col-md-3">
					<label for="main_width">Submenu Font Color</label>
					<div class="input-group">
						<div class="input-group-addon">#</div>
						<input id="submenu_font_color" style="background:#<?php echo $submenu_font_color;?>" class="form-control" name="submenu_font_color" type="text" value="<?php echo $submenu_font_color;?>">
					</div>
					<script type="text/javascript">
						$(document).ready(function(){
							treodenSetColorPicker('#submenu_font_color');
						})
					</script>					
				</div>
				<div class="col-md-3">
					<label for="main_width">Submenu Font Color Hover</label>
					<div class="input-group">
						<div class="input-group-addon">#</div>
						<input id="submenu_font_color_hover" style="background:#<?php echo $submenu_font_color_hover;?>" class="form-control" name="submenu_font_color_hover" type="text" value="<?php echo $submenu_font_color_hover;?>">
					</div>
					<script type="text/javascript">
						$(document).ready(function(){
							treodenSetColorPicker('#submenu_font_color_hover');
						})
					</script>					
				</div>
			</div>
			<br/>
			<div class="row-title">Color Configuration</div>
			<div class="row show-grid">
				<div class="col-md-3">
					<label for="main_width">Root Menu Background</label>
					<div class="input-group">
						<div class="input-group-addon">#</div>
						<input id="menu_background" style="background:#<?php echo $menu_background;?>" class="form-control" name="menu_background" type="text" value="<?php echo $menu_background;?>">
					</div>
					<script type="text/javascript">
						$(document).ready(function(){
							treodenSetColorPicker('#menu_background');
						})
					</script>					
				</div>
				<div class="col-md-3">
					<label for="main_width">Root Menu Background Hover</label>
					<div class="input-group">
						<div class="input-group-addon">#</div>
						<input id="menu_background_hover" style="background:#<?php echo $menu_background_hover;?>" class="form-control" name="menu_background_hover" type="text" value="<?php echo $menu_background_hover;?>">
					</div>
					<script type="text/javascript">
						$(document).ready(function(){
							treodenSetColorPicker('#menu_background_hover');
						})
					</script>					
				</div>
				<div class="col-md-3">
					<label for="main_width">Submenu background</label>
					<div class="input-group">
						<div class="input-group-addon">#</div>
						<input id="submenu_background" style="background:#<?php echo $submenu_background;?>" class="form-control" name="submenu_background" type="text" value="<?php echo $submenu_background;?>">
					</div>
					<script type="text/javascript">
						$(document).ready(function(){
							treodenSetColorPicker('#submenu_background');
						})
					</script>					
				</div>
				<div class="col-md-3">
					<label for="main_width">Submenu background Hover</label>
					<div class="input-group">
						<div class="input-group-addon">#</div>
						<input id="submenu_background_hover" style="background:#<?php echo $submenu_background_hover;?>" class="form-control" name="submenu_background_hover" type="text" value="<?php echo $submenu_background_hover;?>">
					</div>
					<script type="text/javascript">
						$(document).ready(function(){
							treodenSetColorPicker('#submenu_background_hover');
						})
					</script>					
				</div>
			</div>
			<br/>
			</form>
		</div>
	</div>
	</div>
</div>
<?php echo $footer; ?>