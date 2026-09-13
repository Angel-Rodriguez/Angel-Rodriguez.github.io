const noImageStr="data:image/gif;base64,R0lGODlhAQABAIAAAJmZmf///yH5BAQUAP8ALAAAAAABAAEAAAICRAEAOw==";


/* -------------------------------------------- */
/* -------------------------------------------- */
/* --                GridView               --- */
/* -------------------------------------------- */
/* -------------------------------------------- */


function Do_RestackArticles() {
var d=document;
var divs=d.getElementsByTagName("div");
var articles=[];
var article_container;
for (var i=0;i<divs.length;i++){
if (divs[i].className=="blog-posts hfeed container") {
articles=divs[i].getElementsByTagName("article");
article_container=divs[i];
break;
}}

if (articles.length>0) {
for (n=0;n<articles.length-1;n++){
article_container.insertBefore(articles[n+1], articles[n]);
article_container.insertBefore(articles[n+1], articles[n]);
}}}


/* -------------------------------------------- */
/* -------------------------------------------- */
/* --             Popular Posts             --- */
/* -------------------------------------------- */
/* -------------------------------------------- */


function Do_PopularPosts() {
var d=document;
var divs;
var articles;
var popularposts;
var popularpostsDivs;
var aargcontent='';
divs=d.getElementsByTagName('div');
for (var i=0;i<divs.length;i++){
if (divs[i].className.indexOf('widget PopularPosts')>-1){
popularposts=divs[i];
popularposts.className="widget PopularPosts";
articles=popularposts.getElementsByTagName('article');
for (var j=0;j<articles.length;j++){
var pageURL=new String(articles[j].getElementsByTagName('a')[0].getAttribute('href'));
var imgURL=new String(articles[j].getElementsByTagName('img')[0].getAttribute('src').replace('s320','s72-c').replace('w72-h72-p-k-no-nu','s72-c').replace('s1600','s72-c').replace('s200','s72-c').replace('s300','s72-c'));
var pageTitle=new String(articles[j].getElementsByTagName('a')[0].textContent.replace('...',''));
if (aargcontent.indexOf(pageURL.replace('http:', 'https:')) == -1) {
aargcontent+='<div class="rcitembox"><a href="'+pageURL.replace('http:', 'https:')+'"><img src="'+noImageStr+'" data-src="'+imgURL.replace('http:', 'https:')+'" class="rcitemimg" alt="" title="'+pageTitle+'"/></a><br/><a href="'+pageURL.replace('http:', 'https:')+'" title="'+pageTitle+'" class="rcitemtxt">'+pageTitle+'</a></div>';
} //filter duplicate posts
}}}
var pps = new String(popularposts);
if (pps!="undefined") {
popularpostsDivs = popularposts.getElementsByTagName('div');
for (var i=0;i<popularpostsDivs.length;i++){
if(popularpostsDivs[i].getAttribute('role')=='feed'){
var nIH=new String('<div class="aargcontainer">'+aargcontent+'</div>');
popularpostsDivs[i].innerHTML=nIH;
for (var j=0;j<articles.length;j++){
articles[j].style.display='none';
}//for
}//if pps
}}
}//function


/* -------------------------------------------- */
/* -------------------------------------------- */
/* --             Date Overlays             --- */
/* -------------------------------------------- */
/* -------------------------------------------- */


function dateToString(articleDate,ah3link) {
var returnString='';
var ahrefStart="<a href='" +ah3link + "'>";
var ahrefEnd="</a>";
if (ah3link=='#') {
ahrefStart="";
ahrefEnd="";
}
var MonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var MonthString = new String("<div class='aargmonth'>" + ahrefStart + MonthNames[articleDate.getMonth()].substring(0,3) + ahrefEnd + "</div>");
var DayString = new String("<div class='aargday'>" + ahrefStart + articleDate.getDate().toString() + ahrefEnd + "</div>");
var YearString = new String("<div class='aargyear'>" + ahrefStart + articleDate.getFullYear().toString() + ahrefEnd + "</div>");
returnString = "<div class='aargdate' style='display:block'>" + MonthString + DayString + YearString + "</div>";
return returnString;
}//function

function Do_CustomDateStamps() {
var d=document;
var divs=d.getElementsByTagName('div');
for (var i=0;i<divs.length;i++){
var divClass=new String(divs[i].className);
if (divClass.indexOf("datestamp-container")>-1){
var whatDate = new Date(Date.parse(divs[i].innerText));
divs[i].innerHTML=dateToString(whatDate,"#").replace('aargdate', 'onedate');
}//is date stamp
}//for i
}//function

