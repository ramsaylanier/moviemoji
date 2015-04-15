Template.dashboard.onCreated(function(){
	var instance = this;
	
	instance.ready = new ReactiveVar(false);
	instance.loaded = new ReactiveVar(0);

	Session.set('limit', 10);

	instance.favorites = new ReactiveVar();
	instance.userMovies = new ReactiveVar();

	var limit = Session.get('limit');
	var subscription = instance.subscribe('userMovies', Meteor.userId(), limit);
	var favoritesSubscription = instance.subscribe('favoriteMovies');

	instance.autorun( function(){
		limit = Session.get('limit');
		subscription = instance.subscribe('userMovies', Meteor.userId());

		if (subscription.ready()){
			instance.ready.set(true);
			instance.favorites.set(Movies.find({favorites: Meteor.userId()}));
			instance.userMovies.set(Movies.find({author: Meteor.userId()}));
		} else {
			instance.ready.set(false);
	    }
	})
})

Template.dashboard.helpers({
	favorites: function(){
		return Template.instance().favorites.get();
	},
	userMovies: function(){
		return Template.instance().userMovies.get();
	},
	pageOptions: function(){
		var options = {
			animateIn: 'fadeIn',
			animateOut: 'fadeOut',
			classes: 'dashboard-page',
			pageTitle: 'Dashboard'
		}

		return options;
	},
	favoriteListOptions: function(){
		var options = {
			animateItems: true,
			waitForReady: true,
			animateIn: 'none',
			animateOut: 'none',
			itemAnimateIn: 'slideInFromBottom_Short',
			duration: 2000,
			easing: [600, 15],
			classes: 'movie-list favorite-list',
			context: Template.instance().favorites.get(),
			dataReady: Template.instance().ready.get()
		};
		return options;
	},
	itemOptions: function(){
		var options = {
			animateIn: 'slideInFromTop_Short',
			animateOut: 'fadeOut',
			classes: 'create-movie-item hidden-item',
			duration: 2000,
			easing: [300, 15],
			delay: 200
		}

		return options;
	},
	movieItemOptions: function(){
		var options = {
			animateIn: 'none',
			animateOut: 'none',
			classes: 'movie-item hidden-item card'
		}

		return options;
	}
})