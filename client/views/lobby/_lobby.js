Template.lobby.onCreated(function(){
	var instance = this;
	
	instance.ready = new ReactiveVar(false);
	var subscription = instance.subscribe('publicMovies');

	instance.autorun( function(){
		if (subscription.ready()){
			instance.ready.set(true);
		}
	})
})

Template.lobby.helpers({
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
			duration: 2000,
			easing: [600, 15],
			classes: 'movie-list',
			context: this,
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

Template.lobby.onDestroyed(function(){
	console.log('lobbyDestroyed');
})