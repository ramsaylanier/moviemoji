Template.loginForm.events({
	'submit .login-form': function(e){
		e.preventDefault();

		var userName = $(e.target).find('[name="username"]').val();
		var password = $(e.target).find('[name="password"]').val();

		if (!userName){
			Errors.throw('Please enter a username', 'error');
			return false;
		}

		if (!password){
			Errors.throw('Please enter a password', 'error');
			return false;
		}

		Meteor.loginWithPassword(userName, password, function(error){
			if (error)
				Errors.throw(error.reason, 'error')
			else{
				var element = $('.login');
				var content = $('.card-flipper');

				content.removeClass('flipped').addClass('blown-up');

				donutTransition.blowUp(element, content);

				Meteor.setTimeout(function(){
					console.log('loggedIn');
					Session.set('loggedIn', true);
					Router.go('/lobby');
				}, 500);
			}
		})
	},
	'click .forgot-password-link': function(e){
		Session.set('loginPage', 'forgotPassword');

		Meteor.setTimeout(function(){
			$('.form-control').removeClass('off-page');
		})
	},
	'submit .forgot-password-form': function(e){
		e.preventDefault();
		var email = $(e.target).find('[name=email]').val();

		if (!email){
			throwError('Please enter your registered email address.', 'error');
		}

		Accounts.forgotPassword({email: email}, function(error){
			if (error){
				throwError(error.reason, 'error');
			} else {
				Session.set('loginPage', null);
				throwError('Password sent to your registered email address.', 'error');

			}
		})
	},
	'click .twitter-login-link': function(e){
		e.preventDefault;

		Meteor.loginWithTwitter(function(error){
			if (error)
				console.log(error);
			else{
				Router.go('/lobby');
			}
		})
	}
})