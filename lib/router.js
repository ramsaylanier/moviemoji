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
		});
	}
});

Router.route('/about',{
	action: function(){
		this.render('about');
	},
	onAfterAction: function(){
		SEO.set({
			title: 'Moviemoji - about',
			meta: {
				'description': 'Moviemoji was created by Ramsay Lanier using Meteor.js, the Giphy API, and Emojione.'
			},
			og: {
				'title': 'Moviemoji - about',
				'description': 'Moviemoji was created by Ramsay Lanier using Meteor.js, the Giphy API, and Emojione.'
			}
		});
	}
});

Router.route('/privacy-policy',{
	action: function(){
		this.render('privacy');
	},
	onAfterAction: function(){
		SEO.set({
			title: 'Moviemoji - Privacy Policy',
			meta: {
				'description': 'Moviemoji privacy policy.'
			},
			og: {
				'title': 'Moviemoji - Privacy Policy',
				'description': 'Moviemoji privacy policy.'
			}
		});
	}
});

Router.route('/terms',{
	action: function(){
		this.render('terms');
	},
	onAfterAction: function(){
		SEO.set({
			title: 'Moviemoji - Terms And Conditions',
			meta: {
				'description': 'Moviemoji terms and conditions.'
			},
			og: {
				'title': 'Moviemoji - Terms And Conditions',
				'description': 'Moviemoji terms and conditions.'
			}
		});
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
					'description': 'Create movie synopses using only emoji - just like this one.',
					'image': movie.image
				},
				twitter:{
					'title': movie.title,
					'description':'Create movie synopses using only emoji - just like this one.',
					'image': movie.image
				}
			})
		}
	}
})