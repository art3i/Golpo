
Template.explore.rendered = function (){

  Tracker.autorun(function(){

    Meteor.subscribe("worldStory", Meteor.userId());
    Meteor.subscribe("storyOpinionDB", Meteor.userId());


    Meteor.subscribe("images");

    Meteor.subscribe("like");

  })


} ;


Template.explore.helpers({

  getWorldStory : function () {

  return StoryBook.find({}, {sort:{date: -1}});
},


  getCurrentStoryComments : function () {
  //  console.log( "getCurrentStoryComments called");
    return StoryOpinion.find({"parentID": this._id});

    //this._id holds current StoryBook._id value within the loop.

    // I called getCurrentStoryComments within the getMyStory Template loop. so here, value of
    // _id will change on each loop and thus match the parentID of StoryOpinion db.


},


likeButtonState: function () {

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


},




});



// ------------------------ explore event handlers -------------------------


Template.explore.events( {

  'submit .commentINform' : function (event, tmpl){

    event.preventDefault();


        var parentID = event.target.opinionParentID.value;

        // here, not using css based selector such as : tmpl.find('.opinionParentID').value;
        // because the Template has multiple form with same css class selector and this way
        // meteor only can get the value of first css class element. others are ignored regardless of
        // where the event has occured. so i will not get  any value from 2nd form onward in this Template.


        var content = event.target.opinion.value;

      //  console.log(parentID +" " + content );

        var authorID = Meteor.userId();

        var authorName= Meteor.users.findOne({"_id": authorID}).profile.fullName;

        var authorPhotoID = Meteor.users.findOne({"_id": authorID}).profile.photoID;;


        var data= {   parentID : parentID ,
                      content  : content,
                      authorID : authorID,
                      authorName : authorName,
                      photoID   : authorPhotoID,

                      };

        Meteor.call('postComment', data );


        //now clear the post input field

        $('.comment').val("").select().focus();




  },

  // ------------ END postComment event --------------------------

  'submit .favButtonForm' : function (event, tmpl){

    event.preventDefault();

    var parentID = event.target.currentStoryID.value;
    var likedByID = Meteor.userId();
    var likedByName =Meteor.users.findOne({"_id": Meteor.userId()}).profile.fullName;


    var data= {   parentID  : parentID,
                 likedByID  : likedByID,
                likedByName : likedByName,

                  };


     Meteor.call('likeStory', data );

     //console.log("fav btn clicked by "+ likedByName);

  },




});
