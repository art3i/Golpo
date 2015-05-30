
Template.storyIN.rendered = function (){

  Tracker.autorun(function(){

    Meteor.subscribe("myStory", Meteor.userId());

  })


} ;

// Template.diaryIN.helpers({
//
// });


Template.storyIN.events( {

  'submit #storyINform' : function (e, tmpl){

    e.preventDefault();


        var content = tmpl.find('#storyInput').value;
        var privacy = "public";
        var authorID = Meteor.userId();
        var authorName= Meteor.users.findOne({"_id": authorID}).profile.fullName;

        var authorPhotoID = Meteor.users.findOne({"_id": authorID}).profile.photoID;;




        var data= {   content : content ,
                      isPublish:true,
                      privacy: privacy,
                      authorID : authorID,
                      authorName : authorName,
                      photoID   : authorPhotoID,

                      };

        Meteor.call('addToStoryBook', data );

        //now clear the post input field

        $('#storyInput').val("").select().focus();




  },


});
