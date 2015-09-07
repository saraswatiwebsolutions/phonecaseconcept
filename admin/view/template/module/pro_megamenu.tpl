<?php echo $header; ?><?php echo $column_left; ?>
<div id="content">
	<div class="page-header">
		<div class="container-fluid">
			<div class="pull-right">
				<a onclick="javascript : megamenuSubmit();" class="btn btn-primary"><?php echo $button_save; ?></a>
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
		<div class="alert alert-danger"><i class="fa fa-check-circle"></i> <?php echo $error_warning; ?>
		  <button type="button" class="close" data-dismiss="alert">&times;</button>
		</div>
	<?php } ?>
	<?php if (isset($success) and $success) { ?>
		<div class="alert alert-success"><i class="fa fa-exclamation-circle"></i> <?php echo $success; ?>
		  <button type="button" class="close" data-dismiss="alert">&times;</button>
		</div>
	<?php } ?>
	<div class="panel panel-default">
		<div class="panel-heading">
			<h3 class="panel-title"><i class="fa fa-pencil"></i><?php echo $text_edit; ?></h3>
			<a href="javascript:void(0)" onclick="goConfigurationTable();" class="btn btn-default" title="Configuration table">Configuration table</a>
		</div>
			<!-- start menu -->  
				<div id="pro-menu-erea">
					<div class="left">
						<div class="data-block"><!-- category -->  
							<h3 class="data-title">Category</h3>
							<ul>
							<?php foreach( $categories as $category) : ?>
								<li class=""><label><input class="category" type="checkbox" value="<?php echo $category['category_id'];?>" data="<?php echo $category['name'];?>" /><?php echo $category['name'];?></label></li>
							<?php endforeach;?>
							</ul>
							<a class="add-to-menu" href="javascript:void(0);">Add To Menu</a>
						</div>
						<div class="data-block"><!-- infomations --> 
							<h3 class="data-title">Infomation</h3>					
							<ul>
							<?php foreach( $informations as $infor) : ?>
								<li class=""><label><input class="infomation"  type="checkbox" value="<?php echo $infor['id'];?>" data="<?php echo $infor['title'];?>" /><?php echo $infor['title'];?></label></li>
							<?php endforeach;?>
							</ul>
							<a class="add-to-menu" href="javascript:void(0);">Add To Menu</a>
						</div>
						<div class="data-block"><!-- category -->  
							<h3 class="data-title">Manufacturer</h3>		
							<ul>
							<?php foreach( $manufacturers as $manufacturer) : ?>
								<li class=""><label><input class="manufacturer"  type="checkbox" value="<?php echo $manufacturer['id'];?>" data="<?php echo $manufacturer['name'];?>" /><?php echo $manufacturer['name'];?></label></li>
							<?php endforeach;?>
							</ul>
							<a class="add-to-menu" href="javascript:void(0);">Add To Menu</a>
						</div>
						<div class="data-block custom-menu"><!-- category -->  
							<h3 class="data-title">Custom Menu</h3>
							<div>
								<p><label>Title : </label><input class="form-control title" type="text" value="Type title here" /></p>
								<p><label>Url : </label><input class="form-control url" type="text" value="Type url here" /></p>
							</div>
							</ul>
							<a class="add-to-menu_custom" href="javascript:void(0);">Add To Menu</a>
						</div>
					</div>
					<div class="right">				
						<form action="<?php echo $action; ?>" method="post" enctype="multipart/form-data" id="form">
							<div class="dd" id="menu_area">
								<ol class='dd-list'>
									<?php
									$model->getMenuHtml(0);
									?>
								</ol>	
							</div>
							<input id="custom_data" type="hidden" name="custom_data" value="" />
						</form>
					</div>
				</div>
			<!-- end menu --> 	
	</div>
	</div>
