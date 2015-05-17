Meteor.publish("posts" , function(userid){

      return Posts.find({});


 });

Meteor.publish("likes", function(postId){

      return Likes.find({post:postId});

});


// ----------- Publication for testing during devlopment ---------

Meteor.publish("userData", function (userId) {
  if (this.userId) {

    return Meteor.users.find() //during devlopment for testing purpose to show all fields

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
            // emails: [ { address: "cool@example.com", verified: true },
            //  { address: "another@different.com", verified: false } ],
            // emails ~ unique | each email address can only belong to one user.

            //>db.mycol.update({'title':'MongoDB Overview'},{$set:{'title':'New MongoDB Tutorial'}},{multi:true})
            //>db.COLLECTION_NAME.save({_id:ObjectId(),NEW_DATA}) //if id match -update ; else fresh insert

            var userDB = Meteor.users.find({_id: info.loginID});

  //Players.update(this._id, { name: this.name, score: this.score + 5 }, { upsert: true });
//Meteor.users.update(Meteor.userId(), {$set: {name: "miaw"}});
//Meteor.users.update(Meteor.userId(), {$set: {'profile.isAdmin': true}});

  userDB.update(

  info.loginID,


    { $set: {

    //username: info.username,
    //_id: info.loginID,
    // profile :   {
    //               name: info.fullName,
    //               dob: info.dob,
    //               location: info.location,
    //
    //             } ,
    'ranking' : info.ranking,

      }

  }



  );

  console.log( " inServer - profile data updated ");

},

// ------------ DONE inserting data into Meteor.users -----------


});