function Do_DateOverlays() {
var d=document;
var divs;
var articles;
var timeString='';
articles=d.getElementsByTagName('article');
if (articles.length>0){
for (var ac=0;ac<articles.length;ac++){

var articleh3 = articles[ac].getElementsByTagName('h3');
var articleh3a = articleh3[0].getElementsByTagName('a');
var ah3title='';
var ah3link='#';
if (articleh3a.length > 0) {
ah3title = new String(articleh3a[0].textContent).replace('...','');
ah3link=new String(articleh3a[0].getAttribute('href'));
}
var articleDivs = articles[ac].getElementsByTagName('div');
var articleTime = articles[ac].getElementsByTagName('time');
if (articleTime.length >0){
var articleDate = new Date(Date.parse(articleTime[0].getAttribute('datetime')));
timeString = dateToString(articleDate,ah3link);
articleTime[0].style.display='none';
articleTime[0].setAttribute('title','');
var isSnippet = 0;
for (var dc=0;dc<articleDivs.length;dc++){
if (articleDivs[dc].className.indexOf('post-snippet')>-1){isSnippet=1;}
}//for dc
if (isSnippet==1){
var articleb = articles[ac].getElementsByTagName('b');
var dateStatus='show';
if (articleb.length>0){dateStatus = new String(articleb[0].getAttribute('dateStatus'));}
if (dateStatus!='hide'){
for (var dc=0;dc<articleDivs.length;dc++){
if (articleDivs[dc].className.indexOf('container post-body entry-content')>-1){
var timestampString = new String(timeString+articleDivs[dc].innerHTML);
articleDivs[dc].innerHTML=timestampString;
articleDivs[dc].style.position='relative';
articleDivs[dc].style.top='-20px';
articleDivs[dc].style.zIndex='5';
var imgs = articleDivs[dc].getElementsByTagName('img');
var imgsrc = new String(imgs[0].getAttribute('src').replace('s320','s320-c').replace('s1600','s320-c').replace('s200','s320-c'));
imgs[0].setAttribute('data-src', imgsrc.toString());
imgs[0].setAttribute('src', noImageStr);
}//if container post-body entry-content
if (articleDivs[dc].className=='post-header-line-1'){
var divSpan = articleDivs[dc].getElementsByTagName("span");
divSpan[0].innerHTML="<br/>";
}//if post-header-line-1
}//for dc
} else { //if dateStatus hide
for (var dc=0;dc<articleDivs.length;dc++){
if (articleDivs[dc].className=='post-header-line-1'){
var divSpan = articleDivs[dc].getElementsByTagName("span");
divSpan[0].innerHTML="<br/>";
}}

for (var dc=0;dc<articleDivs.length;dc++){
if (articleDivs[dc].className.indexOf('container post-body entry-content')>-1){
articleDivs[dc].style.position='relative';
articleDivs[dc].style.top='-20px';
}}

}
} else { //not snippet
for (var dc=0;dc<articleDivs.length;dc++){
if (articleDivs[dc].className=='post-header-line-1'){
articleDivs[dc].innerHTML = timeString.replace('aargdate', 'onedate');
var h3 = articles[0].getElementsByTagName('h3');
if (h3.length > 0){
h3[0].className='post-title entry-title onedateh3';
}//if h3
}//if post-header-line-1
}//for dc
}//else
}//if articleTime
}//for ac
}//has articles
}//function


/* -------------------------------------------- */
/* -------------------------------------------- */
/* --            Snippet Overlay            --- */
/* -------------------------------------------- */
/* -------------------------------------------- */


function Do_SnippetOverlay() {
var d=document;
var divs;
var articles=d.getElementsByTagName('article');
for (var j=0;j<articles.length;j++){
var articlediv = articles[j].getElementsByTagName('div');
var articleh3 = articles[j].getElementsByTagName('h3');
var articleh3a = articleh3[0].getElementsByTagName('a');
if (articleh3a.length > 0) {
var atitle = new String(articleh3a[0].textContent).replace('...','');
divs=articles[j].getElementsByTagName('div');
for (var k=0;k<divs.length;k++){
if (divs[k].className=='snippet-thumbnail') {
var divClass=new String(articlediv[0].className);
if (divClass.indexOf("article-snippet")==-1){
if (divClass=="undefined"){divClass="";}
if (divClass==""){
articlediv[0].className = "article-snippet";
} else {
articlediv[0].className = divClass+" article-snippet";
}}
var img = new String(divs[k].innerHTML);
divs[k].innerHTML = '<a href="' + articleh3a[0].href +'" title="' + atitle + '">' + img + '</a>';
}
if (divs[k].className=='snippet-item r-snippetized') {
var txt = new String(divs[k].innerHTML);
if (txt.indexOf("<a")>-1){
txt=txt.replace(new RegExp("<a", "gi"),"<i");
txt=txt.replace(new RegExp("<\/a", "gi"),"</i");
}
divs[k].innerHTML = '<a href="' + articleh3a[0].href +'" title="' + atitle + '">' + txt + '</a>';
}
if (divs[k].className=='container post-body entry-content') {
divs[k].className = 'container post-body entry-content snippet-overlay';
divs[k].setAttribute("onclick","location.href='" + articleh3a[0].href + "';");
}}}}
}//function


/* -------------------------------------------- */
/* -------------------------------------------- */
/* --             Random Posts              --- */
/* -------------------------------------------- */
/* -------------------------------------------- */


