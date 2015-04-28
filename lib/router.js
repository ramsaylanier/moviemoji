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
	},
	onAfterAction: function(){
		SEO.set({
			title: 'Moviemoji - login',
			meta: {
				'description': 'Login to Moviemoji'
			},
			og: {
				'title': 'Moviemoji - login',
				'description': 'Login to Moviemoji'
			}
		})
	}
});

Router.route('/dashboard', {
	action: function(){
		if (!Meteor.userId()){
			this.redirect('/');
		} else {
			this.render('dashboard');
		}
	},
	onAfterAction: function(){
		SEO.set({
			title: 'Moviemoji - dashboard',
			meta: {
				'description': 'Moviemoji dashboard'
			},
			og: {
				'title': 'Moviemoji - dashboard',
				'description': 'Moviemoji dashboard'
			}
		})
	}
});

Router.route('/:username', {
	action: function(){
		this.render('userPage');
	},
	onAfterAction: function(){
		SEO.set({
			title: 'Moviemoji - ' + this.params.username,
			meta: {
				'description': this.params.username + "'s Moviemoji"
			},
			og: {
				'title': 'Moviemoji - ' + this.params.username,
				'description': this.params.username + "'s Moviemoji"
			}
		})
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
	},
	onAfterAction: function(){
		var movie = Movies.findOne(this.params._id);

		if (movie){
			SEO.set({
				title: movie.title,
				meta: {
					'description': movie.synopsis
				},
				og: {
					'title': movie.title,
					'description': movie.synopsis,
					'image': movie.image
				}
			})
		}
	}
})