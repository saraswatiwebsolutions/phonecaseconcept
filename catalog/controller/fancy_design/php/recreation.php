<?php

/*
 This php script receives a JSON encoded string (JSON.stringify) which is sent via $_POST. It gets the JSON encoded string from the getProduct() method.
 When using this script, you should use absolute pathes for your images or place this script in the same folder where you are using the product designer.
*/

?>

<!DOCTYPE HTML>
    <html>
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <title>Fancy Product Designer - Recreation</title>

    <!-- Style sheets -->
	<link rel="stylesheet" type="text/css" href="../css/jquery.fancyProductDesigner-fonts.css" />

    <!-- Include js files -->
	<script src="../js/fabric.js" type="text/javascript"></script>
	<script src="../js/jquery.min.js" type="text/javascript"></script>

	<script type="text/javascript">

		var SCALE_FACTOR = 1;

		window.onload = function() {
			//pass the sent product from $_POST
			var recreationStage = stage = new fabric.Canvas('recreation-canvas', {});
			var json = <?php echo stripslashes($_POST['recreation_product']); ?>;
			recreationStage.loadFromJSON(json, function () {

				var viewIndexes = 0;
				recreationStage.setDimensions({width: recreationStage.width * SCALE_FACTOR, height: recreationStage.height * SCALE_FACTOR});
				recreationStage.renderAll();
				var objects = recreationStage.getObjects();
			    for (var i in objects) {
			    	var object = objects[i];
			    	//scale object
			        object.scaleX = object.scaleX * SCALE_FACTOR;
			        object.scaleY = object.scaleY * SCALE_FACTOR;
			        object.left = objects[i].left * SCALE_FACTOR;
			        //if you have different views, position views among each other
			        object.top = (objects[i].top * SCALE_FACTOR) + (object.viewIndex * json.height * SCALE_FACTOR);
			        object.setCoords();
			        object.visible = true;

					//apply filters to image objects
			        if (object.type === 'image' && object.filters.length) {
				      object.applyFilters(function() {
				        object.canvas.renderAll();
				      });
				    }

			        //resize height if necessary
			        if(object.viewIndex > viewIndexes) {
			        	viewIndexes++;
				        recreationStage.setHeight(recreationStage.getHeight() + (recreationStage.getHeight() * viewIndexes));
			        }
			    }
			    recreationStage.renderAll();

				setTimeout(function() {
					$('#test').attr('src', recreationStage.toDataURL());
				}, 200);

		    });
		}
    </script>

    </head>

    <body>
    	<div>
	    	<canvas id="recreation-canvas" width="600" height="600">
    	</div>

    	<img src="" alt="" id="test" />
    </body>
</html>