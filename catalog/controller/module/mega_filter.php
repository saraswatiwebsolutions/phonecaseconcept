<?php  
class ControllerModuleMegaFilter extends Controller {
	
	private static $_warningRendered = false;
	
	private function _keysByAttribs( $attributes ) {
		$keys = array();
		
		foreach( $attributes as $key => $attribute ) {
			$keys[$attribute['seo_name']] = $key;
		}
		
		return $keys;
	}
	
	private function _setCache( $name, $value ) {
		if( ! is_dir( DIR_SYSTEM . 'cache_mfp' ) || ! is_writable( DIR_SYSTEM . 'cache_mfp' ) ) return false;
		
		file_put_contents( DIR_SYSTEM . 'cache_mfp/' . $name, serialize( $value ) );
		file_put_contents( DIR_SYSTEM . 'cache_mfp/' . $name . '.time', time() + 60 * 60 * 24 );
		
		return true;
	}
	
	private function _getCache( $name ) {
		$dir		= DIR_SYSTEM . 'cache_mfp/';
		$file		= $dir . $name;
		$file_time	= $file . '.time';
		
		if( ! file_exists( $file ) ) {
			return NULL;
		}
		
		if( ! file_exists( $file_time ) ) {
			return NULL;
		}
		
		$time = (float) file_get_contents( $file_time );
		
		if( $time < time() ) {
			@ unlink( $file );
			@ unlink( $file_time );
			
			return false;
		}
		
		return unserialize( file_get_contents( $file ) );
	}
	
	private function _renderWarning( $warning, $links = false ) {
		if( self::$_warningRendered ) {
			return;
		}
		
		echo '<div style="padding: 10px; text-align: center">';
		echo $warning;
		
		if( $links ) {
			echo '<br /><br />';
			echo 'Please <a href="https://github.com/vqmod/vqmod/releases/tag/v2.5.1-opencart.zip" target="_blank">download VQMod</a> and read ';
			echo '<a href="https://github.com/vqmod/vqmod/wiki/Installing-vQmod-on-OpenCart" target="_blank">How to installl VQMod</a>';
		}
		
		echo '</div>';
		
		self::$_warningRendered = true;
	}
	
