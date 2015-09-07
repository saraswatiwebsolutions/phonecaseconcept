<?php echo $header; ?>
<div class="container">
    <?php echo $content_top; ?>
    <div class="row steps-box">
    <div class="col-sm-6 col-md-3"><div class="red-bg imgbox"><img  src="catalog/view/theme/default/image/step1.png"></div><p>Step 1: Select Case</p></div>
    <div class="col-sm-6 col-md-3"><div class="orange-bg imgbox"><img  src="catalog/view/theme/default/image/step2.png"></div><p>Step 2: Upload Image</p></div>
    <div class="col-sm-6 col-md-3"><div class="green-bg imgbox"><img  src="catalog/view/theme/default/image/step3.png"></div><p>Step 3:  Add text</p></div>
    <div class="col-sm-6 col-md-3"><div class="brown-bg imgbox"><img  src="catalog/view/theme/default/image/step4.png"></div><p>Step 4: Place Order</p></div>
    </div>
    
  <div class="row"><?php echo $column_left; ?>
    <?php if ($column_left && $column_right) { ?>
    <?php $class = 'col-sm-6'; ?>
    <?php } elseif ($column_left || $column_right) { ?>
    <?php $class = 'col-sm-8 col-md-9'; ?>
    <?php } else { ?>
    <?php $class = 'col-sm-12'; ?>
    <?php } ?>
    <div id="content" class="<?php echo $class; ?>"><?php echo $content_bottom; ?></div>
    <?php echo $column_right; ?></div>
</div>
<?php echo $footer; ?>