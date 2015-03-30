Template.login.helpers({
	itemOptions: function(){
		var options = {
			animateIn: 'twistIn',
			animateOut: 'twistOut',
			duration: 1000,
			delay: 0,
			easing: [0, .65, .9, 1],
			classes: 'login-item'
		}

		return options;
	},
	login: function(){
		return Session.get('login');
	}
})

Template.login.events({
	'click .flip-btn': function(e){
		e.preventDefault();

		if ($(e.currentTarget).hasClass('login-btn')){
			Session.set('login', true)
		} else if ($(e.currentTarget).hasClass('register-btn')) {
			Session.set('login', false)
		}

		var flipper = $('.card-flipper');
		var card = $('.card');


		flipper.toggleClass('flipped');

		donutTransition.flipCard(flipper, card);
	}
})