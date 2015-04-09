Movies = new Mongo.Collection('movies');

Meteor.methods({
	createMovie: function(title){
		if (!this.userId){
			throw new Meteor.Error(422, 'You must login to create a Moviemoji.');
		}

		if (!title){
			throw new Meteor.Error(422, 'Please enter a title.');
		}

		var movieID = Movies.insert({title: title, author: this.userId, published: false})

		return movieID; 
	},
	updateMovie: function(movie){
		if (!this.userId){
			throw new Meteor.Error(422, 'You must login to update this Moviemoji.');
		}

		if (this.userId !== movie.author){
			throw new Meteor.Error(422, 'You are not the author of this Moviemoji.');
		}

		var movieId = Movies.update({_id: movie._id}, movie);
	}
})