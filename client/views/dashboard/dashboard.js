Template.dashboard.onCreated(function(){
	var instance = this;
	
	instance.ready = new ReactiveVar(false);
	instance.loaded = new ReactiveVar(0);

	Session.set('limit', 15);

	instance.userMovies = new ReactiveVar();

	var username = null;
	var limit = Session.get('limit');
	var subscription = instance.subscribe('userMovies', username, limit);
	var userFavoritesSubscription = instance.subscribe('userFavorites');

	instance.autorun( function(){
		limit = Session.get('limit');
		subscription = instance.subscribe('userMovies', username, limit);

		if (subscription.ready() && userFavoritesSubscription.ready()){
			username = Meteor.user().username;
			instance.ready.set(true);
			instance.userMovies.set(Movies.find({authorName: username}));
		} else {
			instance.ready.set(false);
	    }
	})
})

Template.dashboard.helpers({
	userMovies: function(){
		return Template.instance().userMovies.get();
	},
	username: function(){
		return Meteor.userId().username;
	},
	pageOptions: function(){
		var options = {
			animateIn: 'fadeIn',
			animateOut: 'fadeOut',
			classes: 'dashboard-page',
			pageTitle: 'Dashboard'
		}

		return options;
	}
})