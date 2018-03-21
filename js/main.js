//declare objects
var jsonObj = [];
var resultItem = document.getElementsByClassName("items");
var homeLang 	= document.getElementsByClassName("home-lang");
var homeResult 	= document.getElementsByClassName("home-result");
var disVoca = document.getElementById("disVoca");
var btnResult = document.getElementById("btnResult");
var disPara = document.getElementById("disPara");
var disMeaning = document.getElementById("disMeaning");
var totalSeconds = 0;

//setting timer
function setTime() {
  totalSeconds++;
  disMeaning.innerHTML = totalSeconds;
  
}

//display page when it's selected
function displayPage(pageName){
	var page = document.getElementById(pageName);
	var listPage = document.getElementsByClassName("tabcontent");
	for(var i = 0; listPage.length > i; i++){
		listPage[i].style.display = "none";
	}
	page.style.display = "block";
	if(pageName == "home"){
		homeLang[0].style.display 		= "block";
		homeResult[0].style.display 	= "none";
	}
}

//add new word
function addNewWord(){
	var wordEng = document.getElementById("wordEng");
	var wordVn 	= document.getElementById("wordVn");
	
	//add new voca into json
	item = {};
	item["en"] 	= wordEng.value;
	item["vn"]	= wordVn.value;
	jsonObj.push(item);

	//display list of voca
	printVoca();

	//reset inputs
	wordEng.value 	= "";
	wordVn.value 	= "";
	wordEng.focus();

}

//print list of voca 
function printVoca(){
	var displayResult = "";
	for(var i = 0; jsonObj.length > i ; i++){
		displayResult += '<div class="word clearfix">';
		displayResult += '<div class="meaning">';
		displayResult += '<p class="word-en">'+ jsonObj[i].en +'</p>';
		displayResult += '<p class="word-vn">'+ jsonObj[i].vn +'</p>';
		displayResult += '</div>';
		displayResult += '<button id="btnDel" onclick="delVoca('+ i +')">Delete</button>';
		displayResult += '</div>';
		resultItem[0].innerHTML = displayResult;
	}
}

//delete selected voca
function delVoca(pos){

	if(pos == 0 && jsonObj.length == 1){
		resultItem[0].innerHTML = "";
		var para = document.createElement("p");
		para.textContent = "This list is empty";
		resultItem[0].appendChild(para);
	}else{
		jsonObj.splice(pos,1);
		printVoca();
	}
}


//setting language
function changeLang(lang){
	console.log('changeLang');
	homeLang[0].style.display 		= "none";
	homeResult[0].style.display 	= "block";
	displayWord(lang);

}

//display a word
//var id = setInterval(setTime, 1000)
var id;
function displayWord(lang){
	console.log('displayWord');
	var random = Math.floor(Math.random() * jsonObj.length);
	console.log(random);
	var rsVoca = lang == 'en' ?  jsonObj[random].en:jsonObj[random].vn;
	var meaningVoca = lang == 'en' ? jsonObj[random].vn:jsonObj[random].en;

	clearInterval(id);
	id = setInterval(setTime, 1000);
	disVoca.innerHTML = rsVoca;
	btnResult.addEventListener("click", function(){

		disPara.innerHTML = "Meaning";
		disMeaning.innerHTML = meaningVoca;
		clearInterval(id);
	});
	var btnNext = document.getElementById("btnNext");
	btnNext.addEventListener("click", function(){
		clearInterval(id);
		disPara.innerHTML = "Time";
		displayWord(lang);
	});


}





//checking list of voca is empty
window.onload = function() {
	if( jsonObj.length == 0){
		var para = document.createElement("p");
		para.textContent = "This list is empty";
		resultItem[0].appendChild(para);
	}
}