function getOneRandomAnime() {
var d=document;
var numAnime=an.length-1;
var randNum=1+Math.round(Math.random()*(numAnime-1));
var randSeed=1+Math.round(Math.random()*((numAnime/10)-1));
var curIndex=randNum;
var isFound=-1;

//Check footer
var footer=d.getElementById("footer");
var footerStr=new String(footer);
if (footerStr!="undefined") {
while (isFound<0) {
var links=footer.getElementsByTagName("a");
for (var n=0;n<links.length;n++) {
var ahref=new String(links[n].getAttribute("href"));
if (ahref==an[curIndex].w) {isFound=-2;break;}
}//for links
if (isFound==-2) {
isFound=-1;
curIndex+=randSeed;
if(curIndex>numAnime){
curIndex=curIndex % numAnime;
}
} else {
isFound=curIndex;
}
}//while
}//has footer

//Check sidebar with link id from footer
var sidebar=d.getElementById("sidebar_bottom");
var sidebarStr=new String(sidebar);
if ((sidebarStr!="undefined") && (sidebarStr!="null")) {
do {
var links=sidebar.getElementsByTagName("a");
for (var n=0;n<links.length;n++) {
var ahref=new String(links[n].getAttribute("href"));
if (ahref==an[curIndex].w) {isFound=-2;break;}
}//for links
if (isFound==-2) {
isFound=-1;
curIndex+=randSeed;
if(curIndex>numAnime){
curIndex=curIndex % numAnime;
}
} else {
isFound=curIndex;
}
}
while (isFound<0)
}//has sidebar

return curIndex;
}

function Do_RandomPosts() {
var d=document;
var divs=d.getElementsByTagName('div');
var popularposts;
var cw = d.documentElement.clientWidth;
var cu = new String(window.location).toLowerCase();
var maxPosts = 6;
if ((cw<769) && (cw>688)) {maxPosts=5;}
if ((cw<689) && (cw>608)) {maxPosts=4;}
if ((cw<609) && (cw>528)) {maxPosts=3;}
if (cw<529) {maxPosts=3;}
if (cw>1299) {maxPosts=3;}
for (var i=0;i<maxPosts;i++){
var curIndex=getOneRandomAnime();
var randompoststitle = an[curIndex].n;
var randompoststhumb = an[curIndex].i;
var randompostsurl = an[curIndex].w;
var popularpostsDivs;
var popularpostsHeader;
var popularpostsContent='';
var aargcontentDiv;
var widgetlinklist;
divs=d.getElementsByTagName('div');
for (var p=0;p<divs.length;p++){
if (divs[p].className.indexOf('widget PopularPosts')>-1){
popularpostsContent=divs[p].innerHTML;
if (divs[p].innerHTML.indexOf('aargcontainer')==-1){
divs[p].innerHTML += "<div class='aargcontainer'></div>";
}
popularposts=divs[p];
}
}//for/if-p-divs
var pps = new String(popularposts);
if (pps!="undefined") {
popularpostsDivs = popularposts.getElementsByTagName('div');
popularpostsHeader = popularposts.getElementsByTagName('h3');
popularpostsHeader[0].innerHTML="Popular and Random Posts";
for (var r=0;r<popularpostsDivs.length;r++){
if (popularpostsDivs[r].className=='aargcontainer'){
aargcontentDiv=popularpostsDivs[r];
}}//for/if-r-popularpostsDivs

aargcontentDiv.innerHTML+='<div class="rcitembox"><a href="'+randompostsurl+'"><img src="'+noImageStr+'" data-src="'+randompoststhumb+'" class="rcitemimg" alt="" title="'+randompoststitle+'"/></a><br/><a href="'+randompostsurl+'" title="'+randompoststitle+'" class="rcitemtxt">'+randompoststitle+'</a></div>';
}

//Do this ome time only.
if (i==(maxPosts-1)){
//Don't show home button on home page.
if (cu.length<35) {
var tabs=d.getElementsByClassName("tabs");
if (tabs.length>0) {
var tb=tabs[0].getElementsByClassName("overflowable-item");
if (tb.length>0) {
tb[0].style.visibility="hidden";
tb[0].style.width="0px";
tb[0].style.margin="0px";
var ob=d.getElementsByClassName("overflow-button");
if (ob.length>0) {
ob[0].style.visibility="hidden";
ob[0].style.width="0px";
ob[0].style.margin="0px";
}}}}//length<35
}//i==(maxPosts-1)
}//for i<maxPosts
}//function


/* -------------------------------------------- */
/* -------------------------------------------- */
/* --        Previous and Next Posts        --- */
/* --             Related Posts             --- */
/* --     Note: Posts MUST have labels      --- */
/* -------------------------------------------- */
/* -------------------------------------------- */


function getCurrentAnime() {
var d=document;
var maxItems = an.length;
var numItems = an.length-1;
var currentPath = window.location.pathname.toLowerCase();
var currentUrl = new String(window.location).toLowerCase();
var currentPageID = -1;
for (var i=0;i<maxItems;i++) {
var lastslashindex = an[i].w.lastIndexOf('/');
var filename = an[i].w.substring(lastslashindex + 1).toLowerCase();
var thisItem=an[i].w;
if ((thisItem.indexOf(currentPath) >-1) || (thisItem.indexOf(currentUrl) >-1)){
currentPageID=i;
break;
}}

return currentPageID;
}


