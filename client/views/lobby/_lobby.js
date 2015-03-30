Template.lobby.helpers({
	pageOptions: function(){
		var options = {
			animateIn: 'none',
			classes: 'lobby-page with-header',
			pageTitle: 'Lobby'
		}

		return options;
	},
	itemOptions: function(){
		var options = {
			animateIn: 'slideInFromTop_Short',
			animateOut: 'fadeOut',
			classes: 'create-movie-item hidden-item',
			duration: 2000,
			easing: [300, 15],
			delay: 200
		}

		return options;
	}
})

Template.lobby.events({
	'click .create-move-btn':function(){
		$('.fold-out-container').toggleClass('active');
	}
})