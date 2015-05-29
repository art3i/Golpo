
Template.explore.rendered = function (){

  Tracker.autorun(function(){

    Meteor.subscribe("worldStory", Meteor.userId());
    Meteor.subscribe("storyOpinionDB", Meteor.userId());

    Meteor.subscribe("storytellers", Meteor.userId());

    Meteor.subscribe("images");


  })


} ;


Template.explore.helpers({

  getWorldStory : function () {

  return StoryBook.find({}, {sort:{date: -1}});
},


getStorytellers: function () {

return Meteor.users.find();
},



  getCurrentStoryComments : function () {
  //  console.log( "getCurrentStoryComments called");
    return StoryOpinion.find({"parentID": this._id});

    //this._id holds current StoryBook._id value within the loop.

    // I called getCurrentStoryComments within the getMyStory Template loop. so here, value of
    // _id will change on each loop and thus match the parentID of StoryOpinion db.


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
        var authorName;
        var authorPhotoID;

        var authorAccount=Meteor.users.find({"_id": authorID});

        authorAccount.forEach(function (acc) {

                        authorName = acc.profile.fullName;
                        authorPhotoID = acc.profile.photoID;
                        //console.log( authorName);

                        });


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


});
