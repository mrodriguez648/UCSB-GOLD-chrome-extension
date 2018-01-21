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
            clickOption("Order Now", "select-term");
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

    let startScript = function(){
        chrome.storage.local.get("schdle", function(data){
            console.log(data.schdle);
            addBooks(data.schdle);
        });
    }
    window.startScript = startScript;
    console.log("done");

    let buttonHTML = '<tr><td class="selectCol1"><button type="button" style="width:100%; height:130%;margin:3px; background:#3498DB; border-radius: 5px; padding:0.7rem 1.5rem; color:#fff; font-size : 20px;"> Click me to run extension. Will use last GOLD data you opened </button></td></tr>';
    let temp = $($.parseHTML(buttonHTML));
    temp.click(startScript);
    let stuff = $("table.tblCourseSelect > tbody").prepend(temp);
    

})();
