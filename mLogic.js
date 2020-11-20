//Load google charts
google.charts.load('current', {'packages':['corechart', 'geochart', 'map'],         'mapsApiKey': 'AIzaSyChpNWWb2zP1mIjzZ7CU9pWJ7EAXPZ6AmE'});

buildWindow('window', uiWindowObj2);

//Load the station data files
var dataObj = {};
var fileLoadedCount = 0;
for (var i = 0; i < stationList.menu.length; i++) {
	var station = stationList.menu[i];
	var url1 = "data/" + station + ".js";
	fetch(url1).then(function(response) {
		response.text().then(function(text) {
			eval(text);
			fileLoadedCount += 1;
			if (fileLoadedCount == stationList.menu.length) {
				currentState.dataFilesLoaded = true;
			};
		});
	});
};

//Process the data
var processTimer = setInterval(function() {
	if (currentState.dataFilesLoaded) {
		clearInterval(processTimer);
		buildDataObj();
		buildDataObjExt();
		buildDataObjSumArr();
		currentState.dataFilesProcessed = true;
	};
}, 100);
	

//Open the first menu window
document.getElementById("tB201").click();
/*var stateTimer = setInterval(function() {
	if (currentState.dataFilesProcessed) {
		clearInterval(stateTimer);
		document.getElementById("tB201").click();
	};
}, 100);*/
	
function dispSummary(eleId) {
	var thisWindowFunc = arguments.callee.name;
	currentState.tabWindowFunc = thisWindowFunc;
	var txt = "";
	
	//Build the window header
	var title = "Summary";
	txt += "<div class='w3-row w3-card'>";
		txt += "<h3 class='w3-center'>" + title + "</h3>";
	txt += "</div>";

	//Build text and containers for charts
	txt += "<div class='w3-container'>";
		txt += "<br><p>This is the first summary text.</p><br>";
	txt += "</div>";
	
	txt += "<div class='w3-row'>";
		txt += "<br>";
		txt += "<div class='w3-col m6'>";
			var chartEleIdA = 'divChartA';
			txt += "<div class='w3-container'>";
				txt += buildChartDivHTML(chartEleIdA, "Five Decade Temperature Rise");
			txt += "</div>";
		txt += "</div>";
		txt += "<div class='w3-col m6'>";
			var chartEleIdC = 'divChartC';
			txt += "<div class='w3-container'>";
				txt += buildChartDivHTML(chartEleIdC, "Station Locations");
			txt += "</div>";
		txt += "</div>";
	txt += "</div>";
	txt += "<div class='w3-row'>";	
		txt += "<br>"
		txt += "<div class='w3-col m12'>";
			var chartEleIdD = 'divChartD';
			txt += "<div class='w3-container'>";
				txt += buildChartDivHTML(chartEleIdD, "Temperature Rise vs Population");
			txt += "</div>";
				var chartEleIdE = 'divChartE';
			txt += "<div class='w3-container'>";
				txt += buildChartDivHTML(chartEleIdE, "Decade Temperatures - Normalized to 1960's Average");
			txt += "</div>";
		txt += "</div>";
	txt += "</div>";
	
	document.getElementById(eleId).innerHTML =  "<br><br><div class='w3-container'>    Loading and processing the data (this may take a few seconds)</div>";
				
	var stateTimer2 = setInterval(function() {
		if (currentState.dataFilesProcessed) {
			clearInterval(stateTimer2);
			if (currentState.tabWindowFunc == thisWindowFunc) {
				document.getElementById(eleId).innerHTML = txt;
				summaryRiseChart(chartEleIdA);
				summaryMapChart(chartEleIdC);
				summaryXYChart(chartEleIdD);
				decadeNormChart2(chartEleIdE);
			};
		};
	}, 100);
};

function dispDecade(eleId) {
	var thisWindowFunc = arguments.callee.name;
	currentState.tabWindowFunc = thisWindowFunc;
	var txt = "";
	
	//Build the window header
	var title = "Decade";
	txt += "<div class='w3-row w3-card'>";
		txt += "<h3 class='w3-center'>" + title + "</h3>";
	txt += "</div>";
		
	//Build HTML for the radio and checkbox menu groups
	var txtStationRef = buildRadioBtnGroupHTML(stationRefRadioButObj, eleId, thisWindowFunc);
	var txtStation = buildCheckBoxGroupHTML(stationCheckBoxObj, eleId, thisWindowFunc);
	var txtParamRef = buildRadioBtnGroupHTML(paramAveRefRadioButObj, eleId, thisWindowFunc);
	var txtParam = buildCheckBoxGroupHTML(paramAveCheckBoxObj, eleId, thisWindowFunc);
	
	
	//Built the container for the input selection elements
	txt += "<div class='w3-row'>";
		txt += "<div class='w3-col m1'>";
			txt += "<br>";
			txt += "<h4 class='w3-left'>Ref</h4>";
			txt += txtStationRef;
			txt += "<br>";
			txt += "<h4 class='w3-left'>Ref</h4>";
			txt += txtParamRef;
		txt += "</div>";
		txt += "<div class='w3-col m1'>";
			txt += "<br>";
			txt += "<h4 class='w3-left'>plot</h4>";
			txt += txtStation;
			txt += "<br>";
			txt += "<h4 class='w3-left'>plot</h4>";
			txt += txtParam;
		txt += "</div>";
		
	
	//Build text and containers for charts
		txt += "<div class='w3-col m10'>";
			txt += "<br>";
			var chartEleIdA = 'divChartA';
			txt += "<div class='w3-container'>";
				txt += buildChartDivHTML(chartEleIdA, "Decade Temperatures");
			txt += "</div>";
			var chartEleIdB = 'divChartB';
			txt += "<div class='w3-container'>";
				txt += buildChartDivHTML(chartEleIdB, "Decade Temperatures - Normalized to 1960's");
			txt += "</div>";
		txt += "</div>";
	txt += "</div>";
	
	document.getElementById(eleId).innerHTML = txt;
	
	if (currentState.tabWindowFunc == thisWindowFunc) {
		decadeChart(chartEleIdA);
		decadeNormChart(chartEleIdB);
	};
};


