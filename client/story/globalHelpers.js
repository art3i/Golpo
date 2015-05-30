// this file is to place repeated codes in one to share among templates helpers
// .. and also to call / initialize all jquery lib I added

Template.registerHelper('formatDate', function(date) {

  // return moment().format('dddd MMMM Do YYYY, h:mm:ss a');  // Tuesday May 19th 2015, 10:47:14 pm

  //  return moment().format('MMMM Do YYYY, h:mm:ss a'); //  May 19th 2015, 10:47:14 pm

//  return moment(date).format('DD-MM-YYYY'); // 19-05-2015

  return moment(date).format('MMMM Do YYYY, h:mm a'); // 19-05-2015



});

Template.registerHelper('getAuthorPhoto', function() {



    return Images.find({"_id": this.photoID});

      //getAuthorPhoto will run within the getMyStory / getWorldStory or getCurrentStoryComments loop. so the parent loop
      // will already contain the photoID;


  // here, Images is an FS.Collection instance


});
