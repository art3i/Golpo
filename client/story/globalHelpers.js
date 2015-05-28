// this file is to place repeated codes in one to share among templates helpers
// .. and also to call / initialize all jquery lib I added

Template.registerHelper('formatDate', function(date) {

  // return moment().format('dddd MMMM Do YYYY, h:mm:ss a');  // Tuesday May 19th 2015, 10:47:14 pm

  //  return moment().format('MMMM Do YYYY, h:mm:ss a'); //  May 19th 2015, 10:47:14 pm

//  return moment(date).format('DD-MM-YYYY'); // 19-05-2015

  return moment(date).format('MMMM Do YYYY, h:mm a'); // 19-05-2015



});

Template.registerHelper('allProfilePhoto', function() {

  var profilePhotoID;

  var userAccount=Meteor.users.find({"_id": Meteor.userId()});

  userAccount.forEach(function (userDB) {

                profilePhotoID = userDB.profile.photoID;
                   console.log( profilePhotoID);

                  });


  return Images.find({"_id": profilePhotoID});

  // Images is an FS.Collection instance


});
