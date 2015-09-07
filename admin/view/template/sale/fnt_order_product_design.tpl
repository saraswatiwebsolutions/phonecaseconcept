<?php echo $header; ?><?php echo $column_left; ?>
<div id="content">
 <div class="page-header">
    <div class="container-fluid">
      <h1><?php echo $heading_title; ?></h1>
      <ul class="breadcrumb">
        <?php foreach ($breadcrumbs as $breadcrumb) { ?>
        <li><a href="<?php echo $breadcrumb['href']; ?>"><?php echo $breadcrumb['text']; ?></a></li>
        <?php } ?>
      </ul>
    </div>
  </div>
 <div class="container-fluid">			
<div class="panel panel-default">
<div class="panel-heading">
	<h3 class="panel-title"><i class="fa fa-pencil"></i> <?php echo $heading_title; ?> - OrderID: #<?php echo $order_id; ?></h3>
</div>
<div class="panel-body">
  <div class="postbox " id="fpd-order">
<div class="inside">
<div id="fpd-order-panel">
	<div id="fpd-order-designer-wrapper">
		<!-- Product Designer Container -->
		<div style="width:<?php echo $config_stage_width; ?>px;margin: 0 auto">
			<div id="fpd-order-designer" class="fpd-shadow-1"></div>
		</div>
		<!-- Tools -->
		<div id="fpd-export-tools" class="fpd-clearfix">

			<div>

				<!-- Export -->
				<div class="fpd-inner-panel">

					<h2><?php echo $text_export; ?></h2>
					<table class="form-table">
						<tr>
							<th><?php echo $text_output_file; ?></th>
							<td>
								<label>
									<input type="radio" name="fpd_output_file" value="pdf" checked="checked" /><?php echo $text_pdf; ?>
								</label>
								<label>
									<input type="radio" name="fpd_output_file" value="image" /><?php echo $text_image; ?>
								</label>
							</td>
						</tr>
						<tr>
							<th><?php echo $text_image_format; ?></th></th>
							<td>
								<label>
									<input type="radio" name="fpd_image_format" value="png" checked="checked" /><?php echo $text_png; ?>
								</label>
								<label>
									<input type="radio" name="fpd_image_format" value="jpeg" /><?php echo $text_jpeg; ?>
								</label>
								<label>
									<input type="radio" name="fpd_image_format" value="svg" /><?php echo $text_svg; ?>
									<i class="fpd-admin-tooltip fpd-admin-icon-info-outline" title="<?php echo $text_title_svg; ?>"></i>
								</label>
							</td>
						</tr>
						<tr>
							<th><?php echo $text_size; ?></th>
							<td>
								<p><a href="http://www.hdri.at/dpirechner/dpirechner_en.htm" target="_blank" style="font-size: 11px;"><?php echo $text_dpi_converter; ?></a></p>
								<label class="fpd-block">
									<input type="number" value="210" id="fpd-pdf-width" />
									<br />
									<?php echo $text_pdf_width_in_mm; ?>
								</label>
								<label class="fpd-block">
									<input type="number" value="297" id="fpd-pdf-height" />
									<br />
									<?php echo $text_pdf_height_mm; ?>
								</label>
								<label class="fpd-block">
									<input type="number" value="" name="fpd_scale" placeholder="1" />
									<br />
									<?php echo $text_scale_factor; ?>
								</label>
								<label class="fpd-block">
									<input type="number" value="" id="fpd-pdf-dpi" placeholder="300" />
									<br />
									<?php echo $text_image_dpi; ?>
								</label>
							</td>
						</tr>
						<tr>
							<th><?php echo $text_views; ?></th>
							<td>
								<label>
									<input type="radio" name="fpd_export_views" value="all" checked="checked" /> <?php echo $text_all; ?>
								</label>
								<label>
									<input type="radio" name="fpd_export_views" value="current" /> <?php echo $text_current_showing; ?>
								</label>
							</td>
						</tr>
					</table>

					<button id="fpd-generate-file" class="btn btn-primary button button-primary"><?php echo $text_create; ?></button>
					
					<div class="fpd-ui-blocker"></div>

				</div>

			</div>

			<div class="fpd-inner-panel">

				<h2><?php echo $text_single_elements; ?></h2>
				<div id="fpd-editor-box-wrapper"></div>
				<div id="fpd-elements-lists" class="fpd-clearfix">
					<div>
						<h4>
							<?php echo $text_added_by_customer; ?>
							<i class="fpd-admin-tooltip fpd-admin-icon-info-outline" title="<?php echo $text_title_added_by_customer; ?>"></i>
						</h4>

						<ul id="fpd-custom-elements-list"></ul>
					</div>
					<div>
						<h4><?php echo $text_save_images_on_server; ?></h4>
						<ul id="fpd-order-image-list">
							<?php if($images){?>
								<?php foreach($images as $image){?>
									<li>
										<a target="_blank" href="<?php echo $image['url'];?>" title="<?php echo $image['url'];?>"><?php echo $image['title'];?></a>
									</li>
								<?php }?>
							<?php }?>
						</ul>
					</div>
				</div>

				<h4><?php echo $text_export_options; ?></h4>
				<table class="form-table">
					<tr>
						<th><?php echo $text_image_format; ?></th>
						<td>
							<label>
								<input type="radio" name="fpd_single_image_format" value="png" checked="checked" /> <?php echo $text_png; ?>
							</label>
							<label>
								<input type="radio" name="fpd_single_image_format" value="jpeg" /> <?php echo $text_jpeg; ?>
							</label>
							<label>
								<input type="radio" name="fpd_single_image_format" value="svg" /> <?php echo $text_svg; ?>
								<i class="fpd-admin-tooltip fpd-admin-icon-info-outline" title="<?php echo $help_export_svg; ?>"></i>
							</label>
						</td>
					</tr>
					<tr>
						<th><?php echo $text_padding_element; ?></th>
						<td>
							<input type="number" min="0" value="" name="fpd_single_element_padding" placeholder="0" />
						</td>
					</tr>
					<tr>
						<th><?php echo $text_dpi; ?></th>
						<td>
							<input type="number" min="0" value="" name="fpd_single_element_dpi" placeholder="72" />
						</td>
					</tr>
					<tr>
						<td colspan="2">
							<label>
								<input type="checkbox" id="fpd-restore-oring-size" />
								<?php echo $text_use_origin_size; ?>
							</label>
						</td>
					</tr>
					<tr>
						<td colspan="2">
							<label>
								<input type="checkbox" id="fpd-save-on-server" />
								<?php echo $text_save_export_server; ?>
								<i class="fpd-admin-tooltip fpd-admin-icon-info-outline" title="<?php echo $text_title_save_export_server; ?>"></i>
							</label>
						</td>
					</tr>
					<tr>
						<td colspan="2">
							<label>
								<input type="checkbox" id="fpd-without-bounding-box" />
								<?php echo $text_export_without_bounding; ?>
							</label>
						</td>
					</tr>
				</table>

				<button id="fpd-save-element-as-image" class="btn btn-primary button button-primary"><?php echo $text_create; ?></button>

				<div class="fpd-ui-blocker"></div>

			</div><!-- Right Column -->

		</div><!-- Tools -->

	</div>
	</div>
