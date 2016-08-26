var input = document.getElementById('input');
var bg = document.getElementById('blurClick');
var analyse = document.getElementById('analyse');
var results = document.getElementById('results');
var graph = document.getElementById('graph');
var q1 = document.getElementById('q1');
var q2 = document.getElementById('q2');
var q3 = document.getElementById('q3');
var q4 = document.getElementById('q4');
var totalWords = document.getElementById('totalWords');
var punctuation = document.getElementById('firstToggle');
var puncBg = document.getElementById('firstTogglebg');
var puncToggle = document.getElementById('firstToggleSwitcher');
var removePunctuation = document.getElementById('removePunctuation');
var wiki = document.getElementById('secondToggle');
var wikibg = document.getElementById('secondTogglebg');
var wikiToggle = document.getElementById('secondToggleSwitcher');
var removeWiki = document.getElementById('removeWiki');
var wordNameConstraint = document.getElementById('wordNameConstraint');
var leftpx = 0;
var totalWordsText = document.getElementById('totalWords');
var uniqueWordsText = document.getElementById('totalUniqueWords');
var moreWordsContainer = document.getElementById('moreWordsContainer');
var topTenList = document.getElementById('topTenList');
var commonWords = ["the", "be", "to", "of", "and", "a", "in", "that", "have", "i", "it", "for", "not", "on", "with", "he", "as", "you", "do",
 "at", "this", "but", "his", "by", "from", "they", "we", "say", "her", "she", "or", "an", "will", "my", "one", "all", "would", "there", "their",
  "what", "so", "up", "out", "if", "about", "who", "get", "which", "go", "me", "when", "make", "can", "like", "time", "no", "just", "him", "know",
   "take", "person", "into", "year", "your", "good", "some", "could", "them", "see", "other", "than", "then", "now", "look", "only", "come", "its",
    "over", "think", "also", "back", "use", "two", "how", "our", "work", "first", "well", "way", "even", "new", "want", "because", "any", "these",
     "any", "these", "give", "day", "most", "us", "is", "was", "were", "has", "are"];
var strangeList = document.getElementById('topTenUncommon');
var scrollDown = document.getElementById('scrollDown');
var docHeight = window.innerHeight;
var instructions = document.getElementById('instructions');
var scrollValue = 1;
var loading = document.getElementById('loading');
var loaded = false;
var infoButton = document.getElementById('showInfo');
var yScroll = document.body.scrollTop;
var reset = document.getElementById('reset');
var info = document.getElementById('info');
var resultsHeight = results.offsetHeight;
var infoScrollPrompt = document.getElementById('infoScrollPrompt');
var warningBox = document.getElementById('warning');
var warningText = document.getElementById('warningText');
var calculating = 0;

function showScrollDown() {
  scrollDown.className = "scrollDown scrollDownShowing";
}

function hideScrollDown() {
  scrollDown.className = "scrollDown";
}

window.onscroll = function(){
  yScroll = document.body.scrollTop;
  if (yScroll <= 10){
    showScrollDown();
  }
  if (yScroll > 10){
    hideScrollDown();
  }
}
var infoCounter = 0;
info.style.display = "none";
function infoClick(){
  if (infoCounter == 0){
    info.style.display = "block";
    resultsHeight = results.offsetHeight;
    info.style.marginTop = resultsHeight+"px";
    info.className = "info infoShowing";
    infoButton.innerHTML = "hide info";
    infoScrollPrompt.className = "infoPromptHidden infoPromptShowing";
    setTimeout(function(){
      infoScrollPrompt.className = "infoPromptHidden";
    },2000);
    infoCounter = 1;
  } else if (infoCounter == 1){
    info.className = "info";
    var infoHeight = info.clientHeight;
    info.style.marginTop = ((resultsHeight - infoHeight) - 200) + "px";
    infoButton.innerHTML = "info";
    setTimeout(function(){
      info.style.display = "none";
    },400);
    infoCounter = 0;
  }
}

infoButton.onclick = function(){
  infoClick();
}

function resetInfoPosition() {
  instructions.style.display = "none";
}

function showInfoPosition() {
  instructions.style.display = "block";
}

