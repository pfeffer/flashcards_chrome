var chrm = {};
chrm.indexedDB = {};
chrm.indexedDB.db = null;
chrm.storage_name = "words";

Word = function(word, tag){
  this.word = word;
  this.tag = tag;
}


chrm.indexedDB.open = function() {
  var request = indexedDB.open(chrm.storage_name, 1);
  
  request.onsuccess = function(e){
    chrm.indexedDB.db = e.target.result;
  }

  request.onupgradeneeded = function(e){
    var db = e.target.result;
    e.target.transaction.onerror = chrm.indexedDB.onerror;

    var store = db.createObjectStore(chrm.storage_name,
      {keyPath: "id", autoIncrement: true })
    store.createIndex("word", "word", { unique: false });
    store.createIndex("tags", "tag", { unique: false });
  }
  request.onerror = chrm.indexedDB.onerror;
}

chrm.indexedDB.addWord = function(word){
  var db = chrm.indexedDB.db;
  var transaction = db.transaction([chrm.storage_name], "readwrite");
  var store = transaction.objectStore(chrm.storage_name);
  var request = store.put(word);

  request.onsuccess = function(e){
    console.log("saved!");
  }
  request.onerror = function(e){
    console.log(e.value);
  }
}

$(function () {
  var bkg = chrome.extension.getBackgroundPage();
  bkg.getPageSelection(getSelected);

  $("#tryText").html(localStorage["word"]);
  chrm.indexedDB.open();

  $("form").submit(function(){
    // if (supports_html5_storage()){
        word = $("#word").val();
        tag = $("#tag").val();
        chrm.indexedDB.addWord(new Word(word, tag));
    //     $("#tryText").html(word);//localStorage["word"]);
        
    //     storedWords = JSON.parse(localStorage["words"]);
    //     storedWords.push(new Word(word, tag));
    //     localStorage["words"] = JSON.stringify(storedWords);
    //   }else{
    //     alert("Can't save, update your browser!")
    //   }

    return false;
  })
})

function getSelected(o){
  $("#word").val(o.word);
}