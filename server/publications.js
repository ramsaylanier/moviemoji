Meteor.publish('movieSingle', function(movieID){
	console.log(movieID);
	return Movies.find(movieID);
})