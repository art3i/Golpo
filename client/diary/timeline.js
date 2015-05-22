
Template.timeline.rendered = function (){

  Tracker.autorun(function(){

    Meteor.subscribe("myStory", Meteor.userId());

  })


} ;

Template.timeline.helpers({

  getMyStory : function () {

  return StoryBook.find({"authorID": Meteor.userId()}, {sort:{date: -1}});
},


getMyProfile : function () {

return Meteor.users.find({"_id": Meteor.userId()});
},


});
