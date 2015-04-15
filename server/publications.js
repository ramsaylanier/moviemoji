Meteor.publish('movieSingle', function(movieID){
	console.log(movieID);
	return Movies.find(movieID);
});

Meteor.publish('publicMovies', function(){
	return Movies.find({published: true}, {sort: {title: 1}});
});

Meteor.publish('userMovies', function(){
	console.log(this.userId);
	return Movies.find({author: this.userId});
});