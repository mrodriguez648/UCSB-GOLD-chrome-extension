(function(){
    
    //chrome.storage.local.get(schdle);
    var schdle = [["CMPSC", "130A"],["CMPSC","130B"],["CHIN","32"]]

    let clickOption = function(searchString, selectClass){
	    let selectElement = $("select." + selectClass)[0];
	    selectElement.value = $("option:contains(" + searchString + ")", selectElement)[0].value;
	    if(selectElement.onchange){
		    selectElement.onchange();
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
                    }, 1000);
                }, 1000);
            }, 1000);
        })   
    }


    async function addBooks(schdle){
        for(var i = 0; i < schdle.length; i++){
            console.log(i)
            let something = await generatePromise(schdle[i][0], schdle[i][1]);
            console.log(something)
        }
        $("#ctl00_ctl00_Content_Content_btnGetCourseMaterials").click();
    };

    addBooks(schdle);


})();