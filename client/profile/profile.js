// to show some test data during development


Template.profile.rendered = function (){

  Tracker.autorun(function(){

   Meteor.subscribe("userData",Meteor.userId());

    //Tracekr calls these func everytime when anything changes (Meteor Reactivity module)

  })

} ;



Template.profile.helpers({

  userDetail : function () {

    //console.log(Meteor.users.find());
   return Meteor.users.find({"_id": Meteor.userId()});
// return Meteor.users.find();


},

});

// ---------------    ----------------------------------------


// ---------------------- Capturing form data for updating user profile --------------------

Template.profile.events( {

  'submit #profileUpdateForm' : function (e, tmpl){

    e.preventDefault();

    //alert(Meteor.userId());
    // uncomment to clear all database during development
  //Meteor.call('clearAllDB');

        var fullName = tmpl.find('#fullName').value;
        var location = tmpl.find('#location').value;

        var info= {

          loginID : Meteor.userId(),
          fullName : fullName,
          location : location,


        };

        Meteor.call('addUserDetails', info );

        //now clearing the form fields

        $('#profileUpdateForm').trigger("reset");




      console.log( "inCLient~ profile data updated ");



  },


});
