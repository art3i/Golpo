
Template.timeline.rendered = function (){

  Tracker.autorun(function(){

    Meteor.subscribe("myStory", Meteor.userId());

    Meteor.subscribe("storyOpinionDB", Meteor.userId());

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

    //this._id holds current StoryBook._id value within the loop.

    // I called getCurrentStoryComments within the getMyStory Template loop. so here, value of
    // _id will change on each loop and thus match the parentID of StoryOpinion db.


},




getMyProfile : function () {

return Meteor.users.find({"_id": Meteor.userId()});
},


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
        var authorName;

        var authorAccount=Meteor.users.find({"_id": authorID});

        authorAccount.forEach(function (acc) {

                        authorName = acc.profile.fullName;
                        //console.log( authorName);

                        });


        var data= {   parentID : parentID ,
                      content  : content,
                      authorID : authorID,
                      authorName : authorName,

                      };

        Meteor.call('postComment', data );

      //  console.log( "postComment called");

        //now clear the post input field

        $('.comment').val("").select().focus();




  },


});
