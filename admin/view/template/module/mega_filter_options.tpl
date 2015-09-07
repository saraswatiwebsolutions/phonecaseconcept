<?php require DIR_TEMPLATE . 'module/' . $_name . '-header.tpl'; ?>
<br /><?php echo $entry_default_values; ?><br /><br />
<?php 
	
	$_optionsName		= $_name . '_options';
	$_optionsValues		= $options;
	
	require DIR_TEMPLATE . 'module/' . $_name . '-options.tpl';
	
?>
			
<?php require DIR_TEMPLATE . 'module/' . $_name . '-footer.tpl'; ?>