	public function index( $setting ) {
		if( ! class_exists( 'VQMod' ) ) {
			$this->_renderWarning( 'Mega Filter PRO to work properly requires an installed VQMod.', true );
			
			return;
		}
		
		if( version_compare( VQMod::$_vqversion, '2.5.1', '<' ) ) {
			$this->_renderWarning( 'Mega Filter PRO to work properly requires VQMod in version 2.5.1 or later.<br />Your version of VQMod is too old. Please upgrade it to the latest version.', true );
			
			return;
		}
		
		if( ! isset( $setting['_idx'] ) ) {
			$this->_renderWarning( 'There is a conflict Mega Filter PRO with your template or other extension - please contact us.' );
			
			return;
		}
		
		if( empty( $setting[$setting['_idx']]['status'] ) ) {
			return;
		}
		
		if( empty( $setting['base_attribs'] ) ) {
			$setting['base_attribs'] = empty( $setting[$setting['_idx']]['base_attribs'] ) ? array() : $setting[$setting['_idx']]['base_attribs'];
		}
		
		if( empty( $setting['attribs'] ) ) {
			$setting['attribs'] = empty( $setting[$setting['_idx']]['attribs'] ) ? array() : $setting[$setting['_idx']]['attribs'];
		}
		
		if( empty( $setting['options'] ) ) {
			$setting['options'] = empty( $setting[$setting['_idx']]['options'] ) ? array() : $setting[$setting['_idx']]['options'];
		}
		
		if( empty( $setting['filters'] ) ) {
			$setting['filters'] = empty( $setting[$setting['_idx']]['filters'] ) ? array() : $setting[$setting['_idx']]['filters'];
		}
		
		if( empty( $setting['categories'] ) ) {
			$setting['categories'] = empty( $setting[$setting['_idx']]['categories'] ) ? array() : $setting[$setting['_idx']]['categories'];
		}
		
		/**
		 * Ustawienia
		 */
		$settings	= $this->config->get('mega_filter_settings');
		
		/**
		 * Sprawdź szablon
		 */
		if( isset( $setting[$setting['_idx']]['layout_id'] ) && is_array( $setting[$setting['_idx']]['layout_id'] ) ) {
			/**
			 * Sprawdź czy zdefiniowano kategorię 
			 */
			if( in_array( $settings['layout_c'], $setting[$setting['_idx']]['layout_id'] ) && isset( $this->request->get['path'] ) ) {				
				/**
				* Pokaż w kategoriach 
				*/
				if( ! empty( $setting[$setting['_idx']]['category_id'] ) ) {
					$categories		= explode( '_', $this->request->get['path'] );
					
					if( ! empty( $setting[$setting['_idx']]['category_id_with_childs'] ) ) {
						$is = false;
						
						foreach( $categories as $category_id ) {
							if( in_array( $category_id, $setting[$setting['_idx']]['category_id'] ) ) {
								$is = true; break;
							}
						}
						
						if( ! $is )
							return;
					} else {
						$category_id	= end( $categories );
						
						if( ! in_array( $category_id, $setting[$setting['_idx']]['category_id'] ) )
							return false;
					}
				}
				
				/**
				 * Ukryj w kategoriach 
				 */
				if( ! empty( $setting[$setting['_idx']]['hide_category_id'] ) ) {
					$categories		= explode( '_', $this->request->get['path'] );
					
					if( ! empty( $setting[$setting['_idx']]['hide_category_id_with_childs'] ) ) {						
						foreach( $categories as $category_id ) {
							if( in_array( $category_id, $setting[$setting['_idx']]['hide_category_id'] ) ) {
								return;
							}
						}
					} else {
						$category_id	= array_pop( $categories );

						if( in_array( $category_id, $setting[$setting['_idx']]['hide_category_id'] ) ) {
							return;
						}
					}
				}
			}
		}
		
		/**
		 * Sprawdź sklep 
		 */
		if( isset( $setting[$setting['_idx']]['store_id'] ) && is_array( $setting[$setting['_idx']]['store_id'] ) && ! in_array( $this->config->get('config_store_id'), $setting[$setting['_idx']]['store_id'] ) ) {
			return;
		}
		
		/**
		 * Sprawdź grupę
		 */
		if( ! empty( $setting[$setting['_idx']]['customer_groups'] ) ) {
			$customer_group_id = $this->customer->isLogged() ? $this->customer->getGroupId() : $this->config->get( 'config_customer_group_id' );
			
			if( ! in_array( $customer_group_id, $setting[$setting['_idx']]['customer_groups'] ) ) {
				return;
			}
		}
		
		/**
		 * Załaduj język 
		 */
		$data = $this->language->load('module/mega_filter');
		
		/**
		 * Ustaw tytuł 
		 */
		if( isset( $setting[$setting['_idx']]['title'][$this->config->get('config_language_id')] ) ) {
			$data['heading_title'] = $setting[$setting['_idx']]['title'][$this->config->get('config_language_id')];
		}
		
		/**
		 * Załaduj modele 
		 */
		$this->load->model('module/mega_filter');
		//$t=microtime(true);
		$core = MegaFilterCore::newInstance( $this, NULL );
		$cache = NULL;
		
		if( ! empty( $settings['cache_enabled'] ) ) {
			$cache = 'idx.' . $setting['_idx'] . '.' . $core->cacheName();
		}
		
		/**
		 * Lista atrybutów 
		 */
		if( ! $cache || NULL == ( $attributes = $this->_getCache( $cache ) ) ) {
			$attributes	= $this->model_module_mega_filter->getAttributes( 
				$core,
				$setting['_idx'],
				$setting['base_attribs'], 
				$setting['attribs'], 
				$setting['options'], 
				$setting['filters'],
				empty( $setting['categories'] ) ? array() : $setting['categories']
			);
			
			if( ! empty( $settings['cache_enabled'] ) ) {
				$this->_setCache( $cache, $attributes );
			}
		}
		//echo microtime(true)-$t;
		/**
		 * Pobierz klucze wg nazw 
		 */
		$keys		= $this->_keysByAttribs( $attributes );
		
		/**
		 * Aktualna trasa 
		 */
		$route		= isset( $this->request->get['route'] ) ? $this->request->get['route'] : NULL;
		
		/**
		 * Usuń listę branż dla widoku branż 
		 */
		if( in_array( $route, array( 'product/manufacturer', 'product/manufacturer/info' ) ) && isset( $keys['manufacturers'] ) ) {
			unset( $attributes[$keys['manufacturers']] );
		}
		
		if( in_array( $route, array( 'product/search' ) ) && empty( $this->request->get['search'] ) && empty( $this->request->get['tag'] ) ) {
			$attributes = array();
		}
		
		if( ! $attributes ) {
			return;
		}
		
		$scheme_find = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on' ? 'http://' : 'https://';
		$scheme_replace = $scheme_find == 'https://' ? 'http://' : 'https://';
		
		$mijo_shop	= class_exists( 'MijoShop' ) ? true : false;
		$joo_cart	= defined( 'JOOCART_SITE_URL' ) ? array(
			'site_url' => str_replace( $scheme_find, $scheme_replace, JOOCART_SITE_URL ),
			'main_url' => str_replace( $scheme_find, $scheme_replace, $this->url->link( '', '', 'SSL' ) )
		) : false;
		
		$is_mobile = Mobile_Detect_MFP::create()->isMobile();
		
		if( $setting['position'] == 'content_top' && ! empty( $settings['change_top_to_column_on_mobile'] ) && $is_mobile ) {
			$setting['position'] = 'column_left';
			$data['hide_container'] = true;
		}
		
		$data['direction']			= $this->language->get('direction');
		$data['ajaxInfoUrl']		= $this->url->link( 'module/mega_filter/ajaxinfo', '', 'SSL' );
		$data['ajaxResultsUrl']		= $this->url->link( 'module/mega_filter/results', '', 'SSL' );
		$data['ajaxCategoryUrl']	= $this->url->link( 'module/mega_filter/categories', '', 'SSL' );
			
		$data['ajaxInfoUrl'] = str_replace( $scheme_find, $scheme_replace, $data['ajaxInfoUrl'] );
		$data['ajaxResultsUrl'] = str_replace( $scheme_find, $scheme_replace, $data['ajaxResultsUrl'] );
		$data['ajaxCategoryUrl'] = str_replace( $scheme_find, $scheme_replace, $data['ajaxCategoryUrl'] );
		
		$data['is_mobile']		= $is_mobile;
		$data['mijo_shop']		= $mijo_shop;
		$data['joo_cart']		= $joo_cart;
		$data['filters']		= $attributes;
		$data['settings']		= $settings;
		$data['params']			= $core->getParseParams();
		$data['price']			= $core->getMinMaxPrice();
		$data['_idx']			= $setting['_idx'];
		$data['_route']			= base64_encode( $core->route() );
		$data['_routeProduct']	= base64_encode( 'product/product' );
		$data['_routeHome']		= base64_encode( 'common/home' );
		$data['_position']		= $setting['position'];
		$data['getSymbolLeft']	= $this->currency->getSymbolLeft();
		$data['getSymbolRight']	= $this->currency->getSymbolRight();
		$data['requestGet']		= $this->request->get;
		$data['_horizontalInline']	= $setting['position'] == 'content_top' && ! empty( $setting[$setting['_idx']]['inline_horizontal'] ) ? true : false;
		$data['smp']				= array(
			'isInstalled'			=> $this->config->get( 'smp_is_install' ),
			'disableConvertUrls'	=> $this->config->get( 'smp_disable_convert_urls' )
		);		
		$data['_v'] = $this->config->get('mfilter_version') ? $this->config->get('mfilter_version') : '1';
		
		if( $mijo_shop ) {
			MijoShop::getClass('base')->addHeader(JPATH_MIJOSHOP_OC . '/catalog/view/javascript/mf/iscroll.js', false);
			MijoShop::getClass('base')->addHeader(JPATH_MIJOSHOP_OC . '/catalog/view/javascript/mf/mega_filter.js', false);

			if( file_exists(DIR_TEMPLATE . $this->config->get('config_template') . '/stylesheet/mf/style.css') ) {
				MijoShop::get()->addHeader(JPATH_MIJOSHOP_OC.'/catalog/view/theme/' . $this->config->get('config_template') . '/stylesheet/mf/style.css');
			} else {
				MijoShop::get()->addHeader(JPATH_MIJOSHOP_OC.'/catalog/view/theme/default/stylesheet/mf/style.css');
			}
			
			MijoShop::get()->addHeader(JPATH_MIJOSHOP_OC.'/catalog/view/theme/default/stylesheet/mf/style-2.css');
		} else {
			//$this->document->addScript('catalog/view/javascript/mf/jquery-ui.min.js?v'.$data['_v']);
			$this->document->addScript('catalog/view/javascript/mf/iscroll.js?v'.$data['_v']);
			$this->document->addScript('catalog/view/javascript/mf/mega_filter.js?v'.$data['_v']);

			$this->document->addStyle('catalog/view/theme/default/stylesheet/mf/jquery-ui.min.css?v'.$data['_v']);
			
			if( file_exists(DIR_TEMPLATE . $this->config->get('config_template') . '/stylesheet/mf/style.css') ) {
				$this->document->addStyle('catalog/view/theme/' . $this->config->get('config_template') . '/stylesheet/mf/style.css?v'.$data['_v']);
			} else {
				$this->document->addStyle('catalog/view/theme/default/stylesheet/mf/style.css?v'.$data['_v']);
			}
			
			$this->document->addStyle('catalog/view/theme/default/stylesheet/mf/style-2.css?v'.$data['_v']);
		}

		/**
		 * Szablon 
		 */
		if( file_exists(DIR_TEMPLATE . $this->config->get('config_template') . '/template/module/mega_filter.tpl') ) {
			return $this->load->view($this->config->get('config_template') . '/template/module/mega_filter.tpl', $data);
		} else {
			return $this->load->view('default/template/module/mega_filter.tpl', $data);
		}
	}
	
