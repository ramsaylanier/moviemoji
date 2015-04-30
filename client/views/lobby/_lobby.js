Template.lobby.onCreated(function(){
	var instance = this;
	
	instance.ready = new ReactiveVar(false);
	instance.loaded = new ReactiveVar(0);

	Session.set('limit', 15);

	instance.publicMovies = new ReactiveVar();

	var limit = Session.get('limit');
	var userFavoritesSubscription = instance.subscribe('userFavorites');
	var subscription = instance.subscribe('publicMovies', limit);

	instance.autorun( function(){
		limit = Session.get('limit');
		subscription = instance.subscribe('publicMovies', limit);

		if (subscription.ready() && userFavoritesSubscription.ready()){
			instance.ready.set(true);
			instance.loaded.set(limit);
			instance.publicMovies.set(Movies.find({published: true}, {sort: {createdOn: -1}, limit: limit}));
		} else {
	      instance.ready.set(false);
	    }
	});
})

Template.lobby.helpers({
	isReady: function(){
		return Template.instance().ready.get();
	},
	publicMovies: function(){
		return Template.instance().publicMovies.get();
	},
	pageOptions: function(){
		var options = {
			animateIn: 'none',
			animateOut: 'fadeOut',
			classes: 'lobby-page',
			pageTitle: 'Lobby'
		}

		return options;
	}
});