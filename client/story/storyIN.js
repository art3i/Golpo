
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
        var authorName;

        var authorAccount=Meteor.users.find({"_id": authorID});

        authorAccount.forEach(function (acc) {

                        authorName = acc.profile.fullName;
                        //console.log( authorName);

                        });


        var data= {   content : content ,
                      isPublish:true,
                      privacy: privacy,
                      authorID : authorID,
                      authorName : authorName,

                      };

        Meteor.call('addToStoryBook', data );

        //now clear the post input field

        $('#storyInput').val("").select().focus();




  },


});
