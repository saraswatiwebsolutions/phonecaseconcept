jQuery(document).ready(function($) {

	//Values Group
	$('.radykal-values-group-add').click(function(evt) {

		evt.preventDefault();

		var $this = $(this),
			$tbody = $this.parents('table:first').find('tbody'),
			$inputs = $this.parents('tr:first').find('input[type="text"]').removeClass('radykal-error'),
			valid = true;

		var valid = true;
		for(var i=0; i<$inputs.length; ++i) {
			var $input = $inputs.eq(i),
				regex = new RegExp($input.data('regex'), "i");

			if(regex.test($input.val()) === false) {
				$input.addClass('radykal-error');
				valid = false;
				break;
			}
		}

		if(valid) {
			var values = [];
			$inputs.each(function(i, item) {
				values.push(item.value);
			})
			_appendValuesGroupRow($tbody, values);
		}

		_saveValuesGroup($tbody);

	});

	$('#fpd_color_prices .radykal-option-value').each(function(i, item) {

		var $tbody = $(this).parent().find('tbody'),
			value = item.value;

		if(value.trim().length <= 0) {
			return false;
		}

		var values = value.split(',');

		for(var i=0; i < values.length; ++i) {
			_appendValuesGroupRow($tbody, values[i].split(':'));
		}


	});

	function _appendValuesGroupRow($tbody, values) {

		var row = '<tr>',
			prefix = '';

		for(var i=0; i<values.length; ++i) {
			if( $tbody.prev('thead').find('input').eq(i).prev('span').size() > 0) {
				prefix = $tbody.prev('thead').find('input').eq(i).prev('span').html();
			}
			row += '<td>'+prefix+'<span class="radykal-values-group-td-value">'+values[i]+'</span></td>';
		};

		row += '<td><a href="#" class="radykal-values-group-remove">&times;</a></td></tr>';
		$tbody.append(row)
		.find('tr:last .radykal-values-group-remove').click(function(evt) {

			evt.preventDefault();
			$(this).parents('tr:first').remove();
			_saveValuesGroup($tbody);

		});

	};

	function _saveValuesGroup($tbody) {

		var inputValue = '',
			$rows = $tbody.find('tr');

		$rows.each(function(i, row) {

			var $tds = $(row).children('td:not(:last)');
			$tds.each(function(j, td) {
				inputValue += $(td).children('.radykal-values-group-td-value').text();
				if(j < $tds.size()-1) {
					inputValue += ':';
				}
			});

			if(i < $rows.size()-1) {
				inputValue += ',';
			}

		});

		$tbody.parents('#fpd_color_prices')
		.children('.radykal-option-value').val(inputValue);
	}
});
