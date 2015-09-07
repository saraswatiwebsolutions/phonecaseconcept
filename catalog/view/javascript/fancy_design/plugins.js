(function(global){

	"use strict";

	var fabric=global.fabric||(global.fabric={}),
			extend=fabric.util.object.extend,
			clone=fabric.util.object.clone;

	if(fabric.CurvedText){
		fabric.warn('fabric.CurvedText is already defined');
		return;
	}
	var stateProperties=fabric.Text.prototype.stateProperties.concat();
	stateProperties.push(
			'radius',
			'spacing',
			'reverse',
			'effect',
			'range',
			'largeFont',
			'smallFont'
			);
	var _dimensionAffectingProps=fabric.Text.prototype._dimensionAffectingProps;
	_dimensionAffectingProps['radius']=true;
	_dimensionAffectingProps['spacing']=true;
	_dimensionAffectingProps['reverse']=true;
	_dimensionAffectingProps['fill']=true;
	_dimensionAffectingProps['effect']=true;
	_dimensionAffectingProps['width']=true;
	_dimensionAffectingProps['height']=true;
	_dimensionAffectingProps['range']=true;
	_dimensionAffectingProps['fontSize']=true;
	_dimensionAffectingProps['shadow']=true;
	_dimensionAffectingProps['effect']=true;
	_dimensionAffectingProps['range']=true;
	_dimensionAffectingProps['largeFont']=true;
	_dimensionAffectingProps['smallFont']=true;


	var delegatedProperties=fabric.Group.prototype.delegatedProperties;
	delegatedProperties['backgroundColor']=true;
	delegatedProperties['textBackgroundColor']=true;
	delegatedProperties['textDecoration']=true;
	delegatedProperties['stroke']=true;
	delegatedProperties['strokeWidth']=true;
	delegatedProperties['shadow']=true;

	/**
	 * Group class
	 * @class fabric.CurvedText
	 * @extends fabric.Text
	 * @mixes fabric.Collection
	 */
	fabric.CurvedText=fabric.util.createClass(fabric.Text, fabric.Collection, /** @lends fabric.CurvedText.prototype */ {
		/**
		 * Type of an object
		 * @type String
		 * @default
		 */
		type: 'curvedText',
		/**
		 * The radius of the curved Text
		 * @type Number
		 * @default 50
		 */
		radius: 50,
		/**
		 * Special Effects, Thanks to fahadnabbasi
		 * https://github.com/EffEPi/fabric.curvedText/issues/9
		 */
		range: 5,
		smallFont: 10,
		largeFont: 30,
		effect: 'curved',
		/**
		 * Spacing between the letters
		 * @type fabricNumber
		 * @default 20
		 */
		spacing: 15,
//		letters: null,

		/**
		 * Reversing the radius (position of the original point)
		 * @type Boolead
		 * @default false
		 */
		reverse: false,
		/**
		 * List of properties to consider when checking if state of an object is changed ({@link fabric.Object#hasStateChanged})
		 * as well as for history (undo/redo) purposes
		 * @type Array
		 */
		stateProperties: stateProperties,
		/**
		 * Properties that are delegated to group objects when reading/writing
		 * @param {Object} delegatedProperties
		 */
		delegatedProperties: delegatedProperties,
		/**
		 * Properties which when set cause object to change dimensions
		 * @type Object
		 * @private
		 */
		_dimensionAffectingProps: _dimensionAffectingProps,
		/**
		 *
		 * Rendering, is we are rendering and another rendering call is passed, then stop rendering the old and
		 * rendering the new (trying to speed things up)
		 */
		_isRendering: 0,
		/**
		 * Added complexity
		 */
		complexity: function(){
			this.callSuper('complexity');
		},
		initialize: function(text, options){
			options||(options={});
			this.letters=new fabric.Group([], {
				selectable: false,
				padding: 0
			});
			this.__skipDimension=true;
			this.setOptions(options);
			this.__skipDimension=false;
//			this.callSuper('initialize', options);
			this.setText(text);
		},
		setText: function(text){
			if(this.letters){
				while(text.length!==0&&this.letters.size()>=text.length){
					this.letters.remove(this.letters.item(this.letters.size()-1));
				}
				for(var i=0; i<text.length; i++){
					//I need to pass the options from the main options
					if(this.letters.item(i)===undefined){
						this.letters.add(new fabric.Text(text[i]));
					}else{
						this.letters.item(i).setText(text[i]);
					}
				}
			}
			this.callSuper('setText', text);
		},
		_render: function(ctx){
			var renderingCode=fabric.util.getRandomInt(100, 999);
			this._isRendering=renderingCode;
			if(this.letters){
				var curAngle=0,
						angleRadians=0,
						align=0;
				// Text align
				if(this.get('textAlign')==='center'||this.get('textAlign')==='justify'){
					align=(this.spacing/2)*(this.text.length-1);
				}else if(this.get('textAlign')==='right'){
					align=(this.spacing)*(this.text.length-1);
				}
				var width=0,
						multiplier=this.reverse?1:-1;
				for(var i=0, len=this.text.length; i<len; i++){
					if(renderingCode!==this._isRendering)
						return;
					// Find coords of each letters (radians : angle*(Math.PI / 180)
					curAngle=multiplier*(-i*parseInt(this.spacing, 10)+align);
					angleRadians=curAngle*(Math.PI/180);

					for(var key in this.delegatedProperties){
						this.letters.item(i).set(key, this.get(key));
					}
					this.letters.item(i).set('left', (width));
					this.letters.item(i).set('top', (0));
					this.letters.item(i).setAngle(0);
					this.letters.item(i).set('padding', 0);

					if(this.effect==='curved'){
						this.letters.item(i).set('top', (multiplier*Math.cos(angleRadians)*this.radius));
						this.letters.item(i).set('left', (multiplier*-Math.sin(angleRadians)*this.radius));

						this.letters.item(i).setAngle(curAngle);
						this.letters.item(i).set('padding', 0);
						this.letters.item(i).set('selectable', false);

					}else if(this.effect==='arc'){//arc
						this.letters.item(i).set('top', (multiplier*Math.cos(angleRadians)*this.radius));
						this.letters.item(i).set('left', (multiplier*-Math.sin(angleRadians)*this.radius));

						this.letters.item(i).set('padding', 0);
						this.letters.item(i).set('selectable', false);
					}else if(this.effect==='STRAIGHT'){//STRAIGHT
						//var newfont=(i*5)+15;
						//this.letters.item(i).set('fontSize',(newfont));
						this.letters.item(i).set('left', (width));
						this.letters.item(i).set('top', (0));
						this.letters.item(i).setAngle(0);
						width+=this.letters.item(i).get('width');
						this.letters.item(i).set('padding', 0);
						this.letters.item(i).set({
							borderColor: 'red',
							cornerColor: 'green',
							cornerSize: 6,
							transparentCorners: false
						});
						this.letters.item(i).set('selectable', false);
					}else if(this.effect==='smallToLarge'){//smallToLarge
						var small=parseInt(this.smallFont);
						var large=parseInt(this.largeFont);
						//var small = 20;
						//var large = 75;
						var difference=large-small;
						var center=Math.ceil(this.text.length/2);
						var step=difference/(this.text.length);
						var newfont=small+(i*step);

						//var newfont=(i*this.smallFont)+15;

						this.letters.item(i).set('fontSize', (newfont));

						this.letters.item(i).set('left', (width));
						width+=this.letters.item(i).get('width');
						//this.letters.item(i).set('padding', 0);
						/*this.letters.item(i).set({
						 borderColor: 'red',
						 cornerColor: 'green',
						 cornerSize: 6,
						 transparentCorners: false
						 });*/
						this.letters.item(i).set('padding', 0);
						this.letters.item(i).set('selectable', false);
						this.letters.item(i).set('top', -1*this.letters.item(i).get('fontSize')+i);
						//this.letters.width=width;
						//this.letters.height=this.letters.item(i).get('height');

					}else if(this.effect==='largeToSmallTop'){//largeToSmallTop
						var small=parseInt(this.largeFont);
						var large=parseInt(this.smallFont);
						//var small = 20;
						//var large = 75;
						var difference=large-small;
						var center=Math.ceil(this.text.length/2);
						var step=difference/(this.text.length);
						var newfont=small+(i*step);
						//var newfont=((this.text.length-i)*this.smallFont)+12;
						this.letters.item(i).set('fontSize', (newfont));
						this.letters.item(i).set('left', (width));
						width+=this.letters.item(i).get('width');
						this.letters.item(i).set('padding', 0);
						this.letters.item(i).set({
							borderColor: 'red',
							cornerColor: 'green',
							cornerSize: 6,
							transparentCorners: false
						});
						this.letters.item(i).set('padding', 0);
						this.letters.item(i).set('selectable', false);
						this.letters.item(i).top=-1*this.letters.item(i).get('fontSize')+(i/this.text.length);

					}else if(this.effect==='largeToSmallBottom'){
						var small=parseInt(this.largeFont);
						var large=parseInt(this.smallFont);
						//var small = 20;
						//var large = 75;
						var difference=large-small;
						var center=Math.ceil(this.text.length/2);
						var step=difference/(this.text.length);
						var newfont=small+(i*step);
						//var newfont=((this.text.length-i)*this.smallFont)+12;
						this.letters.item(i).set('fontSize', (newfont));
						this.letters.item(i).set('left', (width));
						width+=this.letters.item(i).get('width');
						this.letters.item(i).set('padding', 0);
						this.letters.item(i).set({
							borderColor: 'red',
							cornerColor: 'green',
							cornerSize: 6,
							transparentCorners: false
						});
						this.letters.item(i).set('padding', 0);
						this.letters.item(i).set('selectable', false);
						//this.letters.item(i).top =-1* this.letters.item(i).get('fontSize')+newfont-((this.text.length-i))-((this.text.length-i));
						this.letters.item(i).top=-1*this.letters.item(i).get('fontSize')-i;

					}else if(this.effect==='bulge'){//bulge
						var small=parseInt(this.smallFont);
						var large=parseInt(this.largeFont);
						//var small = 20;
						//var large = 75;
						var difference=large-small;
						var center=Math.ceil(this.text.length/2);
						var step=difference/(this.text.length-center);
						if(i<center)
							var newfont=small+(i*step);
						else
							var newfont=large-((i-center+1)*step);
						this.letters.item(i).set('fontSize', (newfont));

						this.letters.item(i).set('left', (width));
						width+=this.letters.item(i).get('width');

						this.letters.item(i).set('padding', 0);
						this.letters.item(i).set('selectable', false);

						this.letters.item(i).set('top', -1*this.letters.item(i).get('height')/2);
					}
				}

				// Update group coords
				this.letters._calcBounds();
				this.letters._updateObjectsCoords();
				this.letters.saveCoords();
				// this.letters.render(ctx);

				this.width=this.letters.width;
				this.height=this.letters.height;
				this.letters.left=-(this.letters.width/2);
				this.letters.top=-(this.letters.height/2);
//				console.log('End rendering')
			}
		},
		_renderOld: function(ctx){
			if(this.letters){
				var curAngle=0,
						angleRadians=0,
						align=0;
				// Text align
				if(this.get('textAlign')==='center'||this.get('textAlign')==='justify'){
					align=(this.spacing/2)*(this.text.length-1);
				}else if(this.get('textAlign')==='right'){
					align=(this.spacing)*(this.text.length-1);
				}
				var multiplier=this.reverse?1:-1;
				for(var i=0, len=this.text.length; i<len; i++){
					// Find coords of each letters (radians : angle*(Math.PI / 180)
					curAngle=multiplier*(-i*parseInt(this.spacing, 10)+align);
					angleRadians=curAngle*(Math.PI/180);

					for(var key in this.delegatedProperties){
						this.letters.item(i).set(key, this.get(key));
					}
					this.letters.item(i).set('top', (-Math.cos(angleRadians)*this.radius));
					this.letters.item(i).set('left', (+Math.sin(angleRadians)*this.radius));
					this.letters.item(i).setAngle(curAngle);
					this.letters.item(i).set('padding', 0);
					this.letters.item(i).set('selectable', false);
				}
				// Update group coords
				this.letters._calcBounds();
				this.letters._updateObjectsCoords();
				this.letters.saveCoords();
//				this.letters.render(ctx);
				this.width=this.letters.width;
				this.height=this.letters.height;
				this.letters.left=-(this.letters.width/2);
				this.letters.top=-(this.letters.height/2);
			}
		},
		render: function(ctx, noTransform){
			// do not render if object is not visible
			if(!this.visible)
				return;
			if(!this.letters)
				return;

			//ctx.save();
			this.transform(ctx);

			var groupScaleFactor=Math.max(this.scaleX, this.scaleY);

			this.clipTo&&fabric.util.clipContext(this, ctx);

			//The array is now sorted in order of highest first, so start from end.
			for(var i=0, len=this.letters.size(); i<len; i++){
				var object=this.letters.item(i),
						originalScaleFactor=object.borderScaleFactor,
						originalHasRotatingPoint=object.hasRotatingPoint;

				// do not render if object is not visible
				if(!object.visible)
					continue;

//				object.borderScaleFactor=groupScaleFactor;
//				object.hasRotatingPoint=false;

				object.render(ctx);

//				object.borderScaleFactor=originalScaleFactor;
//				object.hasRotatingPoint=originalHasRotatingPoint;
			}
			this.clipTo&&ctx.restore();

			//Those lines causes double borders.. not sure why
//			if(!noTransform&&this.active){
//				this.drawBorders(ctx);
//				this.drawControls(ctx);
//			}
//			ctx.restore();
			this.setCoords();
		},
		/**
		 * @private
		 */
		_set: function(key, value){
			this.callSuper('_set', key, value);
			if(this.letters){
				//Properties are delegated with the object is rendered
//				if (key in this.delegatedProperties) {
//					var i = this.letters.size();
//					while (i--) {
//						this.letters.item(i).set(key, value);
//					}
//				}
				if(key in this._dimensionAffectingProps){
					this._initDimensions();
					this.setCoords();
				}
			}
		},
		toObject: function(propertiesToInclude){
			var object=extend(this.callSuper('toObject', propertiesToInclude), {
				radius: this.radius,
				spacing: this.spacing,
				reverse: this.reverse,
				effect: this.effect,
				range: this.range,
				smallFont: this.smallFont,
				largeFont: this.largeFont
						//				letters: this.letters	//No need to pass this, the letters are recreated on the fly every time when initiated
			});
			if(!this.includeDefaultValues){
				this._removeDefaultValues(object);
			}
			return object;
		},
		/**
		 * Returns string represenation of a group
		 * @return {String}
		 */
		toString: function(){
			return '#<fabric.CurvedText ('+this.complexity()+'): { "text": "'+this.text+'", "fontFamily": "'+this.fontFamily+'", "radius": "'+this.radius+'", "spacing": "'+this.spacing+'", "reverse": "'+this.reverse+'" }>';
		},
		/* _TO_SVG_START_ */
		/**
		 * Returns svg representation of an instance
		 * @param {Function} [reviver] Method for further parsing of svg representation.
		 * @return {String} svg representation of an instance
		 */
		toSVG: function(reviver){
			var markup=[
				'<g ',
				'transform="', this.getSvgTransform(),
				'">'
			];
			if(this.letters){
				for(var i=0, len=this.letters.size(); i<len; i++){
					markup.push(this.letters.item(i).toSVG(reviver));
				}
			}
			markup.push('</g>');
			return reviver?reviver(markup.join('')):markup.join('');
		}
		/* _TO_SVG_END_ */
	});

	/**
	 * Returns {@link fabric.CurvedText} instance from an object representation
	 * @static
	 * @memberOf fabric.CurvedText
	 * @param {Object} object Object to create a group from
	 * @param {Object} [options] Options object
	 * @return {fabric.CurvedText} An instance of fabric.CurvedText
	 */
	fabric.CurvedText.fromObject=function(object){
		return new fabric.CurvedText(object.text, clone(object));
	};

	fabric.util.createAccessors(fabric.CurvedText);

	/**
	 * Indicates that instances of this type are async
	 * @static
	 * @memberOf fabric.CurvedText
	 * @type Boolean
	 * @default
	 */
	fabric.CurvedText.async=false;

})(typeof exports!=='undefined'?exports:this);


/* == jquery mousewheel plugin == Version: 3.1.12, License: MIT License (MIT) */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a:a(jQuery)}(function(a){function b(b){var g=b||window.event,h=i.call(arguments,1),j=0,l=0,m=0,n=0,o=0,p=0;if(b=a.event.fix(g),b.type="mousewheel","detail"in g&&(m=-1*g.detail),"wheelDelta"in g&&(m=g.wheelDelta),"wheelDeltaY"in g&&(m=g.wheelDeltaY),"wheelDeltaX"in g&&(l=-1*g.wheelDeltaX),"axis"in g&&g.axis===g.HORIZONTAL_AXIS&&(l=-1*m,m=0),j=0===m?l:m,"deltaY"in g&&(m=-1*g.deltaY,j=m),"deltaX"in g&&(l=g.deltaX,0===m&&(j=-1*l)),0!==m||0!==l){if(1===g.deltaMode){var q=a.data(this,"mousewheel-line-height");j*=q,m*=q,l*=q}else if(2===g.deltaMode){var r=a.data(this,"mousewheel-page-height");j*=r,m*=r,l*=r}if(n=Math.max(Math.abs(m),Math.abs(l)),(!f||f>n)&&(f=n,d(g,n)&&(f/=40)),d(g,n)&&(j/=40,l/=40,m/=40),j=Math[j>=1?"floor":"ceil"](j/f),l=Math[l>=1?"floor":"ceil"](l/f),m=Math[m>=1?"floor":"ceil"](m/f),k.settings.normalizeOffset&&this.getBoundingClientRect){var s=this.getBoundingClientRect();o=b.clientX-s.left,p=b.clientY-s.top}return b.deltaX=l,b.deltaY=m,b.deltaFactor=f,b.offsetX=o,b.offsetY=p,b.deltaMode=0,h.unshift(b,j,l,m),e&&clearTimeout(e),e=setTimeout(c,200),(a.event.dispatch||a.event.handle).apply(this,h)}}function c(){f=null}function d(a,b){return k.settings.adjustOldDeltas&&"mousewheel"===a.type&&b%120===0}var e,f,g=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],i=Array.prototype.slice;if(a.event.fixHooks)for(var j=g.length;j;)a.event.fixHooks[g[--j]]=a.event.mouseHooks;var k=a.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var c=h.length;c;)this.addEventListener(h[--c],b,!1);else this.onmousewheel=b;a.data(this,"mousewheel-line-height",k.getLineHeight(this)),a.data(this,"mousewheel-page-height",k.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var c=h.length;c;)this.removeEventListener(h[--c],b,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(b){var c=a(b),d=c["offsetParent"in a.fn?"offsetParent":"parent"]();return d.length||(d=a("body")),parseInt(d.css("fontSize"),10)||parseInt(c.css("fontSize"),10)||16},getPageHeight:function(b){return a(b).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})});
/* == malihu jquery custom scrollbar plugin == Version: 3.0.7, License: MIT License (MIT) */
!function(e,t,a){!function(t){var o="function"==typeof define&&define.amd,n="https:"==a.location.protocol?"https:":"http:",i="cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.12/jquery.mousewheel.min.js";o||e.event.special.mousewheel||e("head").append(decodeURI("%3Cscript src="+n+"//"+i+"%3E%3C/script%3E")),t()}(function(){var o,n="mCustomScrollbar",i="mCS",r=".mCustomScrollbar",l={setTop:0,setLeft:0,axis:"y",scrollbarPosition:"inside",scrollInertia:950,autoDraggerLength:!0,alwaysShowScrollbar:0,snapOffset:0,mouseWheel:{enable:!0,scrollAmount:"auto",axis:"y",deltaFactor:"auto",disableOver:["select","option","keygen","datalist","textarea"]},scrollButtons:{scrollType:"stepless",scrollAmount:"auto"},keyboard:{enable:!0,scrollType:"stepless",scrollAmount:"auto"},contentTouchScroll:25,advanced:{autoScrollOnFocus:"input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",updateOnContentResize:!0,updateOnImageLoad:!0},theme:"light",callbacks:{onTotalScrollOffset:0,onTotalScrollBackOffset:0,alwaysTriggerOffsets:!0}},s=0,c={},d=t.attachEvent&&!t.addEventListener?1:0,u=!1,f=["mCSB_dragger_onDrag","mCSB_scrollTools_onDrag","mCS_img_loaded","mCS_disabled","mCS_destroyed","mCS_no_scrollbar","mCS-autoHide","mCS-dir-rtl","mCS_no_scrollbar_y","mCS_no_scrollbar_x","mCS_y_hidden","mCS_x_hidden","mCSB_draggerContainer","mCSB_buttonUp","mCSB_buttonDown","mCSB_buttonLeft","mCSB_buttonRight"],h={init:function(t){var t=e.extend(!0,{},l,t),a=m.call(this);if(t.live){var o=t.liveSelector||this.selector||r,n=e(o);if("off"===t.live)return void g(o);c[o]=setTimeout(function(){n.mCustomScrollbar(t),"once"===t.live&&n.length&&g(o)},500)}else g(o);return t.setWidth=t.set_width?t.set_width:t.setWidth,t.setHeight=t.set_height?t.set_height:t.setHeight,t.axis=t.horizontalScroll?"x":v(t.axis),t.scrollInertia=t.scrollInertia>0&&t.scrollInertia<17?17:t.scrollInertia,"object"!=typeof t.mouseWheel&&1==t.mouseWheel&&(t.mouseWheel={enable:!0,scrollAmount:"auto",axis:"y",preventDefault:!1,deltaFactor:"auto",normalizeDelta:!1,invert:!1}),t.mouseWheel.scrollAmount=t.mouseWheelPixels?t.mouseWheelPixels:t.mouseWheel.scrollAmount,t.mouseWheel.normalizeDelta=t.advanced.normalizeMouseWheelDelta?t.advanced.normalizeMouseWheelDelta:t.mouseWheel.normalizeDelta,t.scrollButtons.scrollType=x(t.scrollButtons.scrollType),p(t),e(a).each(function(){var a=e(this);if(!a.data(i)){a.data(i,{idx:++s,opt:t,scrollRatio:{y:null,x:null},overflowed:null,contentReset:{y:null,x:null},bindEvents:!1,tweenRunning:!1,sequential:{},langDir:a.css("direction"),cbOffsets:null,trigger:null});var o=a.data(i),n=o.opt,r=a.data("mcs-axis"),l=a.data("mcs-scrollbar-position"),c=a.data("mcs-theme");r&&(n.axis=r),l&&(n.scrollbarPosition=l),c&&(n.theme=c,p(n)),_.call(this),e("#mCSB_"+o.idx+"_container img:not(."+f[2]+")").addClass(f[2]),h.update.call(null,a)}})},update:function(t,a){var o=t||m.call(this);return e(o).each(function(){var t=e(this);if(t.data(i)){var o=t.data(i),n=o.opt,r=e("#mCSB_"+o.idx+"_container"),l=[e("#mCSB_"+o.idx+"_dragger_vertical"),e("#mCSB_"+o.idx+"_dragger_horizontal")];if(!r.length)return;o.tweenRunning&&Q(t),t.hasClass(f[3])&&t.removeClass(f[3]),t.hasClass(f[4])&&t.removeClass(f[4]),C.call(this),w.call(this),"y"===n.axis||n.advanced.autoExpandHorizontalScroll||r.css("width",S(r.children())),o.overflowed=k.call(this),R.call(this),n.autoDraggerLength&&y.call(this),B.call(this),O.call(this);var s=[Math.abs(r[0].offsetTop),Math.abs(r[0].offsetLeft)];"x"!==n.axis&&(o.overflowed[0]?l[0].height()>l[0].parent().height()?M.call(this):(G(t,s[0].toString(),{dir:"y",dur:0,overwrite:"none"}),o.contentReset.y=null):(M.call(this),"y"===n.axis?I.call(this):"yx"===n.axis&&o.overflowed[1]&&G(t,s[1].toString(),{dir:"x",dur:0,overwrite:"none"}))),"y"!==n.axis&&(o.overflowed[1]?l[1].width()>l[1].parent().width()?M.call(this):(G(t,s[1].toString(),{dir:"x",dur:0,overwrite:"none"}),o.contentReset.x=null):(M.call(this),"x"===n.axis?I.call(this):"yx"===n.axis&&o.overflowed[0]&&G(t,s[0].toString(),{dir:"y",dur:0,overwrite:"none"}))),a&&o&&(2===a&&n.callbacks.onImageLoad&&"function"==typeof n.callbacks.onImageLoad?n.callbacks.onImageLoad.call(this):3===a&&n.callbacks.onSelectorChange&&"function"==typeof n.callbacks.onSelectorChange?n.callbacks.onSelectorChange.call(this):n.callbacks.onUpdate&&"function"==typeof n.callbacks.onUpdate&&n.callbacks.onUpdate.call(this)),N.call(this)}})},scrollTo:function(t,a){if("undefined"!=typeof t&&null!=t){var o=m.call(this);return e(o).each(function(){var o=e(this);if(o.data(i)){var n=o.data(i),r=n.opt,l={trigger:"external",scrollInertia:r.scrollInertia,scrollEasing:"mcsEaseInOut",moveDragger:!1,timeout:60,callbacks:!0,onStart:!0,onUpdate:!0,onComplete:!0},s=e.extend(!0,{},l,a),c=Y.call(this,t),d=s.scrollInertia>0&&s.scrollInertia<17?17:s.scrollInertia;c[0]=X.call(this,c[0],"y"),c[1]=X.call(this,c[1],"x"),s.moveDragger&&(c[0]*=n.scrollRatio.y,c[1]*=n.scrollRatio.x),s.dur=d,setTimeout(function(){null!==c[0]&&"undefined"!=typeof c[0]&&"x"!==r.axis&&n.overflowed[0]&&(s.dir="y",s.overwrite="all",G(o,c[0].toString(),s)),null!==c[1]&&"undefined"!=typeof c[1]&&"y"!==r.axis&&n.overflowed[1]&&(s.dir="x",s.overwrite="none",G(o,c[1].toString(),s))},s.timeout)}})}},stop:function(){var t=m.call(this);return e(t).each(function(){var t=e(this);t.data(i)&&Q(t)})},disable:function(t){var a=m.call(this);return e(a).each(function(){var a=e(this);if(a.data(i)){{a.data(i)}N.call(this,"remove"),I.call(this),t&&M.call(this),R.call(this,!0),a.addClass(f[3])}})},destroy:function(){var t=m.call(this);return e(t).each(function(){var a=e(this);if(a.data(i)){var o=a.data(i),r=o.opt,l=e("#mCSB_"+o.idx),s=e("#mCSB_"+o.idx+"_container"),c=e(".mCSB_"+o.idx+"_scrollbar");r.live&&g(r.liveSelector||e(t).selector),N.call(this,"remove"),I.call(this),M.call(this),a.removeData(i),$(this,"mcs"),c.remove(),s.find("img."+f[2]).removeClass(f[2]),l.replaceWith(s.contents()),a.removeClass(n+" _"+i+"_"+o.idx+" "+f[6]+" "+f[7]+" "+f[5]+" "+f[3]).addClass(f[4])}})}},m=function(){return"object"!=typeof e(this)||e(this).length<1?r:this},p=function(t){var a=["rounded","rounded-dark","rounded-dots","rounded-dots-dark"],o=["rounded-dots","rounded-dots-dark","3d","3d-dark","3d-thick","3d-thick-dark","inset","inset-dark","inset-2","inset-2-dark","inset-3","inset-3-dark"],n=["minimal","minimal-dark"],i=["minimal","minimal-dark"],r=["minimal","minimal-dark"];t.autoDraggerLength=e.inArray(t.theme,a)>-1?!1:t.autoDraggerLength,t.autoExpandScrollbar=e.inArray(t.theme,o)>-1?!1:t.autoExpandScrollbar,t.scrollButtons.enable=e.inArray(t.theme,n)>-1?!1:t.scrollButtons.enable,t.autoHideScrollbar=e.inArray(t.theme,i)>-1?!0:t.autoHideScrollbar,t.scrollbarPosition=e.inArray(t.theme,r)>-1?"outside":t.scrollbarPosition},g=function(e){c[e]&&(clearTimeout(c[e]),$(c,e))},v=function(e){return"yx"===e||"xy"===e||"auto"===e?"yx":"x"===e||"horizontal"===e?"x":"y"},x=function(e){return"stepped"===e||"pixels"===e||"step"===e||"click"===e?"stepped":"stepless"},_=function(){var t=e(this),a=t.data(i),o=a.opt,r=o.autoExpandScrollbar?" "+f[1]+"_expand":"",l=["<div id='mCSB_"+a.idx+"_scrollbar_vertical' class='mCSB_scrollTools mCSB_"+a.idx+"_scrollbar mCS-"+o.theme+" mCSB_scrollTools_vertical"+r+"'><div class='"+f[12]+"'><div id='mCSB_"+a.idx+"_dragger_vertical' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>","<div id='mCSB_"+a.idx+"_scrollbar_horizontal' class='mCSB_scrollTools mCSB_"+a.idx+"_scrollbar mCS-"+o.theme+" mCSB_scrollTools_horizontal"+r+"'><div class='"+f[12]+"'><div id='mCSB_"+a.idx+"_dragger_horizontal' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>"],s="yx"===o.axis?"mCSB_vertical_horizontal":"x"===o.axis?"mCSB_horizontal":"mCSB_vertical",c="yx"===o.axis?l[0]+l[1]:"x"===o.axis?l[1]:l[0],d="yx"===o.axis?"<div id='mCSB_"+a.idx+"_container_wrapper' class='mCSB_container_wrapper' />":"",u=o.autoHideScrollbar?" "+f[6]:"",h="x"!==o.axis&&"rtl"===a.langDir?" "+f[7]:"";o.setWidth&&t.css("width",o.setWidth),o.setHeight&&t.css("height",o.setHeight),o.setLeft="y"!==o.axis&&"rtl"===a.langDir?"989999px":o.setLeft,t.addClass(n+" _"+i+"_"+a.idx+u+h).wrapInner("<div id='mCSB_"+a.idx+"' class='mCustomScrollBox mCS-"+o.theme+" "+s+"'><div id='mCSB_"+a.idx+"_container' class='mCSB_container' style='position:relative; top:"+o.setTop+"; left:"+o.setLeft+";' dir="+a.langDir+" /></div>");var m=e("#mCSB_"+a.idx),p=e("#mCSB_"+a.idx+"_container");"y"===o.axis||o.advanced.autoExpandHorizontalScroll||p.css("width",S(p.children())),"outside"===o.scrollbarPosition?("static"===t.css("position")&&t.css("position","relative"),t.css("overflow","visible"),m.addClass("mCSB_outside").after(c)):(m.addClass("mCSB_inside").append(c),p.wrap(d)),b.call(this);var g=[e("#mCSB_"+a.idx+"_dragger_vertical"),e("#mCSB_"+a.idx+"_dragger_horizontal")];g[0].css("min-height",g[0].height()),g[1].css("min-width",g[1].width())},S=function(t){return Math.max.apply(Math,t.map(function(){return e(this).outerWidth(!0)}).get())},w=function(){var t=e(this),a=t.data(i),o=a.opt,n=e("#mCSB_"+a.idx+"_container");o.advanced.autoExpandHorizontalScroll&&"y"!==o.axis&&n.css({position:"absolute",width:"auto"}).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({width:Math.ceil(n[0].getBoundingClientRect().right+.4)-Math.floor(n[0].getBoundingClientRect().left),position:"relative"}).unwrap()},b=function(){var t=e(this),a=t.data(i),o=a.opt,n=e(".mCSB_"+a.idx+"_scrollbar:first"),r=at(o.scrollButtons.tabindex)?"tabindex='"+o.scrollButtons.tabindex+"'":"",l=["<a href='#' class='"+f[13]+"' oncontextmenu='return false;' "+r+" />","<a href='#' class='"+f[14]+"' oncontextmenu='return false;' "+r+" />","<a href='#' class='"+f[15]+"' oncontextmenu='return false;' "+r+" />","<a href='#' class='"+f[16]+"' oncontextmenu='return false;' "+r+" />"],s=["x"===o.axis?l[2]:l[0],"x"===o.axis?l[3]:l[1],l[2],l[3]];o.scrollButtons.enable&&n.prepend(s[0]).append(s[1]).next(".mCSB_scrollTools").prepend(s[2]).append(s[3])},C=function(){var t=e(this),a=t.data(i),o=e("#mCSB_"+a.idx),n=t.css("max-height")||"none",r=-1!==n.indexOf("%"),l=t.css("box-sizing");if("none"!==n){var s=r?t.parent().height()*parseInt(n)/100:parseInt(n);"border-box"===l&&(s-=t.innerHeight()-t.height()+(t.outerHeight()-t.innerHeight())),o.css("max-height",Math.round(s))}},y=function(){var t=e(this),a=t.data(i),o=e("#mCSB_"+a.idx),n=e("#mCSB_"+a.idx+"_container"),r=[e("#mCSB_"+a.idx+"_dragger_vertical"),e("#mCSB_"+a.idx+"_dragger_horizontal")],l=[o.height()/n.outerHeight(!1),o.width()/n.outerWidth(!1)],s=[parseInt(r[0].css("min-height")),Math.round(l[0]*r[0].parent().height()),parseInt(r[1].css("min-width")),Math.round(l[1]*r[1].parent().width())],c=d&&s[1]<s[0]?s[0]:s[1],u=d&&s[3]<s[2]?s[2]:s[3];r[0].css({height:c,"max-height":r[0].parent().height()-10}).find(".mCSB_dragger_bar").css({"line-height":s[0]+"px"}),r[1].css({width:u,"max-width":r[1].parent().width()-10})},B=function(){var t=e(this),a=t.data(i),o=e("#mCSB_"+a.idx),n=e("#mCSB_"+a.idx+"_container"),r=[e("#mCSB_"+a.idx+"_dragger_vertical"),e("#mCSB_"+a.idx+"_dragger_horizontal")],l=[n.outerHeight(!1)-o.height(),n.outerWidth(!1)-o.width()],s=[l[0]/(r[0].parent().height()-r[0].height()),l[1]/(r[1].parent().width()-r[1].width())];a.scrollRatio={y:s[0],x:s[1]}},T=function(e,t,a){var o=a?f[0]+"_expanded":"",n=e.closest(".mCSB_scrollTools");"active"===t?(e.toggleClass(f[0]+" "+o),n.toggleClass(f[1]),e[0]._draggable=e[0]._draggable?0:1):e[0]._draggable||("hide"===t?(e.removeClass(f[0]),n.removeClass(f[1])):(e.addClass(f[0]),n.addClass(f[1])))},k=function(){var t=e(this),a=t.data(i),o=e("#mCSB_"+a.idx),n=e("#mCSB_"+a.idx+"_container"),r=null==a.overflowed?n.height():n.outerHeight(!1),l=null==a.overflowed?n.width():n.outerWidth(!1);return[r>o.height(),l>o.width()]},M=function(){var t=e(this),a=t.data(i),o=a.opt,n=e("#mCSB_"+a.idx),r=e("#mCSB_"+a.idx+"_container"),l=[e("#mCSB_"+a.idx+"_dragger_vertical"),e("#mCSB_"+a.idx+"_dragger_horizontal")];if(Q(t),("x"!==o.axis&&!a.overflowed[0]||"y"===o.axis&&a.overflowed[0])&&(l[0].add(r).css("top",0),G(t,"_resetY")),"y"!==o.axis&&!a.overflowed[1]||"x"===o.axis&&a.overflowed[1]){var s=dx=0;"rtl"===a.langDir&&(s=n.width()-r.outerWidth(!1),dx=Math.abs(s/a.scrollRatio.x)),r.css("left",s),l[1].css("left",dx),G(t,"_resetX")}},O=function(){function t(){r=setTimeout(function(){e.event.special.mousewheel?(clearTimeout(r),A.call(a[0])):t()},100)}var a=e(this),o=a.data(i),n=o.opt;if(!o.bindEvents){if(D.call(this),n.contentTouchScroll&&L.call(this),W.call(this),n.mouseWheel.enable){var r;t()}z.call(this),U.call(this),n.advanced.autoScrollOnFocus&&H.call(this),n.scrollButtons.enable&&F.call(this),n.keyboard.enable&&q.call(this),o.bindEvents=!0}},I=function(){var t=e(this),o=t.data(i),n=o.opt,r=i+"_"+o.idx,l=".mCSB_"+o.idx+"_scrollbar",s=e("#mCSB_"+o.idx+",#mCSB_"+o.idx+"_container,#mCSB_"+o.idx+"_container_wrapper,"+l+" ."+f[12]+",#mCSB_"+o.idx+"_dragger_vertical,#mCSB_"+o.idx+"_dragger_horizontal,"+l+">a"),c=e("#mCSB_"+o.idx+"_container");n.advanced.releaseDraggableSelectors&&s.add(e(n.advanced.releaseDraggableSelectors)),o.bindEvents&&(e(a).unbind("."+r),s.each(function(){e(this).unbind("."+r)}),clearTimeout(t[0]._focusTimeout),$(t[0],"_focusTimeout"),clearTimeout(o.sequential.step),$(o.sequential,"step"),clearTimeout(c[0].onCompleteTimeout),$(c[0],"onCompleteTimeout"),o.bindEvents=!1)},R=function(t){var a=e(this),o=a.data(i),n=o.opt,r=e("#mCSB_"+o.idx+"_container_wrapper"),l=r.length?r:e("#mCSB_"+o.idx+"_container"),s=[e("#mCSB_"+o.idx+"_scrollbar_vertical"),e("#mCSB_"+o.idx+"_scrollbar_horizontal")],c=[s[0].find(".mCSB_dragger"),s[1].find(".mCSB_dragger")];"x"!==n.axis&&(o.overflowed[0]&&!t?(s[0].add(c[0]).add(s[0].children("a")).css("display","block"),l.removeClass(f[8]+" "+f[10])):(n.alwaysShowScrollbar?(2!==n.alwaysShowScrollbar&&c[0].css("display","none"),l.removeClass(f[10])):(s[0].css("display","none"),l.addClass(f[10])),l.addClass(f[8]))),"y"!==n.axis&&(o.overflowed[1]&&!t?(s[1].add(c[1]).add(s[1].children("a")).css("display","block"),l.removeClass(f[9]+" "+f[11])):(n.alwaysShowScrollbar?(2!==n.alwaysShowScrollbar&&c[1].css("display","none"),l.removeClass(f[11])):(s[1].css("display","none"),l.addClass(f[11])),l.addClass(f[9]))),o.overflowed[0]||o.overflowed[1]?a.removeClass(f[5]):a.addClass(f[5])},E=function(e){var t=e.type;switch(t){case"pointerdown":case"MSPointerDown":case"pointermove":case"MSPointerMove":case"pointerup":case"MSPointerUp":return[e.originalEvent.pageY,e.originalEvent.pageX,!1];case"touchstart":case"touchmove":case"touchend":var a=e.originalEvent.touches[0]||e.originalEvent.changedTouches[0],o=e.originalEvent.touches.length||e.originalEvent.changedTouches.length;return[a.pageY,a.pageX,o>1];default:return[e.pageY,e.pageX,!1]}},D=function(){function t(e){var t=p.find("iframe");if(t.length){var a=e?"auto":"none";t.css("pointer-events",a)}}function o(e,t,a,o){if(p[0].idleTimer=f.scrollInertia<233?250:0,n.attr("id")===m[1])var i="x",r=(n[0].offsetLeft-t+o)*c.scrollRatio.x;else var i="y",r=(n[0].offsetTop-e+a)*c.scrollRatio.y;G(s,r.toString(),{dir:i,drag:!0})}var n,r,l,s=e(this),c=s.data(i),f=c.opt,h=i+"_"+c.idx,m=["mCSB_"+c.idx+"_dragger_vertical","mCSB_"+c.idx+"_dragger_horizontal"],p=e("#mCSB_"+c.idx+"_container"),g=e("#"+m[0]+",#"+m[1]),v=f.advanced.releaseDraggableSelectors?g.add(e(f.advanced.releaseDraggableSelectors)):g;g.bind("mousedown."+h+" touchstart."+h+" pointerdown."+h+" MSPointerDown."+h,function(o){if(o.stopImmediatePropagation(),o.preventDefault(),et(o)){u=!0,d&&(a.onselectstart=function(){return!1}),t(!1),Q(s),n=e(this);var i=n.offset(),c=E(o)[0]-i.top,h=E(o)[1]-i.left,m=n.height()+i.top,p=n.width()+i.left;m>c&&c>0&&p>h&&h>0&&(r=c,l=h),T(n,"active",f.autoExpandScrollbar)}}).bind("touchmove."+h,function(e){e.stopImmediatePropagation(),e.preventDefault();var t=n.offset(),a=E(e)[0]-t.top,i=E(e)[1]-t.left;o(r,l,a,i)}),e(a).bind("mousemove."+h+" pointermove."+h+" MSPointerMove."+h,function(e){if(n){var t=n.offset(),a=E(e)[0]-t.top,i=E(e)[1]-t.left;if(r===a)return;o(r,l,a,i)}}).add(v).bind("mouseup."+h+" touchend."+h+" pointerup."+h+" MSPointerUp."+h,function(){n&&(T(n,"active",f.autoExpandScrollbar),n=null),u=!1,d&&(a.onselectstart=null),t(!0)})},L=function(){function t(e,t){var a=[1.5*t,2*t,t/1.5,t/2];return e>90?t>4?a[0]:a[3]:e>60?t>3?a[3]:a[2]:e>30?t>8?a[1]:t>6?a[0]:t>4?t:a[2]:t>8?t:a[3]}function a(e,t,a,o,n,i){e&&G(_,e.toString(),{dur:t,scrollEasing:a,dir:o,overwrite:n,drag:i})}var n,r,l,s,c,d,f,h,m,p,g,v,x,_=e(this),S=_.data(i),w=S.opt,b=i+"_"+S.idx,C=e("#mCSB_"+S.idx),y=e("#mCSB_"+S.idx+"_container"),B=[e("#mCSB_"+S.idx+"_dragger_vertical"),e("#mCSB_"+S.idx+"_dragger_horizontal")],T=[],k=[],M=0,O="yx"===w.axis?"none":"all",I=[];y.bind("touchstart."+b+" pointerdown."+b+" MSPointerDown."+b,function(e){if(!tt(e)||u||E(e)[2])return void(o=0);o=1,v=0,x=0;var t=y.offset();n=E(e)[0]-t.top,r=E(e)[1]-t.left,I=[E(e)[0],E(e)[1]]}).bind("touchmove."+b+" pointermove."+b+" MSPointerMove."+b,function(e){if(tt(e)&&!u&&!E(e)[2]&&(e.stopImmediatePropagation(),!x||v)){d=K();var t=C.offset(),o=E(e)[0]-t.top,i=E(e)[1]-t.left,l="mcsLinearOut";if(T.push(o),k.push(i),I[2]=Math.abs(E(e)[0]-I[0]),I[3]=Math.abs(E(e)[1]-I[1]),S.overflowed[0])var s=B[0].parent().height()-B[0].height(),c=n-o>0&&o-n>-(s*S.scrollRatio.y)&&(2*I[3]<I[2]||"yx"===w.axis);if(S.overflowed[1])var f=B[1].parent().width()-B[1].width(),h=r-i>0&&i-r>-(f*S.scrollRatio.x)&&(2*I[2]<I[3]||"yx"===w.axis);c||h?(e.preventDefault(),v=1):x=1,p="yx"===w.axis?[n-o,r-i]:"x"===w.axis?[null,r-i]:[n-o,null],y[0].idleTimer=250,S.overflowed[0]&&a(p[0],M,l,"y","all",!0),S.overflowed[1]&&a(p[1],M,l,"x",O,!0)}}),C.bind("touchstart."+b+" pointerdown."+b+" MSPointerDown."+b,function(e){if(!tt(e)||u||E(e)[2])return void(o=0);o=1,e.stopImmediatePropagation(),Q(_),c=K();var t=C.offset();l=E(e)[0]-t.top,s=E(e)[1]-t.left,T=[],k=[]}).bind("touchend."+b+" pointerup."+b+" MSPointerUp."+b,function(e){if(tt(e)&&!u&&!E(e)[2]){e.stopImmediatePropagation(),v=0,x=0,f=K();var o=C.offset(),n=E(e)[0]-o.top,i=E(e)[1]-o.left;if(!(f-d>30)){m=1e3/(f-c);var r="mcsEaseOut",_=2.5>m,b=_?[T[T.length-2],k[k.length-2]]:[0,0];h=_?[n-b[0],i-b[1]]:[n-l,i-s];var B=[Math.abs(h[0]),Math.abs(h[1])];m=_?[Math.abs(h[0]/4),Math.abs(h[1]/4)]:[m,m];var M=[Math.abs(y[0].offsetTop)-h[0]*t(B[0]/m[0],m[0]),Math.abs(y[0].offsetLeft)-h[1]*t(B[1]/m[1],m[1])];p="yx"===w.axis?[M[0],M[1]]:"x"===w.axis?[null,M[1]]:[M[0],null],g=[4*B[0]+w.scrollInertia,4*B[1]+w.scrollInertia];var I=parseInt(w.contentTouchScroll)||0;p[0]=B[0]>I?p[0]:0,p[1]=B[1]>I?p[1]:0,S.overflowed[0]&&a(p[0],g[0],r,"y",O,!1),S.overflowed[1]&&a(p[1],g[1],r,"x",O,!1)}}})},W=function(){function n(){return t.getSelection?t.getSelection().toString():a.selection&&"Control"!=a.selection.type?a.selection.createRange().text:0}function r(e,t,a){f.type=a&&l?"stepped":"stepless",f.scrollAmount=10,j(s,e,t,"mcsLinearOut",a?60:null)}var l,s=e(this),c=s.data(i),d=c.opt,f=c.sequential,h=i+"_"+c.idx,m=e("#mCSB_"+c.idx+"_container"),p=m.parent();m.bind("mousedown."+h,function(){o||l||(l=1,u=!0)}).add(a).bind("mousemove."+h,function(e){if(!o&&l&&n()){var t=m.offset(),a=E(e)[0]-t.top+m[0].offsetTop,i=E(e)[1]-t.left+m[0].offsetLeft;a>0&&a<p.height()&&i>0&&i<p.width()?f.step&&r("off",null,"stepped"):("x"!==d.axis&&c.overflowed[0]&&(0>a?r("on",38):a>p.height()&&r("on",40)),"y"!==d.axis&&c.overflowed[1]&&(0>i?r("on",37):i>p.width()&&r("on",39)))}}).bind("mouseup."+h,function(){o||(l&&(l=0,r("off",null)),u=!1)})},A=function(){function t(e){var t=null;try{var a=e.contentDocument||e.contentWindow.document;t=a.body.innerHTML}catch(o){}return null!==t}var a=e(this),o=a.data(i);if(o){var n=o.opt,r=i+"_"+o.idx,l=e("#mCSB_"+o.idx),s=[e("#mCSB_"+o.idx+"_dragger_vertical"),e("#mCSB_"+o.idx+"_dragger_horizontal")],c=e("#mCSB_"+o.idx+"_container").find("iframe"),u=l;c.length&&c.each(function(){var a=this;t(a)&&(u=u.add(e(a).contents().find("body")))}),u.bind("mousewheel."+r,function(t,i){if(Q(a),!P(a,t.target)){var r="auto"!==n.mouseWheel.deltaFactor?parseInt(n.mouseWheel.deltaFactor):d&&t.deltaFactor<100?100:t.deltaFactor||100;if("x"===n.axis||"x"===n.mouseWheel.axis)var c="x",u=[Math.round(r*o.scrollRatio.x),parseInt(n.mouseWheel.scrollAmount)],f="auto"!==n.mouseWheel.scrollAmount?u[1]:u[0]>=l.width()?.9*l.width():u[0],h=Math.abs(e("#mCSB_"+o.idx+"_container")[0].offsetLeft),m=s[1][0].offsetLeft,p=s[1].parent().width()-s[1].width(),g=t.deltaX||t.deltaY||i;else var c="y",u=[Math.round(r*o.scrollRatio.y),parseInt(n.mouseWheel.scrollAmount)],f="auto"!==n.mouseWheel.scrollAmount?u[1]:u[0]>=l.height()?.9*l.height():u[0],h=Math.abs(e("#mCSB_"+o.idx+"_container")[0].offsetTop),m=s[0][0].offsetTop,p=s[0].parent().height()-s[0].height(),g=t.deltaY||i;"y"===c&&!o.overflowed[0]||"x"===c&&!o.overflowed[1]||(n.mouseWheel.invert&&(g=-g),n.mouseWheel.normalizeDelta&&(g=0>g?-1:1),(g>0&&0!==m||0>g&&m!==p||n.mouseWheel.preventDefault)&&(t.stopImmediatePropagation(),t.preventDefault()),G(a,(h-g*f).toString(),{dir:c}))}})}},P=function(t,a){var o=a.nodeName.toLowerCase(),n=t.data(i).opt.mouseWheel.disableOver,r=["select","textarea"];return e.inArray(o,n)>-1&&!(e.inArray(o,r)>-1&&!e(a).is(":focus"))},z=function(){var t=e(this),a=t.data(i),o=i+"_"+a.idx,n=e("#mCSB_"+a.idx+"_container"),r=n.parent(),l=e(".mCSB_"+a.idx+"_scrollbar ."+f[12]);l.bind("touchstart."+o+" pointerdown."+o+" MSPointerDown."+o,function(){u=!0}).bind("touchend."+o+" pointerup."+o+" MSPointerUp."+o,function(){u=!1}).bind("click."+o,function(o){if(e(o.target).hasClass(f[12])||e(o.target).hasClass("mCSB_draggerRail")){Q(t);var i=e(this),l=i.find(".mCSB_dragger");if(i.parent(".mCSB_scrollTools_horizontal").length>0){if(!a.overflowed[1])return;var s="x",c=o.pageX>l.offset().left?-1:1,d=Math.abs(n[0].offsetLeft)-.9*c*r.width()}else{if(!a.overflowed[0])return;var s="y",c=o.pageY>l.offset().top?-1:1,d=Math.abs(n[0].offsetTop)-.9*c*r.height()}G(t,d.toString(),{dir:s,scrollEasing:"mcsEaseInOut"})}})},H=function(){var t=e(this),o=t.data(i),n=o.opt,r=i+"_"+o.idx,l=e("#mCSB_"+o.idx+"_container"),s=l.parent();l.bind("focusin."+r,function(){var o=e(a.activeElement),i=l.find(".mCustomScrollBox").length,r=0;o.is(n.advanced.autoScrollOnFocus)&&(Q(t),clearTimeout(t[0]._focusTimeout),t[0]._focusTimer=i?(r+17)*i:0,t[0]._focusTimeout=setTimeout(function(){var e=[ot(o)[0],ot(o)[1]],a=[l[0].offsetTop,l[0].offsetLeft],i=[a[0]+e[0]>=0&&a[0]+e[0]<s.height()-o.outerHeight(!1),a[1]+e[1]>=0&&a[0]+e[1]<s.width()-o.outerWidth(!1)],c="yx"!==n.axis||i[0]||i[1]?"all":"none";"x"===n.axis||i[0]||G(t,e[0].toString(),{dir:"y",scrollEasing:"mcsEaseInOut",overwrite:c,dur:r}),"y"===n.axis||i[1]||G(t,e[1].toString(),{dir:"x",scrollEasing:"mcsEaseInOut",overwrite:c,dur:r})},t[0]._focusTimer))})},U=function(){var t=e(this),a=t.data(i),o=i+"_"+a.idx,n=e("#mCSB_"+a.idx+"_container").parent();n.bind("scroll."+o,function(){(0!==n.scrollTop()||0!==n.scrollLeft())&&e(".mCSB_"+a.idx+"_scrollbar").css("visibility","hidden")})},F=function(){var t=e(this),a=t.data(i),o=a.opt,n=a.sequential,r=i+"_"+a.idx,l=".mCSB_"+a.idx+"_scrollbar",s=e(l+">a");s.bind("mousedown."+r+" touchstart."+r+" pointerdown."+r+" MSPointerDown."+r+" mouseup."+r+" touchend."+r+" pointerup."+r+" MSPointerUp."+r+" mouseout."+r+" pointerout."+r+" MSPointerOut."+r+" click."+r,function(i){function r(e,a){n.scrollAmount=o.snapAmount||o.scrollButtons.scrollAmount,j(t,e,a)}if(i.preventDefault(),et(i)){var l=e(this).attr("class");switch(n.type=o.scrollButtons.scrollType,i.type){case"mousedown":case"touchstart":case"pointerdown":case"MSPointerDown":if("stepped"===n.type)return;u=!0,a.tweenRunning=!1,r("on",l);break;case"mouseup":case"touchend":case"pointerup":case"MSPointerUp":case"mouseout":case"pointerout":case"MSPointerOut":if("stepped"===n.type)return;u=!1,n.dir&&r("off",l);break;case"click":if("stepped"!==n.type||a.tweenRunning)return;r("on",l)}}})},q=function(){var t=e(this),o=t.data(i),n=o.opt,r=o.sequential,l=i+"_"+o.idx,s=e("#mCSB_"+o.idx),c=e("#mCSB_"+o.idx+"_container"),d=c.parent(),u="input,textarea,select,datalist,keygen,[contenteditable='true']";s.attr("tabindex","0").bind("blur."+l+" keydown."+l+" keyup."+l,function(i){function l(e,a){r.type=n.keyboard.scrollType,r.scrollAmount=n.snapAmount||n.keyboard.scrollAmount,"stepped"===r.type&&o.tweenRunning||j(t,e,a)}switch(i.type){case"blur":o.tweenRunning&&r.dir&&l("off",null);break;case"keydown":case"keyup":var s=i.keyCode?i.keyCode:i.which,f="on";if("x"!==n.axis&&(38===s||40===s)||"y"!==n.axis&&(37===s||39===s)){if((38===s||40===s)&&!o.overflowed[0]||(37===s||39===s)&&!o.overflowed[1])return;"keyup"===i.type&&(f="off"),e(a.activeElement).is(u)||(i.preventDefault(),i.stopImmediatePropagation(),l(f,s))}else if(33===s||34===s){if((o.overflowed[0]||o.overflowed[1])&&(i.preventDefault(),i.stopImmediatePropagation()),"keyup"===i.type){Q(t);var h=34===s?-1:1;if("x"===n.axis||"yx"===n.axis&&o.overflowed[1]&&!o.overflowed[0])var m="x",p=Math.abs(c[0].offsetLeft)-.9*h*d.width();else var m="y",p=Math.abs(c[0].offsetTop)-.9*h*d.height();G(t,p.toString(),{dir:m,scrollEasing:"mcsEaseInOut"})}}else if((35===s||36===s)&&!e(a.activeElement).is(u)&&((o.overflowed[0]||o.overflowed[1])&&(i.preventDefault(),i.stopImmediatePropagation()),"keyup"===i.type)){if("x"===n.axis||"yx"===n.axis&&o.overflowed[1]&&!o.overflowed[0])var m="x",p=35===s?Math.abs(d.width()-c.outerWidth(!1)):0;else var m="y",p=35===s?Math.abs(d.height()-c.outerHeight(!1)):0;G(t,p.toString(),{dir:m,scrollEasing:"mcsEaseInOut"})}}})},j=function(t,a,o,n,r){function l(e){var a="stepped"!==u.type,o=r?r:e?a?p/1.5:g:1e3/60,i=e?a?7.5:40:2.5,s=[Math.abs(h[0].offsetTop),Math.abs(h[0].offsetLeft)],d=[c.scrollRatio.y>10?10:c.scrollRatio.y,c.scrollRatio.x>10?10:c.scrollRatio.x],f="x"===u.dir[0]?s[1]+u.dir[1]*d[1]*i:s[0]+u.dir[1]*d[0]*i,m="x"===u.dir[0]?s[1]+u.dir[1]*parseInt(u.scrollAmount):s[0]+u.dir[1]*parseInt(u.scrollAmount),v="auto"!==u.scrollAmount?m:f,x=n?n:e?a?"mcsLinearOut":"mcsEaseInOut":"mcsLinear",_=e?!0:!1;return e&&17>o&&(v="x"===u.dir[0]?s[1]:s[0]),G(t,v.toString(),{dir:u.dir[0],scrollEasing:x,dur:o,onComplete:_}),e?void(u.dir=!1):(clearTimeout(u.step),void(u.step=setTimeout(function(){l()},o)))}function s(){clearTimeout(u.step),$(u,"step"),Q(t)}var c=t.data(i),d=c.opt,u=c.sequential,h=e("#mCSB_"+c.idx+"_container"),m="stepped"===u.type?!0:!1,p=d.scrollInertia<26?26:d.scrollInertia,g=d.scrollInertia<1?17:d.scrollInertia;switch(a){case"on":if(u.dir=[o===f[16]||o===f[15]||39===o||37===o?"x":"y",o===f[13]||o===f[15]||38===o||37===o?-1:1],Q(t),at(o)&&"stepped"===u.type)return;l(m);break;case"off":s(),(m||c.tweenRunning&&u.dir)&&l(!0)}},Y=function(t){var a=e(this).data(i).opt,o=[];return"function"==typeof t&&(t=t()),t instanceof Array?o=t.length>1?[t[0],t[1]]:"x"===a.axis?[null,t[0]]:[t[0],null]:(o[0]=t.y?t.y:t.x||"x"===a.axis?null:t,o[1]=t.x?t.x:t.y||"y"===a.axis?null:t),"function"==typeof o[0]&&(o[0]=o[0]()),"function"==typeof o[1]&&(o[1]=o[1]()),o},X=function(t,a){if(null!=t&&"undefined"!=typeof t){var o=e(this),n=o.data(i),r=n.opt,l=e("#mCSB_"+n.idx+"_container"),s=l.parent(),c=typeof t;a||(a="x"===r.axis?"x":"y");var d="x"===a?l.outerWidth(!1):l.outerHeight(!1),u="x"===a?l[0].offsetLeft:l[0].offsetTop,f="x"===a?"left":"top";switch(c){case"function":return t();case"object":var m=t.jquery?t:e(t);if(!m.length)return;return"x"===a?ot(m)[1]:ot(m)[0];case"string":case"number":if(at(t))return Math.abs(t);if(-1!==t.indexOf("%"))return Math.abs(d*parseInt(t)/100);if(-1!==t.indexOf("-="))return Math.abs(u-parseInt(t.split("-=")[1]));if(-1!==t.indexOf("+=")){var p=u+parseInt(t.split("+=")[1]);return p>=0?0:Math.abs(p)}if(-1!==t.indexOf("px")&&at(t.split("px")[0]))return Math.abs(t.split("px")[0]);if("top"===t||"left"===t)return 0;if("bottom"===t)return Math.abs(s.height()-l.outerHeight(!1));if("right"===t)return Math.abs(s.width()-l.outerWidth(!1));if("first"===t||"last"===t){var m=l.find(":"+t);return"x"===a?ot(m)[1]:ot(m)[0]}return e(t).length?"x"===a?ot(e(t))[1]:ot(e(t))[0]:(l.css(f,t),void h.update.call(null,o[0]))}}},N=function(t){function a(){clearTimeout(u[0].autoUpdate),u[0].autoUpdate=setTimeout(function(){return d.advanced.updateOnSelectorChange&&(m=r(),m!==S)?(l(3),void(S=m)):(d.advanced.updateOnContentResize&&(p=[u.outerHeight(!1),u.outerWidth(!1),v.height(),v.width(),_()[0],_()[1]],(p[0]!==w[0]||p[1]!==w[1]||p[2]!==w[2]||p[3]!==w[3]||p[4]!==w[4]||p[5]!==w[5])&&(l(p[0]!==w[0]||p[1]!==w[1]),w=p)),d.advanced.updateOnImageLoad&&(g=o(),g!==b&&(u.find("img").each(function(){n(this)}),b=g)),void((d.advanced.updateOnSelectorChange||d.advanced.updateOnContentResize||d.advanced.updateOnImageLoad)&&a()))},60)}function o(){var e=0;return d.advanced.updateOnImageLoad&&(e=u.find("img").length),e}function n(t){function a(e,t){return function(){return t.apply(e,arguments)}}function o(){this.onload=null,e(t).addClass(f[2]),l(2)}if(e(t).hasClass(f[2]))return void l();var n=new Image;n.onload=a(n,o),n.src=t.src}function r(){d.advanced.updateOnSelectorChange===!0&&(d.advanced.updateOnSelectorChange="*");var t=0,a=u.find(d.advanced.updateOnSelectorChange);return d.advanced.updateOnSelectorChange&&a.length>0&&a.each(function(){t+=e(this).height()+e(this).width()}),t}function l(e){clearTimeout(u[0].autoUpdate),h.update.call(null,s[0],e)}var s=e(this),c=s.data(i),d=c.opt,u=e("#mCSB_"+c.idx+"_container");if(t)return clearTimeout(u[0].autoUpdate),void $(u[0],"autoUpdate");var m,p,g,v=u.parent(),x=[e("#mCSB_"+c.idx+"_scrollbar_vertical"),e("#mCSB_"+c.idx+"_scrollbar_horizontal")],_=function(){return[x[0].is(":visible")?x[0].outerHeight(!0):0,x[1].is(":visible")?x[1].outerWidth(!0):0]},S=r(),w=[u.outerHeight(!1),u.outerWidth(!1),v.height(),v.width(),_()[0],_()[1]],b=o();a()},V=function(e,t,a){return Math.round(e/t)*t-a},Q=function(t){var a=t.data(i),o=e("#mCSB_"+a.idx+"_container,#mCSB_"+a.idx+"_container_wrapper,#mCSB_"+a.idx+"_dragger_vertical,#mCSB_"+a.idx+"_dragger_horizontal");o.each(function(){Z.call(this)})},G=function(t,a,o){function n(e){return s&&c.callbacks[e]&&"function"==typeof c.callbacks[e]}function r(){return[c.callbacks.alwaysTriggerOffsets||_>=S[0]+b,c.callbacks.alwaysTriggerOffsets||-C>=_]}function l(){var e=[h[0].offsetTop,h[0].offsetLeft],a=[v[0].offsetTop,v[0].offsetLeft],n=[h.outerHeight(!1),h.outerWidth(!1)],i=[f.height(),f.width()];t[0].mcs={content:h,top:e[0],left:e[1],draggerTop:a[0],draggerLeft:a[1],topPct:Math.round(100*Math.abs(e[0])/(Math.abs(n[0])-i[0])),leftPct:Math.round(100*Math.abs(e[1])/(Math.abs(n[1])-i[1])),direction:o.dir}}var s=t.data(i),c=s.opt,d={trigger:"internal",dir:"y",scrollEasing:"mcsEaseOut",drag:!1,dur:c.scrollInertia,overwrite:"all",callbacks:!0,onStart:!0,onUpdate:!0,onComplete:!0},o=e.extend(d,o),u=[o.dur,o.drag?0:o.dur],f=e("#mCSB_"+s.idx),h=e("#mCSB_"+s.idx+"_container"),m=h.parent(),p=c.callbacks.onTotalScrollOffset?Y.call(t,c.callbacks.onTotalScrollOffset):[0,0],g=c.callbacks.onTotalScrollBackOffset?Y.call(t,c.callbacks.onTotalScrollBackOffset):[0,0];if(s.trigger=o.trigger,(0!==m.scrollTop()||0!==m.scrollLeft())&&(e(".mCSB_"+s.idx+"_scrollbar").css("visibility","visible"),m.scrollTop(0).scrollLeft(0)),"_resetY"!==a||s.contentReset.y||(n("onOverflowYNone")&&c.callbacks.onOverflowYNone.call(t[0]),s.contentReset.y=1),"_resetX"!==a||s.contentReset.x||(n("onOverflowXNone")&&c.callbacks.onOverflowXNone.call(t[0]),s.contentReset.x=1),"_resetY"!==a&&"_resetX"!==a){switch(!s.contentReset.y&&t[0].mcs||!s.overflowed[0]||(n("onOverflowY")&&c.callbacks.onOverflowY.call(t[0]),s.contentReset.x=null),!s.contentReset.x&&t[0].mcs||!s.overflowed[1]||(n("onOverflowX")&&c.callbacks.onOverflowX.call(t[0]),s.contentReset.x=null),c.snapAmount&&(a=V(a,c.snapAmount,c.snapOffset)),o.dir){case"x":var v=e("#mCSB_"+s.idx+"_dragger_horizontal"),x="left",_=h[0].offsetLeft,S=[f.width()-h.outerWidth(!1),v.parent().width()-v.width()],w=[a,0===a?0:a/s.scrollRatio.x],b=p[1],C=g[1],y=b>0?b/s.scrollRatio.x:0,B=C>0?C/s.scrollRatio.x:0;
break;case"y":var v=e("#mCSB_"+s.idx+"_dragger_vertical"),x="top",_=h[0].offsetTop,S=[f.height()-h.outerHeight(!1),v.parent().height()-v.height()],w=[a,0===a?0:a/s.scrollRatio.y],b=p[0],C=g[0],y=b>0?b/s.scrollRatio.y:0,B=C>0?C/s.scrollRatio.y:0}w[1]<0||0===w[0]&&0===w[1]?w=[0,0]:w[1]>=S[1]?w=[S[0],S[1]]:w[0]=-w[0],t[0].mcs||(l(),n("onInit")&&c.callbacks.onInit.call(t[0])),clearTimeout(h[0].onCompleteTimeout),(s.tweenRunning||!(0===_&&w[0]>=0||_===S[0]&&w[0]<=S[0]))&&(J(v[0],x,Math.round(w[1]),u[1],o.scrollEasing),J(h[0],x,Math.round(w[0]),u[0],o.scrollEasing,o.overwrite,{onStart:function(){o.callbacks&&o.onStart&&!s.tweenRunning&&(n("onScrollStart")&&(l(),c.callbacks.onScrollStart.call(t[0])),s.tweenRunning=!0,T(v),s.cbOffsets=r())},onUpdate:function(){o.callbacks&&o.onUpdate&&n("whileScrolling")&&(l(),c.callbacks.whileScrolling.call(t[0]))},onComplete:function(){if(o.callbacks&&o.onComplete){"yx"===c.axis&&clearTimeout(h[0].onCompleteTimeout);var e=h[0].idleTimer||0;h[0].onCompleteTimeout=setTimeout(function(){n("onScroll")&&(l(),c.callbacks.onScroll.call(t[0])),n("onTotalScroll")&&w[1]>=S[1]-y&&s.cbOffsets[0]&&(l(),c.callbacks.onTotalScroll.call(t[0])),n("onTotalScrollBack")&&w[1]<=B&&s.cbOffsets[1]&&(l(),c.callbacks.onTotalScrollBack.call(t[0])),s.tweenRunning=!1,h[0].idleTimer=0,T(v,"hide")},e)}}}))}},J=function(e,a,o,n,i,r,l){function s(){b.stop||(_||p.call(),_=K()-x,c(),_>=b.time&&(b.time=_>b.time?_+h-(_-b.time):_+h-1,b.time<_+1&&(b.time=_+1)),b.time<n?b.id=m(s):v.call())}function c(){n>0?(b.currVal=f(b.time,S,C,n,i),w[a]=Math.round(b.currVal)+"px"):w[a]=o+"px",g.call()}function d(){h=1e3/60,b.time=_+h,m=t.requestAnimationFrame?t.requestAnimationFrame:function(e){return c(),setTimeout(e,.01)},b.id=m(s)}function u(){null!=b.id&&(t.requestAnimationFrame?t.cancelAnimationFrame(b.id):clearTimeout(b.id),b.id=null)}function f(e,t,a,o,n){switch(n){case"linear":case"mcsLinear":return a*e/o+t;case"mcsLinearOut":return e/=o,e--,a*Math.sqrt(1-e*e)+t;case"easeInOutSmooth":return e/=o/2,1>e?a/2*e*e+t:(e--,-a/2*(e*(e-2)-1)+t);case"easeInOutStrong":return e/=o/2,1>e?a/2*Math.pow(2,10*(e-1))+t:(e--,a/2*(-Math.pow(2,-10*e)+2)+t);case"easeInOut":case"mcsEaseInOut":return e/=o/2,1>e?a/2*e*e*e+t:(e-=2,a/2*(e*e*e+2)+t);case"easeOutSmooth":return e/=o,e--,-a*(e*e*e*e-1)+t;case"easeOutStrong":return a*(-Math.pow(2,-10*e/o)+1)+t;case"easeOut":case"mcsEaseOut":default:var i=(e/=o)*e,r=i*e;return t+a*(.499999999999997*r*i+-2.5*i*i+5.5*r+-6.5*i+4*e)}}e._mTween||(e._mTween={top:{},left:{}});var h,m,l=l||{},p=l.onStart||function(){},g=l.onUpdate||function(){},v=l.onComplete||function(){},x=K(),_=0,S=e.offsetTop,w=e.style,b=e._mTween[a];"left"===a&&(S=e.offsetLeft);var C=o-S;b.stop=0,"none"!==r&&u(),d()},K=function(){return t.performance&&t.performance.now?t.performance.now():t.performance&&t.performance.webkitNow?t.performance.webkitNow():Date.now?Date.now():(new Date).getTime()},Z=function(){var e=this;e._mTween||(e._mTween={top:{},left:{}});for(var a=["top","left"],o=0;o<a.length;o++){var n=a[o];e._mTween[n].id&&(t.requestAnimationFrame?t.cancelAnimationFrame(e._mTween[n].id):clearTimeout(e._mTween[n].id),e._mTween[n].id=null,e._mTween[n].stop=1)}},$=function(e,t){try{delete e[t]}catch(a){e[t]=null}},et=function(e){return!(e.which&&1!==e.which)},tt=function(e){var t=e.originalEvent.pointerType;return!(t&&"touch"!==t&&2!==t)},at=function(e){return!isNaN(parseFloat(e))&&isFinite(e)},ot=function(e){var t=e.parents(".mCSB_container");return[e.offset().top-t.offset().top,e.offset().left-t.offset().left]};e.fn[n]=function(t){return h[t]?h[t].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof t&&t?void e.error("Method "+t+" does not exist"):h.init.apply(this,arguments)},e[n]=function(t){return h[t]?h[t].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof t&&t?void e.error("Method "+t+" does not exist"):h.init.apply(this,arguments)},e[n].defaults=l,t[n]=!0,e(t).load(function(){e(r)[n](),e.extend(e.expr[":"],{mcsInView:e.expr[":"].mcsInView||function(t){var a,o,n=e(t),i=n.parents(".mCSB_container");if(i.length)return a=i.parent(),o=[i[0].offsetTop,i[0].offsetLeft],o[0]+ot(n)[0]>=0&&o[0]+ot(n)[0]<a.height()-n.outerHeight(!1)&&o[1]+ot(n)[1]>=0&&o[1]+ot(n)[1]<a.width()-n.outerWidth(!1)},mcsOverflow:e.expr[":"].mcsOverflow||function(t){var a=e(t).data(i);if(a)return a.overflowed[0]||a.overflowed[1]}})})})}(jQuery,window,document);

/* Tooltipster v3.3.0 */;(function(e,t,n){function s(t,n){this.bodyOverflowX;this.callbacks={hide:[],show:[]};this.checkInterval=null;this.Content;this.$el=e(t);this.$elProxy;this.elProxyPosition;this.enabled=true;this.options=e.extend({},i,n);this.mouseIsOverProxy=false;this.namespace="tooltipster-"+Math.round(Math.random()*1e5);this.Status="hidden";this.timerHide=null;this.timerShow=null;this.$tooltip;this.options.iconTheme=this.options.iconTheme.replace(".","");this.options.theme=this.options.theme.replace(".","");this._init()}function o(t,n){var r=true;e.each(t,function(e,i){if(typeof n[e]==="undefined"||t[e]!==n[e]){r=false;return false}});return r}function f(){return!a&&u}function l(){var e=n.body||n.documentElement,t=e.style,r="transition";if(typeof t[r]=="string"){return true}v=["Moz","Webkit","Khtml","O","ms"],r=r.charAt(0).toUpperCase()+r.substr(1);for(var i=0;i<v.length;i++){if(typeof t[v[i]+r]=="string"){return true}}return false}var r="tooltipster",i={animation:"fade",arrow:true,arrowColor:"",autoClose:true,content:null,contentAsHTML:false,contentCloning:true,debug:true,delay:200,minWidth:0,maxWidth:null,functionInit:function(e,t){},functionBefore:function(e,t){t()},functionReady:function(e,t){},functionAfter:function(e){},hideOnClick:false,icon:"(?)",iconCloning:true,iconDesktop:false,iconTouch:false,iconTheme:"tooltipster-icon",interactive:false,interactiveTolerance:350,multiple:false,offsetX:0,offsetY:0,onlyOne:false,position:"top",positionTracker:false,positionTrackerCallback:function(e){if(this.option("trigger")=="hover"&&this.option("autoClose")){this.hide()}},restoration:"current",speed:350,timer:0,theme:"tooltipster-default",touchDevices:true,trigger:"hover",updateAnimation:true};s.prototype={_init:function(){var t=this;if(n.querySelector){var r=null;if(t.$el.data("tooltipster-initialTitle")===undefined){r=t.$el.attr("title");if(r===undefined)r=null;t.$el.data("tooltipster-initialTitle",r)}if(t.options.content!==null){t._content_set(t.options.content)}else{t._content_set(r)}var i=t.options.functionInit.call(t.$el,t.$el,t.Content);if(typeof i!=="undefined")t._content_set(i);t.$el.removeAttr("title").addClass("tooltipstered");if(!u&&t.options.iconDesktop||u&&t.options.iconTouch){if(typeof t.options.icon==="string"){t.$elProxy=e('<span class="'+t.options.iconTheme+'"></span>');t.$elProxy.text(t.options.icon)}else{if(t.options.iconCloning)t.$elProxy=t.options.icon.clone(true);else t.$elProxy=t.options.icon}t.$elProxy.insertAfter(t.$el)}else{t.$elProxy=t.$el}if(t.options.trigger=="hover"){t.$elProxy.on("mouseenter."+t.namespace,function(){if(!f()||t.options.touchDevices){t.mouseIsOverProxy=true;t._show()}}).on("mouseleave."+t.namespace,function(){if(!f()||t.options.touchDevices){t.mouseIsOverProxy=false}});if(u&&t.options.touchDevices){t.$elProxy.on("touchstart."+t.namespace,function(){t._showNow()})}}else if(t.options.trigger=="click"){t.$elProxy.on("click."+t.namespace,function(){if(!f()||t.options.touchDevices){t._show()}})}}},_show:function(){var e=this;if(e.Status!="shown"&&e.Status!="appearing"){if(e.options.delay){e.timerShow=setTimeout(function(){if(e.options.trigger=="click"||e.options.trigger=="hover"&&e.mouseIsOverProxy){e._showNow()}},e.options.delay)}else e._showNow()}},_showNow:function(n){var r=this;r.options.functionBefore.call(r.$el,r.$el,function(){if(r.enabled&&r.Content!==null){if(n)r.callbacks.show.push(n);r.callbacks.hide=[];clearTimeout(r.timerShow);r.timerShow=null;clearTimeout(r.timerHide);r.timerHide=null;if(r.options.onlyOne){e(".tooltipstered").not(r.$el).each(function(t,n){var r=e(n),i=r.data("tooltipster-ns");e.each(i,function(e,t){var n=r.data(t),i=n.status(),s=n.option("autoClose");if(i!=="hidden"&&i!=="disappearing"&&s){n.hide()}})})}var i=function(){r.Status="shown";e.each(r.callbacks.show,function(e,t){t.call(r.$el)});r.callbacks.show=[]};if(r.Status!=="hidden"){var s=0;if(r.Status==="disappearing"){r.Status="appearing";if(l()){r.$tooltip.clearQueue().removeClass("tooltipster-dying").addClass("tooltipster-"+r.options.animation+"-show");if(r.options.speed>0)r.$tooltip.delay(r.options.speed);r.$tooltip.queue(i)}else{r.$tooltip.stop().fadeIn(i)}}else if(r.Status==="shown"){i()}}else{r.Status="appearing";var s=r.options.speed;r.bodyOverflowX=e("body").css("overflow-x");e("body").css("overflow-x","hidden");var o="tooltipster-"+r.options.animation,a="-webkit-transition-duration: "+r.options.speed+"ms; -webkit-animation-duration: "+r.options.speed+"ms; -moz-transition-duration: "+r.options.speed+"ms; -moz-animation-duration: "+r.options.speed+"ms; -o-transition-duration: "+r.options.speed+"ms; -o-animation-duration: "+r.options.speed+"ms; -ms-transition-duration: "+r.options.speed+"ms; -ms-animation-duration: "+r.options.speed+"ms; transition-duration: "+r.options.speed+"ms; animation-duration: "+r.options.speed+"ms;",f=r.options.minWidth?"min-width:"+Math.round(r.options.minWidth)+"px;":"",c=r.options.maxWidth?"max-width:"+Math.round(r.options.maxWidth)+"px;":"",h=r.options.interactive?"pointer-events: auto;":"";r.$tooltip=e('<div class="tooltipster-base '+r.options.theme+'" style="'+f+" "+c+" "+h+" "+a+'"><div class="tooltipster-content"></div></div>');if(l())r.$tooltip.addClass(o);r._content_insert();r.$tooltip.appendTo("body");r.reposition();r.options.functionReady.call(r.$el,r.$el,r.$tooltip);if(l()){r.$tooltip.addClass(o+"-show");if(r.options.speed>0)r.$tooltip.delay(r.options.speed);r.$tooltip.queue(i)}else{r.$tooltip.css("display","none").fadeIn(r.options.speed,i)}r._interval_set();e(t).on("scroll."+r.namespace+" resize."+r.namespace,function(){r.reposition()});if(r.options.autoClose){e("body").off("."+r.namespace);if(r.options.trigger=="hover"){if(u){setTimeout(function(){e("body").on("touchstart."+r.namespace,function(){r.hide()})},0)}if(r.options.interactive){if(u){r.$tooltip.on("touchstart."+r.namespace,function(e){e.stopPropagation()})}var p=null;r.$elProxy.add(r.$tooltip).on("mouseleave."+r.namespace+"-autoClose",function(){clearTimeout(p);p=setTimeout(function(){r.hide()},r.options.interactiveTolerance)}).on("mouseenter."+r.namespace+"-autoClose",function(){clearTimeout(p)})}else{r.$elProxy.on("mouseleave."+r.namespace+"-autoClose",function(){r.hide()})}if(r.options.hideOnClick){r.$elProxy.on("click."+r.namespace+"-autoClose",function(){r.hide()})}}else if(r.options.trigger=="click"){setTimeout(function(){e("body").on("click."+r.namespace+" touchstart."+r.namespace,function(){r.hide()})},0);if(r.options.interactive){r.$tooltip.on("click."+r.namespace+" touchstart."+r.namespace,function(e){e.stopPropagation()})}}}}if(r.options.timer>0){r.timerHide=setTimeout(function(){r.timerHide=null;r.hide()},r.options.timer+s)}}})},_interval_set:function(){var t=this;t.checkInterval=setInterval(function(){if(e("body").find(t.$el).length===0||e("body").find(t.$elProxy).length===0||t.Status=="hidden"||e("body").find(t.$tooltip).length===0){if(t.Status=="shown"||t.Status=="appearing")t.hide();t._interval_cancel()}else{if(t.options.positionTracker){var n=t._repositionInfo(t.$elProxy),r=false;if(o(n.dimension,t.elProxyPosition.dimension)){if(t.$elProxy.css("position")==="fixed"){if(o(n.position,t.elProxyPosition.position))r=true}else{if(o(n.offset,t.elProxyPosition.offset))r=true}}if(!r){t.reposition();t.options.positionTrackerCallback.call(t,t.$el)}}}},200)},_interval_cancel:function(){clearInterval(this.checkInterval);this.checkInterval=null},_content_set:function(e){if(typeof e==="object"&&e!==null&&this.options.contentCloning){e=e.clone(true)}this.Content=e},_content_insert:function(){var e=this,t=this.$tooltip.find(".tooltipster-content");if(typeof e.Content==="string"&&!e.options.contentAsHTML){t.text(e.Content)}else{t.empty().append(e.Content)}},_update:function(e){var t=this;t._content_set(e);if(t.Content!==null){if(t.Status!=="hidden"){t._content_insert();t.reposition();if(t.options.updateAnimation){if(l()){t.$tooltip.css({width:"","-webkit-transition":"all "+t.options.speed+"ms, width 0ms, height 0ms, left 0ms, top 0ms","-moz-transition":"all "+t.options.speed+"ms, width 0ms, height 0ms, left 0ms, top 0ms","-o-transition":"all "+t.options.speed+"ms, width 0ms, height 0ms, left 0ms, top 0ms","-ms-transition":"all "+t.options.speed+"ms, width 0ms, height 0ms, left 0ms, top 0ms",transition:"all "+t.options.speed+"ms, width 0ms, height 0ms, left 0ms, top 0ms"}).addClass("tooltipster-content-changing");setTimeout(function(){if(t.Status!="hidden"){t.$tooltip.removeClass("tooltipster-content-changing");setTimeout(function(){if(t.Status!=="hidden"){t.$tooltip.css({"-webkit-transition":t.options.speed+"ms","-moz-transition":t.options.speed+"ms","-o-transition":t.options.speed+"ms","-ms-transition":t.options.speed+"ms",transition:t.options.speed+"ms"})}},t.options.speed)}},t.options.speed)}else{t.$tooltip.fadeTo(t.options.speed,.5,function(){if(t.Status!="hidden"){t.$tooltip.fadeTo(t.options.speed,1)}})}}}}else{t.hide()}},_repositionInfo:function(e){return{dimension:{height:e.outerHeight(false),width:e.outerWidth(false)},offset:e.offset(),position:{left:parseInt(e.css("left")),top:parseInt(e.css("top"))}}},hide:function(n){var r=this;if(n)r.callbacks.hide.push(n);r.callbacks.show=[];clearTimeout(r.timerShow);r.timerShow=null;clearTimeout(r.timerHide);r.timerHide=null;var i=function(){e.each(r.callbacks.hide,function(e,t){t.call(r.$el)});r.callbacks.hide=[]};if(r.Status=="shown"||r.Status=="appearing"){r.Status="disappearing";var s=function(){r.Status="hidden";if(typeof r.Content=="object"&&r.Content!==null){r.Content.detach()}r.$tooltip.remove();r.$tooltip=null;e(t).off("."+r.namespace);e("body").off("."+r.namespace).css("overflow-x",r.bodyOverflowX);e("body").off("."+r.namespace);r.$elProxy.off("."+r.namespace+"-autoClose");r.options.functionAfter.call(r.$el,r.$el);i()};if(l()){r.$tooltip.clearQueue().removeClass("tooltipster-"+r.options.animation+"-show").addClass("tooltipster-dying");if(r.options.speed>0)r.$tooltip.delay(r.options.speed);r.$tooltip.queue(s)}else{r.$tooltip.stop().fadeOut(r.options.speed,s)}}else if(r.Status=="hidden"){i()}return r},show:function(e){this._showNow(e);return this},update:function(e){return this.content(e)},content:function(e){if(typeof e==="undefined"){return this.Content}else{this._update(e);return this}},reposition:function(){var n=this;if(e("body").find(n.$tooltip).length!==0){n.$tooltip.css("width","");n.elProxyPosition=n._repositionInfo(n.$elProxy);var r=null,i=e(t).width(),s=n.elProxyPosition,o=n.$tooltip.outerWidth(false),u=n.$tooltip.innerWidth()+1,a=n.$tooltip.outerHeight(false);if(n.$elProxy.is("area")){var f=n.$elProxy.attr("shape"),l=n.$elProxy.parent().attr("name"),c=e('img[usemap="#'+l+'"]'),h=c.offset().left,p=c.offset().top,d=n.$elProxy.attr("coords")!==undefined?n.$elProxy.attr("coords").split(","):undefined;if(f=="circle"){var v=parseInt(d[0]),m=parseInt(d[1]),g=parseInt(d[2]);s.dimension.height=g*2;s.dimension.width=g*2;s.offset.top=p+m-g;s.offset.left=h+v-g}else if(f=="rect"){var v=parseInt(d[0]),m=parseInt(d[1]),y=parseInt(d[2]),b=parseInt(d[3]);s.dimension.height=b-m;s.dimension.width=y-v;s.offset.top=p+m;s.offset.left=h+v}else if(f=="poly"){var w=[],E=[],S=0,x=0,T=0,N=0,C="even";for(var k=0;k<d.length;k++){var L=parseInt(d[k]);if(C=="even"){if(L>T){T=L;if(k===0){S=T}}if(L<S){S=L}C="odd"}else{if(L>N){N=L;if(k==1){x=N}}if(L<x){x=L}C="even"}}s.dimension.height=N-x;s.dimension.width=T-S;s.offset.top=p+x;s.offset.left=h+S}else{s.dimension.height=c.outerHeight(false);s.dimension.width=c.outerWidth(false);s.offset.top=p;s.offset.left=h}}var A=0,O=0,M=0,_=parseInt(n.options.offsetY),D=parseInt(n.options.offsetX),P=n.options.position;function H(){var n=e(t).scrollLeft();if(A-n<0){r=A-n;A=n}if(A+o-n>i){r=A-(i+n-o);A=i+n-o}}function B(n,r){if(s.offset.top-e(t).scrollTop()-a-_-12<0&&r.indexOf("top")>-1){P=n}if(s.offset.top+s.dimension.height+a+12+_>e(t).scrollTop()+e(t).height()&&r.indexOf("bottom")>-1){P=n;M=s.offset.top-a-_-12}}if(P=="top"){var j=s.offset.left+o-(s.offset.left+s.dimension.width);A=s.offset.left+D-j/2;M=s.offset.top-a-_-12;H();B("bottom","top")}if(P=="top-left"){A=s.offset.left+D;M=s.offset.top-a-_-12;H();B("bottom-left","top-left")}if(P=="top-right"){A=s.offset.left+s.dimension.width+D-o;M=s.offset.top-a-_-12;H();B("bottom-right","top-right")}if(P=="bottom"){var j=s.offset.left+o-(s.offset.left+s.dimension.width);A=s.offset.left-j/2+D;M=s.offset.top+s.dimension.height+_+12;H();B("top","bottom")}if(P=="bottom-left"){A=s.offset.left+D;M=s.offset.top+s.dimension.height+_+12;H();B("top-left","bottom-left")}if(P=="bottom-right"){A=s.offset.left+s.dimension.width+D-o;M=s.offset.top+s.dimension.height+_+12;H();B("top-right","bottom-right")}if(P=="left"){A=s.offset.left-D-o-12;O=s.offset.left+D+s.dimension.width+12;var F=s.offset.top+a-(s.offset.top+s.dimension.height);M=s.offset.top-F/2-_;if(A<0&&O+o>i){var I=parseFloat(n.$tooltip.css("border-width"))*2,q=o+A-I;n.$tooltip.css("width",q+"px");a=n.$tooltip.outerHeight(false);A=s.offset.left-D-q-12-I;F=s.offset.top+a-(s.offset.top+s.dimension.height);M=s.offset.top-F/2-_}else if(A<0){A=s.offset.left+D+s.dimension.width+12;r="left"}}if(P=="right"){A=s.offset.left+D+s.dimension.width+12;O=s.offset.left-D-o-12;var F=s.offset.top+a-(s.offset.top+s.dimension.height);M=s.offset.top-F/2-_;if(A+o>i&&O<0){var I=parseFloat(n.$tooltip.css("border-width"))*2,q=i-A-I;n.$tooltip.css("width",q+"px");a=n.$tooltip.outerHeight(false);F=s.offset.top+a-(s.offset.top+s.dimension.height);M=s.offset.top-F/2-_}else if(A+o>i){A=s.offset.left-D-o-12;r="right"}}if(n.options.arrow){var R="tooltipster-arrow-"+P;if(n.options.arrowColor.length<1){var U=n.$tooltip.css("background-color")}else{var U=n.options.arrowColor}if(!r){r=""}else if(r=="left"){R="tooltipster-arrow-right";r=""}else if(r=="right"){R="tooltipster-arrow-left";r=""}else{r="left:"+Math.round(r)+"px;"}if(P=="top"||P=="top-left"||P=="top-right"){var z=parseFloat(n.$tooltip.css("border-bottom-width")),W=n.$tooltip.css("border-bottom-color")}else if(P=="bottom"||P=="bottom-left"||P=="bottom-right"){var z=parseFloat(n.$tooltip.css("border-top-width")),W=n.$tooltip.css("border-top-color")}else if(P=="left"){var z=parseFloat(n.$tooltip.css("border-right-width")),W=n.$tooltip.css("border-right-color")}else if(P=="right"){var z=parseFloat(n.$tooltip.css("border-left-width")),W=n.$tooltip.css("border-left-color")}else{var z=parseFloat(n.$tooltip.css("border-bottom-width")),W=n.$tooltip.css("border-bottom-color")}if(z>1){z++}var X="";if(z!==0){var V="",J="border-color: "+W+";";if(R.indexOf("bottom")!==-1){V="margin-top: -"+Math.round(z)+"px;"}else if(R.indexOf("top")!==-1){V="margin-bottom: -"+Math.round(z)+"px;"}else if(R.indexOf("left")!==-1){V="margin-right: -"+Math.round(z)+"px;"}else if(R.indexOf("right")!==-1){V="margin-left: -"+Math.round(z)+"px;"}X='<span class="tooltipster-arrow-border" style="'+V+" "+J+';"></span>'}n.$tooltip.find(".tooltipster-arrow").remove();var K='<div class="'+R+' tooltipster-arrow" style="'+r+'">'+X+'<span style="border-color:'+U+';"></span></div>';n.$tooltip.append(K)}n.$tooltip.css({top:Math.round(M)+"px",left:Math.round(A)+"px"})}return n},enable:function(){this.enabled=true;return this},disable:function(){this.hide();this.enabled=false;return this},destroy:function(){var t=this;t.hide();if(t.$el[0]!==t.$elProxy[0]){t.$elProxy.remove()}t.$el.removeData(t.namespace).off("."+t.namespace);var n=t.$el.data("tooltipster-ns");if(n.length===1){var r=null;if(t.options.restoration==="previous"){r=t.$el.data("tooltipster-initialTitle")}else if(t.options.restoration==="current"){r=typeof t.Content==="string"?t.Content:e("<div></div>").append(t.Content).html()}if(r){t.$el.attr("title",r)}t.$el.removeClass("tooltipstered").removeData("tooltipster-ns").removeData("tooltipster-initialTitle")}else{n=e.grep(n,function(e,n){return e!==t.namespace});t.$el.data("tooltipster-ns",n)}return t},elementIcon:function(){return this.$el[0]!==this.$elProxy[0]?this.$elProxy[0]:undefined},elementTooltip:function(){return this.$tooltip?this.$tooltip[0]:undefined},option:function(e,t){if(typeof t=="undefined")return this.options[e];else{this.options[e]=t;return this}},status:function(){return this.Status}};e.fn[r]=function(){var t=arguments;if(this.length===0){if(typeof t[0]==="string"){var n=true;switch(t[0]){case"setDefaults":e.extend(i,t[1]);break;default:n=false;break}if(n)return true;else return this}else{return this}}else{if(typeof t[0]==="string"){var r="#*$~&";this.each(function(){var n=e(this).data("tooltipster-ns"),i=n?e(this).data(n[0]):null;if(i){if(typeof i[t[0]]==="function"){var s=i[t[0]](t[1],t[2])}else{throw new Error('Unknown method .tooltipster("'+t[0]+'")')}if(s!==i){r=s;return false}}else{throw new Error("You called Tooltipster's \""+t[0]+'" method on an uninitialized element')}});return r!=="#*$~&"?r:this}else{var o=[],u=t[0]&&typeof t[0].multiple!=="undefined",a=u&&t[0].multiple||!u&&i.multiple,f=t[0]&&typeof t[0].debug!=="undefined",l=f&&t[0].debug||!f&&i.debug;this.each(function(){var n=false,r=e(this).data("tooltipster-ns"),i=null;if(!r){n=true}else if(a){n=true}else if(l){console.log('Tooltipster: one or more tooltips are already attached to this element: ignoring. Use the "multiple" option to attach more tooltips.')}if(n){i=new s(this,t[0]);if(!r)r=[];r.push(i.namespace);e(this).data("tooltipster-ns",r);e(this).data(i.namespace,i)}o.push(i)});if(a)return o;else return this}}};var u=!!("ontouchstart"in t);var a=false;e("body").one("mousemove",function(){a=true})})(jQuery,window,document);

/*!
 * jQuery UI Touch Punch 0.2.3
 *
 * Copyright 2011–2014, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends:
 *  jquery.ui.widget.js
 *  jquery.ui.mouse.js
 */
(function ($) {

  // Detect touch support
  $.support.touch = 'ontouchend' in document;

  // Ignore browsers without touch support
  if (!$.support.touch) {
    return;
  }

  var mouseProto = $.ui.mouse.prototype,
      _mouseInit = mouseProto._mouseInit,
      _mouseDestroy = mouseProto._mouseDestroy,
      touchHandled;

  /**
   * Simulate a mouse event based on a corresponding touch event
   * @param {Object} event A touch event
   * @param {String} simulatedType The corresponding mouse event
   */
  function simulateMouseEvent (event, simulatedType) {

    // Ignore multi-touch events
    if (event.originalEvent.touches.length > 1) {
      return;
    }

    event.preventDefault();

    var touch = event.originalEvent.changedTouches[0],
        simulatedEvent = document.createEvent('MouseEvents');
    
    // Initialize the simulated mouse event using the touch event's coordinates
    simulatedEvent.initMouseEvent(
      simulatedType,    // type
      true,             // bubbles                    
      true,             // cancelable                 
      window,           // view                       
      1,                // detail                     
      touch.screenX,    // screenX                    
      touch.screenY,    // screenY                    
      touch.clientX,    // clientX                    
      touch.clientY,    // clientY                    
      false,            // ctrlKey                    
      false,            // altKey                     
      false,            // shiftKey                   
      false,            // metaKey                    
      0,                // button                     
      null              // relatedTarget              
    );

    // Dispatch the simulated event to the target element
    event.target.dispatchEvent(simulatedEvent);
  }

  /**
   * Handle the jQuery UI widget's touchstart events
   * @param {Object} event The widget element's touchstart event
   */
  mouseProto._touchStart = function (event) {

    var self = this;

    // Ignore the event if another widget is already being handled
    if (touchHandled || !self._mouseCapture(event.originalEvent.changedTouches[0])) {
      return;
    }

    // Set the flag to prevent other widgets from inheriting the touch event
    touchHandled = true;

    // Track movement to determine if interaction was a click
    self._touchMoved = false;

    // Simulate the mouseover event
    simulateMouseEvent(event, 'mouseover');

    // Simulate the mousemove event
    simulateMouseEvent(event, 'mousemove');

    // Simulate the mousedown event
    simulateMouseEvent(event, 'mousedown');
  };

  /**
   * Handle the jQuery UI widget's touchmove events
   * @param {Object} event The document's touchmove event
   */
  mouseProto._touchMove = function (event) {

    // Ignore event if not handled
    if (!touchHandled) {
      return;
    }

    // Interaction was not a click
    this._touchMoved = true;

    // Simulate the mousemove event
    simulateMouseEvent(event, 'mousemove');
  };

  /**
   * Handle the jQuery UI widget's touchend events
   * @param {Object} event The document's touchend event
   */
  mouseProto._touchEnd = function (event) {

    // Ignore event if not handled
    if (!touchHandled) {
      return;
    }

    // Simulate the mouseup event
    simulateMouseEvent(event, 'mouseup');

    // Simulate the mouseout event
    simulateMouseEvent(event, 'mouseout');

    // If the touch interaction did not move, it should trigger a click
    if (!this._touchMoved) {

      // Simulate the click event
      simulateMouseEvent(event, 'click');
    }

    // Unset the flag to allow other widgets to inherit the touch event
    touchHandled = false;
  };

  /**
   * A duck punch of the $.ui.mouse _mouseInit method to support touch events.
   * This method extends the widget with bound touch event handlers that
   * translate touch events to mouse events and pass them to the widget's
   * original mouse event handling methods.
   */
  mouseProto._mouseInit = function () {
    
    var self = this;

    // Delegate the touch handlers to the widget's element
    self.element.bind({
      touchstart: $.proxy(self, '_touchStart'),
      touchmove: $.proxy(self, '_touchMove'),
      touchend: $.proxy(self, '_touchEnd')
    });

    // Call the original $.ui.mouse init method
    _mouseInit.call(self);
  };

  /**
   * Remove the touch event handlers
   */
  mouseProto._mouseDestroy = function () {
    
    var self = this;

    // Delegate the touch handlers to the widget's element
    self.element.unbind({
      touchstart: $.proxy(self, '_touchStart'),
      touchmove: $.proxy(self, '_touchMove'),
      touchend: $.proxy(self, '_touchEnd')
    });

    // Call the original $.ui.mouse destroy method
    _mouseDestroy.call(self);
  };

})(jQuery);

/*
 jsPDF 0.9.0rc2 ( 2013-08-07T15:00 commit ID c9c47d1de98fabb0681ad9fba049ef644f8f22ba )
Copyright (c) 2010-2012 James Hall, james@snapshotmedia.co.uk, https://github.com/MrRio/jsPDF
Copyright (c) 2012 Willow Systems Corporation, willow-systems.com
MIT license.

            -----------------------------------------------------------------------------------------------
            JavaScript PubSub library
            2012 (c) ddotsenko@willowsystems.com
            based on Peter Higgins (dante@dojotoolkit.org)
            Loosely based on Dojo publish/subscribe API, limited in scope. Rewritten blindly.
            Original is (c) Dojo Foundation 2004-2010. Released under either AFL or new BSD, see:
            http://dojofoundation.org/license for more information.
            -----------------------------------------------------------------------------------------------
 
jsPDF addImage plugin (JPEG only at this time)
Copyright (c) 2012 https://github.com/siefkenj/

jsPDF fromHTML plugin. BETA stage. API subject to change. Needs browser, jQuery
Copyright (c) 2012 2012 Willow Systems Corporation, willow-systems.com

jsPDF Silly SVG plugin
Copyright (c) 2012 Willow Systems Corporation, willow-systems.com
 
jsPDF split_text_to_size plugin
Copyright (c) 2012 Willow Systems Corporation, willow-systems.com
MIT license.
 
jsPDF standard_fonts_metrics plugin
Copyright (c) 2012 Willow Systems Corporation, willow-systems.com
MIT license.
*/
var jsPDF=function(){function e(l,c,g,q){l="undefined"===typeof l?"p":l.toString().toLowerCase();"undefined"===typeof c&&(c="mm");"undefined"===typeof g&&(g="a4");"undefined"===typeof q&&"undefined"===typeof zpipe&&(q=!1);var k=g.toString().toLowerCase(),b=[],a=0,h=q;q={a0:[2383.94,3370.39],a1:[1683.78,2383.94],a2:[1190.55,1683.78],a3:[841.89,1190.55],a4:[595.28,841.89],a5:[419.53,595.28],a6:[297.64,419.53],a7:[209.76,297.64],a8:[147.4,209.76],a9:[104.88,147.4],a10:[73.7,104.88],b0:[2834.65,4008.19],
b1:[2004.09,2834.65],b2:[1417.32,2004.09],b3:[1000.63,1417.32],b4:[708.66,1000.63],b5:[498.9,708.66],b6:[354.33,498.9],b7:[249.45,354.33],b8:[175.75,249.45],b9:[124.72,175.75],b10:[87.87,124.72],c0:[2599.37,3676.54],c1:[1836.85,2599.37],c2:[1298.27,1836.85],c3:[918.43,1298.27],c4:[649.13,918.43],c5:[459.21,649.13],c6:[323.15,459.21],c7:[229.61,323.15],c8:[161.57,229.61],c9:[113.39,161.57],c10:[79.37,113.39],letter:[612,792],"government-letter":[576,756],legal:[612,1008],"junior-legal":[576,360],ledger:[1224,
792],tabloid:[792,1224]};var G="0 g",f=0,p=[],I=2,F=!1,E=[],r={},A={},z=16,w,x,u,s,J={title:"",subject:"",author:"",keywords:"",creator:""},y=0,U=0,B={},H=new m(B),C,v=function(b){return b.toFixed(2)},V=function(b){var a=b.toFixed(0);return 10>b?"0"+a:a},n=function(h){F?p[f].push(h):(b.push(h),a+=h.length+1)},O=function(){I++;E[I]=a;n(I+" 0 obj");return I},R=function(b){n("stream");n(b);n("endstream")},K,da,S,t=function(b,h){var a;a=b;var f=h,c,d,g,k,l,p;void 0===f&&(f={});c=f.sourceEncoding?c:"Unicode";
g=f.outputEncoding;if((f.autoencode||g)&&(r[w].metadata&&r[w].metadata[c]&&r[w].metadata[c].encoding)&&(c=r[w].metadata[c].encoding,!g&&r[w].encoding&&(g=r[w].encoding),!g&&c.codePages&&(g=c.codePages[0]),"string"===typeof g&&(g=c[g]),g)){l=!1;k=[];c=0;for(d=a.length;c<d;c++)(p=g[a.charCodeAt(c)])?k.push(String.fromCharCode(p)):k.push(a[c]),k[c].charCodeAt(0)>>8&&(l=!0);a=k.join("")}for(c=a.length;void 0===l&&0!==c;)a.charCodeAt(c-1)>>8&&(l=!0),c--;if(l){k=f.noBOM?[]:[254,255];c=0;for(d=a.length;c<
d;c++){p=a.charCodeAt(c);f=p>>8;if(f>>8)throw Error("Character at position "+c.toString(10)+" of string '"+a+"' exceeds 16bits. Cannot be encoded into UCS-2 BE");k.push(f);k.push(p-(f<<8))}a=String.fromCharCode.apply(void 0,k)}return a.replace(/\\/g,"\\\\").replace(/\(/g,"\\(").replace(/\)/g,"\\)")},X=function(){f++;F=!0;p[f]=[];n(v(0.200025*s)+" w");n("0 G");0!==y&&n(y.toString(10)+" J");0!==U&&n(U.toString(10)+" j");H.publish("addPage",{pageNumber:f})},D=function(a,b){var h;void 0===a&&(a=r[w].fontName);
void 0===b&&(b=r[w].fontStyle);try{h=A[a][b]}catch(f){h=void 0}if(!h)throw Error("Unable to look up font label for font '"+a+"', '"+b+"'. Refer to getFontList() for available fonts.");return h},L=function(){F=!1;b=[];E=[];n("%PDF-1.3");K=u*s;da=x*s;var c,g,d,k,l;for(c=1;c<=f;c++){O();n("<</Type /Page");n("/Parent 1 0 R");n("/Resources 2 0 R");n("/Contents "+(I+1)+" 0 R>>");n("endobj");g=p[c].join("\n");O();if(h){d=[];for(k=0;k<g.length;++k)d[k]=g.charCodeAt(k);l=adler32cs.from(g);g=new Deflater(6);
g.append(new Uint8Array(d));g=g.flush();d=[new Uint8Array([120,156]),new Uint8Array(g),new Uint8Array([l&255,l>>8&255,l>>16&255,l>>24&255])];g="";for(k in d)d.hasOwnProperty(k)&&(g+=String.fromCharCode.apply(null,d[k]));n("<</Length "+g.length+" /Filter [/FlateDecode]>>")}else n("<</Length "+g.length+">>");R(g);n("endobj")}E[1]=a;n("1 0 obj");n("<</Type /Pages");S="/Kids [";for(k=0;k<f;k++)S+=3+2*k+" 0 R ";n(S+"]");n("/Count "+f);n("/MediaBox [0 0 "+v(K)+" "+v(da)+"]");n(">>");n("endobj");for(var q in r)r.hasOwnProperty(q)&&
(c=r[q],c.objectNumber=O(),n("<</BaseFont/"+c.PostScriptName+"/Type/Font"),"string"===typeof c.encoding&&n("/Encoding/"+c.encoding),n("/Subtype/Type1>>"),n("endobj"));H.publish("putResources");E[2]=a;n("2 0 obj");n("<<");n("/ProcSet [/PDF /Text /ImageB /ImageC /ImageI]");n("/Font <<");for(var e in r)r.hasOwnProperty(e)&&n("/"+e+" "+r[e].objectNumber+" 0 R");n(">>");n("/XObject <<");H.publish("putXobjectDict");n(">>");n(">>");n("endobj");H.publish("postPutResources");O();n("<<");n("/Producer (jsPDF 0.9.0rc2)");
J.title&&n("/Title ("+t(J.title)+")");J.subject&&n("/Subject ("+t(J.subject)+")");J.author&&n("/Author ("+t(J.author)+")");J.keywords&&n("/Keywords ("+t(J.keywords)+")");J.creator&&n("/Creator ("+t(J.creator)+")");q=new Date;n("/CreationDate (D:"+[q.getFullYear(),V(q.getMonth()+1),V(q.getDate()),V(q.getHours()),V(q.getMinutes()),V(q.getSeconds())].join("")+")");n(">>");n("endobj");O();n("<<");n("/Type /Catalog");n("/Pages 1 0 R");n("/OpenAction [3 0 R /FitH null]");n("/PageLayout /OneColumn");H.publish("putCatalog");
n(">>");n("endobj");q=a;n("xref");n("0 "+(I+1));n("0000000000 65535 f ");for(e=1;e<=I;e++)c=E[e].toFixed(0),c=10>c.length?Array(11-c.length).join("0")+c:c,n(c+" 00000 n ");n("trailer");n("<<");n("/Size "+(I+1));n("/Root "+I+" 0 R");n("/Info "+(I-1)+" 0 R");n(">>");n("startxref");n(q);n("%%EOF");F=!0;return b.join("\n")},Z=function(a){var b="S";if("F"===a)b="f";else if("FD"===a||"DF"===a)b="B";return b},aa=function(a,b){var h,c,f,g;switch(a){case void 0:return L();case "save":if(navigator.getUserMedia&&
(void 0===window.URL||void 0===window.URL.createObjectURL))return B.output("dataurlnewwindow");h=L();c=h.length;f=new Uint8Array(new ArrayBuffer(c));for(g=0;g<c;g++)f[g]=h.charCodeAt(g);h=new Blob([f],{type:"application/pdf"});saveAs(h,b);break;case "datauristring":case "dataurlstring":return"data:application/pdf;base64,"+btoa(L());case "datauri":case "dataurl":document.location.href="data:application/pdf;base64,"+btoa(L());break;case "dataurlnewwindow":window.open("data:application/pdf;base64,"+
btoa(L()));break;default:throw Error('Output type "'+a+'" is not supported.');}};if("pt"===c)s=1;else if("mm"===c)s=72/25.4;else if("cm"===c)s=72/2.54;else if("in"===c)s=72;else throw"Invalid unit: "+c;if(q.hasOwnProperty(k))x=q[k][1]/s,u=q[k][0]/s;else try{x=g[1],u=g[0]}catch(N){throw"Invalid format: "+g;}if("p"===l||"portrait"===l)l="p",u>x&&(l=u,u=x,x=l);else if("l"===l||"landscape"===l)l="l",x>u&&(l=u,u=x,x=l);else throw"Invalid orientation: "+l;B.internal={pdfEscape:t,getStyle:Z,getFont:function(){return r[D.apply(B,
arguments)]},getFontSize:function(){return z},getLineHeight:function(){return 1.15*z},btoa:btoa,write:function(a,b,h,c){n(1===arguments.length?a:Array.prototype.join.call(arguments," "))},getCoordinateString:function(a){return v(a*s)},getVerticalCoordinateString:function(a){return v((x-a)*s)},collections:{},newObject:O,putStream:R,events:H,scaleFactor:s,pageSize:{width:u,height:x},output:function(a,b){return aa(a,b)},getNumberOfPages:function(){return p.length-1},pages:p};B.addPage=function(){X();
return this};B.text=function(a,b,h,c){var f,g;"number"===typeof a&&(f=a,g=b,a=h,b=f,h=g);"string"===typeof a&&a.match(/[\n\r]/)&&(a=a.split(/\r\n|\r|\n/g));"undefined"===typeof c?c={noBOM:!0,autoencode:!0}:(void 0===c.noBOM&&(c.noBOM=!0),void 0===c.autoencode&&(c.autoencode=!0));if("string"===typeof a)c=t(a,c);else if(a instanceof Array){a=a.concat();for(f=a.length-1;-1!==f;f--)a[f]=t(a[f],c);c=a.join(") Tj\nT* (")}else throw Error('Type of text must be string or Array. "'+a+'" is not recognized.');
n("BT\n/"+w+" "+z+" Tf\n"+1.15*z+" TL\n"+G+"\n"+v(b*s)+" "+v((x-h)*s)+" Td\n("+c+") Tj\nET");return this};B.line=function(a,b,h,c){n(v(a*s)+" "+v((x-b)*s)+" m "+v(h*s)+" "+v((x-c)*s)+" l S");return this};B.lines=function(a,b,h,c,f,g){var k,d,l,p,q,e,I,G;"number"===typeof a&&(k=a,d=b,a=h,b=k,h=d);f=Z(f);c=void 0===c?[1,1]:c;n((b*s).toFixed(3)+" "+((x-h)*s).toFixed(3)+" m ");k=c[0];c=c[1];d=a.length;G=h;for(h=0;h<d;h++)l=a[h],2===l.length?(b=l[0]*k+b,G=l[1]*c+G,n((b*s).toFixed(3)+" "+((x-G)*s).toFixed(3)+
" l")):(p=l[0]*k+b,q=l[1]*c+G,e=l[2]*k+b,I=l[3]*c+G,b=l[4]*k+b,G=l[5]*c+G,n((p*s).toFixed(3)+" "+((x-q)*s).toFixed(3)+" "+(e*s).toFixed(3)+" "+((x-I)*s).toFixed(3)+" "+(b*s).toFixed(3)+" "+((x-G)*s).toFixed(3)+" c"));!0==g&&n(" h");n(f);return this};B.rect=function(a,b,h,c,f){f=Z(f);n([v(a*s),v((x-b)*s),v(h*s),v(-c*s),"re",f].join(" "));return this};B.triangle=function(a,b,h,c,f,g,k){this.lines([[h-a,c-b],[f-h,g-c],[a-f,b-g]],a,b,[1,1],k,!0);return this};B.roundedRect=function(a,b,h,c,f,g,k){var d=
4/3*(Math.SQRT2-1);this.lines([[h-2*f,0],[f*d,0,f,g-g*d,f,g],[0,c-2*g],[0,g*d,-(f*d),g,-f,g],[-h+2*f,0],[-(f*d),0,-f,-(g*d),-f,-g],[0,-c+2*g],[0,-(g*d),f*d,-g,f,-g]],a+f,b,[1,1],k);return this};B.ellipse=function(a,b,h,c,f){f=Z(f);var g=4/3*(Math.SQRT2-1)*h,d=4/3*(Math.SQRT2-1)*c;n([v((a+h)*s),v((x-b)*s),"m",v((a+h)*s),v((x-(b-d))*s),v((a+g)*s),v((x-(b-c))*s),v(a*s),v((x-(b-c))*s),"c"].join(" "));n([v((a-g)*s),v((x-(b-c))*s),v((a-h)*s),v((x-(b-d))*s),v((a-h)*s),v((x-b)*s),"c"].join(" "));n([v((a-
h)*s),v((x-(b+d))*s),v((a-g)*s),v((x-(b+c))*s),v(a*s),v((x-(b+c))*s),"c"].join(" "));n([v((a+g)*s),v((x-(b+c))*s),v((a+h)*s),v((x-(b+d))*s),v((a+h)*s),v((x-b)*s),"c",f].join(" "));return this};B.circle=function(a,b,h,c){return this.ellipse(a,b,h,h,c)};B.setProperties=function(a){for(var b in J)J.hasOwnProperty(b)&&a[b]&&(J[b]=a[b]);return this};B.setFontSize=function(a){z=a;return this};B.setFont=function(a,b){w=D(a,b);return this};B.setFontStyle=B.setFontType=function(a){w=D(void 0,a);return this};
B.getFontList=function(){var a={},b,h,c;for(b in A)if(A.hasOwnProperty(b))for(h in a[b]=c=[],A[b])A[b].hasOwnProperty(h)&&c.push(h);return a};B.setLineWidth=function(a){n((a*s).toFixed(2)+" w");return this};B.setDrawColor=function(a,b,h,c){a=void 0===b||void 0===c&&a===b===h?"string"===typeof a?a+" G":v(a/255)+" G":void 0===c?"string"===typeof a?[a,b,h,"RG"].join(" "):[v(a/255),v(b/255),v(h/255),"RG"].join(" "):"string"===typeof a?[a,b,h,c,"K"].join(" "):[v(a),v(b),v(h),v(c),"K"].join(" ");n(a);return this};
B.setFillColor=function(a,b,h,c){a=void 0===b||void 0===c&&a===b===h?"string"===typeof a?a+" g":v(a/255)+" g":void 0===c?"string"===typeof a?[a,b,h,"rg"].join(" "):[v(a/255),v(b/255),v(h/255),"rg"].join(" "):"string"===typeof a?[a,b,h,c,"k"].join(" "):[v(a),v(b),v(h),v(c),"k"].join(" ");n(a);return this};B.setTextColor=function(a,b,h){G=0===a&&0===b&&0===h||"undefined"===typeof b?(a/255).toFixed(3)+" g":[(a/255).toFixed(3),(b/255).toFixed(3),(h/255).toFixed(3),"rg"].join(" ");return this};B.CapJoinStyles=
{0:0,butt:0,but:0,miter:0,1:1,round:1,rounded:1,circle:1,2:2,projecting:2,project:2,square:2,bevel:2};B.setLineCap=function(a){var b=this.CapJoinStyles[a];if(void 0===b)throw Error("Line cap style of '"+a+"' is not recognized. See or extend .CapJoinStyles property for valid styles");y=b;n(b.toString(10)+" J");return this};B.setLineJoin=function(a){var b=this.CapJoinStyles[a];if(void 0===b)throw Error("Line join style of '"+a+"' is not recognized. See or extend .CapJoinStyles property for valid styles");
U=b;n(b.toString(10)+" j");return this};B.output=aa;B.save=function(a){B.output("save",a)};for(C in e.API)e.API.hasOwnProperty(C)&&("events"===C&&e.API.events.length?function(a,b){var h,c,f;for(f=b.length-1;-1!==f;f--)h=b[f][0],c=b[f][1],a.subscribe.apply(a,[h].concat("function"===typeof c?[c]:c))}(H,e.API.events):B[C]=e.API[C]);(function(){var a=[["Helvetica","helvetica","normal"],["Helvetica-Bold","helvetica","bold"],["Helvetica-Oblique","helvetica","italic"],["Helvetica-BoldOblique","helvetica",
"bolditalic"],["Courier","courier","normal"],["Courier-Bold","courier","bold"],["Courier-Oblique","courier","italic"],["Courier-BoldOblique","courier","bolditalic"],["Times-Roman","times","normal"],["Times-Bold","times","bold"],["Times-Italic","times","italic"],["Times-BoldItalic","times","bolditalic"]],b,h,c,f;b=0;for(h=a.length;b<h;b++){var g=a[b][0],k=a[b][1];c=a[b][2];f="F"+(d(r)+1).toString(10);var g=r[f]={id:f,PostScriptName:g,fontName:k,fontStyle:c,encoding:"StandardEncoding",metadata:{}},
l=f;void 0===A[k]&&(A[k]={});A[k][c]=l;H.publish("addFont",g);c=f;f=a[b][0].split("-");g=f[0];f=f[1]||"";void 0===A[g]&&(A[g]={});A[g][f]=c}H.publish("addFonts",{fonts:r,dictionary:A})})();w="F1";X();H.publish("initialized");return B}"undefined"===typeof btoa&&(window.btoa=function(d){var c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".split(""),g,q,k,b,a=0,h=0,e="",e=[];do g=d.charCodeAt(a++),q=d.charCodeAt(a++),k=d.charCodeAt(a++),b=g<<16|q<<8|k,g=b>>18&63,q=b>>12&63,k=b>>
6&63,b&=63,e[h++]=c[g]+c[q]+c[k]+c[b];while(a<d.length);e=e.join("");d=d.length%3;return(d?e.slice(0,d-3):e)+"===".slice(d||3)});"undefined"===typeof atob&&(window.atob=function(d){var c,g,q,k,b,a=0,h=0;k="";var e=[];if(!d)return d;d+="";do c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(d.charAt(a++)),g="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(d.charAt(a++)),k="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(d.charAt(a++)),
b="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(d.charAt(a++)),q=c<<18|g<<12|k<<6|b,c=q>>16&255,g=q>>8&255,q&=255,64===k?e[h++]=String.fromCharCode(c):64===b?e[h++]=String.fromCharCode(c,g):e[h++]=String.fromCharCode(c,g,q);while(a<d.length);return k=e.join("")});var d="function"===typeof Object.keys?function(d){return Object.keys(d).length}:function(d){var c=0,g;for(g in d)d.hasOwnProperty(g)&&c++;return c},m=function(d){this.topics={};this.context=d;this.publish=function(c,
g){if(this.topics[c]){var d=this.topics[c],k=[],b,a,h,e,f=function(){};g=Array.prototype.slice.call(arguments,1);a=0;for(h=d.length;a<h;a++)e=d[a],b=e[0],e[1]&&(e[0]=f,k.push(a)),b.apply(this.context,g);a=0;for(h=k.length;a<h;a++)d.splice(k[a],1)}};this.subscribe=function(c,g,d){this.topics[c]?this.topics[c].push([g,d]):this.topics[c]=[[g,d]];return{topic:c,callback:g}};this.unsubscribe=function(c){if(this.topics[c.topic]){var d=this.topics[c.topic],e,k;e=0;for(k=d.length;e<k;e++)d[e][0]===c.callback&&
d.splice(e,1)}}};e.API={events:[]};return e}();
(function(e){var d=function(){var d=this.internal.collections.addImage_images,c;for(c in d){var g=d[c],e=this.internal.newObject(),k=this.internal.write,b=this.internal.putStream;g.n=e;k("<</Type /XObject");k("/Subtype /Image");k("/Width "+g.w);k("/Height "+g.h);"Indexed"===g.cs?k("/ColorSpace [/Indexed /DeviceRGB "+(g.pal.length/3-1)+" "+(e+1)+" 0 R]"):(k("/ColorSpace /"+g.cs),"DeviceCMYK"===g.cs&&k("/Decode [1 0 1 0 1 0 1 0]"));k("/BitsPerComponent "+g.bpc);"f"in g&&k("/Filter /"+g.f);"dp"in g&&
k("/DecodeParms <<"+g.dp+">>");if("trns"in g&&g.trns.constructor==Array)for(var a="",h=0;h<g.trns.length;h++)a+=g[a][h]+" "+g.trns[h]+" ",k("/Mask ["+a+"]");"smask"in g&&k("/SMask "+(e+1)+" 0 R");k("/Length "+g.data.length+">>");b(g.data);k("endobj")}},m=function(){var d=this.internal.collections.addImage_images,c=this.internal.write,g,e;for(e in d)g=d[e],c("/I"+g.i,g.n,"0","R")};e.addImage=function(e,c,g,q,k,b){if("object"===typeof e&&1===e.nodeType){c=document.createElement("canvas");c.width=e.clientWidth;
c.height=e.clientHeight;var a=c.getContext("2d");if(!a)throw"addImage requires canvas to be supported by browser.";a.drawImage(e,0,0,c.width,c.height);e=c.toDataURL("image/jpeg");c="JPEG"}if("JPEG"!==c.toUpperCase())throw Error("addImage currently only supports format 'JPEG', not '"+c+"'");var h;c=this.internal.collections.addImage_images;var a=this.internal.getCoordinateString,G=this.internal.getVerticalCoordinateString;"data:image/jpeg;base64,"===e.substring(0,23)&&(e=atob(e.replace("data:image/jpeg;base64,",
"")));if(c)if(Object.keys)h=Object.keys(c).length;else{var f=c,p=0;for(h in f)f.hasOwnProperty(h)&&p++;h=p}else h=0,this.internal.collections.addImage_images=c={},this.internal.events.subscribe("putResources",d),this.internal.events.subscribe("putXobjectDict",m);a:{var f=e,I;if(255===!f.charCodeAt(0)||216===!f.charCodeAt(1)||255===!f.charCodeAt(2)||224===!f.charCodeAt(3)||74===!f.charCodeAt(6)||70===!f.charCodeAt(7)||73===!f.charCodeAt(8)||70===!f.charCodeAt(9)||0===!f.charCodeAt(10))throw Error("getJpegSize requires a binary jpeg file");
I=256*f.charCodeAt(4)+f.charCodeAt(5);for(var p=4,F=f.length;p<F;){p+=I;if(255!==f.charCodeAt(p))throw Error("getJpegSize could not find the size of the image");if(192===f.charCodeAt(p+1)||193===f.charCodeAt(p+1)||194===f.charCodeAt(p+1)||195===f.charCodeAt(p+1)||196===f.charCodeAt(p+1)||197===f.charCodeAt(p+1)||198===f.charCodeAt(p+1)||199===f.charCodeAt(p+1)){I=256*f.charCodeAt(p+5)+f.charCodeAt(p+6);f=256*f.charCodeAt(p+7)+f.charCodeAt(p+8);f=[f,I];break a}p+=2;I=256*f.charCodeAt(p)+f.charCodeAt(p+
1)}f=void 0}e={w:f[0],h:f[1],cs:"DeviceRGB",bpc:8,f:"DCTDecode",i:h,data:e};c[h]=e;k||b||(b=k=-96);0>k&&(k=-72*e.w/k/this.internal.scaleFactor);0>b&&(b=-72*e.h/b/this.internal.scaleFactor);0===k&&(k=b*e.w/e.h);0===b&&(b=k*e.h/e.w);this.internal.write("q",a(k),"0 0",a(b),a(g),G(q+b),"cm /I"+e.i,"Do Q");return this}})(jsPDF.API);
(function(e){function d(b,a,h,c){this.pdf=b;this.x=a;this.y=h;this.settings=c;this.init();return this}function m(b){var a=k[b];if(a)return a;a={"xx-small":9,"x-small":11,small:13,medium:16,large:19,"x-large":23,"xx-large":28,auto:0}[b];if(void 0!==a||(a=parseFloat(b)))return k[b]=a/16;a=b.match(/([\d\.]+)(px)/);return 3===a.length?k[b]=parseFloat(a[1])/16:k[b]=1}function l(b,a,h){var d=b.childNodes,f;f=$(b);b={};for(var k,e=f.css("font-family").split(","),F=e.shift();!k&&F;)k=c[F.trim().toLowerCase()],
F=e.shift();b["font-family"]=k||"times";b["font-style"]=q[f.css("font-style")]||"normal";k=g[f.css("font-weight")]||"normal";"bold"===k&&(b["font-style"]="normal"===b["font-style"]?k:k+b["font-style"]);b["font-size"]=m(f.css("font-size"))||1;b["line-height"]=m(f.css("line-height"))||1;b.display="inline"===f.css("display")?"inline":"block";"block"===b.display&&(b["margin-top"]=m(f.css("margin-top"))||0,b["margin-bottom"]=m(f.css("margin-bottom"))||0,b["padding-top"]=m(f.css("padding-top"))||0,b["padding-bottom"]=
m(f.css("padding-bottom"))||0);if(k="block"===b.display)a.setBlockBoundary(),a.setBlockStyle(b);e=0;for(F=d.length;e<F;e++)if(f=d[e],"object"===typeof f)if(1===f.nodeType&&"SCRIPT"!=f.nodeName){var E=f,r=a,A=h,z=!1,w=void 0,x=void 0,u=A["#"+E.id];if(u)if("function"===typeof u)z=u(E,r);else for(w=0,x=u.length;!z&&w!==x;)z=u[w](E,r),w++;u=A[E.nodeName];if(!z&&u)if("function"===typeof u)z=u(E,r);else for(w=0,x=u.length;!z&&w!==x;)z=u[w](E,r),w++;z||l(f,a,h)}else 3===f.nodeType&&a.addText(f.nodeValue,
b);else"string"===typeof f&&a.addText(f,b);k&&a.setBlockBoundary()}String.prototype.trim||(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")});String.prototype.trimLeft||(String.prototype.trimLeft=function(){return this.replace(/^\s+/g,"")});String.prototype.trimRight||(String.prototype.trimRight=function(){return this.replace(/\s+$/g,"")});d.prototype.init=function(){this.paragraph={text:[],style:[]};this.pdf.internal.write("q")};d.prototype.dispose=function(){this.pdf.internal.write("Q");
return{x:this.x,y:this.y}};d.prototype.splitFragmentsIntoLines=function(b,a){for(var h=this.pdf.internal.scaleFactor,c={},f,d,g,k,e,q=[],l=[q],m=0,w=this.settings.width;b.length;)if(k=b.shift(),e=a.shift(),k)if(f=e["font-family"],d=e["font-style"],g=c[f+d],g||(g=this.pdf.internal.getFont(f,d).metadata.Unicode,c[f+d]=g),f={widths:g.widths,kerning:g.kerning,fontSize:12*e["font-size"],textIndent:m},d=this.pdf.getStringUnitWidth(k,f)*f.fontSize/h,m+d>w){k=this.pdf.splitTextToSize(k,w,f);for(q.push([k.shift(),
e]);k.length;)q=[[k.shift(),e]],l.push(q);m=this.pdf.getStringUnitWidth(q[0][0],f)*f.fontSize/h}else q.push([k,e]),m+=d;return l};d.prototype.RenderTextFragment=function(b,a){var h=this.pdf.internal.getFont(a["font-family"],a["font-style"]);this.pdf.internal.write("/"+h.id,(12*a["font-size"]).toFixed(2),"Tf","("+this.pdf.internal.pdfEscape(b)+") Tj")};d.prototype.renderParagraph=function(){for(var b=this.paragraph.text,a=0,h=b.length,c,f=!1,d=!1;!f&&a!==h;)(c=b[a]=b[a].trimLeft())&&(f=!0),a++;for(a=
h-1;h&&!d&&-1!==a;)(c=b[a]=b[a].trimRight())&&(d=!0),a--;f=/\s+$/g;d=!0;for(a=0;a!==h;a++)c=b[a].replace(/\s+/g," "),d&&(c=c.trimLeft()),c&&(d=f.test(c)),b[a]=c;a=this.paragraph.style;c=(h=this.paragraph.blockstyle)||{};this.paragraph={text:[],style:[],blockstyle:{},priorblockstyle:h};if(b.join("").trim()){b=this.splitFragmentsIntoLines(b,a);a=12/this.pdf.internal.scaleFactor;f=(Math.max((h["margin-top"]||0)-(c["margin-bottom"]||0),0)+(h["padding-top"]||0))*a;h=((h["margin-bottom"]||0)+(h["padding-bottom"]||
0))*a;c=this.pdf.internal.write;var g,k;this.y+=f;for(c("q","BT",this.pdf.internal.getCoordinateString(this.x),this.pdf.internal.getVerticalCoordinateString(this.y),"Td");b.length;){f=b.shift();g=d=0;for(k=f.length;g!==k;g++)f[g][0].trim()&&(d=Math.max(d,f[g][1]["line-height"],f[g][1]["font-size"]));c(0,(-12*d).toFixed(2),"Td");g=0;for(k=f.length;g!==k;g++)f[g][0]&&this.RenderTextFragment(f[g][0],f[g][1]);this.y+=d*a}c("ET","Q");this.y+=h}};d.prototype.setBlockBoundary=function(){this.renderParagraph()};
d.prototype.setBlockStyle=function(b){this.paragraph.blockstyle=b};d.prototype.addText=function(b,a){this.paragraph.text.push(b);this.paragraph.style.push(a)};var c={helvetica:"helvetica","sans-serif":"helvetica",serif:"times",times:"times","times new roman":"times",monospace:"courier",courier:"courier"},g={100:"normal",200:"normal",300:"normal",400:"normal",500:"bold",600:"bold",700:"bold",800:"bold",900:"bold",normal:"normal",bold:"bold",bolder:"bold",lighter:"normal"},q={normal:"normal",italic:"italic",
oblique:"italic"},k={normal:1};e.fromHTML=function(b,a,c,g){if("string"===typeof b){var f="jsPDFhtmlText"+Date.now().toString()+(1E3*Math.random()).toFixed(0);$('<div style="position: absolute !important;clip: rect(1px 1px 1px 1px); /* IE6, IE7 */clip: rect(1px, 1px, 1px, 1px);padding:0 !important;border:0 !important;height: 1px !important;width: 1px !important; top:auto;left:-100px;overflow: hidden;"><iframe style="height:1px;width:1px" name="'+f+'" /></div>').appendTo(document.body);b=$(window.frames[f].document.body).html(b)[0]}a=
new d(this,a,c,g);l(b,a,g.elementHandlers);return a.dispose()}})(jsPDF.API);
(function(e){e.addSVG=function(d,e,l,c,g){function q(a){for(var b=parseFloat(a[1]),c=parseFloat(a[2]),d=[],g=3,k=a.length;g<k;)"c"===a[g]?(d.push([parseFloat(a[g+1]),parseFloat(a[g+2]),parseFloat(a[g+3]),parseFloat(a[g+4]),parseFloat(a[g+5]),parseFloat(a[g+6])]),g+=7):"l"===a[g]?(d.push([parseFloat(a[g+1]),parseFloat(a[g+2])]),g+=3):g+=1;return[b,c,d]}if(void 0===e||void 0===e)throw Error("addSVG needs values for 'x' and 'y'");var k=function(a){var b=a.createElement("iframe"),c=a.createElement("style");
c.type="text/css";c.styleSheet?c.styleSheet.cssText=".jsPDF_sillysvg_iframe {display:none;position:absolute;}":c.appendChild(a.createTextNode(".jsPDF_sillysvg_iframe {display:none;position:absolute;}"));a.getElementsByTagName("head")[0].appendChild(c);b.name="childframe";b.setAttribute("width",0);b.setAttribute("height",0);b.setAttribute("frameborder","0");b.setAttribute("scrolling","no");b.setAttribute("seamless","seamless");b.setAttribute("class","jsPDF_sillysvg_iframe");a.body.appendChild(b);return b}(document),
k=function(a,b){var c=(b.contentWindow||b.contentDocument).document;c.write(a);c.close();return c.getElementsByTagName("svg")[0]}(d,k);d=[1,1];var b=parseFloat(k.getAttribute("width")),a=parseFloat(k.getAttribute("height"));b&&a&&(c&&g?d=[c/b,g/a]:c?d=[c/b,c/b]:g&&(d=[g/a,g/a]));k=k.childNodes;c=0;for(g=k.length;c<g;c++)b=k[c],b.tagName&&"PATH"===b.tagName.toUpperCase()&&(b=q(b.getAttribute("d").split(" ")),b[0]=b[0]*d[0]+e,b[1]=b[1]*d[1]+l,this.lines.call(this,b[2],b[0],b[1],d));return this}})(jsPDF.API);
(function(e){var d=e.getCharWidthsArray=function(c,d){d||(d={});var e=d.widths?d.widths:this.internal.getFont().metadata.Unicode.widths,k=e.fof?e.fof:1,b=d.kerning?d.kerning:this.internal.getFont().metadata.Unicode.kerning,a=b.fof?b.fof:1,h,l,f,p=0,m=e[0]||k,F=[];h=0;for(l=c.length;h<l;h++)f=c.charCodeAt(h),F.push((e[f]||m)/k+(b[f]&&b[f][p]||0)/a),p=f;return F},m=function(c){for(var d=c.length,e=0;d;)d--,e+=c[d];return e};e.getStringUnitWidth=function(c,g){return m(d.call(this,c,g))};var l=function(c,
g,e){e||(e={});var k=d(" ",e)[0],b=c.split(" "),a=[];c=[a];var h=e.textIndent||0,l=0,f=0,p,I,F,E;F=0;for(E=b.length;F<E;F++){p=b[F];I=d(p,e);f=m(I);if(h+l+f>g){if(f>g){for(var f=p,r=I,A=g,z=[],w=0,x=f.length,u=0;w!==x&&u+r[w]<g-(h+l);)u+=r[w],w++;z.push(f.slice(0,w));h=w;for(u=0;w!==x;)u+r[w]>A&&(z.push(f.slice(h,w)),u=0,h=w),u+=r[w],w++;h!==w&&z.push(f.slice(h,w));h=z;a.push(h.shift());for(a=[h.pop()];h.length;)c.push([h.shift()]);f=m(I.slice(p.length-a[0].length))}else a=[p];c.push(a);h=f}else a.push(p),
h+=l+f;l=k}g=[];F=0;for(E=c.length;F<E;F++)g.push(c[F].join(" "));return g};e.splitTextToSize=function(c,d,e){e||(e={});var k=e.fontSize||this.internal.getFontSize(),b;var a=e;b={0:1};var h={};a.widths&&a.kerning?b={widths:a.widths,kerning:a.kerning}:(a=this.internal.getFont(a.fontName,a.fontStyle),b=a.metadata.Unicode?{widths:a.metadata.Unicode.widths||b,kerning:a.metadata.Unicode.kerning||h}:{widths:b,kerning:h});c=c.match(/[\n\r]/)?c.split(/\r\n|\r|\n/g):[c];d=1*this.internal.scaleFactor*d/k;b.textIndent=
e.textIndent?1*e.textIndent*this.internal.scaleFactor/k:0;h=[];e=0;for(k=c.length;e<k;e++)h=h.concat(l(c[e],d,b));return h}})(jsPDF.API);
(function(e){var d=function(c){for(var d={},e=0;16>e;e++)d["klmnopqrstuvwxyz"[e]]="0123456789abcdef"[e];for(var b={},a=1,h,l=b,f=[],p,m="",F="",E,r=c.length-1,e=1;e!=r;)p=c[e],e+=1,"'"==p?h?(E=h.join(""),h=void 0):h=[]:h?h.push(p):"{"==p?(f.push([l,E]),l={},E=void 0):"}"==p?(p=f.pop(),p[0][p[1]]=l,E=void 0,l=p[0]):"-"==p?a=-1:void 0===E?d.hasOwnProperty(p)?(m+=d[p],E=parseInt(m,16)*a,a=1,m=""):m+=p:d.hasOwnProperty(p)?(F+=d[p],l[E]=parseInt(F,16)*a,a=1,E=void 0,F=""):F+=p;return b},m={codePages:["WinAnsiEncoding"],
WinAnsiEncoding:d("{19m8n201n9q201o9r201s9l201t9m201u8m201w9n201x9o201y8o202k8q202l8r202m9p202q8p20aw8k203k8t203t8v203u9v2cq8s212m9t15m8w15n9w2dw9s16k8u16l9u17s9z17x8y17y9y}")},l={Unicode:{Courier:m,"Courier-Bold":m,"Courier-BoldOblique":m,"Courier-Oblique":m,Helvetica:m,"Helvetica-Bold":m,"Helvetica-BoldOblique":m,"Helvetica-Oblique":m,"Times-Roman":m,"Times-Bold":m,"Times-BoldItalic":m,"Times-Italic":m}},c={Unicode:{"Courier-Oblique":d("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),"Times-BoldItalic":d("{'widths'{k3o2q4ycx2r201n3m201o6o201s2l201t2l201u2l201w3m201x3m201y3m2k1t2l2r202m2n2n3m2o3m2p5n202q6o2r1w2s2l2t2l2u3m2v3t2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v2l3w3t3x3t3y3t3z3m4k5n4l4m4m4m4n4m4o4s4p4m4q4m4r4s4s4y4t2r4u3m4v4m4w3x4x5t4y4s4z4s5k3x5l4s5m4m5n3r5o3x5p4s5q4m5r5t5s4m5t3x5u3x5v2l5w1w5x2l5y3t5z3m6k2l6l3m6m3m6n2w6o3m6p2w6q2l6r3m6s3r6t1w6u1w6v3m6w1w6x4y6y3r6z3m7k3m7l3m7m2r7n2r7o1w7p3r7q2w7r4m7s3m7t2w7u2r7v2n7w1q7x2n7y3t202l3mcl4mal2ram3man3mao3map3mar3mas2lat4uau1uav3maw3way4uaz2lbk2sbl3t'fof'6obo2lbp3tbq3mbr1tbs2lbu1ybv3mbz3mck4m202k3mcm4mcn4mco4mcp4mcq5ycr4mcs4mct4mcu4mcv4mcw2r2m3rcy2rcz2rdl4sdm4sdn4sdo4sdp4sdq4sds4sdt4sdu4sdv4sdw4sdz3mek3mel3mem3men3meo3mep3meq4ser2wes2wet2weu2wev2wew1wex1wey1wez1wfl3rfm3mfn3mfo3mfp3mfq3mfr3tfs3mft3rfu3rfv3rfw3rfz2w203k6o212m6o2dw2l2cq2l3t3m3u2l17s3x19m3m}'kerning'{cl{4qu5kt5qt5rs17ss5ts}201s{201ss}201t{cks4lscmscnscoscpscls2wu2yu201ts}201x{2wu2yu}2k{201ts}2w{4qx5kx5ou5qx5rs17su5tu}2x{17su5tu5ou}2y{4qx5kx5ou5qx5rs17ss5ts}'fof'-6ofn{17sw5tw5ou5qw5rs}7t{cksclscmscnscoscps4ls}3u{17su5tu5os5qs}3v{17su5tu5os5qs}7p{17su5tu}ck{4qu5kt5qt5rs17ss5ts}4l{4qu5kt5qt5rs17ss5ts}cm{4qu5kt5qt5rs17ss5ts}cn{4qu5kt5qt5rs17ss5ts}co{4qu5kt5qt5rs17ss5ts}cp{4qu5kt5qt5rs17ss5ts}6l{4qu5ou5qw5rt17su5tu}5q{ckuclucmucnucoucpu4lu}5r{ckuclucmucnucoucpu4lu}7q{cksclscmscnscoscps4ls}6p{4qu5ou5qw5rt17sw5tw}ek{4qu5ou5qw5rt17su5tu}el{4qu5ou5qw5rt17su5tu}em{4qu5ou5qw5rt17su5tu}en{4qu5ou5qw5rt17su5tu}eo{4qu5ou5qw5rt17su5tu}ep{4qu5ou5qw5rt17su5tu}es{17ss5ts5qs4qu}et{4qu5ou5qw5rt17sw5tw}eu{4qu5ou5qw5rt17ss5ts}ev{17ss5ts5qs4qu}6z{17sw5tw5ou5qw5rs}fm{17sw5tw5ou5qw5rs}7n{201ts}fo{17sw5tw5ou5qw5rs}fp{17sw5tw5ou5qw5rs}fq{17sw5tw5ou5qw5rs}7r{cksclscmscnscoscps4ls}fs{17sw5tw5ou5qw5rs}ft{17su5tu}fu{17su5tu}fv{17su5tu}fw{17su5tu}fz{cksclscmscnscoscps4ls}}}"),
"Helvetica-Bold":d("{'widths'{k3s2q4scx1w201n3r201o6o201s1w201t1w201u1w201w3m201x3m201y3m2k1w2l2l202m2n2n3r2o3r2p5t202q6o2r1s2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v2l3w3u3x3u3y3u3z3x4k6l4l4s4m4s4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3r4v4s4w3x4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v2l5w1w5x2l5y3u5z3r6k2l6l3r6m3x6n3r6o3x6p3r6q2l6r3x6s3x6t1w6u1w6v3r6w1w6x5t6y3x6z3x7k3x7l3x7m2r7n3r7o2l7p3x7q3r7r4y7s3r7t3r7u3m7v2r7w1w7x2r7y3u202l3rcl4sal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3xbq3rbr1wbs2lbu2obv3rbz3xck4s202k3rcm4scn4sco4scp4scq6ocr4scs4mct4mcu4mcv4mcw1w2m2zcy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3res3ret3reu3rev3rew1wex1wey1wez1wfl3xfm3xfn3xfo3xfp3xfq3xfr3ufs3xft3xfu3xfv3xfw3xfz3r203k6o212m6o2dw2l2cq2l3t3r3u2l17s4m19m3r}'kerning'{cl{4qs5ku5ot5qs17sv5tv}201t{2ww4wy2yw}201w{2ks}201x{2ww4wy2yw}2k{201ts201xs}2w{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}2x{5ow5qs}2y{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}'fof'-6o7p{17su5tu5ot}ck{4qs5ku5ot5qs17sv5tv}4l{4qs5ku5ot5qs17sv5tv}cm{4qs5ku5ot5qs17sv5tv}cn{4qs5ku5ot5qs17sv5tv}co{4qs5ku5ot5qs17sv5tv}cp{4qs5ku5ot5qs17sv5tv}6l{17st5tt5os}17s{2kwclvcmvcnvcovcpv4lv4wwckv}5o{2kucltcmtcntcotcpt4lt4wtckt}5q{2ksclscmscnscoscps4ls4wvcks}5r{2ks4ws}5t{2kwclvcmvcnvcovcpv4lv4wwckv}eo{17st5tt5os}fu{17su5tu5ot}6p{17ss5ts}ek{17st5tt5os}el{17st5tt5os}em{17st5tt5os}en{17st5tt5os}6o{201ts}ep{17st5tt5os}es{17ss5ts}et{17ss5ts}eu{17ss5ts}ev{17ss5ts}6z{17su5tu5os5qt}fm{17su5tu5os5qt}fn{17su5tu5os5qt}fo{17su5tu5os5qt}fp{17su5tu5os5qt}fq{17su5tu5os5qt}fs{17su5tu5os5qt}ft{17su5tu5ot}7m{5os}fv{17su5tu5ot}fw{17su5tu5ot}}}"),
Courier:d("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),"Courier-BoldOblique":d("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),"Times-Bold":d("{'widths'{k3q2q5ncx2r201n3m201o6o201s2l201t2l201u2l201w3m201x3m201y3m2k1t2l2l202m2n2n3m2o3m2p6o202q6o2r1w2s2l2t2l2u3m2v3t2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v2l3w3t3x3t3y3t3z3m4k5x4l4s4m4m4n4s4o4s4p4m4q3x4r4y4s4y4t2r4u3m4v4y4w4m4x5y4y4s4z4y5k3x5l4y5m4s5n3r5o4m5p4s5q4s5r6o5s4s5t4s5u4m5v2l5w1w5x2l5y3u5z3m6k2l6l3m6m3r6n2w6o3r6p2w6q2l6r3m6s3r6t1w6u2l6v3r6w1w6x5n6y3r6z3m7k3r7l3r7m2w7n2r7o2l7p3r7q3m7r4s7s3m7t3m7u2w7v2r7w1q7x2r7y3o202l3mcl4sal2lam3man3mao3map3mar3mas2lat4uau1yav3maw3tay4uaz2lbk2sbl3t'fof'6obo2lbp3rbr1tbs2lbu2lbv3mbz3mck4s202k3mcm4scn4sco4scp4scq6ocr4scs4mct4mcu4mcv4mcw2r2m3rcy2rcz2rdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3rek3mel3mem3men3meo3mep3meq4ser2wes2wet2weu2wev2wew1wex1wey1wez1wfl3rfm3mfn3mfo3mfp3mfq3mfr3tfs3mft3rfu3rfv3rfw3rfz3m203k6o212m6o2dw2l2cq2l3t3m3u2l17s4s19m3m}'kerning'{cl{4qt5ks5ot5qy5rw17sv5tv}201t{cks4lscmscnscoscpscls4wv}2k{201ts}2w{4qu5ku7mu5os5qx5ru17su5tu}2x{17su5tu5ou5qs}2y{4qv5kv7mu5ot5qz5ru17su5tu}'fof'-6o7t{cksclscmscnscoscps4ls}3u{17su5tu5os5qu}3v{17su5tu5os5qu}fu{17su5tu5ou5qu}7p{17su5tu5ou5qu}ck{4qt5ks5ot5qy5rw17sv5tv}4l{4qt5ks5ot5qy5rw17sv5tv}cm{4qt5ks5ot5qy5rw17sv5tv}cn{4qt5ks5ot5qy5rw17sv5tv}co{4qt5ks5ot5qy5rw17sv5tv}cp{4qt5ks5ot5qy5rw17sv5tv}6l{17st5tt5ou5qu}17s{ckuclucmucnucoucpu4lu4wu}5o{ckuclucmucnucoucpu4lu4wu}5q{ckzclzcmzcnzcozcpz4lz4wu}5r{ckxclxcmxcnxcoxcpx4lx4wu}5t{ckuclucmucnucoucpu4lu4wu}7q{ckuclucmucnucoucpu4lu}6p{17sw5tw5ou5qu}ek{17st5tt5qu}el{17st5tt5ou5qu}em{17st5tt5qu}en{17st5tt5qu}eo{17st5tt5qu}ep{17st5tt5ou5qu}es{17ss5ts5qu}et{17sw5tw5ou5qu}eu{17sw5tw5ou5qu}ev{17ss5ts5qu}6z{17sw5tw5ou5qu5rs}fm{17sw5tw5ou5qu5rs}fn{17sw5tw5ou5qu5rs}fo{17sw5tw5ou5qu5rs}fp{17sw5tw5ou5qu5rs}fq{17sw5tw5ou5qu5rs}7r{cktcltcmtcntcotcpt4lt5os}fs{17sw5tw5ou5qu5rs}ft{17su5tu5ou5qu}7m{5os}fv{17su5tu5ou5qu}fw{17su5tu5ou5qu}fz{cksclscmscnscoscps4ls}}}"),
Helvetica:d("{'widths'{k3p2q4mcx1w201n3r201o6o201s1q201t1q201u1q201w2l201x2l201y2l2k1w2l1w202m2n2n3r2o3r2p5t202q6o2r1n2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v1w3w3u3x3u3y3u3z3r4k6p4l4m4m4m4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3m4v4m4w3r4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v1w5w1w5x1w5y2z5z3r6k2l6l3r6m3r6n3m6o3r6p3r6q1w6r3r6s3r6t1q6u1q6v3m6w1q6x5n6y3r6z3r7k3r7l3r7m2l7n3m7o1w7p3r7q3m7r4s7s3m7t3m7u3m7v2l7w1u7x2l7y3u202l3rcl4mal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3rbr1wbs2lbu2obv3rbz3xck4m202k3rcm4mcn4mco4mcp4mcq6ocr4scs4mct4mcu4mcv4mcw1w2m2ncy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3mes3ret3reu3rev3rew1wex1wey1wez1wfl3rfm3rfn3rfo3rfp3rfq3rfr3ufs3xft3rfu3rfv3rfw3rfz3m203k6o212m6o2dw2l2cq2l3t3r3u1w17s4m19m3r}'kerning'{5q{4wv}cl{4qs5kw5ow5qs17sv5tv}201t{2wu4w1k2yu}201x{2wu4wy2yu}17s{2ktclucmucnu4otcpu4lu4wycoucku}2w{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}2x{17sy5ty5oy5qs}2y{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}'fof'-6o7p{17sv5tv5ow}ck{4qs5kw5ow5qs17sv5tv}4l{4qs5kw5ow5qs17sv5tv}cm{4qs5kw5ow5qs17sv5tv}cn{4qs5kw5ow5qs17sv5tv}co{4qs5kw5ow5qs17sv5tv}cp{4qs5kw5ow5qs17sv5tv}6l{17sy5ty5ow}do{17st5tt}4z{17st5tt}7s{fst}dm{17st5tt}dn{17st5tt}5o{ckwclwcmwcnwcowcpw4lw4wv}dp{17st5tt}dq{17st5tt}7t{5ow}ds{17st5tt}5t{2ktclucmucnu4otcpu4lu4wycoucku}fu{17sv5tv5ow}6p{17sy5ty5ow5qs}ek{17sy5ty5ow}el{17sy5ty5ow}em{17sy5ty5ow}en{5ty}eo{17sy5ty5ow}ep{17sy5ty5ow}es{17sy5ty5qs}et{17sy5ty5ow5qs}eu{17sy5ty5ow5qs}ev{17sy5ty5ow5qs}6z{17sy5ty5ow5qs}fm{17sy5ty5ow5qs}fn{17sy5ty5ow5qs}fo{17sy5ty5ow5qs}fp{17sy5ty5qs}fq{17sy5ty5ow5qs}7r{5ow}fs{17sy5ty5ow5qs}ft{17sv5tv5ow}7m{5ow}fv{17sv5tv5ow}fw{17sv5tv5ow}}}"),
"Helvetica-BoldOblique":d("{'widths'{k3s2q4scx1w201n3r201o6o201s1w201t1w201u1w201w3m201x3m201y3m2k1w2l2l202m2n2n3r2o3r2p5t202q6o2r1s2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v2l3w3u3x3u3y3u3z3x4k6l4l4s4m4s4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3r4v4s4w3x4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v2l5w1w5x2l5y3u5z3r6k2l6l3r6m3x6n3r6o3x6p3r6q2l6r3x6s3x6t1w6u1w6v3r6w1w6x5t6y3x6z3x7k3x7l3x7m2r7n3r7o2l7p3x7q3r7r4y7s3r7t3r7u3m7v2r7w1w7x2r7y3u202l3rcl4sal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3xbq3rbr1wbs2lbu2obv3rbz3xck4s202k3rcm4scn4sco4scp4scq6ocr4scs4mct4mcu4mcv4mcw1w2m2zcy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3res3ret3reu3rev3rew1wex1wey1wez1wfl3xfm3xfn3xfo3xfp3xfq3xfr3ufs3xft3xfu3xfv3xfw3xfz3r203k6o212m6o2dw2l2cq2l3t3r3u2l17s4m19m3r}'kerning'{cl{4qs5ku5ot5qs17sv5tv}201t{2ww4wy2yw}201w{2ks}201x{2ww4wy2yw}2k{201ts201xs}2w{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}2x{5ow5qs}2y{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}'fof'-6o7p{17su5tu5ot}ck{4qs5ku5ot5qs17sv5tv}4l{4qs5ku5ot5qs17sv5tv}cm{4qs5ku5ot5qs17sv5tv}cn{4qs5ku5ot5qs17sv5tv}co{4qs5ku5ot5qs17sv5tv}cp{4qs5ku5ot5qs17sv5tv}6l{17st5tt5os}17s{2kwclvcmvcnvcovcpv4lv4wwckv}5o{2kucltcmtcntcotcpt4lt4wtckt}5q{2ksclscmscnscoscps4ls4wvcks}5r{2ks4ws}5t{2kwclvcmvcnvcovcpv4lv4wwckv}eo{17st5tt5os}fu{17su5tu5ot}6p{17ss5ts}ek{17st5tt5os}el{17st5tt5os}em{17st5tt5os}en{17st5tt5os}6o{201ts}ep{17st5tt5os}es{17ss5ts}et{17ss5ts}eu{17ss5ts}ev{17ss5ts}6z{17su5tu5os5qt}fm{17su5tu5os5qt}fn{17su5tu5os5qt}fo{17su5tu5os5qt}fp{17su5tu5os5qt}fq{17su5tu5os5qt}fs{17su5tu5os5qt}ft{17su5tu5ot}7m{5os}fv{17su5tu5ot}fw{17su5tu5ot}}}"),
"Courier-Bold":d("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),"Times-Italic":d("{'widths'{k3n2q4ycx2l201n3m201o5t201s2l201t2l201u2l201w3r201x3r201y3r2k1t2l2l202m2n2n3m2o3m2p5n202q5t2r1p2s2l2t2l2u3m2v4n2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v2l3w4n3x4n3y4n3z3m4k5w4l3x4m3x4n4m4o4s4p3x4q3x4r4s4s4s4t2l4u2w4v4m4w3r4x5n4y4m4z4s5k3x5l4s5m3x5n3m5o3r5p4s5q3x5r5n5s3x5t3r5u3r5v2r5w1w5x2r5y2u5z3m6k2l6l3m6m3m6n2w6o3m6p2w6q1w6r3m6s3m6t1w6u1w6v2w6w1w6x4s6y3m6z3m7k3m7l3m7m2r7n2r7o1w7p3m7q2w7r4m7s2w7t2w7u2r7v2s7w1v7x2s7y3q202l3mcl3xal2ram3man3mao3map3mar3mas2lat4wau1vav3maw4nay4waz2lbk2sbl4n'fof'6obo2lbp3mbq3obr1tbs2lbu1zbv3mbz3mck3x202k3mcm3xcn3xco3xcp3xcq5tcr4mcs3xct3xcu3xcv3xcw2l2m2ucy2lcz2ldl4mdm4sdn4sdo4sdp4sdq4sds4sdt4sdu4sdv4sdw4sdz3mek3mel3mem3men3meo3mep3meq4mer2wes2wet2weu2wev2wew1wex1wey1wez1wfl3mfm3mfn3mfo3mfp3mfq3mfr4nfs3mft3mfu3mfv3mfw3mfz2w203k6o212m6m2dw2l2cq2l3t3m3u2l17s3r19m3m}'kerning'{cl{5kt4qw}201s{201sw}201t{201tw2wy2yy6q-t}201x{2wy2yy}2k{201tw}2w{7qs4qy7rs5ky7mw5os5qx5ru17su5tu}2x{17ss5ts5os}2y{7qs4qy7rs5ky7mw5os5qx5ru17su5tu}'fof'-6o6t{17ss5ts5qs}7t{5os}3v{5qs}7p{17su5tu5qs}ck{5kt4qw}4l{5kt4qw}cm{5kt4qw}cn{5kt4qw}co{5kt4qw}cp{5kt4qw}6l{4qs5ks5ou5qw5ru17su5tu}17s{2ks}5q{ckvclvcmvcnvcovcpv4lv}5r{ckuclucmucnucoucpu4lu}5t{2ks}6p{4qs5ks5ou5qw5ru17su5tu}ek{4qs5ks5ou5qw5ru17su5tu}el{4qs5ks5ou5qw5ru17su5tu}em{4qs5ks5ou5qw5ru17su5tu}en{4qs5ks5ou5qw5ru17su5tu}eo{4qs5ks5ou5qw5ru17su5tu}ep{4qs5ks5ou5qw5ru17su5tu}es{5ks5qs4qs}et{4qs5ks5ou5qw5ru17su5tu}eu{4qs5ks5qw5ru17su5tu}ev{5ks5qs4qs}ex{17ss5ts5qs}6z{4qv5ks5ou5qw5ru17su5tu}fm{4qv5ks5ou5qw5ru17su5tu}fn{4qv5ks5ou5qw5ru17su5tu}fo{4qv5ks5ou5qw5ru17su5tu}fp{4qv5ks5ou5qw5ru17su5tu}fq{4qv5ks5ou5qw5ru17su5tu}7r{5os}fs{4qv5ks5ou5qw5ru17su5tu}ft{17su5tu5qs}fu{17su5tu5qs}fv{17su5tu5qs}fw{17su5tu5qs}}}"),
"Times-Roman":d("{'widths'{k3n2q4ycx2l201n3m201o6o201s2l201t2l201u2l201w2w201x2w201y2w2k1t2l2l202m2n2n3m2o3m2p5n202q6o2r1m2s2l2t2l2u3m2v3s2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v1w3w3s3x3s3y3s3z2w4k5w4l4s4m4m4n4m4o4s4p3x4q3r4r4s4s4s4t2l4u2r4v4s4w3x4x5t4y4s4z4s5k3r5l4s5m4m5n3r5o3x5p4s5q4s5r5y5s4s5t4s5u3x5v2l5w1w5x2l5y2z5z3m6k2l6l2w6m3m6n2w6o3m6p2w6q2l6r3m6s3m6t1w6u1w6v3m6w1w6x4y6y3m6z3m7k3m7l3m7m2l7n2r7o1w7p3m7q3m7r4s7s3m7t3m7u2w7v3k7w1o7x3k7y3q202l3mcl4sal2lam3man3mao3map3mar3mas2lat4wau1vav3maw3say4waz2lbk2sbl3s'fof'6obo2lbp3mbq2xbr1tbs2lbu1zbv3mbz2wck4s202k3mcm4scn4sco4scp4scq5tcr4mcs3xct3xcu3xcv3xcw2l2m2tcy2lcz2ldl4sdm4sdn4sdo4sdp4sdq4sds4sdt4sdu4sdv4sdw4sdz3mek2wel2wem2wen2weo2wep2weq4mer2wes2wet2weu2wev2wew1wex1wey1wez1wfl3mfm3mfn3mfo3mfp3mfq3mfr3sfs3mft3mfu3mfv3mfw3mfz3m203k6o212m6m2dw2l2cq2l3t3m3u1w17s4s19m3m}'kerning'{cl{4qs5ku17sw5ou5qy5rw201ss5tw201ws}201s{201ss}201t{ckw4lwcmwcnwcowcpwclw4wu201ts}2k{201ts}2w{4qs5kw5os5qx5ru17sx5tx}2x{17sw5tw5ou5qu}2y{4qs5kw5os5qx5ru17sx5tx}'fof'-6o7t{ckuclucmucnucoucpu4lu5os5rs}3u{17su5tu5qs}3v{17su5tu5qs}7p{17sw5tw5qs}ck{4qs5ku17sw5ou5qy5rw201ss5tw201ws}4l{4qs5ku17sw5ou5qy5rw201ss5tw201ws}cm{4qs5ku17sw5ou5qy5rw201ss5tw201ws}cn{4qs5ku17sw5ou5qy5rw201ss5tw201ws}co{4qs5ku17sw5ou5qy5rw201ss5tw201ws}cp{4qs5ku17sw5ou5qy5rw201ss5tw201ws}6l{17su5tu5os5qw5rs}17s{2ktclvcmvcnvcovcpv4lv4wuckv}5o{ckwclwcmwcnwcowcpw4lw4wu}5q{ckyclycmycnycoycpy4ly4wu5ms}5r{cktcltcmtcntcotcpt4lt4ws}5t{2ktclvcmvcnvcovcpv4lv4wuckv}7q{cksclscmscnscoscps4ls}6p{17su5tu5qw5rs}ek{5qs5rs}el{17su5tu5os5qw5rs}em{17su5tu5os5qs5rs}en{17su5qs5rs}eo{5qs5rs}ep{17su5tu5os5qw5rs}es{5qs}et{17su5tu5qw5rs}eu{17su5tu5qs5rs}ev{5qs}6z{17sv5tv5os5qx5rs}fm{5os5qt5rs}fn{17sv5tv5os5qx5rs}fo{17sv5tv5os5qx5rs}fp{5os5qt5rs}fq{5os5qt5rs}7r{ckuclucmucnucoucpu4lu5os}fs{17sv5tv5os5qx5rs}ft{17ss5ts5qs}fu{17sw5tw5qs}fv{17sw5tw5qs}fw{17ss5ts5qs}fz{ckuclucmucnucoucpu4lu5os5rs}}}"),
"Helvetica-Oblique":d("{'widths'{k3p2q4mcx1w201n3r201o6o201s1q201t1q201u1q201w2l201x2l201y2l2k1w2l1w202m2n2n3r2o3r2p5t202q6o2r1n2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v1w3w3u3x3u3y3u3z3r4k6p4l4m4m4m4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3m4v4m4w3r4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v1w5w1w5x1w5y2z5z3r6k2l6l3r6m3r6n3m6o3r6p3r6q1w6r3r6s3r6t1q6u1q6v3m6w1q6x5n6y3r6z3r7k3r7l3r7m2l7n3m7o1w7p3r7q3m7r4s7s3m7t3m7u3m7v2l7w1u7x2l7y3u202l3rcl4mal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3rbr1wbs2lbu2obv3rbz3xck4m202k3rcm4mcn4mco4mcp4mcq6ocr4scs4mct4mcu4mcv4mcw1w2m2ncy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3mes3ret3reu3rev3rew1wex1wey1wez1wfl3rfm3rfn3rfo3rfp3rfq3rfr3ufs3xft3rfu3rfv3rfw3rfz3m203k6o212m6o2dw2l2cq2l3t3r3u1w17s4m19m3r}'kerning'{5q{4wv}cl{4qs5kw5ow5qs17sv5tv}201t{2wu4w1k2yu}201x{2wu4wy2yu}17s{2ktclucmucnu4otcpu4lu4wycoucku}2w{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}2x{17sy5ty5oy5qs}2y{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}'fof'-6o7p{17sv5tv5ow}ck{4qs5kw5ow5qs17sv5tv}4l{4qs5kw5ow5qs17sv5tv}cm{4qs5kw5ow5qs17sv5tv}cn{4qs5kw5ow5qs17sv5tv}co{4qs5kw5ow5qs17sv5tv}cp{4qs5kw5ow5qs17sv5tv}6l{17sy5ty5ow}do{17st5tt}4z{17st5tt}7s{fst}dm{17st5tt}dn{17st5tt}5o{ckwclwcmwcnwcowcpw4lw4wv}dp{17st5tt}dq{17st5tt}7t{5ow}ds{17st5tt}5t{2ktclucmucnu4otcpu4lu4wycoucku}fu{17sv5tv5ow}6p{17sy5ty5ow5qs}ek{17sy5ty5ow}el{17sy5ty5ow}em{17sy5ty5ow}en{5ty}eo{17sy5ty5ow}ep{17sy5ty5ow}es{17sy5ty5qs}et{17sy5ty5ow5qs}eu{17sy5ty5ow5qs}ev{17sy5ty5ow5qs}6z{17sy5ty5ow5qs}fm{17sy5ty5ow5qs}fn{17sy5ty5ow5qs}fo{17sy5ty5ow5qs}fp{17sy5ty5qs}fq{17sy5ty5ow5qs}7r{5ow}fs{17sy5ty5ow5qs}ft{17sv5tv5ow}7m{5ow}fv{17sv5tv5ow}fw{17sv5tv5ow}}}")}};
e.events.push(["addFonts",function(d){var e,k,b,a;for(k in d.fonts)if(d.fonts.hasOwnProperty(k)){e=d.fonts[k];if(b=c.Unicode[e.PostScriptName])a=e.metadata.Unicode?e.metadata.Unicode:e.metadata.Unicode={},a.widths=b.widths,a.kerning=b.kerning;if(b=l.Unicode[e.PostScriptName])a=e.metadata.Unicode?e.metadata.Unicode:e.metadata.Unicode={},a.encoding=b,b.codePages&&b.codePages.length&&(e.encoding=b.codePages[0])}}])})(jsPDF.API);
(function(e){var d,m,l,c,g={x:void 0,y:void 0,w:void 0,h:void 0,ln:void 0},q=1;e.setHeaderFunction=function(d){c=d};e.getTextDimensions=function(c){d=this.internal.getFont().fontName;m=this.internal.getFontSize();l=this.internal.getFont().fontStyle;var b=19.049976/25.4,a;a=document.createElement("font");a.id="jsPDFCell";a.style.fontStyle=l;a.style.fontName=d;a.style.fontSize=m+"pt";a.innerText=c;document.body.appendChild(a);c={w:(a.offsetWidth+1)*b,h:(a.offsetHeight+1)*b};document.body.removeChild(a);
return c};e.cellAddPage=function(){this.addPage();g={x:void 0,y:void 0,w:void 0,h:void 0,ln:void 0};q+=1};e.cellInitialize=function(){g={x:void 0,y:void 0,w:void 0,h:void 0,ln:void 0};q=1};e.cell=function(c,b,a,d,e,f,l){var m=g;void 0!==m.ln&&(m.ln===f?(c=m.x+m.w,b=m.y):(m.y+m.h+d+13>=this.internal.pageSize.height&&(this.cellAddPage(),this.printHeaders&&this.tableHeaderRow&&this.printHeaderRow(f)),b=g.y+g.h));if(""!==e[0])if(this.printingHeaderRow?this.rect(c,b,a,d,"FD"):this.rect(c,b,a,d),"right"===
l){if(e instanceof Array)for(l=0;l<e.length;l++){var m=e[l],q=this.getStringUnitWidth(m)*this.internal.getFontSize();this.text(m,c+a-q-3,b+this.internal.getLineHeight()*(l+1))}}else this.text(e,c+3,b+this.internal.getLineHeight());g={x:c,y:b,w:a,h:d,ln:f};return this};e.getKeys="function"===typeof Object.keys?function(c){return c?Object.keys(c):[]}:function(c){var b=[],a;for(a in c)c.hasOwnProperty(a)&&b.push(a);return b};e.arrayMax=function(c,b){var a=c[0],d,e,f;d=0;for(e=c.length;d<e;d+=1)f=c[d],
b?-1===b(a,f)&&(a=f):f>a&&(a=f);return a};e.table=function(c,b,a){var d=[],g=[],f,l,m,q={},E={},r,A,z=[],w,x=[],u;this.lnMod=0;a&&(this.printHeaders=a.printHeaders||!0);if(!c)throw"No data for PDF table";if(void 0===b||null===b)d=this.getKeys(c[0]);else if(b[0]&&"string"!==typeof b[0])for(l=0,m=b.length;l<m;l+=1)f=b[l],d.push(f.name),g.push(f.prompt),E[f.name]=f.width;else d=b;if(a.autoSize)for(u=function(a){return a[f]},l=0,m=d.length;l<m;l+=1){f=d[l];q[f]=c.map(u);z.push(this.getTextDimensions(g[l]||
f).w);A=q[f];w=0;for(m=A.length;w<m;w+=1)r=A[w],z.push(this.getTextDimensions(r).w);E[f]=e.arrayMax(z)}if(a.printHeaders){a=this.calculateLineHeight(d,E,g.length?g:d);l=0;for(m=d.length;l<m;l+=1)f=d[l],x.push([13,13,E[f],a,String(g.length?g[l]:f)]);this.setTableHeaderRow(x);this.printHeaderRow(1)}l=0;for(m=c.length;l<m;l+=1)for(g=c[l],a=this.calculateLineHeight(d,E,g),w=0,x=d.length;w<x;w+=1)f=d[w],this.cell(13,13,E[f],a,g[f],l+2,b[w].align);return this};e.calculateLineHeight=function(c,b,a){for(var d,
e=0,g=0;g<c.length;g++)d=c[g],a[d]=this.splitTextToSize(String(a[d]),b[d]-3),d=this.internal.getLineHeight()*a[d].length+3,d>e&&(e=d);return e};e.setTableHeaderRow=function(c){this.tableHeaderRow=c};e.printHeaderRow=function(d){if(!this.tableHeaderRow)throw"Property tableHeaderRow does not exist.";var b,a,e;this.printingHeaderRow=!0;void 0!==c&&(a=c(this,q),g={x:a[0],y:a[1],w:a[2],h:a[3],ln:-1});this.setFontStyle("bold");a=0;for(e=this.tableHeaderRow.length;a<e;a+=1)this.setFillColor(200,200,200),
b=this.tableHeaderRow[a],b=[].concat(b),this.cell.apply(this,b.concat(d));this.setFontStyle("normal");this.printingHeaderRow=!1}})(jsPDF.API);(function(e){e.putTotalPages=function(d){d=RegExp(d,"g");for(var e=1;e<=this.internal.getNumberOfPages();e++)for(var l=0;l<this.internal.pages[e].length;l++)this.internal.pages[e][l]=this.internal.pages[e][l].replace(d,this.internal.getNumberOfPages());return this}})(jsPDF.API);
var BlobBuilder=BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder||function(e){var d=function(a){return Object.prototype.toString.call(a).match(/^\[object\s(.*)\]$/)[1]},m=function(){this.data=[]},l=function(a,b,c){this.data=a;this.size=a.length;this.type=b;this.encoding=c},c=m.prototype,g=l.prototype,q=e.FileReaderSync,k=function(a){this.code=this[this.name=a]},b="NOT_FOUND_ERR SECURITY_ERR ABORT_ERR NOT_READABLE_ERR ENCODING_ERR NO_MODIFICATION_ALLOWED_ERR INVALID_STATE_ERR SYNTAX_ERR".split(" "),
a=b.length,h=e.URL||e.webkitURL||e,G=h.createObjectURL,f=h.revokeObjectURL,p=h,I=e.btoa,F=e.atob,E=!1,r=function(a){E=!a},A=e.ArrayBuffer,z=e.Uint8Array;for(m.fake=g.fake=!0;a--;)k.prototype[b[a]]=a+1;try{z&&r.apply(0,new z(1))}catch(w){}h.createObjectURL||(p=e.URL={});p.createObjectURL=function(a){var b=a.type;null===b&&(b="application/octet-stream");if(a instanceof l)return b="data:"+b,"base64"===a.encoding?b+";base64,"+a.data:"URI"===a.encoding?b+","+decodeURIComponent(a.data):I?b+";base64,"+I(a.data):
b+","+encodeURIComponent(a.data);if(G)return G.call(h,a)};p.revokeObjectURL=function(a){"data:"!==a.substring(0,5)&&f&&f.call(h,a)};c.append=function(a){var b=this.data;if(z&&a instanceof A)if(E)b.push(String.fromCharCode.apply(String,new z(a)));else{b="";a=new z(a);for(var c=0,e=a.length;c<e;c++)b+=String.fromCharCode(a[c])}else if("Blob"===d(a)||"File"===d(a))if(q)c=new q,b.push(c.readAsBinaryString(a));else throw new k("NOT_READABLE_ERR");else a instanceof l?"base64"===a.encoding&&F?b.push(F(a.data)):
"URI"===a.encoding?b.push(decodeURIComponent(a.data)):"raw"===a.encoding&&b.push(a.data):("string"!==typeof a&&(a+=""),b.push(unescape(encodeURIComponent(a))))};c.getBlob=function(a){arguments.length||(a=null);return new l(this.data.join(""),a,"raw")};c.toString=function(){return"[object BlobBuilder]"};g.slice=function(a,b,c){var d=arguments.length;3>d&&(c=null);return new l(this.data.slice(a,1<d?b:this.data.length),c,this.encoding)};g.toString=function(){return"[object Blob]"};return m}(self),saveAs=
saveAs||navigator.msSaveBlob&&navigator.msSaveBlob.bind(navigator)||function(e){var d=e.document,m=e.URL||e.webkitURL||e,l=d.createElementNS("http://www.w3.org/1999/xhtml","a"),c="download"in l,g=function(a){var b=d.createEvent("MouseEvents");b.initMouseEvent("click",!0,!1,e,0,0,0,0,0,!1,!1,!1,!1,0,null);return a.dispatchEvent(b)},q=e.webkitRequestFileSystem,k=e.requestFileSystem||q||e.mozRequestFileSystem,b=function(a){(e.setImmediate||e.setTimeout)(function(){throw a;},0)},a=0,h=[],G=function(a,
c,d){c=[].concat(c);for(var e=c.length;e--;){var g=a["on"+c[e]];if("function"===typeof g)try{g.call(a,d||a)}catch(f){b(f)}}},f=function(b,d){var f=this,m=b.type,p=!1,z,w,x=function(){var a=(e.URL||e.webkitURL||e).createObjectURL(b);h.push(a);return a},u=function(){G(f,["writestart","progress","write","writeend"])},s=function(){if(p||!z)z=x(b);w&&(w.location.href=z);f.readyState=f.DONE;u()},J=function(a){return function(){if(f.readyState!==f.DONE)return a.apply(this,arguments)}},y={create:!0,exclusive:!1},
U;f.readyState=f.INIT;d||(d="download");if(c&&(z=x(b),l.href=z,l.download=d,g(l))){f.readyState=f.DONE;u();return}e.chrome&&(m&&"application/octet-stream"!==m)&&(U=b.slice||b.webkitSlice,b=U.call(b,0,b.size,"application/octet-stream"),p=!0);q&&"download"!==d&&(d+=".download");w="application/octet-stream"===m||q?e:e.open();k?(a+=b.size,k(e.TEMPORARY,a,J(function(a){a.root.getDirectory("saved",y,J(function(a){var c=function(){a.getFile(d,y,J(function(a){a.createWriter(J(function(c){c.onwriteend=function(b){w.location.href=
a.toURL();h.push(a);f.readyState=f.DONE;G(f,"writeend",b)};c.onerror=function(){var a=c.error;a.code!==a.ABORT_ERR&&s()};["writestart","progress","write","abort"].forEach(function(a){c["on"+a]=f["on"+a]});c.write(b);f.abort=function(){c.abort();f.readyState=f.DONE};f.readyState=f.WRITING}),s)}),s)};a.getFile(d,{create:!1},J(function(a){a.remove();c()}),J(function(a){a.code===a.NOT_FOUND_ERR?c():s()}))}),s)}),s)):s()},p=f.prototype;p.abort=function(){this.readyState=this.DONE;G(this,"abort")};p.readyState=
p.INIT=0;p.WRITING=1;p.DONE=2;p.error=p.onwritestart=p.onprogress=p.onwrite=p.onabort=p.onerror=p.onwriteend=null;e.addEventListener("unload",function(){for(var a=h.length;a--;){var b=h[a];"string"===typeof b?m.revokeObjectURL(b):b.remove()}h.length=0},!1);return function(a,b){return new f(a,b)}}(self),MAX_BITS=15,D_CODES=30,BL_CODES=19,LENGTH_CODES=29,LITERALS=256,L_CODES=LITERALS+1+LENGTH_CODES,HEAP_SIZE=2*L_CODES+1,END_BLOCK=256,MAX_BL_BITS=7,REP_3_6=16,REPZ_3_10=17,REPZ_11_138=18,Buf_size=16,
Z_DEFAULT_COMPRESSION=-1,Z_FILTERED=1,Z_HUFFMAN_ONLY=2,Z_DEFAULT_STRATEGY=0,Z_NO_FLUSH=0,Z_PARTIAL_FLUSH=1,Z_FULL_FLUSH=3,Z_FINISH=4,Z_OK=0,Z_STREAM_END=1,Z_NEED_DICT=2,Z_STREAM_ERROR=-2,Z_DATA_ERROR=-3,Z_BUF_ERROR=-5,_dist_code=[0,1,2,3,4,4,5,5,6,6,6,6,7,7,7,7,8,8,8,8,8,8,8,8,9,9,9,9,9,9,9,9,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,13,13,13,13,13,
13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,0,0,16,17,18,18,19,19,20,20,20,20,21,
21,21,21,22,22,22,22,22,22,22,22,23,23,23,23,23,23,23,23,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,
28,28,28,28,28,28,28,28,28,28,28,28,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29];
function Tree(){var e=this;e.build_tree=function(d){var m=e.dyn_tree,l=e.stat_desc.static_tree,c=e.stat_desc.elems,g,q=-1,k;d.heap_len=0;d.heap_max=HEAP_SIZE;for(g=0;g<c;g++)0!==m[2*g]?(d.heap[++d.heap_len]=q=g,d.depth[g]=0):m[2*g+1]=0;for(;2>d.heap_len;)k=d.heap[++d.heap_len]=2>q?++q:0,m[2*k]=1,d.depth[k]=0,d.opt_len--,l&&(d.static_len-=l[2*k+1]);e.max_code=q;for(g=Math.floor(d.heap_len/2);1<=g;g--)d.pqdownheap(m,g);k=c;do g=d.heap[1],d.heap[1]=d.heap[d.heap_len--],d.pqdownheap(m,1),l=d.heap[1],
d.heap[--d.heap_max]=g,d.heap[--d.heap_max]=l,m[2*k]=m[2*g]+m[2*l],d.depth[k]=Math.max(d.depth[g],d.depth[l])+1,m[2*g+1]=m[2*l+1]=k,d.heap[1]=k++,d.pqdownheap(m,1);while(2<=d.heap_len);d.heap[--d.heap_max]=d.heap[1];g=e.dyn_tree;for(var q=e.stat_desc.static_tree,b=e.stat_desc.extra_bits,a=e.stat_desc.extra_base,h=e.stat_desc.max_length,G,f,p=0,c=0;c<=MAX_BITS;c++)d.bl_count[c]=0;g[2*d.heap[d.heap_max]+1]=0;for(k=d.heap_max+1;k<HEAP_SIZE;k++)l=d.heap[k],c=g[2*g[2*l+1]+1]+1,c>h&&(c=h,p++),g[2*l+1]=
c,l>e.max_code||(d.bl_count[c]++,G=0,l>=a&&(G=b[l-a]),f=g[2*l],d.opt_len+=f*(c+G),q&&(d.static_len+=f*(q[2*l+1]+G)));if(0!==p){do{for(c=h-1;0===d.bl_count[c];)c--;d.bl_count[c]--;d.bl_count[c+1]+=2;d.bl_count[h]--;p-=2}while(0<p);for(c=h;0!==c;c--)for(l=d.bl_count[c];0!==l;)q=d.heap[--k],q>e.max_code||(g[2*q+1]!=c&&(d.opt_len+=(c-g[2*q+1])*g[2*q],g[2*q+1]=c),l--)}g=e.max_code;k=d.bl_count;d=[];l=0;for(c=1;c<=MAX_BITS;c++)d[c]=l=l+k[c-1]<<1;for(k=0;k<=g;k++)if(b=m[2*k+1],0!==b){l=m;c=2*k;q=d[b]++;
a=0;do a|=q&1,q>>>=1,a<<=1;while(0<--b);l[c]=a>>>1}}}
Tree._length_code=[0,1,2,3,4,5,6,7,8,8,9,9,10,10,11,11,12,12,12,12,13,13,13,13,14,14,14,14,15,15,15,15,16,16,16,16,16,16,16,16,17,17,17,17,17,17,17,17,18,18,18,18,18,18,18,18,19,19,19,19,19,19,19,19,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,25,25,25,25,25,
25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,28];Tree.base_length=[0,1,2,3,4,5,6,7,8,10,12,14,16,20,24,28,32,40,48,56,64,80,96,112,128,160,192,224,0];Tree.base_dist=[0,1,2,3,4,6,8,12,16,24,32,48,64,96,128,192,256,384,512,768,1024,1536,2048,3072,4096,6144,8192,12288,16384,24576];
Tree.d_code=function(e){return 256>e?_dist_code[e]:_dist_code[256+(e>>>7)]};Tree.extra_lbits=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0];Tree.extra_dbits=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13];Tree.extra_blbits=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7];Tree.bl_order=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];function StaticTree(e,d,m,l,c){this.static_tree=e;this.extra_bits=d;this.extra_base=m;this.elems=l;this.max_length=c}
StaticTree.static_ltree=[12,8,140,8,76,8,204,8,44,8,172,8,108,8,236,8,28,8,156,8,92,8,220,8,60,8,188,8,124,8,252,8,2,8,130,8,66,8,194,8,34,8,162,8,98,8,226,8,18,8,146,8,82,8,210,8,50,8,178,8,114,8,242,8,10,8,138,8,74,8,202,8,42,8,170,8,106,8,234,8,26,8,154,8,90,8,218,8,58,8,186,8,122,8,250,8,6,8,134,8,70,8,198,8,38,8,166,8,102,8,230,8,22,8,150,8,86,8,214,8,54,8,182,8,118,8,246,8,14,8,142,8,78,8,206,8,46,8,174,8,110,8,238,8,30,8,158,8,94,8,222,8,62,8,190,8,126,8,254,8,1,8,129,8,65,8,193,8,33,8,161,
8,97,8,225,8,17,8,145,8,81,8,209,8,49,8,177,8,113,8,241,8,9,8,137,8,73,8,201,8,41,8,169,8,105,8,233,8,25,8,153,8,89,8,217,8,57,8,185,8,121,8,249,8,5,8,133,8,69,8,197,8,37,8,165,8,101,8,229,8,21,8,149,8,85,8,213,8,53,8,181,8,117,8,245,8,13,8,141,8,77,8,205,8,45,8,173,8,109,8,237,8,29,8,157,8,93,8,221,8,61,8,189,8,125,8,253,8,19,9,275,9,147,9,403,9,83,9,339,9,211,9,467,9,51,9,307,9,179,9,435,9,115,9,371,9,243,9,499,9,11,9,267,9,139,9,395,9,75,9,331,9,203,9,459,9,43,9,299,9,171,9,427,9,107,9,363,9,235,
9,491,9,27,9,283,9,155,9,411,9,91,9,347,9,219,9,475,9,59,9,315,9,187,9,443,9,123,9,379,9,251,9,507,9,7,9,263,9,135,9,391,9,71,9,327,9,199,9,455,9,39,9,295,9,167,9,423,9,103,9,359,9,231,9,487,9,23,9,279,9,151,9,407,9,87,9,343,9,215,9,471,9,55,9,311,9,183,9,439,9,119,9,375,9,247,9,503,9,15,9,271,9,143,9,399,9,79,9,335,9,207,9,463,9,47,9,303,9,175,9,431,9,111,9,367,9,239,9,495,9,31,9,287,9,159,9,415,9,95,9,351,9,223,9,479,9,63,9,319,9,191,9,447,9,127,9,383,9,255,9,511,9,0,7,64,7,32,7,96,7,16,7,80,7,
48,7,112,7,8,7,72,7,40,7,104,7,24,7,88,7,56,7,120,7,4,7,68,7,36,7,100,7,20,7,84,7,52,7,116,7,3,8,131,8,67,8,195,8,35,8,163,8,99,8,227,8];StaticTree.static_dtree=[0,5,16,5,8,5,24,5,4,5,20,5,12,5,28,5,2,5,18,5,10,5,26,5,6,5,22,5,14,5,30,5,1,5,17,5,9,5,25,5,5,5,21,5,13,5,29,5,3,5,19,5,11,5,27,5,7,5,23,5];StaticTree.static_l_desc=new StaticTree(StaticTree.static_ltree,Tree.extra_lbits,LITERALS+1,L_CODES,MAX_BITS);
StaticTree.static_d_desc=new StaticTree(StaticTree.static_dtree,Tree.extra_dbits,0,D_CODES,MAX_BITS);StaticTree.static_bl_desc=new StaticTree(null,Tree.extra_blbits,0,BL_CODES,MAX_BL_BITS);var MAX_MEM_LEVEL=9,DEF_MEM_LEVEL=8;function Config(e,d,m,l,c){this.good_length=e;this.max_lazy=d;this.nice_length=m;this.max_chain=l;this.func=c}
var STORED=0,FAST=1,SLOW=2,config_table=[new Config(0,0,0,0,STORED),new Config(4,4,8,4,FAST),new Config(4,5,16,8,FAST),new Config(4,6,32,32,FAST),new Config(4,4,16,16,SLOW),new Config(8,16,32,32,SLOW),new Config(8,16,128,128,SLOW),new Config(8,32,128,256,SLOW),new Config(32,128,258,1024,SLOW),new Config(32,258,258,4096,SLOW)],z_errmsg="need dictionary;stream end;;;stream error;data error;;buffer error;;".split(";"),NeedMore=0,BlockDone=1,FinishStarted=2,FinishDone=3,PRESET_DICT=32,INIT_STATE=42,BUSY_STATE=
113,FINISH_STATE=666,Z_DEFLATED=8,STORED_BLOCK=0,STATIC_TREES=1,DYN_TREES=2,MIN_MATCH=3,MAX_MATCH=258,MIN_LOOKAHEAD=MAX_MATCH+MIN_MATCH+1;function smaller(e,d,m,l){var c=e[2*d];e=e[2*m];return c<e||c==e&&l[d]<=l[m]}
function Deflate(){function e(){var a;for(a=0;a<L_CODES;a++)W[2*a]=0;for(a=0;a<D_CODES;a++)Y[2*a]=0;for(a=0;a<BL_CODES;a++)P[2*a]=0;W[2*END_BLOCK]=1;T=ma=r.opt_len=r.static_len=0}function d(a,b){var c,d=-1,e,f=a[1],g=0,h=7,k=4;0===f&&(h=138,k=3);a[2*(b+1)+1]=65535;for(c=0;c<=b;c++)e=f,f=a[2*(c+1)+1],++g<h&&e==f||(g<k?P[2*e]+=g:0!==e?(e!=d&&P[2*e]++,P[2*REP_3_6]++):10>=g?P[2*REPZ_3_10]++:P[2*REPZ_11_138]++,g=0,d=e,0===f?(h=138,k=3):e==f?(h=6,k=3):(h=7,k=4))}function m(a){r.pending_buf[r.pending++]=
a}function l(a){m(a&255);m(a>>>8&255)}function c(a,b){M>Buf_size-b?(Q|=a<<M&65535,l(Q),Q=a>>>Buf_size-M,M+=b-Buf_size):(Q|=a<<M&65535,M+=b)}function g(a,b){var d=2*a;c(b[d]&65535,b[d+1]&65535)}function q(a,b){var d,e=-1,f,h=a[1],k=0,l=7,m=4;0===h&&(l=138,m=3);for(d=0;d<=b;d++)if(f=h,h=a[2*(d+1)+1],!(++k<l&&f==h)){if(k<m){do g(f,P);while(0!==--k)}else 0!==f?(f!=e&&(g(f,P),k--),g(REP_3_6,P),c(k-3,2)):10>=k?(g(REPZ_3_10,P),c(k-3,3)):(g(REPZ_11_138,P),c(k-11,7));k=0;e=f;0===h?(l=138,m=3):f==h?(l=6,m=
3):(l=7,m=4)}}function k(){16==M?(l(Q),M=Q=0):8<=M&&(m(Q&255),Q>>>=8,M-=8)}function b(a,b){var c,d,e;r.pending_buf[ga+2*T]=a>>>8&255;r.pending_buf[ga+2*T+1]=a&255;r.pending_buf[la+T]=b&255;T++;0===a?W[2*b]++:(ma++,a--,W[2*(Tree._length_code[b]+LITERALS+1)]++,Y[2*Tree.d_code(a)]++);if(0===(T&8191)&&2<N){c=8*T;d=t-R;for(e=0;e<D_CODES;e++)c+=Y[2*e]*(5+Tree.extra_dbits[e]);if(ma<Math.floor(T/2)&&c>>>3<Math.floor(d/2))return!0}return T==ba-1}function a(a,b){var d,e,f=0,h,k;if(0!==T){do d=r.pending_buf[ga+
2*f]<<8&65280|r.pending_buf[ga+2*f+1]&255,e=r.pending_buf[la+f]&255,f++,0===d?g(e,a):(h=Tree._length_code[e],g(h+LITERALS+1,a),k=Tree.extra_lbits[h],0!==k&&(e-=Tree.base_length[h],c(e,k)),d--,h=Tree.d_code(d),g(h,b),k=Tree.extra_dbits[h],0!==k&&(d-=Tree.base_dist[h],c(d,k)));while(f<T)}g(END_BLOCK,a);ha=a[2*END_BLOCK+1]}function h(){8<M?l(Q):0<M&&m(Q&255);M=Q=0}function G(a,b,d){c((STORED_BLOCK<<1)+(d?1:0),3);h();ha=8;l(b);l(~b);r.pending_buf.set(y.subarray(a,a+b),r.pending);r.pending+=b}function f(b){var f=
0<=R?R:-1,g=t-R,k,l,m=0;if(0<N){ea.build_tree(r);fa.build_tree(r);d(W,ea.max_code);d(Y,fa.max_code);ka.build_tree(r);for(m=BL_CODES-1;3<=m&&0===P[2*Tree.bl_order[m]+1];m--);r.opt_len+=3*(m+1)+14;k=r.opt_len+3+7>>>3;l=r.static_len+3+7>>>3;l<=k&&(k=l)}else k=l=g+5;if(g+4<=k&&-1!=f)G(f,g,b);else if(l==k)c((STATIC_TREES<<1)+(b?1:0),3),a(StaticTree.static_ltree,StaticTree.static_dtree);else{c((DYN_TREES<<1)+(b?1:0),3);f=ea.max_code+1;g=fa.max_code+1;m+=1;c(f-257,5);c(g-1,5);c(m-4,4);for(k=0;k<m;k++)c(P[2*
Tree.bl_order[k]+1],3);q(W,f-1);q(Y,g-1);a(W,Y)}e();b&&h();R=t;A.flush_pending()}function p(){var a,b,c,d;do{d=U-D-t;if(0===d&&0===t&&0===D)d=u;else if(-1==d)d--;else if(t>=u+u-MIN_LOOKAHEAD){y.set(y.subarray(u,u+u),0);X-=u;t-=u;R-=u;c=a=v;do b=H[--c]&65535,H[c]=b>=u?b-u:0;while(0!==--a);c=a=u;do b=B[--c]&65535,B[c]=b>=u?b-u:0;while(0!==--a);d+=u}if(0===A.avail_in)break;a=A.read_buf(y,t+D,d);D+=a;D>=MIN_MATCH&&(C=y[t]&255,C=(C<<O^y[t+1]&255)&n)}while(D<MIN_LOOKAHEAD&&0!==A.avail_in)}function I(a){var b=
65535,c;for(b>w-5&&(b=w-5);;){if(1>=D){p();if(0===D&&a==Z_NO_FLUSH)return NeedMore;if(0===D)break}t+=D;D=0;c=R+b;if(0===t||t>=c)if(D=t-c,t=c,f(!1),0===A.avail_out)return NeedMore;if(t-R>=u-MIN_LOOKAHEAD&&(f(!1),0===A.avail_out))return NeedMore}f(a==Z_FINISH);return 0===A.avail_out?a==Z_FINISH?FinishStarted:NeedMore:a==Z_FINISH?FinishDone:BlockDone}function F(a){var b=Z,c=t,d,e=L,f=t>u-MIN_LOOKAHEAD?t-(u-MIN_LOOKAHEAD):0,g=ja,h=J,k=t+MAX_MATCH,l=y[c+e-1],m=y[c+e];L>=ia&&(b>>=2);g>D&&(g=D);do if(d=
a,y[d+e]==m&&y[d+e-1]==l&&y[d]==y[c]&&y[++d]==y[c+1]){c+=2;d++;do;while(y[++c]==y[++d]&&y[++c]==y[++d]&&y[++c]==y[++d]&&y[++c]==y[++d]&&y[++c]==y[++d]&&y[++c]==y[++d]&&y[++c]==y[++d]&&y[++c]==y[++d]&&c<k);d=MAX_MATCH-(k-c);c=k-MAX_MATCH;if(d>e){X=a;e=d;if(d>=g)break;l=y[c+e-1];m=y[c+e]}}while((a=B[a&h]&65535)>f&&0!==--b);return e<=D?e:D}function E(a){for(var c=0,d,e;;){if(D<MIN_LOOKAHEAD){p();if(D<MIN_LOOKAHEAD&&a==Z_NO_FLUSH)return NeedMore;if(0===D)break}D>=MIN_MATCH&&(C=(C<<O^y[t+(MIN_MATCH-1)]&
255)&n,c=H[C]&65535,B[t&J]=H[C],H[C]=t);L=K;da=X;K=MIN_MATCH-1;0!==c&&(L<aa&&(t-c&65535)<=u-MIN_LOOKAHEAD)&&(ca!=Z_HUFFMAN_ONLY&&(K=F(c)),5>=K&&(ca==Z_FILTERED||K==MIN_MATCH&&4096<t-X)&&(K=MIN_MATCH-1));if(L>=MIN_MATCH&&K<=L){e=t+D-MIN_MATCH;d=b(t-1-da,L-MIN_MATCH);D-=L-1;L-=2;do++t<=e&&(C=(C<<O^y[t+(MIN_MATCH-1)]&255)&n,c=H[C]&65535,B[t&J]=H[C],H[C]=t);while(0!==--L);S=0;K=MIN_MATCH-1;t++;if(d&&(f(!1),0===A.avail_out))return NeedMore}else if(0!==S){if((d=b(0,y[t-1]&255))&&f(!1),t++,D--,0===A.avail_out)return NeedMore}else S=
1,t++,D--}0!==S&&(b(0,y[t-1]&255),S=0);f(a==Z_FINISH);return 0===A.avail_out?a==Z_FINISH?FinishStarted:NeedMore:a==Z_FINISH?FinishDone:BlockDone}var r=this,A,z,w,x,u,s,J,y,U,B,H,C,v,V,n,O,R,K,da,S,t,X,D,L,Z,aa,N,ca,ia,ja,W,Y,P,ea=new Tree,fa=new Tree,ka=new Tree;r.depth=[];var la,ba,T,ga,ma,ha,Q,M;r.bl_count=[];r.heap=[];W=[];Y=[];P=[];r.pqdownheap=function(a,b){for(var c=r.heap,d=c[b],e=b<<1;e<=r.heap_len;){e<r.heap_len&&smaller(a,c[e+1],c[e],r.depth)&&e++;if(smaller(a,d,c[e],r.depth))break;c[b]=
c[e];b=e;e<<=1}c[b]=d};r.deflateInit=function(a,b,c,d,f,g){d||(d=Z_DEFLATED);f||(f=DEF_MEM_LEVEL);g||(g=Z_DEFAULT_STRATEGY);a.msg=null;b==Z_DEFAULT_COMPRESSION&&(b=6);if(1>f||f>MAX_MEM_LEVEL||d!=Z_DEFLATED||9>c||15<c||0>b||9<b||0>g||g>Z_HUFFMAN_ONLY)return Z_STREAM_ERROR;a.dstate=r;s=c;u=1<<s;J=u-1;V=f+7;v=1<<V;n=v-1;O=Math.floor((V+MIN_MATCH-1)/MIN_MATCH);y=new Uint8Array(2*u);B=[];H=[];ba=1<<f+6;r.pending_buf=new Uint8Array(4*ba);w=4*ba;ga=Math.floor(ba/2);la=3*ba;N=b;ca=g;a.total_in=a.total_out=
0;a.msg=null;r.pending=0;r.pending_out=0;z=BUSY_STATE;x=Z_NO_FLUSH;ea.dyn_tree=W;ea.stat_desc=StaticTree.static_l_desc;fa.dyn_tree=Y;fa.stat_desc=StaticTree.static_d_desc;ka.dyn_tree=P;ka.stat_desc=StaticTree.static_bl_desc;M=Q=0;ha=8;e();U=2*u;for(a=H[v-1]=0;a<v-1;a++)H[a]=0;aa=config_table[N].max_lazy;ia=config_table[N].good_length;ja=config_table[N].nice_length;Z=config_table[N].max_chain;D=R=t=0;K=L=MIN_MATCH-1;C=S=0;return Z_OK};r.deflateEnd=function(){if(z!=INIT_STATE&&z!=BUSY_STATE&&z!=FINISH_STATE)return Z_STREAM_ERROR;
y=B=H=r.pending_buf=null;r.dstate=null;return z==BUSY_STATE?Z_DATA_ERROR:Z_OK};r.deflateParams=function(a,b,c){var d=Z_OK;b==Z_DEFAULT_COMPRESSION&&(b=6);if(0>b||9<b||0>c||c>Z_HUFFMAN_ONLY)return Z_STREAM_ERROR;config_table[N].func!=config_table[b].func&&0!==a.total_in&&(d=a.deflate(Z_PARTIAL_FLUSH));N!=b&&(N=b,aa=config_table[N].max_lazy,ia=config_table[N].good_length,ja=config_table[N].nice_length,Z=config_table[N].max_chain);ca=c;return d};r.deflateSetDictionary=function(a,b,c){a=c;var d=0;if(!b||
z!=INIT_STATE)return Z_STREAM_ERROR;if(a<MIN_MATCH)return Z_OK;a>u-MIN_LOOKAHEAD&&(a=u-MIN_LOOKAHEAD,d=c-a);y.set(b.subarray(d,d+a),0);R=t=a;C=y[0]&255;C=(C<<O^y[1]&255)&n;for(b=0;b<=a-MIN_MATCH;b++)C=(C<<O^y[b+(MIN_MATCH-1)]&255)&n,B[b&J]=H[C],H[C]=b;return Z_OK};r.deflate=function(a,d){var e,h,l;if(d>Z_FINISH||0>d)return Z_STREAM_ERROR;if(!a.next_out||!a.next_in&&0!==a.avail_in||z==FINISH_STATE&&d!=Z_FINISH)return a.msg=z_errmsg[Z_NEED_DICT-Z_STREAM_ERROR],Z_STREAM_ERROR;if(0===a.avail_out)return a.msg=
z_errmsg[Z_NEED_DICT-Z_BUF_ERROR],Z_BUF_ERROR;A=a;e=x;x=d;z==INIT_STATE&&(h=Z_DEFLATED+(s-8<<4)<<8,l=(N-1&255)>>1,3<l&&(l=3),h|=l<<6,0!==t&&(h|=PRESET_DICT),z=BUSY_STATE,h+=31-h%31,m(h>>8&255),m(h&255));if(0!==r.pending){if(A.flush_pending(),0===A.avail_out)return x=-1,Z_OK}else if(0===A.avail_in&&d<=e&&d!=Z_FINISH)return A.msg=z_errmsg[Z_NEED_DICT-Z_BUF_ERROR],Z_BUF_ERROR;if(z==FINISH_STATE&&0!==A.avail_in)return a.msg=z_errmsg[Z_NEED_DICT-Z_BUF_ERROR],Z_BUF_ERROR;if(0!==A.avail_in||0!==D||d!=Z_NO_FLUSH&&
z!=FINISH_STATE){e=-1;switch(config_table[N].func){case STORED:e=I(d);break;case FAST:a:{for(e=0;;){if(D<MIN_LOOKAHEAD){p();if(D<MIN_LOOKAHEAD&&d==Z_NO_FLUSH){e=NeedMore;break a}if(0===D)break}D>=MIN_MATCH&&(C=(C<<O^y[t+(MIN_MATCH-1)]&255)&n,e=H[C]&65535,B[t&J]=H[C],H[C]=t);0!==e&&(t-e&65535)<=u-MIN_LOOKAHEAD&&ca!=Z_HUFFMAN_ONLY&&(K=F(e));if(K>=MIN_MATCH)if(h=b(t-X,K-MIN_MATCH),D-=K,K<=aa&&D>=MIN_MATCH){K--;do t++,C=(C<<O^y[t+(MIN_MATCH-1)]&255)&n,e=H[C]&65535,B[t&J]=H[C],H[C]=t;while(0!==--K);t++}else t+=
K,K=0,C=y[t]&255,C=(C<<O^y[t+1]&255)&n;else h=b(0,y[t]&255),D--,t++;if(h&&(f(!1),0===A.avail_out)){e=NeedMore;break a}}f(d==Z_FINISH);e=0===A.avail_out?d==Z_FINISH?FinishStarted:NeedMore:d==Z_FINISH?FinishDone:BlockDone}break;case SLOW:e=E(d)}if(e==FinishStarted||e==FinishDone)z=FINISH_STATE;if(e==NeedMore||e==FinishStarted)return 0===A.avail_out&&(x=-1),Z_OK;if(e==BlockDone){if(d==Z_PARTIAL_FLUSH)c(STATIC_TREES<<1,3),g(END_BLOCK,StaticTree.static_ltree),k(),9>1+ha+10-M&&(c(STATIC_TREES<<1,3),g(END_BLOCK,
StaticTree.static_ltree),k()),ha=7;else if(G(0,0,!1),d==Z_FULL_FLUSH)for(e=0;e<v;e++)H[e]=0;A.flush_pending();if(0===A.avail_out)return x=-1,Z_OK}}return d!=Z_FINISH?Z_OK:Z_STREAM_END}}function ZStream(){this.total_out=this.avail_out=this.total_in=this.avail_in=this.next_out_index=this.next_in_index=0}
ZStream.prototype={deflateInit:function(e,d){this.dstate=new Deflate;d||(d=MAX_BITS);return this.dstate.deflateInit(this,e,d)},deflate:function(e){return this.dstate?this.dstate.deflate(this,e):Z_STREAM_ERROR},deflateEnd:function(){if(!this.dstate)return Z_STREAM_ERROR;var e=this.dstate.deflateEnd();this.dstate=null;return e},deflateParams:function(e,d){return this.dstate?this.dstate.deflateParams(this,e,d):Z_STREAM_ERROR},deflateSetDictionary:function(e,d){return this.dstate?this.dstate.deflateSetDictionary(this,
e,d):Z_STREAM_ERROR},read_buf:function(e,d,m){var l=this.avail_in;l>m&&(l=m);if(0===l)return 0;this.avail_in-=l;e.set(this.next_in.subarray(this.next_in_index,this.next_in_index+l),d);this.next_in_index+=l;this.total_in+=l;return l},flush_pending:function(){var e=this.dstate.pending;e>this.avail_out&&(e=this.avail_out);0!==e&&(this.next_out.set(this.dstate.pending_buf.subarray(this.dstate.pending_out,this.dstate.pending_out+e),this.next_out_index),this.next_out_index+=e,this.dstate.pending_out+=e,
this.total_out+=e,this.avail_out-=e,this.dstate.pending-=e,0===this.dstate.pending&&(this.dstate.pending_out=0))}};
function Deflater(e){var d=new ZStream,m=Z_NO_FLUSH,l=new Uint8Array(512);"undefined"==typeof e&&(e=Z_DEFAULT_COMPRESSION);d.deflateInit(e);d.next_out=l;this.append=function(c,e){var q,k=[],b=0,a=0,h=0,G;if(c.length){d.next_in_index=0;d.next_in=c;d.avail_in=c.length;do{d.next_out_index=0;d.avail_out=512;q=d.deflate(m);if(q!=Z_OK)throw"deflating: "+d.msg;d.next_out_index&&(512==d.next_out_index?k.push(new Uint8Array(l)):k.push(new Uint8Array(l.subarray(0,d.next_out_index))));h+=d.next_out_index;e&&
(0<d.next_in_index&&d.next_in_index!=b)&&(e(d.next_in_index),b=d.next_in_index)}while(0<d.avail_in||0===d.avail_out);G=new Uint8Array(h);k.forEach(function(b){G.set(b,a);a+=b.length});return G}};this.flush=function(){var c,e=[],m=0,k=0,b;do{d.next_out_index=0;d.avail_out=512;c=d.deflate(Z_FINISH);if(c!=Z_STREAM_END&&c!=Z_OK)throw"deflating: "+d.msg;0<512-d.avail_out&&e.push(new Uint8Array(l.subarray(0,d.next_out_index)));k+=d.next_out_index}while(0<d.avail_in||0===d.avail_out);d.deflateEnd();b=new Uint8Array(k);
e.forEach(function(a){b.set(a,m);m+=a.length});return b}}
void function(e,d){"object"===typeof module?module.exports=d():"function"===typeof define?define(d):e.adler32cs=d()}(this,function(){var e="function"===typeof ArrayBuffer&&"function"===typeof Uint8Array,d=null,m=function(){if(!e)return function(){return!1};try{var b=require("buffer");"function"===typeof b.Buffer&&(d=b.Buffer)}catch(a){}return function(a){return a instanceof ArrayBuffer||null!==d&&a instanceof d}}(),l=function(){return null!==d?function(b){return(new d(b,"utf8")).toString("binary")}:
function(b){return unescape(encodeURIComponent(b))}}(),c=function(b,a){for(var c=b&65535,d=b>>>16,e=0,g=a.length;e<g;e++)c=(c+(a.charCodeAt(e)&255))%65521,d=(d+c)%65521;return(d<<16|c)>>>0},g=function(b,a){for(var c=b&65535,d=b>>>16,e=0,g=a.length;e<g;e++)c=(c+a[e])%65521,d=(d+c)%65521;return(d<<16|c)>>>0},q={},k=q.Adler32=function(){var b=function(a){if(!(this instanceof b))throw new TypeError("Constructor cannot called be as a function.");if(!isFinite(a=null==a?1:+a))throw Error("First arguments needs to be a finite number.");
this.checksum=a>>>0},a=b.prototype={};a.constructor=b;b.from=function(b){b.prototype=a;return b}(function(a){if(!(this instanceof b))throw new TypeError("Constructor cannot called be as a function.");if(null==a)throw Error("First argument needs to be a string.");this.checksum=c(1,a.toString())});b.fromUtf8=function(b){b.prototype=a;return b}(function(a){if(!(this instanceof b))throw new TypeError("Constructor cannot called be as a function.");if(null==a)throw Error("First argument needs to be a string.");
a=l(a.toString());this.checksum=c(1,a)});e&&(b.fromBuffer=function(b){b.prototype=a;return b}(function(a){if(!(this instanceof b))throw new TypeError("Constructor cannot called be as a function.");if(!m(a))throw Error("First argument needs to be ArrayBuffer.");a=new Uint8Array(a);return this.checksum=g(1,a)}));a.update=function(a){if(null==a)throw Error("First argument needs to be a string.");a=a.toString();return this.checksum=c(this.checksum,a)};a.updateUtf8=function(a){if(null==a)throw Error("First argument needs to be a string.");
a=l(a.toString());return this.checksum=c(this.checksum,a)};e&&(a.updateBuffer=function(a){if(!m(a))throw Error("First argument needs to be ArrayBuffer.");a=new Uint8Array(a);return this.checksum=g(this.checksum,a)});a.clone=function(){return new k(this.checksum)};return b}();q.from=function(b){if(null==b)throw Error("First argument needs to be a string.");return c(1,b.toString())};q.fromUtf8=function(b){if(null==b)throw Error("First argument needs to be a string.");b=l(b.toString());return c(1,b)};
e&&(q.fromBuffer=function(b){if(!m(b))throw Error("First argument need to be ArrayBuffer.");b=new Uint8Array(b);return g(1,b)});return q});

!function(){if(window.define)var a=window.define;if(window.require)var b=window.require;if(window.jQuery&&jQuery.fn&&jQuery.fn.select2&&jQuery.fn.select2.amd)var a=jQuery.fn.select2.amd.define,b=jQuery.fn.select2.amd.require;var c,b,a;!function(d){function e(a,b){return u.call(a,b)}function f(a,b){var c,d,e,f,g,h,i,j,k,l,m,n=b&&b.split("/"),o=s.map,p=o&&o["*"]||{};if(a&&"."===a.charAt(0))if(b){for(n=n.slice(0,n.length-1),a=a.split("/"),g=a.length-1,s.nodeIdCompat&&w.test(a[g])&&(a[g]=a[g].replace(w,"")),a=n.concat(a),k=0;k<a.length;k+=1)if(m=a[k],"."===m)a.splice(k,1),k-=1;else if(".."===m){if(1===k&&(".."===a[2]||".."===a[0]))break;k>0&&(a.splice(k-1,2),k-=2)}a=a.join("/")}else 0===a.indexOf("./")&&(a=a.substring(2));if((n||p)&&o){for(c=a.split("/"),k=c.length;k>0;k-=1){if(d=c.slice(0,k).join("/"),n)for(l=n.length;l>0;l-=1)if(e=o[n.slice(0,l).join("/")],e&&(e=e[d])){f=e,h=k;break}if(f)break;!i&&p&&p[d]&&(i=p[d],j=k)}!f&&i&&(f=i,h=j),f&&(c.splice(0,h,f),a=c.join("/"))}return a}function g(a,b){return function(){return n.apply(d,v.call(arguments,0).concat([a,b]))}}function h(a){return function(b){return f(b,a)}}function i(a){return function(b){q[a]=b}}function j(a){if(e(r,a)){var b=r[a];delete r[a],t[a]=!0,m.apply(d,b)}if(!e(q,a)&&!e(t,a))throw new Error("No "+a);return q[a]}function k(a){var b,c=a?a.indexOf("!"):-1;return c>-1&&(b=a.substring(0,c),a=a.substring(c+1,a.length)),[b,a]}function l(a){return function(){return s&&s.config&&s.config[a]||{}}}var m,n,o,p,q={},r={},s={},t={},u=Object.prototype.hasOwnProperty,v=[].slice,w=/\.js$/;o=function(a,b){var c,d=k(a),e=d[0];return a=d[1],e&&(e=f(e,b),c=j(e)),e?a=c&&c.normalize?c.normalize(a,h(b)):f(a,b):(a=f(a,b),d=k(a),e=d[0],a=d[1],e&&(c=j(e))),{f:e?e+"!"+a:a,n:a,pr:e,p:c}},p={require:function(a){return g(a)},exports:function(a){var b=q[a];return"undefined"!=typeof b?b:q[a]={}},module:function(a){return{id:a,uri:"",exports:q[a],config:l(a)}}},m=function(a,b,c,f){var h,k,l,m,n,s,u=[],v=typeof c;if(f=f||a,"undefined"===v||"function"===v){for(b=!b.length&&c.length?["require","exports","module"]:b,n=0;n<b.length;n+=1)if(m=o(b[n],f),k=m.f,"require"===k)u[n]=p.require(a);else if("exports"===k)u[n]=p.exports(a),s=!0;else if("module"===k)h=u[n]=p.module(a);else if(e(q,k)||e(r,k)||e(t,k))u[n]=j(k);else{if(!m.p)throw new Error(a+" missing "+k);m.p.load(m.n,g(f,!0),i(k),{}),u[n]=q[k]}l=c?c.apply(q[a],u):void 0,a&&(h&&h.exports!==d&&h.exports!==q[a]?q[a]=h.exports:l===d&&s||(q[a]=l))}else a&&(q[a]=c)},c=b=n=function(a,b,c,e,f){if("string"==typeof a)return p[a]?p[a](b):j(o(a,b).f);if(!a.splice){if(s=a,s.deps&&n(s.deps,s.callback),!b)return;b.splice?(a=b,b=c,c=null):a=d}return b=b||function(){},"function"==typeof c&&(c=e,e=f),e?m(d,a,b,c):setTimeout(function(){m(d,a,b,c)},4),n},n.config=function(a){return n(a)},c._defined=q,a=function(a,b,c){b.splice||(c=b,b=[]),e(q,a)||e(r,a)||(r[a]=[a,b,c])},a.amd={jQuery:!0}}(),a("almond",function(){}),a("jquery",[],function(){var a=jQuery||$;return null==a&&console&&console.error&&console.error("Select2: An instance of jQuery or a jQuery-compatible library was not found. Make sure that you are including jQuery before Select2 on your web page."),a}),a("select2/utils",[],function(){function a(a){var b=a.prototype,c=[];for(var d in b){var e=b[d];"function"==typeof e&&"constructor"!==d&&c.push(d)}return c}var b={};b.Extend=function(a,b){function c(){this.constructor=a}var d={}.hasOwnProperty;for(var e in b)d.call(b,e)&&(a[e]=b[e]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a},b.Decorate=function(b,c){function d(){var a=Array.prototype.unshift,d=c.prototype.constructor.length,e=b.prototype.constructor;d>0&&(a.call(arguments,b.prototype.constructor),e=c.prototype.constructor),e.apply(this,arguments)}function e(){this.constructor=d}var f=a(c),g=a(b);c.displayName=b.displayName,d.prototype=new e;for(var h=0;h<g.length;h++){var i=g[h];d.prototype[i]=b.prototype[i]}for(var j=(function(a){var b=function(){};a in d.prototype&&(b=d.prototype[a]);var e=c.prototype[a];return function(){var a=Array.prototype.unshift;return a.call(arguments,b),e.apply(this,arguments)}}),k=0;k<f.length;k++){var l=f[k];d.prototype[l]=j(l)}return d};var c=function(){this.listeners={}};return c.prototype.on=function(a,b){this.listeners=this.listeners||{},a in this.listeners?this.listeners[a].push(b):this.listeners[a]=[b]},c.prototype.trigger=function(a){var b=Array.prototype.slice;this.listeners=this.listeners||{},a in this.listeners&&this.invoke(this.listeners[a],b.call(arguments,1)),"*"in this.listeners&&this.invoke(this.listeners["*"],arguments)},c.prototype.invoke=function(a,b){for(var c=0,d=a.length;d>c;c++)a[c].apply(this,b)},b.Observable=c,b.generateChars=function(a){for(var b="",c=0;a>c;c++){var d=Math.floor(36*Math.random());b+=d.toString(36)}return b},b.bind=function(a,b){return function(){a.apply(b,arguments)}},b._convertData=function(a){for(var b in a){var c=b.split("-"),d=a;if(1!==c.length){for(var e=0;e<c.length;e++){var f=c[e];f=f.substring(0,1).toLowerCase()+f.substring(1),f in d||(d[f]={}),e==c.length-1&&(d[f]=a[b]),d=d[f]}delete a[b]}}return a},b.hasScroll=function(a,b){var c=$(b),d=b.style.overflowX,e=b.style.overflowY;return d!==e||"hidden"!==e&&"visible"!==e?"scroll"===d||"scroll"===e?!0:c.innerHeight()<b.scrollHeight||c.innerWidth()<b.scrollWidth:!1},b}),a("select2/results",["jquery","./utils"],function(a,b){function c(a,b,d){this.$element=a,this.data=d,this.options=b,c.__super__.constructor.call(this)}return b.Extend(c,b.Observable),c.prototype.render=function(){var b=a('<ul class="select2-results__options" role="tree"></ul>');return this.options.get("multiple")&&b.attr("aria-multiselectable","true"),this.$results=b,b},c.prototype.clear=function(){this.$results.empty()},c.prototype.displayMessage=function(b){this.clear(),this.hideLoading();var c=a('<li role="treeitem" class="select2-results__option"></li>'),d=this.options.get("translations").get(b.message);c.text(d(b.args)),this.$results.append(c)},c.prototype.append=function(a){this.hideLoading();var b=[];if(null==a.results||0===a.results.length)return void(0===this.$results.children().length&&this.trigger("results:message",{message:"noResults"}));a.results=this.sort(a.results);for(var c=0;c<a.results.length;c++){var d=a.results[c],e=this.option(d);b.push(e)}this.$results.append(b)},c.prototype.position=function(a,b){var c=b.find(".select2-results");c.append(a)},c.prototype.sort=function(a){var b=this.options.get("sorter");return b(a)},c.prototype.setClasses=function(){var b=this;this.data.current(function(c){var d=a.map(c,function(a){return a.id.toString()}),e=b.$results.find(".select2-results__option[aria-selected]");e.each(function(){var b=a(this),c=a.data(this,"data");null!=c.id&&d.indexOf(c.id.toString())>-1?b.attr("aria-selected","true"):b.attr("aria-selected","false")});var f=e.filter("[aria-selected=true]");f.length>0?f.first().trigger("mouseenter"):e.first().trigger("mouseenter")})},c.prototype.showLoading=function(a){this.hideLoading();var b=this.options.get("translations").get("searching"),c={disabled:!0,loading:!0,text:b(a)},d=this.option(c);d.className+=" loading-results",this.$results.prepend(d)},c.prototype.hideLoading=function(){this.$results.find(".loading-results").remove()},c.prototype.option=function(b){var c=document.createElement("li");c.className="select2-results__option";var d={role:"treeitem","aria-selected":"false"};b.disabled&&(delete d["aria-selected"],d["aria-disabled"]="true"),null==b.id&&delete d["aria-selected"],null!=b._resultId&&(c.id=b._resultId),b.children&&(d.role="group",d["aria-label"]=b.text,delete d["aria-selected"]);for(var e in d){var f=d[e];c.setAttribute(e,f)}if(b.children){var g=a(c),h=document.createElement("strong");h.className="select2-results__group";{a(h)}this.template(b,h);for(var i=[],j=0;j<b.children.length;j++){var k=b.children[j],l=this.option(k);i.push(l)}var m=a("<ul></ul>",{"class":"select2-results__options select2-results__options--nested"});m.append(i),g.append(h),g.append(m)}else this.template(b,c);return a.data(c,"data",b),c},c.prototype.bind=function(b){var c=this,d=b.id+"-results";this.$results.attr("id",d),b.on("results:all",function(a){c.clear(),c.append(a.data),b.isOpen()&&c.setClasses()}),b.on("results:append",function(a){c.append(a.data),b.isOpen()&&c.setClasses()}),b.on("query",function(a){c.showLoading(a)}),b.on("select",function(){b.isOpen()&&c.setClasses()}),b.on("unselect",function(){b.isOpen()&&c.setClasses()}),b.on("open",function(){c.$results.attr("aria-expanded","true"),c.$results.attr("aria-hidden","false"),c.setClasses(),c.ensureHighlightVisible()}),b.on("close",function(){c.$results.attr("aria-expanded","false"),c.$results.attr("aria-hidden","true"),c.$results.removeAttr("aria-activedescendant")}),b.on("results:select",function(){var a=c.getHighlightedResults();if(0!==a.length){var b=a.data("data");"true"==a.attr("aria-selected")?c.options.get("multiple")?c.trigger("unselect",{data:b}):c.trigger("close"):c.trigger("select",{data:b})}}),b.on("results:previous",function(){var a=c.getHighlightedResults(),b=c.$results.find("[aria-selected]"),d=b.index(a);if(0!==d){var e=d-1;0===a.length&&(e=0);var f=b.eq(e);f.trigger("mouseenter");var g=c.$results.offset().top,h=f.offset().top,i=c.$results.scrollTop()+(h-g);0===e?c.$results.scrollTop(0):0>h-g&&c.$results.scrollTop(i)}}),b.on("results:next",function(){var a=c.getHighlightedResults(),b=c.$results.find("[aria-selected]"),d=b.index(a),e=d+1;if(!(e>=b.length)){var f=b.eq(e);f.trigger("mouseenter");var g=c.$results.offset().top+c.$results.outerHeight(!1),h=f.offset().top+f.outerHeight(!1),i=c.$results.scrollTop()+h-g;0===e?c.$results.scrollTop(0):h>g&&c.$results.scrollTop(i)}}),b.on("results:focus",function(a){a.element.addClass("select2-results__option--highlighted")}),b.on("results:message",function(a){c.displayMessage(a)}),a.fn.mousewheel&&this.$results.on("mousewheel",function(a){var b=c.$results.scrollTop(),d=c.$results.get(0).scrollHeight-c.$results.scrollTop()+a.deltaY,e=a.deltaY>0&&b-a.deltaY<=0,f=a.deltaY<0&&d<=c.$results.height();e?(c.$results.scrollTop(0),a.preventDefault(),a.stopPropagation()):f&&(c.$results.scrollTop(c.$results.get(0).scrollHeight-c.$results.height()),a.preventDefault(),a.stopPropagation())}),this.$results.on("mouseup",".select2-results__option[aria-selected]",function(b){var d=a(this),e=d.data("data");return"true"===d.attr("aria-selected")?void(c.options.get("multiple")?c.trigger("unselect",{originalEvent:b,data:e}):c.trigger("close")):void c.trigger("select",{originalEvent:b,data:e})}),this.$results.on("mouseenter",".select2-results__option[aria-selected]",function(){var b=a(this).data("data");c.getHighlightedResults().removeClass("select2-results__option--highlighted"),c.trigger("results:focus",{data:b,element:a(this)})})},c.prototype.getHighlightedResults=function(){var a=this.$results.find(".select2-results__option--highlighted");return a},c.prototype.destroy=function(){this.$results.remove()},c.prototype.ensureHighlightVisible=function(){var a=this.getHighlightedResults();if(0!==a.length){var b=this.$results.find("[aria-selected]"),c=b.index(a),d=this.$results.offset().top,e=a.offset().top,f=this.$results.scrollTop()+(e-d),g=e-d;f-=2*a.outerHeight(!1),2>=c?this.$results.scrollTop(0):(g>this.$results.outerHeight()||0>g)&&this.$results.scrollTop(f)}},c.prototype.template=function(a,b){var c=this.options.get("templateResult"),d=c(a);null==d?b.style.display="none":b.innerHTML=d},c}),a("select2/keys",[],function(){var a={BACKSPACE:8,TAB:9,ENTER:13,SHIFT:16,CTRL:17,ALT:18,ESC:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40,DELETE:46,isArrow:function(a){switch(a=a.which?a.which:a){case KEY.LEFT:case KEY.RIGHT:case KEY.UP:case KEY.DOWN:return!0}return!1}};return a}),a("select2/selection/base",["jquery","../utils","../keys"],function(a,b,c){function d(a,b){this.$element=a,this.options=b,d.__super__.constructor.call(this)}return b.Extend(d,b.Observable),d.prototype.render=function(){var b=a('<span class="select2-selection" tabindex="0" role="combobox" aria-autocomplete="list" aria-haspopup="true" aria-expanded="false"></span>');return b.attr("title",this.$element.attr("title")),this.$selection=b,b},d.prototype.bind=function(a){var b=this,d=(a.id+"-container",a.id+"-results");this.container=a,this.$selection.attr("aria-owns",d),this.$selection.on("keydown",function(a){b.trigger("keypress",a),a.which===c.SPACE&&a.preventDefault()}),a.on("results:focus",function(a){b.$selection.attr("aria-activedescendant",a.data._resultId)}),a.on("selection:update",function(a){b.update(a.data)}),a.on("open",function(){b.$selection.attr("aria-expanded","true"),b._attachCloseHandler(a)}),a.on("close",function(){b.$selection.attr("aria-expanded","false"),b.$selection.removeAttr("aria-activedescendant"),b.$selection.focus(),b._detachCloseHandler(a)}),a.on("enable",function(){b.$selection.attr("tabindex","0")}),a.on("disable",function(){b.$selection.attr("tabindex","-1")})},d.prototype._attachCloseHandler=function(b){a(document.body).on("mousedown.select2."+b.id,function(b){var c=a(b.target),d=c.closest(".select2"),e=a(".select2.select2-container--open");e.each(function(){var b=a(this);if(this!=d[0]){var c=b.data("element");c.select2("close")}})})},d.prototype._detachCloseHandler=function(b){a(document.body).off("mousedown.select2."+b.id)},d.prototype.position=function(a,b){var c=b.find(".selection");c.append(a)},d.prototype.destroy=function(){this._detachCloseHandler(this.container)},d.prototype.update=function(){throw new Error("The `update` method must be defined in child classes.")},d}),a("select2/selection/single",["jquery","./base","../utils","../keys"],function(a,b,c){function d(){d.__super__.constructor.apply(this,arguments)}return c.Extend(d,b),d.prototype.render=function(){var a=d.__super__.render.call(this);return a.addClass("select2-selection--single"),a.html('<span class="select2-selection__rendered"></span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>'),a},d.prototype.bind=function(a){var b=this;d.__super__.bind.apply(this,arguments);var c=a.id+"-container";this.$selection.find(".select2-selection__rendered").attr("id",c),this.$selection.attr("aria-labelledby",c),this.$selection.on("mousedown",function(a){1===a.which&&b.trigger("toggle",{originalEvent:a})}),this.$selection.on("focus",function(){}),this.$selection.on("blur",function(){}),a.on("selection:update",function(a){b.update(a.data)})},d.prototype.clear=function(){this.$selection.find(".select2-selection__rendered").empty()},d.prototype.display=function(a){var b=this.options.get("templateSelection");return b(a)},d.prototype.selectionContainer=function(){return a("<span></span>")},d.prototype.update=function(a){if(0===a.length)return void this.clear();var b=a[0],c=this.display(b);this.$selection.find(".select2-selection__rendered").html(c)},d}),a("select2/selection/multiple",["jquery","./base","../utils"],function(a,b,c){function d(){d.__super__.constructor.apply(this,arguments)}return c.Extend(d,b),d.prototype.render=function(){var a=d.__super__.render.call(this);return a.addClass("select2-selection--multiple"),a.html('<ul class="select2-selection__rendered"></ul>'),a},d.prototype.bind=function(){var b=this;d.__super__.bind.apply(this,arguments),this.$selection.on("click",function(a){b.trigger("toggle",{originalEvent:a})}),this.$selection.on("click",".select2-selection__choice__remove",function(c){var d=a(this),e=d.parent(),f=e.data("data");b.trigger("unselect",{originalEvent:c,data:f})})},d.prototype.clear=function(){this.$selection.find(".select2-selection__rendered").empty()},d.prototype.display=function(a){var b=this.options.get("templateSelection");return b(a)},d.prototype.selectionContainer=function(){var b=a('<li class="select2-selection__choice"><span class="select2-selection__choice__remove" role="presentation">&times;</span></li>');return b},d.prototype.update=function(a){if(this.clear(),0!==a.length){for(var b=[],c=0;c<a.length;c++){var d=a[c],e=this.display(d),f=this.selectionContainer();f.append(e),f.data("data",d),b.push(f)}this.$selection.find(".select2-selection__rendered").append(b)}},d}),a("select2/selection/placeholder",["../utils"],function(){function a(a,b,c){this.placeholder=this.normalizePlaceholder(c.get("placeholder")),a.call(this,b,c)}return a.prototype.normalizePlaceholder=function(a,b){return"string"==typeof b&&(b={id:"",text:b}),b},a.prototype.createPlaceholder=function(a,b){var c=this.selectionContainer();return c.html(this.display(b)),c.addClass("select2-selection__placeholder").removeClass("select2-selection__choice"),c},a.prototype.update=function(a,b){var c=1==b.length&&b[0].id!=this.placeholder.id,d=b.length>1;if(d||c)return a.call(this,b);this.clear();var e=this.createPlaceholder(this.placeholder);this.$selection.find(".select2-selection__rendered").append(e)},a}),a("select2/selection/allowClear",["jquery"],function(a){function b(){}return b.prototype.bind=function(b,c,d){var e=this;b.call(this,c,d),this.$selection.on("mousedown",".select2-selection__clear",function(b){if(!e.options.get("disabled")){b.stopPropagation();for(var c=a(this).data("data"),d=0;d<c.length;d++){var f={data:c[d]};if(e.trigger("unselect",f),f.prevented)return}e.$element.val(e.placeholder.id).trigger("change"),e.trigger("toggle")}})},b.prototype.update=function(b,c){if(b.call(this,c),!(this.$selection.find(".select2-selection__placeholder").length>0||0===c.length)){var d=a('<span class="select2-selection__clear">&times;</span>');d.data("data",c),this.$selection.find(".select2-selection__rendered").append(d)}},b}),a("select2/selection/search",["jquery","../utils","../keys"],function(a,b,c){function d(a,b,c){a.call(this,b,c)}return d.prototype.render=function(b){var c=a('<li class="select2-search select2-search--inline"><input class="select2-search__field" type="search" tabindex="-1" role="textbox" /></li>');this.$searchContainer=c,this.$search=c.find("input");var d=b.call(this);return d},d.prototype.bind=function(a,b,d){var e=this;a.call(this,b,d),b.on("open",function(){e.$search.attr("tabindex",0),e.$search.focus()}),b.on("close",function(){e.$search.attr("tabindex",-1),e.$search.val("")}),b.on("enable",function(){e.$search.prop("disabled",!1)}),b.on("disable",function(){e.$search.prop("disabled",!0)}),this.$selection.on("keydown",".select2-search--inline",function(a){a.stopPropagation(),e.trigger("keypress",a),e._keyUpPrevented=a.isDefaultPrevented();var b=a.which;if(b===c.BACKSPACE&&""===e.$search.val()){var d=e.$searchContainer.prev(".select2-selection__choice");if(d.length>0){var f=d.data("data");e.searchRemoveChoice(f)}}}),this.$selection.on("keyup",".select2-search--inline",function(a){e.handleSearch(a)})},d.prototype.createPlaceholder=function(a,b){this.$search.attr("placeholder",b.text)},d.prototype.update=function(a,b){this.$search.attr("placeholder",""),a.call(this,b),this.$selection.find(".select2-selection__rendered").append(this.$searchContainer),this.resizeSearch()},d.prototype.handleSearch=function(){if(this.resizeSearch(),!this._keyUpPrevented){var a=this.$search.val();this.trigger("query",{term:a})}this._keyUpPrevented=!1},d.prototype.searchRemoveChoice=function(a,b){this.trigger("unselect",{data:b}),this.trigger("open"),this.$search.val(b.text+" ")},d.prototype.resizeSearch=function(){this.$search.css("width","25px");var a="";if(""!==this.$search.attr("placeholder"))a=this.$selection.find(".select2-selection__rendered").innerWidth();else{var b=this.$search.val().length+1;a=.75*b+"em"}this.$search.css("width",a)},d}),a("select2/selection/eventRelay",["jquery"],function(a){function b(){}return b.prototype.bind=function(b,c,d){var e=this,f=["open","opening","close","closing","select","selecting","unselect","unselecting"],g=["opening","closing","selecting","unselecting"];b.call(this,c,d),c.on("*",function(b,c){if(-1!==f.indexOf(b)){c=c||{};var d=a.Event("select2:"+b,{params:c});e.$element.trigger(d),-1!==g.indexOf(b)&&(c.prevented=d.isDefaultPrevented())}})},b}),a("select2/translation",["jquery"],function(a){function c(a){this.dict=a||{}}return c.prototype.all=function(){return this.dict},c.prototype.get=function(a){return this.dict[a]},c.prototype.extend=function(b){this.dict=a.extend({},b.all(),this.dict)},c._cache={},c.loadPath=function(a){if(!(a in c._cache)){var d=b(a);c._cache[a]=d}return new c(c._cache[a])},c}),a("select2/diacritics",[],function(){var a={"Ⓐ":"A","Ａ":"A","À":"A","Á":"A","Â":"A","Ầ":"A","Ấ":"A","Ẫ":"A","Ẩ":"A","Ã":"A","Ā":"A","Ă":"A","Ằ":"A","Ắ":"A","Ẵ":"A","Ẳ":"A","Ȧ":"A","Ǡ":"A","Ä":"A","Ǟ":"A","Ả":"A","Å":"A","Ǻ":"A","Ǎ":"A","Ȁ":"A","Ȃ":"A","Ạ":"A","Ậ":"A","Ặ":"A","Ḁ":"A","Ą":"A","Ⱥ":"A","Ɐ":"A","Ꜳ":"AA","Æ":"AE","Ǽ":"AE","Ǣ":"AE","Ꜵ":"AO","Ꜷ":"AU","Ꜹ":"AV","Ꜻ":"AV","Ꜽ":"AY","Ⓑ":"B","Ｂ":"B","Ḃ":"B","Ḅ":"B","Ḇ":"B","Ƀ":"B","Ƃ":"B","Ɓ":"B","Ⓒ":"C","Ｃ":"C","Ć":"C","Ĉ":"C","Ċ":"C","Č":"C","Ç":"C","Ḉ":"C","Ƈ":"C","Ȼ":"C","Ꜿ":"C","Ⓓ":"D","Ｄ":"D","Ḋ":"D","Ď":"D","Ḍ":"D","Ḑ":"D","Ḓ":"D","Ḏ":"D","Đ":"D","Ƌ":"D","Ɗ":"D","Ɖ":"D","Ꝺ":"D","Ǳ":"DZ","Ǆ":"DZ","ǲ":"Dz","ǅ":"Dz","Ⓔ":"E","Ｅ":"E","È":"E","É":"E","Ê":"E","Ề":"E","Ế":"E","Ễ":"E","Ể":"E","Ẽ":"E","Ē":"E","Ḕ":"E","Ḗ":"E","Ĕ":"E","Ė":"E","Ë":"E","Ẻ":"E","Ě":"E","Ȅ":"E","Ȇ":"E","Ẹ":"E","Ệ":"E","Ȩ":"E","Ḝ":"E","Ę":"E","Ḙ":"E","Ḛ":"E","Ɛ":"E","Ǝ":"E","Ⓕ":"F","Ｆ":"F","Ḟ":"F","Ƒ":"F","Ꝼ":"F","Ⓖ":"G","Ｇ":"G","Ǵ":"G","Ĝ":"G","Ḡ":"G","Ğ":"G","Ġ":"G","Ǧ":"G","Ģ":"G","Ǥ":"G","Ɠ":"G","Ꞡ":"G","Ᵹ":"G","Ꝿ":"G","Ⓗ":"H","Ｈ":"H","Ĥ":"H","Ḣ":"H","Ḧ":"H","Ȟ":"H","Ḥ":"H","Ḩ":"H","Ḫ":"H","Ħ":"H","Ⱨ":"H","Ⱶ":"H","Ɥ":"H","Ⓘ":"I","Ｉ":"I","Ì":"I","Í":"I","Î":"I","Ĩ":"I","Ī":"I","Ĭ":"I","İ":"I","Ï":"I","Ḯ":"I","Ỉ":"I","Ǐ":"I","Ȉ":"I","Ȋ":"I","Ị":"I","Į":"I","Ḭ":"I","Ɨ":"I","Ⓙ":"J","Ｊ":"J","Ĵ":"J","Ɉ":"J","Ⓚ":"K","Ｋ":"K","Ḱ":"K","Ǩ":"K","Ḳ":"K","Ķ":"K","Ḵ":"K","Ƙ":"K","Ⱪ":"K","Ꝁ":"K","Ꝃ":"K","Ꝅ":"K","Ꞣ":"K","Ⓛ":"L","Ｌ":"L","Ŀ":"L","Ĺ":"L","Ľ":"L","Ḷ":"L","Ḹ":"L","Ļ":"L","Ḽ":"L","Ḻ":"L","Ł":"L","Ƚ":"L","Ɫ":"L","Ⱡ":"L","Ꝉ":"L","Ꝇ":"L","Ꞁ":"L","Ǉ":"LJ","ǈ":"Lj","Ⓜ":"M","Ｍ":"M","Ḿ":"M","Ṁ":"M","Ṃ":"M","Ɱ":"M","Ɯ":"M","Ⓝ":"N","Ｎ":"N","Ǹ":"N","Ń":"N","Ñ":"N","Ṅ":"N","Ň":"N","Ṇ":"N","Ņ":"N","Ṋ":"N","Ṉ":"N","Ƞ":"N","Ɲ":"N","Ꞑ":"N","Ꞥ":"N","Ǌ":"NJ","ǋ":"Nj","Ⓞ":"O","Ｏ":"O","Ò":"O","Ó":"O","Ô":"O","Ồ":"O","Ố":"O","Ỗ":"O","Ổ":"O","Õ":"O","Ṍ":"O","Ȭ":"O","Ṏ":"O","Ō":"O","Ṑ":"O","Ṓ":"O","Ŏ":"O","Ȯ":"O","Ȱ":"O","Ö":"O","Ȫ":"O","Ỏ":"O","Ő":"O","Ǒ":"O","Ȍ":"O","Ȏ":"O","Ơ":"O","Ờ":"O","Ớ":"O","Ỡ":"O","Ở":"O","Ợ":"O","Ọ":"O","Ộ":"O","Ǫ":"O","Ǭ":"O","Ø":"O","Ǿ":"O","Ɔ":"O","Ɵ":"O","Ꝋ":"O","Ꝍ":"O","Ƣ":"OI","Ꝏ":"OO","Ȣ":"OU","Ⓟ":"P","Ｐ":"P","Ṕ":"P","Ṗ":"P","Ƥ":"P","Ᵽ":"P","Ꝑ":"P","Ꝓ":"P","Ꝕ":"P","Ⓠ":"Q","Ｑ":"Q","Ꝗ":"Q","Ꝙ":"Q","Ɋ":"Q","Ⓡ":"R","Ｒ":"R","Ŕ":"R","Ṙ":"R","Ř":"R","Ȑ":"R","Ȓ":"R","Ṛ":"R","Ṝ":"R","Ŗ":"R","Ṟ":"R","Ɍ":"R","Ɽ":"R","Ꝛ":"R","Ꞧ":"R","Ꞃ":"R","Ⓢ":"S","Ｓ":"S","ẞ":"S","Ś":"S","Ṥ":"S","Ŝ":"S","Ṡ":"S","Š":"S","Ṧ":"S","Ṣ":"S","Ṩ":"S","Ș":"S","Ş":"S","Ȿ":"S","Ꞩ":"S","Ꞅ":"S","Ⓣ":"T","Ｔ":"T","Ṫ":"T","Ť":"T","Ṭ":"T","Ț":"T","Ţ":"T","Ṱ":"T","Ṯ":"T","Ŧ":"T","Ƭ":"T","Ʈ":"T","Ⱦ":"T","Ꞇ":"T","Ꜩ":"TZ","Ⓤ":"U","Ｕ":"U","Ù":"U","Ú":"U","Û":"U","Ũ":"U","Ṹ":"U","Ū":"U","Ṻ":"U","Ŭ":"U","Ü":"U","Ǜ":"U","Ǘ":"U","Ǖ":"U","Ǚ":"U","Ủ":"U","Ů":"U","Ű":"U","Ǔ":"U","Ȕ":"U","Ȗ":"U","Ư":"U","Ừ":"U","Ứ":"U","Ữ":"U","Ử":"U","Ự":"U","Ụ":"U","Ṳ":"U","Ų":"U","Ṷ":"U","Ṵ":"U","Ʉ":"U","Ⓥ":"V","Ｖ":"V","Ṽ":"V","Ṿ":"V","Ʋ":"V","Ꝟ":"V","Ʌ":"V","Ꝡ":"VY","Ⓦ":"W","Ｗ":"W","Ẁ":"W","Ẃ":"W","Ŵ":"W","Ẇ":"W","Ẅ":"W","Ẉ":"W","Ⱳ":"W","Ⓧ":"X","Ｘ":"X","Ẋ":"X","Ẍ":"X","Ⓨ":"Y","Ｙ":"Y","Ỳ":"Y","Ý":"Y","Ŷ":"Y","Ỹ":"Y","Ȳ":"Y","Ẏ":"Y","Ÿ":"Y","Ỷ":"Y","Ỵ":"Y","Ƴ":"Y","Ɏ":"Y","Ỿ":"Y","Ⓩ":"Z","Ｚ":"Z","Ź":"Z","Ẑ":"Z","Ż":"Z","Ž":"Z","Ẓ":"Z","Ẕ":"Z","Ƶ":"Z","Ȥ":"Z","Ɀ":"Z","Ⱬ":"Z","Ꝣ":"Z","ⓐ":"a","ａ":"a","ẚ":"a","à":"a","á":"a","â":"a","ầ":"a","ấ":"a","ẫ":"a","ẩ":"a","ã":"a","ā":"a","ă":"a","ằ":"a","ắ":"a","ẵ":"a","ẳ":"a","ȧ":"a","ǡ":"a","ä":"a","ǟ":"a","ả":"a","å":"a","ǻ":"a","ǎ":"a","ȁ":"a","ȃ":"a","ạ":"a","ậ":"a","ặ":"a","ḁ":"a","ą":"a","ⱥ":"a","ɐ":"a","ꜳ":"aa","æ":"ae","ǽ":"ae","ǣ":"ae","ꜵ":"ao","ꜷ":"au","ꜹ":"av","ꜻ":"av","ꜽ":"ay","ⓑ":"b","ｂ":"b","ḃ":"b","ḅ":"b","ḇ":"b","ƀ":"b","ƃ":"b","ɓ":"b","ⓒ":"c","ｃ":"c","ć":"c","ĉ":"c","ċ":"c","č":"c","ç":"c","ḉ":"c","ƈ":"c","ȼ":"c","ꜿ":"c","ↄ":"c","ⓓ":"d","ｄ":"d","ḋ":"d","ď":"d","ḍ":"d","ḑ":"d","ḓ":"d","ḏ":"d","đ":"d","ƌ":"d","ɖ":"d","ɗ":"d","ꝺ":"d","ǳ":"dz","ǆ":"dz","ⓔ":"e","ｅ":"e","è":"e","é":"e","ê":"e","ề":"e","ế":"e","ễ":"e","ể":"e","ẽ":"e","ē":"e","ḕ":"e","ḗ":"e","ĕ":"e","ė":"e","ë":"e","ẻ":"e","ě":"e","ȅ":"e","ȇ":"e","ẹ":"e","ệ":"e","ȩ":"e","ḝ":"e","ę":"e","ḙ":"e","ḛ":"e","ɇ":"e","ɛ":"e","ǝ":"e","ⓕ":"f","ｆ":"f","ḟ":"f","ƒ":"f","ꝼ":"f","ⓖ":"g","ｇ":"g","ǵ":"g","ĝ":"g","ḡ":"g","ğ":"g","ġ":"g","ǧ":"g","ģ":"g","ǥ":"g","ɠ":"g","ꞡ":"g","ᵹ":"g","ꝿ":"g","ⓗ":"h","ｈ":"h","ĥ":"h","ḣ":"h","ḧ":"h","ȟ":"h","ḥ":"h","ḩ":"h","ḫ":"h","ẖ":"h","ħ":"h","ⱨ":"h","ⱶ":"h","ɥ":"h","ƕ":"hv","ⓘ":"i","ｉ":"i","ì":"i","í":"i","î":"i","ĩ":"i","ī":"i","ĭ":"i","ï":"i","ḯ":"i","ỉ":"i","ǐ":"i","ȉ":"i","ȋ":"i","ị":"i","į":"i","ḭ":"i","ɨ":"i","ı":"i","ⓙ":"j","ｊ":"j","ĵ":"j","ǰ":"j","ɉ":"j","ⓚ":"k","ｋ":"k","ḱ":"k","ǩ":"k","ḳ":"k","ķ":"k","ḵ":"k","ƙ":"k","ⱪ":"k","ꝁ":"k","ꝃ":"k","ꝅ":"k","ꞣ":"k","ⓛ":"l","ｌ":"l","ŀ":"l","ĺ":"l","ľ":"l","ḷ":"l","ḹ":"l","ļ":"l","ḽ":"l","ḻ":"l","ſ":"l","ł":"l","ƚ":"l","ɫ":"l","ⱡ":"l","ꝉ":"l","ꞁ":"l","ꝇ":"l","ǉ":"lj","ⓜ":"m","ｍ":"m","ḿ":"m","ṁ":"m","ṃ":"m","ɱ":"m","ɯ":"m","ⓝ":"n","ｎ":"n","ǹ":"n","ń":"n","ñ":"n","ṅ":"n","ň":"n","ṇ":"n","ņ":"n","ṋ":"n","ṉ":"n","ƞ":"n","ɲ":"n","ŉ":"n","ꞑ":"n","ꞥ":"n","ǌ":"nj","ⓞ":"o","ｏ":"o","ò":"o","ó":"o","ô":"o","ồ":"o","ố":"o","ỗ":"o","ổ":"o","õ":"o","ṍ":"o","ȭ":"o","ṏ":"o","ō":"o","ṑ":"o","ṓ":"o","ŏ":"o","ȯ":"o","ȱ":"o","ö":"o","ȫ":"o","ỏ":"o","ő":"o","ǒ":"o","ȍ":"o","ȏ":"o","ơ":"o","ờ":"o","ớ":"o","ỡ":"o","ở":"o","ợ":"o","ọ":"o","ộ":"o","ǫ":"o","ǭ":"o","ø":"o","ǿ":"o","ɔ":"o","ꝋ":"o","ꝍ":"o","ɵ":"o","ƣ":"oi","ȣ":"ou","ꝏ":"oo","ⓟ":"p","ｐ":"p","ṕ":"p","ṗ":"p","ƥ":"p","ᵽ":"p","ꝑ":"p","ꝓ":"p","ꝕ":"p","ⓠ":"q","ｑ":"q","ɋ":"q","ꝗ":"q","ꝙ":"q","ⓡ":"r","ｒ":"r","ŕ":"r","ṙ":"r","ř":"r","ȑ":"r","ȓ":"r","ṛ":"r","ṝ":"r","ŗ":"r","ṟ":"r","ɍ":"r","ɽ":"r","ꝛ":"r","ꞧ":"r","ꞃ":"r","ⓢ":"s","ｓ":"s","ß":"s","ś":"s","ṥ":"s","ŝ":"s","ṡ":"s","š":"s","ṧ":"s","ṣ":"s","ṩ":"s","ș":"s","ş":"s","ȿ":"s","ꞩ":"s","ꞅ":"s","ẛ":"s","ⓣ":"t","ｔ":"t","ṫ":"t","ẗ":"t","ť":"t","ṭ":"t","ț":"t","ţ":"t","ṱ":"t","ṯ":"t","ŧ":"t","ƭ":"t","ʈ":"t","ⱦ":"t","ꞇ":"t","ꜩ":"tz","ⓤ":"u","ｕ":"u","ù":"u","ú":"u","û":"u","ũ":"u","ṹ":"u","ū":"u","ṻ":"u","ŭ":"u","ü":"u","ǜ":"u","ǘ":"u","ǖ":"u","ǚ":"u","ủ":"u","ů":"u","ű":"u","ǔ":"u","ȕ":"u","ȗ":"u","ư":"u","ừ":"u","ứ":"u","ữ":"u","ử":"u","ự":"u","ụ":"u","ṳ":"u","ų":"u","ṷ":"u","ṵ":"u","ʉ":"u","ⓥ":"v","ｖ":"v","ṽ":"v","ṿ":"v","ʋ":"v","ꝟ":"v","ʌ":"v","ꝡ":"vy","ⓦ":"w","ｗ":"w","ẁ":"w","ẃ":"w","ŵ":"w","ẇ":"w","ẅ":"w","ẘ":"w","ẉ":"w","ⱳ":"w","ⓧ":"x","ｘ":"x","ẋ":"x","ẍ":"x","ⓨ":"y","ｙ":"y","ỳ":"y","ý":"y","ŷ":"y","ỹ":"y","ȳ":"y","ẏ":"y","ÿ":"y","ỷ":"y","ẙ":"y","ỵ":"y","ƴ":"y","ɏ":"y","ỿ":"y","ⓩ":"z","ｚ":"z","ź":"z","ẑ":"z","ż":"z","ž":"z","ẓ":"z","ẕ":"z","ƶ":"z","ȥ":"z","ɀ":"z","ⱬ":"z","ꝣ":"z","Ά":"Α","Έ":"Ε","Ή":"Η","Ί":"Ι","Ϊ":"Ι","Ό":"Ο","Ύ":"Υ","Ϋ":"Υ","Ώ":"Ω","ά":"α","έ":"ε","ή":"η","ί":"ι","ϊ":"ι","ΐ":"ι","ό":"ο","ύ":"υ","ϋ":"υ","ΰ":"υ","ω":"ω","ς":"σ"};return a}),a("select2/data/base",["../utils"],function(a){function b(){b.__super__.constructor.call(this)}return a.Extend(b,a.Observable),b.prototype.current=function(){throw new Error("The `current` method must be defined in child classes.")},b.prototype.query=function(){throw new Error("The `query` method must be defined in child classes.")},b.prototype.bind=function(){},b.prototype.destroy=function(){},b.prototype.generateResultId=function(b,c){var d=b.id+"-result-";return d+=a.generateChars(4),d+=null!=c.id?"-"+c.id.toString():"-"+a.generateChars(4)},b}),a("select2/data/select",["./base","../utils","jquery"],function(a,b,c){function d(a,b){this.$element=a,this.options=b,d.__super__.constructor.call(this)}return b.Extend(d,a),d.prototype.current=function(a){var b=[],d=this;this.$element.find(":selected").each(function(){var a=c(this),e=d.item(a);b.push(e)}),a(b)},d.prototype.select=function(a){var b=this;if(c(a.element).is("option"))return a.element.selected=!0,void this.$element.trigger("change");if(this.$element.prop("multiple"))this.current(function(c){var d=[];a=[a],a.push.apply(a,c);for(var e=0;e<a.length;e++)id=a[e].id,-1===d.indexOf(id)&&d.push(id);b.$element.val(d),b.$element.trigger("change")});else{var d=a.id;this.$element.val(d),this.$element.trigger("change")}},d.prototype.unselect=function(a){var b=this;if(this.$element.prop("multiple"))return c(a.element).is("option")?(a.element.selected=!1,void this.$element.trigger("change")):void this.current(function(c){for(var d=[],e=0;e<c.length;e++)id=c[e].id,id!==a.id&&-1===d.indexOf(id)&&d.push(id);b.$element.val(d),b.$element.trigger("change")})},d.prototype.bind=function(a){var b=this;this.container=a,a.on("select",function(a){b.select(a.data)}),a.on("unselect",function(a){b.unselect(a.data)})},d.prototype.destroy=function(){this.$element.find("*").each(function(){c.removeData(this,"data")})},d.prototype.query=function(a,b){var d=[],e=this,f=this.$element.children();f.each(function(){var b=c(this);if(b.is("option")||b.is("optgroup")){var f=e.item(b),g=e.matches(a,f);null!==g&&d.push(g)}}),b({results:d})},d.prototype.option=function(a){var b;a.children?(b=document.createElement("optgroup"),b.label=a.text):(b=document.createElement("option"),b.innerText=a.text),a.id&&(b.value=a.id),a.disabled&&(b.disabled=!0),a.selected&&(b.selected=!0);var d=c(b),e=this._normalizeItem(a);return e.element=b,c.data(b,"data",e),d},d.prototype.item=function(a){var b={};if(b=c.data(a[0],"data"),null!=b)return b;if(a.is("option"))b={id:a.val(),text:a.html(),disabled:a.prop("disabled"),selected:a.prop("selected")};else if(a.is("optgroup")){b={text:a.prop("label"),children:[]};for(var d=a.children("option"),e=[],f=0;f<d.length;f++){var g=c(d[f]),h=this.item(g);e.push(h)}b.children=e}return b=this._normalizeItem(b),b.element=a[0],c.data(a[0],"data",b),b},d.prototype._normalizeItem=function(a){c.isPlainObject(a)||(a={id:a,text:a}),a=c.extend({},{text:""},a);var b={selected:!1,disabled:!1};return null!=a.id&&(a.id=a.id.toString()),null!=a.text&&(a.text=a.text.toString()),null==a._resultId&&a.id&&null!=this.container&&(a._resultId=this.generateResultId(this.container,a)),c.extend({},b,a)},d.prototype.matches=function(a,b){var c=this.options.get("matcher");return c(a,b)},d}),a("select2/data/array",["./select","../utils","jquery"],function(a,b,c){function d(a,b){var c=b.get("data")||[];d.__super__.constructor.call(this,a,b),a.append(this.convertToOptions(c))}return b.Extend(d,a),d.prototype.select=function(a){var b=this.$element.find('option[value="'+a.id+'"]');0===b.length&&(b=this.option(a),this.$element.append(b)),d.__super__.select.call(this,a)},d.prototype.convertToOptions=function(a){function b(a){return function(){return c(this).val()==a.id}}for(var d=this,e=this.$element.find("option"),f=e.map(function(){return d.item(c(this)).id}).get(),g=[],h=0;h<a.length;h++){var i=this._normalizeItem(a[h]);if(f.indexOf(i.id)>=0){var j=e.filter(b(i)),k=this.item(j),l=(c.extend(!0,{},k,i),this.option(k));j.replaceWith(l)}else{var m=this.option(i);if(i.children){var n=this.convertToOptions(i.children);m.append(n)}g.push(m)}}return g},d}),a("select2/data/ajax",["./array","../utils","jquery"],function(a,b,c){function d(b,c){this.ajaxOptions=c.get("ajax"),null!=this.ajaxOptions.processResults&&(this.processResults=this.ajaxOptions.processResults),a.__super__.constructor.call(this,b,c)}return b.Extend(d,a),d.prototype.processResults=function(a){return a},d.prototype.query=function(a,b){function d(){var d=c.ajax(f);d.success(function(d){var f=e.processResults(d,a);console&&console.error&&(f&&f.results&&c.isArray(f.results)||console.error("Select2: The AJAX results did not return an array in the `results` key of the response.")),b(f)}),e._request=d}var e=this;
this._request&&(this._request.abort(),this._request=null);var f=c.extend({type:"GET"},this.ajaxOptions);"function"==typeof f.url&&(f.url=f.url(a)),"function"==typeof f.data&&(f.data=f.data(a)),this.ajaxOptions.delay&&""!==a.term?(this._queryTimeout&&window.clearTimeout(this._queryTimeout),this._queryTimeout=window.setTimeout(d,this.ajaxOptions.delay)):d()},d}),a("select2/data/tags",["jquery"],function(a){function b(b,c,d){var e=d.get("tags"),f=d.get("createTag");if(void 0!==f&&(this.createTag=f),b.call(this,c,d),a.isArray(e))for(var g=0;g<e.length;g++){var h=e[g],i=this._normalizeItem(h),j=this.option(i);this.$element.append(j)}}return b.prototype.query=function(a,b,c){function d(a,f){for(var g=a.results,h=0;h<g.length;h++){var i=g[h],j=null!=i.children&&!d({results:i.children},!0),k=i.text===b.term;if(k||j)return f?!1:(a.data=g,void c(a))}if(f)return!0;var l=e.createTag(b);if(null!=l){var m=e.option(l);m.attr("data-select2-tag",!0),e.$element.append(m),e.insertTag(g,l)}a.results=g,c(a)}var e=this;return this._removeOldTags(),null==b.term||""===b.term||null!=b.page?void a.call(this,b,c):void a.call(this,b,d)},b.prototype.createTag=function(a,b){return{id:b.term,text:b.term}},b.prototype.insertTag=function(a,b,c){b.unshift(c)},b.prototype._removeOldTags=function(){var b=(this._lastTag,this.$element.find("option[data-select2-tag]"));b.each(function(){this.selected||a(this).remove()})},b}),a("select2/data/tokenizer",["jquery"],function(a){function b(a,b,c){var d=c.get("tokenizer");void 0!==d&&(this.tokenizer=d),a.call(this,b,c)}return b.prototype.bind=function(a,b,c){a.call(this,b,c),this.$search=b.dropdown.$search||b.selection.$search||c.find(".select2-search__field")},b.prototype.query=function(a,b,c){function d(a){e.select(a)}var e=this;b.term=b.term||"";var f=this.tokenizer(b,this.options,d);f.term!==b.term&&(this.$search.length&&(this.$search.val(f.term),this.$search.focus()),b.term=f.term),a.call(this,b,c)},b.prototype.tokenizer=function(b,c,d,e){for(var f=d.get("tokenSeparators")||[],g=c.term,h=0,i=this.createTag||function(a){return{id:a.term,text:a.term}};h<g.length;){var j=g[h];if(-1!==f.indexOf(j)){var k=g.substr(0,h),l=a.extend({},c,{term:k}),m=i(l);e(m),g=g.substr(h+1)||"",h=0}else h++}return{term:g}},b}),a("select2/data/minimumInputLength",[],function(){function a(a,b,c){this.minimumInputLength=c.get("minimumInputLength"),a.call(this,b,c)}return a.prototype.query=function(a,b,c){return b.term=b.term||"",b.term.length<this.minimumInputLength?void this.trigger("results:message",{message:"inputTooShort",args:{minimum:this.minimumInputLength,input:b.term,params:b}}):void a.call(this,b,c)},a}),a("select2/data/maximumInputLength",[],function(){function a(a,b,c){this.maximumInputLength=c.get("maximumInputLength"),a.call(this,b,c)}return a.prototype.query=function(a,b,c){return b.term=b.term||"",this.maximumInputLength>0&&b.term.length>this.maximumInputLength?void this.trigger("results:message",{message:"inputTooLong",args:{minimum:this.maximumInputLength,input:b.term,params:b}}):void a.call(this,b,c)},a}),a("select2/data/maximumSelectionLength",[],function(){function a(a,b,c){this.maximumSelectionLength=c.get("maximumSelectionLength"),a.call(this,b,c)}return a.prototype.query=function(a,b,c){var d=this;this.current(function(e){var f=null!=e?e.length:0;return d.maximumSelectionLength>0&&f>=d.maximumSelectionLength?void d.trigger("results:message",{message:"maximumSelected",args:{maximum:d.maximumSelectionLength}}):void a.call(d,b,c)})},a}),a("select2/dropdown",["jquery","./utils"],function(a,b){function c(a,b){this.$element=a,this.options=b,c.__super__.constructor.call(this)}return b.Extend(c,b.Observable),c.prototype.render=function(){var b=a('<span class="select2-dropdown"><span class="select2-results"></span></span>');return b.attr("dir",this.options.get("dir")),this.$dropdown=b,b},c.prototype.position=function(){},c.prototype.destroy=function(){this.$dropdown.remove()},c.prototype.bind=function(a){var b=this;a.on("select",function(a){b._onSelect(a)}),a.on("unselect",function(a){b._onUnSelect(a)})},c.prototype._onSelect=function(){this.trigger("close")},c.prototype._onUnSelect=function(){this.trigger("close")},c}),a("select2/dropdown/search",["jquery","../utils"],function(a){function b(){}return b.prototype.render=function(b){var c=b.call(this),d=a('<span class="select2-search select2-search--dropdown"><input class="select2-search__field" type="search" tabindex="-1" role="textbox" /></span>');return this.$searchContainer=d,this.$search=d.find("input"),c.prepend(d),c},b.prototype.bind=function(a,b,c){var d=this;a.call(this,b,c),this.$search.on("keydown",function(a){d.trigger("keypress",a),d._keyUpPrevented=a.isDefaultPrevented()}),this.$search.on("keyup",function(a){d.handleSearch(a)}),b.on("open",function(){d.$search.attr("tabindex",0),d.$search.focus(),window.setTimeout(function(){d.$search.focus()},0)}),b.on("close",function(){d.$search.attr("tabindex",-1),d.$search.val("")}),b.on("results:all",function(a){if(null==a.query.term||""===a.query.term){var b=d.showSearch(a);b?d.$searchContainer.removeClass("select2-search--hide"):d.$searchContainer.addClass("select2-search--hide")}})},b.prototype.handleSearch=function(){if(!this._keyUpPrevented){var a=this.$search.val();this.trigger("query",{term:a})}this._keyUpPrevented=!1},b.prototype.showSearch=function(){return!0},b}),a("select2/dropdown/hidePlaceholder",[],function(){function a(a,b,c,d){this.placeholder=this.normalizePlaceholder(c.get("placeholder")),a.call(this,b,c,d)}return a.prototype.append=function(a,b){b.results=this.removePlaceholder(b.results),a.call(this,b)},a.prototype.normalizePlaceholder=function(a,b){return"string"==typeof b&&(b={id:"",text:b}),b},a.prototype.removePlaceholder=function(a,b){for(var c=b.slice(0),d=b.length-1;d>=0;d--){var e=b[d];this.placeholder.id===e.id&&c.splice(d,1)}return c},a}),a("select2/dropdown/infiniteScroll",["jquery"],function(a){function b(a,b,c,d){this.lastParams={},a.call(this,b,c,d),this.$loadingMore=this.createLoadingMore(),this.loading=!1}return b.prototype.append=function(a,b){this.$loadingMore.remove(),this.loading=!1,a.call(this,b),this.showLoadingMore(b)&&this.$results.append(this.$loadingMore)},b.prototype.bind=function(b,c,d){var e=this;b.call(this,c,d),c.on("query",function(a){e.lastParams=a,e.loading=!0}),c.on("query:append",function(a){e.lastParams=a,e.loading=!0}),this.$results.on("scroll",function(){var b=a.contains(document.documentElement,e.$loadingMore[0]);if(!e.loading&&b){var c=e.$results.offset().top+e.$results.outerHeight(!1),d=e.$loadingMore.offset().top+e.$loadingMore.outerHeight(!1);c+50>=d&&e.loadMore()}})},b.prototype.loadMore=function(){this.loading=!0;var b=a.extend({},{page:1},this.lastParams);b.page++,this.trigger("query:append",b)},b.prototype.showLoadingMore=function(a,b){return b.pagination&&b.pagination.more},b.prototype.createLoadingMore=function(){var b=a('<li class="option load-more" role="treeitem"></li>'),c=this.options.get("translations").get("loadingMore");return b.html(c(this.lastParams)),b},b}),a("select2/dropdown/attachBody",["jquery","../utils"],function(a,b){function c(a,b,c){this.$dropdownParent=c.get("dropdownParent")||document.body,a.call(this,b,c)}return c.prototype.bind=function(a,b,c){var d=this,e=!1;a.call(this,b,c),b.on("open",function(){d._showDropdown(),d._attachPositioningHandler(b),e||(e=!0,b.on("results:all",function(){d._positionDropdown(),d._resizeDropdown()}),b.on("results:append",function(){d._positionDropdown(),d._resizeDropdown()}))}),b.on("close",function(){d._hideDropdown(),d._detachPositioningHandler(b)}),this.$dropdownContainer.on("mousedown",function(a){a.stopPropagation()})},c.prototype.position=function(a,b,c){b.attr("class",c.attr("class")),b.removeClass("select2"),b.addClass("select2-container--open"),b.css({position:"absolute",top:-999999}),this.$container=c},c.prototype.render=function(b){var c=a("<span></span>"),d=b.call(this);return c.append(d),this.$dropdownContainer=c,c},c.prototype._hideDropdown=function(){this.$dropdownContainer.detach()},c.prototype._attachPositioningHandler=function(c){var d=this,e="scroll.select2."+c.id,f="resize.select2."+c.id,g="orientationchange.select2."+c.id;$watchers=this.$container.parents().filter(b.hasScroll),$watchers.each(function(){a(this).data("select2-scroll-position",{x:a(this).scrollLeft(),y:a(this).scrollTop()})}),$watchers.on(e,function(){var b=a(this).data("select2-scroll-position");a(this).scrollTop(b.y)}),a(window).on(e+" "+f+" "+g,function(){d._positionDropdown(),d._resizeDropdown()})},c.prototype._detachPositioningHandler=function(c){var d="scroll.select2."+c.id,e="resize.select2."+c.id,f="orientationchange.select2."+c.id;$watchers=this.$container.parents().filter(b.hasScroll),$watchers.off(d),a(window).off(d+" "+e+" "+f)},c.prototype._positionDropdown=function(){var b=a(window),c=this.$dropdown.hasClass("select2-dropdown--above"),d=this.$dropdown.hasClass("select2-dropdown--below"),e=null,f=(this.$container.position(),this.$container.offset());f.bottom=f.top+this.$container.outerHeight(!1);var g={height:this.$container.outerHeight(!1)};g.top=f.top,g.bottom=f.top+g.height;var h={height:this.$dropdown.outerHeight(!1)},i={top:b.scrollTop(),bottom:b.scrollTop()+b.height()},j=i.top<f.top-h.height,k=i.bottom>f.bottom+h.height,l={left:f.left,top:g.bottom};c||d||(e="below"),k||!j||c?!j&&k&&c&&(e="below"):e="above",("above"==e||c&&"below"!==e)&&(l.top=g.top-h.height),null!=e&&(this.$dropdown.removeClass("select2-dropdown--below select2-dropdown--above").addClass("select2-dropdown--"+e),this.$container.removeClass("select2-container--below select2-container--above").addClass("select2-container--"+e)),this.$dropdownContainer.css(l)},c.prototype._resizeDropdown=function(){this.$dropdownContainer.width(),this.$dropdown.css({width:this.$container.outerWidth(!1)+"px"})},c.prototype._showDropdown=function(){this.$dropdownContainer.appendTo(this.$dropdownParent),this._positionDropdown(),this._resizeDropdown()},c}),a("select2/dropdown/minimumResultsForSearch",[],function(){function a(b){count=0;for(var c=0;c<b.length;c++){var d=b[c];d.children?count+=a(d.children):count++}return count}function b(a,b,c,d){this.minimumResultsForSearch=c.get("minimumResultsForSearch"),a.call(this,b,c,d)}return b.prototype.showSearch=function(b,c){return a(c.data.results)<this.minimumResultsForSearch?!1:b.call(this,c)},b}),a("select2/dropdown/selectOnClose",[],function(){function a(){}return a.prototype.bind=function(a,b,c){var d=this;a.call(this,b,c),b.on("close",function(){d._handleSelectOnClose()})},a.prototype._handleSelectOnClose=function(){var a=this.getHighlightedResults();a.length<1||a.trigger("mouseup")},a}),a("select2/i18n/en",[],function(){return{errorLoading:function(){return"The results could not be loaded."},inputTooLong:function(a){var b=a.input.length-a.maximum,c="Please delete "+b+" character";return 1!=b&&(c+="s"),c},inputTooShort:function(a){var b=a.minimum-a.input.length,c="Please enter "+b+" or more characters";return c},loadingMore:function(){return"Loading more results…"},maximumSelected:function(a){var b="You can only select "+a.maximum+" item";return 1!=a.maximum&&(b+="s"),b},noResults:function(){return"No results found"},searching:function(){return"Searching…"}}}),a("select2/defaults",["jquery","./results","./selection/single","./selection/multiple","./selection/placeholder","./selection/allowClear","./selection/search","./selection/eventRelay","./utils","./translation","./diacritics","./data/select","./data/array","./data/ajax","./data/tags","./data/tokenizer","./data/minimumInputLength","./data/maximumInputLength","./data/maximumSelectionLength","./dropdown","./dropdown/search","./dropdown/hidePlaceholder","./dropdown/infiniteScroll","./dropdown/attachBody","./dropdown/minimumResultsForSearch","./dropdown/selectOnClose","./i18n/en"],function(a,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B){function C(){this.reset()}C.prototype.apply=function(l){if(l=a.extend({},this.defaults,l),null==l.dataAdapter){if(l.dataAdapter=null!=l.ajax?o:null!=l.data?n:m,l.minimumInputLength>0&&(l.dataAdapter=j.Decorate(l.dataAdapter,r)),l.maximumInputLength>0&&(l.dataAdapter=j.Decorate(l.dataAdapter,s)),l.maximumSelectionLength>0&&(l.dataAdapter=j.Decorate(l.dataAdapter,t)),null!=l.tags&&(l.dataAdapter=j.Decorate(l.dataAdapter,p)),(null!=l.tokenSeparators||null!=l.tokenizer)&&(l.dataAdapter=j.Decorate(l.dataAdapter,q)),null!=l.query){var B=b(l.amdBase+"compat/query");l.dataAdapter=j.Decorate(l.dataAdapter,B)}if(null!=l.initSelection){var C=b(l.amdBase+"compat/initSelection");l.dataAdapter=j.Decorate(l.dataAdapter,C)}}if(null==l.resultsAdapter&&(l.resultsAdapter=c,null!=l.ajax&&(l.resultsAdapter=j.Decorate(l.resultsAdapter,x)),null!=l.placeholder&&(l.resultsAdapter=j.Decorate(l.resultsAdapter,w)),l.selectOnClose&&(l.resultsAdapter=j.Decorate(l.resultsAdapter,A))),null==l.dropdownAdapter){if(l.multiple)l.dropdownAdapter=u;else{var D=j.Decorate(u,v);l.dropdownAdapter=D}l.minimumResultsForSearch>0&&(l.dropdownAdapter=j.Decorate(l.dropdownAdapter,z)),l.dropdownAdapter=j.Decorate(l.dropdownAdapter,y)}if(null==l.selectionAdapter&&(l.selectionAdapter=l.multiple?e:d,null!=l.placeholder&&(l.selectionAdapter=j.Decorate(l.selectionAdapter,f),l.allowClear&&(l.selectionAdapter=j.Decorate(l.selectionAdapter,g))),l.multiple&&(l.selectionAdapter=j.Decorate(l.selectionAdapter,h)),l.selectionAdapter=j.Decorate(l.selectionAdapter,i)),"string"==typeof l.language)if(l.language.indexOf("-")>0){var E=l.language.split("-"),F=E[0];l.language=[l.language,F]}else l.language=[l.language];if(a.isArray(l.language)){var G=new k;l.language.push("en");for(var H=l.language,I=0;I<H.length;I++){var J=H[I],K={};try{K=k.loadPath(J)}catch(L){try{J=this.defaults.amdLanguageBase+J,K=k.loadPath(J)}catch(M){console&&console.warn&&console.warn('Select2: The lanugage file for "'+J+'" could not be automatically loaded. A fallback will be used instead.');continue}}G.extend(K)}l.translations=G}else l.translations=new k(l.language);return l},C.prototype.reset=function(){function b(a){function b(a){return l[a]||a}return a.replace(/[^\u0000-\u007E]/g,b)}function c(d,e){if(""===a.trim(d.term))return e;if(e.children&&e.children.length>0){for(var f=a.extend(!0,{},e),g=e.children.length-1;g>=0;g--){var h=e.children[g],i=c(d,h);null==i&&f.children.splice(g,1)}return f.children.length>0?f:c(d,f)}var j=b(e.text).toUpperCase(),k=b(d.term).toUpperCase();return j.indexOf(k)>-1?e:null}this.defaults={amdBase:"select2/",amdLanguageBase:"select2/i18n/",language:B,matcher:c,minimumInputLength:0,maximumInputLength:0,maximumSelectionLength:0,minimumResultsForSearch:0,selectOnClose:!1,sorter:function(a){return a},templateResult:function(a){return a.text},templateSelection:function(a){return a.text},theme:"default",width:"resolve"}},C.prototype.set=function(b,c){var d=a.camelCase(b),e={};e[d]=c;var f=j._convertData(e);a.extend(this.defaults,f)};var D=new C;return D}),a("select2/options",["jquery","./defaults","./utils"],function(a,b,c){function d(a,c){this.options=a,null!=c&&this.fromElement(c),this.options=b.apply(this.options)}return d.prototype.fromElement=function(b){var d=["select2"];null==this.options.multiple&&(this.options.multiple=b.prop("multiple")),null==this.options.disabled&&(this.options.disabled=b.prop("disabled")),null==this.options.language&&(b.prop("lang")?this.options.language=b.prop("lang").toLowerCase():b.closest("[lang]").prop("lang")&&(this.options.language=b.closest("[lang]").prop("lang"))),null==this.options.dir&&(this.options.dir=b.prop("dir")?b.prop("dir"):b.closest("[dir]").prop("dir")?b.closest("[dir]").prop("dir"):"ltr"),b.prop("disabled",this.options.disabled),b.prop("multiple",this.options.multiple),b.data("select2-tags")&&(console&&console.warn&&console.warn('Select2: The `data-select2-tags` attribute has been changed to use the `data-data` and `data-tags="true"` attributes and will be removed in future versions of Select2.'),b.data("data",b.data("select2-tags")),b.data("tags",!0)),b.data("ajax-url")&&(console&&console.warn&&console.warn("Select2: The `data-ajax-url` attribute has been changed to `data-ajax--url` and support for the old attribute will be removed in future versions of Select2."),b.data("ajax--url",b.data("ajax-url")));var e=b.data();e=c._convertData(e);for(var f in e)d.indexOf(f)>-1||(a.isPlainObject(this.options[f])?a.extend(this.options[f],e[f]):this.options[f]=e[f]);return this},d.prototype.get=function(a){return this.options[a]},d.prototype.set=function(a,b){this.options[a]=b},d}),a("select2/core",["jquery","./options","./utils","./keys"],function(a,b,c,d){var e=function(a,c){null!=a.data("select2")&&a.data("select2").destroy(),this.$element=a,this.id=this._generateId(a),c=c||{},this.options=new b(c,a),e.__super__.constructor.call(this);var d=this.options.get("dataAdapter");this.data=new d(a,this.options);var f=this.render();this._placeContainer(f);var g=this.options.get("selectionAdapter");this.selection=new g(a,this.options),this.$selection=this.selection.render(),this.selection.position(this.$selection,f);var h=this.options.get("dropdownAdapter");this.dropdown=new h(a,this.options),this.$dropdown=this.dropdown.render(),this.dropdown.position(this.$dropdown,f);var i=this.options.get("resultsAdapter");this.results=new i(a,this.options,this.data),this.$results=this.results.render(),this.results.position(this.$results,this.$dropdown);var j=this;this._bindAdapters(),this._registerDomEvents(),this._registerDataEvents(),this._registerSelectionEvents(),this._registerDropdownEvents(),this._registerResultsEvents(),this._registerEvents(),this.data.current(function(a){j.trigger("selection:update",{data:a})}),a.hide(),this._syncAttributes(),this._tabindex=a.attr("tabindex")||0,a.attr("tabindex","-1"),a.data("select2",this)};return c.Extend(e,c.Observable),e.prototype._generateId=function(a){var b="";return b=null!=a.attr("id")?a.attr("id"):null!=a.attr("name")?a.attr("name")+"-"+c.generateChars(2):c.generateChars(4),b="select2-"+b},e.prototype._placeContainer=function(a){a.insertAfter(this.$element);var b=this._resolveWidth(this.$element,this.options.get("width"));null!=b&&a.css("width",b)},e.prototype._resolveWidth=function(a,b){var c=/^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;if("resolve"==b){var d=this._resolveWidth(a,"style");return null!=d?d:this._resolveWidth(a,"element")}if("element"==b){var e=a.outerWidth(!1);return 0>=e?"auto":e+"px"}if("style"==b){var f=a.attr("style");if("string"!=typeof f)return null;var g=f.split(";");for(i=0,l=g.length;l>i;i+=1){attr=g[i].replace(/\s/g,"");var h=attr.match(c);if(null!==h&&h.length>=1)return h[1]}return null}return b},e.prototype._bindAdapters=function(){this.data.bind(this,this.$container),this.selection.bind(this,this.$container),this.dropdown.bind(this,this.$container),this.results.bind(this,this.$container)},e.prototype._registerDomEvents=function(){var b=this;this.$element.on("change.select2",function(){b.data.current(function(a){b.trigger("selection:update",{data:a})})}),this._sync=c.bind(this._syncAttributes,this),this.$element[0].attachEvent&&this.$element[0].attachEvent("onpropertychange",this._sync);var d=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver;null!=d&&(this._observer=new d(function(c){a.each(c,b._sync)}),this._observer.observe(this.$element[0],{attributes:!0,subtree:!1}))},e.prototype._registerDataEvents=function(){var a=this;this.data.on("*",function(b,c){a.trigger(b,c)})},e.prototype._registerSelectionEvents=function(){var a=this,b=["toggle"];this.selection.on("toggle",function(){a.toggleDropdown()}),this.selection.on("*",function(c,d){-1===b.indexOf(c)&&a.trigger(c,d)})},e.prototype._registerDropdownEvents=function(){var a=this;this.dropdown.on("*",function(b,c){a.trigger(b,c)})},e.prototype._registerResultsEvents=function(){var a=this;this.results.on("*",function(b,c){a.trigger(b,c)})},e.prototype._registerEvents=function(){var a=this;this.on("open",function(){a.$container.addClass("select2-container--open")}),this.on("close",function(){a.$container.removeClass("select2-container--open")}),this.on("enable",function(){a.$container.removeClass("select2-container--disabled")}),this.on("disable",function(){a.$container.addClass("select2-container--disabled")}),this.on("query",function(b){this.data.query(b,function(c){a.trigger("results:all",{data:c,query:b})})}),this.on("query:append",function(b){this.data.query(b,function(c){a.trigger("results:append",{data:c,query:b})})}),this.on("keypress",function(b){var c=b.which;a.isOpen()?c===d.ENTER?(a.trigger("results:select"),b.preventDefault()):c===d.UP?(a.trigger("results:previous"),b.preventDefault()):c===d.DOWN?(a.trigger("results:next"),b.preventDefault()):(c===d.ESC||c===d.TAB)&&(a.close(),b.preventDefault()):(c===d.ENTER||c===d.SPACE||(c===d.DOWN||c===d.UP)&&b.altKey)&&(a.open(),b.preventDefault())})},e.prototype._syncAttributes=function(){this.options.set("disabled",this.$element.prop("disabled")),this.options.get("disabled")?(this.isOpen()&&this.close(),this.trigger("disable")):this.trigger("enable")},e.prototype.trigger=function(a,b){var c=e.__super__.trigger,d={open:"opening",close:"closing",select:"selecting",unselect:"unselecting"};if(a in d){var f=d[a],g={prevented:!1,name:a,args:b};if(c.call(this,f,g),g.prevented)return void(b.prevented=!0)}c.call(this,a,b)},e.prototype.toggleDropdown=function(){this.options.get("disabled")||(this.isOpen()?this.close():this.open())},e.prototype.open=function(){this.isOpen()||(this.trigger("query",{}),this.trigger("open"))},e.prototype.close=function(){this.isOpen()&&this.trigger("close")},e.prototype.isOpen=function(){return this.$container.hasClass("select2-container--open")},e.prototype.enable=function(a){console&&console.warn&&console.warn('Select2: The `select2("enable")` method has been deprecated and will be removed in later Select2 versions. Use $element.prop("disabled") instead.'),0===a.length&&(a=[!0]);var b=!a[0];this.$element.prop("disabled",b)},e.prototype.val=function(b){if(console&&console.warn&&console.warn('Select2: The `select2("val")` method has been deprecated and will be removed in later Select2 versions. Use $element.val() instead.'),0===b.length)return this.$element.val();var c=b[0];a.isArray(c)&&(c=a.map(c,function(a){return a.toString()})),this.$element.val(c).trigger("change")},e.prototype.destroy=function(){this.$container.remove(),this.$element[0].detachEvent&&this.$element[0].detachEvent("onpropertychange",this._sync),null!=this._observer&&(this._observer.disconnect(),this._observer=null),this._sync=null,this.$element.off(".select2"),this.$element.attr("tabindex",this._tabindex),this.$element.show(),this.$element.removeData("select2"),this.data.destroy(),this.selection.destroy(),this.dropdown.destroy(),this.results.destroy(),this.data=null,this.selection=null,this.dropdown=null,this.results=null},e.prototype.render=function(){var b=a('<span class="select2 select2-container"><span class="selection"></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>');return b.attr("dir",this.options.get("dir")),this.$container=b,this.$container.addClass("select2-container--"+this.options.get("theme")),b.data("element",this.$element),b},e}),a("jquery.select2",["jquery","./select2/core","./select2/defaults"],function(a,c,d){try{b("jquery.mousewheel")}catch(e){}return null==a.fn.select2&&(a.fn.select2=function(b){if(b=b||{},"object"==typeof b)return this.each(function(){{var d=a.extend({},b,!0);new c(a(this),d)}}),this;if("string"==typeof b){var d=this.data("select2"),e=Array.prototype.slice.call(arguments,1);return d[b](e)}throw new Error("Invalid arguments for Select2: "+b)}),null==a.fn.select2.defaults&&(a.fn.select2.defaults=d),c}),b("jquery.select2"),jQuery.fn.select2.amd={define:a,require:b}}();

// Spectrum Colorpicker v1.1.1
// https://github.com/bgrins/spectrum
// Author: Brian Grinstead
// License: MIT

(function (window, $, undefined) {
    var defaultOpts = {

        // Callbacks
        beforeShow: noop,
        move: noop,
        change: noop,
        show: noop,
        hide: noop,

        // Options
        hexNames: {},
        color: false,
        flat: false,
        showInput: false,
        showButtons: true,
        clickoutFiresChange: false,
        showInitial: false,
        showPalette: false,
        showPaletteOnly: false,
        showSelectionPalette: true,
        localStorageKey: false,
        appendTo: "body",
        maxSelectionSize: 7,
        cancelText: "cancel",
        chooseText: "choose",
        preferredFormat: false,
        className: "",
        showAlpha: false,
        theme: "sp-light",
        palette: ['fff', '000'],
        selectionPalette: [],
        disabled: false
    },
    spectrums = [],
    IE = !!/msie/i.exec( window.navigator.userAgent ),
    rgbaSupport = (function() {
        function contains( str, substr ) {
            return !!~('' + str).indexOf(substr);
        }

        var elem = document.createElement('div');
        var style = elem.style;
        style.cssText = 'background-color:rgba(0,0,0,.5)';
        return contains(style.backgroundColor, 'rgba') || contains(style.backgroundColor, 'hsla');
    })(),
    replaceInput = [
        "<div class='sp-replacer'>",
            "<div class='sp-preview'><div class='sp-preview-inner'></div></div>",
            "<div class='sp-dd'>&#9660;</div>",
        "</div>"
    ].join(''),
    markup = (function () {

        // IE does not support gradients with multiple stops, so we need to simulate
        //  that for the rainbow slider with 8 divs that each have a single gradient
        var gradientFix = "";
        if (IE) {
            for (var i = 1; i <= 6; i++) {
                gradientFix += "<div class='sp-" + i + "'></div>";
            }
        }

        return [
            "<div class='sp-container sp-hidden'>",
                "<div class='sp-palette-container'>",
                    "<div class='sp-palette sp-thumb sp-cf'></div>",
                "</div>",
                "<div class='sp-picker-container'>",
                    "<div class='sp-top sp-cf'>",
                        "<div class='sp-fill'></div>",
                        "<div class='sp-top-inner'>",
                            "<div class='sp-color'>",
                                "<div class='sp-sat'>",
                                    "<div class='sp-val'>",
                                        "<div class='sp-dragger'></div>",
                                    "</div>",
                                "</div>",
                            "</div>",
                            "<div class='sp-hue'>",
                                "<div class='sp-slider'></div>",
                                gradientFix,
                            "</div>",
                        "</div>",
                        "<div class='sp-alpha'><div class='sp-alpha-inner'><div class='sp-alpha-handle'></div></div></div>",
                    "</div>",
                    "<div class='sp-input-container sp-cf'>",
                        "<input class='sp-input' type='text' spellcheck='false'  />",
                    "</div>",
                    "<div class='sp-initial sp-thumb sp-cf'></div>",
                    "<div class='sp-button-container sp-cf'>",
                        "<a class='sp-cancel' href='#'></a>",
                        "<button class='sp-choose'></button>",
                    "</div>",
                "</div>",
            "</div>"
        ].join("");
    })();

    function paletteTemplate (p, color, className, hexNames) {
        var html = [];
        for (var i = 0; i < p.length; i++) {
            var tiny = tinycolor(p[i]);
            var c = tiny.toHsl().l < 0.5 ? "sp-thumb-el sp-thumb-dark" : "sp-thumb-el sp-thumb-light";
            c += (tinycolor.equals(color, p[i])) ? " sp-thumb-active" : "";

            var swatchStyle = rgbaSupport ? ("background-color:" + tiny.toRgbString()) : "filter:" + tiny.toFilter(),
            	hexName = tiny.toName() == false ? tiny.toRgbString() : tiny.toName();
            if(hexNames[tiny.toHex()] != undefined) {
	            hexName = hexNames[tiny.toHex()];
            }
            html.push('<span title="' + hexName + '" data-color="' + tiny.toRgbString() + '" class="' + c + '"><span class="sp-thumb-inner" style="' + swatchStyle + ';" /></span>');
        }
        return "<div class='sp-cf " + className + "'>" + html.join('') + "</div>";
    }

    function hideAll() {
        for (var i = 0; i < spectrums.length; i++) {
            if (spectrums[i]) {
                spectrums[i].hide();
            }
        }
    }

    function instanceOptions(o, callbackContext) {
        var opts = $.extend({}, defaultOpts, o);
        opts.callbacks = {
            'move': bind(opts.move, callbackContext),
            'change': bind(opts.change, callbackContext),
            'show': bind(opts.show, callbackContext),
            'hide': bind(opts.hide, callbackContext),
            'beforeShow': bind(opts.beforeShow, callbackContext)
        };

        return opts;
    }

    function spectrum(element, o) {

        var opts = instanceOptions(o, element),
            flat = opts.flat,
            showSelectionPalette = opts.showSelectionPalette,
            localStorageKey = opts.localStorageKey,
            theme = opts.theme,
            callbacks = opts.callbacks,
            resize = throttle(reflow, 10),
            visible = false,
            dragWidth = 0,
            dragHeight = 0,
            dragHelperHeight = 0,
            slideHeight = 0,
            slideWidth = 0,
            alphaWidth = 0,
            alphaSlideHelperWidth = 0,
            slideHelperHeight = 0,
            currentHue = 0,
            currentSaturation = 0,
            currentValue = 0,
            currentAlpha = 1,
            palette = opts.palette.slice(0),
            paletteArray = $.isArray(palette[0]) ? palette : [palette],
            selectionPalette = opts.selectionPalette.slice(0),
            maxSelectionSize = opts.maxSelectionSize,
            draggingClass = "sp-dragging",
            shiftMovementDirection = null;

        var doc = element.ownerDocument,
            body = doc.body,
            boundElement = $(element),
            disabled = false,
            container = $(markup, doc).addClass(theme),
            dragger = container.find(".sp-color"),
            dragHelper = container.find(".sp-dragger"),
            slider = container.find(".sp-hue"),
            slideHelper = container.find(".sp-slider"),
            alphaSliderInner = container.find(".sp-alpha-inner"),
            alphaSlider = container.find(".sp-alpha"),
            alphaSlideHelper = container.find(".sp-alpha-handle"),
            textInput = container.find(".sp-input"),
            paletteContainer = container.find(".sp-palette"),
            initialColorContainer = container.find(".sp-initial"),
            cancelButton = container.find(".sp-cancel"),
            chooseButton = container.find(".sp-choose"),
            isInput = boundElement.is("input"),
            shouldReplace = isInput && !flat,
            replacer = (shouldReplace) ? $(replaceInput).addClass(theme).addClass(opts.className) : $([]),
            offsetElement = (shouldReplace) ? replacer : boundElement,
            previewElement = replacer.find(".sp-preview-inner"),
            initialColor = opts.color || (isInput && boundElement.val()),
            colorOnShow = false,
            preferredFormat = opts.preferredFormat,
            currentPreferredFormat = preferredFormat,
            clickoutFiresChange = !opts.showButtons || opts.clickoutFiresChange;


        function applyOptions() {

            container.toggleClass("sp-flat", flat);
            container.toggleClass("sp-input-disabled", !opts.showInput);
            container.toggleClass("sp-alpha-enabled", opts.showAlpha);
            container.toggleClass("sp-buttons-disabled", !opts.showButtons);
            container.toggleClass("sp-palette-disabled", !opts.showPalette);
            container.toggleClass("sp-palette-only", opts.showPaletteOnly);
            container.toggleClass("sp-initial-disabled", !opts.showInitial);
            container.addClass(opts.className);

            reflow();
        }

        function initialize() {

            if (IE) {
                container.find("*:not(input)").attr("unselectable", "on");
            }

            applyOptions();

            if (shouldReplace) {
                boundElement.after(replacer).hide();
            }

            if (flat) {
                boundElement.after(container).hide();
            }
            else {

                var appendTo = opts.appendTo === "parent" ? boundElement.parent() : $(opts.appendTo);
                if (appendTo.length !== 1) {
                    appendTo = $("body");
                }

                appendTo.append(container);
            }

            if (localStorageKey && window.localStorage) {

                // Migrate old palettes over to new format.  May want to remove this eventually.
                try {
                    var oldPalette = window.localStorage[localStorageKey].split(",#");
                    if (oldPalette.length > 1) {
                        delete window.localStorage[localStorageKey];
                        $.each(oldPalette, function(i, c) {
                             addColorToSelectionPalette(c);
                        });
                    }
                }
                catch(e) { }

                try {
                    selectionPalette = window.localStorage[localStorageKey].split(";");
                }
                catch (e) { }
            }

            offsetElement.bind("click.spectrum touchstart.spectrum", function (e) {
                if (!disabled) {
                    toggle();
                }

                e.stopPropagation();

                if (!$(e.target).is("input")) {
                    e.preventDefault();
                }
            });

            if(boundElement.is(":disabled") || (opts.disabled === true)) {
                disable();
            }

            // Prevent clicks from bubbling up to document.  This would cause it to be hidden.
            container.click(stopPropagation);

            // Handle user typed input
            textInput.change(setFromTextInput);
            textInput.bind("paste", function () {
                setTimeout(setFromTextInput, 1);
            });
            textInput.keydown(function (e) { if (e.keyCode == 13) { setFromTextInput(); } });

            cancelButton.text(opts.cancelText);
            cancelButton.bind("click.spectrum", function (e) {
                e.stopPropagation();
                e.preventDefault();
                hide("cancel");
            });

            chooseButton.text(opts.chooseText);
            chooseButton.bind("click.spectrum", function (e) {
                e.stopPropagation();
                e.preventDefault();

                if (isValid()) {
                    updateOriginalInput(true);
                    hide();
                }
            });

            draggable(alphaSlider, function (dragX, dragY, e) {
                currentAlpha = (dragX / alphaWidth);
                if (e.shiftKey) {
                    currentAlpha = Math.round(currentAlpha * 10) / 10;
                }

                move();
            });

            draggable(slider, function (dragX, dragY) {
                currentHue = parseFloat(dragY / slideHeight);
                move();
            }, dragStart, dragStop);

            draggable(dragger, function (dragX, dragY, e) {

                // shift+drag should snap the movement to either the x or y axis.
                if (!e.shiftKey) {
                    shiftMovementDirection = null;
                }
                else if (!shiftMovementDirection) {
                    var oldDragX = currentSaturation * dragWidth;
                    var oldDragY = dragHeight - (currentValue * dragHeight);
                    var furtherFromX = Math.abs(dragX - oldDragX) > Math.abs(dragY - oldDragY);

                    shiftMovementDirection = furtherFromX ? "x" : "y";
                }

                var setSaturation = !shiftMovementDirection || shiftMovementDirection === "x";
                var setValue = !shiftMovementDirection || shiftMovementDirection === "y";

                if (setSaturation) {
                    currentSaturation = parseFloat(dragX / dragWidth);
                }
                if (setValue) {
                    currentValue = parseFloat((dragHeight - dragY) / dragHeight);
                }

                move();

            }, dragStart, dragStop);

            if (!!initialColor) {
                set(initialColor);

                // In case color was black - update the preview UI and set the format
                // since the set function will not run (default color is black).
                updateUI();
                currentPreferredFormat = preferredFormat || tinycolor(initialColor).format;

                addColorToSelectionPalette(initialColor);
            }
            else {
                updateUI();
            }

            if (flat) {
                show();
            }

            function palletElementClick(e) {
                if (e.data && e.data.ignore) {
                    set($(this).data("color"));
                    move();
                }
                else {
                    set($(this).data("color"));
                    updateOriginalInput(true);
                    move();
                    hide();
                }

                return false;
            }

            var paletteEvent = IE ? "mousedown.spectrum" : "click.spectrum touchstart.spectrum";
            paletteContainer.delegate(".sp-thumb-el", paletteEvent, palletElementClick);
            initialColorContainer.delegate(".sp-thumb-el:nth-child(1)", paletteEvent, { ignore: true }, palletElementClick);
        }

        function addColorToSelectionPalette(color) {
            if (showSelectionPalette) {
                var colorRgb = tinycolor(color).toRgbString();
                if ($.inArray(colorRgb, selectionPalette) === -1) {
                    selectionPalette.push(colorRgb);
                    while(selectionPalette.length > maxSelectionSize) {
                        selectionPalette.shift();
                    }
                }

                if (localStorageKey && window.localStorage) {
                    try {
                        window.localStorage[localStorageKey] = selectionPalette.join(";");
                    }
                    catch(e) { }
                }
            }
        }

        function getUniqueSelectionPalette() {
            var unique = [];
            var p = selectionPalette;
            var paletteLookup = {};
            var rgb;

            if (opts.showPalette) {

                for (var i = 0; i < paletteArray.length; i++) {
                    for (var j = 0; j < paletteArray[i].length; j++) {
                        rgb = tinycolor(paletteArray[i][j]).toRgbString();
                        paletteLookup[rgb] = true;
                    }
                }

                for (i = 0; i < p.length; i++) {
                    rgb = tinycolor(p[i]).toRgbString();

                    if (!paletteLookup.hasOwnProperty(rgb)) {
                        unique.push(p[i]);
                        paletteLookup[rgb] = true;
                    }
                }
            }

            return unique.reverse().slice(0, opts.maxSelectionSize);
        }

        function drawPalette() {

            var currentColor = get();

            var html = $.map(paletteArray, function (palette, i) {
                return paletteTemplate(palette, currentColor, "sp-palette-row sp-palette-row-" + i, opts.hexNames);
            });

            if (selectionPalette) {
                html.push(paletteTemplate(getUniqueSelectionPalette(), currentColor, "sp-palette-row sp-palette-row-selection", opts.hexNames));
            }

            paletteContainer.html(html.join(""));
        }

        function drawInitial() {
            if (opts.showInitial) {
                var initial = colorOnShow;
                var current = get();
                initialColorContainer.html(paletteTemplate([initial, current], current, "sp-palette-row-initial", opts.hexNames));
            }
        }

        function dragStart() {
            if (dragHeight <= 0 || dragWidth <= 0 || slideHeight <= 0) {
                reflow();
            }
            container.addClass(draggingClass);
            shiftMovementDirection = null;
        }

        function dragStop() {
            container.removeClass(draggingClass);
        }

        function setFromTextInput() {
            var tiny = tinycolor(textInput.val());
            if (tiny.ok) {
                set(tiny);
            }
            else {
                textInput.addClass("sp-validation-error");
            }
        }

        function toggle() {
            if (visible) {
                hide();
            }
            else {
                show();
            }
        }

        function show() {
            var event = $.Event('beforeShow.spectrum');

            if (visible) {
                reflow();
                return;
            }

            boundElement.trigger(event, [ get() ]);

            if (callbacks.beforeShow(get()) === false || event.isDefaultPrevented()) {
                return;
            }

            hideAll();
            visible = true;

            $(doc).bind("click.spectrum", hide);
            $(window).bind("resize.spectrum", resize);
            replacer.addClass("sp-active");
            container.removeClass("sp-hidden");

            if (opts.showPalette) {
                drawPalette();
            }
            reflow();
            updateUI();

            colorOnShow = get();

            drawInitial();
            callbacks.show(colorOnShow);
            boundElement.trigger('show.spectrum', [ colorOnShow ]);
        }

        function hide(e) {

            // Return on right click
            if (e && e.type == "click" && e.button == 2) { return; }

            // Return if hiding is unnecessary
            if (!visible || flat) { return; }
            visible = false;

            $(doc).unbind("click.spectrum", hide);
            $(window).unbind("resize.spectrum", resize);

            replacer.removeClass("sp-active");
            container.addClass("sp-hidden");

            var colorHasChanged = !tinycolor.equals(get(), colorOnShow);

            if (colorHasChanged) {
                if (clickoutFiresChange && e !== "cancel") {
                    updateOriginalInput(true);
                }
                else {
                    revert();
                }
            }

            callbacks.hide(get());
            boundElement.trigger('hide.spectrum', [ get() ]);
        }

        function revert() {
            set(colorOnShow, true);
        }

        function set(color, ignoreFormatChange) {
            if (tinycolor.equals(color, get())) {
                return;
            }

            var newColor = tinycolor(color);
            var newHsv = newColor.toHsv();

            currentHue = (newHsv.h % 360) / 360;
            currentSaturation = newHsv.s;
            currentValue = newHsv.v;
            currentAlpha = newHsv.a;

            updateUI();

            if (newColor.ok && !ignoreFormatChange) {
                currentPreferredFormat = preferredFormat || newColor.format;
            }
        }

        function get(opts) {
            opts = opts || { };
            return tinycolor.fromRatio({
                h: currentHue,
                s: currentSaturation,
                v: currentValue,
                a: Math.round(currentAlpha * 100) / 100
            }, { format: opts.format || currentPreferredFormat });
        }

        function isValid() {
            return !textInput.hasClass("sp-validation-error");
        }

        function move() {
            updateUI();

            callbacks.move(get());
            boundElement.trigger('move.spectrum', [ get() ]);
        }

        function updateUI() {

            textInput.removeClass("sp-validation-error");

            updateHelperLocations();

            // Update dragger background color (gradients take care of saturation and value).
            var flatColor = tinycolor.fromRatio({ h: currentHue, s: 1, v: 1 });
            dragger.css("background-color", flatColor.toHexString());

            // Get a format that alpha will be included in (hex and names ignore alpha)
            var format = currentPreferredFormat;
            if (currentAlpha < 1) {
                if (format === "hex" || format === "hex3" || format === "hex6" || format === "name") {
                    format = "rgb";
                }
            }

            var realColor = get({ format: format }),
                realHex = realColor.toHexString(),
                realRgb = realColor.toRgbString();

            // Update the replaced elements background color (with actual selected color)
            if (rgbaSupport || realColor.alpha === 1) {
                previewElement.css("background-color", realRgb);
            }
            else {
                previewElement.css("background-color", "transparent");
                previewElement.css("filter", realColor.toFilter());
            }

            if (opts.showAlpha) {
                var rgb = realColor.toRgb();
                rgb.a = 0;
                var realAlpha = tinycolor(rgb).toRgbString();
                var gradient = "linear-gradient(left, " + realAlpha + ", " + realHex + ")";

                if (IE) {
                    alphaSliderInner.css("filter", tinycolor(realAlpha).toFilter({ gradientType: 1 }, realHex));
                }
                else {
                    alphaSliderInner.css("background", "-webkit-" + gradient);
                    alphaSliderInner.css("background", "-moz-" + gradient);
                    alphaSliderInner.css("background", "-ms-" + gradient);
                    alphaSliderInner.css("background", gradient);
                }
            }


            // Update the text entry input as it changes happen
            if (opts.showInput) {
                textInput.val(realColor.toString(format));
            }

            if (opts.showPalette) {
                drawPalette();
            }

            drawInitial();
        }

        function updateHelperLocations() {
            var s = currentSaturation;
            var v = currentValue;

            // Where to show the little circle in that displays your current selected color
            var dragX = s * dragWidth;
            var dragY = dragHeight - (v * dragHeight);
            dragX = Math.max(
                -dragHelperHeight,
                Math.min(dragWidth - dragHelperHeight, dragX - dragHelperHeight)
            );
            dragY = Math.max(
                -dragHelperHeight,
                Math.min(dragHeight - dragHelperHeight, dragY - dragHelperHeight)
            );
            dragHelper.css({
                "top": dragY,
                "left": dragX
            });

            var alphaX = currentAlpha * alphaWidth;
            alphaSlideHelper.css({
                "left": alphaX - (alphaSlideHelperWidth / 2)
            });

            // Where to show the bar that displays your current selected hue
            var slideY = (currentHue) * slideHeight;
            slideHelper.css({
                "top": slideY - slideHelperHeight
            });
        }

        function updateOriginalInput(fireCallback) {
            var color = get();

            if (isInput) {
                boundElement.val(color.toString(currentPreferredFormat)).change();
            }

            var hasChanged = !tinycolor.equals(color, colorOnShow);
            colorOnShow = color;

            // Update the selection palette with the current color
            addColorToSelectionPalette(color);
            if (fireCallback && hasChanged) {
                callbacks.change(color);
                boundElement.trigger('change.spectrum', [ color ]);
            }
        }

        function reflow() {
            dragWidth = dragger.width();
            dragHeight = dragger.height();
            dragHelperHeight = dragHelper.height();
            slideWidth = slider.width();
            slideHeight = slider.height();
            slideHelperHeight = slideHelper.height();
            alphaWidth = alphaSlider.width();
            alphaSlideHelperWidth = alphaSlideHelper.width();

            if (!flat) {
                container.css("position", "absolute");
                container.offset(getOffset(container, offsetElement));
            }

            updateHelperLocations();
        }

        function destroy() {
            boundElement.show();
            offsetElement.unbind("click.spectrum touchstart.spectrum");
            container.remove();
            replacer.remove();
            spectrums[spect.id] = null;
        }

        function option(optionName, optionValue) {
            if (optionName === undefined) {
                return $.extend({}, opts);
            }
            if (optionValue === undefined) {
                return opts[optionName];
            }

            opts[optionName] = optionValue;
            applyOptions();
        }

        function enable() {
            disabled = false;
            boundElement.attr("disabled", false);
            offsetElement.removeClass("sp-disabled");
        }

        function disable() {
            hide();
            disabled = true;
            boundElement.attr("disabled", true);
            offsetElement.addClass("sp-disabled");
        }

        initialize();

        var spect = {
            show: show,
            hide: hide,
            toggle: toggle,
            reflow: reflow,
            option: option,
            enable: enable,
            disable: disable,
            set: function (c) {
                set(c);
                updateOriginalInput();
            },
            get: get,
            destroy: destroy,
            container: container
        };

        spect.id = spectrums.push(spect) - 1;

        return spect;
    }

    /**
    * checkOffset - get the offset below/above and left/right element depending on screen position
    * Thanks https://github.com/jquery/jquery-ui/blob/master/ui/jquery.ui.datepicker.js
    */
    function getOffset(picker, input) {
        var extraY = 0;
        var dpWidth = picker.outerWidth();
        var dpHeight = picker.outerHeight();
        var inputHeight = input.outerHeight();
        var doc = picker[0].ownerDocument;
        var docElem = doc.documentElement;
        var viewWidth = docElem.clientWidth + $(doc).scrollLeft();
        var viewHeight = docElem.clientHeight + $(doc).scrollTop();
        var offset = input.offset();
        offset.top += inputHeight;

        offset.left -=
            Math.min(offset.left, (offset.left + dpWidth > viewWidth && viewWidth > dpWidth) ?
            Math.abs(offset.left + dpWidth - viewWidth) : 0);

        offset.top -=
            Math.min(offset.top, ((offset.top + dpHeight > viewHeight && viewHeight > dpHeight) ?
            Math.abs(dpHeight + inputHeight - extraY) : extraY));

        return offset;
    }

    /**
    * noop - do nothing
    */
    function noop() {

    }

    /**
    * stopPropagation - makes the code only doing this a little easier to read in line
    */
    function stopPropagation(e) {
        e.stopPropagation();
    }

    /**
    * Create a function bound to a given object
    * Thanks to underscore.js
    */
    function bind(func, obj) {
        var slice = Array.prototype.slice;
        var args = slice.call(arguments, 2);
        return function () {
            return func.apply(obj, args.concat(slice.call(arguments)));
        };
    }

    /**
    * Lightweight drag helper.  Handles containment within the element, so that
    * when dragging, the x is within [0,element.width] and y is within [0,element.height]
    */
    function draggable(element, onmove, onstart, onstop) {
        onmove = onmove || function () { };
        onstart = onstart || function () { };
        onstop = onstop || function () { };
        var doc = element.ownerDocument || document;
        var dragging = false;
        var offset = {};
        var maxHeight = 0;
        var maxWidth = 0;
        var hasTouch = ('ontouchstart' in window);

        var duringDragEvents = {};
        duringDragEvents["selectstart"] = prevent;
        duringDragEvents["dragstart"] = prevent;
        duringDragEvents["touchmove mousemove"] = move;
        duringDragEvents["touchend mouseup"] = stop;

        function prevent(e) {
            if (e.stopPropagation) {
                e.stopPropagation();
            }
            if (e.preventDefault) {
                e.preventDefault();
            }
            e.returnValue = false;
        }

        function move(e) {
            if (dragging) {
                // Mouseup happened outside of window
                if (IE && document.documentMode < 9 && !e.button) {
                    return stop();
                }

                var touches = e.originalEvent.touches;
                var pageX = touches ? touches[0].pageX : e.pageX;
                var pageY = touches ? touches[0].pageY : e.pageY;

                var dragX = Math.max(0, Math.min(pageX - offset.left, maxWidth));
                var dragY = Math.max(0, Math.min(pageY - offset.top, maxHeight));

                if (hasTouch) {
                    // Stop scrolling in iOS
                    prevent(e);
                }

                onmove.apply(element, [dragX, dragY, e]);
            }
        }
        function start(e) {
            var rightclick = (e.which) ? (e.which == 3) : (e.button == 2);
            var touches = e.originalEvent.touches;

            if (!rightclick && !dragging) {
                if (onstart.apply(element, arguments) !== false) {
                    dragging = true;
                    maxHeight = $(element).height();
                    maxWidth = $(element).width();
                    offset = $(element).offset();

                    $(doc).bind(duringDragEvents);
                    $(doc.body).addClass("sp-dragging");

                    if (!hasTouch) {
                        move(e);
                    }

                    prevent(e);
                }
            }
        }
        function stop() {
            if (dragging) {
                $(doc).unbind(duringDragEvents);
                $(doc.body).removeClass("sp-dragging");
                onstop.apply(element, arguments);
            }
            dragging = false;
        }

        $(element).bind("touchstart mousedown", start);
    }

    function throttle(func, wait, debounce) {
        var timeout;
        return function () {
            var context = this, args = arguments;
            var throttler = function () {
                timeout = null;
                func.apply(context, args);
            };
            if (debounce) clearTimeout(timeout);
            if (debounce || !timeout) timeout = setTimeout(throttler, wait);
        };
    }


    function log(){/* jshint -W021 */if(window.console){if(Function.prototype.bind)log=Function.prototype.bind.call(console.log,console);else log=function(){Function.prototype.apply.call(console.log,console,arguments);};log.apply(this,arguments);}}

    /**
    * Define a jQuery plugin
    */
    var dataID = "spectrum.id";
    $.fn.spectrum = function (opts, extra) {

        if (typeof opts == "string") {

            var returnValue = this;
            var args = Array.prototype.slice.call( arguments, 1 );

            this.each(function () {
                var spect = spectrums[$(this).data(dataID)];
                if (spect) {

                    var method = spect[opts];
                    if (!method) {
                        throw new Error( "Spectrum: no such method: '" + opts + "'" );
                    }

                    if (opts == "get") {
                        returnValue = spect.get();
                    }
                    else if (opts == "container") {
                        returnValue = spect.container;
                    }
                    else if (opts == "option") {
                        returnValue = spect.option.apply(spect, args);
                    }
                    else if (opts == "destroy") {
                        spect.destroy();
                        $(this).removeData(dataID);
                    }
                    else {
                        method.apply(spect, args);
                    }
                }
            });

            return returnValue;
        }

        // Initializing a new instance of spectrum
        return this.spectrum("destroy").each(function () {
            var spect = spectrum(this, opts);
            $(this).data(dataID, spect.id);
        });
    };

    $.fn.spectrum.load = true;
    $.fn.spectrum.loadOpts = {};
    $.fn.spectrum.draggable = draggable;
    $.fn.spectrum.defaults = defaultOpts;

    $.spectrum = { };
    $.spectrum.localization = { };
    $.spectrum.palettes = { };

    $.fn.spectrum.processNativeColorInputs = function () {
        var colorInput = $("<input type='color' value='!' />")[0];
        var supportsColor = colorInput.type === "color" && colorInput.value != "!";

        if (!supportsColor) {
            $("input[type=color]").spectrum({
                preferredFormat: "hex6"
            });
        }
    };
    // TinyColor v0.9.14
    // https://github.com/bgrins/TinyColor
    // 2013-02-24, Brian Grinstead, MIT License

    (function(root) {

        var trimLeft = /^[\s,#]+/,
            trimRight = /\s+$/,
            tinyCounter = 0,
            math = Math,
            mathRound = math.round,
            mathMin = math.min,
            mathMax = math.max,
            mathRandom = math.random;

        function tinycolor (color, opts) {

            color = (color) ? color : '';
            opts = opts || { };

            // If input is already a tinycolor, return itself
            if (typeof color == "object" && color.hasOwnProperty("_tc_id")) {
               return color;
            }
            var rgb = inputToRGB(color);
            var r = rgb.r,
                g = rgb.g,
                b = rgb.b,
                a = rgb.a,
                roundA = mathRound(100*a) / 100,
                format = opts.format || rgb.format;

            // Don't let the range of [0,255] come back in [0,1].
            // Potentially lose a little bit of precision here, but will fix issues where
            // .5 gets interpreted as half of the total, instead of half of 1
            // If it was supposed to be 128, this was already taken care of by `inputToRgb`
            if (r < 1) { r = mathRound(r); }
            if (g < 1) { g = mathRound(g); }
            if (b < 1) { b = mathRound(b); }

            return {
                ok: rgb.ok,
                format: format,
                _tc_id: tinyCounter++,
                alpha: a,
                toHsv: function() {
                    var hsv = rgbToHsv(r, g, b);
                    return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: a };
                },
                toHsvString: function() {
                    var hsv = rgbToHsv(r, g, b);
                    var h = mathRound(hsv.h * 360), s = mathRound(hsv.s * 100), v = mathRound(hsv.v * 100);
                    return (a == 1) ?
                      "hsv("  + h + ", " + s + "%, " + v + "%)" :
                      "hsva(" + h + ", " + s + "%, " + v + "%, "+ roundA + ")";
                },
                toHsl: function() {
                    var hsl = rgbToHsl(r, g, b);
                    return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: a };
                },
                toHslString: function() {
                    var hsl = rgbToHsl(r, g, b);
                    var h = mathRound(hsl.h * 360), s = mathRound(hsl.s * 100), l = mathRound(hsl.l * 100);
                    return (a == 1) ?
                      "hsl("  + h + ", " + s + "%, " + l + "%)" :
                      "hsla(" + h + ", " + s + "%, " + l + "%, "+ roundA + ")";
                },
                toHex: function(allow3Char) {
                    return rgbToHex(r, g, b, allow3Char);
                },
                toHexString: function(allow3Char) {
                    return '#' + rgbToHex(r, g, b, allow3Char);
                },
                toRgb: function() {
                    return { r: mathRound(r), g: mathRound(g), b: mathRound(b), a: a };
                },
                toRgbString: function() {
                    return (a == 1) ?
                      "rgb("  + mathRound(r) + ", " + mathRound(g) + ", " + mathRound(b) + ")" :
                      "rgba(" + mathRound(r) + ", " + mathRound(g) + ", " + mathRound(b) + ", " + roundA + ")";
                },
                toPercentageRgb: function() {
                    return { r: mathRound(bound01(r, 255) * 100) + "%", g: mathRound(bound01(g, 255) * 100) + "%", b: mathRound(bound01(b, 255) * 100) + "%", a: a };
                },
                toPercentageRgbString: function() {
                    return (a == 1) ?
                      "rgb("  + mathRound(bound01(r, 255) * 100) + "%, " + mathRound(bound01(g, 255) * 100) + "%, " + mathRound(bound01(b, 255) * 100) + "%)" :
                      "rgba(" + mathRound(bound01(r, 255) * 100) + "%, " + mathRound(bound01(g, 255) * 100) + "%, " + mathRound(bound01(b, 255) * 100) + "%, " + roundA + ")";
                },
                toName: function() {
                    return hexNames[rgbToHex(r, g, b, true)] || false;
                },
                toFilter: function(secondColor) {
                    var hex = rgbToHex(r, g, b);
                    var secondHex = hex;
                    var alphaHex = Math.round(parseFloat(a) * 255).toString(16);
                    var secondAlphaHex = alphaHex;
                    var gradientType = opts && opts.gradientType ? "GradientType = 1, " : "";

                    if (secondColor) {
                        var s = tinycolor(secondColor);
                        secondHex = s.toHex();
                        secondAlphaHex = Math.round(parseFloat(s.alpha) * 255).toString(16);
                    }

                    return "progid:DXImageTransform.Microsoft.gradient("+gradientType+"startColorstr=#" + pad2(alphaHex) + hex + ",endColorstr=#" + pad2(secondAlphaHex) + secondHex + ")";
                },
                toString: function(format) {
                    format = format || this.format;
                    var formattedString = false;
                    if (format === "rgb") {
                        formattedString = this.toRgbString();
                    }
                    if (format === "prgb") {
                        formattedString = this.toPercentageRgbString();
                    }
                    if (format === "hex" || format === "hex6") {
                        formattedString = this.toHexString();
                    }
                    if (format === "hex3") {
                        formattedString = this.toHexString(true);
                    }
                    if (format === "name") {
                        formattedString = this.toName();
                    }
                    if (format === "hsl") {
                        formattedString = this.toHslString();
                    }
                    if (format === "hsv") {
                        formattedString = this.toHsvString();
                    }

                    return formattedString || this.toHexString();
                }
            };
        }

        // If input is an object, force 1 into "1.0" to handle ratios properly
        // String input requires "1.0" as input, so 1 will be treated as 1
        tinycolor.fromRatio = function(color, opts) {
            if (typeof color == "object") {
                var newColor = {};
                for (var i in color) {
                    if (color.hasOwnProperty(i)) {
                        if (i === "a") {
                            newColor[i] = color[i];
                        }
                        else {
                            newColor[i] = convertToPercentage(color[i]);
                        }
                    }
                }
                color = newColor;
            }

            return tinycolor(color, opts);
        };

        // Given a string or object, convert that input to RGB
        // Possible string inputs:
        //
        //     "red"
        //     "#f00" or "f00"
        //     "#ff0000" or "ff0000"
        //     "rgb 255 0 0" or "rgb (255, 0, 0)"
        //     "rgb 1.0 0 0" or "rgb (1, 0, 0)"
        //     "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
        //     "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
        //     "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
        //     "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
        //     "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
        //
        function inputToRGB(color) {

            var rgb = { r: 0, g: 0, b: 0 };
            var a = 1;
            var ok = false;
            var format = false;

            if (typeof color == "string") {
                color = stringInputToObject(color);
            }

            if (typeof color == "object") {
                if (color.hasOwnProperty("r") && color.hasOwnProperty("g") && color.hasOwnProperty("b")) {
                    rgb = rgbToRgb(color.r, color.g, color.b);
                    ok = true;
                    format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
                }
                else if (color.hasOwnProperty("h") && color.hasOwnProperty("s") && color.hasOwnProperty("v")) {
                    color.s = convertToPercentage(color.s);
                    color.v = convertToPercentage(color.v);
                    rgb = hsvToRgb(color.h, color.s, color.v);
                    ok = true;
                    format = "hsv";
                }
                else if (color.hasOwnProperty("h") && color.hasOwnProperty("s") && color.hasOwnProperty("l")) {
                    color.s = convertToPercentage(color.s);
                    color.l = convertToPercentage(color.l);
                    rgb = hslToRgb(color.h, color.s, color.l);
                    ok = true;
                    format = "hsl";
                }

                if (color.hasOwnProperty("a")) {
                    a = color.a;
                }
            }

            a = parseFloat(a);

            // Handle invalid alpha characters by setting to 1
            if (isNaN(a) || a < 0 || a > 1) {
                a = 1;
            }

            return {
                ok: ok,
                format: color.format || format,
                r: mathMin(255, mathMax(rgb.r, 0)),
                g: mathMin(255, mathMax(rgb.g, 0)),
                b: mathMin(255, mathMax(rgb.b, 0)),
                a: a
            };
        }



        // Conversion Functions
        // --------------------

        // `rgbToHsl`, `rgbToHsv`, `hslToRgb`, `hsvToRgb` modified from:
        // <http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript>

        // `rgbToRgb`
        // Handle bounds / percentage checking to conform to CSS color spec
        // <http://www.w3.org/TR/css3-color/>
        // *Assumes:* r, g, b in [0, 255] or [0, 1]
        // *Returns:* { r, g, b } in [0, 255]
        function rgbToRgb(r, g, b){
            return {
                r: bound01(r, 255) * 255,
                g: bound01(g, 255) * 255,
                b: bound01(b, 255) * 255
            };
        }

        // `rgbToHsl`
        // Converts an RGB color value to HSL.
        // *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
        // *Returns:* { h, s, l } in [0,1]
        function rgbToHsl(r, g, b) {

            r = bound01(r, 255);
            g = bound01(g, 255);
            b = bound01(b, 255);

            var max = mathMax(r, g, b), min = mathMin(r, g, b);
            var h, s, l = (max + min) / 2;

            if(max == min) {
                h = s = 0; // achromatic
            }
            else {
                var d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch(max) {
                    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                    case g: h = (b - r) / d + 2; break;
                    case b: h = (r - g) / d + 4; break;
                }

                h /= 6;
            }

            return { h: h, s: s, l: l };
        }

        // `hslToRgb`
        // Converts an HSL color value to RGB.
        // *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
        // *Returns:* { r, g, b } in the set [0, 255]
        function hslToRgb(h, s, l) {
            var r, g, b;

            h = bound01(h, 360);
            s = bound01(s, 100);
            l = bound01(l, 100);

            function hue2rgb(p, q, t) {
                if(t < 0) t += 1;
                if(t > 1) t -= 1;
                if(t < 1/6) return p + (q - p) * 6 * t;
                if(t < 1/2) return q;
                if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            }

            if(s === 0) {
                r = g = b = l; // achromatic
            }
            else {
                var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                var p = 2 * l - q;
                r = hue2rgb(p, q, h + 1/3);
                g = hue2rgb(p, q, h);
                b = hue2rgb(p, q, h - 1/3);
            }

            return { r: r * 255, g: g * 255, b: b * 255 };
        }

        // `rgbToHsv`
        // Converts an RGB color value to HSV
        // *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
        // *Returns:* { h, s, v } in [0,1]
        function rgbToHsv(r, g, b) {

            r = bound01(r, 255);
            g = bound01(g, 255);
            b = bound01(b, 255);

            var max = mathMax(r, g, b), min = mathMin(r, g, b);
            var h, s, v = max;

            var d = max - min;
            s = max === 0 ? 0 : d / max;

            if(max == min) {
                h = 0; // achromatic
            }
            else {
                switch(max) {
                    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                    case g: h = (b - r) / d + 2; break;
                    case b: h = (r - g) / d + 4; break;
                }
                h /= 6;
            }
            return { h: h, s: s, v: v };
        }

        // `hsvToRgb`
        // Converts an HSV color value to RGB.
        // *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
        // *Returns:* { r, g, b } in the set [0, 255]
         function hsvToRgb(h, s, v) {

            h = bound01(h, 360) * 6;
            s = bound01(s, 100);
            v = bound01(v, 100);

            var i = math.floor(h),
                f = h - i,
                p = v * (1 - s),
                q = v * (1 - f * s),
                t = v * (1 - (1 - f) * s),
                mod = i % 6,
                r = [v, q, p, p, t, v][mod],
                g = [t, v, v, q, p, p][mod],
                b = [p, p, t, v, v, q][mod];

            return { r: r * 255, g: g * 255, b: b * 255 };
        }

        // `rgbToHex`
        // Converts an RGB color to hex
        // Assumes r, g, and b are contained in the set [0, 255]
        // Returns a 3 or 6 character hex
        function rgbToHex(r, g, b, allow3Char) {

            var hex = [
                pad2(mathRound(r).toString(16)),
                pad2(mathRound(g).toString(16)),
                pad2(mathRound(b).toString(16))
            ];

            // Return a 3 character hex if possible
            if (allow3Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1)) {
                return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
            }

            return hex.join("");
        }

        // `equals`
        // Can be called with any tinycolor input
        tinycolor.equals = function (color1, color2) {
            if (!color1 || !color2) { return false; }
            return tinycolor(color1).toRgbString() == tinycolor(color2).toRgbString();
        };
        tinycolor.random = function() {
            return tinycolor.fromRatio({
                r: mathRandom(),
                g: mathRandom(),
                b: mathRandom()
            });
        };


        // Modification Functions
        // ----------------------
        // Thanks to less.js for some of the basics here
        // <https://github.com/cloudhead/less.js/blob/master/lib/less/functions.js>


        tinycolor.desaturate = function (color, amount) {
            var hsl = tinycolor(color).toHsl();
            hsl.s -= ((amount || 10) / 100);
            hsl.s = clamp01(hsl.s);
            return tinycolor(hsl);
        };
        tinycolor.saturate = function (color, amount) {
            var hsl = tinycolor(color).toHsl();
            hsl.s += ((amount || 10) / 100);
            hsl.s = clamp01(hsl.s);
            return tinycolor(hsl);
        };
        tinycolor.greyscale = function(color) {
            return tinycolor.desaturate(color, 100);
        };
        tinycolor.lighten = function(color, amount) {
            var hsl = tinycolor(color).toHsl();
            hsl.l += ((amount || 10) / 100);
            hsl.l = clamp01(hsl.l);
            return tinycolor(hsl);
        };
        tinycolor.darken = function (color, amount) {
            var hsl = tinycolor(color).toHsl();
            hsl.l -= ((amount || 10) / 100);
            hsl.l = clamp01(hsl.l);
            return tinycolor(hsl);
        };
        tinycolor.complement = function(color) {
            var hsl = tinycolor(color).toHsl();
            hsl.h = (hsl.h + 180) % 360;
            return tinycolor(hsl);
        };


        // Combination Functions
        // ---------------------
        // Thanks to jQuery xColor for some of the ideas behind these
        // <https://github.com/infusion/jQuery-xcolor/blob/master/jquery.xcolor.js>

        tinycolor.triad = function(color) {
            var hsl = tinycolor(color).toHsl();
            var h = hsl.h;
            return [
                tinycolor(color),
                tinycolor({ h: (h + 120) % 360, s: hsl.s, l: hsl.l }),
                tinycolor({ h: (h + 240) % 360, s: hsl.s, l: hsl.l })
            ];
        };
        tinycolor.tetrad = function(color) {
            var hsl = tinycolor(color).toHsl();
            var h = hsl.h;
            return [
                tinycolor(color),
                tinycolor({ h: (h + 90) % 360, s: hsl.s, l: hsl.l }),
                tinycolor({ h: (h + 180) % 360, s: hsl.s, l: hsl.l }),
                tinycolor({ h: (h + 270) % 360, s: hsl.s, l: hsl.l })
            ];
        };
        tinycolor.splitcomplement = function(color) {
            var hsl = tinycolor(color).toHsl();
            var h = hsl.h;
            return [
                tinycolor(color),
                tinycolor({ h: (h + 72) % 360, s: hsl.s, l: hsl.l}),
                tinycolor({ h: (h + 216) % 360, s: hsl.s, l: hsl.l})
            ];
        };
        tinycolor.analogous = function(color, results, slices) {
            results = results || 6;
            slices = slices || 30;

            var hsl = tinycolor(color).toHsl();
            var part = 360 / slices;
            var ret = [tinycolor(color)];

            for (hsl.h = ((hsl.h - (part * results >> 1)) + 720) % 360; --results; ) {
                hsl.h = (hsl.h + part) % 360;
                ret.push(tinycolor(hsl));
            }
            return ret;
        };
        tinycolor.monochromatic = function(color, results) {
            results = results || 6;
            var hsv = tinycolor(color).toHsv();
            var h = hsv.h, s = hsv.s, v = hsv.v;
            var ret = [];
            var modification = 1 / results;

            while (results--) {
                ret.push(tinycolor({ h: h, s: s, v: v}));
                v = (v + modification) % 1;
            }

            return ret;
        };

        // Readability Functions
        // ---------------------
        // <http://www.w3.org/TR/AERT#color-contrast>

        // `readability`
        // Analyze the 2 colors and returns an object with the following properties:
        //    `brightness`: difference in brightness between the two colors
        //    `color`: difference in color/hue between the two colors
        tinycolor.readability = function(color1, color2) {
            var a = tinycolor(color1).toRgb();
            var b = tinycolor(color2).toRgb();
            var brightnessA = (a.r * 299 + a.g * 587 + a.b * 114) / 1000;
            var brightnessB = (b.r * 299 + b.g * 587 + b.b * 114) / 1000;
            var colorDiff = (
                Math.max(a.r, b.r) - Math.min(a.r, b.r) +
                Math.max(a.g, b.g) - Math.min(a.g, b.g) +
                Math.max(a.b, b.b) - Math.min(a.b, b.b)
            );

            return {
                brightness: Math.abs(brightnessA - brightnessB),
                color: colorDiff
            };
        };

        // `readable`
        // http://www.w3.org/TR/AERT#color-contrast
        // Ensure that foreground and background color combinations provide sufficient contrast.
        // *Example*
        //    tinycolor.readable("#000", "#111") => false
        tinycolor.readable = function(color1, color2) {
            var readability = tinycolor.readability(color1, color2);
            return readability.brightness > 125 && readability.color > 500;
        };

        // `mostReadable`
        // Given a base color and a list of possible foreground or background
        // colors for that base, returns the most readable color.
        // *Example*
        //    tinycolor.mostReadable("#123", ["#fff", "#000"]) => "#000"
        tinycolor.mostReadable = function(baseColor, colorList) {
            var bestColor = null;
            var bestScore = 0;
            var bestIsReadable = false;
            for (var i=0; i < colorList.length; i++) {

                // We normalize both around the "acceptable" breaking point,
                // but rank brightness constrast higher than hue.

                var readability = tinycolor.readability(baseColor, colorList[i]);
                var readable = readability.brightness > 125 && readability.color > 500;
                var score = 3 * (readability.brightness / 125) + (readability.color / 500);

                if ((readable && ! bestIsReadable) ||
                    (readable && bestIsReadable && score > bestScore) ||
                    ((! readable) && (! bestIsReadable) && score > bestScore)) {
                    bestIsReadable = readable;
                    bestScore = score;
                    bestColor = tinycolor(colorList[i]);
                }
            }
            return bestColor;
        };


        // Big List of Colors
        // ------------------
        // <http://www.w3.org/TR/css3-color/#svg-color>
        var names = tinycolor.names = {
            aliceblue: "f0f8ff",
            antiquewhite: "faebd7",
            aqua: "0ff",
            aquamarine: "7fffd4",
            azure: "f0ffff",
            beige: "f5f5dc",
            bisque: "ffe4c4",
            black: "000",
            blanchedalmond: "ffebcd",
            blue: "00f",
            blueviolet: "8a2be2",
            brown: "a52a2a",
            burlywood: "deb887",
            burntsienna: "ea7e5d",
            cadetblue: "5f9ea0",
            chartreuse: "7fff00",
            chocolate: "d2691e",
            coral: "ff7f50",
            cornflowerblue: "6495ed",
            cornsilk: "fff8dc",
            crimson: "dc143c",
            cyan: "0ff",
            darkblue: "00008b",
            darkcyan: "008b8b",
            darkgoldenrod: "b8860b",
            darkgray: "a9a9a9",
            darkgreen: "006400",
            darkgrey: "a9a9a9",
            darkkhaki: "bdb76b",
            darkmagenta: "8b008b",
            darkolivegreen: "556b2f",
            darkorange: "ff8c00",
            darkorchid: "9932cc",
            darkred: "8b0000",
            darksalmon: "e9967a",
            darkseagreen: "8fbc8f",
            darkslateblue: "483d8b",
            darkslategray: "2f4f4f",
            darkslategrey: "2f4f4f",
            darkturquoise: "00ced1",
            darkviolet: "9400d3",
            deeppink: "ff1493",
            deepskyblue: "00bfff",
            dimgray: "696969",
            dimgrey: "696969",
            dodgerblue: "1e90ff",
            firebrick: "b22222",
            floralwhite: "fffaf0",
            forestgreen: "228b22",
            fuchsia: "f0f",
            gainsboro: "dcdcdc",
            ghostwhite: "f8f8ff",
            gold: "ffd700",
            goldenrod: "daa520",
            gray: "808080",
            green: "008000",
            greenyellow: "adff2f",
            grey: "808080",
            honeydew: "f0fff0",
            hotpink: "ff69b4",
            indianred: "cd5c5c",
            indigo: "4b0082",
            ivory: "fffff0",
            khaki: "f0e68c",
            lavender: "e6e6fa",
            lavenderblush: "fff0f5",
            lawngreen: "7cfc00",
            lemonchiffon: "fffacd",
            lightblue: "add8e6",
            lightcoral: "f08080",
            lightcyan: "e0ffff",
            lightgoldenrodyellow: "fafad2",
            lightgray: "d3d3d3",
            lightgreen: "90ee90",
            lightgrey: "d3d3d3",
            lightpink: "ffb6c1",
            lightsalmon: "ffa07a",
            lightseagreen: "20b2aa",
            lightskyblue: "87cefa",
            lightslategray: "789",
            lightslategrey: "789",
            lightsteelblue: "b0c4de",
            lightyellow: "ffffe0",
            lime: "0f0",
            limegreen: "32cd32",
            linen: "faf0e6",
            magenta: "f0f",
            maroon: "800000",
            mediumaquamarine: "66cdaa",
            mediumblue: "0000cd",
            mediumorchid: "ba55d3",
            mediumpurple: "9370db",
            mediumseagreen: "3cb371",
            mediumslateblue: "7b68ee",
            mediumspringgreen: "00fa9a",
            mediumturquoise: "48d1cc",
            mediumvioletred: "c71585",
            midnightblue: "191970",
            mintcream: "f5fffa",
            mistyrose: "ffe4e1",
            moccasin: "ffe4b5",
            navajowhite: "ffdead",
            navy: "000080",
            oldlace: "fdf5e6",
            olive: "808000",
            olivedrab: "6b8e23",
            orange: "ffa500",
            orangered: "ff4500",
            orchid: "da70d6",
            palegoldenrod: "eee8aa",
            palegreen: "98fb98",
            paleturquoise: "afeeee",
            palevioletred: "db7093",
            papayawhip: "ffefd5",
            peachpuff: "ffdab9",
            peru: "cd853f",
            pink: "ffc0cb",
            plum: "dda0dd",
            powderblue: "b0e0e6",
            purple: "800080",
            red: "f00",
            rosybrown: "bc8f8f",
            royalblue: "4169e1",
            saddlebrown: "8b4513",
            salmon: "fa8072",
            sandybrown: "f4a460",
            seagreen: "2e8b57",
            seashell: "fff5ee",
            sienna: "a0522d",
            silver: "c0c0c0",
            skyblue: "87ceeb",
            slateblue: "6a5acd",
            slategray: "708090",
            slategrey: "708090",
            snow: "fffafa",
            springgreen: "00ff7f",
            steelblue: "4682b4",
            tan: "d2b48c",
            teal: "008080",
            thistle: "d8bfd8",
            tomato: "ff6347",
            turquoise: "40e0d0",
            violet: "ee82ee",
            wheat: "f5deb3",
            white: "fff",
            whitesmoke: "f5f5f5",
            yellow: "ff0",
            yellowgreen: "9acd32"
        };

        // Make it easy to access colors via `hexNames[hex]`

        var hexNames = tinycolor.hexNames = flip(names);


        // Utilities
        // ---------

        // `{ 'name1': 'val1' }` becomes `{ 'val1': 'name1' }`
        function flip(o) {
            var flipped = { };
            for (var i in o) {
                if (o.hasOwnProperty(i)) {
                    flipped[o[i]] = i;
                }
            }
            return flipped;
        }

        // Take input from [0, n] and return it as [0, 1]
        function bound01(n, max) {
            if (isOnePointZero(n)) { n = "100%"; }

            var processPercent = isPercentage(n);
            n = mathMin(max, mathMax(0, parseFloat(n)));

            // Automatically convert percentage into number
            if (processPercent) {
                n = parseInt(n * max, 10) / 100;
            }

            // Handle floating point rounding errors
            if ((math.abs(n - max) < 0.000001)) {
                return 1;
            }

            // Convert into [0, 1] range if it isn't already
            return (n % max) / parseFloat(max);
        }

        // Force a number between 0 and 1
        function clamp01(val) {
            return mathMin(1, mathMax(0, val));
        }

        // Parse an integer into hex
        function parseHex(val) {
            return parseInt(val, 16);
        }

        // Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
        // <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
        function isOnePointZero(n) {
            return typeof n == "string" && n.indexOf('.') != -1 && parseFloat(n) === 1;
        }

        // Check to see if string passed in is a percentage
        function isPercentage(n) {
            return typeof n === "string" && n.indexOf('%') != -1;
        }

        // Force a hex value to have 2 characters
        function pad2(c) {
            return c.length == 1 ? '0' + c : '' + c;
        }

        // Replace a decimal with it's percentage value
        function convertToPercentage(n) {
            if (n <= 1) {
                n = (n * 100) + "%";
            }

            return n;
        }

        var matchers = (function() {

            // <http://www.w3.org/TR/css3-values/#integers>
            var CSS_INTEGER = "[-\\+]?\\d+%?";

            // <http://www.w3.org/TR/css3-values/#number-value>
            var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";

            // Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.
            var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";

            // Actual matching.
            // Parentheses and commas are optional, but not required.
            // Whitespace can take the place of commas or opening paren
            var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
            var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";

            return {
                rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
                rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
                hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
                hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
                hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
                hex3: /^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
                hex6: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
            };
        })();

        // `stringInputToObject`
        // Permissive string parsing.  Take in a number of formats, and output an object
        // based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`
        function stringInputToObject(color) {

            color = color.replace(trimLeft,'').replace(trimRight, '').toLowerCase();
            var named = false;
            if (names[color]) {
                color = names[color];
                named = true;
            }
            else if (color == 'transparent') {
                return { r: 0, g: 0, b: 0, a: 0 };
            }

            // Try to match string input using regular expressions.
            // Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
            // Just return an object and let the conversion functions handle that.
            // This way the result will be the same whether the tinycolor is initialized with string or object.
            var match;
            if ((match = matchers.rgb.exec(color))) {
                return { r: match[1], g: match[2], b: match[3] };
            }
            if ((match = matchers.rgba.exec(color))) {
                return { r: match[1], g: match[2], b: match[3], a: match[4] };
            }
            if ((match = matchers.hsl.exec(color))) {
                return { h: match[1], s: match[2], l: match[3] };
            }
            if ((match = matchers.hsla.exec(color))) {
                return { h: match[1], s: match[2], l: match[3], a: match[4] };
            }
            if ((match = matchers.hsv.exec(color))) {
                return { h: match[1], s: match[2], v: match[3] };
            }
            if ((match = matchers.hex6.exec(color))) {
                return {
                    r: parseHex(match[1]),
                    g: parseHex(match[2]),
                    b: parseHex(match[3]),
                    format: named ? "name" : "hex"
                };
            }
            if ((match = matchers.hex3.exec(color))) {
                return {
                    r: parseHex(match[1] + '' + match[1]),
                    g: parseHex(match[2] + '' + match[2]),
                    b: parseHex(match[3] + '' + match[3]),
                    format: named ? "name" : "hex"
                };
            }

            return false;
        }

        root.tinycolor = tinycolor;

    })(this);

    $(function () {
        if ($.fn.spectrum.load) {
            $.fn.spectrum.processNativeColorInputs();
        }
    });

})(window, jQuery);


/*
 * Copyright 2013 Small Batch, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
;(function(window,document,undefined){
var j=void 0,k=!0,l=null,p=!1;function q(a){return function(){return this[a]}}var aa=this;function ba(a,b){var c=a.split("."),d=aa;!(c[0]in d)&&d.execScript&&d.execScript("var "+c[0]);for(var e;c.length&&(e=c.shift());)!c.length&&b!==j?d[e]=b:d=d[e]?d[e]:d[e]={}}aa.Ba=k;function ca(a,b,c){return a.call.apply(a.bind,arguments)}
function da(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function s(a,b,c){s=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ca:da;return s.apply(l,arguments)}var ea=Date.now||function(){return+new Date};function fa(a,b){this.G=a;this.u=b||a;this.z=this.u.document;this.R=j}fa.prototype.createElement=function(a,b,c){a=this.z.createElement(a);if(b)for(var d in b)if(b.hasOwnProperty(d))if("style"==d){var e=a,f=b[d];ga(this)?e.setAttribute("style",f):e.style.cssText=f}else a.setAttribute(d,b[d]);c&&a.appendChild(this.z.createTextNode(c));return a};function t(a,b,c){a=a.z.getElementsByTagName(b)[0];a||(a=document.documentElement);a&&a.lastChild&&a.insertBefore(c,a.lastChild)}
function u(a,b){return a.createElement("link",{rel:"stylesheet",href:b})}function ha(a,b){return a.createElement("script",{src:b})}function v(a,b){for(var c=a.className.split(/\s+/),d=0,e=c.length;d<e;d++)if(c[d]==b)return;c.push(b);a.className=c.join(" ").replace(/\s+/g," ").replace(/^\s+|\s+$/,"")}function w(a,b){for(var c=a.className.split(/\s+/),d=[],e=0,f=c.length;e<f;e++)c[e]!=b&&d.push(c[e]);a.className=d.join(" ").replace(/\s+/g," ").replace(/^\s+|\s+$/,"")}
function ia(a,b){for(var c=a.className.split(/\s+/),d=0,e=c.length;d<e;d++)if(c[d]==b)return k;return p}function ga(a){if(a.R===j){var b=a.z.createElement("p");b.innerHTML='<a style="top:1px;">w</a>';a.R=/top/.test(b.getElementsByTagName("a")[0].getAttribute("style"))}return a.R}function x(a){var b=a.u.location.protocol;"about:"==b&&(b=a.G.location.protocol);return"https:"==b?"https:":"http:"};function y(a,b,c){this.w=a;this.T=b;this.Aa=c}ba("webfont.BrowserInfo",y);y.prototype.qa=q("w");y.prototype.hasWebFontSupport=y.prototype.qa;y.prototype.ra=q("T");y.prototype.hasWebKitFallbackBug=y.prototype.ra;y.prototype.sa=q("Aa");y.prototype.hasWebKitMetricsBug=y.prototype.sa;function z(a,b,c,d){this.e=a!=l?a:l;this.o=b!=l?b:l;this.ba=c!=l?c:l;this.f=d!=l?d:l}var ja=/^([0-9]+)(?:[\._-]([0-9]+))?(?:[\._-]([0-9]+))?(?:[\._+-]?(.*))?$/;z.prototype.toString=function(){return[this.e,this.o||"",this.ba||"",this.f||""].join("")};
function A(a){a=ja.exec(a);var b=l,c=l,d=l,e=l;a&&(a[1]!==l&&a[1]&&(b=parseInt(a[1],10)),a[2]!==l&&a[2]&&(c=parseInt(a[2],10)),a[3]!==l&&a[3]&&(d=parseInt(a[3],10)),a[4]!==l&&a[4]&&(e=/^[0-9]+$/.test(a[4])?parseInt(a[4],10):a[4]));return new z(b,c,d,e)};function B(a,b,c,d,e,f,g,h,n,m,r){this.J=a;this.Ha=b;this.za=c;this.ga=d;this.Fa=e;this.fa=f;this.xa=g;this.Ga=h;this.wa=n;this.ea=m;this.k=r}ba("webfont.UserAgent",B);B.prototype.getName=q("J");B.prototype.getName=B.prototype.getName;B.prototype.pa=q("za");B.prototype.getVersion=B.prototype.pa;B.prototype.la=q("ga");B.prototype.getEngine=B.prototype.la;B.prototype.ma=q("fa");B.prototype.getEngineVersion=B.prototype.ma;B.prototype.na=q("xa");B.prototype.getPlatform=B.prototype.na;B.prototype.oa=q("wa");
B.prototype.getPlatformVersion=B.prototype.oa;B.prototype.ka=q("ea");B.prototype.getDocumentMode=B.prototype.ka;B.prototype.ja=q("k");B.prototype.getBrowserInfo=B.prototype.ja;function C(a,b){this.a=a;this.H=b}var ka=new B("Unknown",new z,"Unknown","Unknown",new z,"Unknown","Unknown",new z,"Unknown",j,new y(p,p,p));
C.prototype.parse=function(){var a;if(-1!=this.a.indexOf("MSIE")){a=D(this);var b=E(this),c=A(b),d=F(this.a,/MSIE ([\d\w\.]+)/,1),e=A(d);a=new B("MSIE",e,d,"MSIE",e,d,a,c,b,G(this.H),new y("Windows"==a&&6<=e.e||"Windows Phone"==a&&8<=c.e,p,p))}else if(-1!=this.a.indexOf("Opera"))a:{a="Unknown";var b=F(this.a,/Presto\/([\d\w\.]+)/,1),c=A(b),d=E(this),e=A(d),f=G(this.H);c.e!==l?a="Presto":(-1!=this.a.indexOf("Gecko")&&(a="Gecko"),b=F(this.a,/rv:([^\)]+)/,1),c=A(b));if(-1!=this.a.indexOf("Opera Mini/")){var g=
F(this.a,/Opera Mini\/([\d\.]+)/,1),h=A(g);a=new B("OperaMini",h,g,a,c,b,D(this),e,d,f,new y(p,p,p))}else{if(-1!=this.a.indexOf("Version/")&&(g=F(this.a,/Version\/([\d\.]+)/,1),h=A(g),h.e!==l)){a=new B("Opera",h,g,a,c,b,D(this),e,d,f,new y(10<=h.e,p,p));break a}g=F(this.a,/Opera[\/ ]([\d\.]+)/,1);h=A(g);a=h.e!==l?new B("Opera",h,g,a,c,b,D(this),e,d,f,new y(10<=h.e,p,p)):new B("Opera",new z,"Unknown",a,c,b,D(this),e,d,f,new y(p,p,p))}}else if(/AppleWeb(K|k)it/.test(this.a)){a=D(this);var b=E(this),
c=A(b),d=F(this.a,/AppleWeb(?:K|k)it\/([\d\.\+]+)/,1),e=A(d),f="Unknown",g=new z,h="Unknown",n=p;-1!=this.a.indexOf("Chrome")||-1!=this.a.indexOf("CrMo")||-1!=this.a.indexOf("CriOS")?f="Chrome":/Silk\/\d/.test(this.a)?f="Silk":"BlackBerry"==a||"Android"==a?f="BuiltinBrowser":-1!=this.a.indexOf("Safari")?f="Safari":-1!=this.a.indexOf("AdobeAIR")&&(f="AdobeAIR");"BuiltinBrowser"==f?h="Unknown":"Silk"==f?h=F(this.a,/Silk\/([\d\._]+)/,1):"Chrome"==f?h=F(this.a,/(Chrome|CrMo|CriOS)\/([\d\.]+)/,2):-1!=
this.a.indexOf("Version/")?h=F(this.a,/Version\/([\d\.\w]+)/,1):"AdobeAIR"==f&&(h=F(this.a,/AdobeAIR\/([\d\.]+)/,1));g=A(h);n="AdobeAIR"==f?2<g.e||2==g.e&&5<=g.o:"BlackBerry"==a?10<=c.e:"Android"==a?2<c.e||2==c.e&&1<c.o:526<=e.e||525<=e.e&&13<=e.o;a=new B(f,g,h,"AppleWebKit",e,d,a,c,b,G(this.H),new y(n,536>e.e||536==e.e&&11>e.o,"iPhone"==a||"iPad"==a||"iPod"==a||"Macintosh"==a))}else-1!=this.a.indexOf("Gecko")?(a="Unknown",b=new z,c="Unknown",d=E(this),e=A(d),f=p,-1!=this.a.indexOf("Firefox")?(a=
"Firefox",c=F(this.a,/Firefox\/([\d\w\.]+)/,1),b=A(c),f=3<=b.e&&5<=b.o):-1!=this.a.indexOf("Mozilla")&&(a="Mozilla"),g=F(this.a,/rv:([^\)]+)/,1),h=A(g),f||(f=1<h.e||1==h.e&&9<h.o||1==h.e&&9==h.o&&2<=h.ba||g.match(/1\.9\.1b[123]/)!=l||g.match(/1\.9\.1\.[\d\.]+/)!=l),a=new B(a,b,c,"Gecko",h,g,D(this),e,d,G(this.H),new y(f,p,p))):a=ka;return a};
function D(a){var b=F(a.a,/(iPod|iPad|iPhone|Android|Windows Phone|BB\d{2}|BlackBerry)/,1);if(""!=b)return/BB\d{2}/.test(b)&&(b="BlackBerry"),b;a=F(a.a,/(Linux|Mac_PowerPC|Macintosh|Windows|CrOS)/,1);return""!=a?("Mac_PowerPC"==a&&(a="Macintosh"),a):"Unknown"}
function E(a){var b=F(a.a,/(OS X|Windows NT|Android) ([^;)]+)/,2);if(b||(b=F(a.a,/Windows Phone( OS)? ([^;)]+)/,2))||(b=F(a.a,/(iPhone )?OS ([\d_]+)/,2)))return b;if(b=F(a.a,/(?:Linux|CrOS) ([^;)]+)/,1))for(var b=b.split(/\s/),c=0;c<b.length;c+=1)if(/^[\d\._]+$/.test(b[c]))return b[c];return(a=F(a.a,/(BB\d{2}|BlackBerry).*?Version\/([^\s]*)/,2))?a:"Unknown"}function F(a,b,c){return(a=a.match(b))&&a[c]?a[c]:""}function G(a){if(a.documentMode)return a.documentMode};function la(a){this.va=a||"-"}la.prototype.f=function(a){for(var b=[],c=0;c<arguments.length;c++)b.push(arguments[c].replace(/[\W_]+/g,"").toLowerCase());return b.join(this.va)};function H(a,b){this.J=a;this.U=4;this.K="n";var c=(b||"n4").match(/^([nio])([1-9])$/i);c&&(this.K=c[1],this.U=parseInt(c[2],10))}H.prototype.getName=q("J");function I(a){return a.K+a.U}function ma(a){var b=4,c="n",d=l;a&&((d=a.match(/(normal|oblique|italic)/i))&&d[1]&&(c=d[1].substr(0,1).toLowerCase()),(d=a.match(/([1-9]00|normal|bold)/i))&&d[1]&&(/bold/i.test(d[1])?b=7:/[1-9]00/.test(d[1])&&(b=parseInt(d[1].substr(0,1),10))));return c+b};function na(a,b,c){this.c=a;this.h=b;this.M=c;this.j="wf";this.g=new la("-")}function pa(a){v(a.h,a.g.f(a.j,"loading"));J(a,"loading")}function K(a){w(a.h,a.g.f(a.j,"loading"));ia(a.h,a.g.f(a.j,"active"))||v(a.h,a.g.f(a.j,"inactive"));J(a,"inactive")}function J(a,b,c){if(a.M[b])if(c)a.M[b](c.getName(),I(c));else a.M[b]()};function L(a,b){this.c=a;this.C=b;this.s=this.c.createElement("span",{"aria-hidden":"true"},this.C)}
function M(a,b){var c=a.s,d;d=[];for(var e=b.J.split(/,\s*/),f=0;f<e.length;f++){var g=e[f].replace(/['"]/g,"");-1==g.indexOf(" ")?d.push(g):d.push("'"+g+"'")}d=d.join(",");e="normal";f=b.U+"00";"o"===b.K?e="oblique":"i"===b.K&&(e="italic");d="position:absolute;top:-999px;left:-999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:"+d+";"+("font-style:"+e+";font-weight:"+f+";");ga(a.c)?c.setAttribute("style",d):c.style.cssText=
d}function N(a){t(a.c,"body",a.s)}L.prototype.remove=function(){var a=this.s;a.parentNode&&a.parentNode.removeChild(a)};function qa(a,b,c,d,e,f,g,h){this.V=a;this.ta=b;this.c=c;this.q=d;this.C=h||"BESbswy";this.k=e;this.F={};this.S=f||5E3;this.Z=g||l;this.B=this.A=l;a=new L(this.c,this.C);N(a);for(var n in O)O.hasOwnProperty(n)&&(M(a,new H(O[n],I(this.q))),this.F[O[n]]=a.s.offsetWidth);a.remove()}var O={Ea:"serif",Da:"sans-serif",Ca:"monospace"};
qa.prototype.start=function(){this.A=new L(this.c,this.C);N(this.A);this.B=new L(this.c,this.C);N(this.B);this.ya=ea();M(this.A,new H(this.q.getName()+",serif",I(this.q)));M(this.B,new H(this.q.getName()+",sans-serif",I(this.q)));ra(this)};function sa(a,b,c){for(var d in O)if(O.hasOwnProperty(d)&&b===a.F[O[d]]&&c===a.F[O[d]])return k;return p}
function ra(a){var b=a.A.s.offsetWidth,c=a.B.s.offsetWidth;b===a.F.serif&&c===a.F["sans-serif"]||a.k.T&&sa(a,b,c)?ea()-a.ya>=a.S?a.k.T&&sa(a,b,c)&&(a.Z===l||a.Z.hasOwnProperty(a.q.getName()))?P(a,a.V):P(a,a.ta):setTimeout(s(function(){ra(this)},a),25):P(a,a.V)}function P(a,b){a.A.remove();a.B.remove();b(a.q)};function R(a,b,c,d){this.c=b;this.t=c;this.N=0;this.ca=this.Y=p;this.S=d;this.k=a.k}function ta(a,b,c,d,e){if(0===b.length&&e)K(a.t);else{a.N+=b.length;e&&(a.Y=e);for(e=0;e<b.length;e++){var f=b[e],g=c[f.getName()],h=a.t,n=f;v(h.h,h.g.f(h.j,n.getName(),I(n).toString(),"loading"));J(h,"fontloading",n);(new qa(s(a.ha,a),s(a.ia,a),a.c,f,a.k,a.S,d,g)).start()}}}
R.prototype.ha=function(a){var b=this.t;w(b.h,b.g.f(b.j,a.getName(),I(a).toString(),"loading"));w(b.h,b.g.f(b.j,a.getName(),I(a).toString(),"inactive"));v(b.h,b.g.f(b.j,a.getName(),I(a).toString(),"active"));J(b,"fontactive",a);this.ca=k;ua(this)};R.prototype.ia=function(a){var b=this.t;w(b.h,b.g.f(b.j,a.getName(),I(a).toString(),"loading"));ia(b.h,b.g.f(b.j,a.getName(),I(a).toString(),"active"))||v(b.h,b.g.f(b.j,a.getName(),I(a).toString(),"inactive"));J(b,"fontinactive",a);ua(this)};
function ua(a){0==--a.N&&a.Y&&(a.ca?(a=a.t,w(a.h,a.g.f(a.j,"loading")),w(a.h,a.g.f(a.j,"inactive")),v(a.h,a.g.f(a.j,"active")),J(a,"active")):K(a.t))};function S(a,b,c){this.G=a;this.W=b;this.a=c;this.O=this.P=0}function T(a,b){U.W.$[a]=b}S.prototype.load=function(a){var b=a.context||this.G;this.c=new fa(this.G,b);b=new na(this.c,b.document.documentElement,a);if(this.a.k.w){var c=this.W,d=this.c,e=[],f;for(f in a)if(a.hasOwnProperty(f)){var g=c.$[f];g&&e.push(g(a[f],d))}a=a.timeout;this.O=this.P=e.length;a=new R(this.a,this.c,b,a);f=0;for(c=e.length;f<c;f++)d=e[f],d.v(this.a,s(this.ua,this,d,b,a))}else K(b)};
S.prototype.ua=function(a,b,c,d){var e=this;d?a.load(function(a,d,h){var n=0==--e.P;n&&pa(b);setTimeout(function(){ta(c,a,d||{},h||l,n)},0)}):(a=0==--this.P,this.O--,a&&(0==this.O?K(b):pa(b)),ta(c,[],{},l,a))};var va=window,wa=(new C(navigator.userAgent,document)).parse(),U=va.WebFont=new S(window,new function(){this.$={}},wa);U.load=U.load;function V(a,b){this.c=a;this.d=b}V.prototype.load=function(a){var b,c,d=this.d.urls||[],e=this.d.families||[];b=0;for(c=d.length;b<c;b++)t(this.c,"head",u(this.c,d[b]));d=[];b=0;for(c=e.length;b<c;b++){var f=e[b].split(":");if(f[1])for(var g=f[1].split(","),h=0;h<g.length;h+=1)d.push(new H(f[0],g[h]));else d.push(new H(f[0]))}a(d)};V.prototype.v=function(a,b){return b(a.k.w)};T("custom",function(a,b){return new V(b,a)});function W(a,b){this.c=a;this.d=b}var xa={regular:"n4",bold:"n7",italic:"i4",bolditalic:"i7",r:"n4",b:"n7",i:"i4",bi:"i7"};W.prototype.v=function(a,b){return b(a.k.w)};W.prototype.load=function(a){t(this.c,"head",u(this.c,x(this.c)+"//webfonts.fontslive.com/css/"+this.d.key+".css"));for(var b=this.d.families,c=[],d=0,e=b.length;d<e;d++)c.push.apply(c,ya(b[d]));a(c)};
function ya(a){var b=a.split(":");a=b[0];if(b[1]){for(var c=b[1].split(","),b=[],d=0,e=c.length;d<e;d++){var f=c[d];if(f){var g=xa[f];b.push(g?g:f)}}c=[];for(d=0;d<b.length;d+=1)c.push(new H(a,b[d]));return c}return[new H(a)]}T("ascender",function(a,b){return new W(b,a)});function X(a,b,c){this.a=a;this.c=b;this.d=c;this.m=[]}
X.prototype.v=function(a,b){var c=this,d=c.d.projectId,e=c.d.version;if(d){var f=c.c.u,g=c.c.createElement("script");g.id="__MonotypeAPIScript__"+d;var h=p;g.onload=g.onreadystatechange=function(){if(!h&&(!this.readyState||"loaded"===this.readyState||"complete"===this.readyState)){h=k;if(f["__mti_fntLst"+d]){var e=f["__mti_fntLst"+d]();if(e)for(var m=0;m<e.length;m++)c.m.push(new H(e[m].fontfamily))}b(a.k.w);g.onload=g.onreadystatechange=l}};g.src=c.D(d,e);t(this.c,"head",g)}else b(k)};
X.prototype.D=function(a,b){var c=x(this.c),d=(this.d.api||"fast.fonts.com/jsapi").replace(/^.*http(s?):(\/\/)?/,"");return c+"//"+d+"/"+a+".js"+(b?"?v="+b:"")};X.prototype.load=function(a){a(this.m)};T("monotype",function(a,b){var c=(new C(navigator.userAgent,document)).parse();return new X(c,b,a)});function Y(a,b){this.c=a;this.d=b;this.m=[]}Y.prototype.D=function(a){var b=x(this.c);return(this.d.api||b+"//use.typekit.net")+"/"+a+".js"};
Y.prototype.v=function(a,b){var c=this.d.id,d=this.d,e=this.c.u,f=this;c?(e.__webfonttypekitmodule__||(e.__webfonttypekitmodule__={}),e.__webfonttypekitmodule__[c]=function(c){c(a,d,function(a,c,d){for(var e=0;e<c.length;e+=1){var g=d[c[e]];if(g)for(var Q=0;Q<g.length;Q+=1)f.m.push(new H(c[e],g[Q]));else f.m.push(new H(c[e]))}b(a)})},c=ha(this.c,this.D(c)),t(this.c,"head",c)):b(k)};Y.prototype.load=function(a){a(this.m)};T("typekit",function(a,b){return new Y(b,a)});function za(a,b,c){this.L=a?a:b+Aa;this.p=[];this.Q=[];this.da=c||""}var Aa="//fonts.googleapis.com/css";za.prototype.f=function(){if(0==this.p.length)throw Error("No fonts to load !");if(-1!=this.L.indexOf("kit="))return this.L;for(var a=this.p.length,b=[],c=0;c<a;c++)b.push(this.p[c].replace(/ /g,"+"));a=this.L+"?family="+b.join("%7C");0<this.Q.length&&(a+="&subset="+this.Q.join(","));0<this.da.length&&(a+="&text="+encodeURIComponent(this.da));return a};function Ba(a){this.p=a;this.aa=[];this.I={}}
var Ca={latin:"BESbswy",cyrillic:"&#1081;&#1103;&#1046;",greek:"&#945;&#946;&#931;",khmer:"&#x1780;&#x1781;&#x1782;",Hanuman:"&#x1780;&#x1781;&#x1782;"},Da={thin:"1",extralight:"2","extra-light":"2",ultralight:"2","ultra-light":"2",light:"3",regular:"4",book:"4",medium:"5","semi-bold":"6",semibold:"6","demi-bold":"6",demibold:"6",bold:"7","extra-bold":"8",extrabold:"8","ultra-bold":"8",ultrabold:"8",black:"9",heavy:"9",l:"3",r:"4",b:"7"},Ea={i:"i",italic:"i",n:"n",normal:"n"},Fa=RegExp("^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$");
Ba.prototype.parse=function(){for(var a=this.p.length,b=0;b<a;b++){var c=this.p[b].split(":"),d=c[0].replace(/\+/g," "),e=["n4"];if(2<=c.length){var f;var g=c[1];f=[];if(g)for(var g=g.split(","),h=g.length,n=0;n<h;n++){var m;m=g[n];if(m.match(/^[\w]+$/)){m=Fa.exec(m.toLowerCase());var r=j;if(m==l)r="";else{r=j;r=m[1];if(r==l||""==r)r="4";else var oa=Da[r],r=oa?oa:isNaN(r)?"4":r.substr(0,1);r=[m[2]==l||""==m[2]?"n":Ea[m[2]],r].join("")}m=r}else m="";m&&f.push(m)}0<f.length&&(e=f);3==c.length&&(c=c[2],
f=[],c=!c?f:c.split(","),0<c.length&&(c=Ca[c[0]])&&(this.I[d]=c))}this.I[d]||(c=Ca[d])&&(this.I[d]=c);for(c=0;c<e.length;c+=1)this.aa.push(new H(d,e[c]))}};function Z(a,b,c){this.a=a;this.c=b;this.d=c}var Ga={Arimo:k,Cousine:k,Tinos:k};Z.prototype.v=function(a,b){b(a.k.w)};Z.prototype.load=function(a){var b=this.c;if("MSIE"==this.a.getName()&&this.d.blocking!=k){var c=s(this.X,this,a),d=function(){b.z.body?c():setTimeout(d,0)};d()}else this.X(a)};
Z.prototype.X=function(a){for(var b=this.c,c=new za(this.d.api,x(b),this.d.text),d=this.d.families,e=d.length,f=0;f<e;f++){var g=d[f].split(":");3==g.length&&c.Q.push(g.pop());var h="";2==g.length&&""!=g[1]&&(h=":");c.p.push(g.join(h))}d=new Ba(d);d.parse();t(b,"head",u(b,c.f()));a(d.aa,d.I,Ga)};T("google",function(a,b){var c=(new C(navigator.userAgent,document)).parse();return new Z(c,b,a)});function $(a,b){this.c=a;this.d=b;this.m=[]}$.prototype.D=function(a){return x(this.c)+(this.d.api||"//f.fontdeck.com/s/css/js/")+(this.c.u.location.hostname||this.c.G.location.hostname)+"/"+a+".js"};
$.prototype.v=function(a,b){var c=this.d.id,d=this.c.u,e=this;c?(d.__webfontfontdeckmodule__||(d.__webfontfontdeckmodule__={}),d.__webfontfontdeckmodule__[c]=function(a,c){for(var d=0,n=c.fonts.length;d<n;++d){var m=c.fonts[d];e.m.push(new H(m.name,ma("font-weight:"+m.weight+";font-style:"+m.style)))}b(a)},c=ha(this.c,this.D(c)),t(this.c,"head",c)):b(k)};$.prototype.load=function(a){a(this.m)};T("fontdeck",function(a,b){return new $(b,a)});window.WebFontConfig&&U.load(window.WebFontConfig);
})(this,document);
