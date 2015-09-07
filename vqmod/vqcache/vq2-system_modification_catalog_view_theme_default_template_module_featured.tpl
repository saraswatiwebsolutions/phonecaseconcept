<h3 class="box-heading"><?php echo "PRODUCTS"; //echo"<pre>";print_r($products); echo"</pre>"; ?></h3>
<div class="row">
  <?php foreach ($products as $product) { ?>
  <div class="product-layout col-lg-3 col-md-4 col-sm-6 col-xs-12">
    <div class="product-thumb transition">
      
                    <div class="image" style="position: relative;">
                        <a href="<?php echo $product['href']; ?>">
                            <img src="<?php echo $product['thumb']; ?>" alt="<?php echo $product['name']; ?>" title="<?php echo $product['name']; ?>" class="img-responsive thumb-module" style="position: absolute; left: 11%;" />
                            <img src="<?php echo $product['mmos_thumb']; ?>" alt="<?php echo $product['name']; ?>" title="<?php echo $product['name']; ?>" />
                        </a>
                    </div>
                        
      <div class="caption">
        <h4><a href="<?php echo $product['href']; ?>" style="color:#000"><?php echo $product['name']; ?></a></h4>
        <p style="color:#a0a0a0"><?php echo $product['description']; ?></p>
        <?php if ($product['rating']) { ?>
        <div class="rating">
          <?php for ($i = 1; $i <= 5; $i++) { ?>
          <?php if ($product['rating'] < $i) { ?>
          <span class="fa fa-stack"><i class="fa fa-star-o fa-stack-2x"></i></span>
          <?php } else { ?>
          <span class="fa fa-stack"><i class="fa fa-star fa-stack-2x"></i><i class="fa fa-star-o fa-stack-2x"></i></span>
          <?php } ?>
          <?php } ?>
		    &nbsp; <?php echo $product['reviews']; ?> 
        </div>
       <?php  } else {  ?> <div class="rating">
          <?php for ($i = 1; $i <= 5; $i++) { ?>
          <?php if ($product['rating'] < $i) { ?>
          <span class="fa fa-stack"><i class="fa fa-star-o fa-stack-2x"></i></span>
          <?php } else { ?>
          <span class="fa fa-stack"><i class="fa fa-star fa-stack-2x"></i><i class="fa fa-star-o fa-stack-2x"></i></span>
          <?php } ?>
          <?php } ?>
		  &nbsp; <?php echo $product['reviews']; ?> 
        </div> <?php  } ?>
        <?php if ($product['price']) { ?>
        <p class="price">
          <?php if (!$product['special']) { ?>
          <h3 style="color:#ed3f01;"><?php echo $product['price']; ?></h3>
          <?php } else { ?>
          <span class="price-new" style="color:#ed3f01;"><?php echo $product['special']; ?></span> <span class="price-old"><?php echo $product['price']; ?></span>
          <?php } ?>
          <?php if ($product['tax']) { ?>
          <span class="price-tax"><?php echo $text_tax; ?> <?php echo $product['tax']; ?></span>
          <?php } ?>
        </p>
        <?php } ?>
      </div>
        <div class="btn-outer-1">
            <?php if($product['link_design']){?>
            <a href="<?php echo $product['link_design']; ?>" data-toggle="tooltip" title="<?php echo $text_design; ?>" class="btn green-btn pull-left"><i class="fa fa-edit"></i>Customize</a>
            <button type="button" class="btn btn-968b7c pull-right" onclick="cart.add('<?php echo $product['product_id']; ?>');"><i class="fa fa-shopping-cart"></i>Add to cart</button> 
            <?php }else{?>    
            <button type="button" class="btn btn-968b7d pull-right" onclick="cart.add('<?php echo $product['product_id']; ?>');"><i class="fa fa-shopping-cart"></i>Add to cart</button>
            <?php }?>
        </div>
        
      <!--<div class="button-group">
        <button type="button" onclick="cart.add('<?php echo $product['product_id']; ?>');"><i class="fa fa-shopping-cart"></i> <span class="hidden-xs hidden-sm hidden-md"><?php echo $button_cart; ?></span></button>
        <button type="button" data-toggle="tooltip" title="<?php echo $button_wishlist; ?>" onclick="wishlist.add('<?php echo $product['product_id']; ?>');"><i class="fa fa-heart"></i></button>
        <button type="button" data-toggle="tooltip" title="<?php echo $button_compare; ?>" onclick="compare.add('<?php echo $product['product_id']; ?>');"><i class="fa fa-exchange"></i></button>
      </div>-->
    </div>
  </div>
  <?php } ?>
</div>
