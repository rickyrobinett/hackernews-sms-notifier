var Firebase = require("firebase");
var client = require('twilio')('ACCOUNT_SID', 'AUTH_TOKEN');
var url = require("url");

var newStoriesRef = new Firebase("https://hacker-news.firebaseio.com/v0/newstories/0");

newStoriesRef.on("value", function(snapshot) {
  var storyRef = new Firebase("https://hacker-news.firebaseio.com/v0/item/"+snapshot.val());

  storyRef.on('value', function(storySnapshot) {
    if(storySnapshot.val() === null) {
      return
    }

    var story = storySnapshot.val();
    var host = url.parse(story.url).host;
    storyRef.off();

    console.log(story.url);
    console.log(host);
    if(host === "github.com") {
      client.messages.create({
        body: story.by + " just posted " + story.title + "on HN!",
        to: "+15555555555", // your cell number
        from: "+15555551234" // your twilio number
      }, function(err, message) {
        console.log(message);
      });
    }
  });
});
