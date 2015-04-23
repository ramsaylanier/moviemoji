Template.userPage.onCreated(function(){
	var instance = this;
	
	instance.ready = new ReactiveVar(false);
	instance.loaded = new ReactiveVar(0);

	Session.set('limit', 10);

	instance.userMovies = new ReactiveVar();

	var username = Router.current().params.username;
	var limit = Session.get('limit');
	var subscription = instance.subscribe('userMovies', username, limit);

	instance.autorun( function(){
		limit = Session.get('limit');
		subscription = instance.subscribe('userMovies', username);

		if (subscription.ready()){
			instance.ready.set(true);
			instance.userMovies.set(Movies.find({authorName: username}));
		} else {
			instance.ready.set(false);
	    }
	})
})

Template.userPage.helpers({
	userMovies: function(){
		return Template.instance().userMovies.get();
	},
	username: function(){
		return Router.current().params.username;
	},
	pageOptions: function(){
		var options = {
			animateIn: 'fadeIn',
			animateOut: 'fadeOut',
			classes: 'user-page dark-page',
			pageTitle: 'User Page'
		}

		return options;
	}
})