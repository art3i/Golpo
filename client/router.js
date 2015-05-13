Router.configure({

  layoutTemplate : 'baseLayout',

})

Router.map(function(){

    this.route('home', {path: '/'} );
    this.route('friends', {path: '/friends'} );
    this.route('favourites', {path: '/favourites'} );
    this.route('newsfeed', {path: '/newsfeed'} );
    this.route('photo', {path: '/photo'} );

});