function Do_Ring(ringname, thisring) {
var d=document;
var maxItems = thisring.length;
var numItems = thisring.length-1;
var currentPath = window.location.pathname.toLowerCase();
var currentUrl = new String(window.location).toLowerCase();
var currentPageID = -1;
var labels = [];
var labelCount=0;
labels.push({content: '<span style="font-size: 30px;">&larr;</span><br/>Previous'});
labels.push({content: '<span style="font-size: 30px;">&rarr;</span><br/>Next'});
var prevIndex=0;
var nextIndex=1;
var useNavigation=0;
var links = [];

//Locate target div; look for labels in the footer
var divs=d.getElementsByTagName('div');
for (var i=0;i<divs.length;i++){
if(divs[i].className=='post-footer-line post-footer-line-2'){
var qIH=new String(divs[i].innerHTML);
switch (ringname) {
case "Anime":
case "Mainstream":
if (qIH.indexOf(ringname) > -1) {useNavigation=1;}
break;
case "Other":
if ((qIH.indexOf('Anime') == -1) && (qIH.indexOf('Mainstream') == -1) && (qIH.length > 5)) {useNavigation=1;}
break;
}//switch
}}

//Locate index of current page in array
if (useNavigation==1){
for (var i=0;i<maxItems;i++) {
var lastslashindex = thisring[i].w.lastIndexOf('/');
var filename = thisring[i].w.substring(lastslashindex + 1).toLowerCase();
var thisItem=thisring[i].w;
if ((thisItem.indexOf(currentPath) >-1) || (thisItem.indexOf(currentUrl) >-1)){
currentPageID=i;
break;
}}

//Create Previous and Next Thumbnail Links
if ((useNavigation==1) && (currentPageID>=0)){
//Create Prev and Next Links
for (var n=-1;n<=1;n++){
var t = currentPageID + n;
if (t<0) {t+=(numItems+1);}
if (t>numItems) {t=t % (numItems+1);}
if (n!=0) {
links.push({id: t, content: '<div class="rcitembox"><a href="'+thisring[t].w+'"><img src="'+noImageStr+'" data-src="'+thisring[t].i+'" class="rcitemimg" alt="" title="'+thisring[t].n+'"/></a><br/><a href="'+thisring[t].w+'" title="'+thisring[t].n+'" class="rcitemtxt">'+labels[labelCount].content+'</a></div>'});
labelCount+=1;
}//if n!=0
}//for n

//Create Related Thumbnail Links
for (var n=-2;n<=2;n++){
var t = currentPageID + n;
if (t<0) {t+=(numItems+1);}
if (t>numItems) {t=t % (numItems+1);}
if (n!=0) {
links.push({id: t, content: '<div class="rcitembox"><a href="'+thisring[t].w+'"><img src="'+noImageStr+'" data-src="'+thisring[t].i+'" class="rcitemimg" alt="" title="'+thisring[t].n+'"/></a><br/><a href="'+thisring[t].w+'" title="'+thisring[t].n+'" class="rcitemtxt">'+thisring[t].n+'</a></div>'});
labelCount+=1;
}//if n!=0
else {
switch (ringname) {
case "Anime":
links.push({id: -1, content: '<div class="rcitembox"><a href="https://aarg.blogspot.com/p/anime-list.html"><img src="'+noImageStr+'" data-src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhwM71VZtxDjumk44inTaJcOMcWhuYUMuWpDISZSgWP_LCO89rsnGSo4Jaj1uQ85mZu3A1FnjT49tNmW60jp9V9btZPFgK-Tniez6QlcKsEWjBJrghRHrcreJE1K2bAAF0imPkXwg/s72-c/MovieList_Page_1.jpg" class="rcitemimg" alt="Anime List"/></a><br/><a href="https://aarg.blogspot.com/p/anime-list.html" class="rcitemtxt">Anime List</a></div>'});
break;
case "Mainstream":
links.push({id: -1, content: '<div class="rcitembox"><a href="https://aarg.blogspot.com/p/anime-list.html"><img src="'+noImageStr+'" data-src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiREv_-v-zmDgwZtsnnfBRxsBJ5fw8NOqBuHu_o2cUoueU4p59MW1omZEMlYAmJj9Nl4E6txmLXyvKf5eMo6cZe2W1kLg00emFsz_ZGbpCrs4OLTe9Nv7yHbnvi1hnV2V1rapA3pQ/s72-c/MovieList_Page_2.jpg" class="rcitemimg" alt="Anime List"/></a><br/><a href="https://aarg.blogspot.com/p/anime-list.html" class="rcitemtxt">Anime List</a></div>'});
break;
case "Other":
break;
}//switch
}//if n!=0
}//for n
}//useNavigation==1 && currentPageID>=0

//Display Next Thumbnail Link
if ((useNavigation==1) && (links.length>0)) {
for (var i=0;i<divs.length;i++){
if(divs[i].className.indexOf('post-outer')>-1){
var nIH=new String('<div class="navprevnext-container">'+links[nextIndex].content+'</div>'+divs[i].innerHTML);
divs[i].innerHTML=nIH;

//Display Footer Links
var blog=d.getElementById("Blog1");
var nIH=new String('<div class="blog-pager container" id="blog-pager"><a class="blog-pager-newer-link flat-button ripple" href="'+thisring[links[prevIndex].id].w+'" id="Blog1_blog-pager-newer-link" title="Previous Page ('+thisring[links[prevIndex].id].n+')">&larr;&nbsp;Previous</a><span data-title="'+ringname+' Ring With '+thisring.length.toString()+' Pages"><b>&bigcirc;</b></span><a class="blog-pager-older-link flat-button ripple" href="'+thisring[links[nextIndex].id].w+'" id="Blog1_blog-pager-older-link" title="Next Page ('+thisring[links[nextIndex].id].n+')">Next&nbsp;&rarr;</a></div>');
blog.innerHTML+=nIH;

}//if post
if(divs[i].className.indexOf('post-body entry-content')>-1){
var nIH=new String(divs[i].innerHTML);
nIH+='<div class="related-links"><div class="clear"></div><br/><h3 style="padding-top:0px;margin-top:0px;">Related Posts</h3>';
if (links.length>2){
for (var n=2;n<links.length;n++){
nIH+=links[n].content;
}//for n
nIH+="</div>";
divs[i].innerHTML=nIH;
}//if links.length>2
}//if post-body
}}
}//useNavigation=1
}//function


