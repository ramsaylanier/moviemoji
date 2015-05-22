Template.movieItem.helpers({
	createdOn: function(){
		var createdDate = this.createdOn;
		var month = createdDate.getMonth() + 1;
		var date = createdDate.getDate();


		month = month < 10 ? '0' + month : '' + month;
		date = date < 10 ? '0' + date : '' + date;

		return month + '/' + date + '/' + createdDate.getFullYear().toString().substr(2,4);
	},
	notDashboard: function(){
		if (window.location.pathname === '/dashboard'){
			return false;
		} else{
			return true;
		}
	},
	userPage: function(){
		if (this.authorName === window.location.pathname.substr(1)){
			return true;
		} else{
			return false;
		}
	},
	favorited: function(){
		var userFavs = Meteor.user().favorites;
		if (_.contains(userFavs, this._id)){
			return 'favorited'
		} else{
			return false;
		}
	}
})

Template.movieItem.events({
	'click .favorite-btn': function(e, template){
		var btn = $(e.currentTarget);
		btn.toggleClass('favorited');

		var movieId = template.data._id;

		if (btn.hasClass('favorited')){
			Meteor.call('addToFavorites', movieId, Meteor.userId(), Meteor.user().username, function(error){
				if (error){
					Errors.throw(error.reason, 'error')
				}
			})
		} else {
			Meteor.call('removeFromFavorites', movieId, Meteor.userId(), Meteor.user().username,  function(error){
				if (error){
					Errors.throw(error.reason, 'error')
				}
			})
		}
	}
})