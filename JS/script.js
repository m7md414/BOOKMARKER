var swch = document.getElementById("sw");
var over = document.getElementById("over");
var word = document.getElementById("word");
var spans = document.getElementsByTagName("span");
var siteName = document.getElementById("siteName");
var siteURL = document.getElementById("siteURL");
var bttn = document.getElementById("bttn");
var data = [];
var drawn = [];
window.onload=open();
function or(){
    var left=window.getComputedStyle(swch,null).getPropertyValue("left");
    if(left=="35px"){
        swch.style.left="-20px";
        over.style.opacity=0;
        over.style.zIndex=9;
        word.style.animationPlayState="running";
        for(var i=0;i<7;i++){
            spans[i].style.animationPlayState="running";
        }
    }
    else{
        swch.style.left="35px";
        over.style.opacity=1;
        over.style.zIndex=11;
        word.style.animationPlayState="paused";
        for(var i=0;i<7;i++){
            spans[i].style.animationPlayState="paused";
        }
    }
}
function open(){
    data = JSON.parse(localStorage.getItem("data"));
    if (data != null)
        showData();
    else data = [];
    updateDeleteButtons();
    addDeleteEvent();
}

function showData(){
    for(var i=0;i<data.length;i++){
        if(!isDrawn(data[i])){
            newMark(data[i]);
        }
    }
}
function clear(){
    siteName.value="";
    siteURL.value="";
}
function add(){
   // siteURL = addHTTP(siteURL);
var bookmark = { name: siteName.value, url: siteURL.value };
console.log(bookmark.name);
    data.push(bookmark);
    localStorage.setItem("data", JSON.stringify(data));
    showData();
    updateDeleteButtons();
    addDeleteEvent();
    clear();
}
function isDrawn(bookmark) {
    for (var i = 0; i < drawn.length; i++)
        if (bookmark == drawn[i])
            return true;
    return false;
}
function newMark(mark){
    var div = document.getElementById('content');
    div.innerHTML+= '<div class=\"container-fluid data\" id=\"' + mark.name + '\">';
    var anchor = '<a class=\"btn btn-primary\" href=\"' + mark.url + '\" target=\"_blank\">Visit</a>';
    var delBtn = '<button class=\"btn btn-danger btndelete\">Delete</button>';
    var h = "<h1 class=\"anc\">" + mark.name + "</h1>"; 
    var specDiv = document.getElementById(mark.name);
    specDiv.innerHTML = h + anchor + delBtn ;
    drawn.push(mark);
}
function deleteR(mark) {
    drawn.splice(drawn.indexOf(mark), 1);
    var div = document.getElementById('content');	
    var specDiv = document.getElementById(mark.name);
    var row = '<div class=\"container-fluid data\" id=\"' + mark.name + '\">' + specDiv.innerHTML + '</div>';
    div.innerHTML = div.innerHTML.replace(row,"");
    updateDeleteButtons();
    addDeleteEvent();
}
function addDeleteEvent() {
    for (var i = 0; i < btnsdelete.length; i++) {
        btnsdelete[i].addEventListener("click", function(e) {
            var item = e.target.parentElement;
            for (var i = 0; i < data.length; i++) {
                if (item.id == data[i].name) {
                    deleteR(data[i]);
                    data.splice(i, 1);
                    localStorage.setItem("data", JSON.stringify(data));
                }
            }
        })
    }
}
function updateDeleteButtons() {
    btnsdelete = document.querySelectorAll(".btndelete");
}
/*function addHTTP(url){
    if (url.search("http://") == -1 && url.search("https://") == -1){
        url="http//:" + url;
    }
    return url;
}*/