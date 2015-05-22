
Template.explore.rendered = function (){

  Tracker.autorun(function(){

    Meteor.subscribe("worldStory", Meteor.userId());

    Meteor.subscribe("storytellers", Meteor.userId());

  })


} ;


Template.explore.helpers({

  getWorldStory : function () {

  return StoryBook.find({}, {sort:{date: -1}});
},


getStorytellers: function () {

return Meteor.users.find();
},



});
