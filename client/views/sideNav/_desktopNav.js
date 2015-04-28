var toggleAccountSection = function(){
	var header = $('.header');

	if (header.hasClass('active')){
		closeAccountSection();
	} else {
		header.addClass('active');
		header.velocity({
			top: 40
		}, {duration: 300, easing: [300, 30], delay: 0});
	}
}

var closeAccountSection = function(){
	var header = $('.header');
	header.removeClass('active');
	header.velocity({
		top: 0
	}, {duration: 300, easing: [300, 30], delay: 0});
}

Template.desktopNav.events({
	'click .account-link': function(e){
		e.preventDefault();
		toggleAccountSection();

		var target = $(e.currentTarget);

		if (target.hasClass('logout-link')){
			Meteor.logout(function(){
				Router.go('/login');
				Session.set('loggedIn', false);
			})
		}
	},
	'click .transition-link': function(e){
		e.preventDefault();
		closeAccountSection();
		var url = $(e.currentTarget).attr('href');
		if (url == window.location.pathname){
			return false;
		} else {
			var page = $('.page');
			var options = Session.get('pageOptions');
			var transition = options.animateOut;
			donutAnimation.animate(page, transition, options);

			Meteor.setTimeout(function(){
				Router.go(url);
				Session.set('login', false);

				if ($(e.currentTarget).hasClass('login-link')){
					Meteor.setTimeout(function(){
						Session.set('login', true);
					}, 500);
				}

			}, options.duration + options.delay);
		}
	}
})