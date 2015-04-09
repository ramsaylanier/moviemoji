
Template.movieSingle.onCreated(function(){
	var instance = this;
	var movieId = Router.current().params._id;

	instance.ready = new ReactiveVar(false);
	var subscription = instance.subscribe('movieSingle', movieId);

	Session.set('editMode', false);

	instance.autorun( function(){
		if (subscription.ready()){
			instance.ready.set(true);
			instance.data = Movies.findOne(movieId);

			if (instance.data.image){
				$('.page-header').css({
					"background-image":"url('" + instance.data.image + "')"
				});
			} else {
				var movieTitle = encodeURI(instance.data.title);

				HTTP.get('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=' + movieTitle, function(err, result){
					if (err){

					} else {
						console.log(result.data);
						$('.page-header').css({
							"background-image":"url('" + result.data.data.image_url + "')"
						});
					}
				});
			}
		}
	});
});

Template.movieSingle.helpers({
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
	isAuthor: function(){
		if (Meteor.userId() === this.author){
			return true;
		}
	},
	synopsis: function(){
		return emojione.shortnameToImage(this.synopsis);
	},
	editMode: function(){
		return Session.get('editMode');
	},
	editable: function(){
		var editMode = Session.get('editMode');

		if (editMode){
			return 'contentEditable';
		}
	}
})

Template.movieSingle.events({
	'click .edit-mode-btn': function(){
		Session.set('editMode', true)
	}
})