function dispYearly(eleId) {
	var thisWindowFunc = arguments.callee.name;
	currentState.tabWindowFunc = thisWindowFunc;
	var txt = "";
	
	//Build the window header
	var title = "Yearly";
	txt += "<div class='w3-row w3-card'>";
		txt += "<h3 class='w3-center'>" + title + "</h3>";
	txt += "</div>";
		
	//Build HTML for the menu groups
	var txtStationRef = buildRadioBtnGroupHTML(stationRefRadioButObj, eleId, thisWindowFunc);
	var txtStation = buildCheckBoxGroupHTML(stationCheckBoxObj, eleId, thisWindowFunc);
	var txtParamRef = buildRadioBtnGroupHTML(paramAveRefRadioButObj, eleId, thisWindowFunc);
	var txtParam = buildCheckBoxGroupHTML(paramAveCheckBoxObj, eleId, thisWindowFunc);
	var txtParamMinMaxRef = buildRadioBtnGroupHTML(paramMinMaxRefRadioButObj, eleId, thisWindowFunc);
	var txtParamMinMax = buildCheckBoxGroupHTML(paramMinMaxCheckBoxObj, eleId, thisWindowFunc);
	var txtParamFreezeRef = buildRadioBtnGroupHTML(paramFreezeRefRadioButObj, eleId, thisWindowFunc);
	var txtParamFreeze = buildCheckBoxGroupHTML(paramFreezeCheckBoxObj, eleId, thisWindowFunc);
	
	//Built the the station selection menus
	txt += "<div class='w3-container w3-card'>";
		txt += "<div class='w3-container'>";
			txt += "<h4 class='w3-center'>Select Reference Station</h4>";
				txt += txtStationRef;
			txt += "<br>";
		txt += "</div>";
		txt += "<div class='w3-container'>";
			txt += "<h4 class='w3-center'>Select Comparison Stations</h4>";
				txt += txtStation;
			txt += "<br>";
		txt += "</div>";
	txt += "</div>";
	//Biuild the Yearly Temperature Averages Menu and Plot
	txt += "<div class='w3-container w3-card w3-row'>";	
		txt += "<div class='w3-col m1'>";		
			txt += "<h4 class='w3-left'>Ref</h4>";
			txt += txtParamRef;
		txt += "</div>";
		txt += "<div class='w3-col m1'>";
			txt += "<h4 class='w3-left'>Comp</h4>";
			txt += txtParam;
		txt += "</div>";
		txt += "<div class='w3-col m10'>";
			var chartEleIdA = 'divChartA';
			txt += "<div class='w3-container'>";
				txt += buildChartDivHTML(chartEleIdA, "Yearly Average Temperatures");
			txt += "</div>";
		txt += "</div>";
	txt += "</div>";
	//Build the Yearly Temperature Min/Max Menu and Plot
	txt += "<div class='w3-container w3-card w3-row'>";	
		txt += "<div class='w3-col m1'>";		
			txt += "<h4 class='w3-left'>Ref</h4>";
			txt += txtParamMinMaxRef;
		txt += "</div>";
		txt += "<div class='w3-col m1'>";
			txt += "<h4 class='w3-left'>Comp</h4>";
			txt += txtParamMinMax;
		txt += "</div>";
		txt += "<div class='w3-col m10'>";
			var chartEleIdJ = 'divChartJ';
			txt += "<div class='w3-container'>";
				txt += buildChartDivHTML(chartEleIdJ, "Yearly Min/Max Temperatures");
			txt += "</div>";
		txt += "</div>";
	txt += "</div>";
	//Build the Yearly Event Date Menu and Plot
	txt += "<div class='w3-container w3-card w3-row'>";	
		txt += "<div class='w3-col m2'>";		
			txt += "<h4 class='w3-left'>Ref</h4>";
			txt += txtParamFreezeRef;
		//txt += "</div>";
		//txt += "<div class='w3-col m1'>";
			txt += "<h4 class='w3-left'>Comp</h4>";
			txt += txtParamFreeze;
		txt += "</div>";
		txt += "<div class='w3-col m10'>";
			var chartEleIdK = 'divChartK';
			txt += "<div class='w3-container'>";
				txt += buildChartDivHTML(chartEleIdK, "First/Last Freeze Dates");
			txt += "</div>";
		txt += "</div>";
	txt += "</div>";
	//Build the Yearly Data Quantity Plot
	txt += "<div class='w3-container w3-card w3-row'>";	
		txt += "<div class='w3-col m2'>";
			txt += "<p></p>";
		txt += "</div>";
		txt += "<div class='w3-col m10'>";
			var chartEleIdI = 'divChartI';
			txt += "<div class='w3-container'>";
				txt += buildChartDivHTML(chartEleIdI, "Yearly Data Quantity");
			txt += "</div>";
		txt += "</div>";
	txt += "</div>";
	
			
			var chartEleIdB = 'divChartB';
			txt += "<div class='w3-container'>";
				txt += buildChartDivHTML(chartEleIdB, "Delta from Mean");
			txt += "</div>";
			var chartEleIdC = 'divChartC';
			txt += "<div class='w3-container'>";
				txt += buildChartDivHTML(chartEleIdC, "Filtered Delta from Mean");
			txt += "</div>";
			var chartEleIdH = 'divChartH';
			txt += "<div class='w3-container'>";
				txt += buildChartDivHTML(chartEleIdH, "Station Comparison");
			txt += "</div>";
			var chartEleIdD = 'divChartD';
			txt += "<div class='w3-container'>";
				txt += buildChartDivHTML(chartEleIdD, "Spring Arrival");
			txt += "</div>";
			var chartEleIdE = 'divChartE';
			txt += "<div class='w3-container'>";
				txt += buildChartDivHTML(chartEleIdE, "Late Freeze Damage Risk");
			txt += "</div>";
			var chartEleIdF = 'divChartF';
			txt += "<div class='w3-container'>";
				txt += buildChartDivHTML(chartEleIdF, "First Freeze Date");
			txt += "</div>";
			var chartEleIdG = 'divChartG';
			txt += "<div class='w3-container'>";
				txt += buildChartDivHTML(chartEleIdG, "Last Freeze Date");
			txt += "</div>";
		txt += "</div>";
	txt += "</div>";
	
	document.getElementById(eleId).innerHTML = txt;

	if (currentState.tabWindowFunc == thisWindowFunc) {
		yearlyChart(chartEleIdA, paramListAve);
		yearlyChart(chartEleIdJ, paramListMinMax);
		yearlyDataQuantityChart(chartEleIdI);
		yearlyDateChart(chartEleIdK, paramListFreeze);
		yearlyDeltaChart(chartEleIdB);
		yearlyDeltaFiltChart(chartEleIdC);
		yearlyCompChart(chartEleIdH);
		yearlyFreezeChart(chartEleIdD);
		yearlyFreezeDmgRiskChart(chartEleIdE);
		yearlyFreezeChart2(chartEleIdF);
		yearlyFreezeChart3(chartEleIdG);
	};
};


