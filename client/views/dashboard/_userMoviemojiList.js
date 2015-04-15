Template.userMoviemojiList.onCreated(function(){
	var instance = this;
	
	instance.ready = new ReactiveVar(false);
	instance.loaded = new ReactiveVar(0);

	Session.set('limit', 10);

	var limit = Session.get('limit');
	var subscription = instance.subscribe('userMovies');

	instance.autorun( function(){
		if (subscription.ready()){
			instance.ready.set(true);
		}
	})

	instance.items = function(){
		return instance.data;
	}
})

Template.userMoviemojiList.helpers({
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
			context: Template.instance().items,
			dataReady: Template.instance().ready.get()
		};
		return options;
	},
	itemOptions: function(){
		var options = {
			animateIn: 'none',
			animateOut: 'none',
			classes: 'movie-item hidden-item card'
		}

		return options;
	}
})