
Template.movieSingle.onCreated(function(){
	var instance = this;
	instance.ready = new ReactiveVar(Router.current().ready());

	Session.set('editMode', false);

	var subscription = instance.subscribe('movieSingle', Router.current().params._id);

	instance.autorun( function(){
		var data = Template.currentData();
		if (data && subscription.ready()){
			var image = data.image || null;

			if (image !== null){
				$('.page-header').css({
					"background-image":"url('" + image + "')"
				});
			} else {
				var movieTitle = encodeURI(data.title);

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
	}
})

Template.movieSingle.events({
	'click .edit-mode-btn': function(){
		Session.set('editMode', true)
	},
	'click .refresh-gif-btn': function(){
		var movieTitle = encodeURI(this.title);

		HTTP.get('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=' + movieTitle, function(err, result){
			if (err){

			} else {
				$('.page-header').css({
					"background-image":"url('" + result.data.data.image_url + "')"
				});
				$('.gif-field').val(result.data.data.image_url);
			}
		});
	}
})