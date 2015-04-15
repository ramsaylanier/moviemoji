Template.lobby.onCreated(function(){
	var instance = this;
	
	instance.ready = new ReactiveVar(false);
	instance.loaded = new ReactiveVar(0);

	Session.set('limit', 10);

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

Template.lobby.onRendered(function(){
	$(window).on('scroll', function(){
		var threshold, target = $(".show-more-btn");
		if (!target.length) return;

		threshold = $(window).scrollTop() + $(window).height() - target.height();

		if (target.offset().top < threshold) {
		    if (!target.data("visible")) {
		        target.data("visible", true);

		        Session.set('itemCount', 0);
			    var limit = Session.get('awardLimit')
			    limit += 10;
			    Session.set('limit', limit);
		    }
		} else {
		    if (target.data("visible")) {
		        target.data("visible", false);
		    }
		}     
	})
})

Template.lobby.helpers({
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
	},
	listOptions: function(){
		var options = {
			animateItems: true,
			waitForReady: true,
			animateIn: 'none',
			animateOut: 'none',
			itemAnimateIn: 'slideInFromBottom_Short',
			itemAnimateOut: 'fadeOut',
			duration: 2000,
			easing: [600, 15],
			classes: 'movie-list',
			context: Template.instance().publicMovies(),
			dataReady: Template.instance().ready.get()
		};

		return options;
	},
	itemOptions: function(){
		var options = {
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
});