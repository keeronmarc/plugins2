// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

		// undefined is used here as the undefined global variable in ECMAScript 3 is
		// mutable (ie. it can be changed by someone else). undefined isn't really being
		// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
		// can no longer be modified.

		// window and document are passed through as local variable rather than global
		// as this (slightly) quickens the resolution process and can be more efficiently
		// minified (especially when both are regularly referenced in your plugin).

		// Create the defaults once
		var pluginName = "ColorMaker",
				defaults = {
				propertyName: "value"
		};

		// The actual plugin constructor
		function Plugin ( element, options ) {
				this.element = element;
				// jQuery has an extend method which merges the contents of two or
				// more objects, storing the result in the first object. The first object
				// is generally empty as we don't want to alter the default options for
				// future instances of the plugin
				this.options = $.extend( {}, defaults, options );
				this._defaults = defaults;
				this._name = pluginName;
				this.$el = $(this.element)
				this.init();
		}

		Plugin.prototype = {
			init: function () {
				console.log(this.element)
			// Place initialization logic here
			// You already have access to the DOM element and
			// the options via the instance, e.g. this.element
			// and this.options
			// you can add more functions like the one below and
			// call them like so: this.yourOtherFunction(this.element, this.options).
				if(this.options.colours>0) {
					this.$el.html('')
					this.colormagic(this.options.colours)
				}

				else {
					this.$el.html('')
					this.$el.append('<h2>You gotta give me some colors</h2>')
				}
			},

			colormagic: function (colours) {
			// Add Colors Here
				var pink = '#ff0066'
				var black = '#000000'
				var colorchoices = [pink, black]
				
			// Add Image Here
				var bgdimg = "url('https://creativepastors.com/files/series_images/Cool-Aid.jpg')"

				var c = 0;
				var that = this;
				
				var interval = setInterval(function() {
						$(that.element).css({
							"background-image"	: bgdimg,
							"color"				: colorchoices[c],
							"height"			: '400px',
							"width"				: "200px",
							"font-size"			: "200px",
							"opacity"			: "0.4",
							"z-index"			: "200"
						})
						c++;
						if(c >= colorchoices.length) 
							{c=0} 
				}, 50)
			}	
		};


		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function ( options ) {
				return this.each(function() {
						if ( !$.data( this, "plugin_" + pluginName ) ) {
								$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
						}
				});
		};

})( jQuery, window, document );