/* -------------------------------------------- */
/* -------------------------------------------- */
/* --             Rating Snippet            --- */
/* -------------------------------------------- */
/* -------------------------------------------- */


function setRatingObjClass(s1,s2,s3,s4,s5,rn,articlerating,isSmall) {
var isFound=-1;
var full = "fullball";
var empty = "emptyball";
if (isSmall==1) {
full += "-small";
empty += "-small";
}
if (articlerating=='5') {
s1.setAttribute("class", full);
s2.setAttribute("class", full);
s3.setAttribute("class", full);
s4.setAttribute("class", full);
s5.setAttribute("class", full);
rn.innerText="5";
isFound=5;
} else {
s1.setAttribute("class", empty);
s2.setAttribute("class", empty);
s3.setAttribute("class", empty);
s4.setAttribute("class", empty);
s5.setAttribute("class", empty);
}
if (articlerating=='4') {
s1.setAttribute("class", full);
s2.setAttribute("class", full);
s3.setAttribute("class", full);
s4.setAttribute("class", full);
rn.innerText="4";
isFound=4;
}
if (articlerating=='3') {
s1.setAttribute("class", full);
s2.setAttribute("class", full);
s3.setAttribute("class", full);
rn.innerText="3";
isFound=3;
}
if (articlerating=='2') {
s1.setAttribute("class", full);
s2.setAttribute("class", full);
rn.innerText="2";
isFound=2;
}
if (articlerating=='1') {
s1.setAttribute("class", full);
rn.innerText="1";
isFound=1;
}
if (articlerating=='0') {
rn.innerText="0";
isFound=0;
}
return isFound;
}//function


function Do_RatingSnippet() {
var d=document;
var divs=d.getElementsByTagName('div');
var maxAnime = an.length;
var mainposts;
var articlerating;
var ratingimage='';
var postContainer;
for (var i=0;i<divs.length;i++){
if (divs[i].className=='blog-posts hfeed container'){
mainposts=divs[i];
articles=mainposts.getElementsByTagName('article');
if (articles.length>1){
for (var j=0;j<articles.length;j++){
var articleDivs=articles[j].getElementsByTagName('div');

var articleh3 = articles[j].getElementsByTagName('h3');
var articleh3a = articleh3[0].getElementsByTagName('a');
var linkurl = new String(articleh3a[0].getAttribute('href'));

for (var k=0;k<articleDivs.length;k++){
if (articleDivs[k].className.indexOf('container post-body entry-content') > -1){
postContainer = articleDivs[k];
}
if (articleDivs[k].className=='snippet-item r-snippetized'){
var ratingID=-1;
var ta = d.createElement("a");
ta.href=linkurl;
var linkpath = ta.pathname.toLowerCase();
for (var p=0;p<maxAnime;p++){
if (an[p].w.toLowerCase().indexOf(linkpath)>-1){
ratingID=p;
break;
}}

if (ratingID >= 0) {
articlerating = new String(an[ratingID].r);

var rc = d.createElement("SPAN");
rc.setAttribute("class", "rating-container-small");
var rn = d.createElement("SPAN");
var s1 = d.createElement("SPAN");
var s2 = d.createElement("SPAN");
var s3 = d.createElement("SPAN");
var s4 = d.createElement("SPAN");
var s5 = d.createElement("SPAN");
rn.setAttribute("class", "rating-number-small");

var isFound=setRatingObjClass(s1,s2,s3,s4,s5,rn,articlerating,1);

if (isFound>-1 && articlerating!='null') {
rc.appendChild(rn);
rc.appendChild(s1);
rc.appendChild(s2);
rc.appendChild(s3);
rc.appendChild(s4);
rc.appendChild(s5);
rc.setAttribute("title", articlerating + " out of 5");

var am = d.createElement("a");
am.setAttribute("href", linkurl.toString());
am.setAttribute("class", "aargratingimage");
am.appendChild(rc);
postContainer.appendChild(am);
}}}}}}}}
}//function


/* -------------------------------------------- */
/* -------------------------------------------- */
/* --      Rating Image Substitution        --- */
/* -------------------------------------------- */
/* -------------------------------------------- */


