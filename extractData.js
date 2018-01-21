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

	chrome.storage.local.set({ "schdle": schdle });

	var url = "http://www.ucsbstuff.com/SelectTermDept.aspx";
	function changePage() {
	    var win = window.open(url, '_blank');
	    win.focus();
	}

	let button1HTML = '<tr><td class="selectCol1"><button type="button" style="width:100%; height:100%; margin:3px; background:#2280bf; border-radius: 5px; border: none; padding: 10px 15px; color:#fff; font-size : .95em; font-weight: 600;"> Click me to open textbook page in new window (GauchoBooks)  </button></td></tr>';
	let temp = $($.parseHTML(button1HTML));
	temp.click(changePage);
	let stuff = $("div.fr.fullwidthmobile").prepend(temp);

})();