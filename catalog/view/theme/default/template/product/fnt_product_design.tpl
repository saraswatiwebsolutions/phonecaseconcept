<?php echo $header; ?>
<div class="container">
    <div class="row steps-box">
    <div class="col-sm-6 col-md-3"><div class="red-bg imgbox gray_background"><img  src="catalog/view/theme/default/image/step1.png"></div><p>Step 1: Select Case</p></div>
    <div class="col-sm-6 col-md-3"><div class="orange-bg imgbox"><img  src="catalog/view/theme/default/image/step2.png"></div><p>Step 2: Upload Image</p></div>
    <div class="col-sm-6 col-md-3"><div class="green-bg imgbox"><img  src="catalog/view/theme/default/image/step3.png"></div><p>Step 3:  Add text</p></div>
    <div class="col-sm-6 col-md-3"><div class="brown-bg imgbox gray_background"><img  src="catalog/view/theme/default/image/step4.png"></div><p>Step 4: Place Order</p></div>
    </div>
<div class="title_div"><h4>Leather case for iPhone</h4> <a href="index.php?route=common/home" class="back_btn">Back</a></div>
<div class="grid_12">
<div class="prd_view_wrap">
<div class="row">
<div class="col-sm-12 col-md-4">
<div class="edit-wrapper">
<div class="top">
<h3>Edit Image </h3>  
<div class="right_align">
<a href="#"><i class="fa fa-print"></i></a>
<a href="#"><i class="fa fa-download"></i></a>

</a></div>


</div>
<div class="gray-bg">
<ul class="btn-wrap">
<li><span class="uploads-file"> <img  alt="img" src="catalog/view/theme/default/image/upload-img.png"> Uploads  Photo<input type="file"></span></li>
<li><input type="button" class="flip_hor"  value="Flip Horizontally" /> <input type="button" class="flip_ver" value="Filp Vertically" /></li>
</ul>

</div>
<div class="gray-bg light-bg">
<ul class="edit-element">
<li><input type="checkbox"> Select to add text</li>
<li><textarea>Add text here</textarea></li>
<li>

<div class="select-box">
<select>
<option value="0">Font</option>
<option value="02">Arial</option>
<option value="03">Arial</option>
</select>
</div>



<div class="select-box">
<select>
<option value="0">font size</option>
<option value="02">2</option>
<option value="03">3</option>
</select>

</div>
<i class="fa fa-bold"></i>
<i class="fa fa-italic"></i>
<i class="fa fa-underline"></i>

</li>
</ul>

</div>

<div class="gray-bg">
<ul class="thumb-img">
<li> <div class="imgbox"><i class="fa fa-times"></i>
<img src="catalog/view/theme/default/image/thumb-img.jpg"  alt="img"></div></li>
<li> <div class="imgbox"><i class="fa fa-times"></i>
<img src="catalog/view/theme/default/image/thumb-img.jpg"  alt="img"></div></li>
<li> <div class="imgbox"><i class="fa fa-times"></i>
<img src="catalog/view/theme/default/image/thumb-img.jpg"  alt="img"></div></li>
<li> <div class="imgbox"><i class="fa fa-times"></i>
<img src="catalog/view/theme/default/image/thumb-img.jpg"  alt="img"></div></li>
</ul>
<ul class="group-btn">
<li><input type="button" value="Cancel Customization" class="save-order"></li>
<li><input type="Submit" value="Save and Exit" class="save-order"></li>
</ul>
</div>

 
 </div>
</div>
<div class="col-sm-12 col-md-8">
<div class="img-prv"><img src="catalog/view/theme/default/image/product-img.png" width="475" height="450" alt="img"></div>
<div class="qty_div">
Qty :
<ul>
<li><input type="text" /></li>
<li><button class="btn brown-btn"  type="button">Placed an Order</button></li>
<li><button class="btn green-btn" type="button"><i class="fa fa-heart" style="font-size:16px;"></i>
  Add to wish 
  </button></li>
</ul>

</div>
</div>

</div>
</div>
</div>
</div>
<?php echo $footer; ?>