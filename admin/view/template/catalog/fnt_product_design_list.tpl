<?php echo $header; ?><?php echo $column_left; ?>
<div id="content">
    <div class="page-header">
		<div class="container-fluid">
		  <div class="pull-right">
			<a href="<?php echo $insert; ?>" data-toggle="tooltip" title="<?php echo $button_add; ?>"class="btn btn-primary"><i class="fa fa-plus"></i></a>
			<button type="button" class="btn btn-danger" data-toggle="tooltip" title="<?php echo $button_delete; ?>" onclick="confirm('<?php echo $text_confirm; ?>') ? $('#form-product').submit() : false;"><i class="fa fa-trash-o"></i></button>
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
		<div class="well">
			<div class="row">
			  <div class="col-sm-4">
				<div class="form-group">
				  <label class="control-label" for="input-name"><?php echo $entry_name; ?></label>
				  <input type="text" name="filter_name" value="<?php echo $filter_name; ?>" placeholder="<?php echo $entry_name; ?>" id="input-name" class="form-control" />
				</div>
			  </div>
			  <div class="col-sm-4">
				<div class="form-group">
				  <label class="control-label" for="input-status"><?php echo $entry_status; ?></label>
				  <select name="filter_status" id="input-status" class="form-control">
					<option value="*"></option>
					<?php if ($filter_status) { ?>
					<option value="1" selected="selected"><?php echo $text_enabled; ?></option>
					<?php } else { ?>
					<option value="1"><?php echo $text_enabled; ?></option>
					<?php } ?>
					<?php if (($filter_status !== null) && !$filter_status) { ?>
					<option value="0" selected="selected"><?php echo $text_disabled; ?></option>
					<?php } else { ?>
					<option value="0"><?php echo $text_disabled; ?></option>
					<?php } ?>
				  </select>
				</div>
			  </div>
			  <div class="col-sm-1">
				<div class="form-group">				
					<button style="margin-top:23px" type="button" id="button-filter" class="btn btn-primary pull-right"><i class="fa fa-search"></i> <?php echo $button_filter; ?></button>
				</div>	
			  </div>
			</div>
		</div>
		<form action="<?php echo $delete; ?>" method="post" enctype="multipart/form-data" id="form-product">
        <div class="table-responsive">
          <table class="table table-bordered table-striped table-hover">
            <thead>
              <tr>
                <td style="width: 1px;" class="text-center"><input type="checkbox" onclick="$('input[name*=\'selected\']').prop('checked', this.checked);" /></td>
                <td class="text-left"><?php if ($sort == 'pd.name') { ?>
                  <a href="<?php echo $sort_name; ?>" class="<?php echo strtolower($order); ?> asc"><?php echo $entry_name; ?></a>
                  <?php } else { ?>
                  <a class="asc" href="<?php echo $sort_name; ?>"><?php echo $entry_name; ?></a>
                  <?php } ?></td>
                <td class="text-left"><?php if ($sort == 'p.status') { ?>
                  <a href="<?php echo $sort_status; ?>" class="<?php echo strtolower($order); ?>"><?php echo $column_status; ?></a>
                  <?php } else { ?>
                  <a href="<?php echo $sort_status; ?>"><?php echo $column_status; ?></a>
                  <?php } ?></td>
                <td class="text-right"><?php echo $column_action; ?></td>
              </tr>
            </thead>
            <tbody>
              <?php if ($products) { ?>
              <?php foreach ($products as $product) { ?>
              <tr>
                <td class="text-center"><?php if (in_array($product['product_design_id'], $selected)) { ?>
                  <input type="checkbox" name="selected[]" value="<?php echo $product['product_design_id']; ?>" checked="checked" />
                  <?php } else { ?>
                  <input type="checkbox" name="selected[]" value="<?php echo $product['product_design_id']; ?>" />
                  <?php } ?></td>
                <td class="text-left"><?php echo $product['name']; ?></td>
                <td class="text-left"><?php echo $product['status']; ?></td>
                <td class="text-right"><a href="<?php echo $product['edit']; ?>" data-toggle="tooltip" title="<?php echo $button_edit; ?>" class="btn btn-primary"><i class="fa fa-pencil"></i></a></td>
              </tr>
              <?php } ?>
              <?php } else { ?>
              <tr>
                <td class="text-center" colspan="8"><?php echo $text_no_results; ?></td>
              </tr>
              <?php } ?>
            </tbody>
          </table>
        </div>
      </form>
      <div class="row">
        <div class="col-sm-6 text-left"><?php echo $pagination; ?></div>
		<div class="col-sm-6 text-right"><?php echo $results; ?></div>
      </div>
    </div>  
  </div>
</div>
<script type="text/javascript"><!--
$('#button-filter').on('click', function() {
	var url = 'index.php?route=catalog/fnt_product_design&token=<?php echo $token; ?>';
	
	var filter_name = $('input[name=\'filter_name\']').val();
	
	if (filter_name) {
		url += '&filter_name=' + encodeURIComponent(filter_name);
	}
	var filter_status = $('select[name=\'filter_status\']').val();
	
	if (filter_status != '*') {
		url += '&filter_status=' + encodeURIComponent(filter_status);
	}	

	location = url;
});
//--></script> 
<script type="text/javascript"><!--
$('input[name=\'filter_name\']').autocomplete({
	'source': function(request, response) {
		$.ajax({
			url: 'index.php?route=catalog/fnt_product_design/autocomplete&token=<?php echo $token; ?>&filter_name=' +  encodeURIComponent(request),
			dataType: 'json',			
			success: function(json) {
				response($.map(json, function(item) {
					return {
						label: item['name'],
						value: item['product_design_id']
					}
				}));
			}
		});
	},
	'select': function(item) {
		$('input[name=\'filter_name\']').val(item['label']);
	}	
});
//--></script></div>
<?php echo $footer; ?>