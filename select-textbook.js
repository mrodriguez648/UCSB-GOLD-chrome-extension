(function(){
    
    console.log("start");

    let clickOption = function(searchString, selectClass){
        console.log("clicking...");
	    let selectElement = $("select." + selectClass)[0];
	    selectElement.value = $("option:contains(" + searchString + ")", selectElement)[0].value;
	    if(selectElement.onchange){
            console.log("onchange...");
		    selectElement.onchange();
	    }else{
            console.log("nochange");
        }
    }

    let generatePromise = function (department, clas) {
        return new Promise( function (resolve){
            clickOption("WINTER 18", "select-term");
            console.log("select-term")
            setTimeout(function () {
                clickOption(department, "select-dept");
                console.log("select-dept" + department)
                setTimeout(function () {
                    clickOption(clas, "select-section");
                    console.log("select-sect" + clas)
                    $("#ctl00_ctl00_Content_Content_courseSelect_btnAddCourseToList").click();
                    setTimeout(function(){
                        resolve(department + clas);
                    }, 2000);
                }, 2000);
            }, 2000);
        })   
    }


    async function addBooks(schdle){
        console.log("adding " + schdle.length + " book...");
        for(var i = 0; i < schdle.length; i++){
            console.log(i)
            let something = await generatePromise(schdle[i][0], schdle[i][1]);
            console.log(something)
        }
        $("#ctl00_ctl00_Content_Content_btnGetCourseMaterials").click();
    };

    setTimeout(function(){
        chrome.storage.local.get("schdle", function(data){
            console.log(data.schdle);
            addBooks(data.schdle);
        });
    }, 8000);
    console.log("done");
})();