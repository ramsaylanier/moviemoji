Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading'
})

Router.onBeforeAction('loading');

Router.route('/',{
	action: function(){
		this.render('landing');
	}
})

Router.route('/lobby', {
	onBeforeAction: function(){
		if (!Meteor.user()){
			this.redirect('/')
		} else {
			this.next();
		}
	},
	action: function(){
		this.render('lobby');
		this.render('header', {to: 'header'});
	}

})

Router.route('/movies/:_id', {
	waitOn: function(){
		return Meteor.subscribe('movieSingle', this.params._id);
	},
	data: function(){
		return Movies.findOne(this.params._id);
	},
	action: function(){
		this.render ('movieSingle')
	}
})