<?php echo $header; ?>

<?php

	$HTTP_URL = '';
	
	if( class_exists( 'MijoShop' ) ) {
		$HTTP_URL = HTTP_CATALOG . 'opencart/admin/';
	}

?>

<link type="text/css" href="<?php echo $HTTP_URL; ?>view/stylesheet/mf/css/bootstrap.css" rel="stylesheet" />
<link type="text/css" href="<?php echo $HTTP_URL; ?>view/stylesheet/mf/css/style.css" rel="stylesheet" />

<script type="text/javascript">
	$ = jQuery = $.noConflict(true);
</script>

<script type="text/javascript" src="<?php echo $HTTP_URL; ?>view/stylesheet/mf/js/jquery.min.js"></script>

<script type="text/javascript">
	var $$			= $.noConflict(true),
		$jQuery		= $$;
</script>

<script type="text/javascript" src="<?php echo $HTTP_URL; ?>view/stylesheet/mf/js/bootstrap.js"></script>

<div id="content">
	<div class="breadcrumb">
		<?php foreach( $breadcrumbs as $breadcrumb ) { ?>
			<?php echo $breadcrumb['separator']; ?><a href="<?php echo $breadcrumb['href']; ?>"><?php echo $breadcrumb['text']; ?></a>
		<?php } ?>
	</div>
	
	<div class="mega-filter-pro">
		<div class="box">
			<div class="heading">
				<h1><img src="view/image/module.png" alt="" /> <?php echo $heading_title; ?></h1>
			</div>
			
			<div class="content">
				<div class="text-center"><?php echo $text_installation_in_progress; ?></div>
				<div class="progress">
					<div class="progress-bar" style="width:0%"></div>
				</div>
				<div class="text-center progress-info"><?php echo $text_loading; ?>...</div>
			</div>
		</div>
	</div>
</div>

<script type="text/javascript">
	var MF_AJAX_PARAMS = '<?php echo $HTTP_URL ? "&option=com_mijoshop&format=raw" : ""; ?>';
	
	jQuery().ready(function(){
		function update( data ) {
			var txt = '<?php echo $text_step; ?>: ' + data.step + '/' + data.steps + ', <?php echo $text_progress; ?>: ' + data.progress + '%';
			
			if( typeof data._progress != 'undefined' && data._progress > 0 ) {
				txt += ' - ' + data._progress + '%';
			}
			
			jQuery('.progress-info').text(txt);
			jQuery('.progress-bar').css('width',data.progress+'%');
		}
	
		function install() {
			jQuery.post( '<?php echo $progress_action; ?>'.replace(/&amp;/g,'&')+MF_AJAX_PARAMS, {}, function( response ){
				var data = jQuery.parseJSON( response );

				if( data.success == '1' ) {
					update({
						'step'		: data.steps,
						'steps'		: data.steps,
						'progress'	: 100
					});
					
					window.location.href = '<?php echo $main_action; ?>'.replace(/&amp;/g, '&');
				} else {					
					if( data.progress == 0 && data.step && data.step != data.steps ) {
						update({
							'step'		: data.step-1,
							'steps'		: data.steps,
							'progress'	: 100
						});
					
						setTimeout(function(){
							update( data );
							
							setTimeout(function(){
								install();
							}, 500);
						}, 500);
					} else {
						update( data );
						install();
					}
				}
			});
		}
		
		install();
	});
</script>

<?php echo $footer; ?>