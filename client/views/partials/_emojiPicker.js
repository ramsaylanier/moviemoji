Template.emojiPicker.helpers({
	emojis: function(){

		var emojis = Meteor.emojis();

		console.log(emojis);

		var keywords = _.uniq(_.flatten(_.pluck(emojis, 'keywords')));
		console.log(keywords);
	},
	emoticons: function(){
		var emojis = Meteor.emojis();

		return _.where(emojis, {category: 'emoticons'});
	}
})