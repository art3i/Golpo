Template.post.helpers({

  likeCount : function() {

    return Likes.find(this._id).count();
  },

  getPostComments : function() {

    return Posts.find({parent:this._id});
  },


});


Template.post.events( {

  'keyup #commentText' : function (e, tmpl){

    e.preventDefault();

      if (e.which === 13){
        //13 is the char code for "enter or return key"

        var postText = tmpl.find('#commentText').value;

        var options= {postText : postText , parent:this._id, owner : Meteor.userId};

        Meteor.call('addPost', options );

        //now clear the post input field

        $('#commentText').val("").select().focus();


      }

  },


});
