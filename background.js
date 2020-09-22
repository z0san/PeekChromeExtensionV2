
//stores whcih tab is currently downloading screenshot
var currentDownloadTab;

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log('starting download for ' + request.url);
    startDownload(request.url);
    sendResponse({success: "downloading"});
  }
);

//function to start the screenshot donwload
function startDownload(url) {
  //if there is a tab that is currently downloading something cancel it
  if(currentDownloadTab){
    console.log('removing currently tab: ' + currentDownloadTab.pendingUrl);
    chrome.tabs.remove(currentDownloadTab.id);
    currentDownloadTab = undefined;
  }

  chrome.tabs.create({url: url, active: false}, tab => {
    //store the current tab
    currentDownloadTab = tab;
    //console.log(tab);
    //start with 1 second time out so the page has time to load
    setTimeout(function(){

      console.log('requesting page to take ss');
      //request a screenshot from the content.js script on new tab
      chrome.tabs.sendMessage(tab.id, {task: "take_ss"}, function(response) {

        console.log(response);

        //remove tab
        chrome.tabs.remove(tab.id);
      })
    }, 2000);
  })
}
