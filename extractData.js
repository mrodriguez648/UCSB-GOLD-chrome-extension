// JavaScript source code
// SB Hacks 2018 1/19/18 - 1/21/18 
(function(){
	
	var classTitles = $(".courseTitle > span")

	var schdle = [];

	for(var i = 0; i < classTitles.length; i++) {
		var str = classTitles[i];
		var splitStr = str.textContent.split(" ").filter(word => word.length > 0 && word != "-");
		schdle[i] = [];
		schdle[i][0] = splitStr[0];
		schdle[i][1] = splitStr[1];
	}

	chrome.storage.local.set({"schdle":schdle});

})();