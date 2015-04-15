Meteor.publish('movieSingle', function(movieID){
	return Movies.find(movieID);
});

Meteor.publish('publicMovies', function(limit){
	return Movies.find({published: true}, {sort: {createdOn: -1, title: 1}, limit: limit});
});

Meteor.publish('userMovies', function(userId, limit){
	return Movies.find({author: userId}, {sort: {createdOn: -1, title: 1}, limit: limit});
});

Meteor.publish('userFavorites', function(){
	return Meteor.users.find({_id: this.userId}, {field: {favorites: 1}});
});

Meteor.publish('favoriteMovies', function(limit){
	return Movies.find({favorites: this.userId}, {sort: {createdOn: -1, title: 1}, limit: limit});
});