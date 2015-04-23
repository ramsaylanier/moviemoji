Template.movieSynopsisForm.onRendered(function(){
	var emojiStrategy = Meteor.emojis();
	this.$(".synopsis-field").textcomplete([ {
    match: /\B:([\-+\w]*)$/,
    search: function (term, callback) {
        var results = [];
        var results2 = [];
        var results3 = [];
        $.each(emojiStrategy,function(shortname,data) {
            if(shortname.indexOf(term) > -1) { results.push(shortname); }
            else {
                if((data.aliases !== null) && (data.aliases.indexOf(term) > -1)) {
                    results2.push(shortname);
                }
                else if((data.keywords !== null) && (data.keywords.indexOf(term) > -1)) {
                    results3.push(shortname);
                }
            }
        });
 
        if(term.length >= 3) {
            results.sort(function(a,b) { return (a.length > b.length); });
            results2.sort(function(a,b) { return (a.length > b.length); });
            results3.sort();
        }
        var newResults = results.concat(results2).concat(results3);

        callback(newResults);
    },
    template: function (shortname) {
        return '<img class="emojione" src="//cdn.jsdelivr.net/emojione/assets/png/'+emojiStrategy[shortname].unicode+'.png"> :'+shortname+':';
    },
    replace: function (shortname) {
    	var currentOutput = $('.output').html();
    	var input = ':'+shortname+': ';
    	$('.output').html(currentOutput + emojione.shortnameToImage(input));
        return input;
    },
    index: 1,
    maxCount: 10
    }
    ],{
        footer: '<a href="http://www.emoji.codes" target="_blank">Browse All<span class="arrow">»</span></a>'
    });
})

Template.movieSynopsisForm.helpers({
	movieImage: function(){
		console.log(this);
		if (this.image){
			return this.image
		} else {
			var image = $('.page-header').css('background-image');
			image = image.substr(4, image.length - 5);
			return image;
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
	'keyup .synopsis-field': function(e){
    	var input = $(e.target).val();
    	$(e.target).val(input.trim());
    	$('.output').html(emojione.shortnameToImage(input));
	},
	'submit form': function(e){
		e.preventDefault();

		if (!Meteor.userId() || Meteor.userId() !== this.author ){
			Errors.throw('You are not authorized to publish this', 'error');
		} else {

			var synopsis = $(e.target).find('[name=synopsis-field]').val();
			var movieId = this._id; 

			var trimmed = synopsis.trim().replace(/:\/?[^:]+(:)/g, "").trim();
			var outputText = $('.output').text().trim();


			if (trimmed.length > 0 || outputText.length > 0){
				Errors.throw('Your synopsis has non-emoji in it. Tighten up!', 'error');
				return false;
			} else {
				var movie = this;
				movie.synopsis = synopsis;
				movie.title = $('.movie-name').text();
				movie.image = $('.gif-field').val();
				movie.published = true;
			
				Meteor.call('updateMovie', movie, function(error, result){
					if (error){
						Errors.throw(err.reason, 'error')
					} else {

						//reset output to synopsis to prevent double emojis
						$('.output').html(emojione.shortnameToImage(movie.synopsis));
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