<?php echo $header; ?><?php echo $column_left; ?>
<div id="content">
    <div class="page-header">
		<div class="container-fluid">
			<div class="pull-right">
				<a href="<?php echo $insert; ?>" data-toggle="tooltip" title="<?php echo $button_add; ?>" class="btn btn-primary"><i class="fa fa-plus"></i></a>
				<button onclick="$('#form').submit();" title="<?php echo $button_delete; ?>" data-toggle="tooltip" class="btn btn-danger"><i class="fa fa-trash-o"></i></button>
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
		<?php if ($success) { ?>
		<div class="alert alert-success"><i class="fa fa-check-circle"></i> <?php echo $success; ?>
			<button type="button" class="close" data-dismiss="alert">&times;</button>
		</div>
		<?php } ?>
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title"><i class="fa fa-list"></i> <?php echo $text_list; ?></h3>
      </div>
      <div class="panel-body">		
      <form action="<?php echo $delete; ?>" method="post" enctype="multipart/form-data" id="form">      
          <table class="table table-bordered table-striped table-hover">
            <thead>
              <tr>
                <td style="width: 1px;" class="center"><input type="checkbox" onclick="$('input[name*=\'selected\']').prop('checked', this.checked);" /></td>
                <td class="text-left"><?php echo $column_name; ?></td>
                <td class="text-right"><?php echo $column_sort_order; ?></td>
                <td class="text-right"><?php echo $column_status; ?></td>
                <td class="text-right"><?php echo $column_action; ?></td>
              </tr>
            </thead>
            <tbody>
              <?php if ($categories) { ?>
              <?php foreach ($categories as $category) { ?>
              <tr>
                <td class="center"><?php if (in_array($category['category_design_id'], $selected)) { ?>
                  <input type="checkbox" name="selected[]" value="<?php echo $category['category_design_id']; ?>" checked="checked" />
                  <?php } else { ?>
                  <input type="checkbox" name="selected[]" value="<?php echo $category['category_design_id']; ?>" />
                  <?php } ?></td>
                <td class="text-left"><?php echo $category['name']; ?></td>
                <td class="text-right"><?php echo $category['sort_order']; ?></td>
                <td class="text-right"><?php echo $category['status']; ?></td>
                <td class="text-right"><a class="btn btn-primary" data-toggle="tooltip" href="<?php echo $category['edit']; ?>" title="<?php echo $button_edit; ?>"><i class="fa fa-pencil"></i></a></td>
              </tr>
              <?php } ?>
              <?php } else { ?>
              <tr>
                <td class="text-center" colspan="4"><?php echo $text_no_results; ?></td>
              </tr>
              <?php } ?>
            </tbody>
          </table>
       
      </form>
      <div class="row">
          <div class="col-sm-6 text-left"><?php echo $pagination; ?></div>
          <div class="col-sm-6 text-right"><?php echo $results; ?></div>
      </div>
    </div>  
  </div>
 </div>
</div>
<?php echo $footer; ?>