<?php require DIR_TEMPLATE . 'module/' . $_name . '-header.tpl'; ?>

<div class="col-xs-2">
	<ul class="nav nav-tabs tabs-left" id="nav-tabs">
		<?php $module_row = 1; ?>

		<?php foreach ($modules as $row => $module) { ?>
			<li<?php echo $module_row == 1 ? ' class="active"' : ''; ?>>
				<a href="#tab-module-<?php echo $row; ?>" id="module-<?php echo $row; ?>">
					<b style="font-weight:normal"><?php echo ! empty( $module['name'] ) ? $module['name'] : $tab_module . ' ' . $row; ?></b>
					<span class="btn btn-danger btn-xs pull-right"><i class="glyphicon glyphicon-remove"></i></span>
				</a>
			</li>
			<?php $module_row++; ?>
		<?php } ?>
		<li id="module-add"><a style="background: none !important; border:none !important;" id="add-new-module" class="pull-right"><span class="btn btn-success btn-xs pull-right"><i class="glyphicon glyphicon-plus-sign"></i> <?php echo $button_add_module; ?></span></a></li>
	</ul>
</div>

<div class="col-xs-10">
	<div class="tab-content" id="tab-content"></div>
</div>

<div class="clearfix"></div>

<script type="text/javascript">
	var MF_AJAX_PARAMS = '<?php echo $HTTP_URL ? "&option=com_mijoshop&format=raw" : ""; ?>';
	
////////////////////////////////////////////////////////////////////////////////

	$jQuery(document).on('click', '.scrollbox div a', function() {
		var $self	= jQuery(this),
			$parent	= $self.parent(),
			$box	= $parent.parent();

		$parent.remove();

		$box.find('div:odd').attr('class', 'odd');
		$box.find('div:even').attr('class', 'even');
	});

	if( typeof Array.prototype.indexOf == 'undefined' ) {
		Array.prototype.indexOf = function(obj, start) {
			for( var i = ( start || 0 ), j = this.length; i < j; i++ ) {
				if( this[i] === obj ) { return i; }
			}

			return -1;
		};
	}

////////////////////////////////////////////////////////////////////////////////

jQuery('#mf-save-form').click(function(){
	MFP.save( '<?php echo $text_saving_please_wait; ?>', function(){
		var $form = $$('#form');
		
		$form.after($$('<form id="mf-form">')
			.attr('method', 'post')
			.attr('action', $form.attr('action'))
		);
	
		$$('#mf-form').submit();
	});
});

jQuery('#form').attr('data-to-ajax','1');

