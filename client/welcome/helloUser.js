// to show some test data during development


Template.helloUser.rendered = function (){

  Tracker.autorun(function(){

   Meteor.subscribe("myAccount",Meteor.userId());


   Meteor.subscribe("images");

    //Tracekr calls these func everytime when anything changes (Meteor Reactivity module)

  })

} ;



Template.helloUser.helpers({


  myProfilePic: function () {

    var profilePhotoID;

    var userAccount=Meteor.users.find({"_id": Meteor.userId()});

    userAccount.forEach(function (userDB) {

                  profilePhotoID = userDB.profile.photoID;
                     console.log( profilePhotoID);

                    });


    return Images.find({"_id": profilePhotoID});

    // Images is an FS.Collection instance

  },


});

// ---------------    ----------------------------------------


// ---------------------- Capturing form data for updating user profile --------------------

Template.helloUser.events( {

  'change .myFileInput': function(event, template) {

       FS.Utility.eachFile(event, function(file) {



         Images.insert(file, function (err, fileObj) {
             if (err){
                // handle error
                console.log("error uploading image");
             }

             else {
                // handle success depending what you need to do
               var userId = Meteor.userId();

               var profilePhoto = {
                 "profile.photoID": fileObj._id
               };

               Meteor.users.update(userId, {$set: profilePhoto});

               console.log("done uploading image");
             }
           });
      });
    },


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