function Do_RatingImageSubstitution() {
var d=document;
var whatDoc;
whatDoc=d.getElementsByTagName('img');
var rc = document.createElement("SPAN");
var rn = document.createElement("SPAN");
var s1 = document.createElement("SPAN");
var s2 = document.createElement("SPAN");
var s3 = document.createElement("SPAN");
var s4 = document.createElement("SPAN");
var s5 = document.createElement("SPAN");
rc.setAttribute("class", "rating-container");
rn.setAttribute("class", "rating-number");
for (var i=0;i<whatDoc.length;i++) {
var isFound=-1;
var imgID=new String(whatDoc[i].src);
if (imgID.indexOf("5-star")>-1) {
isFound=setRatingObjClass(s1,s2,s3,s4,s5,rn,"5",0);
}
if (imgID.indexOf("4-star")>-1) {
isFound=setRatingObjClass(s1,s2,s3,s4,s5,rn,"4",0);
}
if (imgID.indexOf("3-star")>-1) {
isFound=setRatingObjClass(s1,s2,s3,s4,s5,rn,"3",0);
}
if (imgID.indexOf("2-star")>-1) {
isFound=setRatingObjClass(s1,s2,s3,s4,s5,rn,"2",0);
}
if (imgID.indexOf("1-star")>-1) {
isFound=setRatingObjClass(s1,s2,s3,s4,s5,rn,"1",0);
}
if (imgID.indexOf("0-star")>-1) {
isFound=setRatingObjClass(s1,s2,s3,s4,s5,rn,"0",0);
}
if (isFound>-1) {
if (whatDoc[i].className!="dontshow"){
rc.appendChild(rn);
rc.appendChild(s1);
rc.appendChild(s2);
rc.appendChild(s3);
rc.appendChild(s4);
rc.appendChild(s5);
rc.setAttribute("title", new String(isFound)+" out of 5");
whatDoc[i].parentNode.appendChild(rc);
whatDoc[i].className="dontshow";
}}}
}//function


/* -------------------------------------------- */
/* -------------------------------------------- */
/* --             Music Ratings             --- */
/* -------------------------------------------- */
/* -------------------------------------------- */


function Do_MusicRatings() {
var d=document;
var isFound=-1;
var bq;
var bqimgs;
var articlerating;
var ratingvalue=0;
var atricletitle;
var ratingimage='';
var postContainer;
var vgmdb='';
bq=d.getElementsByTagName('blockquote');
for (var i=0;i<bq.length;i++){
if (bq[i].className=='music'){
bqimgs=bq[i].getElementsByTagName('img');
if (bqimgs.length > 0) {
bqimgs[0].setAttribute("style", "border-bottom: 2px solid #99AACC;");
postContainer=bq[i].firstChild.nextSibling;
articlerating = new String(bqimgs[0].getAttribute('cdrating'));
if ((articlerating=="undefined") || (articlerating=="null")) {
articlerating = new String(bqimgs[0].getAttribute('id'));
}

atricletitle = new String(bqimgs[0].getAttribute('alt'));

vgmdb = new String(bqimgs[0].getAttribute('vgmdb'));
if ((vgmdb=="undefined") || (vgmdb=="null")) {
vgmdb = new String(bqimgs[0].getAttribute('longdesc'));
}
var rc = document.createElement("SPAN");
rc.setAttribute("class", "rating-container-small");
var rn = document.createElement("SPAN");
var s1 = document.createElement("SPAN");
var s2 = document.createElement("SPAN");
var s3 = document.createElement("SPAN");
var s4 = document.createElement("SPAN");
var s5 = document.createElement("SPAN");//Not used
rn.setAttribute("class", "rating-number-small");

if (parseInt(articlerating, 10) != 'NaN') {
ratingvalue=parseInt(articlerating, 10);
}
if (ratingvalue>=80) {
isFound=setRatingObjClass(s1,s2,s3,s4,s5,rn,"4",1);
}
if (ratingvalue>=50 && ratingvalue<=79) {
isFound=setRatingObjClass(s1,s2,s3,s4,s5,rn,"3",1);
}
if (ratingvalue>=20 && ratingvalue<=49) {
isFound=setRatingObjClass(s1,s2,s3,s4,s5,rn,"2",1);
}
if (ratingvalue>=1 && ratingvalue<=19) {
isFound=setRatingObjClass(s1,s2,s3,s4,s5,rn,"1",1);
}

if (isFound>0) {
var bqt=new String(bq[i].innerHTML);
if (bqt.indexOf("Music Rating")==-1){
rc.appendChild(rn);
rc.appendChild(s1);
rc.appendChild(s2);
rc.appendChild(s3);
rc.appendChild(s4);
rc.setAttribute("title", "Music Rating for " + atricletitle + ": " + new String(isFound) + " out of 4");

postContainer.parentNode.insertBefore(rc, postContainer.nextSibling);
var tc = document.createElement("SPAN");
var tn=document.createTextNode(atricletitle.toString());
tc.setAttribute("class", "musicname");
tc.appendChild(tn);
bq[i].appendChild(tc);
var bqa=bq[i].getElementsByTagName("a");
if (bqa.length>0) {
bqa[0].setAttribute("title", "Cover art for " + atricletitle);
}

//Discogs
if (vgmdb.indexOf('http')>-1){
var va = document.createElement("A");
va.href=vgmdb;
va.setAttribute("target", "_blank");
var vi = document.createElement("IMG");
if (vgmdb.indexOf("discogs")>-1) {
vi.src="data:image/png;base64,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";
vi.setAttribute("alt", "Open Discogs");
va.setAttribute("title", "Open Discogs");
} else {

//VGMDB
vi.src="data:image/png;base64,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";
vi.setAttribute("alt", "Open VGMDB");
va.setAttribute("title", "Open VGMDB");
}
vi.setAttribute("style", "height:50px !important;padding-top:5px;");
va.appendChild(vi);
bq[i].appendChild(va);
bq[i].setAttribute("style", "height:200px;");
}
}}}}}
}//function


