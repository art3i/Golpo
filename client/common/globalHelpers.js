// this file is to place repeated codes in one to share among templates helpers
// .. and also to call / initialize all jquery lib I added

Template.registerHelper('formatDate', function(date) {

  // return moment().format('dddd MMMM Do YYYY, h:mm:ss a');  // Tuesday May 19th 2015, 10:47:14 pm

  //  return moment().format('MMMM Do YYYY, h:mm:ss a'); //  May 19th 2015, 10:47:14 pm

//  return moment(date).format('DD-MM-YYYY'); // 19-05-2015

  return moment(date).format('MMMM Do YYYY, h:mm a'); // 19-05-2015



});

// ------------------------------------------------------------------------------------------------------
// -----------------------------------  END formatDate ------------------------------------------------
// ------------------------------------------------------------------------------------------------------


Template.registerHelper('getAuthorPhoto', function() {



    return Images.find({"_id": this.photoID});

      //getAuthorPhoto will run within the getMyStory / getWorldStory or getCurrentStoryComments loop. so the parent loop
      // will already contain the photoID;


  // here, Images is an FS.Collection instance


});

// ------------------------------------------------------------------------------------------------------
// -----------------------------------  END getAuthorPhoto ------------------------------------------------
// ------------------------------------------------------------------------------------------------------


Template.registerHelper('likeButtonState' , function () {

    //return like=true to active likeButton; unlike=true to active undoLike button

    // Like.find( { $and: [ {"parentID": "2j2dbCmW6S4Bq8uPi"}, { "likedByID": "TCfRjbKpinveR6xy7"} ] } ).fetch();
    // Like.findOne( { $and: [ {"parentID": "eM9jHFPimXMqEB6Cm"}, { "likedByID": "TCfRjbKpinveR6xy7"} ] } ).likedByID;

    var state = {
                  //init state
                  like : true,
                  unlike : false,
                  }

    try
    {
         if(Meteor.userId() == Like.findOne( { $and: [ {"parentID": this._id}, { "likedByID": Meteor.userId() } ] } ).likedByID)

                  // this helper will run within the getStory loop; so "this._id" means parent story id.
                {
                          // this if=true means user already liked this post. Let's show unlike state of toggle button
                          //  console.log("I liked this story already of ID : "+this._id);
                    state.unlike = true;
                    state.like= false;
                    return state;
                }

                else

                       {      //  console.log("I haven't liked this story yet BUT sm1 did - storyID : "+this._id);
                              state.unlike = false;
                              state.like= true;
                              return state;
                        }

    } //end try

    catch (error)

        {
          // exception occured - because this like DB haven't created yet & query in if block failed.
          //this happened because  No One or this user hasn't liked this story yet.
                //  Lets set btn state to like button
                        //console.log("Like button exception!! NO1 liked it yet storyID:  "+this._id+error);
          state.unlike = false;
          state.like= true;
          return state;


        } //end catch



  });

  // ------------------------------------------------------------------------------------------------------
  // -----------------------------------  END likeButtonState For Story ------------------------------------------------
  // ------------------------------------------------------------------------------------------------------
 
