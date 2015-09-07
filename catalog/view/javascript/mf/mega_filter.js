/**
 * Mega Filter
 */

if( typeof Array.prototype.indexOf == 'undefined' ) {
	Array.prototype.indexOf = function(obj, start) {
		for( var i = ( start || 0 ), j = this.length; i < j; i++ ) {
			if( this[i] === obj ) {return i;}
		}
		
		return -1;
   };
};

var MegaFilterINSTANCES = typeof MegaFilterINSTANCES == 'undefined' ? [] : MegaFilterINSTANCES;

var MegaFilter = function(){ };

MegaFilter.prototype = {
	
	/**
	 * Kontener filtrów
	 */
	_box: null,
			
	/**
	 * Opcje
	 */
	_options: null,
			
	/**
	 * @var int
	 */
	_timeoutAjax: null,
	
	_timeoutSearchFiled: null,
		
	/**
	* @var string
	*/
	_url			: null,
	
	/**
	 * Separator URL
	 * 
	 * @var string
	 */
	_urlSep			: null,
	
	/**
	 * Lista parametrów
	 *
	 * @var object
	 */
	_params			: null,
	
	/**
	 * Lista scrolls
	 * 
	 * @var array
	 */
	_scrolls		: null,
	
	/**
	 * Lista guzików
	 * 
	 * @var array
	 */
	_buttonsMore	: null,
	
	_liveFilters	: null,
	
	/**
	 * Kontener główny
	 *
	 * @var jQuery
	 */
	_jqContent		: null,
		
	/**
	 * Loader over results
	 *
	 * @var jQuery
	 */
	_jqLoader		: null,
	
	/**
	 * Loader over filter
	 * 
	 * @var jQuery
	 */
	_jqLoaderFilter	: null,
	
	/**
	 * Slidery
	 * 
	 * @type array
	 */
	_sliders		: null,
		
	/**
	 * ID kontenera głównego
	 *
	 * @var string
	 */
	_contentId		: '#content',
	
	/**
	 * Trwa oczekiwanie na odpowiedź serwera
	 * 
	 * @var bool
	 */
	_busy			: false,
	
	/**
	 * W trakcie ładowania danych z serwra wprowadzono zmiany
	 * 
	 * @var bool
	 */
	_waitingChanges	: false,
	
	/**
	 * Ostania odpowiedź serwera
	 * 
	 * @var string
	 */
	_lastResponse	: '',
	
	_refreshPrice : function(){},
	
	_inUrl : null,
	
	_isInit: false,
	
	_cache: null,
	
	_relativeScroll: null,
	
	_selectOptions: null,
	
	_lastUrl: null,
	
	_urlToFilters: null,
	
	_instanceIdx: 0,
	
	_inlineHorizontalUpdate: null,
	
	_lastEvent: null,
	
	_startUrl: null,
	
	_history: 1,
	
	_changed: false,
	
	_ajaxPagination: null,
	
	////////////////////////////////////////////////////////////////////////////
	
	/**
	 * Inicjuj klasę
	 */
	init: function( box, options ) {
		var self = this,
			i;
		
		self._instanceIdx = MegaFilterINSTANCES.length;
			
		if( options.routeHome == options.route && options.homePageAJAX ) {
			self._contentId = options.homePageContentSelector;
		} else if( options.contentSelector ) {
			self._contentId = options.contentSelector;
		}
		
		self._jqContent	= jQuery(self._contentId);
		
		if( ! self._jqContent.length ) {
			self._contentId = '#maincontent';
			
			self._jqContent	= jQuery(self._contentId);
		}
		
		if( self._startUrl === null ) {
			self._startUrl = document.location;
		}
		
		self._scrolls					= [];
		self._buttonsMore				= [];
		self._liveFilters				= [];
		self._sliders					= [];
		self._inlineHorizontalUpdate	= [];
		self._box						= box;
		self._options					= options;
		self._selectOptions				= {};
		self._cache						= {
			'lastResponse'	: {},
			'mainContent'	: {}
		};
		
		self.initResponsive();
		
		if( self._options.manualInit && ! self._isInit ) {
			var items = self._box.find('> .mfilter-content').find('> ul,> div').hide(),
				$init = jQuery('<a href="#" style="padding: 10px; text-align: center; display: block;">' + self._options.text.init_filter + '</a>').appendTo( self._box.find('> .mfilter-content') );
			
			$init.click(function(){
				$init.text( self._options.text.initializing );
				
				setTimeout(function(){
					items.show();
					self.boot();
					$init.remove();
				},100);
				
				return false;
			});
		} else {
			self.boot();
		}
		
		return self;
	},
	
	boot: function() {
		var self = this,
			i;
		
		self.initUrls();

		for( i in self._options.params ) {
			if( typeof self._options.params[i] == 'function' ) continue;

			if( typeof self._params[i] == 'undefined' ) {
				self._params[i] = self._options.params[i];
			}
		}

		self.initSliders();

		//var t = this.microtime(true);
		for( i in self ) {
			if( i.indexOf( '_init' ) === 0 ) {
				self[i]();
			}
		}
		//alert(this.microtime(true)-t);
		self._isInit = true;
	},
	
	microtime: function(get_as_float) {
		var now = new Date()
			.getTime() / 1000;
		var s = parseInt(now, 10);

		return (get_as_float) ? now : (Math.round((now - s) * 1000) / 1000) + ' ' + s;
	},

	keys: function( obj ) {
		var keys = [];
		
		for( var i in obj ) {
			keys.push( i );
		}
		
		return keys;
	},
	
	base64_decode: function(data) {
		var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
		var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
		  ac = 0,
		  dec = '',
		  tmp_arr = [];

		if (!data) {
		  return data;
		}

		data += '';

		do { // unpack four hexets into three octets using index points in b64
		  h1 = b64.indexOf(data.charAt(i++));
		  h2 = b64.indexOf(data.charAt(i++));
		  h3 = b64.indexOf(data.charAt(i++));
		  h4 = b64.indexOf(data.charAt(i++));

		  bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;

		  o1 = bits >> 16 & 0xff;
		  o2 = bits >> 8 & 0xff;
		  o3 = bits & 0xff;

		  if (h3 == 64) {
			tmp_arr[ac++] = String.fromCharCode(o1);
		  } else if (h4 == 64) {
			tmp_arr[ac++] = String.fromCharCode(o1, o2);
		  } else {
			tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
		  }
		} while (i < data.length);

		dec = tmp_arr.join('');

		return dec.replace(/\0+$/, '');
	},
	
	/**
	 * Inicjuj slidery
	 * 
	 * @return void
	 */
	initSliders: function(){
		var self = this,
			_init = false;
		
		function d( txt ) {
			var $i = jQuery('<div>').html( txt ),
				txt2 = $i.text();
			$i.remove();
			return txt2;
		}		
		
		self._box.find('li.mfilter-filter-item.mfilter-slider').each(function(i){
			var _this		= jQuery(this).attr('data-slider-id', i),
				seo_name	= _this.attr('data-seo-name'),
				data		= jQuery.parseJSON(self.base64_decode(_this.find('.mfilter-slider-data').html())),
				$min		= _this.find('.mfilter-opts-slider-min'),
				$max		= _this.find('.mfilter-opts-slider-max'),
				$slider		= _this.find('.mfilter-slider-slider'),
				update		= false,
				keys, values, map;
				
			function init( data ) {
				keys	= self.keys( data );
				
				if( _init ) {
					if( ! keys.length ) {
						$slider.slider().slider('disable');

						return;
					} else {
						$slider.slider().slider('enable');
					}
				}
				
				if( keys.length == 1 ) {
					data['copy'] = data[keys[0]];
					keys.push('copy');
				}
				
				var filters = update ? self.filters() : self.urlToFilters();
				
				values	= typeof filters[seo_name] != 'undefined' ? (function(){ 
					var d = [];
					
					for( var i = 0; i < filters[seo_name].length; i++ ) {
						d[i] = self.decode( decodeURIComponent( filters[seo_name][i] ) );
					} 
					
					return d;
				})() : [ data[keys[0]].key, data[keys[keys.length-1]].key ];
				map		= (function(){
					var m = [ keys.indexOf( values[0] ), keys.indexOf( values[values.length-1] ) ];

					if( m[0] != -1 && m[1] != -1 ) {
						return typeof filters[seo_name] == 'undefined' ? [ 0, keys.length-1 ] : m;
					}

					for( var i in data ) {
						if( m[0] == -1 ) {
							if( values[0] == d( data[i].value ) ) {
								m[0] = keys.indexOf( i );
							}
						} else if( m[1] == -1 ) {
							if( values[values.length-1] == d( data[i].value ) ) {
								//m[1] = typeof data['copy'] == 'undefined' ? keys.indexOf( i ) : m[0];
								m[1] = typeof data['copy'] == 'undefined' ? keys.indexOf( i ) : ( typeof filters[seo_name] == 'undefined' ? 1 : m[0] );
							}
						} else {
							break;
						}
					}
					
					if( m[0] == -1 ) {
						m[0] = 0;
					}

					if( m[1] == -1 ) {
						m[1] = m[0];//keys.length-1;
					}

					return m;
				})();
				
				$min.attr('data-key',map[0]).attr('data-min',0).val( d( data[keys[map[0]]].name ) );
				$max.attr('data-key',map[1]).attr('data-max',keys.length-1).val( d( data[keys[map[1]]].name ) );
				
				$slider.slider({
					range	: true,
					min		: 0,
					max		: keys.length-1,
					values	: map,
					slide	: function( e, ui ) {
						$min.attr('data-key',ui.values[0]).val( d( data[keys[ui.values[0]]].name ) );
						$max.attr('data-key',ui.values[1]).val( d( data[keys[ui.values[1]]].name ) );
					},
					stop	: function( e, ui ) {
						update = true;
						
						self.runAjax();
					}
				});
				
				if( _init ) {
					$slider.slider( 'value', $slider.slider('value') );
				}
				
				_init = true;
			}
			
			init( data );
			
			var s_idx = self._sliders.length;
			
			self._sliders.push({
				data: data,
				init: function( data, update ) {
					init( data, update );
				},
				resetValues: function(){					
					data = self._sliders[s_idx].data;
					keys = self.keys( data );
					
					$min.attr('data-key',0).attr('data-min',0).val( d( data[keys[map[0]]].name ) );
					$max.attr('data-key',keys.length-1).attr('data-max',keys.length-1).val( d( data[typeof keys[map[1]] != 'undefined' ? keys[map[1]] : keys[map[0]]].name ) );
					
					$slider.slider( 'option', 'min', parseInt( $min.attr('data-min') ) );
					$slider.slider( 'option', 'max', parseInt( $max.attr('data-max') ) );
					$slider.slider( 'option', 'values', [
						$min.attr('data-min'),
						$max.attr('data-max')
					]);
					$slider.slider( 'value', $slider.slider( 'value' ) );
					
					update = true;
				},
				setValues: function(){
					var vals = $slider.slider('values');
					
					$min.attr('data-key',vals[0]).val( d( data[keys[vals[0]]].name ) );
					$max.attr('data-key',vals[1]).val( d( data[typeof keys[map[1]] != 'undefined' ? keys[map[1]] : keys[map[0]]].name ) );
				},
				getValues: function(){
					if( $min.attr('data-key') == $min.attr('data-min') && $max.attr('data-key') == $max.attr('data-max') && self.keys( data ).length == self.keys( self._sliders[s_idx].data ).length ) {
						return [];
					}
					
					var min		= parseInt( $min.attr('data-key') ),
						max		= parseInt( $max.attr('data-key') ),
						vals	= [];
					
					for( var i = min; i <= max; i++ ) {
						var key = keys[i];
						
						if( ! key ) continue;
						
						if( typeof data[key] == 'undefined' ) {
							key = keys[0];
						}
						
						vals.push( encodeURIComponent( self.encode( d( data[key].value ) ) ) );
					}
					
					return vals;
				}
			});
		});
	},
	
	initResponsive: function(){
		var self	= this,
			column	= null,
			moved	= false,
			hidden	= true;
	
		if( self._box.hasClass( 'mfilter-hide-container' ) ) {
			column = self._box.parent();
			self._box.removeClass( 'mfilter-content_top mfilter-modern-horizontal mfilter-hide' );
		} else if( self._box.hasClass( 'mfilter-column_left' ) ) {
			column = jQuery('#column-left');
		} else if( self._box.hasClass( 'mfilter-column_right' ) ) {
			column = jQuery('#column-right');
		} else {
			return;
		}
		
		var id = 'mfilter-free-container-' + jQuery('[id^="mfilter-free-container"]').length,
			cnt = jQuery('<div class="mfilter-free-container mfilter-direction-' + self._options.direction + '">')
				.prependTo( jQuery('body') ),
			btn = jQuery('<div class="mfilter-free-button">')
				.appendTo( cnt )
				.click(function(){
					if( hidden ) {
						cnt.animate(self._options.direction == 'rtl' ? {
							'marginRight' : 0
						} : {
							'marginLeft' : 0
						}, 500, function(){
							self._relativeScroll.refresh();
						});
					} else {
						cnt.animate(self._options.direction == 'rtl' ? {
							'marginRight' : - ( cnt.outerWidth(true)<cnt.outerWidth()?cnt.outerWidth():cnt.outerWidth(true) )
						} : {
							'marginLeft' : - cnt.outerWidth(true)
						}, 500);
					}
			
					hidden = ! hidden;
				}),
			cnt2 = jQuery('<div>')
				.css('overflow','hidden')
				.attr('id', id)
				.appendTo( cnt ),
			cnt3 = jQuery('<div>')
				.appendTo( cnt2 ),
			src = jQuery('<span class="mfilter-before-box">');
	
		self._relativeScroll = new IScroll( '#' + id, {
			bounce: false,
			scrollbars: true,
			mouseWheel: true,
			interactiveScrollbars: true,
			mouseWheelSpeed: 120
		});
		
		self._box.before( src );
		
		if( ! column.length )
			column = self._box.parent();
		
		function isVisible() {
			var visible = column.is(':visible'),
				height	= jQuery(window).height() - 50;
			
			if( visible && moved ) {
				cnt.hide();
				
				src.after( self._box );
				
				if( ! hidden )
					btn.trigger('click');
				
				moved = false;
			} else if( ! visible && ! moved ) {
				cnt.show();
				
				cnt3.append( self._box );
				
				moved = true;
			}
			
			if( moved ) {
				cnt2.css( 'max-height', height + 'px' );
				self._relativeScroll.refresh();
			}
		}
		
		jQuery(window).resize(function() {
			isVisible();
		});
		
		isVisible();
	},
	
	initUrls: function( url ) {
		var self = this;

		if( typeof url == 'undefined' ) {
			url	 = document.location.href.split('#')[0];
		}
		
		self._urlSep	= self._parseSep( url ).urlSep;
		self._url		= self._parseSep( url ).url;
		self._params	= self._parseUrl( url );
		self._inUrl		= self._parseUrl( url );
	},
	
	_initMfImage: function() {
		var self = this;
		
		self._box.find('.mfilter-image input').change(function(){
			var s = jQuery(this).is(':checked');
			
			jQuery(this).parent()[s?'addClass':'removeClass']('mfilter-image-checked');
		});
		
		self._box.find('.mfilter-image input:checked').parent().addClass('mfilter-image-checked');
	},
	
	__initTreeCategoryEvents: function() {
		var self = this,
			$path = self._box.find('input[name="path"]');
		
		self._box.find('li.mfilter-filter-item.mfilter-tree.mfilter-categories')[self._box.find('.mfilter-category-tree > ul > li').length?'show':'hide']();
			
		self._box.find('.mfilter-category-tree').each(function(){
			var _this = jQuery(this),
				ul = _this.find('> ul'),
				top_url = ul.attr('data-top-url'),
				top_path = ul.attr('data-top-path').split('_');
		
			_this.find('.mfilter-to-parent a').unbind('click').bind('click', function(){
				var parts = (jQuery(this).attr('data-path')?jQuery(this).attr('data-path'):$path.val()).split('_');

				parts.pop();

				if( top_url != '' && parts.length <= top_path.length ) {
					window.location.href = self.createUrl(top_url);
				} else {
					$path.val( parts.join('_') );

					self.runAjax();
				}

				return false;
			});
				
			_this.find('a[data-parent-id]').click(function(){
				if( self._busy ) return false;

				var id = jQuery(this).attr('data-id'),
					path = $path.val(),
					parts = path.split('_'),
					last = parts[parts.length-1].split(',');
					
				self._cache['cat_'+id] = jQuery(this).text();
				
				if( last.indexOf( id ) == -1 ) {				
					if( path != '' ) {
						path += '_';
					}

					path += id;
				
					$path.val( path );
				}
				
				self.runAjax();

				return false;
			});
		});
	},
	
	_initTreeCategory: function( force ) {
		var self = this,
			$path = self._box.find('input[name="path"]');
		
		if( self._isInit && force !== true ) {
			self.__initTreeCategoryEvents();
			
			return;
		}
		
		if( ! $path.val() ) {
			if( typeof self._options.params.mfp_org_path != 'undefined' ) {
				$path.val( self._options.params.mfp_org_path );
			} else if( typeof self._options.params.path != 'undefined' ) {
				$path.val( self._options.params.path );
			}
		}
		
		self._box.find('.mfilter-category-tree').each(function(){
			if( $path.val().indexOf( '_' ) > -1 || ( $path.val() && ! self._options.params.path ) ) {
				/*var parts = $path.val().split('_'),
					path = '',
					li;
				
				for( var i = 0; i < parts.length; i++ ) {
					path += path ? '_' : '';
					path += parts[i];
					
					if( typeof self._cache['cat_'+parts[i]] == 'undefined' ) continue;
					
					li = jQuery('<li class="mfilter-to-parent">')
						.append(jQuery('<a data-path="' + path + '">')
						.html((function(){
							var parts = path.split('_'),
								cat = parts[parts.length-1];
								
							return typeof self._cache['cat_'+cat] ? self._cache['cat_'+cat] : self._options.text.go_to_top;
						})())
					);
				
					if( jQuery(this).find('ul > .mfilter-to-parent').length ) {
						jQuery(this).find('ul > .mfilter-to-parent:last').after( li );
					} else {
						jQuery(this).find('ul').prepend( li );
					}
				}*/
				
				jQuery(this).find('ul').prepend(jQuery('<li class="mfilter-to-parent">')
					.append(jQuery('<a>')
						.html((function(){
							var parts = $path.val().split('_'),
								cat = parts[parts.length-1];
							
							return typeof self._cache['cat_'+cat] != 'undefined' ? self._cache['cat_'+cat] : self._options.text.go_to_top;
						}))
					)
				);
			}
		});
		
		self.__initTreeCategoryEvents();
	},
	
	_initBox: function() {
		var self = this;
		
		if( self._isInit ) return;
		
		if( self._box.hasClass( 'mfilter-content_top' ) ) {
			self._box.find('.mfilter-content > ul > li').each(function(i){
				if( i && i % 4 == 0 ) {
					jQuery(this).before('<li style="clear:both; display:block;"></li>');
				}
			});
		}
	},
	
	_initTextFields: function() {
		var self = this;
		
		self._box.find('.mfilter-filter-item.mfilter-text').each(function(){
			var _this	= jQuery(this),
				name	= _this.attr('data-seo-name'),
				input	= _this.find('input[type=text]');
				
			function clear() {
				if( self._cache['txt_field_'+name] ) {
					clearTimeout( self._cache['txt_field_'+name] );
				}
				
				self._cache['txt_field_'+name] = null;
			}
				
			input.bind('keydown', function(e){
				if( e.keyCode == 13 ) {
					clear();
					
					self.ajax();
					
					return false;
				}
			}).bind('keyup.mf_shv', function(){
				input[input.val()?'addClass':'removeClass']('mfilter-text-has-value');
			}).bind('keyup', function(e){
				clear();
				
				if( self._options['refreshResults'] != 'using_button' ) {
					self._cache['txt_field_'+name] = setTimeout(function(){
						self.ajax();

						self._cache['txt_field_'+name] = null;
					}, 1000);
				}
			}).trigger('keyup.mf_shv');
		});
	},
	
	_initSearchFiled: function() {
		var self = this,
			searchField = self._box.find('input[id="mfilter-opts-search"]'),
			searchButton = self._box.find('[id="mfilter-opts-search_button"]');
			
		if( ! searchField.length )
			return;
			
		var refreshDelay = parseInt( searchField.unbind('keyup keydown click').attr('data-refresh-delay').toString().replace(/[^0-9\-]+/, '') ),
			lastValue = searchField.val();
		
		function clearInt() {
			if( self._timeoutSearchFiled )
				clearTimeout( self._timeoutSearchFiled );
			
			self._timeoutSearchFiled = null;
		}
	
		if( refreshDelay != '-1' ) {
			searchField.bind('keyup', function(e){
				if( jQuery(this).val() == lastValue )
					return;
				
				if( ! refreshDelay ) {
					self.ajax();
				} else if( e.keyCode != 13 ) {
					clearInt();
					
					self._timeoutSearchFiled = setTimeout(function(){
						self.ajax();
						
						self._timeoutSearchFiled = null;
					}, refreshDelay);
				}
				
				lastValue = searchField.val();
			});
		}
		
		searchField.bind('keydown', function(e){
			if( e.keyCode == 13 ) {
				clearInt();
				
				self.ajax();
				
				return false;
			}
		}).bind('keyup.mf_shv', function(){
			jQuery(this)[jQuery(this).val()?'addClass':'removeClass']('mfilter-search-has-value');
		}).trigger('keyup.mf_shv');
	
		searchButton.bind('click', function(){
			clearInt();
			
			self.ajax();
			
			return false;
		});
	},
	
	encode: function( string ) {
		string = string.replace( /,/g, 'LA==' );
		string = string.replace( /\[/g, 'Ww==' );
		string = string.replace( /\]/g, 'XQ==' );
		
		return string;
	},
	
	decode: function( string ) {
		string = string.replace( /LA==/g, ',' );
		string = string.replace( /Ww==/g, '[' );
		string = string.replace( /XQ==/g, ']' );
		
		return string;
	},
	
	_parseSep: function( url ) {
		var self = this,
			urlSep = null;
		
		if( typeof url == 'undefined' )
			url = self._url;
		
		if( ! self._options.smp.isInstalled || self._options.smp.disableConvertUrls ) {
			url		= self.parse_url( url );
			url		= url.scheme + '://' + url.host + (url.port ? ':'+url.port: '') + url.path;
			url		= url.split('&')[0];
		} else {
			url		= url.indexOf('?') > -1 ? url.split('?')[0] : url.split(';')[0];
		}
		
		urlSep	= {
			'f' : '?',
			'n' : '&'
		};
		
		return {
			url : url,
			urlSep : urlSep
		};
	},
	
	/**
	 * Inicjuj kontener
	 */
	_initContent: function() {
		var self = this;
		
		self._jqContent
			.css('position', 'relative');
	},
	
	/**
	 * @return {scheme: 'http', host: 'hostname', user: 'username', pass: 'password', path: '/path', query: 'arg=value', fragment: 'anchor'}
	 */
	parse_url: function(str, component) {
		var query, key = ['source', 'scheme', 'authority', 'userInfo', 'user', 'pass', 'host', 'port',
			'relative', 'path', 'directory', 'file', 'query', 'fragment'
			],
			ini = (this.php_js && this.php_js.ini) || {},
			mode = (ini['phpjs.parse_url.mode'] &&
			ini['phpjs.parse_url.mode'].local_value) || 'php',
			parser = {
			php: /^(?:([^:\/?#]+):)?(?:\/\/()(?:(?:()(?:([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?()(?:(()(?:(?:[^?#\/]*\/)*)()(?:[^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
			strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
			loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/\/?)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/ // Added one optional slash to post-scheme to catch file:/// (should restrict this)
			};

		var m = parser[mode].exec(str),
			uri = {},
			i = 14;
		while (i--) {
			if (m[i]) {
			uri[key[i]] = m[i];
			}
		}

		if (component) {
			return uri[component.replace('PHP_URL_', '')
			.toLowerCase()];
		}
		if (mode !== 'php') {
			var name = (ini['phpjs.parse_url.queryKey'] &&
			ini['phpjs.parse_url.queryKey'].local_value) || 'queryKey';
			parser = /(?:^|&)([^&=]*)=?([^&]*)/g;
			uri[name] = {};
			query = uri[key[12]] || '';
			query.replace(parser, function($0, $1, $2) {
			if ($1) {
				uri[name][$1] = $2;
			}
			});
		}
		delete uri.source;
		return uri;
	},
	
	baseTypes: function( skip ) {
		var self	= this,
			types	= [];
		
		function find( self ) {
			self._box.find('[data-base-type]').each(function(){
				var baseType = jQuery(this).attr('data-base-type'),
					type = jQuery(this).attr('data-type');

				if( baseType == 'categories' ) {
					baseType += ':' + type;
				}

				if( types.indexOf( baseType ) > -1 ) return;
				if( typeof skip != 'undefined' && skip.indexOf( baseType ) > -1 ) return;

				types.push( baseType );
			});
		}
		
		find( self );
		
		for( var i = 0; i < MegaFilterINSTANCES.length; i++ ) {
			if( i == self._instanceIdx ) continue;
			
			find( MegaFilterINSTANCES[i] );
		}
		
		return types;
	},
	
	_ajaxUrl: function( url ) {
		var self = this,
			params = url.indexOf('?') > -1 ? url.split('?')[1] : '',
			parts = ( url.indexOf('?') > -1 ? url.split('?')[0] : url ).split('/');
		
		for( i = 0; i < parts.length; i++ ) {
			if( /page-[0-9]+/.test( parts[i] ) ) {
				delete parts[i];
			}
		}
		
		url = parts.join('/');
		url = url.replace('://', '###URL###');
		url = url.replace( /\/+/g, '/' );
		url = url.replace('###URL###', '://');
		
		if( params != '' ) {
			url += '?' + params;
		}
		
		if( self._options.mijoshop ) {
			return url + ( url.indexOf('?') > -1 ? '&' : '?' ) + 'option=com_mijoshop&format=raw';
		}
		
		if( self._options.joo_cart != false ) {
			function parse( u ) {
				u = u.replace( 'index.php', '' );
				u = u.replace( /\/$/, '' );
				
				return u + '/';
			}
		
			var site_url 	= parse( self._options.joo_cart.site_url ),
				main_url 	= parse( self._options.joo_cart.main_url ),
				route 		= url.indexOf( 'index.php' ) > -1 ? self._parseUrl( url, {} ).route : url.replace( main_url, '' ),
				query		= self.parse_url( url ).query;
			
			if( typeof route == 'undefined' ) {
				route = '';
			}
			
			if( typeof query == 'undefined' ) {
				query = '';
			}
			
			if( route.indexOf('?') > -1 ) {
				route = route.split('?')[0];
			}
			
			if( route == 'module/mega_filter/ajaxinfo' ) {
				return site_url + 'index.php?route=' + route + ( query ? '&' + query : '' ) + '&option=com_opencart&format=raw';
			}
		}
		
		return url;
	},
	
	/**
	 * Inicjuj informacje o ilości
	 */
	_initCountInfo: function() {
		var self = this;
		
		if( ! self._options.calculateNumberOfProducts || self._isInit )
			return;
		
		jQuery.ajax({
			'url'		: self._ajaxUrl( self.createUrl( self._options.ajaxInfoUrl, jQuery.extend( {}, self._params ), true ) ),
			'type'		: 'GET',
			'data'		: {
				'mfilterIdx'	: self._options.idx,
				'mfilterRoute'	: self._options.route,
				'mfilterBTypes'	: self.baseTypes(['categories:tree','categories:cat_checkbox']).join(',')
			},
			'success'	: function( response ) {
				self._parseInfo( response );
				
				/*self._cache.mainContent[document.location] = {
					'html'	: self._jqContent.html(),
					'json'	: response
				};*/
			},
			'error'		: function() {
				
			}
		});
		
		self._parseInfo('{"stock_status":[],"manufacturers":[],"rating":[],"attributes":[],"options":[],"filters":[]}',true);
	},
	
	_parseInfo: function( data, first ) {
		var self	= this,
			filters	= self.filters(),
			json	= jQuery.parseJSON( data );
		
		for( var i in json ) {
			switch( i ) {
				case 'categories:tree' : {
					self._box.find('.mfilter-category-tree > ul > li').remove();
					
					for( var j = 0; j < json[i].length; j++ ) {
						if( self._options.hideInactiveValues && json[i][j].cnt == '0' ) continue;
						
						self._box.find('.mfilter-category-tree > ul').append(jQuery('<li class="mfilter-tb-as-tr">')
							.append(jQuery('<div class="mfilter-tb-as-td">')
								.append(jQuery('<a>')
									.attr('data-id', json[i][j].id)
									.attr('data-parent-id', json[i][j].pid)
									.html( json[i][j].name )
								)
							)
							.append('<div class="mfilter-tb-as-td mfilter-col-count"><span class="mfilter-counter">' + json[i][j].cnt + '</span></div>')
						);
					}
					
					self._initTreeCategory( true );
					
					break;
				}
				case 'categories:cat_checkbox' : {
					var cnt = {};
					
					for( var j in json[i] ) {
						cnt[json[i][j].id] = json[i][j].cnt;
					}
					
					self._box.find('.mfilter-filter-item.mfilter-cat_checkbox').each(function(){
						var $self = jQuery(this),
							cx = 0;
						
						$self.find('input[value]').each(function(){
							var $self2 = $(this),
								$parent = $self2.parent().parent(),
								$cnt = $parent.find('.mfilter-counter'),
								checked = $self2.is(':checked'),
								id = $self2.val(),
								c = typeof cnt[id] == 'uncefined' ? 0 : parseInt( cnt[id] ),
								ct = c;
							
							if( typeof filters['path'] != 'undefined' ) {
								if( filters['path'].indexOf( encodeURIComponent( id ) ) == -1 ) {
									ct = '+' + ct;
								}
							}
								
							$cnt.text( ct )[checked?'addClass':'removeClass']('mfilter-close');
							
							if( c ) {
								cx++;
								$parent.removeClass('mfilter-hide mfilter-first-child');
							}
							
							if( checked || c ) {
								$self2.removeAttr('disabled');
								$parent.removeClass('mfilter-disabled');
							} else {
								$self2.attr('disabled',true);
								$parent.addClass('mfilter-disabled');
							}
						});
						
						if( cx ) {
							$self.removeClass('mfilter-hide');
						}
					});
					
					break;
				}
				case 'price' : {
					var priceRange = self.getPriceRange();
					
					if( priceRange.min == self._options.priceMin && priceRange.max == self._options.priceMax ) {
						self._box.find('[id="mfilter-opts-price-min"]').val( json[i].min );
						self._box.find('[id="mfilter-opts-price-max"]').val( json[i].max );
					}
					
					self._options.priceMin = json[i].min;
					self._options.priceMax = json[i].max;
					
					self._refreshPrice();
					
					break;
				}
				case 'rating' :
				case 'attributes' :
				case 'filters' :
				case 'options' :
				case 'manufacturers' :
				case 'stock_status' : {					
					self._box.find('.mfilter-filter-item.mfilter-' + i).each(function(){
						var $item		= jQuery(this),
							seo			= $item.attr('data-seo-name'),
							id			= $item.attr('data-id'),
							$items		= $item.find( '.mfilter-options .mfilter-option'),
							hidden		= 0;
						
						$items.each(function(){
							var $self		= jQuery(this),
								$input		= $self.find('input[type=checkbox],input[type=radio],select'),
								val			= $input.val(),
								$counter	= jQuery(this).find('.mfilter-counter'),
								text		= '',
								cnt			= json[i];							
							
							if( id && typeof cnt[id] != 'undefined' ) {
								cnt = cnt[id];
							}
							
							if( $self.hasClass( 'mfilter-select' ) ) {
								var $options	= $input.find('option'),
									hOptions	= 0,
									val			= $input.val(),
									idx			= $input.prop('selectedIndex');
								
								if( typeof self._selectOptions[seo] == 'undefined' ) {
									self._selectOptions[seo] = [];
									
									$options.each(function(){
										self._selectOptions[seo].push({
											'name'	: jQuery(this).attr('data-name'),
											'id'	: jQuery(this).attr('id'),
											'value'	: jQuery(this).attr('value'),
											'text'	: jQuery(this).html()
										});
									});
								}
								
								$options.remove();
								
								(function(){
									function add( $option ) {
										$input.append( $option );
										
										if( val == $option.val() ) {
											idx = $input.find('option').length-1;
										}
									}
									
									for( var i = 0; i < self._selectOptions[seo].length; i++ ) {
										var $option = jQuery('<option>')
											.attr('value', self._selectOptions[seo][i].value);

										if( self._selectOptions[seo][i].name ) {
											$option.attr('data-name', self._selectOptions[seo][i].name);
										}

										if( self._selectOptions[seo][i].id ) {
											$option.attr('id', self._selectOptions[seo][i].id);
										}

										if( self._selectOptions[seo][i].id ) {
											var idd = self._selectOptions[seo][i].id.split('-').pop();

											if( first || typeof cnt[idd] != 'undefined' ) {
												$option.html( ( ! first && self._options.showNumberOfProducts ? '(' + cnt[idd] + ') ' : '' ) + self._selectOptions[seo][i].name );
												
												add( $option );
											} else {
												$option.attr('disabled', true).html( ( self._options.showNumberOfProducts ? '(0)' : '' ) + self._selectOptions[seo][i].name );

												if( ! self._options.hideInactiveValues ) {
													add( $option );
												}

												hOptions++;
											}
										} else {
											$option.html( self._selectOptions[seo][i].text );
											add( $option );
										}
									}
								})();
								
								if( idx >= 0 ) {
									$input.prop('selectedIndex', idx);
								}
								
								if( hOptions == self._selectOptions[seo].length ) {
									hidden++;
								}
							} else if( $self.hasClass( 'mfilter-slider' ) ) {
								//if( self._options.hideInactiveValues ) {
									self._box.find('[data-id="' + id + '"][data-slider-id]').each(function(){
										var slider_id = jQuery(this).attr('data-slider-id'),
											data = {};

										for( var i in self._sliders[slider_id].data ) {
											if( typeof cnt != 'undefined' && typeof cnt[i] != 'undefined' && parseInt( cnt[i] ) > 0 ) {
												data[i] = self._sliders[slider_id].data[i];
											}
										}
										
										self._sliders[slider_id].init( data, true );
									});
								//}
							} else if( $self.hasClass( 'mfilter-text' ) ) {
								$input = $self.find('input[type=text]');
								
								if( typeof filters[seo] != 'undefined' ) {
									
								} else {
									
								}
							} else {
								var idd = $input.attr('id').split('-').pop();
								
								if( typeof filters[seo] != 'undefined' ) {
									if( filters[seo].indexOf( encodeURIComponent( self.encode( val ) ) ) > -1 ) {
										$counter.addClass( 'mfilter-close' );
									} else {
										if( ! $item.hasClass( 'mfilter-radio' ) && ! $item.hasClass('mfilter-image_list_radio') /*&& base_type != 'option'*/ )
											text += '+';

										$counter.removeClass( 'mfilter-close' );
									}
								} else {
									$counter.removeClass( 'mfilter-close' );
								}
								
								$self.removeClass('mfilter-first-child mfilter-last-child mfilter-disabled mfilter-hide mfilter-visible');
								$self.parent().removeClass('mfilter-hide');

								if( typeof cnt[idd] != 'undefined' && parseInt( cnt[idd] ) > 0 ) {
									text += cnt[idd];

									$self.addClass('mfilter-visible');
									$input.attr('disabled', false);
								} else {
									text = '0';
									hidden++;
									
									$self.addClass('mfilter-disabled');
									$input.attr('disabled',true);
										
									if( first !== true && self._options.hideInactiveValues ) {
										$self.addClass('mfilter-hide');
										
										if( self._box.hasClass('mfilter-content_top') ) {
											$self.parent().addClass('mfilter-hide');
										}
									}
								}

								$counter.text( text );
							}
						});
						
						if( first !== true && self._options.hideInactiveValues ) {
							$item[hidden==$items.length?'addClass':'removeClass']('mfilter-hide');
							$item.find('.mfilter-option').not('.mfilter-hide,.mfilter-hide-by-live-filter').first().addClass('mfilter-first-child');
							$item.find('.mfilter-option').not('.mfilter-hide,.mfilter-hide-by-live-filter').last().addClass('mfilter-last-child');
						}
					});
					
					break;
				}
			}
		}
						
		if( first !== true && ( self._options.hideInactiveValues || self._box.find('[data-display-live-filter!="0"]').length ) ) {							
			for( var s = 0; s < self._scrolls.length; s++ ) {
				self._scrolls[s].refresh();
			}

			for( var b = 0; b < self._buttonsMore.length; b++ ) {
				self._buttonsMore[b].refresh();
			}
			
			for( var f = 0; f < self._liveFilters.length; f++ ) {
				self._liveFilters[f].refresh();
			}

			if( self._relativeScroll != null ) {
				self._relativeScroll.refresh();
			}
		}
		
		self._updateInlineHorizontal();
	},
	
	_initAlwaysSearch: function() {
		var self	= this;
			
		function search() {
			self._jqContent.find('[name^=filter_],[name=search],[name=category_id],[name=sub_category],[name=description]').each(function(){
				var name	= jQuery(this).attr('name'),
					value	= jQuery(this).val(),
					type	= jQuery(this).attr('type');

				if( [ 'checkbox', 'radio' ].indexOf( type ) > -1 && ! jQuery(this).is(':checked') )
					value = '';
					
				if( name ) {
					self._inUrl[name] = value;
					self._params[name] = value;
				}
			});
			
			self.reload();
			//self.ajax();
		}
			
		jQuery('#button-search').unbind('click').click(function(e){
			e.preventDefault();
				
			search();
		});
			
		self._jqContent.find('input[name=filter_name],input[name=search]').unbind('keydown').unbind('keyup').bind('keydown', function(e){
			if( e.keyCode == 13 ) {
				e.preventDefault();
					
				search();
			}
		});
	},
	
	_initAlwaysAjaxPagination: function(){
		var self = this;
		
		if( ! self._options.ajaxPagination ) return;
		
		self._jqContent.find('.pagination a').click(function(){
			var url = jQuery(this).attr('href'),
				params = self._parseUrl( url );
			
			if( typeof params.page != 'undefined' ) {
				self._ajaxPagination = params.page;
				
				self.ajax( url );
				
				return false;
			}
		});
	},
		
	__initLoader: function() {
		this._jqLoader = jQuery('<span class="mfilter-ajax-loader-container" style="cursor: wait; z-index: 100; margin: 0; padding: 0; position: absolute; text-align: center; background-color: rgba(255,255,255,0.7);"></span>')
			.prependTo( this._jqContent )
			.html( '<img src="catalog/view/theme/default/stylesheet/mf/images/ajax-loader.gif" alt="" />' )
			.hide();
	},
	
	__initLoaderFilter: function() {
		this._jqLoaderFilter = jQuery('<span style="cursor: wait; z-index: 10000; margin: 0; padding: 0; position: absolute; background-color: rgba(255,255,255,0.7);"></span>')
			.prependTo( this._box )
			.hide();
	},
	
	/**
	 * Inicjuj wyświetlanie listy
	 */
	_initDisplayItems: function() {
		var self = this,
			params = self.urlToFilters();
		
		self._box.find('.mfilter-filter-item').each(function(i){
			var _level0				= jQuery(this),
				type				= _level0.attr('data-type'),
				seo_name			= _level0.attr('data-seo-name'),
				displayLiveFilter	= parseInt( _level0.attr('data-display-live-filter') ),
				displayListOfItems	= _level0.attr('data-display-list-of-items');
					
			if( ! displayListOfItems ) {
				displayListOfItems = self._options.displayListOfItems.type;
			}

			if( type == 'price' || type == 'rating' ) return;
			
			var wrapper = _level0.find('.mfilter-content-wrapper'),
				content	= _level0.find('> .mfilter-content-opts'),
				heading	= _level0.find('> .mfilter-heading'),
				idx = null;

			if( ! self._box.hasClass('mfilter-content_top') && heading.hasClass( 'mfilter-collapsed' ) ) {
				if( typeof params[seo_name] == 'undefined' ) {
					content.show();
				}
			}
			
			if( displayListOfItems == 'scroll' ) {
				if( wrapper.actual( 'outerHeight', { includeMargin: true } ) > self._options.displayListOfItems.maxHeight ) {
					if( jQuery.browser && jQuery.browser.msie && jQuery.browser.version < 9 ) {
						wrapper
							.css({
								'max-height': self._options.displayListOfItems.maxHeight + 'px',
								'overflow-y': 'scroll'
							});
					} else {
						wrapper
							.attr('id', 'mfilter-content-opts-' + i)
							.addClass('mfilter-iscroll')
							.css('max-height', self._options.displayListOfItems.maxHeight + 'px');

						(function(){
							var iscroll = new IScroll( '#mfilter-content-opts-' + i, {
									bounce: false,
									scrollbars: true,
									mouseWheel: true,
									interactiveScrollbars: true,
									mouseWheelSpeed: 120
								}),
								start = false;

							iscroll.on('moveStart', function(e){
								if( ! start ) return;

								self._relativeScroll._end(e);

								start = false;
							});

							iscroll.on('moveStop', function(e){
								if( start ) return;

								self._relativeScroll._start(e);

								start = true;
							});

							iscroll.on('scrollEnd', function(e){
								if( e == null ) return;

								self._relativeScroll._end(e);

								start = false;
							});

							idx = self._scrolls.length;

							self._scrolls.push({
								refresh: function(){
									iscroll.refresh();
								}
							});
						})();
					}
				}
			} else if( displayListOfItems == 'button_more' && ! self._box.hasClass('mfilter-content_top') && type != 'image' ) {
				self._buttonsMore.push((function( _level0 ){		
					function init( first ) {
						var lessHeight	= 0,
							moreHeight	= 0,
							show		= false,
							count		= 0,
							idx			= 0;
						
						_level0.find('.mfilter-option').each(function(i){
							var _this = jQuery(this);
							
							if( _this.hasClass('mfilter-hide') || _this.hasClass('mfilter-hide-by-live-filter') ) return;
							
							var h = _this.actual( 'outerHeight', { includeMargin: true } );

							moreHeight += h;

							if( idx >= self._options.displayListOfItems.limit_of_items ) {
								lessHeight += h;
								count++;
							}
							
							idx++;
						});

						lessHeight = moreHeight - lessHeight;

						if( count ) {
							wrapper.css('overflow','hidden').css('height', lessHeight+'px');
							
							function sh( show, force ) {
								if( force ) {
									wrapper.height( moreHeight );
								} else {
									wrapper.animate({
										'height' : ! show ? moreHeight : lessHeight
									}, 500, function(){
										if( self._relativeScroll != null )
											self._relativeScroll.refresh();
									});
								}
										
								_level0.find('a.mfilter-button-more').text(show?self._options.displayListOfItems.textMore.replace( '%s', count ):self._options.displayListOfItems.textLess);
							}

							_level0.find('.mfilter-content-opts').append(jQuery('<div>')
								.addClass( 'mfilter-button-more' )
								.append(jQuery('<a>')
									.attr( 'href', '#' )
									.addClass( 'mfilter-button-more' )
									.text( self._options.displayListOfItems.textMore.replace( '%s', count ) )
									.bind('click', function(){
										sh( show );

										show = ! show;
										
										wrapper[show?'addClass':'removeClass']('mfilter-slide-down');

										return false;
									})
								)
							);
						
							if( wrapper.hasClass('mfilter-slide-down') ) {
								sh( false, true );
								show = true;
							}
						}
					}
					
					init( true );
					
					idx = self._buttonsMore.length;
					
					return {
						refresh: function() {
							_level0.find('.mfilter-content-wrapper').removeAttr('style');
							_level0.find('.mfilter-button-more').remove();
							
							init();
						}
					};
				})( _level0 ));
			}
			
			if( type == 'cat_checkbox' ) {
				(function(){
					var cnt = 0;
					
					content.find('.mfilter-category .mfilter-option').each(function(i){
						if( jQuery(this).find('.mfilter-counter').text() != '0' ) {							
							if( i && ! cnt ) {
								jQuery(this).addClass('mfilter-first-child');
							}
							
							cnt++;
						} else {
							jQuery(this).addClass('mfilter-hide');
						}
					});
					
					if( ! cnt ) {
						_level0.addClass('mfilter-hide');
					}
				})();
			}
			
			(function(){
				if( self._box.hasClass( 'mfilter-content_top' ) ) {
					return;
				}
				
				if( displayLiveFilter < 1 || content.find('.mfilter-option').length < displayLiveFilter ) {
					displayLiveFilter = 0;
					
					return;
				}
				
				content.prepend(jQuery('<div class="mfilter-live-filter">')
					.append(jQuery('<input type="text" class="form-control" id="mfilter-live-filter-input-' + self._instanceIdx + '-' + i + '" />'))
				);
				wrapper.find('> .mfilter-options > div').attr('id', 'mfilter-live-filter-list-' + self._instanceIdx + '-' + i);

				_level0.addClass('mfilter-live-filter-init');

				jQuery('#mfilter-live-filter-list-' + self._instanceIdx + '-' + i).liveFilter('#mfilter-live-filter-input-'+self._instanceIdx + '-' + i, '.mfilter-visible,.mfilter-should-visible,.mfilter-disabled,.mfilter-option', {
					'filterChildSelector' : 'label',
					'after' : function(contains, containsNot){
						var list = jQuery('#mfilter-live-filter-list-' + self._instanceIdx + '-' + i);

						contains.removeClass('mfilter-should-visible').addClass('mfilter-visible');
						containsNot.removeClass('mfilter-visible').addClass('mfilter-should-visible');

						list.find('> .mfilter-option').removeClass('mfilter-first-child mfilter-last-child');
						
						list.find('> .mfilter-option:not(.mfilter-hide):not(.mfilter-hide-by-live-filter):first').addClass('mfilter-first-child');
						list.find('> .mfilter-option:not(.mfilter-hide):not(.mfilter-hide-by-live-filter):last').addClass('mfilter-last-child');

						if( idx !== null ) {
							if( displayListOfItems == 'scroll' ) {
								self._scrolls[idx].refresh();
							} else if( displayListOfItems == 'button_more' ) {
								self._buttonsMore[idx].refresh();
							}
						}
						
						if( self._relativeScroll != null ) {
							self._relativeScroll.refresh();
						}
					}
				});
					
				_level0.addClass('mfilter-live-filter-init');
				
				self._liveFilters.push({
					refresh: function(){
						content.find('.mfilter-live-filter')[content.find('.mfilter-option:not(.mfilter-hide)').length <= displayLiveFilter?'hide':'show']();
					},
					check: function() {
						jQuery('#mfilter-live-filter-input-'+self._instanceIdx + '-' + i).trigger('keyup');
					}
				});
				
				self._liveFilters[self._liveFilters.length-1].refresh();
			})();

			if( ! self._box.hasClass('mfilter-content_top') && heading.hasClass( 'mfilter-collapsed' ) ) {
				if( typeof params[seo_name] == 'undefined' ) {
					content.hide();
				}
			}
		});
	},
			
	/**
	 * Inicjuj nagłówki
	 */
	_initHeading: function() {
		var self = this;
		
		if( self._box.hasClass('mfilter-content_top') )
			return;
		
		self._box.find('.mfilter-heading').click(function(){
			var opts = jQuery(this).parent().find('> .mfilter-content-opts');

			if( jQuery(this).hasClass('mfilter-collapsed') ) {
				opts.slideDown('normal', function(){
					if( self._relativeScroll != null )
						self._relativeScroll.refresh();
				});
				jQuery(this).removeClass('mfilter-collapsed');
			} else {
				opts.slideUp('normal', function(){
					if( self._relativeScroll != null )
						self._relativeScroll.refresh();
				});
				jQuery(this).addClass('mfilter-collapsed');
			}
		});
	},
	
	_updateInlineHorizontal: function() {
		for( var i = 0; i < this._inlineHorizontalUpdate.length; i++ ) {
			this._inlineHorizontalUpdate[i]();
		}
	},
	
	_initInlineHorizontal: function() {
		var self = this;
		
		if( ! self._box.hasClass( 'mfilter-content_top' ) ) {
			return;
		}
		
		self._box.find('li[data-inline-horizontal="1"][data-type="checkbox"],li[data-inline-horizontal="1"][data-type="radio"]').each(function(){
			var $container = jQuery(this).addClass('mfilter-inline-horizontal').find('.mfilter-opts-container'),
				$wrapper = $container.find('> .mfilter-content-wrapper'),
				$options = $wrapper.find('> .mfilter-options'),
				$optionsCnt = $options.find('> .mfilter-options-container'),
				$tb = $optionsCnt.find('> .mfilter-tb'),
				left = 0;
			
			function width() {
				var w = 0,
					b = false;
				
				left = 0;
				
				$tb.find('> .mfilter-tb').each(function(){
					var ww = jQuery(this).outerWidth(true);
					
					if( self._lastEvent ) {
						var $el = jQuery(this).find('[id="' + self._lastEvent + '"]');
						
						if( $el.length ) {
							b = true;
						} else if( ! b ) {
							left += ww;
						}
					}
					
					w += ww;
				});
				
				return w;
			}
			
			self._inlineHorizontalUpdate[self._inlineHorizontalUpdate.length] = function() {
				$optionsCnt.removeAttr('style');
				$tb.removeAttr('style').css('margin-left',$tb.attr('data-mgr')+'px');
				
				o1 = w1;
				o2 = w2;
				
				w1 = $optionsCnt.width();
				w2 = width();
				
				$optionsCnt.css('width', w1);
				$tb.css('width', w2+fix);
				
				if( w2 > w1 ) {
					$right.addClass('mf-active');
					
					if( x >= w2-w1 && $left.hasClass('mf-active') ) {
						t=0;
						$right.trigger('click');
					} else if( self._lastEvent ) {
						var $el = $tb.find('[id="' + self._lastEvent + '"]');
						
						if( $el.length ) {
							var w = $el.parent().parent().parent().outerWidth(true);
							
							if( x > left ) {
								t=0;
								x=left-w+w1;
								$left.trigger('click');
							} else if( x+w1 < left+w ) {
								t=0;
								x=x+(w*2)-w1;
								$right.trigger('click');
							}
						}
					}
				} else {
					t=x=0;
					$left.addClass('mf-active').trigger('click');
					$right.removeClass('mf-active');
				}
				
				/*if( ! $right.hasClass('mf-active') ) {
					if( w2 > w1 ) {
						//t=0;
						$right.addClass('mf-active');//.trigger('click');
					} else {
						t=x=0;
						$left.addClass('mf-active').trigger('click');
						//$right.removeClass('mf-active');
					}
				} else {
					if( w2 <= w1 ) {
						$right.removeClass('mf-active');
					}
				}*/
			};
			
			var $left = jQuery('<a href="#"></a>'),
				$right = jQuery('<a href="#"></a>');
			
			$wrapper.prepend(jQuery('<div class="mfilter-scroll-left"></div>').append($left));
			$wrapper.append(jQuery('<div class="mfilter-scroll-right"></div>').append($right));
			
			var w1 = $optionsCnt.width(),
				w2 = width(),
				o1 = -1,
				o2 = -1,
				x = 0,
				fix = 50,
				t = 'normal';
			
			if( w2 > w1 ) {
				$right.addClass('mf-active');
			}
			
			$optionsCnt.css('width', w1);
			$tb.css('width', w2+fix).attr('data-mgr','0');
			
			$left.click(function(){
				var $self = jQuery(this);
				
				if( ! $self.hasClass('mf-active') ) return false;
				
				x -= w1;
				
				if( x <= 0 ) {
					x = 0;
					$self.removeClass('mf-active');
				}
				
				$tb.attr('data-mgr', -x).stop().animate({
					'marginLeft' : -x
				}, t);
				
				t = 'normal';
				
				$right.addClass('mf-active');
				
				return false;
			});
			$right.click(function(){
				var $self = jQuery(this);
				
				if( ! $self.hasClass('mf-active') ) return false;
				
				x += w1;
				
				if( x >= w2-w1 ) {
					x = w2-w1;
					$self.removeClass('mf-active');
				}
				
				$tb.attr('data-mgr', -x).stop().animate({
					'marginLeft' : -x
				}, t);
				
				t = 'normal';
				
				$left.addClass('mf-active');
				
				return false;
			});
		});
	},
	
	_initCategoryRelated: function() {
		var self	= this;
		
		self._box.find('.mfilter-filter-item.mfilter-related').each(function(){
			var $li			= jQuery(this),
				seoName		= $li.attr('data-seo-name'),
				autoLevels	= $li.attr('data-auto-levels'),
				fields		= $li.find('select[data-type="category-related"]');
			
			fields.each(function(i){
				if( ! autoLevels && i == fields.length - 1 ) {
					jQuery(this).change(function(){
						if( self._options['refreshResults'] != 'using_button' ) {
							self.runAjax();
						}
					});
				} else {						
					function eChange( $self, id ) {
						var $this = $self.parent().attr('data-id', id),
							labels = $this.parent().attr('data-labels').split('#|#');
						
						$self.change(function(){
							var cat_id = $self.val();
							
							$next = $this.next().find('select');
							$parent = $next.parent();
							label = typeof labels[id+1] == 'undefined' ? $parent.attr('data-next-label') : labels[id+1];

							if( cat_id ) {
								$next.html('<option value="">' + self._options.text.loading + '</option>');
								$next.prop('selectedIndex', 0);

								jQuery.post( self._ajaxUrl( self._options.ajaxCategoryUrl ), { 'cat_id' : cat_id }, function( response ){
									var data = jQuery.parseJSON( response );

									if( data.length && autoLevels ) {
										var $li = jQuery('<li>');

										$this.after( $li );
										$next = jQuery('<select>').appendTo( $li );
										
										if( ! label )
											label = MegaFilterLang.text_select;

										eChange( $next, id+1 );
									}

									$next.html('<option value="">' + label + '</option>');
									$next.prop('selectedIndex', 0);

									for( var i = 0; i < data.length; i++ ) {
										$next.append( '<option value="' + data[i].id + '">' + data[i].name + '</option>' );
									}

									if( autoLevels ) {
										if( ! data.length ) {
											if( self._options['refreshResults'] != 'using_button' ) {
												self.runAjax();
											}
										}
									} else if( ! data.length ) {
										if( self._options['refreshResults'] != 'using_button' ) {
											self.runAjax();
										}
									}
								});
							}

							var $p = $parent;

							while( $p.length ) {
								if( autoLevels ) {
									var $t = $p;
									$p = $p.next();
									$t.remove();
								} else {
									$p.find('select').prop('selectedIndex', 0).find('option[value!=""]').remove();
									$p = $p.next();
								}
							}

							if( ! cat_id ) {
								var beforeVal	= self.urlToFilters()[seoName],
									afterVal	= self.filters()[seoName];

								if( typeof beforeVal == 'undefined' )
									beforeVal = [-1];

								if( typeof afterVal == 'undefined' )
									afterVal = [-1];

								if( beforeVal.toString() != afterVal.toString() )
									self.runAjax();
							}
						});
					}

					eChange( jQuery(this), i );
				}
			});
		});
	},
	
	/**
	 * Inicjuj zdarzenia
	 */
	_initEvents: function() {
		var self = this;
		
		function val( $input ) {
			var val = $input.val(),
				parent = $input.parent().parent();
			
			if( $input.attr('type') == 'checkbox' || $input.attr('type') == 'radio' ) {
				val = $input.is(':checked');
				
				if( ! self._options.calculateNumberOfProducts ) {
					if( self._isInit && $input.attr('type') == 'radio' ) {
						parent.parent().find('.mfilter-counter').removeClass('mfilter-close');
					}
					
					parent.find('.mfilter-counter')[val?'addClass':'removeClass']('mfilter-close');
				}
				
				if( $input.attr('type') == 'radio' ) {
					parent.parent().parent().parent().parent().parent().parent().find('.mfilter-input-active').removeClass('mfilter-input-active');
				}
			}
			
			parent[val?'addClass':'removeClass']('mfilter-input-active');
		}
		
		self._box.find('input[type=checkbox],input[type=radio],select:not([data-type="category-related"])').change(function(){
			self._lastEvent = jQuery(this).attr('id');
			
			if( self._options['refreshResults'] != 'using_button' ) {
				self.runAjax();
			}
			
			val(jQuery(this));
		});
		
		self._box.find('.mfilter-options .mfilter-option').each(function(){
			var input = jQuery(this).find('input[type=checkbox],input[type=radio]');
			
			if( ! input.length ) return;
			
			jQuery(this).find('.mfilter-counter').bind('click', function(){
				if( ! jQuery(this).hasClass( 'mfilter-close' ) ) return;
				
				input.prop('checked', false).trigger('change');
				//jQuery(this).removeClass('mfilter-close');
			});
		
			if( input.is(':checked') ) {
				val(input);
			}
		});
		
		self._box.find('.mfilter-button a').bind('click', function(){
			self._lastEvent = null;
			
			if( jQuery(this).hasClass( 'mfilter-button-reset' ) ) {
				self.resetFilters();
			}
			
			self.ajax();
			
			return false;
		});
	},
			
	/**
	 * Uruchom ładowanie
	 */
	runAjax: function() {
		var self = this;
				
		switch( self._options['refreshResults'] ) {
			case 'using_button' :
			case 'immediately' : {
				self.ajax();
					
				break;
			}
			case 'with_delay' : {
				if( self._timeoutAjax )
					clearTimeout( self._timeoutAjax );
					
				self._timeoutAjax = setTimeout(function(){
					self.ajax();
							
					self._timeoutAjax = null;
				}, self._options['refreshDelay'] );
					
				break;
			}
		}
	},
	
	/**
	 * Pobierz aktualny zakres cen
	 */
	getPriceRange: function() {
		var self		= this,
			minInput	= self._box.find('[id="mfilter-opts-price-min"]'),
			maxInput	= self._box.find('[id="mfilter-opts-price-max"]'),
			min			= minInput.val(),
			max			= maxInput.val();		
			
		if( ! /^[0-9]+$/.test( min ) || min < self._options.priceMin )
			min = self._options.priceMin;
		
		if( ! /^[0-9]+$/.test( max ) || max > self._options.priceMax )
			max = self._options.priceMax;			
		
		return {
			min : parseInt( min ),
			max : parseInt( max )
		};
	},
	
	/**
	 * Inicjuj przedział cenowy
	 */
	_initPrice: function() {
		var self		= this,
			priceRange	= self.getPriceRange(),
			filters		= self.urlToFilters(),
			minInput	= self._box.find('[id="mfilter-opts-price-min"]').unbind('change').bind('change', function(){
				changePrice();
			}).val( filters.price ? filters.price[0] : priceRange.min ),
			maxInput	= self._box.find('[id="mfilter-opts-price-max"]').unbind('change').bind('change', function(){
				changePrice();
			}).val( filters.price ? filters.price[1] : priceRange.max ),
			slider		= self._box.find('[id="mfilter-price-slider"]');
		
		self._refreshPrice = function( minMax ) {
			var priceRange = self.getPriceRange();
			
			if( priceRange.min < self._options.priceMin ) {
				priceRange.min = self._options.priceMin;
			}
			
			if( priceRange.max > self._options.priceMax ) {
				priceRange.max = self._options.priceMax;
			}
			
			if( priceRange.min > priceRange.max ) {
				priceRange.min = priceRange.max;
			}
			
			if( priceRange.min.toString() != minInput.val() ) {
				minInput.val( priceRange.min );
			}
			
			if( priceRange.max.toString() != maxInput.val() ) {
				maxInput.val( priceRange.max );
			}
			
			slider.slider( 'option', 'values', [ priceRange.min, priceRange.max ] );
			
			if( minMax !== false ) {
				slider.slider( 'option', 'min', self._options.priceMin );
				slider.slider( 'option', 'max', self._options.priceMax );
				slider.slider( 'value', slider.slider('value') );
			}
		};
			
		function changePrice() {
			self._refreshPrice( false );
			
			if( self._options['refreshResults'] != 'using_button' )
				self.runAjax();
		}
		
		slider.slider({
			range	: true,
			min		: self._options.priceMin ,
			max		: self._options.priceMax,
			values	: [ priceRange.min, priceRange.max ],
			slide	: function( e, ui ) {
				minInput.val( ui.values[0] );
				maxInput.val( ui.values[1] );
			},
			stop	: function( e, ui ) {
				if( self._options['refreshResults'] != 'using_button' )
					self.runAjax();
			}
		});
	},
	
	_initWindowOnPopState: function(){
		var self = this;
			
		if( self._isInit ) return;
		
		function update() {
			self.eachInstances(function( self ){
				self._urlToFilters = null;
				self.initUrls();
				self.setFiltersByUrl();
			});
		}

		function setFilters( url ) {
			var params = self._parseUrl( url );

			if( typeof params.mfp != 'undefined' ) {				
				self.setFiltersByUrl( self.__urlToFilters( decodeURIComponent( params.mfp ) ) );
			} else {
				self.resetFilters();
			}
		}

		window.onpopstate = function(e){
			if( e.state ) {
				update();

				self._render( e.state.html, e.state.json, true );

				setFilters( e.state.url );
			} else if( typeof self._cache.mainContent[document.location] != 'undefined' && self._history > 0 ) {
				update();

				self._render( self._cache.mainContent[document.location].html, self._cache.mainContent[document.location].json, true );

				setFilters( document.location.toString() );
			} else if( self._changed && self._history > 0 ) {
				setFilters( self._startUrl.toString() );

				self.ajax( null, true );
			}

			self._history--;
		};
	},
	
	count: function( obj ) {
		var c = 0;
		
		for( var i in obj ) {
			c++;
		}
		
		return c;
	},
	
	setFiltersByUrl: function( params ) {
		var self	= this;
		
		if( typeof params == 'undefined' ) {
			params = self.urlToFilters();
		}
		
		self.resetFilters();
		
		self._box.find('li[data-type]').each(function(){
			var _this	= jQuery(this),
				type	= _this.attr('data-type'),
				seoName	= _this.attr('data-seo-name'),
				value	= params[seoName];
			
			if( typeof value == 'undefined' )
				return;
					
			switch( type ) {
				case 'rating' :
				case 'stock_status' :
				case 'manufacturers' :
				case 'image' :
				case 'radio' :
				case 'image_list_radio' :
				case 'image_list_checkbox' :
				case 'checkbox' : {
					for( var i in value ) {
						if( typeof value[i] == 'function' ) continue;
						
						var $p1 = _this.find('input[value="' + self.decode( decodeURIComponent( value[i] ) ).replace( /"/g, '&quot;' ) + '"]').prop('checked', true)
							.parent();
						
						$p1.parent()
							.addClass('mfilter-input-active').find('.mfilter-counter').addClass('mfilter-close');
						
						if( $p1.hasClass( 'mfilter-image' ) ) {
							$p1.addClass('mfilter-image-checked');
						}
					}
					
					break;
				}
				case 'select' : {
					_this.find('select option[value="' + self.decode( decodeURIComponent( value[0] ) ).replace( /"/g, '&quot;' ) + '"]').attr('selected', true);
						
					break;
				}
				case 'price' : {
					_this.find('input[id="mfilter-opts-price-min"]').val( value[0] );
					_this.find('input[id="mfilter-opts-price-max"]').val( value[1] );
					_this.find('[id="mfilter-price-slider"]').each(function(){					
						jQuery(this).slider( 'option', 'min', value[0] );
						jQuery(this).slider( 'option', 'max', value[1] );
						jQuery(this).slider( 'option', 'values', [ value[0], value[1] ] );
						jQuery(this).slider( 'value', jQuery(this).slider('value') );
					});
					
					break;
				}
				case 'text' :
				case 'search' : {
					_this.find('input').val( self.decode( decodeURIComponent( value[0] ) ) );
					
					break;
				}
			}
		});
		
		for( var i = 0; i < self._sliders.length; i++ ) {
			self._sliders[i].setValues();
		}
	},
	
	/**
	 * Pokaż loader
	 */
	_showLoader: function() {
		var self = this;
				
		if( self._jqLoader == null && self._options.showLoaderOverResults ) {
			self.__initLoader();
		}
		
		if( self._jqLoaderFilter == null && self._options.showLoaderOverFilter ) {
			self.__initLoaderFilter();
		}
		
		if( self._options.showLoaderOverResults ) {
			(function(){
				var w = self._jqContent.outerWidth(),
					h = self._jqContent.outerHeight(),
					j = self._jqContent.find('.product-list'),
					k = j.length ? j : self._jqContent.find('.product-grid'),
					l = k.length ? k : self._jqContent,
					t = k.length ? k.offset().top - 150 : l.offset().top;

				self._jqLoader
					.css('width', w + 'px')
					.css('height', h + 'px')
					.fadeTo('normal', 1)
					.find('img')
					.css('margin-top', t + 'px');
			})();
		}
		
		if( self._options.showLoaderOverFilter ) {
			(function(){
				var w = self._box.outerWidth(),
					h = self._box.outerHeight();
				
				self._jqLoaderFilter
					.css('width', w + 'px')
					.css('height', h + 'px')
					.fadeTo('normal',1);
			})();
		}
		
		if( self._options.autoScroll ) {
			jQuery('html,body').stop().animate({
				scrollTop: self._jqContent.offset().top + self._options.addPixelsFromTop
			}, 'low', function(){
				self._busy = false;
				self.render();
			});
		} else {
			self._busy = false;
			self.render();
		}
	},
	
	/**
	 * Ukryj loader
	 */
	_hideLoader: function() {
		var self = this;
		
		if( self._jqLoader !== null ) {		
			self._jqLoader.remove();
			self._jqLoader = null;
		}
		
		if( self._jqLoaderFilter !== null ) {
			self._jqLoaderFilter.remove();
			self._jqLoaderFilter = null;
		}
	},
	
	/**
	 * Pokaż wczytane dane
	 */
	render: function( history ) {
		var self = this;
		
		if( self._lastResponse === '' || self._busy ) {
			return;
		}
		
		self._hideLoader();
		
		// usuń wszystkie linki do skryptów JS
		self._lastResponse = self._lastResponse.replace( /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '' );
		
		var tmp = jQuery('<tmp>').html( self._lastResponse ),
			content = tmp.find(self._contentId), // znajdź treść główną
			json = tmp.find('#mfilter-json'); // informacje JSON zawierające dane o ilości produktów wg kategorii
			
		if( ! content.length && self._contentId != '#content' ) {
			content = tmp.find('#content');
		}
			
		if( content.length ) {
			var styles = self._jqContent.html().match( /<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi );
			
			if( styles != null && styles.length ) {
				for( var i = 0; i < styles.length; i++ ) {
					jQuery('head:first').append( styles[i] );
				}
			}
			
			self._render( content.html(), json && json.length ? self.base64_decode(json.html()) : null, history );
			
			self._lastResponse = '';
		} else {
			self.reload();
		}
	},
	
	_render: function( html, json, history ) {
		var self = this;
		
		if( history !== true ) {
			self._lastUrl = self.createUrl();
			
			if( self._ajaxPagination !== null ) {
				self._lastUrl += self._lastUrl.indexOf( '?' ) > -1 ? '&' : '?';
				self._lastUrl += 'page=' + self._ajaxPagination;
				
				self._ajaxPagination = null;
			}
			
			self._urlToFilters = null;
			
			try {
				window.history.pushState({
					'html'	: html,
					'json'	: json,
					'url'	: self._lastUrl
				}, '', self._lastUrl );
				
				self._history++;
			} catch( e ) {}
		}
		
		if( json ) {
			self.eachInstances(function( self ){
				self._parseInfo( json );
			});
		}
		
		self.beforeRender( self._lastResponse, html, json );
			
		self._jqContent.html( html );
			
		/*if( self._box.hasClass( 'mfilter-content_top' ) ) {
			self._jqContent.prepend( self._box.removeClass('init') );
			self.init( self._box, self._options );
		}*/
			
		if( typeof jQuery.totalStorage == 'function' && jQuery.totalStorage('display') ) {
			display_MFP( jQuery.totalStorage('display') );
		} else if( typeof jQuery.cookie == 'function' && jQuery.cookie('display') ) {
			display_MFP( jQuery.cookie('display') );
		} else {
			display_MFP( 'list' );
		}
			
		for( var i in self ) {
			if( i.indexOf( '_initAlways' ) === 0 && typeof self[i] == 'function' ) {
				self[i]();
			}
		}
		
		for( var f = 0; f < self._liveFilters.length; f++ ) {
			self._liveFilters[f].check();
		}
		
		// Support for Product Quantity Extension (15186)
		if( typeof pq_initExt == 'function' ) {
			pq_initExt();
		}
		
		if( self._options.routeHome == self._options.route && self._options.homePageAJAX ) {
			self._jqContent.find('.pagination > li > a').unbind('click').bind('click', function(){
				self.ajax( jQuery(this).attr('href') );
				
				return false;
			});
		}
		
		self.afterRender( self._lastResponse, html, json );
	},
	
	beforeRequest: function(){},
	
	beforeRender: function(){},
	
	afterRender: function(){},
	
	eachInstances: function( fn, skipCurrent ) {
		for( var i = 0; i < MegaFilterINSTANCES.length; i++ ) {
			if( skipCurrent === true && i == this._instanceIdx ) continue;
			
			fn( MegaFilterINSTANCES[i] );
		}
	},
	
	/**
	 * Załaduj dane
	 */
	ajax: function( url, history ) {
		var self = this;
		
		if( self._busy ) {
			self._waitingChanges = true;
			
			return;
		}
		
		if( typeof url == 'undefined' || url === null ) {
			url	= [ self._options.routeProduct, self._options.routeHome ].indexOf( self._options.route ) > -1 ? self.createUrl( self._options.ajaxResultsUrl ) : self.createUrl();
		}
		
		var cname	= url + self._options.idx;
		
		if( ( ! self._options.homePageAJAX && self._options.routeHome == self._options.route ) || self._options.routeProduct == self._options.route ) {
			window.location.href = url;return;
		}
		
		self.eachInstances(function( self ){
			self._busy = true;
			self._lastResponse = '';
		});
		
		self._showLoader();
		
		if( typeof self._params['page'] != 'undefined' ) {
			delete self._params['page'];
		}
		
		(function(){
			var filters = self.filters();
			
			self.eachInstances(function( self ){
				self.setFiltersByUrl( filters );
			}, true);
		})();
		
		if( typeof self._cache.lastResponse[cname] != 'undefined' ) {
			self.eachInstances(function( self2 ){
				self2._lastResponse = self._cache.lastResponse[cname];
			});
			
			setTimeout(function(){
				self.eachInstances(function( self ){
					self._busy = false;
				});
				
				self.render( history );
			}, 100);
			
			return;
		}
		
		self.beforeRequest();
		
		self._changed = true;
		
		jQuery.ajax({
			'type'		: 'GET',
			'url'		: self._ajaxUrl( url ),
			'timeout'	: 60 * 1000,
			'cache'		: false,
			'data'		: {
				'mfilterAjax'	: '1',
				'mfilterIdx'	: self._options.idx,
				'mfilterBTypes'	: self.baseTypes().join(','),
				'mfilterPath'	: self._options.params.path
			},
			'success'	: function( response ) {
				self.eachInstances(function( self ){
					self._busy = false;
				});
				
				if( response ) {
					self.eachInstances(function( self ){
						self._lastResponse	= response;
						self._cache.lastResponse[cname]	= response;
					});
					
					self.render( history );
					
					if( self._waitingChanges ) {
						self._waitingChanges = false;
						self.ajax();
					}
				} else {
					self.reload();
				}
			},
			'error'		: function() {
				self.reload();
			}
		});
	},
	
	/**
	 * Utwórz pełny adres URL
	 */
	createUrl: function( url, attribs, force ) {
		var self	= this,
			params	= self.paramsToUrl( url, attribs ),
			filters	= self.filtersToUrl(),
			urlSep	= self._urlSep;
		
		if( typeof url == 'undefined' ) {
			url = self._url;
		} else {
			urlSep = self._parseSep( url.split('#')[0] ).urlSep;
			url = self._parseSep( url.split('#')[0] ).url;
		}
		
		if( params || filters ) {
			url += urlSep.f;
			
			if( params ) {
				url += params;
			}
			
			if( filters ) {
				if( params ) {
					url += urlSep.n;
				}
				
				url += 'mfp' + ( urlSep.n == '&' ? '=' : urlSep.n ) + filters;
			} else if( force ) {
				var mfp = self.filtersToUrl( self.urlToFilters() );

				if( mfp ) {
					url += urlSep.n;
					url += 'mfp' + ( urlSep.n == '&' ? '=' : urlSep.n ) + mfp;
				}
			}
		}
		
		return url;
	},
	
	/**
	 * Sprawdź poprawność wpisanego zakresu cen
	 * 
	 * @return bool
	 */
	_validPrice: function( min, max ) {
		var self = this;
		
		min = parseInt( min );
		max = parseInt( max );
		
		if( min < self._options.priceMin )
			return false;
		
		if( max > self._options.priceMax )
			return false;
		
		if( min > max )
			return false;
		
		if( min == max && min == self._options.priceMin && max == self._options.priceMax )
			return false;
		
		return true;
	},
	
	/**
	 * Przekształć parametry z adresu URL na obiekt
	 * 
	 * @return object
	 */
	urlToFilters: function() {
		if( this._urlToFilters !== null ) {
			return this._urlToFilters;
		}
		
		var self = this;
			
		self._urlToFilters = {};
		
		if( ! self._params.mfp )
			return self._urlToFilters;
		
		self._params.mfp =  decodeURIComponent( self._params.mfp );
		
		self._urlToFilters = self.__urlToFilters( self._params.mfp );
		
		return self._urlToFilters;
	},
	
	__urlToFilters: function( mfp ) {
		var self	= this,
			obj		= {},
			matches	= mfp.match( /[a-z0-9\-_]+\[[^\]]+\]/g );
		
		if( ! matches ) {
			return obj;
		}
		
		for( var i = 0; i < matches.length; i++ ) {
			var key = matches[i].match( /([a-z0-9\-_]+)\[[^\]]+\]/ )[1],
				val = matches[i].match( /[a-z0-9\-_]+\[([^\]]+)\]/ )[1].split(',');
			
			switch( key ) {
				case 'price' : {
					if( typeof val[0] != 'undefined' && val[1] != 'undefined' ) {
						if( self._validPrice( val[0], val[1] ) )
							obj[key] = val;
					}
					
					break;
				}
				default : {
					obj[key] = val;
				}
			}
		}
		
		return obj;
	},
	
	resetFilters: function(){
		var self	= this;
		
		self._box.find('li[data-type]').each(function(){
			var _this		= jQuery(this),
				type		= _this.attr('data-type'),
				baseType	= _this.attr('data-base-type'),
				defaultVal	= null;
				
			_this.find('.mfilter-input-active').removeClass('mfilter-input-active');
			
			if( baseType == 'stock_status' && self._options.inStockDefaultSelected ) {
				defaultVal = self._options.inStockStatus;
			}
			
			switch( type ) {
				case 'image' : {
					_this.find('input[type=checkbox]:checked,input[type=radio]:checked').prop('checked', false).parent().removeClass('mfilter-image-checked');
					
					break;
				}
				case 'tree' : {
					_this.find('input[name=path]').val( typeof self._options.params.path == 'undefined' ? '' : self._options.params.path );
					
					break;
				}
				case 'rating' :
				case 'stock_status' :
				case 'manufacturers' :
				case 'checkbox' : 
				case 'image_list_checkbox' : 
				case 'image_list_radio' : 
				case 'radio' : {
					_this.find('input[type=checkbox]:checked,input[type=radio]:checked').prop('checked', false);
					_this.find('.mfilter-counter').removeClass('mfilter-close');
					
					if( defaultVal !== null ) {
						_this.find('input[value="' + defaultVal.replace( /"/g, '&quot;' ) + '"]').prop('checked', true)
							.parent().parent().find('.mfilter-counter').addClass('mfilter-close');
					}
					
					break;
				}
				case 'search_oc' :
				case 'search' : {
					_this.find('input[id="mfilter-opts-search"]').val( '' );
						
					break;
				}
				case 'text' : {
					_this.find('input[type=text]').val( '' );
					
					break;
				}
				case 'slider' : {					
					
					
					break;
				}
				case 'price' : {
					_this.find('input[id="mfilter-opts-price-min"]').val( self._options.priceMin );
					_this.find('input[id="mfilter-opts-price-max"]').val( self._options.priceMax );
					_this.find('[id="mfilter-price-slider"]').each(function(){					
						jQuery(this).slider( 'option', 'min', self._options.priceMin );
						jQuery(this).slider( 'option', 'max', self._options.priceMax );
						jQuery(this).slider( 'option', 'values', [ self._options.priceMin, self._options.priceMax ] );
						jQuery(this).slider( 'value', jQuery(this).slider('value') );
					});
					
					break;
				}
				case 'related' :
				case 'select' : {
					_this.find('select option').removeAttr('selected');
					
					if( defaultVal !== null ) {
						_this.find('select option').each(function(i){
							if( jQuery(this).val() == defaultVal ) {
								jQuery(this).attr('selected', true);
								_this.find('select').prop('selectedIndex', i);
								
								return false;
							}
						});
					} else {
						_this.find('select option:first').attr('selected', true);
						_this.find('select').prop('selectedIndex', 0);
					}
					
					if( type == 'related' ) {
						_this.find('select').each(function(i){
							if( i ) {
								if( _this.attr('data-auto-levels') ) {
									jQuery(this).parent().remove();
								} else {
									jQuery(this).find('option[value!=""]').remove();
								}
							}
						});
					}
					
					break;
				}
			}
		});
		
		for( var i = 0; i < self._sliders.length; i++ ) {
			self._sliders[i].resetValues();
		}
	},
	
	/**
	 * Pobierz aktualne wartości filtrów
	 * 
	 * @return object
	 */
	filters: function() {
		var self	= this,
			params	= { },
			stockStatusExist = self._box.find('li[data-base-type="stock_status"]').length ? true : false;
				
		self._box.find('li[data-type]').each(function(){
			var _this	= jQuery(this),
				type	= _this.attr('data-type'),
				seoName	= _this.attr('data-seo-name');
					
			switch( type ) {
				case 'cat_checkbox' : 
				case 'rating' :
				case 'stock_status' : 
				case 'manufacturers' :
				case 'image_list_checkbox' :
				case 'image' :
				case 'checkbox' : {
					_this.find('input[type=checkbox]:checked').each(function(){
						if( typeof params[seoName] == 'undefined' )
							params[seoName] = [];
						
						params[seoName].push( encodeURIComponent( self.encode( jQuery(this).val() ) ) );
					});
					
					break;
				}
				case 'image_list_radio' :
				case 'radio' : {
					_this.find('input[type=radio]:checked').each(function(){
						params[seoName] = [ encodeURIComponent( self.encode( jQuery(this).val() ) ) ];
					});
						
					break;
				}
				case 'slider' : {
					var slider_id = _this.attr('data-slider-id'),
						slider_vals = self._sliders[slider_id].getValues();
						
					if( slider_vals.length ) {
						params[seoName] = slider_vals;
					}
					
					break;
				}
				case 'price' : {
					var priceRange = self.getPriceRange();
					
					if( priceRange.min != self._options.priceMin || priceRange.max != self._options.priceMax ) {
						if( self._validPrice( priceRange.min, priceRange.max ) )
							params[seoName] = [ priceRange.min, priceRange.max ];
					}
					
					break;
				}
				case 'search_oc' :
				case 'search' : {
					_this.find('input[id="mfilter-opts-search"]').each(function(){
						if( jQuery(this).val() !== '' ) {
							params[seoName] = [ encodeURIComponent( self.encode( jQuery(this).val() ) ) ];
						}
					});
					
					break;
				}
				case 'text' : {
					_this.find('input[type=text]').each(function(){
						if( jQuery(this).val() != '' ) {
							params[seoName] = [ encodeURIComponent( self.encode( jQuery(this).val() ) ) ];
						}
					});
					
					break;
				}
				case 'select' : {
					_this.find('select').each(function(){
						if( jQuery(this).val() )
							params[seoName] = [ encodeURIComponent( self.encode( jQuery(this).val() ) ) ];
					});
						
					break;
				}
				case 'related' : {
					//if( _this.find('select:last').val() ) {
						_this.find('select').each(function(){
							var val = jQuery(this).val();
							
							if( val ) {							
								if( typeof params[seoName] == 'undefined' )
									params[seoName] = [];

								params[seoName].push( val );
							}
						});
					//}
				}
				case 'tree' : {
					_this.find('input').each(function(){
						var val = jQuery(this).val(),
							path = typeof self._options.params.mfp_org_path == 'undefined' ? self._options.params.path : self._options.params.mfp_org_path;
						
						if( val && val != path ) {
							params['path'] = [ val ];
						}
					});
					
					break;
				}
			}
		});
		
		// sprawdź czy domyślnie powinna być zaznaczona opcja "in stock"
		if( self._options.inStockDefaultSelected && typeof params['stock_status'] == 'undefined' ) {
			params['stock_status'] = stockStatusExist ? [] : [ self._options.inStockStatus ];
		}
		
		return params;
	},
			
	/**
	 * Utwórz URL na podstawie parametrów
	 */
	filtersToUrl: function( params ) {
		var self	= this,
			url		= '';
		
		if( typeof params == 'undefined' ) {
			params	= self.filters();
		}
				
		for( var i in params ) {
			url += url ? ',' : '';
			url += '' + i + '[' + params[i].join(',') + ']';
		}
			
		return url;
	},
	
	/**
	 * Przekształć parametry na adres URL
	 * 
	 * @return string
	 */
	paramsToUrl: function( url, attribs ) {
		var self	= this,
			params	= typeof url == 'undefined' ? self._params : self._parseUrl( url, attribs ),
			urlSep	= typeof url == 'undefined' ? self._urlSep : self._parseSep( url ).urlSep;
		
		return self._paramsToUrl( params, {
			'skip'	: [ 'mfilter-ajax', 'mfp', 'page' ],
			'sep'	: urlSep.n,
			'sep2'	: urlSep.n == '&' ? '=' : urlSep.n,
			'fn'	: function( i ) {
				return typeof url == 'undefined' && typeof self._inUrl[i] == 'undefined';
			}
		});
	},
	
	_paramsToUrl: function( params, o ) {
		var url = '';
		
		o = jQuery.extend({
			'skip'	: [],
			'sep'	: '&',
			'sep2'	: '=',
			'fn'	: function(){}
		}, typeof o == 'object' ? o : {});
		
		for( var i in params ) {
			if( o.skip.indexOf( i ) > -1 ) continue;
			
			if( o.fn( i, params[i] ) ) continue;
			
			url += url ? o.sep : '';
			url += i + o.sep2 + params[i];
		}
		
		return url;
	},
		
	/**
	 * @param url string
	 * @param attribs object
	 * @return object
	 */
	_parseUrl: function( url, attribs ) {		
		if( typeof attribs != 'object' )
			attribs = {
				'mfilter-ajax'	: '1'
			};
		
		if( typeof url == 'undefined' )
			return attribs;
			
		var self	= this,
			params, i, name, value, param;
		
		url = url.split('#')[0];
		
		if( url.indexOf( '?' ) > -1 || url.indexOf( '&' ) > -1 ) {
			params = typeof self.parse_url( url ).query != 'undefined' ? self.parse_url( url ).query.split('&') : url.split('&');//( url.indexOf( '?' ) > -1 ? url.split('?')[1] : url ).split('&');
			
			for( i = 0; i < params.length; i++ ) {
				if( params[i].indexOf( '=' ) < 0 ) continue;
				
				param	= params[i].split('=');
				name	= param[0];
				value	= param[1];

				if( ! name ) continue;

				attribs[name] = value;
			}
		} else {
			params	= url.split( ';' );
			name	= null;
				
			for( i = 1; i < params.length; i++ ) {
				if( name === null )
					name = params[i];
				else {
					attribs[name] = params[i];
					name = null;
				}
			}
		}
		
		return attribs;
	},
	
	/**
	 * Przeładuj stronę
	 */
	reload: function() {
		var self = this;
		
		window.location.href = self.createUrl();
	}
};
var MegaFilterLang = {};

function display_MFP(view) {
	// Product List
	jQuery('#list-view').click(function() {
		jQuery('#content .product-layout > .clearfix').remove();

		jQuery('#content .product-layout').attr('class', 'product-layout product-list col-xs-12');

		localStorage.setItem('display', 'list');
	});

	// Product Grid
	jQuery('#grid-view').click(function() {
		jQuery('#content .product-layout > .clearfix').remove();

		// What a shame bootstrap does not take into account dynamically loaded columns
		cols = jQuery('#column-right, #column-left').length;

		if (cols == 2) {
			jQuery('#content .product-layout').attr('class', 'product-layout product-grid col-lg-6 col-md-6 col-sm-12 col-xs-12');

			jQuery('#content .product-layout:nth-child(2)').after('<div class="clearfix visible-md visible-sm"></div>');
		} else if (cols == 1) {
			jQuery('#content .product-layout').attr('class', 'product-layout product-grid col-lg-4 col-md-4 col-sm-6 col-xs-12');

			jQuery('#content .product-layout:nth-child(3)').after('<div class="clearfix visible-lg"></div>');
		} else {
			jQuery('#content .product-layout').attr('class', 'product-layout product-grid col-lg-3 col-md-3 col-sm-6 col-xs-12');

			jQuery('#content .product-layout:nth-child(4)').after('<div class="clearfix"></div>');
		}

		 localStorage.setItem('display', 'grid');
	});

	if (localStorage.getItem('display') == 'list') {
		jQuery('#list-view').trigger('click');
	} else {
		jQuery('#grid-view').trigger('click');
	}
}