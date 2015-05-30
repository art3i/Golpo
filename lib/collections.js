StoryBook = new Meteor.Collection('story');
StoryOpinion = new Meteor.Collection('opinion');

Like = new Meteor.Collection('like');

// GridFS file system saves image file by chunk to a special persistent MongoDB Collection
// the path url actually point to the DB, not really to a file inside a folder

var imageStore = new FS.Store.GridFS("images");

Images = new FS.Collection("images", {

          stores: [imageStore]
});