function dispMonthly(eleId) {
	var thisWindowFunc = arguments.callee.name;
	currentState.tabWindowFunc = thisWindowFunc;
	var txt = "";
	
	//Build the window header
	var title = "Monthly";
	txt += "<div class='w3-row w3-card'>";
		txt += "<h3 class='w3-center'>" + title + "</h3>";
	txt += "</div>";
		
	//Build HTML for the radio and checkbox menu groups
	var txtStationRef = buildRadioBtnGroupHTML(stationRefRadioButObj, eleId, thisWindowFunc);
	var txtStation = buildCheckBoxGroupHTML(stationCheckBoxObj, eleId, thisWindowFunc);
	var txtParamRef = buildRadioBtnGroupHTML(paramAveRefRadioButObj, eleId, thisWindowFunc);
	var txtParam = buildCheckBoxGroupHTML(paramAveCheckBoxObj, eleId, thisWindowFunc);
	var txtMonth = buildCheckBoxGroupHTML(monthCheckBoxObj, eleId, thisWindowFunc);
	

	//Built the container for the input selection elements
	txt += "<div class='w3-row'>";
		txt += "<div class='w3-col m1'>";
			txt += "<br>";
			txt += "<h4 class='w3-left'>Ref</h4>";
			txt += txtStationRef;
			txt += "<br>";
			txt += "<h4 class='w3-left'>Ref</h4>";
			txt += txtParamRef;
		txt += "</div>";
		txt += "<div class='w3-col m1'>";
			txt += "<br>";
			txt += "<h4 class='w3-left'>plot</h4>";
			txt += txtStation;
			txt += "<br>";
			txt += "<h4 class='w3-left'>plot</h4>";
			txt += txtParam;
			txt += "<br>";
			txt += "<h4 class='w3-left'>Months</h4>";
			txt += txtMonth;
		txt += "</div>";
		
	//Build text and containers for charts
		txt += "<div class='w3-col m10'>";
			txt += "<br>";
			var chartEleIdA = 'divChartA';
			txt += "<div class='w3-container'>";
				txt += buildChartDivHTML(chartEleIdA, "Temperatures");
			txt += "</div>";
			var chartEleIdB = 'divChartB';
			txt += "<div class='w3-container'>";
				txt += buildChartDivHTML(chartEleIdB, "Delta from Mean");
			txt += "</div>";
			var chartEleIdC = 'divChartC';
			txt += "<div class='w3-container'>";
				txt += buildChartDivHTML(chartEleIdC, "Delta from Mean - Filtered");
			txt += "</div>";
		txt += "</div>";
	txt += "</div>";
	
	document.getElementById(eleId).innerHTML = txt;

	if (currentState.tabWindowFunc == thisWindowFunc) {
		monthlyChart(chartEleIdA);
		monthlyDeltaChart(chartEleIdB);
		monthlyDeltaFiltChart(chartEleIdC);
	};
};

//Function to Display temperatures tab
function dispDaily(eleId) {
	var thisWindowFunc = arguments.callee.name;
	currentState.tabWindowFunc = thisWindowFunc;
	var txt = "";
	
	//Build the window header
	var title = "Daily";
	txt += "<div class='w3-row w3-card'>";
		txt += "<h3 class='w3-center'>" + title + "</h3>";
	txt += "</div>";
			
	//Build HTML for the radio and checkbox menu groups
	var txtStation = buildCheckBoxGroupHTML(stationCheckBoxObj, eleId, thisWindowFunc);
	var txtStationRef = buildRadioBtnGroupHTML(stationRefRadioButObj, eleId, thisWindowFunc);
	var txtYear = buildCheckBoxGroupHTML(yearCheckBoxObj, eleId, thisWindowFunc);
	var txtYearRef = buildRadioBtnGroupHTML(yearRefRadioButObj, eleId, thisWindowFunc);
	var txtParam = buildCheckBoxGroupHTML(paramCheckBoxObj, eleId, thisWindowFunc);
	var txtParamRef = buildRadioBtnGroupHTML(paramRefRadioButObj, eleId, thisWindowFunc);
	
	//Built the container for the input selection elements
	txt += "<div class='w3-row'>";
		txt += "<div class='w3-col m1'>";
			txt += "<br>";
			txt += "<h4 class='w3-left'>Ref</h4>";
			txt += txtStationRef;
			txt += "<br>";
			txt += "<h4 class='w3-left'>Ref</h4>";
			txt += txtParamRef;
			txt += "<br>";
			txt += "<h4 class='w3-left'>Ref</h4>";
			txt += txtYearRef;
		txt += "</div>";
		txt += "<div class='w3-col m1'>";
			txt += "<br>";
			txt += "<h4 class='w3-left'>plot</h4>";
			txt += txtStation;
			txt += "<br>";
			txt += "<h4 class='w3-left'>plot</h4>";
			txt += txtParam;
			txt += "<br>";
			txt += "<h4 class='w3-left'>plot</h4>";
			txt += txtYear;
		txt += "</div>";
		
	
	//Build text and containers for charts
		txt += "<div class='w3-col m10'>";
			txt += "<br>";
			var chartEleIdA = 'divChartA';
			txt += "<div class='w3-container'>";
				txt += buildChartDivHTML(chartEleIdA, "Daily Temperatures");
			txt += "</div>";
			var chartEleIdE = 'divChartE';
			txt += "<div class='w3-container'>";
				txt += buildChartDivHTML(chartEleIdE, "Delta from Average");
			txt += "</div>";
			var chartEleIdF = 'divChartF';
			txt += "<div class='w3-container'>";
				txt += buildChartDivHTML(chartEleIdF, "Cumulative Delta from Average");
			txt += "</div>";
			var chartEleIdG = 'divChartG';
			txt += "<div class='w3-container'>";
				txt += buildChartDivHTML(chartEleIdG, "Cumulative Degree Days above 32 Deg F");
			txt += "</div>";
			var chartEleIdB = 'divChartB';
			txt += "<div class='w3-container'>";
				txt += buildChartDivHTML(chartEleIdB, "Histogram");
			txt += "</div>";
			var chartEleIdC = 'divChartC';
			txt += "<div class='w3-container'>";
				txt += buildChartDivHTML(chartEleIdC, "XY");
			txt += "</div>";
		txt += "</div>";
	txt += "</div>";
	
	document.getElementById(eleId).innerHTML = txt;

	if (currentState.tabWindowFunc == thisWindowFunc) {
		dailyChart(chartEleIdA);
		dailyDeltaChart(chartEleIdE);
		dailyDeltaSumChart(chartEleIdF);
		dailyDelta32SumChart(chartEleIdG);
		dailyHistChart(chartEleIdB);
		dailyXYChart(chartEleIdC);
	};
};

