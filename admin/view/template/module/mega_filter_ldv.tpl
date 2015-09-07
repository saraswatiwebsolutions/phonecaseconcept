<?php

	if( $type == 'base_attribs' ) {
		$_baseName		= $name;
		$_baseValues	= $base_attribs;

		require DIR_TEMPLATE . 'module/' . $_name . '-base-attribs.tpl';
	} else if( $type == 'attribs' ) {
		$_attribsName	= $name;
		$_attribsValues	= $attribs;

		require DIR_TEMPLATE . 'module/' . $_name . '-attribs.tpl';
	} else if( $type == 'options' ) {
		$_optionsName	= $name;
		$_optionsValues	= $options;

		require DIR_TEMPLATE . 'module/' . $_name . '-options.tpl';
	} else if( $type == 'filters' ) {
		$_filtersName	= $name;
		$_filtersValues	= $filters;

		require DIR_TEMPLATE . 'module/' . $_name . '-filters.tpl';
	}

?>