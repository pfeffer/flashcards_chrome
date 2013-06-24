Word = function(word, tag){
  this.word = word;
  this.tag = tag;
}

$(function () {
  var bkg = chrome.extension.getBackgroundPage();
  bkg.getPageSelection(getSelected);

  if (!localStorage["words"]) {localStorage["words"] = JSON.stringify([]);}

  $("#tryText").html(localStorage["word"]);

  $("form").submit(function(){
    if (supports_html5_storage()){
        word = $("#word").val();
        tag = $("#tag").val();
        $("#tryText").html(word);//localStorage["word"]);
        
        storedWords = JSON.parse(localStorage["words"]);
        storedWords.push(new Word(word, tag));
        localStorage["words"] = JSON.stringify(storedWords);
      }else{
        alert("Can't save, update your browser!")
      }

    return false;
  })
})

function getSelected(o){
  $("#word").val(o.word);
}

function supports_html5_storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}