function dispCurrent(eleId) {
	var thisWindowFunc = arguments.callee.name;
	currentState.tabWindowFunc = thisWindowFunc;
	var txt = "";
	
	//Build the window header
	var title = "Current";
	txt += "<div class='w3-row w3-card'>";
		txt += "<h3 class='w3-center'>" + title + "</h3>";
	txt += "</div>";
		
	//Build the phenology case select dropdown menu HTML
	var txtStationRef = buildDropDownMenuHTML(stationRefMenuObj, eleId, thisWindowFunc);
	var txtDayRef = buildInputHTML(dayInputObj, eleId, thisWindowFunc);
	var txtDayMinRef = buildInputHTML(dayMinInputObj, eleId, thisWindowFunc);
	var txtDayMaxRef = buildInputHTML(dayMaxInputObj, eleId, thisWindowFunc);
	
	//Built the container for the input selection elements
	txt += "<div class='w3-row'>";
		txt += "<div class='w3-col m6'>";
			txt += txtStationRef;
		txt += "</div>";
		txt += "<div class='w3-col m6'>";
			txt += txtDayRef;
			txt += txtDayMinRef;
			txt += txtDayMaxRef;
		txt += "</div>";
	txt += "</div>";
	
	//Build text and containers for charts
	txt += "<div class='w3-row'>";
		txt += "<br>";
		txt += "<div class='w3-col m12'>";
			var chartEleIdA = 'divChartA';
			txt += "<div class='w3-container'>";
				txt += buildChartDivHTML(chartEleIdA, "Day");
			txt += "</div>";
		txt += "</div>";
	txt += "</div>";
	
	document.getElementById(eleId).innerHTML = txt;

	if (currentState.tabWindowFunc == thisWindowFunc) {
		dayHistChart(chartEleIdA);
	};
};


//Function to Display temperatures tab
function dispPhenology(eleId) {
	var thisWindowFunc = arguments.callee.name;
	currentState.tabWindowFunc = thisWindowFunc;
	var txt = "";
	
	//Build the window header
	var title = "Phenology";
	txt += "<div class='w3-row w3-card'>";
		txt += "<h3 class='w3-center'>" + title + "</h3>";
	txt += "</div>";

	//Build the phenology case select dropdown menu HTML
	var txtPhenology = buildDropDownMenuHTML(phenCaseMenuObj, eleId, thisWindowFunc);
	txt += "<br>";
	txt += txtPhenology;	
	
	txt += "<div class='w3-row'>";
	txt += "<br>";	
	//Build text and containers for charts
		txt += "<div class='w3-col m8'>";
			var chartEleIdG = 'divChartG';
			txt += "<div class='w3-container'>";
				var title = phenologyObj[phenologyList.selected].title + " Cases";
				txt += buildChartDivHTML(chartEleIdG, title);
			txt += "</div>";
			var chartEleIdH = 'divChartH';
			txt += "<div class='w3-container'>";
				var title =  phenologyObj[phenologyList.selected].title + " Trend";
				txt += buildChartDivHTML(chartEleIdH, title);
			txt += "</div>";
		txt += "</div>";
		txt += "<div class='w3-col m4'>";
			txt += "<div class='w3-container w3-card'>";
			if (phenologyObj[phenologyList.selected]. hasOwnProperty('image')) {
				txt += "<img src='" + phenologyObj[phenologyList.selected].image + "' width=100%>";
			};
			txt += "</div>";
		txt +="</div>";
	txt += "</div>";
	
	document.getElementById(eleId).innerHTML = txt;

	if (currentState.tabWindowFunc == thisWindowFunc) {
		phenologyChart(chartEleIdG);
		phenologyChart2(chartEleIdH);
	};
};

function dispFetchData(eleId) {
	var thisWindowFunc = arguments.callee.name;
	currentState.tabWindowFunc = thisWindowFunc;
	var txt = "";
	
	//Build the window header
	var title = "Fetch Data";
	txt += "<div class='w3-row w3-card'>";
		txt += "<h3 class='w3-center'>" + title + "</h3>";
	txt += "</div>";
	
	//Build station, year, and param text input elements and the fetch button
	var txtInputStation = buildInputHTML(stationInputObj, eleId, thisWindowFunc);
	var txtInputYear = buildInputHTML(yearInputObj, eleId, thisWindowFunc);
	var txtInputParam = buildInputHTML(paramInputObj, eleId, thisWindowFunc);
	var txtBtnFetchSample = buildBtnHTML(btnFetchSampleDataObj);
	var txtBtnFetchStation = buildBtnHTML(btnFetchStationDataObj);
	
	//Build the containers
	txt += "<div>"
		txt += txtInputStation;
		txt += txtInputYear;
		txt += txtInputParam;	
		txt += "<br>";
		txt += txtBtnFetchSample;
		txt += "<br>";
		txt += txtBtnFetchStation;
		txt += "<br>";
		txt += "<br><div id='fetchStatus'></div>";
		txt += "<br><div id='metaData'></div>";
		txt += "<br><div id='rawData'></div>";
	txt += "</div>";
	document.getElementById(eleId).innerHTML = txt;
};


