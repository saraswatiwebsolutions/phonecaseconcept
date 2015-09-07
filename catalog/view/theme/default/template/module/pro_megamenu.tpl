<div id="pro-mega-menu-container">
	<a href="javascript:void(0);" class="responsive-menu-controller"><?php echo $responsive_title;?></a>
	<ul id='pro-mega-menu'>
		<?php
			$lang_id = $this->registry->get('config')->get('config_language_id');
		?>
		<?php foreach ($menus_root as $menu) { ?>
		<?php
			$title = json_decode(base64_decode($menu['title']), true);
		?>
		<li class="root <?php if(isset($menu['active']) and $menu['active']==1) echo " active";?> <?php if($menu['activemega']==1) echo " mega-root";?>"><a href="<?php echo $menu['url']; ?>"><?php echo html_entity_decode(html_entity_decode($title[$lang_id])) ?></a>
			<?php
				if($menu['activemega']==1)
					$proMegaMenuModel->list_submenu_mega($menu['id']);
				else
					$proMegaMenuModel->list_submenu($menu['id']);
			?>
		</li>
		<?php } ?>
	</ul>
</div>
<style>
<?php /* Start Configuration */ ?>
	<?php if(isset($menu_height) and $menu_height) : ?>
	#pro-mega-menu-container li.root,.responsive-menu-controller{height:<?php echo $menu_height;?>px;}
	#pro-mega-menu-container li.root > a,.responsive-menu-controller{line-height:<?php echo $menu_height;?>px}
	<?php endif; ?>
	<?php if(isset($submenu_width) and $submenu_width) : ?>
	.pro-mega-menu-dropdown-inner > *{width:<?php echo $submenu_width;?>px}
	<?php endif; ?>
	<?php if(isset($submenu_height) and $submenu_height) : ?>
	.normal-submenu > li,.sub-menu-mega > li,.mega-content li{height:<?php echo $submenu_height;?>px;line-height:<?php echo $submenu_height;?>px}
	<?php endif; ?>
	<?php if(isset($menu_font_style) and $menu_font_style) : ?>
	#pro-mega-menu .root > a,.responsive-menu-controller{text-transform:<?php echo $menu_font_style;?>}
	<?php endif; ?>
	<?php if(isset($menu_font_size) and $menu_font_size) : ?>
	#pro-mega-menu .root > a,.responsive-menu-controller{font-size:<?php echo $menu_font_size;?>px}
	<?php endif; ?>
	<?php if(isset($menu_font_color) and $menu_font_color) : ?>
	#pro-mega-menu .root > a,.responsive-menu-controller{color:#<?php echo $menu_font_color;?>}
	@media only screen and (max-width : 767px) {
		.normal-submenu li a{color:#<?php echo $menu_font_color;?>!important}
	}
	<?php endif; ?>
	<?php if(isset($menu_font_color_hover) and $menu_font_color_hover) : ?>
	#pro-mega-menu .root:hover > a{color:#<?php echo $menu_font_color_hover;?>}
	<?php endif; ?>
	<?php if(isset($submenu_font_style) and $submenu_font_style) : ?>
	#pro-mega-menu-container .pro-mega-menu-dropdown-inner > ul > li a,.sub-menu-mega > li a{text-transform:<?php echo $submenu_font_style;?>}
	<?php endif; ?>
	<?php if(isset($submenu_font_size) and $submenu_font_size) : ?>
	#pro-mega-menu-container .pro-mega-menu-dropdown-inner > ul > li a,.sub-menu-mega > li a{font-size:<?php echo $submenu_font_size;?>px}
	<?php endif; ?>
	<?php if(isset($submenu_font_color) and $submenu_font_color) : ?>
	#pro-mega-menu-container .pro-mega-menu-dropdown-inner > ul > li a,.sub-menu-mega > li a,#pro-mega-menu-container .pro-mega-menu-dropdown-inner > *,.mega-content a{color:#<?php echo $submenu_font_color;?>}
	<?php endif; ?>
	<?php if(isset($submenu_font_color_hover) and $submenu_font_color_hover) : ?>
	#pro-mega-menu-container .pro-mega-menu-dropdown-inner > ul > li a:hover,.sub-menu-mega > li a:hover,.mega-content a:hover{color:#<?php echo $submenu_font_color_hover;?>}
	<?php endif; ?>
	<?php if(isset($menu_background) and $menu_background) : ?>
	#pro-mega-menu-container{background:#<?php echo $menu_background;?>}
	<?php endif; ?>
	<?php if(isset($menu_background_hover) and $menu_background_hover) : ?>
	#pro-mega-menu-container li.root:hover,#pro-mega-menu-container li.root.active{background:#<?php echo $menu_background_hover;?>}
	.pro-mega-menu-dropdown{border-bottom:2px solid #<?php echo $menu_background_hover;?>}
	<?php endif; ?>
	<?php if(isset($submenu_background) and $submenu_background) : ?>
	.pro-mega-menu-dropdown{background:#<?php echo $submenu_background;?>}
	<?php endif; ?>
	<?php if(isset($submenu_background_hover) and $submenu_background_hover) : ?>
	.normal-submenu > li:hover{background:#<?php echo $submenu_background_hover;?>}
	<?php endif; ?>
	<?php if(isset($menu_height) and $menu_height) : ?>
	#pro-mega-menu-container{height:<?php echo $menu_height;?>}
	<?php endif; ?>
	<?php if(isset($menu_height) and $menu_height) : ?>
	#pro-mega-menu-container{height:<?php echo $menu_height;?>}
	<?php endif; ?>
	<?php if(isset($menu_height) and $menu_height) : ?>
	#pro-mega-menu-container{height:<?php echo $menu_height;?>}
	<?php endif; ?>
<?php /* End Configuration */ ?>
</style>
<?php
if (file_exists(DIR_TEMPLATE . $configObject->get('config_template') . '/stylesheet/pro_megamenu.css')) {
	$stylesheet = 'catalog/view/theme/'.$configObject->get('config_template').'/stylesheet/pro_megamenu.css';
} else {
	$stylesheet = 'catalog/view/theme/default/stylesheet/pro_megamenu.css';
}
?>
<link href="<?php echo $stylesheet;?>" rel="stylesheet">
<script type="text/javascript">
$(window).load(function(){
	$('#pro-mega-menu li.root > div').each(function(index, element) {
		var menu = $('#pro-mega-menu').offset();
		var dropdown = $(this).parent().offset();
		i = (dropdown.left + $(this).outerWidth()) - (menu.left + $('#pro-mega-menu').outerWidth());
		if (i > 0) {
			$(this).css('margin-left', '-' + i + 'px');
		}
	});
	$('.responsive-menu-controller').click(function(){
		if($(this).next().is(':visible')==true){
			$(this).next().slideUp();
		} else {
			$(this).next().slideDown();
		}
	})
	$('#pro-mega-menu > li.root > a').click(function(){
		if($(this).parent().hasClass('clicked')==false && $(this).parent().hasClass('mega-root')==false && $(this).parent().children('.pro-mega-menu-dropdown').length > 0 && $('.responsive-menu-controller').is(':visible')){
			$(this).parent().addClass('clicked');
			$(this).parent().css('height','auto');
			$(this).next().slideDown();
			return false;
		}
	})
})
</script>