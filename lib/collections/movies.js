Movies = new Mongo.Collection('movies');

Factory.define('movie', Movies, {
	title: 'Ghostbusters',
	author: '7AEHBxqXd4ZQ5yGKs',
	authorName: 'VeryBadHello',
	image: 'http://media3.giphy.com/media/yEkeo586C9GDe/giphy.gif',
	published: true,
	synopsis: ':heart::100:'
})

Meteor.methods({
	createMovie: function(title, authorName){
		if (!this.userId){
			throw new Meteor.Error(422, 'You must login to create a Moviemoji.');
		}

		if (!title){
			throw new Meteor.Error(422, 'Please enter a title.');
		}

		var movieID = Movies.insert({title: title, author: this.userId, authorName: authorName, published: false, createdOn: new Date(), synopsis: 'Enter Emoji Like This - :laughing:'})

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
	},
	deleteMovie: function(movieId, currentUser){
		var movie = Movies.findOne(movieId);

		if(movie.author !== currentUser){
			throw new Meteor.Error(422, 'You are not the author of this Moviemoji.');
		}

		Movies.remove(movieId);
	},
	addToFavorites: function(movieId, currentUser, username){
		var movie = Movies.findOne(movieId);

		if (currentUser !== this.userId){
			throw new Meteor.Error(422, 'Nice try, hackers.');
		}
	
		Movies.update({_id: movieId}, {$addToSet: {favorites: username}});
		Meteor.users.update({_id: currentUser}, {$addToSet: {favorites: movieId}});
	},
	removeFromFavorites: function(movieId, currentUser, username){
		var movie = Movies.findOne(movieId);
	
		Movies.update({_id: movieId}, {$pull: {favorites: username}});
		Meteor.users.update({_id: currentUser}, {$pull: {favorites: movieId}});
	}
})