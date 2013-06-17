function getSelected(){
  return window.getSelection().toString();
}

function saveSelectedToLocalStorage(){
  if (localStorage){

  }
}

var pageInfo = {
    "word": getSelected()
};

// Send the information back to the extension
chrome.runtime.sendMessage(pageInfo);
console.log(getSelected());