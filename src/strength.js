/*!
 * strength.js
 * Original author: @aaronlumsden
 * Further changes, comments: @aaronlumsden
 * Licensed under the MIT license
 * 
 * Updated by Martin Langenberg
 * Date: 30-10-2015
 */
;(function ( $, window, document, undefined ) {

	var pluginName = "strength",
		defaults = {
			strengthClass: 'strength',
			strengthMeterClass: 'strength_meter',
			strengthButtonClass: 'button_strength',
			strengthButtonText: 'Show Password',
			strengthButtonTextToggle: 'Hide Password',
			showPasswordToggle: true,
			allowCopyPasteCut: false,
			copyPasteCutMessage: 'You must (re)-enter your password manually'
		};

	function Plugin( element, options ) {
		this.element = element;
		this.$elem = $(this.element);
		this.options = $.extend( {}, defaults, options );
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

	Plugin.prototype = {
			
			init: function() {
				
				var characters = 0;
				var capitalletters = 0;
				var loweletters = 0;
				var number = 0;
				var special = 0;
				
				var upperCase= new RegExp('[A-Z]');
				var lowerCase= new RegExp('[a-z]');
				var numbers = new RegExp('[0-9]');
				var specialchars = new RegExp('([!,%,&,@,#,$,^,*,?,_,~,+,=,(,)])');
				
				function GetPercentage(a, b) {
					return ((b / a) * 100);
				}

				function check_strength(thisval,thisid) {
					if (thisval.length > 8) { characters = 1; } else { characters = -1; };
					if (thisval.match(upperCase)) { capitalletters = 1} else { capitalletters = 0; };
					if (thisval.match(lowerCase)) { loweletters = 1}  else { loweletters = 0; };
					if (thisval.match(numbers)) { number = 1}  else { number = 0; };
					if (thisval.match(specialchars)) { special = 1} else { special = 0; };

					var total = characters + capitalletters + loweletters + number + special;
					var totalpercent = GetPercentage(7, total).toFixed(0);

					if (!thisval.length) {total = -1;}

					get_total(total,thisid);
				}

				function get_total(total,thisid) {

					var thistext = $('div[data-meter-text="'+thisid+'"]');
					var thismeter = $('div[data-meter-color="'+thisid+'"]');
					if (total == -1) {
						thismeter.removeClass();
					} else if(total <= 1) {
						thismeter.removeClass();
						thismeter.addClass('veryweak');
						thistext.html('<p>Strength: very weak</p>');
					} else if (total == 2) {
						thismeter.removeClass();
						thismeter.addClass('weak');
						thistext.html('<p>Strength: weak</p>');
					} else if(total == 3){
						thismeter.removeClass();
						thismeter.addClass('medium');
						thistext.html('<p>Strength: medium</p>');
					} else {
						thismeter.removeClass();
						thismeter.addClass('strong');
						thistext.html('<p>Strength: strong</p>');
					}

					if (total == -1) { thismeter.removeClass(); thistext.html(''); }
				}

				var isShown = false;
				var strengthButtonText = this.options.strengthButtonText;
				var strengthButtonTextToggle = this.options.strengthButtonTextToggle;
				var showPasswordToggle = this.options.showPasswordToggle;

				thisid = this.$elem.attr('id');

				if(showPasswordToggle) {
					this.$elem.addClass(this.options.strengthClass).attr('data-password',thisid).after('<a data-password-button="'+thisid+'" href="" class="'+this.options.strengthButtonClass+'">'+this.options.strengthButtonText+'</a>');
				} else {
					this.$elem.addClass(this.options.strengthClass).attr('data-password',thisid);
				}
				
				this.$elem.wrap('<div class="strength-meter-holder"></div>');
				$('div.strength-meter-holder').append('<div class="'+this.options.strengthMeterClass+'"><div data-meter-color="'+thisid+'"></div></div><div class="strength-text" data-meter-text="'+thisid+'">Strength</div>');

				this.$elem.bind('keyup keydown', function(event) {
					thisval = $('#'+thisid).val();
					$('input[type="text"][data-password="'+thisid+'"]').val(thisval);
					check_strength(thisval,thisid);
				});
				
				$('input[type="text"][data-password="'+thisid+'"]').bind('keyup keydown', function(event) {
					thisval = $('input[type="text"][data-password="'+thisid+'"]').val();
					console.log(thisval);
					$('input[type="password"][data-password="'+thisid+'"]').val(thisval);
					check_strength(thisval,thisid);
				});
             
				$(document.body).on('click', '.'+this.options.strengthButtonClass, function(e) {
					e.preventDefault();
					thisclass = 'hide_'+$(this).attr('class');
					if (isShown) {
						$('input[data-password="'+thisid+'"]').attr('type', 'password');
						$('a[data-password-button="'+thisid+'"]').removeClass(thisclass).html(strengthButtonText);
						isShown = false;
					} else {
						$('input[data-password="'+thisid+'"]').attr('type', 'text');
						$('a[data-password-button="'+thisid+'"]').addClass(thisclass).html(strengthButtonTextToggle);
						isShown = true;
					}
				});
				
				// This will trigger the plugin if a password value is set on page load
				var passwordValue = $('input#'+this.$elem.attr('id')).val();
				if(passwordValue.length > 0) {
					triggerCheck(this.$elem.attr('id'));
				}
				
				// Trigger for the plug-in
				function triggerCheck(thisid) {
					$('input#'+thisid).trigger('keyup');
				}
				
				// This will check if you may copy paste or cut form the password field
				var allowCopyPasteCut = this.options.allowCopyPasteCut;
				var copyPasteCutMessage = this.options.copyPasteCutMessage;
				if(allowCopyPasteCut == false) {
					$('input#'+this.$elem.attr('id')).bind("cut copy paste", function(e) {
						e.preventDefault();
						alert(copyPasteCutMessage);
					});
				}
			}
	};
	
	// A really lightweight plugin wrapper around the constructor,
	// preventing against multiple instantiations
	$.fn[pluginName] = function ( options ) {
		return this.each(function () {
			if (!$.data(this, "plugin_" + pluginName)) {
				$.data(this, "plugin_" + pluginName, new Plugin( this, options ));
			}
		});
	};

})( jQuery, window, document );
