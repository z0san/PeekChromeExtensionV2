console.log('peek is running');

//stores the current url that the mouse is over or was last over
var currentUrl;
//stores current key down
var currentKeyCode;
//stores weather or not key is currently down
var keyDown = false;
//stores the key code that is the trigger for the extension whis hard codded
//to 17 (ctrl) for testing but in future should be able to be changed in settings
//by the user
var triggerKeyCode = 17

// runs on mouse over and gets the url that is being hovered over and if it's new
// updates the current url and startes the screen shot for the new url
window.onmouseover=function(e) {
  //item that will be recured into paretent items until we get an 'a' or 'html' tag
  var currentItem = e.target;
  //escilate untill we reach end of document (we are not over a link) or get a link
  while(currentItem != undefined &&
    !(currentItem.tagName == 'a' || currentItem.tagName == 'A') &&
    !(currentItem.tagName == "html" || currentItem.tagName == "HTML")) {
    currentItem = currentItem.parentNode;
  }
  //if we reached a link
  if(currentItem.tagName == 'a' || currentItem.tagName == 'A' &&
    currentItem.href != currentUrl){
    currentUrl = currentItem.href;
    //call the update function incase action needs to be taken
    urlUpdate();
  }

};

//function to get url if needed and is called whenever it is possible that a new url should be downloaded
function urlUpdate() {
  if(currentUrl && currentKeyCode == triggerKeyCode && keyDown){
    console.log(currentUrl);
  }
}


document.onkeydown = function(evt) {
  evt = evt || window.event;
  var key = evt.keyCode || evt.which;
  //only want to continue if there is something to update
  if(!keyDown || currentKeyCode != key){
    currentKeyCode = key;
    keyDown = true;
    //call the update function incase action needs to be taken
    urlUpdate();
  }
};

//when key up set keyDown to false so the extension will no longer run
document.onkeyup = function(evt) {
  keyDown = false;
};