//Function to display the get API data tab
function dispFetchStationData(eleId) {
	var thisWindowFunc = arguments.callee.name;
	currentState.tabWindowFunc = thisWindowFunc;
	var txt = "";
	
	//Build the window header
	var title = "Fetch Station Data";
	txt += "<div class='w3-row w3-card'>";
		txt += "<h3 class='w3-center'>" + title + "</h3>";
	txt += "</div>";
	
	var txtInputStation = buildInputHTML(stationInputObj, eleId, thisWindowFunc);
	
	//Build the containers
	txt += "<div>"
		txt += "<br>"
		txt += txtInputStation;
		txt += "<br><br>";
	txt += "</div>";
	txt += "<div id='apiStatus'></div>";
	txt += "<div id='apiStatus2'></div>";
	txt += "<div id='apiSummary'></div>";
	txt += "<div id='apiDataObj'></div>";
	document.getElementById(eleId).innerHTML = txt;

	//Clear and initialize the API data object
	dataObj = {};
	stationList.apiFetch = [sampleDataObj.station];
	for (var i = 0; i < stationList.apiFetch.length; i++) {
		var station = stationList.apiFetch[i];
		dataObj[station] = {};
		for (var j = 0; j < yearList.apiFetch.length; j++) {
			var year = yearList.apiFetch[j];
			dataObj[station][year] = {};
			for (var k = 0; k < paramList.apiFetch.length; k++) {
				var param = paramList.apiFetch[k];
				dataObj[station][year][param] = [];
			};
		};
	};
	
	//Run API Fetch state machine every second until the API fetches are complete
	var apiFetchCounter = apiFetchesTotal;
	var iStation = 0;
	var iYear = 0;
	var iParam = 0;
	var stationKey, stationId, year, param;
	currentState.apiFetchPending = false;
	var fetchWait = 0;
	var apiTimer = setInterval(function() {
		//If a fetch is not currently pending, then issue a new one
		if (!currentState.apiFetchPending) {
			stationKey = stationList.apiFetch[iStation];
			stationId = stationObj[stationKey].stationId;
			year = Number(yearList.apiFetch[iYear]);
			param = paramList.apiFetch[iParam];
			fetchData(stationKey, year, param);
			apiRequests += 1;
			currentState.apiFetchPending = true;
			apiFetchCounter -= 1;
			iParam += 1;
			if (iParam >= paramList.apiFetch.length) {
				iParam = 0;
				iYear += 1;
				if (iYear >= yearList.apiFetch.length) {
					iYear = 0;
					iStation += 1;
				};
			};
			fetchWait = 0;
		} else {
			fetchWait += 1;
			//console.log("Fetch Pending", fetchWait, iStation, iYear, iParam);
			if (fetchWait >= 5) {
				//fetchData(stationKey, year, param);
				//console.log("5+ Second Delay:", stationKey, year, param);
				fetchWait = 0;
			};
		};
		if (apiFetchCounter <= 0) {
			clearInterval(apiTimer);
		};
	}, 1000);
	
	//Process the API data once its all been received
	var stateTimer = setInterval(function() {
		if (currentState.apiFetchCount == apiFetchesTotal) {
			clearInterval(stateTimer);
			document.getElementById('apiStatus2').innerHTML = "<p>Done</p>";
		} else {
			document.getElementById('apiStatus2').innerHTML = "<p>" + stationKey + " - " + year + " - " + param + "</p>";
		};
		document.getElementById('apiStatus').innerHTML = "<p>API Fetch Count = " + currentState.apiFetchCount + " out of " +  apiFetchesTotal + " requests</p>";
	}, 1000);

	//Display the api data object after it has been created
	var stateTimer2 = setInterval(function() {
		if (currentState.apiFetchCount == apiFetchesTotal) {
			clearInterval(stateTimer2);
			if (currentState.tabWindowFunc == thisWindowFunc) {
				var txt = "";
				//txt += "<p>dataObjRaw = {</p>";
				for (var station in dataObj) {
					txt += "<p style = 'text-indent : 1em;'>" + "dataObj['" + station + "'] = {</p>";
					for (var year in dataObj[station]) {
						txt += "<p style = 'text-indent : 2em;'>" + year + " : {</p>";
						for (var param in dataObj[station][year]) {
							txt += "<p style = 'text-indent : 3em;'>" + param + " : [" + dataObj[station][year][param] + "],</p>";
						};
						txt += "<p style = 'text-indent : 2em;'>},</p>";
					};
					txt += "<p style = 'text-indent : 1em;'>};</p>";
				};
				//txt += "<p>};<p>";
				document.getElementById('apiDataObj').innerHTML = txt;
			};
		};
	}, 1000);

};


//Function to fetch API sample data
function fetchSampleData(stationKey, year, param) {
	var stationId = stationObj[stationKey].stationId;
	var url1 = 'https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&datatypeid=' + param + '&limit=1000&stationid='+stationId + '&startdate=' + year + '-01-01&enddate=' + year + '-12-31';
	var apiDateArr = [];
	var apiValueArr = [];
	document.getElementById('fetchStatus').innerHTML = stationKey + " " + year + " " + param + " Requested";
	document.getElementById('metaData').innerHTML = "";
	document.getElementById('rawData').innerHTML = "";
	var startTime = new Date();
	fetch(url1, headerObj).then(function (response) {
		response.text().then(function(text) {
			var endTime = new Date();
			var fetchTime = endTime.getTime() - startTime.getTime();
			document.getElementById('fetchStatus').innerHTML = stationKey + " " + year + " " + param + " Received.  Fetch Time = " + fetchTime + "ms";
			var apiDataArr = JSON.parse(text);
			document.getElementById('rawData').innerHTML = text;
			if (apiDataArr.hasOwnProperty('results')) {
				document.getElementById('metaData').innerHTML = "Length = " + apiDataArr['results'].length;
				for (var i = 0; i < apiDataArr['results'].length; i++) {
					var dateObj = new Date(apiDataArr['results'][i].date);
					var dateStr = translateDateToStr(dateObj);
					apiDateArr.push(dateStr);
					apiValueArr.push(apiDataArr['results'][i].value);
				};
				//Process the raw data into a standard time vector
				var sampleDataArr = Array(365).fill(null);
				for (var j = 0; j < dateArr.length; j++) {
					var dateObj = new Date(dateArr[j]);
					//dateObj.setDate(dateObj.getDate()-1);
					var dateStr = translateDateToStr(dateObj);
					dateStr = dateStr.replace('2019',year);
					var index = apiDateArr.indexOf(dateStr);
					if (index != -1) {
						var tempValue = apiValueArr[index] / 10 * 1.8 + 32;
						tempValue = Number(tempValue.toFixed(0));
						sampleDataArr[j] = tempValue;
					};
				};
				var metaDataText = document.getElementById('metaData').innerHTML;
				document.getElementById('metaData').innerHTML = metaDataText + ".  Jan 1 & 2 Data= " + sampleDataArr[0] + ", " + sampleDataArr[1] + ".  Dec 31 Data = " + sampleDataArr[364];
			};
		});
	});
};
//Function to fetch API data
function fetchData(stationKey, year, param) {
	var stationId = stationObj[stationKey].stationId;
	var url1 = 'https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&datatypeid=' + param + '&limit=1000&stationid='+stationId + '&startdate=' + year + '-01-01&enddate=' + (year) + '-12-31';
	var apiDateArr = [];
	var apiValueArr = [];
	if (startYear <= year) {
		//console.log("Requesting", stationKey, year, param);
		fetch(url1, headerObj).then(function (response) {
			response.text().then(function(text) {
				//console.log("Receiving", stationKey, year, param)
				//console.log("Text = ", text);
				var apiDataArr = JSON.parse(text);
				if (apiDataArr.hasOwnProperty('results')) {
					for (var i = 0; i < apiDataArr['results']. length; i++) {
						var dateObj = new Date(apiDataArr['results'][i].date);
						var dateStr = translateDateToStr(dateObj);
						apiDateArr.push(dateStr);
						apiValueArr.push(apiDataArr['results'][i].value);
					};
					//Process the raw data into a standard time vector
					//console.log("Processing", stationKey, year, param, apiDataArr['results'].length);
					dataObj[stationKey][year][param] = Array(365).fill(null);
					for (var j = 0; j < dateArr.length; j++) {
						var dateObj = new Date(dateArr[j]);
						//dateObj.setDate(dateObj.getDate()-1);
						var dateStr = translateDateToStr(dateObj);
						dateStr = dateStr.replace('2019',year);
						var index = apiDateArr.indexOf(dateStr);
						if (index != -1) {
							var tempValue = apiValueArr[index] / 10 * 1.8 + 32;
							tempValue = Number(tempValue.toFixed(0));
							dataObj[stationKey][year][param][j] = tempValue;
						};
					};
				};
				//Update the fetch count
				currentState.apiFetchCount += 1;
				currentState.apiFetchPending = false;
				//console.log("Finished", stationKey, year, param)
			});
		});
	} else {
		currentState.apiFetchCount += 1;
	};
};


