// JavaScript source code
// SB Hacks 2018 1/19/18 - 1/21/18 

var classTitles = $(".courseTitle > span")

var schdle = [];

let splitSchedule = function() {
	for(var i = 0; i < classTitles.length; i++) {
		var str = classTitles[i];
		var splitStr = str.split(" ").filter(word => word.length > 0 && word != "-");
		schdle[i] = [];
		schdle[i][0] = splitStr[0];
		schdle[i][1] = splitStr[1];
	}
}

let clickOption = function(searchString, selectClass){
	let selectElement = $("select." + selectClass)[0];
	selectElement.value = $("option:contains(" + searchString + ")", selectElement)[0].value;
	if(selectElement.onchange){
		selectElement.onchange();
	}
}

let addClasses = function() {

	let term = $(".select-term")[0]

	for(var i = 0; i < schdle.length; i++) {
		clickOption(term.textContent, "select-term");
		setTimeout(function () {
			clickOption(schdle[i][0], "select-dept");  
			setTimeout(function () {
				clickOption(schdle[i][1], "select-section");
				$("#ctl00_ctl00_Content_Content_courseSelect_btnAddCourseToList").click()  
			}, 1000);
		}, 1000);
	}

	$("#ctl00_ctl00_Content_Content_btnGetCourseMaterials").click();
}

splitSchedule();

window.location = 'http://www.ucsbstuff.com/SelectTermDept.aspx#?options=go_here';

$(document).ready(addClasses());
