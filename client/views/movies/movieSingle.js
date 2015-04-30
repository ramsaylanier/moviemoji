Template.movieSingle.onCreated(function(){
	var instance = this;
	instance.ready = new ReactiveVar(Router.current().ready());
	instance.loaded = new ReactiveVar(0);

	Session.set('limit', 10);

	var subscription = instance.subscribe('movieSingle', Router.current().params._id);
	var otherMoviesSubscription = instance.subscribe('otherMovies', Router.current().params._id);
	var limit = Session.get('limit');

	instance.autorun( function(){
		limit = Session.get('limit');
		if (subscription.ready()){
			instance.ready.set(true);
			instance.movie = Movies.findOne(Router.current().params._id);

			if (instance.movie.published){
				Session.set('editMode', false);
			} else{
				Session.set('editMode', true);
		
			}
		}
	});

	instance.otherMovies = function(){
		var movieTitle = instance.movie.title;
		return Movies.find({_id: {$ne: instance.movie._id}, title: movieTitle, published: true}, {sort: {createdOn: -1}, limit: limit})
	}
});

Template.movieSingle.onRendered(function(){
	var instance = this;
	$('html').velocity('scroll', {duration: 500, easing: 'easeOutQuant', delay: 200});
	Meteor.setTimeout(function(){
		var emojis = $('.output .emojione');
		var emojiString = _.pluck(emojis, 'alt').join('');
		var message = instance.movie.title + ': ' + emojiString;
		var tweetURL = encodeURI(window.location.href);

		var tweetString = "https://twitter.com/intent/tweet?text=" + message + "&hashtags=Moviemoji&via=moviemojiapp&url=" + tweetURL;
		$('.tweet-btn').attr('href', tweetString);
	}, 1500);
});

Template.movieSingle.onDestroyed(function(){
	Session.set('editMode', false);
})

Template.movieSingle.helpers({
	movieSingle: function(){
		return Movies.findOne(Router.current().params._id);
	},
	image: function(){
		var instance = Template.instance();
		var image = instance.movie.image || null;
		var published = instance.movie.published || false;

		if (image !== null){
			return image;
		} else {
			var movieTitle = encodeURI(instance.movie.title);

			HTTP.get('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=' + movieTitle, function(err, result){
				if (err){
					Errors.throw(error, 'error');
				} else {
					$('.page-header').css({
						"background-image":"url('" + result.data.data.image_url + "')"
					});
					$('.gif-field').val(result.data.data.image_url);
					return result.data.data.image_url;
				}
			});
		}

	},
	pageOptions: function(){
		var instance = this;
		var options = {
			animateIn: 'fadeIn',
			animateOut: 'fadeOut',
			easing: [300, 25],
			duration: 1000,
			classes: 'movie-page with-header',
			pageTitle: instance.title
		}
		return options;
	},
	titleOptions: function(){
		var options = {
			classes: 'hidden-item',
			animateIn: 'slideInFromBottom_Short',
			aniamteOut: 'zoomOut',
			easing: [300, 25],
			duration: 2000,
			delay: 300
		};
		return options;
	},
	outputOptions: function(){
		var options = {
			classes: 'hidden-item',
			animateIn: 'slideInFromBottom_Short',
			aniamteOut: 'zoomOut',
			easing: [300, 25],
			duration: 2000,
			delay: 500
		};
		return options;
	},
	editFormOptions: function(){
		var options = {
			classes: 'hidden-item edit-form-item',
			animateIn: 'slideInFromBottom_Short',
			aniamteOut: 'zoomOut',
			easing: [300, 25],
			duration: 2000,
			delay: 800
		};
		return options;
	},
	listOptions: function(){
		var options = {
			animateItems: false,
			waitForReady: true,
			animateIn: 'none',
			animateOut: 'none',
			itemAnimateIn: 'fadeIn',
			itemAnimateOut: 'fadeOut',
			duration: 1000,
			delay: 200,
			context: this.favorites
		}

		return options;
	},
	itemOptions: function(){
		var options = {
			animateIn: 'none',
			animateOut: 'none',
			classes: 'favorite-item hidden-item'
		};

		return options;
	},
	isAuthor: function(){
		if (Meteor.userId() === this.author){
			return true;
		}
	},
	synopsis: function(){
		if (this.synopsis){
			return emojione.shortnameToImage(this.synopsis);
		} else{
			return false;
		}
	},
	editMode: function(){
		return Session.get('editMode');
	},
	editable: function(){
		var editMode = Session.get('editMode');

		if (editMode){
			return 'contentEditable';
		}
	},
	otherMovies: function(){
		return Template.instance().otherMovies();
	},
	favorited: function(){
		var favorites = Template.instance().movie.favorites;
		if (_.contains(favorites, Meteor.user().username)){
			return 'favorited'
		} else{
			return false;
		}
	}
})

Template.movieSingle.events({
	'click .edit-mode-btn': function(){
		Session.set('editMode', true);
		$('.page-title').velocity(
			'scroll', {duration: 1000, offset: -20}
		)
	},
	'click .favorite-btn': function(e, template){
		var btn = $(e.currentTarget);
		btn.toggleClass('favorited');

		var movieId = Router.current().params._id;

		if (btn.hasClass('favorited')){
			Meteor.call('addToFavorites', movieId, Meteor.userId(), Meteor.user().username, function(error){
				if (error){
					Errors.throw(error.reason, 'error')
				}
			})
		} else {
			Meteor.call('removeFromFavorites', movieId, Meteor.userId(), Meteor.user().username,  function(error){
				if (error){
					Errors.throw(error.reason, 'error')
				}
			})
		}
	},
	'click .facebook-btn': function(e){
		e.preventDefault();
		var instance = Template.instance();
		var emojis = $('.output .emojione');
		var emojiString = _.pluck(emojis, 'alt').join('');
		var message = instance.movie.title + ': ' + emojiString;
		var picture = instance.movie.image;

		console.log(window.location.href);

		FB.ui({
		  method: 'feed',
		  link: window.location.href,
		  picture: picture,
		  source: picture,
		  caption: message,
		  description: 'Moivemoji - movies, but in emoji form.'
		}, function(response){});
	}
});