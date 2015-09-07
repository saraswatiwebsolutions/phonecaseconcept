function check_megamenu(){
	jQuery('li.dd-item').each(function(){
		var parent = jQuery(this).parents('.dd-list')
		if(parent.length > 1){
			jQuery(this).find('a.activemega').hide();
			jQuery(this).find('.sub-menu-content').hide();
		}
		else{
			jQuery(this).find('a.activemega').show();
		}
	})
}
var updatedata = function(e)
{
	check_megamenu();
}
function megamenuSubmit(){
	jQuery('#menu_area li.dd-item').each(function(index, e){
		if(jQuery(this).children('.dd-list').length > 0){
			var parent_id = index + 1;
			jQuery(this).children('.dd-list').children('li.dd-item').each(function(){
				jQuery(this).find('input.parent_id').val(parent_id);
			})
		}
		$(e).children('.info').find('input, select, textarea').each(function(){
			var name = $(this).attr('name');
			if (typeof name != 'undefined') {
				name = name.replace("[]", "["+index+"]");
				$(this).attr('name', name)
			}
		})
	})
	//return false;
	jQuery('#menu_area').children('.dd-list').children('li').children('.info').children('.hidden-data').children('.parent_id').val(0);
	jQuery('#form').submit();
}
function remove_item(obj){
	var parent=jQuery(obj).parent().parent().parent();
	jQuery(parent).remove();
}
function activemega(obj){
	if(jQuery(obj).hasClass('active')==true){
		jQuery(obj).parent().parent().parent().children(".info").children('.sub-menu-content').show();
		jQuery(obj).parent().parent().children('.hidden-data').children('.activemega').attr('value', 1);
		jQuery(obj).html("Disable megamenu");
		jQuery(obj).removeClass('active');
	}else{
		jQuery(obj).addClass('active');
		jQuery(obj).parent().parent().parent().children(".info").children('.sub-menu-content').hide();
		jQuery(obj).parent().parent().children('.hidden-data').children('.activemega').attr('value', 0);
		jQuery(obj).html("Active Megamenu");
	}
}
function add_menu(obj){
	jQuery('.right #menu_area > ol').append(obj);
	jQuery('.mega-content-editor').summernote({height: 300});
	// Override summernotes image manager
	$('button[data-event=\'showImageDialog\']').attr('data-toggle', 'image').removeAttr('data-event');
	
	$(document).delegate('button[data-toggle=\'image\']', 'click', function() {
		$('#modal-image').remove();
		
		$(this).parents('.note-editor').find('.note-editable').focus();
				
		$.ajax({
			url: 'index.php?route=common/filemanager&token=' + getURLVar('token'),
			dataType: 'html',
			beforeSend: function() {
				$('#button-image i').replaceWith('<i class="fa fa-circle-o-notch fa-spin"></i>');
				$('#button-image').prop('disabled', true);
			}
		});	
	});
}
function explane(obj){
	if(jQuery(obj).parent().children('.info').hasClass('hide')==true)
		{	
			jQuery(obj).parent().children('.info').show();
			jQuery(obj).parent().children('.info').removeClass('hide');
			jQuery(obj).html('Collapse');
		}
	else{
			jQuery(obj).parent().children('.info').hide();
			jQuery(obj).parent().children('.info').addClass('hide');
			jQuery(obj).html('Explane');
		}
 }
function treodenSetColorPicker(obj){
	$(obj).ColorPicker({
		onSubmit: function(hsb, hex, rgb, el) {
			$(el).val(hex);
			$(el).ColorPickerHide();
		},
		onBeforeShow: function () {
			$(this).ColorPickerSetColor(this.value);
		},
		onChange: function(hsb, hex, rgb, el) {
			$(obj).val(hex);
			$(obj).css('background','#' + hex);
		}
	})
}
jQuery(document).ready(function(){
	var id = jQuery('#menu_area').attr('auto-id');
	jQuery('a.add-to-menu').click(function(){
		var parent = jQuery(this).parent().children('ul');
		jQuery(parent).find('input').each(function(){
			if(jQuery(this).is(':checked')){
				var obj=get_content_obj(this, id);
				add_menu(obj);
				jQuery(this).attr('checked', false)
			}
		});
	});
	jQuery('a.add-to-menu_custom').click(function(){
		var obj=get_content_obj_custom(this);		
		add_menu(obj);
	});
	jQuery('#menu_area').nestable({
        group: 1
    }).on('change', updatedata);
	check_megamenu();
	jQuery('.mega-content-editor').summernote({height: 300});
	// Override summernotes image manager
	$('button[data-event=\'showImageDialog\']').attr('data-toggle', 'image').removeAttr('data-event');
	
	$(document).delegate('button[data-toggle=\'image\']', 'click', function() {
		$('#modal-image').remove();
		
		$(this).parents('.note-editor').find('.note-editable').focus();
				
		$.ajax({
			url: 'index.php?route=common/filemanager&token=' + getURLVar('token'),
			dataType: 'html',
			beforeSend: function() {
				$('#button-image i').replaceWith('<i class="fa fa-circle-o-notch fa-spin"></i>');
				$('#button-image').prop('disabled', true);
			}
		});	
	});
})