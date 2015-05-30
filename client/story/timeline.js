
Template.timeline.rendered = function (){

  Tracker.autorun(function(){

    Meteor.subscribe("myStory", Meteor.userId());

    Meteor.subscribe("storyOpinionDB", Meteor.userId());
    Meteor.subscribe("images");

  })


} ;

Template.timeline.helpers({

  getMyStory : function () {

  return myStory=StoryBook.find({"authorID": Meteor.userId()}, {sort:{date: -1}});



},

// ---------------- END getMyStory --------------


  getCurrentStoryComments : function () {
  //  console.log( "getCurrentStoryComments called");
    return StoryOpinion.find({"parentID": this._id});

    //this._id holds current StoryBook._id value within the loop from the outermost loop.

    // I called getCurrentStoryComments within the getMyStory Template loop. so here, value of
    // _id will change on each loop and thus match the parentID of StoryOpinion db.


},



//
// getAuthorPhoto : function () {
//
//   return Images.find({"_id": this.photoID});
//
//     //getAuthorPhoto will run within the getMyStory or getCurrentStoryComments loop. so the parent loop
//     // will already contain the photoID;
//
// },


});


// ------------------------ timeline event handlers -------------------------


Template.timeline.events( {

  'submit .commentINform' : function (event, tmpl){

    event.preventDefault();


        var parentID = event.target.opinionParentID.value;

        // here, not using css based selector such as : tmpl.find('.opinionParentID').value;
        // because the Template has multiple form with same css class selector and this way
        // meteor only can get the value of first css class element. others are ignored regardless of
        // where the event has occured. so i will not get  any value from 2nd form onward in this Template.


        var content = event.target.opinion.value;

        console.log(parentID +" " + content );

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

      //  console.log( "postComment called");

        //now clear the post input field

        $('.comment').val("").select().focus();




  },

  // ---------------- END comment post form event --------------------------------


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

  // ------------ END add Like to story event --------------------------


  'submit .opinionLikeButtonForm' : function (event, tmpl){

    event.preventDefault();

    var parentID = event.target.currentStoryID.value;
    var likedByID = Meteor.userId();
    var likedByName =Meteor.users.findOne({"_id": Meteor.userId()}).profile.fullName;


    var data= {   parentID  : parentID,
                 likedByID  : likedByID,
                likedByName : likedByName,

                  };


     Meteor.call('likeOpinion', data );

     //console.log("fav btn clicked by "+ likedByName);

  },

  // ------------ END add Like to Opinion event --------------------------



});
