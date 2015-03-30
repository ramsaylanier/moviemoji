Movies = new Mongo.Collection('movies');

Meteor.methods({
	createMovie: function(title){
		if (!this.userId){
			throw new Meteor.Error(422, 'You must login to create a story.');
		}

		if (!title){
			throw new Meteor.Error(422, 'Please enter a title.');
		}

		var movieID = Movies.insert({title: title, author: this.userId, published: false})

		return movieID; 
	}
})