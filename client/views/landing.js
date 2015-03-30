Template.landing.rendered = function(){

}

Template.landing.helpers({
	pageOptions: function(){
		var defaultOptions = getDefaultPageOptions();
		var pageOptions = {animateIn: "fadeIn", animateOut: 'fadeOut', pageTitle: "Home", duration: 200};
		var options = _.extend(defaultOptions, pageOptions);

		return options;
	}
})