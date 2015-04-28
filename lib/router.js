Router.configure({
	layoutTemplate: 'layout'
});

Router.route('/',{
	action: function(){
		this.render('lobby');
	}
})

Router.route('/login', {
	action: function(){
		this.render('landing');
	}
});

Router.route('/dashboard', {
	action: function(){
		if (!Meteor.userId()){
			this.redirect('/');
		} else {
			this.render('dashboard');
		}
	}
});

Router.route('/:username', {
	action: function(){
		this.render('userPage');
	}
});

Router.route('/:username/favorites', {
	action: function(){
		this.render('favorites');
	}
});

Router.route('/movies/:_id', {
	action: function(){
		this.render ('movieSingle');
	}
})