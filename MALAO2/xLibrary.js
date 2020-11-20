//=============================
//Window construction functions
//=============================
function buildWindow(eleId, eleObj) {
	//Create div's
	var txt = ""
	for (var key in eleObj) {
		txt += "<div id=" + key + "></div>"
	};
	document.getElementById(eleId).innerHTML = txt;
	//Populate div's
	for (var key in eleObj) {
		var keyType = key.substring(0, key.length-1);
		switch (keyType) {
			case "header": buildHeader(key, eleObj[key]); break;
			case "main": buildWindow(key, eleObj[key]); break;
			case "footer": buildFooter(key, eleObj[key]); break;
			case "tabBar": buildTabBar(key, eleObj[key]); break;
			default: console.log("Ooops", key); break; 
		};
	};
};

function buildHeader(headerId, headerObj) {
	var txt = "";
	//Build the header container:  a w3-row split into thirds
	txt += "<div class='w3-row w3-card " + headerObj.class + "'>";
		//txt += "<div class='w3-third'><h3></h3></div>";
		//txt += "<div class='w3-third'><h3 class='w3-center' id=" + headerId + "Title" + ">" + headerObj.title + "</h3></div>";
		txt += "<h3 class='w3-center' id=" + headerId + "Title" + ">" + headerObj.title + "</h3>";
	txt += "</div>";
	document.getElementById(headerId).innerHTML = txt;
};

function buildFooter(footerID, footerObj) {
};

function buildTabBar(tabBarId, tabBarObj) {
	
	var txt = ""
	txt += "<div class='w3-bar w3-light-gray' style='min-height:30px'>";
	
	var txtList = "";
	for (var item in tabBarObj) {
		txtList += "<button id=" + item + " class='w3-bar-item w3-button w3-border tabBarItem' onClick='" + tabBarObj[item].function + "'>" + tabBarObj[item].title + "</button>";
	};
	txt += txtList;
	txt += "</div>";

	document.getElementById(tabBarId).innerHTML = txt;
};

//Function to select a tab bar topic
//	tabBar - Tab Bar object
//	itemId - Tab item element id
//	mainId - Window to display content in
//	functionName - Content display function to call
// *** If a tab button is hit multiple times in sequence, it will stay blue when another button is hit - need to loop until clear
function selectTabBarItem(tabBar, itemId, mainId, functionName) {

	for (var tab in eval(tabBar)) {
		if (tab == itemId) {
			document.getElementById(tab).className += " w3-hover-blue";
			document.getElementById(tab).className += " w3-blue";
		} else {
			document.getElementById(tab).className = document.getElementById(tab).className.replace(" w3-hover-blue","");
			document.getElementById(tab).className = document.getElementById(tab).className.replace(" w3-blue","");
		};
	};
/*	
	//Highlight the topic that currently is selected, and unhighlight all the others
	var itemList = document.getElementsByClassName("tabBarItem");
	for (var i = 0; i < itemList.length; i++) {
		if (itemList[i].id == itemId) {
			itemList[i].className += " w3-hover-blue";
			itemList[i].className += " w3-blue";
		} else {
		itemList[i].className = itemList[i].className.replace(" w3-hover-blue","");
		itemList[i].className = itemList[i].className.replace(" w3-blue","");
		};
	};
*/
	//Call the content display function
	var evalString = functionName + "('" + mainId + "')";
	eval(evalString);
};


