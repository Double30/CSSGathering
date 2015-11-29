// Here is example:
//
// iframe#preview.preview
//
// #code-container
//
// script type="text/htmlblock"
//   |
//     <h1>I'm H1</h1>
//     <p>rap</p>
//
// script type="text/cssblock"
//   |
//     h1 {
//       font-size: 48px;
//       background-color: #FFFF00;
//     }

var CONFIG = {
  previewID: "preview",
  codeContainerID: "code-container",
  htmlBlockClass: "codeblock--html",
  cssBlockClass: "codeblock--css",
  blockClass: "codeblock"
};

var previewContainer = document.getElementById(CONFIG.previewID).contentWindow.document;
var previewElem = previewContainer.createElement("div");
previewElem.setAttribute("id", "#preview");
previewContainer.body.appendChild(previewElem);

if(previewElem !== null){
  var rawHTMLElem = document.querySelector("script[type='text/htmlblock']");
  var rawCSSElems = document.querySelectorAll("script[type='text/cssblock']");

  renderHTMLBlock(rawHTMLElem);
  renderCSSBlock(rawCSSElems);
}

function checkCodeContainer(){
  var codeContainer = document.getElementById(CONFIG.codeContainerID);
  if(!codeContainer){
    console.warn("#code-container not found!");
    return false;
  }

  return codeContainer;
}

function renderHTMLBlock(rawElem){
  var contentHTML,
      codeContainer,
      htmlBlock;

  if(!rawElem){ console.warn("HTML data not found!"); return false; }
  contentHTML = rawElem.innerHTML;

  codeContainer = checkCodeContainer();
  if(!codeContainer){ return false; }

  var htmlBlock = document.getElementsByClassName(CONFIG.htmlBlockClass)[0];
  if(htmlBlock === undefined){
    var htmlBlock = document.createElement("div");
  }
  htmlBlock.classList.add(CONFIG.htmlBlockClass);
  htmlBlock.classList.add(CONFIG.blockClass);

  previewElem.innerHTML = contentHTML;
  htmlBlock.appendChild(document.createTextNode(contentHTML));
  codeContainer.appendChild(htmlBlock);
}

function renderCSSBlock(rawElems){
  if(rawElems.length === 0){ console.warn("css data not found!"); return false; }

  var codeContainer;

  codeContainer = checkCodeContainer();
  if(!codeContainer){ return false; }

  for(var i = 0; i < rawElems.length; i++){
    var elem = rawElems[i];

    var styleText = elem.innerHTML;
    var styleBlock = document.createElement("style");
    styleBlock.setAttribute("type", "text/css");
    styleBlock.innerHTML = styleText;
    previewContainer.body.appendChild(styleBlock);

    var styleCodeBlock = document.createElement("textarea");
    styleCodeBlock.classList.add(CONFIG.cssBlockClass);
    styleCodeBlock.classList.add(CONFIG.blockClass);
    styleCodeBlock.appendChild(document.createTextNode(styleText));
    codeContainer.appendChild(styleCodeBlock);
  }
}
