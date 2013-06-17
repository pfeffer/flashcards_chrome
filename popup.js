
function getSelected(o){
  document.getElementById("word").value = o.word; 
}

document.addEventListener('DOMContentLoaded', function () {
  var bkg = chrome.extension.getBackgroundPage();
  bkg.getPageSelection(getSelected);
  //bkg.callSelected();
}); 