//========================
// Dropdown menu functions
//========================
function buildDropDownMenuHTML(menuObj, windowId, windowFuncName) {
	//Unpack the menu definition object
	var menuIdBase = menuObj.menuIdBase; //Base name used in building the ID's for the menu button and menu list:  xButton, xList 
	var label = menuObj.label;	
	var menuList = eval(menuObj.menuList);	
	var selectedParam = menuObj.selectedParam;
	var selectedValue = eval(selectedParam);
	var selectFuncName = menuObj.selectFuncName;  //Function called when a menu item is selected
	
	//Build the menu list
	var txtList = "";
	for (var i = 0; i < menuList.length; i++) {
		var menuItem = menuList[i];
		var txtButton = "<button class='w3-bar-item w3-button' id='" + menuItem + "' onclick='" + selectFuncName + "(this, " + "\"" + selectedParam + "\",\"" + windowFuncName + "\",\"" + windowId + "\",\"" + menuIdBase + "\")'>" + menuItem + "</button>";
		txtList += txtButton;
	};

	//Build the menu button and append the menu list
	var txt = "";
	txt += "<div class='w3-bar-item w3-center'>";
		txt += "<h4 class='w3-center'>" + label + "</h4>"; 
		txt += "<div class='w3-dropdown-hover'>";
			txt += "<button id='" + menuIdBase + "Button' class='w3-button w3-blue w3-text-white' onclick='toggleMenuList(\"" + menuIdBase + "\")'>"+ selectedValue + "  &#9660</button>";
			txt += "<div id='" + menuIdBase + "List' class='w3-dropdown-content w3-bar-block w3-border' style='display:none'>";
				txt += txtList;
			txt += "</div>";
		txt += "</div>";
	txt += "</div>";
	return txt;
};

//Function to toggle display of the drop-down menu menu list.
function toggleMenuList(menuIdBase) {
	var menuListId = menuIdBase + "List";
	if (document.getElementById(menuListId).style.display == "block") {
		document.getElementById(menuListId).style.display = "none";
	} else {
		document.getElementById(menuListId).style.display = "block";
	};
};

//Function to process a drop down menu item selection
function selectDropDownItem(eleId, paramName, windowFuncName, windowId, menuIdBase) {
	var value = eleId.innerHTML;
	eval(paramName + "= value");
	
	//Close the subject menu 
	document.getElementById(menuIdBase + "List").style.display= "none";
	
	//Update the window
	var evalString = windowFuncName + "('" + windowId + "')";
	eval(evalString);
};


//============================
// Checkbox Group Functions
//============================
function buildCheckBoxGroupHTML(menuObj, windowId, windowFuncName) {
	//Unpack the menu definition object.  Refer to buildDropDownMenutHTML for the descriptions
	var menuIdBase = menuObj.menuIdBase; 
	var menuList = eval(menuObj.menuList);
	var selectedParam = menuObj.selectedParam;
	var selectedValue = eval(selectedParam);
	var selectFuncName = menuObj.selectFuncName;  
	var style = menuObj.style;
	var width = 'm2';
	if (menuObj.hasOwnProperty('width')) {
		width = menuObj.width;
	};
	
	var txt = "";
	txt += "<div class='w3-row'>";
	for (var i = 0; i < menuList.length; i++) {
		var checkBoxName = menuList[i];
		var checkBoxStatus = "";
		if (selectedValue.indexOf(checkBoxName) != -1) {
			checkBoxStatus = "checked";
		};
		var eleId = menuIdBase + checkBoxName;
		txt += "<div style='" + style + "'>"
		//txt += "<div class='w3-col " + width + "'>";
		var txtInput = "<input class='w3-check' type='checkbox' id='" + eleId + "' name='" + checkBoxName + "' onclick= '" + selectFuncName + "(\""+ eleId +"\",\"" + selectedParam +  "\",\"" + windowFuncName + "\",\"" + windowId + "\")' " +  checkBoxStatus + ">";
		//console.log(txtInput);
		txt += txtInput;
		txt += "<label for='" + eleId + "'> " + checkBoxName + "</label>";
		txt += "</div>";
	};
	txt += "</div>";
	return txt;
};

//Function to process a checkbox input selection/deselection
function selectCheckBox(eleId, paramName, windowFuncName, windowId) {
	var checkBoxStatus = document.getElementById(eleId).checked;
	var param = document.getElementById(eleId).name;
	
	var pList = eval(paramName);
	
	
	if (checkBoxStatus) {
		pList.push(param);
	} else {
		var index = pList.indexOf(param);
		if (index != -1) {
			pList.splice(index, 1);
		};
	};
	
	//Update the window
	var evalString = windowFuncName + "('" + windowId + "')";
	eval(evalString);
};

