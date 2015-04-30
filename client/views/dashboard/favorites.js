
Template.favorites.onCreated(function(){
	var instance = this;

	instance.ready = new ReactiveVar(false);
	instance.loaded = new ReactiveVar(0);

	Session.set('limit', 10);

	instance.favorites = new ReactiveVar();

	var limit = Session.get('limit');
	var username = Router.current().params.username;
	var subscription = instance.subscribe('favoriteMovies', 10, username);
	var userFavoritesSubscription = instance.subscribe('userFavorites');

	instance.autorun( function(){
		limit = Session.get('limit');
		subscription = instance.subscribe('favoriteMovies');

		if (subscription.ready() && userFavoritesSubscription.ready()){
			instance.ready.set(true);
			instance.favorites.set(Movies.find({favorites: username}));
		} else {
			instance.ready.set(false);
	    }
	})
})

Template.favorites.helpers({
	favorites: function(){
		if (Template.instance().ready.get()){
			return Template.instance().favorites.get();
		}
	},
	pageOptions: function(){
		var options = {
			animateIn: 'fadeIn',
			animateOut: 'fadeOut',
			classes: 'favorites-page',
			pageTitle: 'Favorites'
		}

		return options;
	}
})