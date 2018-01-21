(function(){
    
    console.log("start");

    let clickOption = function(searchString, selectClass){
        console.log("clicking...");
        let selectElement = $("select." + selectClass)[0];
        let element = $("option:contains(" + searchString + ")", selectElement);
        if( element.length == 0){
            console.log("doesnt exist here")
            return false;
        }
        selectElement.value = element[0].value;
	    var event = new Event('change');
	    if(selectElement.dispatchEvent(event) == true){
            console.log("onchange...");
            selectElement.dispatchEvent(event);
	    }else{
            console.log("nochange");
	    }
	    return true;
    }

    let generatePromise = function (department, clas) {
        return new Promise( function (resolve){
            clickOption("18", "select-term");
            console.log("select-term")
            setTimeout(function () {
                clickOption(department, "select-dept");
                console.log("select-dept" + department)
                setTimeout(function () {
                    if(clickOption(clas, "select-section") == false){
                        resolve("doesnt exist");
                        return;
                    }
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
    }, 4000);
    console.log("done");
})();