</div>
<script>
function get_content_obj(obj){
	var url='';
	var type_id = jQuery(obj).attr('value');
	var result="<li class='dd-item'><div class='dd-handle'>"+
	"<div class='bar'>"+
		"<span class='title'>" + jQuery(obj).attr('data') + "</span>"+		
	"</div>" + 
	"</div><div class='info hide'>"+
				"<p class='input-item'><span class='type'>Type : " +jQuery(obj).attr('class')+ "</span></p>"+				
				"<p class='input-item'><label>Title : </label></p>"+
				<?php foreach($languages as $language) : ?>
				"<div class='input-group'>"+
				"<input class='form-control' type='text' name='title[][<?php echo $language['language_id']; ?>]' value='" + jQuery(obj).attr('data') + "'  />" +
				"<div class='input-group-addon'><img src='view/image/flags/<?php echo $language['image']; ?>'/></div>"+
				"</div>"+
				<?php endforeach;?>
				"<p class='input-item'><a  href='javascript:void(0);' class='remove' onclick='remove_item(this);'>Remove This Menu Item</a></p>"+
				"<p class='input-item'><a  href='javascript:void(0);' class='activemega active' onclick='activemega(this);'>Active Megamenu</a></p>"+
				"<div class='hidden-data'>" +
					"<input type='hidden' class='type' name='type[]' value='" + jQuery(obj).attr('class') + "'/>"+
					"<input type='hidden' class='parent_id' name='parent_id[]' value=''/>"+
					"<input type='hidden' class='type_id' name='type_id[]' value='" + type_id + "'/>"+
					"<input type='hidden' class='url' name='url[]' value=''/>"+
					"<input type='hidden' class='activemega' name='activemega[]' value='0'/>"+
				"</div>"+
				"<div class='sub-menu-content' style='display:none'><div><p class='input-item'><label>Num of Columns : </label><select class='form-control' name='columns[]'><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option></select></p><p class='input-item'><label>Width(Input number only) : </label><div class='input-group'><input class='form-control' name='widths[]' type='text' value=''/><div class='input-group-addon'>Px</div></div></p></div>"+
				"<p><strong>Content of Sub-menu : </strong></p>"+
				<?php foreach($languages as $language) : ?>
				"<p><img src='view/image/flags/<?php echo $language['image']; ?>' title='<?php echo $language['name']; ?>' /> <?php echo $language['name']; ?></p>"+
				"<textarea class='mega-content-editor' name='content_submenu[][<?php echo $language['language_id']; ?>]' style='width: 695px; height: 213px;'></textarea>"+
				<?php endforeach;?>
				"</div>"+
			"</div><a href='javascript:void(0);' class='explane' onclick='explane(this)'>Explane</a></li>";
	return result;
}
function get_content_obj_custom(obj){
	var url=jQuery(obj).parent().find('input.url').val();
	var title=jQuery(obj).parent().find('input.title').val();
	var urlhtml="<p class='input-item'><label>Url : </label><input class='form-control' type='text' name='url[]' value='" + url + "'/></p>";
	var result="<li class='dd-item'><div class='dd-handle'>"+
	"<div class='bar'>"+
		"<span class='title'>" + title + "</span>"+		
	"</div>" + 
	"</div><div class='info hide'>"+
				"<p class='input-item'><span class='type'>Type : Custom</span></p>"+				
				"<p class='input-item'><label>Title : </label></p>"+
				<?php foreach($languages as $language) : ?>
				"<div class='input-group'>"+
				"<input class='form-control' type='text' name='title[][<?php echo $language['language_id']; ?>]' value='" + title + "'  />" +
				"<div class='input-group-addon'><img src='view/image/flags/<?php echo $language['image']; ?>'/></div>"+
				"</div>"+
				<?php endforeach;?>
				urlhtml +
				"<p class='input-item'><a  href='javascript:void(0);' class='remove' onclick='remove_item(this);'>Remove This Menu Item</a></p>"+
				"<p class='input-item'><a  href='javascript:void(0);' class='activemega active' onclick='activemega(this);'>Active Megamenu</a></p>"+
				"<div class='hidden-data'>" +
					"<input type='hidden' class='type' name='type[]' value='custom'/>"+
					"<input type='hidden' class='parent_id' name='parent_id[]' value=''/>"+
					"<input type='hidden' class='type_id' name='type_id[]' value=''/>"+
					"<input type='hidden' class='activemega' name='activemega[]' value='0'/>"+
				"</div>"+
				"<div class='sub-menu-content' style='display:none'><div><p class='input-item'><label>Num of Columns : </label><select class='form-control' name='columns[]'><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option></select></p><p class='input-item'><label>Width(Input number only) : </label><input class='form-control' name='widths[]' type='text' value=''/></p></div>"+
				"<p><strong>Content of Sub-menu : </strong></p>"+
				<?php foreach($languages as $language) : ?>
				"<p><img src='view/image/flags/<?php echo $language['image']; ?>' title='<?php echo $language['name']; ?>' /> <?php echo $language['name']; ?></p>"+
				"<textarea class='mega-content-editor' name='content_submenu[][<?php echo $language['language_id']; ?>]' style='width: 695px; height: 213px;'></textarea>"+
				<?php endforeach;?>
				"</div>"+
			"</div><a href='javascript:void(0);' class='explane' onclick='explane(this)'>Explane</a></li>";
	return result;
}
function goConfigurationTable(){
	if (confirm("All data that hasn't been saved will be lost!") == true) {
        window.location.href = '<?php echo $option_action."&token=".$token;?>';
    }
}
</script>
<?php echo $footer; ?>