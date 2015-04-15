Template.movieItem.helpers({
	createdOn: function(){
		var date = this.createdOn;
		return date.getMonth() + '/' + date.getDay() + '/' + date.getFullYear().toString().substr(2,4);
	},
	synopsis: function(){
		var synopsis = this.synopsis;
		return emojione.shortnameToImage(synopsis);
	},
	notDashboard: function(){
		if (window.location.pathname === '/dashboard'){
			return false;
		} else{
			return true;
		}
	}
})

Template.movieItem.events({
	'click .favorite-btn': function(e, template){
		var btn = $(e.currentTarget);
		btn.toggleClass('favorited');

		var movieId = template.data._id;

		console.log(movieId);

		if (btn.hasClass('favorited')){
			Meteor.call('addToFavorites', movieId, Meteor.userId(), function(error){
				if (error){
					Errors.throw(error.reason, 'error')
				}
			})
		} else {
			Meteor.call('removeFromFavorites', movieId, Meteor.userId(), function(error){
				if (error){
					Errors.throw(error.reason, 'error')
				}
			})
		}
	}
})