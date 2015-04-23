Router.configure({
	layoutTemplate: 'layout'
});

Router.route('/',{
	action: function(){
		this.render('lobby');
		this.render('header', {to: 'header'});
	}
})

Router.route('/login', {
	action: function(){
		this.render('landing');
		this.render('header', {to: 'header'});
	}
});

Router.route('/dashboard', {
	action: function(){
		if (!Meteor.userId()){
			this.redirect('/');
		} else {
			this.render('dashboard');
			this.render('header', {to: 'header'});
		}
	}
});

Router.route('/:username', {
	action: function(){
		this.render('userPage');
		this.render('header', {to: 'header'});
	}
});

Router.route('/:username/favorites', {
	action: function(){
		this.render('favorites');
		this.render('header', {to: 'header'});
	}
});

Router.route('/movies/:_id', {
	action: function(){
		this.render ('movieSingle');
		this.render('header', {to: 'header'});
	}
})