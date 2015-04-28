Template.sideNav.events({
	'click .transition-link': function(e){
		e.preventDefault();

		var url = $(e.currentTarget).attr('href');

		if (url == window.location.pathname){
			return false;
		} else {
			animateMenuToggle($('.menu-toggle'), 'open');
		}
	},
	'click .logout-link': function(e){
		e.preventDefault();
		Session.set('loggedIn', false);
		donutStates.toggleShelfState();
		animateMenuToggle($('.menu-toggle'), 'open');
		donutAnimation.animate($('.page'), 'fadeOut');

		Meteor.setTimeout(function(){
			Meteor.logout();
			Router.go('/login');
		}, 1000);
	}
})