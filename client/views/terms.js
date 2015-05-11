Template.terms.onRendered(function(){
	$('html').velocity('scroll', {duration: 100});
});


Template.terms.helpers({
	pageOptions: function(){
		var options = {
			classes: 'terms-page',
			animateIn: 'fadeIn',
			animateOut: 'fadeOut',
			duration: 500
		};

		return options;
	}
})