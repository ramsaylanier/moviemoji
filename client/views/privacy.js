Template.privacy.onRendered(function(){
	$('html').velocity('scroll', {duration: 100});
});


Template.privacy.helpers({
	pageOptions: function(){
		var options = {
			classes: 'privacy-page',
			animateIn: 'fadeIn',
			animateOut: 'fadeOut',
			duration: 500
		};

		return options;
	},
	itemOptions: function(){
		var options = {
			classes: 'about-content hidden-item',
			animateIn: 'slideInFromBottom_Short',
			animateOut: 'none',
			duration: 500,
			delay: 500
		};

		return options;
	}
})