//=============================
// Radio Button Group Functions
//=============================
function buildRadioBtnGroupHTML(menuObj, windowId, windowFuncName) {
	//Unpack the menu definition object.  Refer to buildDropDownMenutHTML for the descriptions
	var menuIdBase = menuObj.menuIdBase; 
	var menuList = eval(menuObj.menuList);
	var selectedParam = menuObj.selectedParam;
	var selectedValue = eval(selectedParam);
	var selectFuncName = menuObj.selectFuncName;  
	var width = 'm2';
	if (menuObj.hasOwnProperty('width')) {
		width = menuObj.width;
	};
	var style = menuObj.style;
		
	var txt = "";
	txt += "<div class='w3-row'>";
	for (var i = 0; i < menuList.length; i++) {
		var checkBoxName = menuList[i];
		var checkBoxStatus = "";
		if (selectedValue == checkBoxName) {
			checkBoxStatus = "checked";
		};
		var eleId = menuIdBase + checkBoxName;

		txt += "<div style='" + style + "'>"
		//txt += "<div class='w3-col " + width + "'>";
		var txtInput = "<input class='w3-radio' type='radio' id='" + eleId + "' value='" + checkBoxName + "' onclick= '" + selectFuncName + "(\""+ eleId +"\",\"" + selectedParam +  "\",\"" + windowFuncName + "\",\"" + windowId + "\")' " +  checkBoxStatus + ">";
		txt += txtInput;
		txt += "<label for='" + eleId + "'> " + checkBoxName + "</label>";
		txt += "</div>";
	};
	txt += "</div>";
	
	return txt;
};

//Function to process radio button selection
function selectRadioBtn(eleId, paramName, windowFuncName, windowId) {
	var value = document.getElementById(eleId).value;
	eval(paramName + "= value");
	
	//Update the window
	var evalString = windowFuncName + "('" + windowId + "')";
	eval(evalString);
};

//=====================
// Text Input functions
//=====================
function buildInputHTML(inputObj, windowId, windowFuncName) {
	var inputId = inputObj.inputId
	var label = inputObj.label;
	var style = inputObj.style;
	var paramName = inputObj.paramName;
	var paramValue = eval(paramName);
	var inputFuncName = inputObj.inputFuncName;  
	
	var txt = "";
	txt += "<div style='" + style + "'>"
		txt += "<h4 class='w3-center'>" + label + "</h4>"; 
		txt += "<input class='w3-input w3-border w3-center w3-text-blue' id=" + inputId + " value=" + paramValue + " onchange='" + inputFuncName + "(\"" + inputId + "\",\"" + paramName + "\",\"" + windowFuncName + "\",\"" + windowId + "\")'></input>";
	txt += "</div>"
	return txt;
};

function selectInput(eleId, paramName, windowFuncName, windowId) {
	var value = document.getElementById(eleId).value;
	eval(paramName + '= value')
	
	//Update the window
	var evalString = windowFuncName + "('" + windowId + "')";
	eval(evalString);
};

//================
//Button Functions
//================
function buildBtnHTML(btnObj) {
	var btnId = btnObj.buttonId;
	var label = btnObj.label;
	var style = btnObj.style;
	var btnFuncName = btnObj.btnFuncName;
		
	var txt = "";
	txt += "<div style='" + style + "'>"
		txt += "<button class='w3-bar-item w3-button w3-blue w3-text-white' id='" + btnId + "' onclick='" + btnFuncName + "(\"" + btnId + "\")'>" + label + "</button>";
	txt += "</div>"
	return txt;
};

//Math Functions

//Calculate the average of an input vector.  If the fraction of nulls in the vector exceeds (1-qualityFactor), then return a null
function calcAve(inputVector, qualityFactor) {
	var sum = 0;
	var count = 0;
	for (var i = 0; i < inputVector.length; i++) {
		var value = inputVector[i];
		if (value != null) {
			sum += inputVector[i];
			count += 1;
		};
	};
	var average = null
	if (count >= inputVector.length * qualityFactor) {
		average = sum / count;
	};
	return average;
};

//Calculate the minimum of an input vector.  Return null only if all the elements in the vector are null (different than Math.min)
function calcMin(inputVector) {
	var min = null;
	for (var i = 0; i < inputVector.length; i++) {
		var value = inputVector[i];
		if (value != null && min == null) {
			min = value;
		} else if (value!= null && value < min) {
			min = value;
		};
	};
	return min;
};