var MFP = {
	_cnt		: null,
	_cntId		: '#tab-content',
	_row		: 1,
	_tab		: 1,
	_name		: '<?php echo $_name; ?>',
	_hasFilters	: <?php echo isset( $tab_filters_link ) ? 'true' : 'false'; ?>,
	_langs		: null,
	_layouts	: null,
	_settings	: null,	

	init: function( modules, firstModule ) {
		var self = this;
		
		self._cnt		= jQuery(self._cntId);
		
		jQuery('#add-new-module').click(function(){
			self._row = jQuery('#nav-tabs > li:not([id="module-add"]):last');
			
			if( self._row.length ) {
				self._row = parseInt( self._row.find('> a').attr('id').split('-')[1] ) + 1;
			} else {
				self._row = 1;
			}
			
			(function( row ){
				var $li = jQuery('<li>')
					.append(jQuery('<a>')
						.attr({
							'href'	: '#tab-module-' + row,
							'id'	: 'module-' + row
						})
						.append(jQuery('<b>')
							.css('font-weight', 'normal')
							.text('<?php echo $tab_module; ?> ' + row)
						)
						.append(jQuery('<span>')
							.addClass('btn btn-danger btn-xs pull-right')
							.append(jQuery('<i>')
								.addClass('glyphicon glyphicon-remove')
							)
						)
					);

				jQuery('#module-add')
					.before( $li );
				
				self._initTab( $li );
				self._selectTab( $li, false );
				
				self.addModule('', null);
			})( self._row );
			
			return false;
		});
		
		$$('#nav-tabs > li:not([id=module-add])').each(function(){
			self._initTab( $$(this) );
		});
		
		$$('#nav-tabs > li:not([id=module-add]):first a').trigger('click');
	},
	
	_selectTab: function( $tab, load ) {
		if( ! $tab.length ) return;
	
		var self = this,
			newId = $tab.find('a').attr('id').split('-')[1],
			currId = $$('#tab-content > div.active');
		
		if( ! currId.length ) {
			currId = null;
		} else {
			currId = currId.attr('id').split('-')[2];
		}
		
		if( currId == newId )
			return;
		
		function selectTab() {
			function showTab( data ) {
				$$('#nav-tabs > li.active').removeClass('active');
				$$('#tab-content > div').remove();

				$tab.addClass('active');
				
				self._row = newId;
				
				self.addModule(data.name, data);
			}
			
			if( load ) {
				var $progress = self.createProgress('<?php echo $text_loading_please_wait; ?>');
				
				$$.get( '<?php echo $action_get_data; ?>'.replace(/&amp;/g,'&') + MF_AJAX_PARAMS + '&mf_id=' + newId, {}, function( response ){
					$progress.remove();
					showTab( $$.parseJSON( response ) );
				});
			} else {
				showTab({name:''});
			}
		}
		
		if( currId !== null ) {
			self.save( '<?php echo $text_loading_please_wait; ?>', function(){
				selectTab();
				
				return true;
			});
		} else {
			selectTab();
		}
	},
	
	_initTab: function( $tab ) {
		var self = this;
		
		$tab.find('> a').each(function(){
			var row = $$(this).attr('id').split('-')[1];
			
			$$(this).find('.btn-danger').click(function(){				
				jQuery('#module-'+row).parent().remove();
				jQuery('#tab-module-'+row).remove();
				
				$$.get( '<?php echo $action_remove_data; ?>'.replace(/&amp;/g,'&') + MF_AJAX_PARAMS + '&mf_id=' + row );
				
				if( row == self._row ) {
					self._selectTab( $$('#nav-tabs li:not([id=module-add]):first'), true );
				}
				
				return false;
			});
			
			$$(this).click(function(){
				self._selectTab( $tab, true );
				
				return false;
			});
		});
	},
	
	createProgress: function( text ){
		return jQuery('<div style="position:absolute; z-index:99; left: 0; top: 0; background: rgba(255,255,255,0.5);" class="mega-filter-pro">')
			.append('<div style="color: #fff; margin: 0 auto; margin-top:100px; width: 300px; background: rgba(0,0,0,0.6); padding: 10px; border-radius: 5px; text-align: center;">' + text + '</div>')
			.width( jQuery('#mf-main-content').outerWidth(true)+30 )
			.height( jQuery('#content').outerHeight(true) )
			.prependTo( jQuery('#mf-main-content') );
	},
	
	save: function( txt, fn, pager ) {
		var $module = $$('#tab-content > .tab-pane.active');
		
		if( ! $module.length ) {
			if( fn() === true ) {
				$progress.remove();
			}
			
			return;
		}
		
		var
			$progress = this.createProgress( txt ),
			id = $module.attr('id').split('-')[2],
			perPage = 500,
			tmp = jQuery('#form').formToArray(),
			pages = Math.ceil( tmp.length / perPage )-1;
			pager = typeof pager == 'undefined' || ! pager ? 0 : 1;
			
		function getData( idx ) {
			var data = [];
			
			for( var i = idx * perPage; i < idx * perPage + perPage; i++ ) {
				if( typeof tmp[i] == 'undefined' ) break;
				
				data.push( tmp[i] );
			}
			
			return $$.param( data );
		}
		
		function save( idx ) {
			$$.post( '<?php echo $action_save_data; ?>'.replace(/&amp;/g,'&') + MF_AJAX_PARAMS + '&mf_idx=' + idx + '&mf_count=' + pages + '&mf_id=' + id + '&mf_pager=' + pager, getData( idx ), function(){
				if( idx < pages ) {
					save( idx + 1 );
				} else {
					if( fn() === true ) {
						$progress.remove();
					}
				}
			});
		}
		
		save( 0 );
	},
	
	addModule: function( name, data, row ){		
		var self	= this,
			/**
			 * Nazwa zakładki
			 */
			$name	= jQuery('<table class="table table-tbody">')
				.append(jQuery('<tr>')
					.append( '<td><?php echo $entry_name; ?></td>' )
					.append(jQuery('<td>')
						.append( self.createField( 'text', '[name]', name, { 'class' : 'mf_tab_name', 'id' : 'name-' + self._row } ) )
					)
				),
			/**
			 * Tytuł boxa
			 */
			$title	= jQuery('<div>')
				.append((function(){
					var $ul = jQuery('<ul id="language-' + self._row + '" class="nav nav-tabs">'),
						k = 0, i;
					
					for( i in self._langs ) {
						if( typeof self._langs[i] == 'function' ) continue;
						
						$ul.append(jQuery('<li' + ( k ? '' : ' class="active"' ) + '>')
							.append(jQuery('<a data-toggle="tab" href="#tab-language-' + self._row + '-' + self._langs[i].language_id + '">')
								.append(jQuery('<img src="view/image/flags/' + self._langs[i].image + '" title="' + self._langs[i].name + '">'))
								.append( ' ' + self._langs[i].name )
							)
						);
						k++;
					}
					
					return $ul;
				})())
				.append((function(){
					var $tc = jQuery('<div class="tab-content">'),
						k = 0, i;
					
					for( i in self._langs ) {
						if( typeof self._langs[i] == 'function' ) continue;
						
						$tc.append(jQuery('<div class="tab-pane' + ( k ? '' : ' active' ) + '" id="tab-language-' + self._row + '-' + self._langs[i].language_id + '">')
							.append(jQuery('<table class="table table-tbody">')
								.append(jQuery('<tr>')
									.append(jQuery('<td width="200"><?php echo $entry_title; ?></td>'))
									.append(jQuery('<td data-name="title-' + i + '">'))
								)
							)
						);
						k++;
					}
					
					return $tc;
				})()), 
			$tabs	= jQuery('<ul id="c-tabs-' + self._row + '" class="nav nav-tabs">')
				.append('<li class="active"><a data-toggle="tab" href="#tab-' + self._row + '-settings"><i class="glyphicon glyphicon-cog"></i> <?php echo $tab_settings; ?></a></li>')
				.append('<li><a data-toggle="tab" href="#tab-' + self._row + '-base-attributes"><i class="glyphicon glyphicon-wrench"></i> <?php echo $tab_base_attributes; ?></a></li>')
				.append('<li><a data-toggle="tab" href="#tab-' + self._row + '-attribs"><i class="glyphicon glyphicon-list"></i> <?php echo $tab_attributes; ?></a></li>')
				.append('<li><a data-toggle="tab" href="#tab-' + self._row + '-options"><i class="glyphicon glyphicon-list"></i> <?php echo $tab_options; ?></a></li>')
				.append(self._hasFilters?'<li><a data-toggle="tab" href="#tab-' + self._row + '-filters"><i class="glyphicon glyphicon-filter"></i> <?php echo $tab_filters; ?></a></li>':'')
				.append('<li><a data-toggle="tab" href="#tab-' + self._row + '-categories"><i class="glyphicon glyphicon-list-alt"></i> <?php echo $tab_categories; ?></a></li>'),
			$tc		= jQuery('<div class="tab-content">')
				/**
				 * SETTINGS
				 */
				.append(jQuery('<div id="tab-' + self._row + '-settings" class="tab-pane active">')
					.append(jQuery('<table class="table table-tbody">')
						.append(jQuery('<tr>')
							.append('<td width="200"><?php echo $entry_layout; ?><span class="help"><?php echo $text_checkbox_guide; ?></span></td>')
							.append(jQuery('<td data-name="layout">'))
						)
						.append(jQuery('<tr id="category_id-input-' + self._row + '" data-name="layout-1">')
							.append('<td><?php echo $entry_show_in_categories; ?><span class="help"><?php echo $text_autocomplete; ?></span></td>')
							.append(jQuery('<td data-name="category-name">'))
						)
						.append(jQuery('<tr id="category_id-list-' + self._row + '" data-name="category-list">')
							.append('<td><span class="help"><?php echo $text_checkbox_guide; ?></span></td>')
							.append(jQuery('<td>')
								.append( self.createScrollbox( 'category_id-', 'delete', '[category_id][]', typeof self._categories[self._row] == 'undefined' ? [] : self._categories[self._row] ) )
							)
						)
						.append(jQuery('<tr id="category_id-hide-input-' + self._row + '" data-name="category-hide-input">')
							.append('<td><?php echo $entry_hide_in_categories; ?><span class="help"><?php echo $text_autocomplete; ?></span></td>')
							.append(jQuery('<td data-name="category-hide-name">'))
						)
						.append(jQuery('<tr id="category_id-hide-list-' + self._row + '" data-name="category-hide-list">')
							.append('<td><span class="help"><?php echo $text_checkbox_guide; ?></span></td>')
							.append(jQuery('<td>')
								.append( self.createScrollbox( 'hide_category_id-', 'delete', '[hide_category_id][]', typeof self._hideCategories[self._row] == 'undefined' ? [] : self._hideCategories[self._row] ) )
							)
						)
						.append(jQuery('<tr>')
							.append('<td><?php echo $entry_store; ?></td>')
							.append('<td data-name="store-id"></td>')
						)
						.append(jQuery('<tr>')
							.append('<td><?php echo $entry_customer_groups; ?><span class="help"><?php echo $text_checkbox_guide; ?></span></td>')
							.append('<td data-name="customer-groups"></td>')
						)
						.append(jQuery('<tr>')
							.append('<td><?php echo $entry_position; ?></td>')
							.append('<td data-name="position"></td>')
						)
						.append(jQuery('<tr>')
							.append('<td><?php echo $entry_display_options_inline_horizontal; ?></td>')
							.append('<td data-name="inline-horizontal"></td>')
						)
						.append(jQuery('<tr>')
							.append('<td><?php echo $entry_status; ?></td>')
							.append('<td data-name="status"></td>')
						)
						.append(jQuery('<tr>')
							.append('<td><?php echo $entry_sort_order; ?></td>')
							.append('<td data-name="sort-order"></td>')
						)
					)
				)
				/**
				 * BASE ATTRIBUTES
				 */
				.append( self.createContainer( 'base-attributes', 'base_attribs' ) )
				/**
				 * ATTRIBUTES
				 */
				.append( self.createContainer( 'attribs' ) )
				/**
				 * OPTIONS
				 */
				.append( self.createContainer( 'options' ) )
				/**
				 * OPTIONS
				 */
				.append( self._hasFilters ? self.createContainer( 'filters' ) : '' )
				/**
				 * CATEGORIES
				 */
				.append( jQuery('<div data-name="categories">') ),
			$module = jQuery('<div id="tab-module-' + self._row + '" class="tab-pane">')
				.append( $name )
				.append( $title )
				.append( $tabs )
				.append( $tc );
		
		self._cnt.append( $module );
		
		if( data !== null ) {
			self._initModule( $module, data );
		}
	},
	
	_initModule: function( $module, data ) {
		var self = this,
			row = $module.attr('id').split('-')[1];
		
		$module.addClass('active');
		
		/**
		 * Tytuł
		 */
		for( var i in self._langs ) {
			if( typeof self._langs[i] == 'function' ) continue;

			$module.find('[data-name="title-' + i + '"]').append( self.createField( 
				'text', 
				'[title][' + self._langs[i].language_id + ']',
				typeof data['title'] != 'undefined' && typeof data['title'][self._langs[i].language_id] != 'undefined' ? data['title'][self._langs[i].language_id] : '',
				{ 'style' : 'width:400px' }
			));
		}
	
		/**
		 * Layout
		 */		
		$module.find('[data-name="layout"]').append( self.createScrollbox( 'layout_id-', 'checkbox', '[layout_id][]', self._layouts, 'layout_id', typeof data['layout_id'] != 'undefined' ? data['layout_id'] : [] ) );
		
		$module.find('[data-name="layout-1"]')[typeof data['layout_id'] == 'undefined' || data['layout_id'].indexOf( self._settings['layout_c'] ) < 0?'hide':'show']();
		
		$module.find('[data-name="category-name"]')
			.append( self.createField( 'text', null, '', { 'name' : 'category-name' } ) )
			.append( self.createField( 'checkbox', '[category_id_with_childs]', '1', {
				'checked'	: data['category_id_with_childs'] ? true : false,
				'style'		: 'margin: 0 5px; vertical-align:middle;'
			}))
			.append( '<?php echo $text_apply_also_to_childs; ?>' );
		
		$module.find('[data-name="category-list"]')[typeof data['layout_id'] == 'undefined' || data['layout_id'].indexOf( self._settings['layout_c'] ) < 0?'hide':'show']();
		
		$module.find('[data-name="category-hide-input"]')[typeof data['layout_id'] == 'undefined' || data['layout_id'].indexOf( self._settings['layout_c'] ) < 0?'hide':'show']();
		
		$module.find('[data-name="category-hide-name"]')
			.append( self.createField( 'text', null, '', { 'name' : 'category-hide-name' } ) )
			.append( self.createField( 'checkbox', '[hide_category_id_with_childs]', '1', {
				'checked'	: data['hide_category_id_with_childs'] ? true : false,
				'style'		: 'margin: 0 5px; vertical-align:middle;'
			}))
			.append( '<?php echo $text_apply_also_to_childs; ?>' );
		
		$module.find('[data-name="category-hide-list"]')[typeof data['layout_id'] == 'undefined' || data['layout_id'].indexOf( self._settings['layout_c'] ) < 0?'hide':'show']();
		
		/**
		 * Sklepy
		 */
		$module.find('[data-name="store-id"]')
			.append( self.createScrollbox( 'store_id-', 'checkbox', '[store_id][]', self._stores, 'store_id', typeof data['store_id'] != 'undefined' ? data['store_id'] : [] ) );
		
		/**
		 * Grupy użytkownika
		 */
		$module.find('[data-name="customer-groups"]')
			.append( self.createScrollbox( 'customer_groups-', 'checkbox', '[customer_groups][]', self._customerGroups, 'customer_group_id', typeof data['customer_groups'] != 'undefined' ? data['customer_groups'] : [] ) );
		
		/**
		 * Pozycja
		 */
		$module.find('[data-name="position"]')
			.append( self.createField( 'select', '[position]', data['position'], {
				'multiOptions' : {
				'items' : {
				'column_left'	: '<?php echo $text_column_left; ?>',
				'column_right'	: '<?php echo $text_column_right; ?>',
				'content_top'	: '<?php echo $text_content_top; ?>'
				}
			}
		}));
		
		/**
		 * Inline horizontal
		 */
		$module.find('[data-name="inline-horizontal"]')
			.append( self.createField( 'checkbox', '[inline_horizontal]', '1' ).attr( 'checked', typeof data['inline_horizontal'] != 'undefined' && data['inline_horizontal'] ? true : false ) );
		
		/**
		 * Status
		 */
		$module.find('[data-name="status"]')
			.append( self.createField( 'select', '[status]', data['status'], {
				'multiOptions' : {
				'items' : {
					'1' : '<?php echo $text_enabled; ?>',
					'0' : '<?php echo $text_disabled; ?>'
				}
			}
		}));
		
		/**
		 * Sortowanie
		 */
		$module.find('[data-name="sort-order"]')
			.append( self.createField( 'text', '[sort_order]', data['sort_order'], {
				'size' : '3'
			}
		));
		
		/**
		 * Kategorie
		 */
		$module.find('[data-name="categories"]').before( self.createCategories( data['categories'] ) ).remove();
		
		////////////////////////////////////////////////////////////////////////
		
		/**
		 * Wczytaj zewnętrzne widoki dla atrybutów/opcji/filtrów
		 */
		$module.find('[data-load-type]').bind('click',function(){
			var _this		= jQuery(this),
				parent		= _this.parent(),
				type		= _this.attr('data-load-type'),
				row			= parent.attr('id').split('-')[1],
				container	= parent.find('> .cnt'),
				$progress	= null;
				
			if( _this.attr('data-loaded') && ! confirm( '<?php echo $text_are_you_sure; ?>' ) ) {
				return false;
			}
				
			parent.find('.mf-filter button').unbind('click').bind('click', function(){
				self.save('<?php echo $text_loading_please_wait; ?>', function(){
					load('&filter=' + encodeURIComponent( parent.find('.mf-filter input').val() ) );
					
					return true;
				});
			});

			container.html( '<center><?php echo $text_loading; ?></center>' );
			
			function load( params ) {
				var url = '<?php echo $action_ldv; ?>'.replace(/&amp;/g,'&')+MF_AJAX_PARAMS;
				
				if( ! params && _this.attr('data-loaded') ) {
					url += '&mf_default=1';
				}
				
				_this.attr('data-loaded', 1);
				
				jQuery.get( url+params, { 'name' : '<?php echo $_name; ?>_module[' + type + ']', 'type' : type, 'idx' : row }, function( response ){
					container.html( response );
					
					if( $progress != null ) {
						$progress.remove();
						$progress = null;
					}

					container.find('.pagination a').click(function(){
						var page = jQuery(this).attr('href').match(/page=([0-9]+)/)[1];

						self.save( '<?php echo $text_loading_please_wait; ?>', function(){
							$progress = self.createProgress( '<?php echo $text_loading_please_wait; ?>' );

							load( '&page=' + page );

							return true;
						});

						return false;
					});
				});
			}
			
			load('');

			return false;
		});
		
		/**
		 * Pokaż/ukryj pola wyboru kategorii po zaznaczeniu/odznaczeniu szablonu kategorii
		 */
		$module.find('input[type=checkbox][id^=layout_id-]').unbind('change').bind('change', function(){
			var id	= jQuery(this).attr('id').split('-');
			
			$module.find('input[type=checkbox][id^=layout_id-' + id[1] + '][value=' + self._settings['layout_c'] + ']').each(function(){
				var $items = jQuery('tr[id=category_id-input-' + id[1] + '],tr[id=category_id-list-' + id[1] + '],tr[id=category_id-hide-input-'+id[1]+'],tr[id=category_id-hide-list-'+id[1]+']');
				
				if( ! jQuery(this).is(':checked') ) {
					$items.hide();
				} else {
					$items.removeAttr('style');
				}
			});
		});

		/**
		 * Autouzupełnianie pola nazwy kategorii dla listy gdzie moduł ma być widoczny
		 */
		$module.find('input[name="category-name"]:not([autocomplete])').each(function(){
			var $self = jQuery(this),
				id = $self.parent().parent().attr('id'),
				nr = id.split('-')[2],
				$c = jQuery('#category_id-list-' + nr).find('.scrollbox');
			
			jQuery(this).attr('autocomplete','1').autocomplete({
				delay: 500,
				source: function(request, response) {
					if( $self.val() ) {
						jQuery.ajax({
							url: 'index.php?route=module/mega_filter/category_autocomplete&token=<?php echo $token; ?>&filter_name=' +  encodeURIComponent($self.val())+MF_AJAX_PARAMS,
							dataType: 'json',
							success: function(json) {		
								response(jQuery.map(json, function(item) {
									return {
										label: item.name,
										value: item.category_id
									}
								}));
							}
						});
					}
				}, 
				select: function(event, ui) {
					$c.find('input[value=' + ui.item.value + ']').parent().remove();

					$c.append('<div>' + ui.item.label + '<a class="btn btn-danger btn-xs pull-right"><i class="fa fa-remove"></i></a><input type="hidden" name="<?php echo $_name; ?>_module[category_id][]" value="' + ui.item.value + '" /></div>');

					$c.find('div:odd').attr('class', 'odd');
					$c.find('div:even').attr('class', 'even');

					return false;
				},
				focus: function(event, ui) {
				return false;
			}
			});
		});

		/**
		 * Autouzupełnianie pola nazwy kategorii dla listy gdzie moduł ma być ukryty
		 */
		$module.find('input[name="category-hide-name"]:not([autocomplete])').each(function(){
			var $self = jQuery(this),
				id = jQuery(this).parent().parent().attr('id'),
				nr = id.split('-')[3],
				$c = jQuery('#category_id-hide-list-' + nr).find('.scrollbox');
			
			jQuery(this).attr('autocomplete','1').autocomplete({
				delay: 500,
				source: function(request, response) {
					if( $self.val() ) {
						jQuery.ajax({
							url: 'index.php?route=catalog/category/autocomplete&token=<?php echo $token; ?>&filter_name=' +  encodeURIComponent($self.val()) + MF_AJAX_PARAMS,
							dataType: 'json',
							success: function(json) {		
								response(jQuery.map(json, function(item) {
									return {
										label: item.name,
										value: item.category_id
									}
								}));
							}
						});
					}
				}, 
				select: function(event, ui) {
					$c.find('input[value=' + ui.item.value + ']').parent().remove();

					$c.append('<div>' + ui.item.label + '<a class="btn btn-danger btn-xs pull-right"><i class="fa fa-remove"></i></a><input type="hidden" name="<?php echo $_name; ?>_module[hide_category_id][]" value="' + ui.item.value + '" /></div>');

					$c.find('div:odd').attr('class', 'odd');
					$c.find('div:even').attr('class', 'even');

					return false;
				},
				focus: function(event, ui) {
					return false;
				}
			});
		});
		
		/**
		 * Automatycznia zmiana nazwy zakładki po wpisaniu jej w pole "name" 
		 */
		$module.find('input.mf_tab_name').bind('change keyup', function(){
			var val = jQuery(this).val(),
				id	= jQuery(this).attr('id').split('-')[1];
			
			if( ! val ) {
				val = '<?php echo $tab_module; ?> ' + id;
			}
			
			jQuery('#module-' + id).find('b').text( val );
		}).trigger('change');
		
		$module.find('select[name="mega_filter_module[position]"]').change(function(){
			$module.find('[data-name="inline-horizontal"]').parent()[jQuery(this).val()=='content_top'?'show':'hide']();
		}).trigger('change');
		
		$module.find('a[data-load-type]').trigger('click');
	},
	
	createCategories: function( data ) {
		var self	= this,
			row		= self._row,
			idx		= 0,
			box		= jQuery('<div id="tab-' + row + '-categories" class="tab-pane">')
				.append(jQuery('<div class="btn-group btn-group-sm" style="margin: 10px 0">')
					.append(jQuery('<button type="button" disabled="disabled" class="btn btn-default" style="color: #000; opacity: 1;"><?php echo $entry_add_new_type; ?></button>'))
					.append(jQuery('<button type="button" data-type="related" class="btn btn-primary enable"><i class="glyphicon glyphicon-plus-sign"></i> <?php echo $text_related; ?></button>'))
					.append(jQuery('<button type="button" data-type="tree" class="btn btn-primary enable"><i class="glyphicon glyphicon-plus-sign"></i> <?php echo $text_tree; ?></button>'))
					.append(jQuery('<button type="button" data-type="cat_checkbox" class="btn btn-primary enable"><i class="glyphicon glyphicon-plus-sign"></i> <?php echo $text_cat_checkbox; ?></button>'))
				),
			cnt		= jQuery('<div class="cnt">')
				.appendTo( box ),
			types	= {
				'related'		: '<?php echo $text_related; ?>',
				'tree'			: '<?php echo $text_tree; ?>',
				'cat_checkbox'	: '<?php echo $text_cat_checkbox; ?>'
			};
				
		box.find('[data-type]').click(function(){
			var type = jQuery(this).attr('data-type');
			
			if( type == 'tree' ) {
				if( cnt.find('[data-type="tree"]').length ) {
					alert( '<?php echo addslashes( $error_tree_categories_duplicate ); ?>' );

					return false;
				} else if( ! MFP._settings.show_products_from_subcategories ) {
					alert( '<?php echo addslashes( $text_tree_categories_info ); ?>' );
				}
			} else if( type == 'cat_checkbox' ) {
				if( cnt.find('[data-type="cat_checkbox"]').length ) {
					alert( '<?php echo addslashes( $error_cat_checkbox_categories_duplicate ); ?>' );

					return false;
				} else if( ! MFP._settings.show_products_from_subcategories ) {
					alert( '<?php echo addslashes( $text_tree_categories_info ); ?>' );
				}
			}
			
			add( type );
			
			mf_footer_ready();
			
			return false;
		});
		
		function add( type, data ) {
			var tbody	= jQuery('<tbody>'),
				name	= self._name + '_module[categories][' + idx + ']',
				lIdx	= 0;
			
			function addLevel( names ) {
				tbody.find('tr.add_level').before( jQuery('<tr class="levels">')
					.append( '<td class="text-right"><?php echo $entry_level_name; ?></td>' )
					.append(jQuery('<td>')
						.append((function(){
							var $div = jQuery('<div class="pull-left">'),
								i, j = 0;
							
							for( i in self._langs ) {
								if( typeof self._langs[i] == 'function' ) continue;
						
								if( j )
									$div.append('<div style="height:3px"></div>');
							
								$div.append('<img src="view/image/flags/' + self._langs[i].image + '"> ')
									.append(self.createField( 'text', null, typeof names != 'undefined' && typeof names[self._langs[i].language_id] != 'undefined' ? names[self._langs[i].language_id] : '', {
											'name'	: name + '[levels][' + lIdx + '][' + self._langs[i].language_id + ']'
										})
									);
								j++;
							}
							
							return $div;
						})())
						.append(jQuery('<a href="#" class="btn btn-danger btn-xs pull-left" style="margin: -3px 0 0 3px"><i class="glyphicon glyphicon-remove"></i></a>')
							.click(function(){
								jQuery(this).parent().parent().remove();
								
								return false;
							})
						)
					) 
				);
				
				lIdx++;
			}
			
			if( type == 'related' ) {
				tbody.append(jQuery('<tr>')
					.append('<td><?php echo $entry_root_category; ?><span class="help"><?php echo $text_autocomplete; ?></span></td>')
					.append(jQuery('<td>')
						.append( '<input type="radio"' + ( typeof data != 'undefined' && data.root_category_type == 'top_category' ? ' checked="checked"' : '' ) + ' name="' + name + '[root_category_type]" value="top_category" style="margin: 0; vertical-align: middle;" id="root-cat-type-' + self._row + '-' + idx + '-a" /> <label for="root-cat-type-' + self._row + '-' + idx + '-a" style="margin-right:10px"><?php echo $text_top_category; ?></label>' )
						.append( '<input type="radio"' + ( typeof data != 'undefined' && data.root_category_type == 'by_url' ? ' checked="checked"' : '' ) + ' name="' + name + '[root_category_type]" value="by_url" style="margin: 0; vertical-align: middle;" id="root-cat-type-' + self._row + '-' + idx + '-b" /> <label for="root-cat-type-' + self._row + '-' + idx + '-b" style="margin-right:10px"><?php echo $text_current_category; ?></label>' )
						.append( '<input type="radio"' + ( typeof data != 'undefined' && data.root_category_type == 'default_category' ? ' checked="checked"' : '' ) + ' name="' + name + '[root_category_type]" value="default_category" style="margin: 0; vertical-align: middle;" id="root-cat-type-' + self._row + '-' + idx + '-c" /> <label for="root-cat-type-' + self._row + '-' + idx + '-c" style="margin-right:10px"><?php echo $text_or_select_category; ?></label>' )
						.append( self.createField( 'text', null, typeof data == 'undefined' || typeof self._categoriesNames[data.root_category_id] == 'undefined' ? '' : self._categoriesNames[data.root_category_id] ).each(function(){
							var $self = jQuery(this);
						
							setTimeout(function(){
								$self.attr('autocomplete','1').autocomplete({
									delay: 500,
									source: function( request, response ) {
										if( $self.val() ) {
											jQuery.ajax({
												url: 'index.php?route=catalog/category/autocomplete&token=<?php echo $token; ?>&filter_name=' +  encodeURIComponent( $self.val() ) + MF_AJAX_PARAMS,
												dataType: 'json',
												success: function(json) {		
													response(jQuery.map(json, function(item) {
														return {
															label: item.name,
															value: item.category_id
														};
													}));
												}
											});
										}
									},
									select: function( event, ui ) {
										var $parent = $self.parent();

										$parent.find('[name="' + name + '[root_category_id]"]').remove();
										$parent.append( self.createField( 'hidden', null, ui.item.value, {
											'name' : name + '[root_category_id]'
										}));

										$self.val( ui.item.label );

										return false;
									},
									focus: function( event, ui ) {
										return false;
									}
								});
							},1000);
						}).change(function(){
							if( ! jQuery(this).val() )
								jQuery(this).parent().find('[name="' + name + '[root_category_id]"]').remove();
						}))
						.append( typeof data == 'undefined' ? '' : self.createField( 'hidden', null, data.root_category_id, {
							'name' : name + '[root_category_id]'
						}))
					)
				).append(jQuery('<tr class="add_level">')
					.append('<td></td>')
					.append(jQuery('<td>')
						.append(jQuery('<a href="#" class="btn btn-info btn-xs"><i class="glyphicon glyphicon-plus-sign"></i> <?php echo $text_add_level; ?></a>')
							.click(function(){
								addLevel();
							
								return false;
							})
						)
					)
				);
			
				// auto levels
				tbody.append(jQuery('<tr>')
					.append('<td width="200"><?php echo $text_auto_levels; ?>:</td>')
					.append(jQuery('<td>')
						.append( self.render_btn_group( name + '[auto_levels]', typeof data == 'undefined' || data.auto_levels != '1' ? false : true ) )
					)
				);
			
				// show button
				tbody.append(jQuery('<tr>')
					.append('<td width="200"><?php echo $entry_show_button; ?></td>')
					.append(jQuery('<td>')
						.append( self.render_btn_group( name + '[show_button]', typeof data == 'undefined' || data.show_button != '1' ? false : true ) )
					)
				);
			}
			
			// collapsed
			tbody.append(jQuery('<tr>')
				.append('<td width="200"><?php echo $text_collapsed_by_default; ?>:</td>')
				.append(jQuery('<td>')
					.append( self.render_btn_collapsed( name + '[collapsed]', typeof data == 'undefined' ? '0' : data.collapsed ) )
				)
			);
			
			// sort
			tbody.append(jQuery('<tr>')
				.append('<td width="200"><?php echo $entry_sort_order; ?></td>')
				.append(jQuery('<td>')
					.append( self.createField( 'text', null, typeof data == 'undefined' ? '' : data.sort_order, {
						'name'	: name + '[sort_order]',
						'size'	: '3'
					}))
					.append( self.createField( 'hidden', null, type, {
						'name'	: name + '[type]'
					}))
				)
			);
			
			cnt.append(jQuery('<table class="table table-tbody" data-type="' + type + '">')
				.append(jQuery('<thead>')
					.append(jQuery('<tr>')
						.append(jQuery('<th colspan="2">')
							.append(jQuery('<div class="pull-left">')
								.append((function(){
									var $div = jQuery('<div class="input-group input-group-sm">')
										.append('<span class="input-group-addon">#' + types[type] + '</span>'),
										j = 0;
									
									for( var i in self._langs ) {
										if( typeof self._langs[i] == 'function' ) continue;
						
										$div.append( self.createField( 'text', null, typeof data == 'undefined' ? '' : ( typeof data.name[self._langs[i].language_id] == 'undefined' ? '' : data.name[self._langs[i].language_id] ), {
											'name'	: name + '[name][' + self._langs[i].language_id + ']',
											'class'	: 'form-control',
											'style'	: 'width:300px; margin: ' + ( j ? '2' : '0' ) + 'px 3px 0 0;',
											'placeholder' : '<?php echo $text_categories; ?>'
										})).append(' <img src="view/image/flags/' + self._langs[i].image + '">').append('<br>');
										
										j++;
									}
									
									return $div;
								})())
							)
							.append(jQuery('<a href="#" class="btn btn-danger btn-xs pull-right"><i class="glyphicon glyphicon-remove"></i></a>')
								.click(function(){
									jQuery(this).parent().parent().parent().parent().remove();
									
									return false;
								})
							)
						)
					)
				)
				.append( tbody )
			);
			
			if( typeof data != 'undefined' && data.levels != 'undefined' ) {
				for( var i in data.levels ) {
					if( typeof data.levels[i] == 'function' ) continue;
			
					addLevel( data.levels[i] );
				}
			}
			
			idx++;
		}
		
		for( var i in data ) {
			add( data[i].type, data[i] );
		}
		
		return box;
	},
	
	render_btn_group: function( name, enabled ) {
		var html = '';
		
		html += '<div class="btn-group" data-toggle="fm-buttons">';
		html += '<label class="btn btn-primary btn-xs' + ( enabled ? ' active' : '' ) + '">';
		html += '<input type="radio" name="' + name + '"' + ( enabled ? ' checked="checked"' : '' ) + ' value="1">' + '<?php echo $text_yes; ?>';
		html += '</label>';
		html += '<label class="btn btn-primary btn-xs' + ( ! enabled ? ' active' : '' ) + '">';
		html += '<input type="radio" name="' + name + '"' + ( ! enabled ? ' checked="checked"' : '' ) + ' value="0">' + '<?php echo $text_no; ?>';
		html += '</label>';
		html += '</div>';
		
		return html;
	},
	
	render_btn_collapsed: function( name, value ) {
		var html = '';
		
		html += '<div class="btn-group" data-toggle="fm-buttons">';
		html += '<label class="btn btn-primary btn-xs' + ( value == '1' ? ' active' : '' ) + '">';
		html += '<input type="radio" name="' + name + '"' + ( value == '1' ? ' checked="checked"' : '' ) + ' value="1">' + '<?php echo $text_yes; ?>';
		html += '</label>';
		html += '<label class="btn btn-primary btn-xs' + ( ! value || value == '0' ? ' active' : '' ) + '">';
		html += '<input type="radio" name="' + name + '"' + ( ! value || value == '0' ? ' checked="checked"' : '' ) + ' value="0">' + '<?php echo $text_no; ?>';
		html += '</label>';
		html += '<label class="btn btn-primary btn-xs' + ( value == 'pc' ? ' active' : '' ) + '">';
		html += '<input type="radio" name="' + name + '"' + ( value == 'pc' ? ' checked="checked"' : '' ) + ' value="pc">' + '<?php echo $text_pc; ?>';
		html += '</label>';
		html += '<label class="btn btn-primary btn-xs' + ( value == 'mobile' ? ' active' : '' ) + '">';
		html += '<input type="radio" name="' + name + '"' + ( value == 'mobile' ? ' checked="checked"' : '' ) + ' value="mobile">' + '<?php echo $text_mobile; ?>';
		html += '</label>';
		html += '</div>';
		
		return html;
	},
	
	createContainer: function( id, type ) {
		var self	= this,
			cnt		= jQuery('<div class="cnt">'),
			tmp;
	
		if( typeof type == 'undefined' )
			type = id;
		
		tmp = jQuery('#tmp-' + self._row + '-' + type);
		
		if( tmp.length ) {
			cnt.append( tmp );
			tmp.removeAttr('style');
		}
		
		var placeholder = {
			'attribs' : '<?php echo $text_attribute_name; ?>',
			'options' : '<?php echo $text_option_name; ?>',
			'filters' : '<?php echo $text_filter_name; ?>'
		};
		
		return jQuery('<div id="tab-' + self._row + '-' + id + '" class="tab-pane">')
			.append(type=='base_attribs'?'':jQuery('<div class="pull-left input-group mf-filter" style="padding:5px">')
				.append('<input type="text" class="form-control pull-left input-sm" placeholder="' + ( typeof placeholder[type] == 'undefined' ? '' : placeholder[type] ) + '" style="width:200px" />')
				.append('<span class="input-group-btn pull-left"><button type="button" class="btn btn-primary btn-sm"><i class="glyphicon glyphicon-search"></i></button></span>')
			)
			.append('<a href="#" data-load-type="' + type + '" class="btn btn-xs btn-danger" style="float:right; margin: 4px 0;"><i class="glyphicon glyphicon-trash"></i> <?php echo $text_reset_to_default_values; ?></a><div class="clearfix"></div>')
			.append( cnt );
	},
	
	createScrollbox: function( id, type, name, items, key, values ) {
		var self	= this,
			cnt		= jQuery('<div class="scrollbox">'),
			k = 0, i;
			
		if( ! jQuery.isArray( values ) )
			values = [ values ];
			
		for( i in items ) {
			if( typeof items[i] == 'function' ) continue;
			
			var $div = jQuery('<div>')
				.addClass( k % 2 ? 'odd' : 'even' );
				
			switch( type ) {
				case 'checkbox' : {					
					$div.append( self.createField( 'checkbox', name, items[i][key], {
						'id'		: id + self._row,
						'checked'	: self.indexOf( values, items[i][key] ) > -1 ? true : false,
						'style'		: 'vertical-align: middle; margin: 0;'
					})).append( ' ' + items[i]['name'] );
					
					break;
				}
				case 'delete' : {
					$div.append( items[i] );
					$div.append( '<a class="btn btn-xs btn-danger pull-right"><i class="fa fa-remove"></i></a>' );
					$div.append( self.createField( 'hidden', name, i ) );
					
					break;
				}
			}
			
			cnt.append( $div );
				
			k++;
		}
		
		var $div = jQuery('<div>')
			.append( cnt );
		
		if( type == 'checkbox' ) {
			$div.append(jQuery('<a onclick="jQuery(this).parent().find(\':checkbox\').prop(\'checked\', true).trigger(\'change\');">')
				.text( '<?php echo $text_select_all; ?>' )
			)
			.append( ' / ' )
			.append(jQuery('<a onclick="jQuery(this).parent().find(\':checkbox\').prop(\'checked\', false).trigger(\'change\');">')
				.text( '<?php echo $text_unselect_all; ?>' )
			);
		}
			
		return $div;
	},
	
	/**
	 * Wewnętrzna funkcja wyszukiwania
	 *
	 * @param object|array arr
	 * @param string val
	 * @returns Number 
	 */
	indexOf: function( arr, val ) {
		for( var i in arr ) {
			if( typeof arr[i] == 'function' ) continue;
			
			if( arr[i] == val ) return i;
		}

		return -1;
	},
	
	/**
	 * Utwórz pole
	 *
	 * @param string type
	 * @param string name
	 * @param string value
	 * @param object attribs
	 * @returns jQuery
	 */
	createField: function( type, name, value, attribs ) {
		var self	= this,
			cnt;
			
		if( typeof value == 'undefined' )
			value = '';
		
		switch( type ) {
			case 'select' : {
				cnt = jQuery('<select>');
				
				for( var i in attribs['multiOptions'].items ) {
					if( typeof attribs['multiOptions'].items[i] == 'function' ) continue;
					
					var k = typeof attribs['multiOptions'].key != 'undefined' ? attribs['multiOptions'].items[i][attribs['multiOptions'].key] : i,
						l = typeof attribs['multiOptions'].label != 'undefined' ? attribs['multiOptions'].items[i][attribs['multiOptions'].label] : attribs['multiOptions'].items[i];
				
					cnt.append(jQuery('<option>')
						.attr('value', k)
						.attr('selected', k == value ? true : false)
						.text(l)
					);
				}
				
				delete attribs['multiOptions'];
				
				break;
			}
			default : {
				cnt = jQuery('<input>')
					.attr('type', type)
					.attr('value', value);
				
				break;
			}
		}
		
		if( name !== null )
			cnt.attr('name', self._name + '_module' + name);
		
		for( var i in attribs ) {
			if( typeof attribs[i] == 'function' ) continue;
			
			cnt.attr( i, attribs[i] );
		}
		
		return cnt;
	}
};

MFP._langs				= <?php echo json_encode( $languages ); ?>;
MFP._layouts			= <?php echo json_encode( $layouts ); ?>;
MFP._settings			= <?php echo json_encode( $settings ); ?>;
MFP._categories			= <?php echo json_encode( $categories ); ?>;
MFP._categoriesNames	= <?php echo json_encode( $categoriesNames ); ?>;
MFP._hideCategories		= <?php echo json_encode( $hideCategories ); ?>;
MFP._stores				= <?php echo json_encode( $stores ); ?>;
MFP._customerGroups		= <?php echo json_encode( $customerGroups ); ?>;

MFP.init( <?php echo json_encode( $modules ); ?> );
</script> 

<?php require DIR_TEMPLATE . 'module/' . $_name . '-footer.tpl'; ?>