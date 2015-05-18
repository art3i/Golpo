Meteor.publish("posts" , function(userid){

      return Posts.find({});


 });

Meteor.publish("likes", function(postId){

      return Likes.find({post:postId});

});


// ----------- Publication for testing during devlopment ---------

Meteor.publish("userData", function (userId) {
  if (this.userId) {

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


// -------------- END test publications ------------------------


Meteor.methods({

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

      Posts.remove({});
      Likes.remove({});
      Meteor.users.remove({});
      console.log( " Meteor.users.removeD ");


    },


// ------------ inserting data into Meteor.users that came with accounts-base package -----------

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
