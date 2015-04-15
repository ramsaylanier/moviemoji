Template.movieItem.helpers({
	createdOn: function(){
		var date = this.createdOn;
		return date.getMonth() + '/' + date.getDay() + '/' + date.getFullYear().toString().substr(2,4);
	},
	synopsis: function(){
		var synopsis = this.synopsis;
		return emojione.shortnameToImage(synopsis);
	}
})