//Function to calculate secondary parameters from the original API Data
function buildDataObj() {
		
	//Build the secondary daily parameters
	for (var i = 0; i < stationList.menu.length; i++) {
		var station = stationList.menu[i];
		if (!dataObj.hasOwnProperty(station)) {
			dataObj[station] = {};
		};
		for (var j = 0; j < yearArr.length; j++) {
			var year = yearArr[j];
			if (!dataObj[station].hasOwnProperty(year)) {
				dataObj[station][year] = {};
				dataObj[station][year].TMIN = [];
				dataObj[station][year].TMAX = [];
			};
			dataObj[station][year].TAVE = [];
			dataObj[station][year].TAVESum = [];
			if (dataObj[station][year].TMIN.length > 0 && dataObj[station][year].TMAX.length > 0) {
				for (var k = 0; k < dateArr.length; k++) {
					dataObj[station][year].TAVE[k] = null;
					if (dataObj[station][year].TMAX[k] == null) {
						//Explicitly set TMAX to null if it is blank
						dataObj[station][year].TMAX[k] = null;
					}
					if (dataObj[station][year].TMIN[k] != null && dataObj[station][year].TMAX[k] != null ) {
						dataObj[station][year].TAVE[k] =(dataObj[station][year].TMIN[k] + dataObj[station][year].TMAX[k])/2;
					};
					if (k==0) {
						dataObj[station][year].TAVESum = [dataObj[station][year].TAVE[k]];
					} else if (dataObj[station][year].TAVE[k] != null) {
						dataObj[station][year].TAVESum[k] = dataObj[station][year].TAVESum[k-1] +   dataObj[station][year].TAVE[k];
					};
				};
			};
		};
	};
	
	//Build the histogram vectors
	//for (var station in dataObj) {
	for (var i = 0; i < stationList.menu.length; i++) {
		var station = stationList.menu[i];
		dataObjHist[station] = {};
		for (var j = 0; j < yearArr.length; j++) {
			var year = yearArr[j];
			dataObjHist[station][year] = {};
			dataObjHist[station][year].TMAXHist = buildCumHist(dataObj[station][year].TMAX, histBPArr);
			dataObjHist[station][year].TMINHist = buildCumHist(dataObj[station][year].TMIN, histBPArr);
			dataObjHist[station][year].TAVEHist = buildCumHist(dataObj[station][year].TAVE, histBPArr);
		};
	};
};

//Build the extended data object
function buildDataObjExt() {
	//var startTime = new Date();

	//Clear and initialize the extended data object
	dataObjExt = {};
	for (var iStation = 0; iStation < stationList.menu.length; iStation++) {
		var station = stationList.menu[iStation];
		dataObjExt[station] = {};
		dataObjExt[station].day = {};
		dataObjExt[station].month = {};
		for (month in monthObj) {
			dataObjExt[station].month[month] = {};
		};
		dataObjExt[station].year = {};
		dataObjExt[station].decade = {};
	};
	var params = ['TMIN', 'TAVE', 'TMAX'];
	buildDayParams(params);
	//console.log("buildDayParams", new Date() - startTime);
	buildMonthParams(params);
	//console.log("buildMonthParams", new Date() - startTime);
	buildYearParams(params);
	//console.log("buildYearParams", new Date() - startTime);
	buildDecadeParams(params);
	//console.log("buildDecadeParams", new Date() - startTime);
};

function buildDayParams(params) {
	//Build the daily average parameters
	var numDays = dateArr.length;	
	//for (var station in dataObj) {
	for (var iStation = 0; iStation < stationList.menu.length; iStation++) {
		var station = stationList.menu[iStation];
		for (var i = 0; i < params.length; i++) {
			var param = params[i];
			dataObjExt[station].day[param + "Ave"] = Array(numDays).fill(null);
			for (var j = 0; j < dateArr.length; j++) {
				var vect = [];
				for (var year in dataObj[station]) {
					if (dataObj[station][year][param].length >= j) {
						vect.push(dataObj[station][year][param][j]);
					};
				};
				var ave = calcAve(vect, QFDayAve);
				ave = Math.round(ave);
				dataObjExt[station].day[param + "Ave"][j] = ave;
			};
		};
	};

	//Build the daily delta (to long-term average) and delta sum parameters for each day of each year. These vectors are inserted back into dataObj
	//for (var station in dataObj) {
	for (var iStation = 0; iStation < stationList.menu.length; iStation++) {
		var station = stationList.menu[iStation];
		for (var year in dataObj[station]) {
			//var params = ['TAVE'];
			for (var i = 0; i < params.length; i++) {
				var param = params[i];
				dataObj[station][year][param + "Delta"] = [];
				dataObj[station][year][param + "DeltaSum"] = [];
				dataObj[station][year][param + "Delta32Sum"] = [];
				var deltaSum = 0;
				var delta32Sum = 0;
				for (var j = 0; j < dataObj[station][year][param].length; j++) {
					var delta = null;
					var value = dataObj[station][year][param][j];
					var mean = dataObjExt[station].day[param+"Ave"][j];
					if (value != null & mean != null ) {
						delta = value - mean;
						deltaSum += delta;
						delta32Sum += Math.max(0, (value-32));
					};
					dataObj[station][year][param + "Delta"][j] = delta;
					dataObj[station][year][param + "DeltaSum"][j] = deltaSum;
					dataObj[station][year][param + "Delta32Sum"][j] = delta32Sum;
				};
			};
		};
	};
	//console.log(dataObj['Indy']['2012'].TAVEDeltaSum);
};


