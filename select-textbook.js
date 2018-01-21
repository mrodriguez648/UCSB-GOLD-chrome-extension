let clickOption = function(searchString, selectClass){
	let selectElement = $("select." + selectClass)[0];
	selectElement.value = $("option:contains(" + searchString + ")", selectElement)[0].value;
	if(selectElement.onchange){
		selectElement.onchange();
	}
}
clickOption("WINTER 18", "select-term");
setTimeout(function () {
	clickOption("CMPSC", "select-dept");  
	setTimeout(function () {
		clickOption("130A", "select-section");
		$("#ctl00_ctl00_Content_Content_courseSelect_btnAddCourseToList").click()  
	}, 1000);
}, 1000);
