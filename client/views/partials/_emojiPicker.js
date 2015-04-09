Template.emojiPicker.helpers({
	emojis: function(){
		var emojis = Meteor.emojis();
		var keywords = _.uniq(_.flatten(_.pluck(emojis, 'keywords')));
	},
	emoticons: function(){
		var emojis = Meteor.emojis();

		return _.where(emojis, {category: 'other'});
	}
})