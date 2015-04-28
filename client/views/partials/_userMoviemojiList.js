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

Template.userMoviemojiList.onRendered(function(){
	console.log('rendered');

	$('html, body').velocity(
		'scroll', 300);

	var scrollDebounce = false;

	$(window).on('scroll', function(){
		var threshold, target = $(".show-more-btn");
		if (!target.length || scrollDebounce == true) return;

		threshold = $(window).scrollTop() + $(window).height() + 100;

		if (target.offset().top < threshold) {
		    if (!target.data("visible")) {

				scrollDebounce = true;

		        target.data("visible", true);

		        Session.set('itemCount', 0);
			    var limit = Session.get('limit');
			    limit += 15;
			    Session.set('limit', limit);

			    Meteor.setTimeout(function(){
			    	scrollDebounce = false;
			    }, 200);
		    }
		} else {
		    if (target.data("visible")) {
		        target.data("visible", false);
		    }
		}     
	})
})