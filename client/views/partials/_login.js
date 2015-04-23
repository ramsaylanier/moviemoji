var startFlip = function(){
	console.log('flipping');
	var flipper = $('.login .card-flipper');
	var card = $('.login.card');


	flipper.toggleClass('flipped');

	donutTransition.flipCard(flipper, card);
}

Template.login.onRendered(function(){

	var instance = this;
	instance.login = new ReactiveVar(Session.get('login'));

	instance.autorun(function(){
		console.log(Session.get('login'));
		if (Session.get('login')){
			startFlip();
		}
	});
})

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
		console.log(Session.get('login'));

		if ($(e.currentTarget).hasClass('login-btn')){
			Session.set('login', true);
		} else if ($(e.currentTarget).hasClass('register-btn')) {
			Session.set('login', false);
			startFlip();
		} else {
			Meteor.setTimeout(function(){
				Session.set('login', false)
			}, 500);
			startFlip();
		}
	},
	'click .twitter-login-btn': function(){
		var loginStyle = 'popup';
		var device = Session.get('device');

		Meteor.loginWithTwitter({loginStyle: loginStyle}, function(error){
			if (error){
				Errors.throw(error, 'error');
				console.log(error);
			}
			else
				loginAnimation();
		})
	},
	'click .facebook-login-btn': function(){
		var loginStyle = 'popup';
		var device = Session.get('device');

		Meteor.loginWithFacebook({loginStyle: loginStyle}, function(error){
			if (error){
				Errors.throw(error, 'error');
				console.log(error);
			}
			else
				loginAnimation();
		})
	},
})