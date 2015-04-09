Template.newMovieForm.helpers({
	modalOptions: function(){
		var defaultOptions = getDefaultPageOptions();
		var modalOptions = {animateIn: "zoomIn", animateOut: 'zoomOut', easing: [300, 20], duration: 1000};
		var options = _.extend(defaultOptions, modalOptions);

		return options;
	}
})


Template.newMovieForm.events({
	'submit form': function(e){
		e.preventDefault();

		if (!Meteor.userId()){
			Errors.throw('You must be logged in to perform this action.', 'error')
		} else {
			var title = $(e.target).find('[name=movie-title]').val();

			if (!title){
				Errors.throw('Please enter a movie title.', 'error');
			} else {
				Meteor.call('createMovie', title, function(error, result){
					if (error){
						Errors.throw(error.reason, 'error')
					} else {
						var modalOptions = Session.get('modalOptions');
						donutStates.switchModalState();

						Meteor.setTimeout(function(){
							var page = $('.page');
							var url = '/movies/' + result; 
							var pageOptions = Session.get('pageOptions');
							var animationType = pageOptions.animateOut;
							donutAnimation.findAnimation(pageOptions, animationType, page, url);
							Session.set('editMode', true);
						}, 0);
					}
				})
			}
		}

	}
})