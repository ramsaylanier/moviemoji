Meteor.publish('userFavorites', function(){
	return Meteor.users.find({_id: this.userId}, {field: {favorites: 1}});
});

Meteor.publish('movieSingle', function(movieID){
	return Movies.find(movieID);
});

Meteor.publish('publicMovies', function(limit){
	return Movies.find({published: true}, {sort: {createdOn: -1, title: 1}, limit: limit});
});

Meteor.publish('userMovies', function(username, limit){
	if (!username){
		username = Meteor.users.findOne(this.userId).username;
	}
	return Movies.find({authorName: username, published: true}, {sort: {createdOn: -1, title: 1}, limit: limit});
});

Meteor.publish('favoriteMovies', function(limit, username){
	return Movies.find({favorites: username}, {sort: {createdOn: -1, title: 1}, limit: limit});
});

Meteor.publish('otherMovies', function(movieID, limit){
	var movieTitle = Movies.findOne(movieID).title;
	return Movies.find({_id: {$ne: movieID}, title: movieTitle, published: true}, {sort: {createdOn: -1}, limit: limit})
});

