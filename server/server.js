  
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




Meteor.publish("like", function(){

      return Like.find();

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

      likeCounter : 0, //initial like is zero

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

      likeCounter : 0, //initial like is zero


    });

        console.log("new comment added by : " + data.authorName );

  },

  // ------------- END  post comment method -------------


    'likeStory' : function (data){

    try{
      //useing try...catch here, because "likeDB" will not be there before user even like the story for the 1st time ,
      //thus if block will return undifined and thus exception will be raised!

          if(data.likedByID == Like.findOne( { $and: [ {"parentID": data.parentID}, { "likedByID": data.likedByID } ] } ).likedByID)

              {
                // likedByID matched means this user has already liked this exact post before.
                // so now it means its a 2nd time click on the same like button ;
                // that suggests that user wants to remove this like

                Like.remove( { $and: [ {"parentID": data.parentID}, { "likedByID": data.likedByID} ] } );

                 //adjusting the likeCounter on parent story/parentCommentDB

                StoryBook.update(data.parentID, {$inc:
                                          {
                                            "likeCounter": -1,

                                           }  });

               console.log("like removed successfully"+" from try > if block by "+data.likedByName);

              } //end if

                      else {
                              // this "else block" means this user haven't liked this post yet . and the above query somehow failed to raise exception
                            // quering the "not yet created db" ~ which usually will never happen ; But still Keeping this block as a fail-safe ,
                            // if somehow no-exception is raised Then this else block will be there to handle the logic

                            Like.insert({

                                parentID  : data.parentID,
                               likedByID  : data.likedByID,
                              likedByName : data.likedByName,

                            });
                            StoryBook.update(data.parentID, {$inc:
                                                      {
                                                        "likeCounter": 1,
                                                       }  });
                                                       console.log("like added successfully"+" from try > else block by "+data.likedByName);

                              } //end else

      } //end try

      catch (error) {
                  // this means user haven't like this post yet; so there is no likeDB to query and thus this exception.
                  // so, now lets add a like
                Like.insert({
                    parentID  : data.parentID,
                   likedByID  : data.likedByID,
                  likedByName : data.likedByName,

                            });

                // updating likeCounter of story db
                StoryBook.update(data.parentID, {$inc:
                                          {
                                            "likeCounter": 1,

                                           }  });

                           console.log("like added successfully"+" from catch block by  "+ data.likedByName);
                    } //end catch

    },

  // -------------------- END  likeStory  method -------------

  'likeOpinion' : function (data){

  try{

        if(data.likedByID == Like.findOne( { $and: [ {"parentID": data.parentID}, { "likedByID": data.likedByID } ] } ).likedByID)

            {
              // likedByID matched means this user has already liked this exact post before.

              Like.remove( { $and: [ {"parentID": data.parentID}, { "likedByID": data.likedByID} ] } );

              StoryOpinion.update(data.parentID, {$inc: {"likeCounter": -1} });

            } //end if
                    else {
                              Like.insert({

                                      parentID  : data.parentID,
                                     likedByID  : data.likedByID,
                                    likedByName : data.likedByName,

                                    });
                              StoryOpinion.update(data.parentID, {$inc: { "likeCounter": 1}  });

                            } //end else

    } //end try

    catch (error) {
                // this means user haven't like this post yet; so there is no likeDB to query. so lets add a like
              Like.insert({
                  parentID  : data.parentID,
                 likedByID  : data.likedByID,
                likedByName : data.likedByName,

                          });
              StoryOpinion.update(data.parentID, {$inc:{ "likeCounter": 1, }  });

              } //end catch

  },


    // ------------- END  likeOpinion  method -------------





    'clearAllDB' : function (){

// this is to clear all db collections during development.
//here ~ remove({}) ~ this {} is needed to remove all documents

// comment out this method before deployment or use admin only authintication like if user==admin checking

//   Meteor.call('clearAllDB');



       Meteor.users.remove({});
       StoryBook.remove({});
       StoryOpinion.remove({});
       Images.remove({});

       Like.remove({});

          console.log( " removed ... ");


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
