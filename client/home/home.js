
Template.home.rendered = function (){

  Tracker.autorun(function(){

    Meteor.subscribe("posts", Meteor.userId());
    Meteor.subscribe("likes");

    //Tracekr calls these func everytime when anything changes (Meteor Reactivity module)

  })

} ;

Template.home.helpers({

  getPosts : function () {

  return Posts.find({parent:null}, {sort:{date: -1} });
},
});


Template.home.events( {

  'keyup #postText' : function (e, tmpl){

    e.preventDefault();

      if (e.which === 13){
        //13 is the char code for "enter or return key"

        var postText = tmpl.find('#postText').value;

        var options= {postText : postText , parent:null, owner : Meteor.userId };

        Meteor.call('addPost', options );

        //now clear the post input field

        $('#postText').val("").select().focus();

        // uncomment to clear temp/test data during development
      // Meteor.call('removeAllPost');


      }

  },


});
