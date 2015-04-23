Template.userMoviemojiList.helpers({
	items: function(){
		if(Template.instance().data){
			return Template.instance().data;
		}
	},
	listOptions: function(){
		var options = {
			animateItems: true,
			waitForReady: true,
			animateIn: 'none',
			animateOut: 'none',
			itemAnimateIn: 'slideInFromBottom_Short',
			itemAnimateOut: 'fadeOut',
			duration: 1000,
			delay: 50,
			easing: [600, 20],
			classes: 'movie-list',
			context: Template.instance().data
		};
		return options;
	},
	itemOptions: function(){
		var options = {
			animateIn: 'none',
			animateOut: 'none',
			classes: 'movie-item hidden-item card'
		}

		if (Meteor.user()){
			options.classes += ' with-user';
		}

		return options;
	}
})