function makeScroll(scrollPos) {
  var scrollIncrement = 0;
  var increaseIncrement = setInterval(function(){
    if (scrollValue < (scrollPos/2)){
      scrollIncrement++;
    }
    if (scrollValue > (scrollPos/2)){
      scrollIncrement--;
      if(scrollIncrement == 1){
        clearInterval(increaseIncrement);
      }
    }
  },10);

  var adaptScroll = setInterval(function(){
    window.scrollTo(0, scrollValue);
    if (scrollValue == scrollPos){
      clearInterval(adaptScroll);
      scrollValue = 1;
      scrollIncrement = 1;
    }
    if (scrollValue < (scrollPos/2)){
      scrollValue+=scrollIncrement;
    }
    if (scrollValue > (scrollPos/2)){
      scrollValue+=scrollIncrement;
    }
  }, 1);
  setTimeout(function(){
    clearInterval(adaptScroll);
  },1000);
}



scrollDown.onclick = function(){
  scrollDown.className = "scrollDown";
  makeScroll(docHeight);
}


var puncCounter = 1;
function puncSwitcher(){
  if (puncCounter == 0){
    puncBg.setAttribute("class", "firstTogglebg bgon");
    puncToggle.setAttribute("class", "firstToggleSwitcher switcheron");
    removePunctuation.setAttribute("class", "question removePunctuation");
    puncCounter = 1;
  } else {
    puncBg.setAttribute("class", "firstTogglebg");
    puncToggle.setAttribute("class", "firstToggleSwitcher");
    removePunctuation.setAttribute("class", "question removePunctuation questionDisabled");
    puncCounter = 0;
  }
}

punctuation.onclick = function(){
  puncSwitcher();
}


var wikiCounter = 1;

function wikiSwitch(){
  if(wikiCounter == 0){
    wikibg.setAttribute("class", "secondTogglebg bgon");
    wikiToggle.setAttribute("class", "secondToggleSwitcher switcheron");
    removeWiki.setAttribute("class", "question wiki");
    wikiCounter = 1;
  } else {
    wikibg.setAttribute("class", "secondTogglebg");
    wikiToggle.setAttribute("class", "secondToggleSwitcher");
    removeWiki.setAttribute("class", "question wiki questionDisabled");
    wikiCounter = 0;
  }
}

var browser = navigator.sayswho= (function(){
    var ua= navigator.userAgent, tem,
    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
    }
    if(M[1]=== 'Chrome'){
        tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
        if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
    return M.join(' ');
})();
var ChromeRegEx = /^C/i;
var SafariRegEx = /^S/i;

if ((ChromeRegEx.test(browser)||SafariRegEx.test(browser)) !== true){
  warningBox.style.display = "block";
  warningBox.className = "warningBox warningShowing";
  setTimeout(function(){
    warningBox.className = "warningBox";
  },6000);
  setTimeout(function(){
    warningBox.style.display = "none";
  },7000);
  warningText.innerHTML = "Warning! Your browser ("+browser+") is incompatable with parts of this website. If you are recieving a slow or unresponsive experience, consider using one of our supported browsers, such as Chrome or Safari";
}

window.onload = function(){
  wikiSwitch();
  setTimeout(function(){
    scrollDown.className = "scrollDown scrollDownShowing";
  },500)
  window.scrollTo(0, 0);

}


wiki.onclick = function(){
  wikiSwitch();
}


input.onfocus = function(){
  input.className = "input focused";
  input.onkeyup = function(){
    if (input.value.length > 0){
      analyse.className = "analyse analyseable";
    }
    if (input.value.length == 0){
      analyse.className = "analyse";
    }
  }
}

input.onblur = function() {
  input.className = "input";
}

function wordEntry(word, occurance) {
  this.word = word;
  this.occurance = occurance;
}


var text = "";
var crudeWords = [];
var words={};
var totalWords = 0;
var percentages = [];
var wordObjects = [];

function checkUniq(a){
  var seen = {};
  var out = [];
  var len = a.length;
  for (var i = 0; i<len; i++){
    var item = a[i];
    if (seen[item] !== 1){
      seen[item] = 1;
      out[j++] = item;
    }
  }
  return out;
}

