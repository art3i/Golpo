Router.configure({

  layoutTemplate : 'baseLayout',

})

Router.map(function(){

  //  this.route('welcome', {path: '/'} );
    this.route('home', {path: '/home'} );
    this.route('dearDiary', {path: '/mydiary'} );
    this.route('timeline', {path: '/timeline'} );


    this.route('profile', {path: '/profile'} );

    this.route('friends', {path: '/friends'} );
    this.route('favourites', {path: '/favourites'} );
    this.route('explore', {path: '/explore'} );
    this.route('photo', {path: '/photo'} );

    this.route('message', {path: '/message'} );


});


Router.route('/', function () {


  if(Meteor.userId()==null){

  // alert(Meteor.userId());

  this.layout('welcomeLayout');
  this.render('welcome');

  }
  else{


      this.layout('baseLayout');
      this.render('home');

  }


      // // use the template named ApplicationLayout for our layout
      // this.layout('ApplicationLayout');
      //
      // // render the Post template into the "main" region
      // // {{> yield}}
      // this.render('Post');
      // // render the PostAside template into the yield region named "aside"
      // // {{> yield "aside"}}
      // this.render('PostAside', {to: 'aside'});
      // // render the PostFooter template into the yield region named "footer"
      // // {{> yield "footer"}}
      // this.render('PostFooter', {to: 'footer'});
});
