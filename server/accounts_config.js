Accounts.config(function(){
	
})

Accounts.validateNewUser(function(user){
	var existingUsername = Meteor.users.findOne({username: user.username});

	console.log(user.services.facebook.email);
	console.log(existingUsername);

	if (existingUsername){
		throw new Meteor.Error(403, "Username already exists");
	} else if (user.username >= 4){
		throw new Meteor.Error(403, "Username must have at least 4 characters");
	} else{
		return true;
	}
})

Accounts.onCreateUser(function(options, user){

	if (options.profile){
		// console.log(user);
		if (user.services.twitter){
			user.username = user.services.twitter.screenName;
		} else if (user.services.facebook){
			user.username = user.services.facebook.name;
		}
	}


	return user;
})