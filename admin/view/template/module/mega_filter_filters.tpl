<?php require DIR_TEMPLATE . 'module/' . $_name . '-header.tpl'; ?>
<br /><?php echo $entry_default_values; ?><br /><br />
<?php 
	
	$_filtersName		= $_name . '_filters';
	$_filtersValues		= $filters;
	
	require DIR_TEMPLATE . 'module/' . $_name . '-filters.tpl';
	
?>
			
<?php require DIR_TEMPLATE . 'module/' . $_name . '-footer.tpl'; ?>