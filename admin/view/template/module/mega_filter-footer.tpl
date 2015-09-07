				</form>
			</div>
		</div>
	</div>
</div>

<script type="text/javascript">
	function mf_footer_ready() {
		$('[data-toggle="fm-buttons"]').each(function(){
			var group = $(this).removeAttr('data-toggle'),
				btns = group.find('> .btn'),
				inputs = group.find('input').hide();

			btns.click(function(){
				inputs.prop('checked',false);
				btns.removeClass('active');

				$(this).addClass('active').find('input').prop('checked', true);

				return false;
			});
		});
	}
	
	$().ready(function(){	
		$(document).ajaxComplete(function(){
			mf_footer_ready();
		});
		
		mf_footer_ready();
	});
</script>

<?php echo $footer; ?>