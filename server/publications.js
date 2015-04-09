Meteor.publish('movieSingle', function(movieID){
	console.log(movieID);
	return Movies.find(movieID);
});

Meteor.publish('publicMovies', function(){
	return Movies.find();
});