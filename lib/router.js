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

    Meteor.subscribe("myAccount", Meteor.userId());

      this.layout('baseLayout');
      this.render('home');

      // for newly singed up user  without a name-------------------------

              // checking if the user has updated the profile yet with fullName. The query will return an empty object
              // if no profile.fullName field exists.

          var myObject= {};
              myObject=Meteor.users.find({"profile.fullName": {'$exists' : true } }).fetch();

              if(jQuery.isEmptyObject(myObject))
                   {
                     //console.log(" user haven't added full name");
                     //alert("New User, please complete your profile first!");
                        this.render('helloUser');
                   }


      // ------------------- END checking new user profile update



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
