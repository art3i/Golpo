// ----------------------------------------------------------------------------------------
// -------------- PUBLICATIONS ------------------------
// ----------------------------------------------------------------------------------------


Meteor.publish("myStory" , function(userId){

// this will publish all types of self story regarding of public/ private filter to the timeline
// of the user.

// return StoryBook.find();  // uncomment for testing only;

       return StoryBook.find({"authorID" : userId});


  });

// ------------------

Meteor.publish("worldStory" , function(userId){

  // this will publish all the published public stories of all storytellers in the explore section

  return StoryBook.find();  // haven't filter just public stories yet ;


    });


// ------------------


Meteor.publish("storyOpinionDB" , function(userId){


  return StoryOpinion.find();


    });




Meteor.publish("likes", function(postId){

      return Likes.find({post:postId});

});

// --------------------------------- END story publications ----------------------------------


Meteor.publish("myAccount", function (userId) {
  if (this.userId) {

// publishing self accounts and profile details (except password) for the
// logged in user .

//return Meteor.users.find()
// using during devlopment only for testing purpose (give full db access to client) , uncomment otherwise

    return Meteor.users.find(
              {_id: this.userId},
              {fields: {'emails': 1, '_id': 1, 'createdAt': 1}}

                            );

                  } else {
                            this.ready();
                          }
});


// ---------

Meteor.publish("storytellers", function (userId) {
  if (this.userId) {

// publishing just name and id of every profile in our site for explore stream to
// show storytellers tiny details

    return Meteor.users.find(
              {},
              {fields: {'profile.fullName': 1, '_id': 1,}}

                            );

                  } else {
                            this.ready();
                          }
});

// --------------------------------- END accounts/profile publications ----------------------------------

// ---------------- Image meta data publications ------------------


Meteor.publish("images", function(){
                return Images.find();

                });

// ------------------- END Images publications ------------------------





// ----------------------------------------------------------------------------------------
// -------------- END  PUBLICATIONS ------------------------
// ----------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------
// -------------- access rules for GridFS ------------------------
// ----------------------------------------------------------------------------------------

Images.allow({
    download: function(userId, fileObj) {
        return true
    },

    update: function(userId, fileObj) {
       return true;
       },

    insert: function() {
        return true;
        },

    // remove: function(userId, fileObj) {
    //     return true;
    // },

})

Images.deny({
    remove: function(userId, fileObj) {
        return false;
    },


})



// ----------------------------------------------------------------------------------------
// -------------- END access rules for GridFS ------------------------
// ----------------------------------------------------------------------------------------






// ----------------------------------------------------------------------------------------
// -------------- Meteor METHODS ------------------------
// ----------------------------------------------------------------------------------------

Meteor.methods({


  'addToStoryBook' : function (data){

    StoryBook.insert({

       authorID   : data.authorID,
       authorName : data.authorName,
       photoID    : data.photoID,

        content   : data.content,
        date      : new Date(),
        isPublish : data.isPublish,
        privacy   : data.privacy,

    });

        console.log("new story added to StoryBook by : " + data.authorName );

  },

  // ------------- END adding data to StoryBook collection -------------

  'postComment' : function (data){

    StoryOpinion.insert({

        parentID  : data.parentID,
       authorID   : data.authorID,
       authorName : data.authorName,
       photoID    : data.photoID,

        content   : data.content,
        date      : new Date(),


    });

        console.log("new comment added by : " + data.authorName );

  },

  // ------------- END  post comment method -------------




    'clearAllDB' : function (){

// this is to clear all db collections during development.
//here ~ remove({}) ~ this {} is needed to remove all documents

// comment out this method before deployment or use admin only authintication like if user==admin checking

//   Meteor.call('clearAllDB');


      Likes.remove({});
      StoryBook.remove({});
      Meteor.users.remove({});
      StoryBook.remove({});
      StoryOpinion.remove({});
      Images.remove({});
      console.log( " all collections removed from server ");


    },


// ------------ inserting /updating data into Meteor.users that came with accounts-base package -----------

'addUserDetails' : function (info){

            // Some pre- built-in fields :
            //  _id  ~ unique field, can be called by Meteor.userId()
            // emails: [ { address: "cool@example.com", verified: true }, //an array
            //  { address: "another@different.com", verified: false } ],
            // emails ~ unique | each email address can only belong to one user.


Meteor.users.update(info.loginID, {$set:
                          {
                            "profile.fullName": info.fullName,
                           "profile.location": info.location,

                           }


                           });


  console.log( " inServer - profile data updated by " + info.fullName + " & dbID: " + info.loginID);

},

// ------------ DONE inserting data into Meteor.users -----------

// ------------- method for image upload to GridFS filesystem----------------

'saveImage' : function (data){

var data=data;
  console.log("miaw: "+data.file);

         Images.insert(data.file, function (err, fileObj) {
             if (err){
                // handle error
                console.log("error uploading image");
             }

             else {

                var imagesURL = {
                   "profile.image": "/cfs/files/images/" + fileObj._id
                    };

                  Meteor.users.update(data.userId, {$set: imagesURL});

             }
           });




      console.log("Image saved to GridFS local storage : " + data.authorName );

},



});


// ----------------------------------------------------------------------------------------
// -------------- END  Meteor METHODS ------------------------
// ----------------------------------------------------------------------------------------
