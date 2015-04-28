Template.loading.onRendered(function(){
	var counter = 0;
	var emojis = $('.emoji');

	var interval = Meteor.setInterval(function () {
		if ($('.loading-wrapper').length){
			$(emojis[counter]).removeClass('off-page');
			counter++;

			if (counter === emojis.length + 1) {
				$('.emoji').addClass('off-page');
				counter = 0;
			}
		} else {
			Meteor.clearInterval(interval);
		}
	}, 300);

	this.$('.loading-wrapper').velocity({
		opacity: [1,0]
	}, {duration: 300, delay: 300});
})

Template.loading.helpers({
	randomEmoji: function(){
		var emojis = _.map(
						_.sample(
							_.filter(Meteor.emojis(), function(emoji){
								return _.indexOf(['places', 'other'], emoji.category) == -1; 
							}),
						6), 
						function(emoji){
							return {shortname: emoji.shortname, category: emoji.category};
					});

		return emojis;
	}
})