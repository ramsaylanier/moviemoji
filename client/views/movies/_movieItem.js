Template.movieItem.helpers({
	createdOn: function(){
		var date = this.createdOn;
		return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear().toString().substr(2,4);
	},
	synopsis: function(){
		var synopsis = this.synopsis;

		if (this.published){
			var cleaned = synopsis.match(/(:)\w+(:)/g).slice(0,10);
			var converted = emojione.shortnameToImage(cleaned.join(''));
			var ellipses = (cleaned.length >= 10) ? '...':''
			return converted + ellipses;
		} else {
			return synopsis;
		}
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