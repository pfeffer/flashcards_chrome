// chrome.browserAction.onClicked.addListener(function(tab) {
//   console.log("clicking?")
//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     chrome.tabs.executeScript(tabs[0].id, {file: "/request.js"});
//   });
// });

var callbacks = []; 

function callSelected(){
  console.log("clicking?")
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(tabs[0].id, {file: "/content.js"});
  });
}


function getPageSelection(callback){
  // Add the callback to the queue
  callbacks.push(callback); 
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(tabs[0].id, {file: "/content.js"});
  });
}

 // Perform the callback when a request is received from the content script
chrome.extension.onMessage.addListener(
  function(request){ 
    // Get the first callback in the callbacks array
    // and remove it from the array
    var callback = callbacks.shift();

    // Call the callback function
    callback(request); 
}); 