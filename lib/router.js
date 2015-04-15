Router.configure({
	layoutTemplate: 'layout'
});

Router.onBeforeAction('loading');

Router.route('/',{
	action: function(){
		this.render('landing');
	}
})

Router.route('/lobby', {
	// data: function(){
	// 	return Movies.find({published: true}, {sort: {createdOn: -1}});
	// },
	action: function(){
		this.render('lobby');
		this.render('header', {to: 'header'});
	}
})

Router.route('/dashboard', {
	// data: function(){
	// 	return Movies.find({author: Meteor.userId()})
	// },
	// subscriptions: function(){
	// 	this.subscribe('userMovies');
	// },
	action: function(){
		this.render('dashboard');
		this.render('header', {to: 'header'});
	}
})

Router.route('/movies/:_id', {
	data: function(){
		return Movies.findOne(this.params._id);
	},
	action: function(){
		this.render ('movieSingle');
		this.render('header', {to: 'header'});
	}
})