function buildMonthParams(params) {
	//Build the monthly parameters
	for (var iStation = 0; iStation < stationList.menu.length; iStation++) {
		var station = stationList.menu[iStation];
		//Calculate the monthly averages
		for (var month in monthObj) {
			for (var i = 0; i < params.length; i++) {
				var param = params[i];
				dataObjExt[station].month[month][param+'Ave'] = [];
				for (year in dataObj[station]) {
					var vect = [];
					for (var j = 0; j < monthObj[month].IR.length; j++){
						var index = monthObj[month].IR[j];
						vect.push(dataObj[station][year][param][index]);
					};
					var ave = calcAve(vect, QFMonthAve);
					dataObjExt[station].month[month][param +"Ave"].push(ave);
				};
			};
		};
		//Calculate the monthly averages of the averages
		for (var month in monthObj) {
			for (var i = 0; i < params.length; i++) {
				var param = params[i];
				var aveAve = calcAve(dataObjExt[station].month[month][param+"Ave"], QFMonthAveAve);
				dataObjExt[station].month[month][param+"AveAve"] = aveAve;
			};
		};
		//Calculate the delta from the average for each month of each year
		for (var month in monthObj) {
			for (var i = 0; i < params.length; i++) {
				var param = params[i];
				var numYears = dataObjExt[station].month[month][param+"Ave"].length;
				dataObjExt[station].month[month][param+"AveDelta"] = Array(numYears).fill(null);
				for (var j = 0; j < numYears; j++) {
					var ave = dataObjExt[station].month[month][param + "Ave"][j];
					var aveAve = dataObjExt[station].month[month][param + "AveAve"];
					if (ave != null && aveAve != null) {
						dataObjExt[station].month[month][param + "AveDelta"][j] = ave - aveAve;
					};
				};
			};
		};
		//Calculate a moving average of the monthly deltas
		for (var month in monthObj) {
			for (var i = 0; i < params.length; i++) {
				var param = params[i];
				dataObjExt[station].month[month][param + "AveDeltaFilt"] = filtMoving(dataObjExt[station].month[month][param + "AveDelta"], filterConstant);
			};
		};
	};
};

//Function to build the yearly parameters
function buildYearParams(params) {
	for (var station in dataObjExt) {
		//Calculate the yearly average vectors
		var numYears = yearArr.length;
		for (var i = 0; i < params.length; i++) {
			var param = params[i];
			dataObjExt[station].year[param + "Ave"] = Array(numYears).fill(null);
			for (var j = 0; j < numYears; j++) {
				var vect = [];
				for (month in dataObjExt[station].month) {
					var monthAve = dataObjExt[station].month[month][param + "Ave"][j];
					vect.push(monthAve);
				};
				var yearAve =calcAve(vect, QFYearAve);
				dataObjExt[station].year[param + "Ave"][j] = yearAve;
			};
		};
		//Calculate the averages of the yearly averages
		for (var i = 0; i < params.length; i++) {
			var param = params[i];
			var aveAve = calcAve(dataObjExt[station].year[param + "Ave"], QFYearAveAve);
			dataObjExt[station].year[param + "AveAve"] = aveAve;
		};
		//Calculate the yearly deltas from the averages
		for (var i = 0; i < params.length; i++) {
			var param = params[i];
			dataObjExt[station].year[param + "AveDelta"] = Array(numYears).fill(null);
			for (var j = 0; j < numYears; j++) {
				var ave = dataObjExt[station].year[param + "Ave"][j];
				var aveAve = dataObjExt[station].year[param + "AveAve"];
				if (ave != null &&  aveAve != null) {
					dataObjExt[station].year[param + "AveDelta"][j] = ave - aveAve;
				};
			};
		};
		//Calculate a moving average of the yearly deltas
		for (var i = 0; i < params.length; i++) {
			var param = params[i];
			dataObjExt[station].year[param + "AveDeltaFilt"] = filtMoving(dataObjExt[station].year[param + "AveDelta"], filterConstant);
		};
		//Calculate the freeze dates and freeze damage risk
		var midYearIndex = 183;
		dataObjExt[station].year["lastFreezeDate"] = Array(numYears).fill(null); 
		dataObjExt[station].year["firstFreezeDate"] = Array(numYears).fill(null); 
		dataObjExt[station].year["freezeDmgRisk"] = Array(numYears).fill(null); 
		dataObjExt[station].year["springArrives"] = Array(numYears).fill(null); 
		for (var j = 0; j < numYears; j++) {
			var year = Object.keys(dataObj[station])[j];
			var vector = dataObj[station][year].TMIN;
			var index = findIndex(vector, 32, 'below', 'last', midYearIndex);
			dataObjExt[station].year["lastFreezeDate"][j] = dateArr[index];
			var freezeDmgRisk = dataObj[station][year]["TAVEDelta32Sum"][index];
			dataObjExt[station].year["freezeDmgRisk"][j] = freezeDmgRisk;
			index = findIndex(vector, 32, 'below', 'first', midYearIndex);
			dataObjExt[station].year["firstFreezeDate"][j] = dateArr[index];
			vector = dataObj[station][year]["TAVEDelta32Sum"];
			index = findIndex(vector, springDegreeDays, 'above', 'first', 0);
			dataObjExt[station].year["springArrives"][j] = dateArr[index];
			
		};
		//Calculate the average freeze date parameters ** Eliminate this, or replace it with a regression fit
		var fDateArr = dataObjExt[station].year["firstFreezeDate"];
		var fDateMSArr = Array(numYears).fill(null);
		for (var i = 0; i < fDateArr.length ; i++) {
			if (fDateArr[i] != null) {
				fDateMSArr[i] = fDateArr[i].getTime();
			};
		}
		var fDateMSAve = calcAve(fDateMSArr, QFYearAveAve);
		var fDateAve = new Date();
		fDateAve.setTime(fDateMSAve);
		dataObjExt[station].year["firstFreezeDateAve"] = fDateAve; 

		//Calculate the data quantity - the number of days each year with both TMIN and TMAX values (excluding leap day)
		dataObjExt[station].year["dataQuantity"] = Array(numYears).fill(null);
		for (var j = 0; j < numYears; j++) {
			var year = Object.keys(dataObj[station])[j];
			var validCount = 0
			for (var k = 0; k < dataObj[station][year]["TAVE"].length; k++) {
				if (dataObj[station][year]["TAVE"][k] != null){
					validCount += 1;
				};
			};
			dataObjExt[station].year["dataQuantity"][j] = validCount;
		};
		// Calculate the minimum minimum and the maximum maximum
		dataObjExt[station].year["TMINMin"] = Array(numYears).fill(null);
		dataObjExt[station].year["TMAXMax"] = Array(numYears).fill(null);
		for (var j = 0; j < numYears; j++) {
			var year = Object.keys(dataObj[station])[j];
			var TMINMin = calcMin(dataObj[station][year]['TMIN']);
			var TMAXMax = Math.max(...dataObj[station][year]['TMAX'])
			dataObjExt[station].year["TMINMin"][j] = TMINMin;
			dataObjExt[station].year["TMAXMax"][j] = TMAXMax;
		};
	};
	//console.log(dataObjExt['MCA'].year.dataQuantity);
};

