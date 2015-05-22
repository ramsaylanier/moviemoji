Template.movieSynopsisForm.helpers({
	movieImage: function(){
		if (this.image){
			return this.image
		} else {
			var image = $('.page-header').css('background-image');

			if (image){
				image = image.substr(4, image.length - 5);
				return image;
			} else {
				return false;
			}
		}
	}
})

Template.movieSynopsisForm.events({
	'click .delete-movie-btn': function(e){
		if (Meteor.userId() !== this.author){
			Errors.throw('You are not authorized to delete this.', 'error');
		} else {
			Meteor.call('deleteMovie', this._id, Meteor.userId(), function(error){
				if (error){
					Errors.throw(error.reason, 'error');
				} else{
					Router.go('/' + Meteor.user().username);
				}
			})
		}
	},
	'submit form': function(e){
		e.preventDefault();

		if (!Meteor.userId() || Meteor.userId() !== this.author ){
			Errors.throw('You are not authorized to publish this', 'error');
		} else {
			var synopsis = $(e.target).find('[name=synopsis-field]').val();

			if (/([\w\.\,\!\@\#\$\%\^\&\*\(\)\;\:\/\|\<\>\"\'\+\-\?\=\\])/g.test(synopsis)){
				Errors.throw('Your synopsis contains non-emoji! Tighten up!', 'error');
			} else {
				var movieId = this._id; 
				var movie = this;
				movie.synopsis = synopsis;
				movie.title = $('.movie-name').text();
				movie.image = $('.gif-field').val();
				movie.published = true;
			
				Meteor.call('updateMovie', movie, function(error, result){
					if (error){
						Errors.throw(error.reason, 'error')
					} else {
						$('.output').html(movie.synopsis);
						Session.set('editMode', false);
						Errors.throw('Saved!', 'success');
					}
				})	
			}
		}
	},
	'click .refresh-gif-btn': function(){
		var movieTitle = encodeURI(this.title);

		HTTP.get('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=' + movieTitle, function(err, result){
			if (err){
				console.log(err);
			} else {
				$('.page-header').css({
					"background-image":"url('" + result.data.data.image_url + "')"
				});
				$('.gif-field').val(result.data.data.image_url);
			}
		});
	}
})