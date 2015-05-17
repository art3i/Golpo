Template.navigation.events({



  'click #signOutBtn' : function(e,tmpl){


      e.preventDefault();

   Meteor.logout();

    console.log("user signed out successfully!");
  }

});