function buildDecadeParams(params) {
	//Build the decade parameters
	for (var station in dataObjExt) {
		var numDecades = decadeList.menu.length;
		for (var i = 0; i < params.length; i++) {
			var param = params[i];
			dataObjExt[station].decade[param + "Ave"] = Array(numDecades).fill(null);
			dataObjExt[station].decade[param + "AveMax"] = Array(numDecades).fill(null);
			dataObjExt[station].decade[param + "AveMin"] = Array(numDecades).fill(null);
			for (var j = 0; j < numDecades; j++) {
				var decade = Number(decadeList.menu[j]);
				var vect = [];
				var IR = [];
				for (var k = 0; k < yearList.menu.length; k++) {
					var year = Number(yearList.menu[k]);
					if (year >= decade && year < (decade + 10)) {
						vect.push(dataObjExt[station].year[param + "Ave"][k]);
					};
				};
				var decadeAve = calcAve(vect, QFDecadeAve);
				dataObjExt[station].decade[param + "Ave"][j] = decadeAve;
				dataObjExt[station].decade[param + "AveMax"][j] = Math.max(...vect);
				dataObjExt[station].decade[param + "AveMin"][j] = calcMin(vect);
			};
		};
	};
};

function buildDataObjSumArr() {
	dataObjSumArr = [];
	var params = ['TMIN', 'TAVE', 'TMAX'];
	for (station in dataObjExt) {
		var sumStationObj = {};
		sumStationObj.station = station;
		sumStationObj.pop = stationObj[station].pop;
		for (var i = 0; i < params.length; i++) {
			var param = params[i];
			var decadeArr = dataObjExt[station].decade[param + "Ave"];
			var tRiseDecades = null;
			var endValue = decadeArr[decadeArr.length-1];
			var startValue = decadeArr[2];
			if (endValue != null && startValue != null) {
				tRiseDecades = (endValue - startValue);
			}
			sumStationObj[param + "RiseDecades"] = tRiseDecades;
		};
		/*switch (true) {
			case sumStationObj['TAVERiseDecades'] == null: sumStationObj['marker'] = 'default'; break;
			case sumStationObj['TAVERiseDecades'] > 2.5: sumStationObj['marker'] = 'red'; break;
			case sumStationObj['TAVERiseDecades'] > 1.5: sumStationObj['marker'] = 'gold'; break;
			case sumStationObj['TAVERiseDecades'] > 0: sumStationObj['marker'] = 'green'; break;
			default: sumStationObj['marker'] = 'darkblue'; break;
		};*/
		switch (true) {
			case sumStationObj['pop'] > 500: sumStationObj['marker'] = 'red'; break;
			case sumStationObj['pop'] > 100: sumStationObj['marker'] = 'gold'; break;
			case sumStationObj['pop'] > 0: sumStationObj['marker'] = 'green'; break;
			default: sumStationObj['marker'] = 'darkblue'; break;
		}
		dataObjSumArr.push(sumStationObj);
	};
	//console.log(dataObjSumArr)
};

function selectFetchSampleDataBtn() {
	fetchSampleData(sampleDataObj.station, Number(sampleDataObj.year), sampleDataObj.param);
};
function selectFetchStationDataBtn() {
	dispFetchStationData('main2');
};

function regression(xVect, yVect) {
	//Calculate the vector averages
	var xSum = 0;
	var ySum = 0;
	var count = 0;
	for (var i = 0; i < xVect.length; i++) {
		if (xVect[i] != null && yVect[i] != null) {
			xSum += xVect[i];
			ySum += yVect[i];
			count += 1;
		};
	};
	var xAve = null;
	var yAve = null;
	if (count >= 1) {
		xAve = xSum / count;
		yAve = ySum / count;
	};
		
	//Calculate the slope
	var xyErrSum = 0;
	var xxErrSum = 0;
	for (var i = 0; i < xVect.length; i++) {
		if (xVect[i] != null && yVect[i] != null) {
			var xErr = xVect[i] - xAve;
			var yErr = yVect[i] - yAve;
			xyErrSum += xErr * yErr;
			xxErrSum += xErr * xErr;
		};
	};
	var slope = null;
	var intercept = null;
	if (xAve != null && yAve != null) {
		slope = xyErrSum / xxErrSum;
		intercept = yAve - slope * xAve;
	};
	
	var ssr = 0;	//Sum Squared Regression
	var sst = 0;	//Total Sum of Squares
	var count = 0;
	for (var i = 0; i < xVect.length; i++) {
		if (xVect[i] != null && yVect[i] != null) {
			var y = xVect[i] * slope + intercept;
			var residual = yVect[i] - y;
			var yErr = yVect[i] - yAve;
			ssr += residual * residual;
			sst += yErr * yErr;
		};
	};
	var rSquared = 1 - (ssr / sst);
	
	var output = {
		slope: slope,
		intercept: intercept,
		rSquared: rSquared,
	};
	
	return output;
};
