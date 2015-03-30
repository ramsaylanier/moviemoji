Template.header.helpers({
	headerOptions: function(){
		var defaultOptions = getDefaultPageOptions();
		var headerOptions = {animateIn: "swingIn", animateOut: 'fadeOut'};
		var options = _.extend(defaultOptions, headerOptions);

		return options;
	}
})

Template.header.events({
	'click .menu-toggle': function(e){
		e.preventDefault();

		var toggle = $('.menu-toggle');
		
		if ($(toggle).hasClass('active')){
			animateMenuToggle(toggle, 'close')
		} else {
			animateMenuToggle(toggle, 'open')
		}
	}
})