//Find the index of a value in a vector that meets the specified threshold conditions
function findIndex(vector, threshold, type, position, startIndex) {
	var found = false;
	var index = startIndex;
	if (position == 'last') {
		while (!found && index >= 0){
			if ((type == 'below') && (vector[index] < threshold)) {
				found = true;
			} else if ((type == 'above') && (vector[index] > threshold)) {
				found = true; 
			} else {
				index -= 1;
			};
		};
	} else if (position == 'first') {
		while (!found && index < vector.length){
			if ((type == 'below') && (vector[index] < threshold)) {
				found = true;
			} else if ((type == 'above') && (vector[index] > threshold)) {
				found = true; 
			} else {
				index += 1;
			};
		};
	};
	if (!found) {
		index = null;
	};
	return index;
};

//Calculate a moving average vector
function filtMoving(inputArr, FC) {
	var outputArr = Array(inputArr.length).fill(null);
	
	for (var i = FC; i < inputArr.length; i++) {
		var avg = 0;
		var count = 0
		for (var j = 0; j < FC; j++) {
			if (inputArr[i-j] != null) {
				avg += inputArr[i - j];
				count += 1;
			};
		};
		avg = avg/count;
		outputArr[i] = avg;
	};
	//Backfill the start of the vector
	//for (var i = 0; i < FC; i++) {
	//	outputArr[i] = outputArr[FC];
	//};
	//console.log(inputArr[inputArr.length-2], inputArr[inputArr.length-1], outputArr[outputArr.length-2], outputArr[outputArr.length-1]);
	return outputArr;
};

//Build the cumulative histogram of a vector of values
function buildCumHist(inputArr, bpArr) {
	var cumHistArr = [];
	for (var i = 0; i < bpArr.length; i++) {   
		var count = inputArr.filter(function (a) {
			return a>bpArr[i];
		}).length
		cumHistArr.push(count);
	};
	return cumHistArr;
};

//==========================
//Date Translation Functions
//===========================
function translateDate(dateString) {
	var year = dateString.substring(0, 4);
	var month = Number(dateString.substring(4, 6)) - 1;
	var day = dateString.substring(6, 8);
	var thisDate = new Date(year, month, day);
	return thisDate;
};

function translateDateToStr(thisDate) {
	var year = String(thisDate.getFullYear());
	var month = String(thisDate.getMonth() + 1);
	var date = String(thisDate.getDate());
	if (month.length == 1) {
		month = "0" + month;
	};
	if (date.length == 1) {
		date = "0" + date;
	};
	var dateStr = year + month + date;
	return dateStr;
};

//==========================
//Charting-Related Functions
//==========================
function buildChartDivHTML(eleId, title) {
	var txt = "";
	txt += "<div class='w3-container w3-card'>";
		txt += "<h4 class='w3-center'>" + title + "</h4>";
		txt += "<div id=" + eleId + "></div>"
	txt += "</div>";
	return txt;
};
	
//Utility function for drawing charts
function drawChart(table,options,type,eleId) {
	var data = new google.visualization.arrayToDataTable(table);
	switch (type) {
		case "scatter" : var chart = new google.visualization.ScatterChart(document.getElementById(eleId)); break;
		case "area" : var chart = new google.visualization.AreaChart(document.getElementById(eleId)); break;
		case "column" : var chart = new google.visualization.ColumnChart(document.getElementById(eleId)); break;
		case "combo" : var chart = new google.visualization.ComboChart(document.getElementById(eleId)); break;
		case "bar" : var chart = new google.visualization.BarChart(document.getElementById(eleId)); break;
		case "steppedArea" : var chart = new google.visualization.SteppedAreaChart(document.getElementById(eleId)); break;
		case "histogram" : var chart = new google.visualization.Histogram(document.getElementById(eleId)); break;
		case "geo" : var chart = new google.visualization.GeoChart(document.getElementById(eleId)); break;
		case "map" : var chart = new google.visualization.Map(document.getElementById(eleId)); break;
	};
	chart.draw(data,options)
};