	public function ajaxinfo() {
		$this->load->model('module/mega_filter');
		
		$idx = 0;
		
		if( isset( $this->request->get['mfilterIdx'] ) )
			$idx = (int) $this->request->get['mfilterIdx'];
		
		$baseTypes = array( 'stock_status', 'manufacturers', 'rating', 'attributes', 'options', 'filters' );
		
		if( isset( $this->request->get['mfilterBTypes'] ) ) {
			$baseTypes = explode( ',', $this->request->get['mfilterBTypes'] );
		}
		
		if( false !== ( $idx2 = array_search( 'categories:tree', $baseTypes ) ) ) {
			unset( $baseTypes[$idx2] );
		}
		
		echo json_encode( MegaFilterCore::newInstance( $this, NULL )->getJsonData($baseTypes, $idx) );
	}
	
	public function categories() {
		$cats = array();
		
		if( ! empty( $this->request->post['cat_id'] ) ) {
			$this->load->model('catalog/category');
			
			foreach( $this->model_catalog_category->getCategories( $this->request->post['cat_id'] ) as $cat ) {
				$cats[] = array(
					'id' => $cat['category_id'],
					'name' => $cat['name']
				);
			}
		}
		
		echo json_encode( $cats );
	}
	
	public function results() {
		$data = array();
    	$data = $this->language->load('product/search');
		
		$this->load->model('catalog/category');		
		$this->load->model('catalog/product');		
		$this->load->model('tool/image');
		
		$keys	= array( 'sort' => 'p.sort_order', 'order' => 'ASC', 'page' => 1, 'limit' => $this->config->get('config_catalog_limit') );
		
		$url = '';
		
		foreach( $keys as $key => $keyDef ) {
			${$key} = isset( $this->request->get[$key] ) ? $this->request->get[$key] : $keyDef;
			
			if( isset( $this->request->get[$key] ) ) {
				$url .= '&' . $key . '=' . $this->request->get[$key];
			}
			
		}
		
		$this->document->setTitle($this->language->get('heading_title'));
		$this->document->addScript('catalog/view/javascript/jquery/jquery.total-storage.min.js');						

		/**
		 * Breadcrumb 
		 */
		$data['breadcrumbs'] = array();
   		$data['breadcrumbs'][] = array( 
       		'text'      => $this->language->get('text_home'),
			'href'      => $this->url->link('common/home'),
      		'separator' => false
   		);
		
   		$data['breadcrumbs'][] = array(
       		'text'      => $this->language->get('heading_title'),
			'href'      => $this->url->link('module/mega_filter/results', $url),
      		'separator' => $this->language->get('text_separator')
   		);
		
		$data['text_compare'] = sprintf($this->language->get('text_compare'), (isset($this->session->data['compare']) ? count($this->session->data['compare']) : 0));
		$data['compare'] = $this->url->link('product/compare');
		
		$data['products'] = array();

		if (isset($this->request->get['sort'])) {
			$sort = $this->request->get['sort'];
		} else {
			$sort = 'p.sort_order';
		}

		if (isset($this->request->get['order'])) {
			$order = $this->request->get['order'];
		} else {
			$order = 'ASC';
		}

		if (isset($this->request->get['page'])) {
			$page = $this->request->get['page'];
		} else {
			$page = 1;
		}

		if (isset($this->request->get['limit'])) {
			$limit = $this->request->get['limit'];
		} else {
			$limit = $this->config->get('config_product_limit');
		}
		
		if( $limit < 1 ) {
			$limit = 1;
		}
		
		$d = array(
			'sort'                => $sort,
			'order'               => $order,
			'start'               => ($page - 1) * $limit,
			'limit'               => $limit
		);
		
		if( empty( $this->request->get['path'] ) && ! empty( $this->request->get['mfilterPath'] ) ) {
			$this->request->get['path'] = $this->request->get['mfilterPath'];
		}
		
		if( ! empty( $this->request->get['path'] ) ) {
			$d['filter_category_id'] = explode( '_', $this->request->get['path'] );
			$d['filter_category_id'] = end( $d['filter_category_id'] );
		}
					
		$product_total = $this->model_catalog_product->getTotalProducts($d);								
		$results = $this->model_catalog_product->getProducts($d);
		
		foreach ($results as $result) {
			if ($result['image']) {
				$image = $this->model_tool_image->resize($result['image'], $this->config->get('config_image_product_width'), $this->config->get('config_image_product_height'));
			} else {
				$image = false;
			}
				
			if (($this->config->get('config_customer_price') && $this->customer->isLogged()) || !$this->config->get('config_customer_price')) {
				$price = $this->currency->format($this->tax->calculate($result['price'], $result['tax_class_id'], $this->config->get('config_tax')));
			} else {
				$price = false;
			}
				
			if ((float)$result['special']) {
				$special = $this->currency->format($this->tax->calculate($result['special'], $result['tax_class_id'], $this->config->get('config_tax')));
			} else {
				$special = false;
			}	
				
			if ($this->config->get('config_tax')) {
				$tax = $this->currency->format((float)$result['special'] ? $result['special'] : $result['price']);
			} else {
				$tax = false;
			}				
				
			if ($this->config->get('config_review_status')) {
				$rating = (int)$result['rating'];
			} else {
				$rating = false;
			}
			
			$data['products'][] = array(
				'product_id'  => $result['product_id'],
				'thumb'       => $image,
				'name'        => $result['name'],
				'description' => utf8_substr(strip_tags(html_entity_decode($result['description'], ENT_QUOTES, 'UTF-8')), 0, 100) . '..',
				'price'       => $price,
				'special'     => $special,
				'tax'         => $tax,
				'rating'      => $result['rating'],
				'reviews'     => sprintf($this->language->get('text_reviews'), (int)$result['reviews']),
				'href'        => $this->url->link('product/product', 'product_id=' . $result['product_id'] . $url)
			);
		}
					
		$url = '';
			
		if( ! empty( $this->request->get['mfp'] ) ) {
			$url .= '&mfp=' . $this->request->get['mfp'];
		}
						
		$data['sorts'] = array();
			
		$data['sorts'][] = array(
			'text'  => $this->language->get('text_default'),
			'value' => 'p.sort_order-ASC',
			'href'  => $this->url->link('module/mega_filter/results', 'sort=p.sort_order&order=ASC' . $url)
		);
			
		$data['sorts'][] = array(
			'text'  => $this->language->get('text_name_asc'),
			'value' => 'pd.name-ASC',
			'href'  => $this->url->link('module/mega_filter/results', 'sort=pd.name&order=ASC' . $url)
		); 
	
		$data['sorts'][] = array(
			'text'  => $this->language->get('text_name_desc'),
			'value' => 'pd.name-DESC',
			'href'  => $this->url->link('module/mega_filter/results', 'sort=pd.name&order=DESC' . $url)
		);
	
		$data['sorts'][] = array(
			'text'  => $this->language->get('text_price_asc'),
			'value' => 'p.price-ASC',
			'href'  => $this->url->link('module/mega_filter/results', 'sort=p.price&order=ASC' . $url)
		); 
	
		$data['sorts'][] = array(
			'text'  => $this->language->get('text_price_desc'),
			'value' => 'p.price-DESC',
			'href'  => $this->url->link('module/mega_filter/results', 'sort=p.price&order=DESC' . $url)
		); 
			
		if ($this->config->get('config_review_status')) {
			$data['sorts'][] = array(
				'text'  => $this->language->get('text_rating_desc'),
				'value' => 'rating-DESC',
				'href'  => $this->url->link('module/mega_filter/results', 'sort=rating&order=DESC' . $url)
			); 
				
			$data['sorts'][] = array(
				'text'  => $this->language->get('text_rating_asc'),
				'value' => 'rating-ASC',
				'href'  => $this->url->link('module/mega_filter/results', 'sort=rating&order=ASC' . $url)
			);
		}
			
		$data['sorts'][] = array(
			'text'  => $this->language->get('text_model_asc'),
			'value' => 'p.model-ASC',
			'href'  => $this->url->link('module/mega_filter/results', 'sort=p.model&order=ASC' . $url)
		); 
	
		$data['sorts'][] = array(
			'text'  => $this->language->get('text_model_desc'),
			'value' => 'p.model-DESC',
			'href'  => $this->url->link('module/mega_filter/results', 'sort=p.model&order=DESC' . $url)
		);
	
		$url = '';
			
		if( ! empty( $this->request->get['mfp'] ) ) {
			$url .= '&mfp=' . $this->request->get['mfp'];
		}
						
		if (isset($this->request->get['sort'])) {
			$url .= '&sort=' . $this->request->get['sort'];
		}	
	
		if (isset($this->request->get['order'])) {
			$url .= '&order=' . $this->request->get['order'];
		}
			
		$data['limits'] = array();
	
		$limits = array_unique(array($this->config->get('config_catalog_limit'), 25, 50, 75, 100));
			
		sort($limits);
	
		foreach($limits as $limits){
			$data['limits'][] = array(
				'text'  => $limits,
				'value' => $limits,
				'href'  => $this->url->link('module/mega_filter/results', $url . '&limit=' . $limits)
			);
		}
					
		$url = '';
										
		if (isset($this->request->get['sort'])) {
			$url .= '&sort=' . $this->request->get['sort'];
		}	
	
		if (isset($this->request->get['order'])) {
			$url .= '&order=' . $this->request->get['order'];
		}
			
		if (isset($this->request->get['limit'])) {
			$url .= '&limit=' . $this->request->get['limit'];
		}		

		$pagination = new Pagination();
		$pagination->total = $product_total;
		$pagination->page = $page;
		$pagination->limit = $limit;
		$pagination->url = $this->url->link('module/mega_filter/results', $url . '&page={page}');

		$data['pagination'] = $pagination->render();

		$this->document->addLink($this->url->link('module/mega_filter/results', $url . '&page=' . $pagination->page), 'canonical');

		if ($pagination->limit && ceil($pagination->total / $pagination->limit) > $pagination->page) {
			$this->document->addLink($this->url->link('module/mega_filter/results', $url . '&page=' . ($pagination->page + 1)), 'next');
		}

		if ($pagination->page > 1) {
			$this->document->addLink($this->url->link('module/mega_filter/results', $url . '&page=' . ($pagination->page - 1)), 'prev');
		}
		
		$data['results'] = sprintf(
			$this->language->get('text_pagination'), 
			($product_total) ? 
				(($page - 1) * $limit) + 1 : 0, ((($page - 1) * $limit) > ($product_total - $limit)) ? $product_total : 
				((($page - 1) * $limit) + $limit), 
			$product_total, 
			ceil($product_total / $limit)
		);

		$data['sort'] = $sort;
		$data['order'] = $order;
		$data['limit'] = $limit;

		$data['column_left'] = $this->load->controller('common/column_left');
		$data['column_right'] = $this->load->controller('common/column_right');
		$data['content_top'] = $this->load->controller('common/content_top');
		$data['content_bottom'] = $this->load->controller('common/content_bottom');
		$data['footer'] = $this->load->controller('common/footer');
		$data['header'] = $this->load->controller('common/header');
		
		/**
		 * Szablon 
		 */
		if( file_exists(DIR_TEMPLATE . $this->config->get('config_template') . '/template/product/special.tpl') ) {
			$this->response->setOutput($this->load->view($this->config->get('config_template') . '/template/product/special.tpl', $data));
		} else {
			$this->response->setOutput($this->load->view('default/template/product/special.tpl', $data));
		}
	}
}
?>