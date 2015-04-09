Router.configure({
	layoutTemplate: 'layout'
})

Router.route('/',{
	action: function(){
		this.render('landing');
	}
})

Router.route('/lobby', {
	// onBeforeAction: function(){
	// 	if (Meteor.user()){
	// 		this.next();
	// 	} else {
	// 		this.redirect('/');
	// 	}
	// },
	action: function(){
		this.render('lobby');
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