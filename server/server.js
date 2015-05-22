// ----------------------------------------------------------------------------------------
// -------------- PUBLICATIONS ------------------------
// ----------------------------------------------------------------------------------------
 

Meteor.publish("myStory" , function(userId){

// this will publish all types of self story regarding of public/ private filter to the timeline
// of the user.

// return StoryBook.find();  // uncomment for testing only;

       return StoryBook.find({"ownerID" : userId});


  });

// ------------------

Meteor.publish("worldStory" , function(userId){

  // this will publish all the published public stories of all storytellers in the explore section

  return StoryBook.find();  // haven't filter just public stories yet ;


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



// ----------------------------------------------------------------------------------------
// -------------- END  PUBLICATIONS ------------------------
// ----------------------------------------------------------------------------------------


// ----------------------------------------------------------------------------------------
// -------------- Meteor METHODS ------------------------
// ----------------------------------------------------------------------------------------

Meteor.methods({


  'addToStoryBook' : function (data){

    StoryBook.insert({

       authorID   : data.authorID,
       authorName : data.authorName,

        content   : data.content,
        date      : new Date(),
        isPublish : data.isPublish,
        privacy   : data.privacy,

    });

        console.log("new story added to StoryBook by : " + data.authorName );

  },

  // ------------- END adding data to diary collection -------------


    'addPost' : function (options){

      Posts.insert({

          text : options.postText,
          owner : options.owner ,
          date : new Date(),
          parent : options.parent,

      });

    },

    'removePost': function(id){

      Posts.remove({ _id:id });
    },

    'removeAllPost' : function (){

      Posts.remove({});

    },

    'clearAllDB' : function (){

// this is to clear all db collections during development.
//here ~ remove({}) ~ this {} is needed to remove all documents

// comment out this method before deployment

//   Meteor.call('clearAllDB');

      Posts.remove({});
      Likes.remove({});
      StoryBook.remove({});
      Meteor.users.remove({});
      console.log( " Meteor.users.removeD ");


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







});


// ----------------------------------------------------------------------------------------
// -------------- END  Meteor METHODS ------------------------
// ----------------------------------------------------------------------------------------