/* -------------------------------------------- */
/* -------------------------------------------- */
/* --          Background Squares           --- */
/* -------------------------------------------- */
/* -------------------------------------------- */


function Do_BackgroundSquares() {
var d=document;
var numSquares=18;
var divs=d.getElementsByTagName('div');
var cw = d.documentElement.clientWidth;
if (cw>=750) {
for (var i=0;i<divs.length;i++){
if (divs[i].className=="bg-photo-overlay") {
var bgs = document.createElement("DIV");
bgs.setAttribute("class", "bg-square");
for (var c=1; c<=numSquares; c++){
var bgo = document.createElement("DIV");
bgo.setAttribute("class", "bg-onesquare");
bgs.appendChild(bgo);
}//for c
divs[i].appendChild(bgs);
break;
}//bg-photo-container
}//for i
}//if cw>=750
}//function


/* ----------------------------------------------- */
/* ----------------------------------------------- */
/* --              Toggle Section              --- */
/* ----------------------------------------------- */
/* Given a div with class="expand-container",      */
/* add code necessary to convert the div into a    */
/* collapsible area.                               */
/* ----------------------------------------------- */
/* Source:                                         */
/* https://alligator.io/css/collapsible/           */
/* MIT License:                                    */
/* https://oss.ninja/mit?organization=Alligator.io */
/* ----------------------------------------------- */


function Do_ToggleSection() {
var d=document;
var divs=d.getElementsByTagName('div');
for (var i=0;i<divs.length;i++){
var divClass=new String(divs[i].className);
if (divClass.indexOf("expand-container")>-1){
var targetDiv = divs[i];
var targetTxt = new String(targetDiv.getAttribute("toggle"));
if (targetTxt=="null") {
targetTxt="Show/Hide";
} else {
targetTxt="Show/Hide " + targetTxt;
}
var targetChk = new String(targetDiv.getAttribute("checked"));
if (targetChk=="null") {
targetChk="";
} else {
targetChk=' checked="checked"';
}
var targetStr = new String(targetDiv.innerHTML);
targetStr='<input id="collapsible'+i.toString()+'" class="toggle" type="checkbox"'+targetChk+'><label for="collapsible'+i.toString()+'" class="lbl-toggle">'+targetTxt+'</label><div class="collapsible-content"><div class="content-inner">' + targetStr + '</div></div>';
targetDiv.innerHTML=targetStr;
}//can expand
}//for i
}//function


/* -------------------------------------------- */
/* -------------------------------------------- */
/* --           Copy Navigation:            --- */
/* --  The More/Previous/Next buttons need  --- */
/* --    to appear at the top and bootom.   --- */
/* -------------------------------------------- */
/* -------------------------------------------- */


function Do_CopyNavigation() {
var d=document;
var targetDiv=d.getElementById('blog-pager');
var destinationDiv=d.getElementById('navigation_container');
if ((String(targetDiv)!='null') && (String(destinationDiv)!='null')){
destinationDiv.innerHTML=targetDiv.innerHTML;
}
}//function


/* -------------------------------------------- */
/* -------------------------------------------- */
/* --             Snippet Ribbon            --- */
/* -------------------------------------------- */
/* -------------------------------------------- */