function analysis(toRemove){
  resetInfoPosition();
  text = input.value;
  text = text.substring(0, text.length - toRemove);
  text = text.replace(/\n/g, " ");
  text = text.replace(/\s\s/g, " ");
  text = text.replace(/[.,\/#+*?!$%\^&\*;:{}=\-"_`'~()]/g,"");
  text = text.replace(/['"]+/g, "");
  if (wikiCounter == 0){
    text = text.replace(/\[\]/g,"");
  }
  text = text.replace(/\s{2,}/g," ");
  text = text.toLowerCase();
  var lastChar = text.charAt(text.length - 1);
  if (lastChar == " "){
    text = text.substring(0, text.length - 1);
  }

  var crudeWords = text.split(" ");
  totalWords = crudeWords.length;
  totalWordsText.innerHTML = "Total Words: "+totalWords;
  if (totalWords < 100){
    moreWordsContainer.style.display = "block";
    setTimeout(function(){
      moreWordsContainer.className = "moreWordsContainer moreWordsShowing";
    },700);
    setTimeout(function(){
      moreWordsContainer.className = "moreWordsContainer";
      setTimeout(function(){
        moreWordsContainer.style.display = "none";
      },1000);
    },4000);
  }

  for (i=0;i<crudeWords.length;i+=1){
    if (!(crudeWords[i] in words)){
    words[crudeWords[i]] = new wordEntry(crudeWords[i], 0);
  }

    var word = crudeWords[i];

    for (j = 0; j<crudeWords.length; j++){
      if(word == crudeWords[j]) {
        words[crudeWords[i]].occurance++;
      }
    }
  }
  for (i=0; i<crudeWords.length; i++){
    if (words[crudeWords[i]].occurance != 1){
      var sqrt = Math.sqrt(words[crudeWords[i]].occurance);
      if (sqrt % 1 == 0){
      words[crudeWords[i]].occurance = sqrt;
    }
  }

    words[crudeWords[i]].percentage = ((words[crudeWords[i]].occurance/totalWords)*100).toFixed(3);


  }

  var numUniqWords = Object.keys(words).length;
  var uniqueWords = checkUniq(crudeWords);
  uniqueWordsText.innerHTML = "Unique Words: "+numUniqWords;
  var x;
  for (x in uniqueWords){
    percentages.push(words[uniqueWords[x]].percentage);
    wordObjects.push(words[uniqueWords[x]]);
  }

  var scaledPercentage = [];
  var percMultiplier = 0;
  var leftMargin = 0;
  var q;
  for (q = 0; q < wordObjects.length; q++){
    wordObjects.sort(function(a,b){
      return parseFloat(a.occurance) - parseFloat(b.occurance);
    });
    wordObjects.reverse();

    percMultiplier = 100 / (wordObjects[0].percentage);
    scaledPercentage.push(wordObjects[q].percentage * percMultiplier);
  }
  for (tempCounter = 0; tempCounter < wordObjects.length; tempCounter++){


    var element = document.createElement('div');
    element.className = "graphBar "+ wordObjects[tempCounter].word;
    element.style.left = leftMargin+"px";
    element.style.height = scaledPercentage[tempCounter]+"%";
    graph.appendChild(element);
    leftMargin += 40;

    var wordName = document.createElement('div');
    wordName.className = "wordName";
    var tempPercContent = wordObjects[tempCounter].percentage + "%";
    var tempPerc = document.createTextNode(tempPercContent);
    var spacer = document.createTextNode(" | ");
    var tempTextContent = wordObjects[tempCounter].word
    var tempText = document.createTextNode(tempTextContent);
    wordName.appendChild(tempText);
    wordName.appendChild(spacer);
    wordName.appendChild(tempPerc);
    wordName.style.left = leftpx + "px";
    wordNameConstraint.appendChild(wordName);
    leftpx += 40;
  }
  percentages.reverse();
  var topPercentage = wordObjects[0].percentage;
  q4.innerHTML = Math.round(topPercentage) + "%";
  q3.innerHTML = Math.round((topPercentage/4)*3)+"%";
  q2.innerHTML = Math.round((topPercentage/4)*2)+"%";
  q1.innerHTML = Math.round(topPercentage/4)+"%";


  var strangeFound = true;
  var strangeCounter = 0;
  var strangeWordIndex = [];
  for (v = 0; v < wordObjects.length; v++){

    strangeFound = true;
    for (cmn = 0; cmn < commonWords.length; cmn++){
      if (wordObjects[v].word == commonWords[cmn]){
        strangeFound = false;
      }
    }
    if (strangeFound == true){
      strangeWordIndex.push(v);
      strangeCounter++;
    }
    if (strangeCounter == 10 || strangeCounter == wordObjects.length){
      break;
    }
  }

  for (str = 0; str < strangeWordIndex.length; str++){
    var strangeWord = document.createElement('div');
    if (str%2 == 0){
      strangeWord.className = "topWordElementEven";
    }
    if (str%2 != 0){
      strangeWord.className = "topWordElementOdd";
    }
    var tempIndex = strangeWordIndex[str];
    var tempStrangeWord = wordObjects[tempIndex].word;
    var tempStrangeOccurance = wordObjects[tempIndex].occurance;
    var strangeWordEntry = document.createTextNode(tempStrangeWord + " - ");
    var strangeOccuranceEntry = document.createTextNode(" occurance: "+tempStrangeOccurance);
    strangeWord.appendChild(strangeWordEntry);
    strangeWord.appendChild(strangeOccuranceEntry);
    strangeList.appendChild(strangeWord);
  }
  var topWordsCounter = 0;

  for (topWordsCounter; topWordsCounter<10; topWordsCounter++){
    var topWord = document.createElement('div');
    if (topWordsCounter%2 == 0){
      topWord.className = "topWordElementEven";
    }
    if (topWordsCounter%2 != 0){
      topWord.className = "topWordElementOdd";
    }
    var topWordEntry = document.createTextNode(wordObjects[topWordsCounter].word+" - ");
    var topOccuranceEntry = document.createTextNode("  occurance: "+wordObjects[topWordsCounter].occurance);
    topWord.appendChild(topWordEntry);
    topWord.appendChild(topOccuranceEntry);
    topTenList.appendChild(topWord);
    if (topWordsCounter == 9 || topWordsCounter == wordObjects.length-1){
      break;
    }
  }
  calculating = 1;
  if (calculating == 1){
    loading.style.opacity = "0";
    setTimeout(function(){
      loading.style.display = "none";
    },300);
  }
}


function showResults(){
  results.style.display = "block";
  setTimeout(function(){
    results.className = "results resultsShowing";
  },1);
}

function hideResults(){
  results.className = "results";
  setTimeout(function(){
    results.style.display = "none";
  },400);
}

var enterContainer = document.getElementById('enterContainer');
function showEnter(){
  enterContainer.className = "enterContainer enterShowing";
}

function hideEnter() {
  enterContainer.className = "enterContainer";
}

var hadClicked = 0;
var enterCount = 0;
var keyCodevar;
var disabled = 0;
var enterDisabled = 0;

function loadingScreen() {
  loading.style.display = "block";
  setTimeout(function(){
    loading.style.opacity = "1";
  },1);
}

function enterAction(){
  if (analyse.className == "analyse analyseable"){
    loadingScreen();
    setTimeout(function(){
      blurClick.style.transition = "700ms ease-in-out";
      blurClick.style.left = "-10%";
      blurClick.style.opacity = "0";
      showResults();
      disabled = 1;
      setTimeout(function(){
        analysis(1);
      },10);
    },10);
  }
  input.blur();
  enterDisabled = 1;
}

if (disabled == 0){

analyse.onclick = function(){
  enterAction();
}

function checkEnter(e) {
  keyCodevar = event.keyCode;
  if (keyCodevar == 13) {
    if (enterCount == 0 && hadClicked == 0){
      enterCount++;
      hadClicked++;
      showEnter();
      return false;
    }

    if (keyCodevar == 13 && enterCount == 1);
      if (enterDisabled == 0){
        enterAction();
      }
      enterCount = 0;
      setTimeout(function() {
        hideEnter();
      },1000);
      return false;
    }

  if (keyCodevar != 13 && hadClicked == 1){
    enterContainer.style.transition = "500ms ease-in-out";
    hideEnter();
    setTimeout(function(){
      enterContainer.style.transition = "100ms ease-in-out";
    }, 500);
    enterCount = 0;
    hadClicked = 0;
    return false;
  }

  if (keyCodevar != 13){
    enterCount = 0;
    return false;
  }
}

}
reset.onclick = function(){
  location.reload(true);
}
