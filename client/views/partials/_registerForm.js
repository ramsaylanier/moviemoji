Template.registerForm.events({
	'submit .register-form': function(e){
		e.preventDefault();

		var user = {
			username: $(e.target).find('[name="username"]').val(),
			email: $(e.target).find('[name="email"]').val(),
			password: $(e.target).find('[name="password"]').val(),
		}

		var passwordConfirm = $(e.target).find('[name="confirm-password"]').val();

		if (!user.username)
			Errors.throw("Please enter a username.", 'error');

		else if (!user.email)
			Errors.throw("Please enter an email address.", 'error');

		else if (!user.password)
			Errors.throw("Please enter a password.", 'error');

		else if (user.password.length < 6)
			Errors.throw("Passwords is less that 6 character.", 'error');

		else if (user.password != passwordConfirm){
			Errors.throw("Passwords do not match.", 'error');
		}

		else (
			Accounts.createUser({email: user.email, password: user.password, username: user.username }, function(error){
				if (error){
					Errors.throw(error.reason, 'error');
				}
				else {
					var element = $('.login');
					var content = $('.card-flipper');

					content.removeClass('flipped').addClass('blown-up');

					donutTransition.blowUp(element, content);

					Meteor.setTimeout(function(){
						Session.set('loggedIn', true);
						Router.go('/lobby');
					}, 500);
				}
			})
		)
	},
})