function Do_SnippetRibbon() {
var d=document;
var articles=d.getElementsByTagName('article');
for (var i=0;i<articles.length;i++){

var articleDivs=articles[i].getElementsByTagName("div");
var isSnippet=-1;
for (var k=0;k<articleDivs.length;k++){
if (articleDivs[k].className=="snippet-item r-snippetized") {
isSnippet=k;
break;
}}

if (isSnippet>-1) {
var ribbonName="";
var labelContainer = articleDivs[isSnippet].getElementsByTagName('a');
if (labelContainer.length > 0) {

var searchItem = new String(labelContainer[0].getAttribute("href"));
ribbonName="";
var isFound=0;
if ((searchItem!='undefined') && (searchItem!='null') && (searchItem!='')) {
if (isFound==0){
for (var co=0;co<ot.length;co++){
if (ot[co].w==searchItem) {ribbonName=ot[co].l;isFound=1;break;}
}}
if (isFound==0){
for (var cm=0;cm<ms.length;cm++){
if (ms[cm].w==searchItem) {ribbonName=ms[cm].l;isFound=1;break;}
}}
if (isFound==0){
for (var ca=0;ca<an.length;ca++){
if (an[ca].w==searchItem) {ribbonName=an[ca].l;isFound=1;break;}
}}
}
}
if ((ribbonName=='undefined') || (ribbonName=='null') || (ribbonName=='')) {
ribbonName="Anime";
}
var ra = document.createElement("a");

switch (ribbonName.replace("@","").replace(" ","")) {
case "Theater":
ra.setAttribute("href", "https://aarg.blogspot.com/search/label/At%20The%20Theater?max-results=7");
break;
case "Convention":
ra.setAttribute("href", "https://aarg.blogspot.com/search/label/Conventions?max-results=7");
break;
case "Vintage":
ra.setAttribute("href", "https://aarg.blogspot.com/search/label/Vintage?max-results=7");
break;
case "Oddities":
ra.setAttribute("href", "https://aarg.blogspot.com/search/label/Oddities?max-results=7");
break;
case "Cartoons":
ra.setAttribute("href", "https://aarg.blogspot.com/search/label/Cartoons?max-results=7");
break;
case "TVSeries":
ra.setAttribute("href", "https://aarg.blogspot.com/search/label/TV%20Series?max-results=7");
break;
case "MusicVideo":
ra.setAttribute("href", "https://aarg.blogspot.com/search/label/Music%20Video?max-results=7");
break;
case "HowTo":
ra.setAttribute("href", "https://aarg.blogspot.com/search/label/How%20To?max-results=7");
break;
case "AboutMe":
ra.setAttribute("href", "https://aarg.blogspot.com/search/label/About%20Me?max-results=7");
break;
case "Gaming":
ra.setAttribute("href", "https://aarg.blogspot.com/search/label/Gaming?max-results=7");
break;
case "News":
ra.setAttribute("href", "https://aarg.blogspot.com/search/label/Industry%20News?max-results=7");
break;
default:
ra.setAttribute("href", "https://aarg.blogspot.com/p/anime-list.html");
}

ra.setAttribute("title", "List " + ribbonName);

var oc = document.createElement("div");
oc.setAttribute("class", "ribbon_container");
var bx = document.createElement("div");
bx.setAttribute("class", "ribbon_outer_container");
var dv = document.createElement("div");
dv.setAttribute("class", "ribbon_inner_container");
var ic = document.createElement("div");
if (ribbonName!="Anime") {
if (ribbonName=="How To") {
ic.setAttribute("class", "ribbon_tabs red");
} else {
ic.setAttribute("class", "ribbon_tabs green");
}
} else {
ic.setAttribute("class", "ribbon_tabs");
}
var sp = document.createElement("span");//empty span
var tx = document.createTextNode(ribbonName);
sp.appendChild(tx);//Add ribbon text to span
ra.appendChild(sp);//Add span to link = a href
ic.appendChild(ra);//Add link to wrapper = ribbon_tabs
dv.appendChild(ic);//Add wrapper to inner wrapper = ribbon_inner_container
bx.appendChild(dv);//Add inner wrapper to outer wrapper = ribbon_outer_container
oc.appendChild(bx);//Add everything to ribbon container = one ribbon
articles[i].insertBefore(oc, articles[i].childNodes[0]);//Add ribbon to snippet (article)
}}
}//function


/* -------------------------------------------- */
/* -------------------------------------------- */
/* --              Defer Images             --- */
/* -------------------------------------------- */
/* -------------------------------------------- */


function cleanStr(input) {
input=input.toLowerCase().trim();
input=input.replace(new RegExp("^[a][ ]", "g"),"");
return input;
}


function deferImages() {
var imgDefer = document.getElementsByTagName('img');
for (var i = 0; i < imgDefer.length; i++) {
if (imgDefer[i].getAttribute('data-src')) {
imgDefer[i].setAttribute('src',imgDefer[i].getAttribute('data-src'));
}}}


function deferSortThumbs() {
var d=document;
var divs=d.getElementsByTagName('div');
for (var p=0;p<divs.length;p++){
if (divs[p].className.indexOf('widget PopularPosts')>-1){

var popularposts=divs[p];
var pps=new String(popularposts);
if (pps!="undefined") {
var outer=popularposts.children;
var middle=outer[1].children;
var inner=middle[0].children;
var thumbs=inner[0].children;

var isDone=0;
do {
isDone=0;
for (var c=0;c<thumbs.length-1;c++){
var astr=new String(thumbs[c].innerText);
var bstr=new String(thumbs[c+1].innerText);
if (cleanStr(bstr)<cleanStr(astr)) {
thumbs[c+1].parentNode.insertBefore(thumbs[c+1], thumbs[c]);
isDone=1;
}
}//for
}
while (isDone==1)
}//if pps
break;
}}
}//function


function deferredActions() {
deferImages();
deferSortThumbs();
}//function

function Do_LastBits() {
var d=document;
var body=d.getElementsByTagName('body');
var onloadbody=new String(body[0].getAttribute("onload"));
if (onloadbody=="null") {body[0].setAttribute('onload', 'deferredActions();');} else {body[0].setAttribute('onload', onloadbody + ';deferredActions();');}

//Unhide tabs hidden in stylesheet
var pl2=d.getElementById("PageList2");
var pl2Str=new String(pl2);
if (pl2Str!="undefined") {
pl2.style.visibility="visible";
}
}


/* -------------------------------------------- */
/* -------------------------------------------- */
/* --             Main Program              --- */
/* -------------------------------------------- */
/* -------------------------------------------- */


function Do_BlogAARG_Main() {
if (an.length>0) {
Do_RestackArticles();
Do_PopularPosts();
Do_DateOverlays();
Do_CustomDateStamps();
Do_SnippetOverlay();
Do_RandomPosts();
Do_Ring("Anime", an);
Do_Ring("Mainstream", ms);
Do_Ring("Other", ot);
Do_RatingSnippet();
Do_RatingImageSubstitution();
Do_MusicRatings();
Do_BackgroundSquares();
Do_ToggleSection();
Do_CopyNavigation();
Do_SnippetRibbon();
Do_LastBits();
}}