</div>
</div>
</div>
</div>
</div>
<script type="text/javascript">
	var fancyProductDesigner,
		$orderImageList,
		loadingProduct = false,
		currentItemId = '<?php echo $order_product_id;?>',
		orderId = <?php echo isset($order_id) ? $order_id : 0; ?>,
		isReady = false,
		stageWidth = <?php echo $config_stage_width;?>,
		stageHeight = <?php echo $config_stage_height;?>;
		
	jQuery(document).ready(function($) {
	
		var $fancyProductDesigner = $('#fpd-order-designer'),
			$customElementsList = $('#fpd-custom-elements-list'),
			customElements = null;

		$orderImageList = $('#fpd-order-image-list');
		
		fancyProductDesigner = $fancyProductDesigner.fancyProductDesigner({
			width: stageWidth,
			stageWidth: stageWidth,
			stageHeight: stageHeight,
			editorMode: '#fpd-editor-box-wrapper',
			fonts: [<?php echo $fonts;?>],
			templatesDirectory: "<?php echo $domain;?>../catalog/controller/fancy_design/",
			patterns: ["<?php echo implode('", "', $patterns); ?>"],
			tooltips: true,
		}).data('fancy-product-designer');
		$fancyProductDesigner.on('ready', function() {
			isReady = true;
			 fancyProductDesigner.loadProduct(<?php echo $design;?>);
		}).on('productCreate', function() {

			$customElementsList.empty();

			customElements = fancyProductDesigner.getCustomElements();
			for(var i=0; i < customElements.length; ++i) {
				var customElement = customElements[i].element;
				$customElementsList.append('<li><a href="#">'+customElement.title+'</a></li>');
			}

			loadingProduct = false;

		});
	$('.fancy-product').on('click', '.fpd-show-order-item', function(evt) {

			evt.preventDefault();

			if(	isReady && !loadingProduct ) {

				var $this = $(this),
					order = $this.data('order');

				currentItemId = $this.attr('id');
				order = JSON.parse(unescape(JSON.stringify(order)));
				fpdLoadOrder(order);

			}

		});

		//change stage dimensions
		$('#fpd-stage-width, #fpd-stage-height').on('change keyup', function(evt) {

			evt.preventDefault();

			if(	_checkAPI() ) {

				var $this = $(this);

				if($this.attr('id') === 'fpd-stage-width') {
					stageWidth = parseInt($this.val() ? $this.val() : $this.attr('placeholder'));
				}
				else {
					stageHeight = parseInt($this.val() ? $this.val() : $this.attr('placeholder'));
				}

				fancyProductDesigner.setStageDimensions(stageWidth, stageHeight);
				$('input[name="fpd_scale"]').keyup();

			}

		});

		$('#fpd-create-new-fp').click(function(evt) {

			evt.preventDefault();

			if(	_checkAPI() ) {

				var $panel = $(this).parents('.fpd-inner-panel:first');
					addToLibrary = confirm(fpd_admin_opts.addToLibrary);

				fpdBlockPanel($panel);

				fpdAddProduct(function(data) {

					if(data) {

						fpdAddViews(
							data.id,
							fancyProductDesigner.getProduct(),
							addToLibrary,
							//view added
							function(data) {
							},
							//complete
							function() {
								fpdUnblockPanel($panel);
							}
						);

					}
					else {
						fpdUnblockPanel($panel);
					}

				});

			}

		});

		//EXPORT
		$('[name="fpd_output_file"]').change(function() {

			if($('[name="fpd_output_file"]:checked').val() == 'pdf') {
				$('#fpd-pdf-width').parents('label:first').show();
				$('#fpd-pdf-height').parents('label:first').show();
				$('#fpd-pdf-dpi').parents('label:first').show();
			}
			else {
				$('#fpd-pdf-width').parents('label:first').hide();
				$('#fpd-pdf-height').parents('label:first').hide();
				$('#fpd-pdf-dpi').parents('label:first').hide();
			}

		}).change();

		$('[name="fpd_image_format"]').change(function() {

			if($('[name="fpd_image_format"]:checked').val() == 'svg') {
				$('#fpd-pdf-width').parents('tr:first').hide();
			}
			else {
				$('#fpd-pdf-width').parents('tr:first').show();
			}

		}).change();

		$('input[name="fpd_scale"]').keyup(function() {

			var scale = !isNaN(this.value) && this.value.length > 0 ? this.value : 1,
				mmInPx = 3.779528;

			$('#fpd-pdf-width').val(Math.round((stageWidth * scale) / mmInPx));
			$('#fpd-pdf-height').val(Math.round((stageHeight * scale) / mmInPx));

		}).keyup();

		$('#fpd-generate-file').click(function(evt) {

			evt.preventDefault();

			if(_checkAPI()) {

				if($('[name="fpd_output_file"]:checked').val() == 'image') {
					createImage();
				}
				else {
					fpdBlockPanel($(this).parents('.fpd-inner-panel:first'));
					createPdf();
				}

			}

		});



		//SINGLE ELEMENT IMAGES
		$customElementsList.on('click', 'li', function(evt) {

			evt.preventDefault();

			var index = $customElementsList.children('li').index(this),
				stage = fancyProductDesigner.getStage();

			fancyProductDesigner.selectView(customElements[index].element.viewIndex);
			stage.setActiveObject(customElements[index].element);

		});

		$('[name="fpd_single_image_format"]').change(function() {

			if(this.value == 'jpeg') {
				$('[name="fpd_single_element_dpi"]').parents('tr:first').show();
			}
			else {
				$('[name="fpd_single_element_dpi"]').parents('tr:first').hide();
			}

		}).change();


		$('#fpd-save-element-as-image').click(function(evt) {

			evt.preventDefault();

			if(_checkAPI()) {

				var stage = fancyProductDesigner.getStage(),
					format = $('input[name="fpd_single_image_format"]:checked').val(),
					backgroundColor = format == 'jpeg' ? '#ffffff' : 'transparent',
					currentViewIndex = fancyProductDesigner.getViewIndex(),
					objects = stage.getObjects(),
					tempClippingRect = null;

				if(stage.getActiveObject()) {

					var $this = $(this),
						element = stage.getActiveObject(),
						tempScale = element.scaleX,
						tempWidth = stage.getWidth(),
						tempHeight = stage.getHeight(),
						dataObj;

					if(format == 'svg') {

						if(element.toSVG().search('<image') != -1) {
							fpdMessage('You cannot create an SVG file from a bitmap, you can only do this by using a text element or another SVG image file', 'info');
							return false;
						}

					}

					fancyProductDesigner.deselectElement();

					//check if origin size should be rendered
					if($('#fpd-restore-oring-size').is(':checked')) {

						/*if(element.scaleX < 1 && element.clippingRect !== undefined) {

							tempClippingRect = element.clippingRect;
							var clippingScale = 1 + (1-element.scaleX);
							fancyProductDesigner.setClippingRect(element, {
								left: tempClippingRect.left + ((tempClippingRect.width - (tempClippingRect.width * clippingScale)) * 0.5),
								top: tempClippingRect.top + ((tempClippingRect.height - (tempClippingRect.height * clippingScale)) * 0.5),
								width: tempClippingRect.width * clippingScale,
								height: tempClippingRect.height * clippingScale
							});

						}*/

						element.setScaleX(1);
						element.setScaleY(1);
					}

					stage.setBackgroundColor(backgroundColor, function() {

						var paddingTemp = element.padding;
						element.padding = $('input[name="fpd_single_element_padding"]').val().length == 0 ? 0 : Number($('input[name="fpd_single_element_padding"]').val());

						var clipToTemp = element.getClipTo();
						if(clipToTemp != null) {

							if($('#fpd-without-bounding-box').is(':checked')) {
								element.setClipTo(null);
								stage.renderAll();
							}
							else {
								for(var i=0; i < objects.length; ++i) {

									var object = objects[i];
									if(object.viewIndex == currentViewIndex) {
										object.visible = false;
									}

								}

								element.visible = true;
							}

						}

						element.setCoords();

						var source;

						if(format == 'svg') {
							source = element.toSVG();
						}
						else {
							source = clipToTemp != null && !$('#fpd-without-bounding-box').is(':checked') ? stage.toDataURL({format: format}) : element.toDataURL({format: format});
						}

						if($('#fpd-save-on-server').is(':checked')) {

							fpdBlockPanel($this.parents('.fpd-inner-panel:first'));

							if(format == 'svg') {

								dataObj = {
									action: 'fpd_imagefromsvg',
									order_id: orderId,
									item_id: currentItemId,
									svg: source,
									width: stage.getWidth(),
									height: stage.getHeight(),
									title: element.title
								};

							}
							else {

								dataObj = {
									action: 'fpd_imagefromdataurl',
									order_id: orderId,
									item_id: currentItemId,
									data_url: source,
									title: element.title,
									format: format,
									dpi: $('[name="fpd_single_element_dpi"]').val().length == 0 ? 72 : $('[name="fpd_single_element_dpi"]').val()
								};
							}

							$.ajax({
								url: 'index.php?route=sale/fnt_order_product_design/createImage&token=<?php echo $token;?>',
								type: 'post',
								data: dataObj,
								dataType: 'json',
								success: function(json) {
									if(json['code'] == 500) {
										fpdMessage('Image creation failed. Please try again!', 'error');
									}
									else if( json['code'] == 201 ) {
										$orderImageList.append('<li><a href="'+json.url+'" title="'+json.url+'" target="_blank">'+json.title+'.'+format+'</a></li>');
									}
									else {
										//prevent caching
										$orderImageList.find('a[title="'+json.url+'"]').attr('href', json.url+'?t='+new Date().getTime());
									}

									fpdUnblockPanel($this.parents('.fpd-inner-panel:first'));

								}
							});

						}
						else { //dont save it on server

							var popup = window.open('','_blank');
							if(!_popupBlockerEnabled(popup)) {

								popup.document.title = element.title;

								if(format == 'svg') {
									source = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="'+stage.getWidth()+'" height="'+stage.getHeight()+'" xml:space="preserve">'+element.toSVG()+'</svg>';
									$(popup.document.body).append(source);
								}
								else {
									$(popup.document.body).append('<img src="'+source+'" title="Product" />');

								}

							}

						}

						for(var i=0; i < objects.length; ++i) {

							var object = objects[i];
							if(object.viewIndex == currentViewIndex) {
								object.visible = true;
							}

						}

						element.set({scaleX: tempScale, scaleY: tempScale, padding: paddingTemp})
						.setClipTo(clipToTemp)
						.setCoords();

						if(tempClippingRect !== null) {
							//fancyProductDesigner.setClippingRect(element, tempClippingRect);
						}

						stage.setBackgroundColor('transparent')
						.setDimensions({width: tempWidth, height: tempHeight})
						.renderAll();

					});

				}
				else {
					fpdMessage('No element selected!', 'info');
				}
			}

		});

		function createImage() {

			var format = $('input[name="fpd_image_format"]:checked').val(),
				data;

			if(format == 'svg') {
				data = fancyProductDesigner.getViewsSVG();
			}
			else {
				var backgroundColor = format == 'jpeg' ? '#ffffff' : 'transparent',
					multiplier = $('input[name="fpd_scale"]').val().length == 0 ? 1 : Number($('input[name="fpd_scale"]').val());

				data = fancyProductDesigner.getViewsDataURL(format, backgroundColor, multiplier);
			}

			if($('[name="fpd_export_views"]:checked').val() == 'current') {
				var requestedIndex = data[fancyProductDesigner.getViewIndex()];
				data = [];
				data.push(requestedIndex);
			}

			var popup = window.open('','_blank');
			if(!_popupBlockerEnabled(popup)) {
				popup.document.title = orderId;
				for(var i=0; i < data.length; ++i) {
					if(format == 'svg') {
						$(popup.document.body).append(data[i]);
					}
					else {
						$(popup.document.body).append('<img src="'+data[i]+'" title="View'+i+'" />');
					}

				}

			}

		};

		function createPdf() {

			var $panel = $('#fpd-generate-file').parents('.fpd-inner-panel:first');

			if($('#fpd-pdf-width').val() == '') {
				fpdMessage('No width has been entered. Please set one!', 'error');
				return false;
			}
			else if($('#fpd-pdf-height').val() == '') {
				fpdMessage('No height has been entered. Please set one!', 'error');
				return false;
			}

			fpdBlockPanel($panel);

			var format = $('input[name="fpd_image_format"]:checked').val(),
				backgroundColor = format == 'jpeg' ? '#ffffff' : 'transparent',
				data;

			if(format == 'svg') {
				data = fancyProductDesigner.getViewsSVG();
			}
			else {
				var multiplier = $('input[name="fpd_scale"]').val().length == 0 ? 1 : Number($('input[name="fpd_scale"]').val());
				data = fancyProductDesigner.getViewsDataURL(format, backgroundColor, multiplier);
			}

			if($('[name="fpd_export_views"]:checked').val() == 'current') {
				var requestedIndex = data[fancyProductDesigner.getViewIndex()];
				data = [];
				data.push(requestedIndex);
			}

			//var data_str = JSON.stringify(data);

			$.ajax({
				url:  'index.php?route=sale/fnt_order_product_design/createPdfFromDataUrl&token=<?php echo $token;?>',
				data: {
					order_id: orderId,
					item_id: currentItemId,
					data_strings: data,
					width: $('#fpd-pdf-width').val(),
					height: $('#fpd-pdf-height').val(),
					image_format: $('input[name="fpd_image_format"]:checked').val(),
					orientation: stageWidth > stageHeight ? 'L' : 'P',
					dpi: $('#fpd-pdf-dpi').val().length == 0 ? 300 : $('#fpd-pdf-dpi').val()
				},
				type: 'post',
				dataType: 'json',
				success: function(json) {
					if(data == undefined || data.status != 200) {

						var message = '';
						if(data.responseJSON && data.responseJSON.message) {
							message += data.responseJSON.message;
						}
						message += '.\n';
						message += "PDF creation failed - There is too much data being sent. To fix this please increase the WordPress memory limit in your php.ini file. You could export a single view or use the JPEG image format";
						fpdMessage(message, 'error');

					}
					else {
						var json = data.responseJSON;
						if(json !== undefined) {
							window.open(json.url, '_blank');
						}
						else {
							fpdMessage('JSON could not be parsed. Go to wp-content/fancy_products_orders/pdfs and check if a PDF has been generated.', 'error');
						}
					}

					fpdUnblockPanel($panel);

				}
			});

		};

		function _checkAPI() {

			if(fancyProductDesigner.getStage().getObjects().length > 0 && isReady) {
				return true;
			}
			else {
				fpdMessage('No Fancy Product is selected. Please open one from the Order Items!', 'error');
				return false;
			}

		};

		function _popupBlockerEnabled(popup) {

			if (popup == null || typeof(popup)=='undefined') {
				fpdMessage('Your Pop-Up Blocker is enabled so the image will be opened in a new window. Please choose to allow this website in your pop-up blocker!', 'info');
				return true;
			}
			else {
				return false;
			}

		}

	function fpdLoadOrder(order) {

		if(typeof order !== 'object') { return false; }

		loadingProduct = true;
		$orderImageList.empty();
		fancyProductDesigner.clear();

		stageWidth = (order[0].options === undefined || order[0].options.width === undefined) ? stageWidth : order[0].options.width;
		stageHeight = (order[0].options === undefined || order[0].options.stageHeight === undefined) ? stageHeight : order[0].options.stageHeight;
		$('#fpd-stage-width').attr('placeholder', stageWidth);
		$('#fpd-stage-height').attr('placeholder', stageHeight);
		$('input[name="fpd_scale"]').keyup();

		fancyProductDesigner.loadProduct(order);

		jQuery.ajax({

			url: fpd_admin_opts.adminAjaxUrl,
			data: {
				action: 'fpd_loadorderitemimages',
				_ajax_nonce: fpd_admin_opts.ajaxNonce,
				order_id: orderId,
				item_id: currentItemId
			},
			type: 'post',
			dataType: 'json',
			success: function(data) {

				if(data == undefined || data.code == 500) {

					fpdMessage('Could not load order item image. Please try again!', 'info');

				}
				//append order item images to list
				else if( data.code == 200 ) {

					for (var i=0; i < data.images.length; ++i) {
						var title = data.images[i].substr(data.images[i].lastIndexOf('/')+1);
						$orderImageList.append('<li><a href="'+data.images[i]+'" title="'+data.images[i]+'" target="_blank" >'+title+'</a></li>');
					}

				}

			}

		});

	};
	});
</script>		
</div><?php echo $footer;?>	
	