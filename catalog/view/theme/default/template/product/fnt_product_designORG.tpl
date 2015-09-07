<?php echo $header; ?>
<div class="container">
 <ul class="breadcrumb">
    <?php foreach ($breadcrumbs as $breadcrumb) { ?>
    <li><a href="<?php echo $breadcrumb['href']; ?>"><?php echo $breadcrumb['text']; ?></a></li>
    <?php } ?>
  </ul>
    <h1 style="text-align: center;"><?php echo $heading_title;?></h1>
  <div class="row"><?php echo $column_left; ?>
    <?php if ($column_left && $column_right) { ?>
    <?php $class = 'col-sm-6'; ?>
    <?php } elseif ($column_left || $column_right) { ?>
    <?php $class = 'col-sm-9'; ?>
    <?php } else { ?>
    <?php $class = 'col-sm-12'; ?>
    <?php } ?>
	<?php echo $column_right; ?>
	<div id="content" class="<?php echo $class; ?> post-<?php echo $product_id;?>"><?php echo $content_top; ?>	
	<div id="fancy-product-designer-<?php echo $product_id;?>" class="fpd-container <?php echo $frame_shadow;?>">
		<?php if($products){?>
			<?php foreach($products as $product){ ?>
				<div class="fpd-category" title='<?php echo $product['category_name'];?>'>
					<?php if($product['data_product_design']){?>
						<?php foreach($product['data_product_design'] as $product_design) {?>
							<div class="fpd-product" title='<?php echo $product_design['name'];?>' data-thumbnail="<?php echo $product_design['image'];?>" data-options='<?php echo $product_design['first_element']['data_options'];?>'>
							<?php if(isset($product_design['first_element']['children']) && $product_design['first_element']['children']){?>
								<?php foreach($product_design['first_element']['children'] as $children){?>
									<?php if($children['type'] == 'image'){?>
										<img data-src="<?php echo $children['value'];?>" title='<?php echo $children['title'];?>' data-parameters='<?php echo $children['parameters'];?>' />
									<?php } else {?>
										<span data-parameters='<?php echo $children['parameters'];?>'><?php echo $children['value'];?></span>
									<?php }?>
								<?php }?>
							<?php }?>
							<?php if($product_design['children']){?>
								<?php foreach($product_design['children'] as $children){?>
									<div class="fpd-product" title='<?php echo $children['name'];?>' data-thumbnail="<?php echo $children['image'];?>" data-options='<?php echo $children['data_options'];?>'>
									<?php if($children['children']){?>
										<?php foreach($children['children'] as $child){?>
											<?php if($child['type'] == 'image'){?>
												<img data-src="<?php echo $child['value'];?>" title='<?php echo $child['title'];?>' data-parameters='<?php echo $child['parameters'];?>' />
											<?php } else {?>
												<span data-parameters='<?php echo $child['parameters'];?>' ><?php echo $child['value'];?></span>
											<?php }?>
										<?php }?>
									<?php }?>
									</div>
								<?php }?>
							<?php } ?>
							</div>
						<?php }?>
					<?php }?>
				</div>
			<?php }?>
			<div class="fpd-design">
				<?php if(!isset($hide_designs_tab)){?>
					<?php foreach($cliparts as $key => $clipart){?>
						<?php if($clipart['children']){?>
							 <div class="fpd-category" title='<?php echo $clipart['name'];?>'>
								<?php foreach($clipart['children'] as $child){?>
									<img data-src="<?php echo $child['image'];?>" title='<?php echo $child['name'];?>' data-parameters='<?php echo $child['parameters'];?>' />
								<?php }?>
							</div>
						<?php }?>
					<?php }?>
				<?php }?>	
			</div>
		<?php }?> 
	</div>
	<p class="fpd-not-supported-device-info" >
		<strong><?php echo $text_alert; ?></strong>
	</p>
	<style type="text/css">
		.fancy-product .fpd-primary-bg-color {
			background-color: <?php echo $config_designer_primary_color;?>;
		}
		.fancy-product .fpd-primary-text-color,
		.fancy-product .fpd-primary-text-color:hover {
			color:  <?php echo $config_designer_primary_text_color;?>;
		}
		.fancy-product .fpd-secondary-bg-color {
			background-color: <?php echo $config_designer_secondary_color;?> !important;
		}
		.fancy-product .fpd-secondary-text-color,
		.fancy-product .fpd-secondary-text-color:hover {
			color:  <?php echo $config_designer_secondary_text_color;?> !important;
		}
		.fancy-product .fpd-tabs > .fpd-btn.fpd-checked {
			border-color: <?php echo $config_designer_secondary_color;?>;
		}
		.fancy-product .fpd-checked i {
			color: <?php echo $config_designer_secondary_color;?> !important;
		}
		.fpd-product-stage {
			<?php if(isset($image_background)){?>
				background-image: url(<?php echo $image_background;?>) !important;
			<?php } elseif(isset($color_background)){?>
				background-color: <?php echo $color_background;?> !important;
			<?php }?>
		}
	</style>
	<script type="text/javascript">
		var fancyProductDesigner,$selector,$cartForm,productCreated = false,fpdPrice = 0,isReady = false;
		jQuery(document).ready(function() {
			$selector = jQuery('#fancy-product-designer-<?php echo $product_id;?>');$productWrapper = jQuery('.post-<?php echo $product_id;?>');$cartForm = jQuery('[name="fpd_product"]:first').parent('div');
			var productDesignerWidth = <?php echo $config_stage_width;?>,
			customImagesParams = jQuery.extend({"x":<?php echo $config_designs_parameter_x;?>,"y":<?php echo $config_designs_parameter_y;?>,"z":<?php echo $config_designs_parameter_z;?>,"price":<?php echo $config_designs_parameter_price;?>,"colors":"<?php echo $config_designs_parameter_colors;?>","autoCenter":<?php echo $config_designs_parameter_auto_center;?>,"draggable":<?php echo $config_designs_parameter_draggable;?>,"rotatable":<?php echo $config_designs_parameter_rotatable;?>,"resizable":<?php echo $config_designs_parameter_resizable;?>,"zChangeable":<?php echo $config_designs_parameter_zchangeable;?>,"replace":'<?php echo $config_designs_parameter_replace;?>',"removable":1,"autoSelect":<?php echo $config_designs_parameter_autoselect;?>,"topped":<?php echo $config_designs_topped;?>,"filters":[<?php echo $filters;?>],<?php if($config_designs_parameter_aboundingbox){?>"boundingBox":<?php echo $config_designs_parameter_aboundingbox;?>,<?php }?>	"boundingBoxClipping":<?php echo $config_designs_parameter_clipping;?>},{minW: <?php echo $config_min_width;?>,minH: <?php echo $config_min_height;?>,maxW: <?php echo $config_max_width;?>,maxH: <?php echo $config_max_height;?>,resizeToW: <?php echo $config_resize_width;?>,resizeToH: <?php echo $config_resize_height;?>});
			//call fancy product designer plugin
			fancyProductDesigner = $selector.fancyProductDesigner({
				width: productDesignerWidth,
				stageHeight: <?php echo $config_stage_height;?>,
				imageDownloadable: <?php echo $config_download_image;?>,
				saveAsPdf: <?php echo $config_pdf_button;?>,
				printable: <?php echo $config_print_button;?>,
				allowProductSaving: <?php echo $config_allow_product_saving;?>,
				fonts: [<?php echo $fonts;?>],
				templatesDirectory: "<?php echo $domain;?>catalog/controller/fancy_design/",
				phpDirectory: "<?php echo $domain;?>catalog/controller/fancy_design/php/",
				<?php if($config_facebook_app_id){?>facebookAppId: "<?php echo $config_facebook_app_id;?>",<?php }?>
				<?php if($config_instagram_client_id){?>instagramClientId: "<?php echo $config_instagram_client_id;?>",<?php }?>	
				<?php if($config_instagram_redirect_uri){?>instagramRedirectUri: "<?php echo $config_instagram_redirect_uri;?>",<?php }?>	
				patterns: ["<?php echo implode('", "', $patterns); ?>"],
				viewSelectionPosition: "<?php echo $view_selection_position;?>",
				viewSelectionFloated: <?php echo $config_view_selection_float;?>,
				zoomStep: <?php echo $config_zoom;?>,
				maxZoom: <?php echo $config_zoom_max;?>,
				tooltips: <?php echo $config_view_tooltip;?>,
				hexNames: {},
				selectedColor:  "<?php echo $config_selected_color;?>",
				boundingBoxColor:  "<?php echo $config_bounding_box_color;?>",
				outOfBoundaryColor:  "<?php echo $config_out_of_boundary_color;?>",
				paddingControl: <?php echo $config_padding_controls;?>,
				replaceInitialElements: <?php echo $replace_initial_elements;?>,
				elementParameters: {originX: "center",originY: "center"},
				imageParameters: {colorPrices: <?php echo ($image_color_prices) ? $color_prices : '{}';?>},
				textParameters: {colorPrices: <?php echo ($text_color_prices) ? $color_prices : '{}';?>},
				customImageParameters: customImagesParams,
				customTextParameters: {"x":<?php echo $config_text_x_position;?>,"y":<?php echo $config_text_y_position;?>,"z":<?php echo $config_text_z_position;?>,"colors":"<?php echo $config_text_design_color;?>","price":<?php echo $config_text_design_price;?>,"autoCenter":<?php echo $config_text_auto_center;?>,"draggable":<?php echo $config_text_draggable;?>,"rotatable":<?php echo $config_text_rotatable;?>,"resizable":<?php echo $config_text_resizeable;?>,"zChangeable":<?php echo $config_text_zchangeable;?>,"replace":"","autoSelect":<?php echo $config_text_autoselected;?>,"topped":<?php echo $config_text_topped;?>,"patternable":<?php echo $patternable;?>,"curvable":<?php echo $config_text_curved;?>,"curveSpacing":<?php echo $config_curved_spacing;?>,"curveRadius":<?php echo $config_curve_radius;?>,"curveReverse":<?php echo $config_curve_reverse;?>,<?php if($config_designs_text_aboundingbox){?>"boundingBox":<?php echo $config_designs_text_aboundingbox;?>,<?php }?>"boundingBoxClipping":<?php echo $config_designs_text_clipping;?>,"textSize":<?php echo $config_default_text_size;?>,"maxLength":<?php echo $config_text_text_characters;?>,"textAlign":"<?php echo $texts_parameter_textalign;?>","removable":1},
				labels: {layersButton:"<?php echo $text_manage_layer; ?>",addsButton:"<?php echo $text_add; ?>",productsButton:"<?php echo $text_change_product; ?>",moreButton:"<?php echo $text_action; ?>",downLoadPDF:"<?php echo $text_download_pdf; ?>",downloadImage:"<?php echo $text_download_image; ?>",print:"<?php echo $text_print; ?>",saveProduct:"<?php echo $text_save; ?>",loadProduct:"<?php echo $text_load; ?>",undoButton:"<?php echo $text_undo; ?>",redoButton:"<?php echo $text_redo; ?>",resetProductButton:"<?php echo $text_reset_product; ?>",zoomButton:"<?php echo $text_zoom; ?>",panButton:"<?php echo $text_pan; ?>",addImageButton:"<?php echo $text_add_image;?>",addTextButton:"<?php echo $text_add_text;?>",enterText:"<?php echo $text_enter_text; ?>",addFBButton:"<?php echo $text_add_photo_fb;?>",addInstaButton:"<?php echo $text_add_photo_instagram;?>",addDesignButton:"<?php echo $text_choose_design; ?>",editElement:"<?php echo $text_edit_element;?>",fillOptions:"<?php echo $text_fill_option;?>",color:"<?php echo $text_color;?>",patterns:"<?php echo $text_pattern;?>",opacity:"<?php echo $text_opacity; ?>",filter:"<?php echo $text_filter; ?>",textOptions:"<?php echo $text_text_option;?>",changeText:"<?php echo $text_change_text;?>",typeface:"<?php echo $text_typeface;?>",lineHeight:"<?php echo $text_line_height;?>",textAlign:"<?php echo $text_alignment;?>",textStyling:"<?php echo $text_styling; ?>",bold:"<?php echo $text_bold; ?>",italic:"<?php echo $text_italic; ?>",underline:"<?php echo $text_underline; ?>",curvedText:"<?php echo $text_curved_text; ?>",transform:"<?php echo $text_transform; ?>",angle:"<?php echo $text_angle; ?>",scale:"<?php echo $text_scale; ?>",flipHorizontal:"<?php echo $text_flip_horizontal;?>",flipVertical:"<?php echo $text_flip_vertical; ?>",resetElement:"<?php echo $text_reset_element; ?>",productSaved:"<?php echo $text_product_save; ?>",lock:"<?php echo $text_lock; ?>",unlock:"<?php echo $text_unlock; ?>",remove:"<?php echo $text_remove; ?>",outOfContainmentAlert:"<?php echo $text_alert_containment; ?>",initText:"<?php echo $text_init_text; ?>",myUploadedImgCat:"<?php echo $text_uploaded_img;?>",uploadedDesignSizeAlert:"<?php echo $text_alert_upload_size; ?>",textAlignLeft: "<?php echo $text_align_left;?>",textAlignCenter: "<?php echo $text_align_center;?>",textAlignRight: "<?php echo $text_align_right;?>",curvedTextSpacing: "<?php echo $text_curved_text_spacing;?>",curvedTextRadius: "<?php echo $text_curved_text_radius;?>",curvedTextReverse: "<?php echo $text_curved_text_reverse;?>",centerH: "<?php echo $text_center_h;?>",centerV: "<?php echo $text_center_v;?>",fbSelectAlbum: "<?php echo $text_fb_select_album;?>",instaFeedButton: "<?php echo $text_insta_feed_button;?>",instaRecentImagesButton: "<?php echo $text_insta_recent_image_button;?>"},
				customAdds: <?php echo $custom_adds;?>
			}).data('fancy-product-designer');
			//when load from cart or order, use loadProduct
			$selector.on('ready', function() {
				<?php if(isset($design)){?>
					var views = <?php echo $design;?>;
					fancyProductDesigner.clear();
					fancyProductDesigner.loadProduct(views);
				<?php }?>
				isReady = true;
			});
			$('body').addClass('fancy-product');
			<?php if(isset($hide_smartphones) && $hide_smartphones){?>
				$('body').addClass('fpd-hidden-mobile');
			<?php }?>
			<?php if(isset($hide_tablets) && $hide_tablets){?>
				$('body').addClass('fpd-hidden-tablets');
			<?php }?>
		});
	</script>
	<script type="text/javascript">
		jQuery(document).ready(function() {
			var wcPrice = <?php echo $price;?>,currencySymbol = '<?php echo $curency_code;?>',decimalSeparator = ".",thousandSeparator = ",",numberOfDecimals = '<?php echo $decimal_place;?>',currencyPos = "<?php echo $currency_pos;?>",firstViewImg = null;
	//reset image when variation has changed
		$productWrapper.on('found_variation', '.variations_form', function() {
			if(firstViewImg !== null) {
				setTimeout(_setProductImage, 5);
			}
		});
		jQuery('#fpd-extern-download-pdf').click(function(evt) {
			evt.preventDefault();
			if(productCreated) {
				$selector.find('.fpd-save-pdf').mouseup();
			}
			else {
				alert('<?php echo $text_alert_product_not_created; ?>');
			}
		});
		//calculate initial price
		$selector.on('productCreate', function() {
			productCreated = true;
			fpdPrice = fancyProductDesigner.getPrice();
			_setTotalPrice();
			<?php if(isset($design) && $design){?>
				_setProductImage();
			<?php }?>
			/*Upgrade version V2.x.1*/
			fancyUpdatePriceTax();	
			var width_design_box = $('.fpd-container').width();
			if(width_design_box > 800){$('.product-design-info').width(width_design_box/2);}
			else{$('.product-design-info').width(width_design_box);}
			$('.product-design-info').css('display','block');			
		});
		//check when variation has been selected
		jQuery(document).on('found_variation', '.variations_form', function(evt, variation) {
			if(variation.price_html) {
				//- get last price, if a sale price is found, use it
				//- set thousand and decimal separator
				//- parse it as number
				wcPrice = jQuery(variation.price_html).find('span:last').text().replace(currencySymbol,'').replace(thousandSeparator, '').replace(decimalSeparator, '.').replace(/[^\d.]/g,'');
				_setTotalPrice();
			}
		});
		//listen when price changes
		$selector.on('priceChange', function(evt, sp, tp) {
			fpdPrice = tp;
			_setTotalPrice();
			/*Upgrade version V2.x.1*/
			fancyUpdatePriceTax();
		});
		/*Upgrade version V2.x.1*/
		function fancyUpdatePriceTax(){
			$.ajax({
				url: 'index.php?route=product/fnt_product_design/calculateTaxPrice&price=' + $('input[name="fpd_product_price"]').val() + '&product_id=<?php echo $product_id;?>',
				type: 'get',
				dataType: 'json',
				beforeSend: function() {
					$('h2.price').css('opacity', 0.2);
					$('h4.price-tax span.tax').css('opacity', 0.2);
				},
				success: function(json) {
					if (json['price']) {
						$('h2.price').html(json['price']);
					}
					if (json['tax']) {
						$('h4.price-tax span.tax').html(json['tax']);
					}
					$('h2.price').css('opacity', 1);
					$('h4.price-tax span.tax').css('opacity', 1);
				}
			});	
		}	
		$('#button-cart').on('click', function () { 
			if(!productCreated) { return false; }
				var product = fancyProductDesigner.getProduct();
				if (product != false) {
					$('input[name="fpd_product"]').val(encodeURIComponent(JSON.stringify(product)));
					_setTotalPrice();
					//Add thumbnail for product design when add to cart
					thumbnail = fancyProductDesigner.getViewsDataURL('png', 'transparent', 0.2)[0];
					$('input[name="fpd_product_thumbnail"]').val(thumbnail);
					$.ajax({
						url: 'index.php?route=checkout/cart_design/add',
						type: 'post',
						data: $('.product-design-info input[type=\'text\'], .product-design-info input[type=\'date\'], .product-design-info input[type=\'datetime-local\'], .product-design-info input[type=\'time\'], .product-design-info input[type=\'hidden\'], .product-design-info input[type=\'radio\']:checked, #product input[type=\'checkbox\']:checked, .product-design-info select, .product-design-info textarea'),
						dataType: 'json',
						beforeSend: function() {
							$('#button-cart').button('loading');
						},
						complete: function() {
							$('#button-cart').button('reset');
						},
						success: function(json) {
							$('.alert, .text-danger').remove();
							$('.form-group').removeClass('has-error');

							if (json['error']) {
								if (json['error']['option']) {
									for (i in json['error']['option']) {
										var element = $('#input-option' + i.replace('_', '-'));

										if (element.parent().hasClass('input-group')) {
											element.parent().after('<div class="text-danger">' + json['error']['option'][i] + '</div>');
										} else {
											element.after('<div class="text-danger">' + json['error']['option'][i] + '</div>');
										}
									}
								}

								if (json['error']['recurring']) {
									$('select[name=\'recurring_id\']').after('<div class="text-danger">' + json['error']['recurring'] + '</div>');
								}

								// Highlight any found errors
								$('.text-danger').parent().addClass('has-error');
							}

							if (json['success']) {
								$('.breadcrumb').after('<div class="alert alert-success">' + json['success'] + '<button type="button" class="close" data-dismiss="alert">&times;</button></div>');

								$('#cart > button').html('<i class="fa fa-shopping-cart"></i> ' + json['total']);

								$('html, body').animate({ scrollTop: 0 }, 'slow');

								$('#cart > ul').load('index.php?route=common/cart/info ul li');
							}
						}
					});	
				}
			});
			//set total price depending from wc and fpd price
			function _setTotalPrice() {
				var totalPrice = parseFloat(wcPrice) + parseFloat(fpdPrice);
				$cartForm.find('input[name="fpd_product_price"]').val(totalPrice);

			};

			function _addThousandSep(n){
				var rx=  /(\d+)(\d{3})/;
				return String(n).replace(/^\d+/, function(w){
					while(rx.test(w)){
						w= w.replace(rx, '$1'+thousandSeparator+'$2');
					}
					return w;
				});
			};
		});
		function _setProductImage() {
			firstViewImg = fancyProductDesigner.getViewsDataURL('png', 'transparent')[0];
			$productWrapper.find('div.images img:eq(0)').attr('src', firstViewImg).parent('a').attr('href', firstViewImg);
		};
	</script>
		<div class="product-design-info row col-sm-6">
			<div id="product">
				<div class="cart form-group">
					<input type="hidden" name="fpd_product" value="" />
					<input type="hidden" name="fpd_product_price" value="" />
					<input type="hidden" name="fpd_product_thumbnail" value="" />
					<input type="hidden" value="<?php echo $currency;?>" name="currency" />
					<div>
					<div class="options"> 
						<?php if($options){?>
							<hr>
							<h3><?php echo $text_option; ?></h3>
							 <?php foreach ($options as $option) { ?>
								<?php if ($option['type'] == 'select') { ?>
								<div class="form-group<?php echo ($option['required'] ? ' required' : ''); ?>">
								  <label class="control-label" for="input-option<?php echo $option['product_option_id']; ?>"><?php echo $option['name']; ?></label>
								  <select name="option[<?php echo $option['product_option_id']; ?>]" id="input-option<?php echo $option['product_option_id']; ?>" class="form-control">
									<option value=""><?php echo $text_select; ?></option>
									<?php foreach ($option['product_option_value'] as $option_value) { ?>
									<option value="<?php echo $option_value['product_option_value_id']; ?>"><?php echo $option_value['name']; ?>
									<?php if ($option_value['price']) { ?>
									(<?php echo $option_value['price_prefix']; ?><?php echo $option_value['price']; ?>)
									<?php } ?>
									</option>
									<?php } ?>
								  </select>
								</div>
								<?php } ?>
								<?php if ($option['type'] == 'radio') { ?>
								<div class="form-group<?php echo ($option['required'] ? ' required' : ''); ?>">
								  <label class="control-label"><?php echo $option['name']; ?></label>
								  <div id="input-option<?php echo $option['product_option_id']; ?>">
									<?php foreach ($option['product_option_value'] as $option_value) { ?>
									<div class="radio">
									  <label>
										<input type="radio" name="option[<?php echo $option['product_option_id']; ?>]" value="<?php echo $option_value['product_option_value_id']; ?>" />
										<?php echo $option_value['name']; ?>
										<?php if ($option_value['price']) { ?>
										(<?php echo $option_value['price_prefix']; ?><?php echo $option_value['price']; ?>)
										<?php } ?>
									  </label>
									</div>
									<?php } ?>
								  </div>
								</div>
								<?php } ?>
								<?php if ($option['type'] == 'checkbox') { ?>
								<div class="form-group<?php echo ($option['required'] ? ' required' : ''); ?>">
								  <label class="control-label"><?php echo $option['name']; ?></label>
								  <div id="input-option<?php echo $option['product_option_id']; ?>">
									<?php foreach ($option['product_option_value'] as $option_value) { ?>
									<div class="checkbox">
									  <label>
										<input type="checkbox" name="option[<?php echo $option['product_option_id']; ?>][]" value="<?php echo $option_value['product_option_value_id']; ?>" />
										<?php echo $option_value['name']; ?>
										<?php if ($option_value['price']) { ?>
										(<?php echo $option_value['price_prefix']; ?><?php echo $option_value['price']; ?>)
										<?php } ?>
									  </label>
									</div>
									<?php } ?>
								  </div>
								</div>
								<?php } ?>
								<?php if ($option['type'] == 'image') { ?>
								<div class="form-group<?php echo ($option['required'] ? ' required' : ''); ?>">
								  <label class="control-label"><?php echo $option['name']; ?></label>
								  <div id="input-option<?php echo $option['product_option_id']; ?>">
									<?php foreach ($option['product_option_value'] as $option_value) { ?>
									<div class="radio">
									  <label>
										<input type="radio" name="option[<?php echo $option['product_option_id']; ?>]" value="<?php echo $option_value['product_option_value_id']; ?>" />
										<img src="<?php echo $option_value['image']; ?>" alt="<?php echo $option_value['name'] . ($option_value['price'] ? ' ' . $option_value['price_prefix'] . $option_value['price'] : ''); ?>" class="img-thumbnail" /> <?php echo $option_value['name']; ?>
										<?php if ($option_value['price']) { ?>
										(<?php echo $option_value['price_prefix']; ?><?php echo $option_value['price']; ?>)
										<?php } ?>
									  </label>
									</div>
									<?php } ?>
								  </div>
								</div>
								<?php } ?>
								<?php if ($option['type'] == 'text') { ?>
								<div class="form-group<?php echo ($option['required'] ? ' required' : ''); ?>">
								  <label class="control-label" for="input-option<?php echo $option['product_option_id']; ?>"><?php echo $option['name']; ?></label>
								  <input type="text" name="option[<?php echo $option['product_option_id']; ?>]" value="<?php echo $option['value']; ?>" placeholder="<?php echo $option['name']; ?>" id="input-option<?php echo $option['product_option_id']; ?>" class="form-control" />
								</div>
								<?php } ?>
								<?php if ($option['type'] == 'textarea') { ?>
								<div class="form-group<?php echo ($option['required'] ? ' required' : ''); ?>">
								  <label class="control-label" for="input-option<?php echo $option['product_option_id']; ?>"><?php echo $option['name']; ?></label>
								  <textarea name="option[<?php echo $option['product_option_id']; ?>]" rows="5" placeholder="<?php echo $option['name']; ?>" id="input-option<?php echo $option['product_option_id']; ?>" class="form-control"><?php echo $option['value']; ?></textarea>
								</div>
								<?php } ?>
								<?php if ($option['type'] == 'file') { ?>
								<div class="form-group<?php echo ($option['required'] ? ' required' : ''); ?>">
								  <label class="control-label"><?php echo $option['name']; ?></label>
								  <button type="button" id="button-upload<?php echo $option['product_option_id']; ?>" data-loading-text="<?php echo $text_loading; ?>" class="btn btn-default btn-block"><i class="fa fa-upload"></i> <?php echo $button_upload; ?></button>
								  <input type="hidden" name="option[<?php echo $option['product_option_id']; ?>]" value="" id="input-option<?php echo $option['product_option_id']; ?>" />
								</div>
								<?php } ?>
								<?php if ($option['type'] == 'date') { ?>
								<div class="form-group<?php echo ($option['required'] ? ' required' : ''); ?>">
								  <label class="control-label" for="input-option<?php echo $option['product_option_id']; ?>"><?php echo $option['name']; ?></label>
								  <div class="input-group date">
									<input type="text" name="option[<?php echo $option['product_option_id']; ?>]" value="<?php echo $option['value']; ?>" data-date-format="YYYY-MM-DD" id="input-option<?php echo $option['product_option_id']; ?>" class="form-control" />
									<span class="input-group-btn">
									<button class="btn btn-default" type="button"><i class="fa fa-calendar"></i></button>
									</span></div>
								</div>
								<?php } ?>
								<?php if ($option['type'] == 'datetime') { ?>
								<div class="form-group<?php echo ($option['required'] ? ' required' : ''); ?>">
								  <label class="control-label" for="input-option<?php echo $option['product_option_id']; ?>"><?php echo $option['name']; ?></label>
								  <div class="input-group datetime">
									<input type="text" name="option[<?php echo $option['product_option_id']; ?>]" value="<?php echo $option['value']; ?>" data-date-format="YYYY-MM-DD HH:mm" id="input-option<?php echo $option['product_option_id']; ?>" class="form-control" />
									<span class="input-group-btn">
									<button type="button" class="btn btn-default"><i class="fa fa-calendar"></i></button>
									</span></div>
								</div>
								<?php } ?>
								<?php if ($option['type'] == 'time') { ?>
									<div class="form-group<?php echo ($option['required'] ? ' required' : ''); ?>">
									  <label class="control-label" for="input-option<?php echo $option['product_option_id']; ?>"><?php echo $option['name']; ?></label>
									  <div class="input-group time">
										<input type="text" name="option[<?php echo $option['product_option_id']; ?>]" value="<?php echo $option['value']; ?>" data-date-format="HH:mm" id="input-option<?php echo $option['product_option_id']; ?>" class="form-control" />
										<span class="input-group-btn">
										<button type="button" class="btn btn-default"><i class="fa fa-calendar"></i></button>
										</span></div>
									</div>
									<?php } ?>
								<?php } ?>
							<?php } ?>
						</div>	
					 </div> 
					<div class="form-group"> 
						<h2 class="price"></h2>					 
						<h4 class="price-tax"> <?php echo $text_tax;?><span class="tax"></span></h4>		
						<?php if ($discounts) { ?>
						  <ul class="list-unstyled">
							<?php foreach ($discounts as $discount) { ?>
								<li><?php echo $discount['quantity']; ?><?php echo $text_discount; ?><?php echo $discount['price']; ?></li>
							<?php } ?>
						  </ul>
						<?php } ?>		
						<div class="qty form-group">          
							<label class="control-label" for="qty"><?php echo $entry_qty;?>: </label>
							<input id="qty" type="text" class="form-control" name="quantity" size="2" value="<?php echo (isset($minimum)) ? $minimum : 0 ;?>" />        
							<input type="hidden" id="product_id" name="product_id" size="2" value="<?php echo $product_id;?>" />
						</div>
						<div class="form-group">
							<input type="button" value="<?php echo $text_order;?>" class="btn btn-primary btn-lg btn-block" id="button-cart" />
						</div>	
					</div>	
				</div>
				
			  </div>
			</div>
	</div>
	<?php echo $content_bottom; ?></div>
	<script type="text/javascript"><!--
	$('.date').datetimepicker({
		pickTime: false
	});

	$('.datetime').datetimepicker({
		pickDate: true,
		pickTime: true
	});

	$('.time').datetimepicker({
		pickDate: false
	});

	$('button[id^=\'button-upload\']').on('click', function() {
		var node = this;

		$('#form-upload').remove();

		$('body').prepend('<form enctype="multipart/form-data" id="form-upload" style="display: none;"><input type="file" name="file" /></form>');

		$('#form-upload input[name=\'file\']').trigger('click');

		if (typeof timer != 'undefined') {
			clearInterval(timer);
		}

		timer = setInterval(function() {
			if ($('#form-upload input[name=\'file\']').val() != '') {
				clearInterval(timer);

				$.ajax({
					url: 'index.php?route=tool/upload',
					type: 'post',
					dataType: 'json',
					data: new FormData($('#form-upload')[0]),
					cache: false,
					contentType: false,
					processData: false,
					beforeSend: function() {
						$(node).button('loading');
					},
					complete: function() {
						$(node).button('reset');
					},
					success: function(json) {
						$('.text-danger').remove();

						if (json['error']) {
							$(node).parent().find('input').after('<div class="text-danger">' + json['error'] + '</div>');
						}

						if (json['success']) {
							alert(json['success']);

							$(node).parent().find('input').attr('value', json['code']);
						}
					},
					error: function(xhr, ajaxOptions, thrownError) {
						alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
					}
				});
			}
		}, 500);
	});
	//--></script>
	</div>
<?php echo $footer; ?>