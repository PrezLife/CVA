function dayHistChart(eleId) {
	//Build the station, year, and parameter lists
	var station = stationList.reference;
	var paramArr = ['TMAX', 'TMIN'];
	//var dayIndex = 300;
	
	//Find the day
	var found = false;
	var dayIndex = 0;
	var dayObj = translateDate(dayList.reference);
	var month = dayObj.getMonth();
	var day = dayObj.getDate();
	while (!found){
		if (month == dateArr[dayIndex].getMonth() && day == dateArr[dayIndex].getDate()) {
			found = true;
		} else {
			dayIndex += 1;
		};
	};
	
	var day = String(dateArr[dayIndex].getMonth() + 1) + "/" + String(dateArr[dayIndex].getDate());
		
	//Build the chart array
	var chartArray = [];
	chartArray[0] = ["Year"]
	for (var j = 0; j < paramArr.length; j++) {
		chartArray[0].push(station + "-" + day + "-" + paramArr[j]);
	};
		
	for (var i = 0; i < Object.keys(dataObj[station]).length; i++) {
		var year = Object.keys(dataObj[station])[i];
		chartArray[i+1] = [year];
		for (var j = 0; j < paramArr.length; j++) {
			var param = paramArr[j];
			chartArray[i+1].push(dataObj[station][year][param][dayIndex]);
		};
	};
	
	var chartOptions = {
		height: 300,
		chartArea: {
			top: 20,
			height: "80%",
			width: "80%",
		},
		legend: {
			position: 'top',
		},
		vAxis: {
			//title: 'kWh',
		},
		hAxis : {
			//format: 'M/d',
			viewWindow: {
				min: -50,
				max: 100,
			},
		},
		pointsVisible: false,
		lineWidth: 2,
		series : {
			0 : {color:"Black"},
			//1 : {color:"Green"},
		},
		histogram: {bucketSize: 5},
	};
	//Create the chart
	var chartType = "histogram";
	google.charts.setOnLoadCallback(function(){drawChart(chartArray, chartOptions, chartType, eleId)});
};

function dailyChart(eleId) {
	//Build the station, year, and parameter lists
	var stationArr = stationList.comp.slice();
	stationArr.unshift(stationList.reference);
	var yearArr = yearList.comp.slice();
	yearArr.unshift(yearList.reference);
	var paramArr = paramList.comp.slice();
	paramArr.unshift(paramList.reference);
		
	//Build the chart array
	var chartArray = [];
	chartArray[0] = ["Date"];
	for (var j = 0; j < stationArr.length; j++) {
		var station = stationArr[j];
		for (var k = 0; k < yearArr.length; k++) {
			var year = yearArr[k];
			for (var l = 0; l < paramArr.length; l++) {
				var param = paramArr[l];
				if (dataObj[station][year][param].length != 0) {
					chartArray[0].push(station + "-" + year + "-" + param);
					chartArray[0].push({role : 'tooltip'});
					chartArray[0].push(station + "-" + param + "Ave");
					chartArray[0].push({role : 'tooltip'});
				};
			};
		};
	};
	
	for (var i = 0; i < dateArr.length; i++) {
		chartArray[i+1] = [dateArr[i]];
		var dateString = dateArr[i].toLocaleString(undefined, {
			month: "short", day: "numeric"});
		for (var j = 0; j < stationArr.length; j++) {
			var station = stationArr[j];
			for (var k = 0; k < yearArr.length; k++) {
				var year = yearArr[k]
				for (var l = 0; l < paramArr.length; l++) {
					var param = paramArr[l];
					if (dataObj[station][year][param].length != 0) {
						chartArray[i+1].push(dataObj[station][year][param][i]);
						chartArray[i+1].push(dateString + ": " +  dataObj[station][year][param][i]);
						chartArray[i+1].push(dataObjExt[station]. day[param + "Ave"][i]);
						chartArray[i+1].push(dateString + ": " +  dataObjExt[station].day[param + "Ave"][i]);
					};
				};
			};
		};
	};
	
	//Check chartArray validity and fix if necessary
	if (chartArray[0].length <= 1) {
		chartArray = [];
		chartArray[0] = ['Date', 'value', {role:'annotation'}]
		chartArray[1] = [dateArr[0], 0, 'No Data'];
	};

	var chartOptions = {
		height: 300,
		chartArea: {
			top: 20,
			height: "80%",
			width: "80%",
		},
		legend: {
			position: 'top',
		},
		vAxis: {
			title: 'Deg F',
		},
		hAxis : {
			format: 'MMM',
			viewWindow: {
				//min: trendPlotStart,
				//max: trendPlotEnd,
			},
		},
		pointsVisible: false,
		lineWidth: 2,
		series : {
			0 : {color:"Black"},
			//1 : {color:"Green"},
		},
	};
	//Create the chart
	var chartType = "scatter";
	google.charts.setOnLoadCallback(function(){drawChart(chartArray, chartOptions, chartType, eleId)});
};

function dailyDeltaChart(eleId) {
	//Build the station, year, and parameter lists
	var stationArr = stationList.comp.slice();
	stationArr.unshift(stationList.reference);
	var yearArr = yearList.comp.slice();
	yearArr.unshift(yearList.reference);
	var paramArr = paramList.comp.slice();
	paramArr.unshift(paramList.reference);
		
	//Build the chart array
	var chartArray = [];
	chartArray[0] = ["Date"];
	for (var j = 0; j < stationArr.length; j++) {
		var station = stationArr[j];
		for (var k = 0; k < yearArr.length; k++) {
			var year = yearArr[k];
			for (var l = 0; l < paramArr.length; l++) {
				var param = paramArr[l];
				if (dataObj[station][year][param].length != 0) {
					chartArray[0].push(station + "-" + year + "-" + param + "Delta");
					chartArray[0].push({role : 'tooltip'});
				};
			};
		};
	};
	
	for (var i = 0; i < dateArr.length; i++) {
		chartArray[i+1] = [dateArr[i]];
		var dateString = dateArr[i].toLocaleString(undefined, {month: "short", day: "numeric"});
		for (var j = 0; j < stationArr.length; j++) {
			var station = stationArr[j];
			for (var k = 0; k < yearArr.length; k++) {
				var year = yearArr[k]
				for (var l = 0; l < paramArr.length; l++) {
					var param = paramArr[l];
					if (dataObj[station][year][param].length != 0) {
						chartArray[i+1].push(dataObj[station][year][param + "Delta"][i]);
						chartArray[i+1].push(dateString + ": " +  dataObj[station][year][param + "Delta"][i]);
					};
				};
			};
		};
	};

	var chartOptions = {
		height: 300,
		chartArea: {
			top: 20,
			height: "80%",
			width: "80%",
		},
		legend: {
			position: 'top',
		},
		vAxis: {
			title: 'Deg F',
		},
		hAxis : {
			format: 'MMM',
			viewWindow: {
				//min: trendPlotStart,
				//max: trendPlotEnd,
			},
		},
		pointsVisible: false,
		lineWidth: 2,
		areaOpacity: 0.5,
		series : {
			0 : {color:"Black"},
			//1 : {color:"Green"},
		},
	};
	//Create the chart
	var chartType = "steppedArea";
	google.charts.setOnLoadCallback(function(){drawChart(chartArray, chartOptions, chartType, eleId)});
};

function dailyDeltaSumChart(eleId) {
	//Build the station, year, and parameter lists
	var stationArr = stationList.comp.slice();
	stationArr.unshift(stationList.reference);
	var yearArr = yearList.comp.slice();
	yearArr.unshift(yearList.reference);
	var paramArr = paramList.comp.slice();
	paramArr.unshift(paramList.reference);
		
	//Build the chart array
	var chartArray = [];
	chartArray[0] = ["Date"];
	for (var j = 0; j < stationArr.length; j++) {
		var station = stationArr[j];
		for (var k = 0; k < yearArr.length; k++) {
			var year = yearArr[k];
			for (var l = 0; l < paramArr.length; l++) {
				var param = paramArr[l];
				if (dataObj[station][year][param].length != 0) {
					chartArray[0].push(station + "-" + year + "-" + param + "DeltaSum");
					chartArray[0].push({role : 'tooltip'});
				};
			};
		};
	};
	
	for (var i = 0; i < dateArr.length; i++) {
		chartArray[i+1] = [dateArr[i]];
		var dateString = dateArr[i].toLocaleString(undefined, {month: "short", day: "numeric"});
		for (var j = 0; j < stationArr.length; j++) {
			var station = stationArr[j];
			for (var k = 0; k < yearArr.length; k++) {
				var year = yearArr[k]
				for (var l = 0; l < paramArr.length; l++) {
					var param = paramArr[l];
					if (dataObj[station][year][param].length != 0) {
						chartArray[i+1].push(dataObj[station][year][param + "DeltaSum"][i]);
						chartArray[i+1].push(dateString + ": " +  dataObj[station][year][param + "DeltaSum"][i]);
					};
				};
			};
		};
	};

	var chartOptions = {
		height: 300,
		chartArea: {
			top: 20,
			height: "80%",
			width: "80%",
		},
		legend: {
			position: 'top',
		},
		vAxis: {
			title: 'Degree Days (Fahrenheit)',
			viewWindow: {
				//max: 2000,
			},
		},
		hAxis : {
			format: 'MMM',
			viewWindow: {
				//min: trendPlotStart,
				//max: trendPlotEnd,
			},
		},
		pointsVisible: false,
		lineWidth: 2,
		series : {
			0 : {color:"Black"},
			//1 : {color:"Green"},
		},
	};
	//Create the chart
	var chartType = "scatter";
	google.charts.setOnLoadCallback(function(){drawChart(chartArray, chartOptions, chartType, eleId)});
};

function dailyDelta32SumChart(eleId) {
	//Build the station, year, and parameter lists
	var stationArr = stationList.comp.slice();
	stationArr.unshift(stationList.reference);
	var yearArr = yearList.comp.slice();
	yearArr.unshift(yearList.reference);
	var paramArr = paramList.comp.slice();
	paramArr.unshift(paramList.reference);
		
	//Build the chart array
	var chartArray = [];
	chartArray[0] = ["Date"];
	for (var j = 0; j < stationArr.length; j++) {
		var station = stationArr[j];
		for (var k = 0; k < yearArr.length; k++) {
			var year = yearArr[k];
			for (var l = 0; l < paramArr.length; l++) {
				var param = paramArr[l];
				if (dataObj[station][year][param].length != 0) {
					chartArray[0].push(station + "-" + year + "-" + param + "Delta32Sum");
					chartArray[0].push({role : 'tooltip'});
				};
			};
		};
	};
	
	for (var i = 0; i < dateArr.length; i++) {
		chartArray[i+1] = [dateArr[i]];
		var dateString = dateArr[i].toLocaleString(undefined, {month: "short", day: "numeric"});
		for (var j = 0; j < stationArr.length; j++) {
			var station = stationArr[j];
			for (var k = 0; k < yearArr.length; k++) {
				var year = yearArr[k]
				for (var l = 0; l < paramArr.length; l++) {
					var param = paramArr[l];
					if (dataObj[station][year][param].length != 0) {
						chartArray[i+1].push(dataObj[station][year][param + "Delta32Sum"][i]);
						chartArray[i+1].push(dateString + ": " +  dataObj[station][year][param + "Delta32Sum"][i]);
					};
				};
			};
		};
	};
	
	var chartOptions = {
		height: 300,
		chartArea: {
			top: 20,
			height: "80%",
			width: "80%",
		},
		legend: {
			position: 'top',
		},
		vAxis: {
			title: 'Degree Days (Fahrenheit)',
			viewWindow: {
				max: 2000,
			},
		},
		hAxis : {
			format: 'MMM',
			viewWindow: {
				//min: trendPlotStart,
				//max: trendPlotEnd,
			},
		},
		pointsVisible: false,
		lineWidth: 2,
		series : {
			0 : {color:"Black"},
			//1 : {color:"Green"},
		},
	};
	//Create the chart
	var chartType = "scatter";
	google.charts.setOnLoadCallback(function(){drawChart(chartArray, chartOptions, chartType, eleId)});
};

function phenologyChart(eleId) {
	//Define the station and parameter
	var phenCase = phenologyList.selected;
	var station = phenologyObj[phenCase].station;
	var param = phenologyObj[phenCase].param;
	
	//Build the event date array and year array
	var eventDateArr = [];
	var yearArr = [];
	for (var i = 0; i < phenologyObj[phenCase].eventDateArr.length; i++) {
		var dateStr = phenologyObj[phenCase].eventDateArr[i];
		var dateObj = new Date(dateStr);
		eventDateArr.push(dateObj);
		yearArr.push(dateObj.getFullYear());
	};
	
	var colorArr = ['color:red', 'color:green', 'color:cyan', 'color:yellow'];
	
	//Build the chart array
	var chartArray = [];
	chartArray[0] = ["Date"];
	for (var k = 0; k < yearArr.length; k++) {
		var year = yearArr[k];
		if (dataObj[station][year][param].length != 0) {
			chartArray[0].push(String(year));
			chartArray[0].push({role : 'tooltip'});
			chartArray[0].push("Event");
		};
	};
	
	for (var i = 0; i < dateArr.length; i++) {
		chartArray[i+1] = [dateArr[i]];
		var dateString = dateArr[i].toLocaleString(undefined, {month: "short", day: "numeric"});
		for (var k = 0; k < yearArr.length; k++) {
			var year = yearArr[k]
			if (dataObj[station][year][param].length != 0) {
				chartArray[i+1].push(dataObj[station][year][param][i]);
				chartArray[i+1].push(dateString + ": " +  dataObj[station][year][param][i]);
				if (eventDateArr[k].getMonth() ==  dateArr[i].getMonth() && eventDateArr[k].getDate() == dateArr[i].getDate()) {
					chartArray[i+1].push(dataObj[station][year][param][i]);
				} else {
					chartArray[i+1].push(null);
				};
			};
		};
	};	

	var chartOptions = {
		height: 300,
		chartArea: {
			top: 20,
			height: "80%",
			width: "80%",
		},
		legend: {
			position: 'top',
		},
		vAxis: {
			title: 'Degree Days (Fahrenheit)',
			viewWindow: {
				max: 1500,
			},
		},
		hAxis : {
			format: 'MMM',
			viewWindow: {
				//min: trendPlotStart,
				max: new Date('7/1/2019'),
			},
		},
		pointsVisible: false,
		lineWidth: 2,
		series : {
			//0 : {color:"Black"},
			//1 : {color:"Green"},
		},
	};
	for (var i = 0; i < yearArr.length; i++) {
		chartOptions.series[i*2] = {};
		chartOptions.series[i*2+1] = {pointsVisible: true, pointSize: 12, color:'black', visibleInLegend: false}
	};
	
	
	//Create the chart
	var chartType = "scatter";
	google.charts.setOnLoadCallback(function(){drawChart(chartArray, chartOptions, chartType, eleId)});
};


function phenologyChart2(eleId) {
	//Build the station, year, and parameter lists
	var stationArr = stationList.comp.slice();
	stationArr.unshift(stationList.reference);
	var yearArr = yearList.menu;
	var paramArr = ['springArrives', /*'firstFreezeDate'*/]
	
	//Build the chart array
	var chartArray = [];
	chartArray[0] = ["Year"];
	for (var j = 0; j < stationArr.length; j++) {
		var station = stationArr[j];
		for (var l = 0; l < paramArr.length; l++) {
			var param = paramArr[l];
			chartArray[0].push(station + "-" + param);
		};		
	};
		
	for (var i = 0; i < yearArr.length; i++) {
		chartArray[i+1] = [Number(yearArr[i])];
		for (var j = 0; j < stationArr.length; j++) {
			var station = stationArr[j];
			for (var k = 0; k < paramArr.length; k++) {
				var param = paramArr[k];
				var value = dataObjExt[station].year[param][i];
				chartArray[i+1].push(value);
			};
		};
	};
	
	var chartOptions = {
		height: 300,
		chartArea: {
			top: 20,
			height: "80%",
			width: "80%",
		},
		legend: {
			position: 'none',
		},
		vAxis: {
			title: 'Date',
			format: 'MMM-d',
			viewWindow: {
				//min: new Date(yearArr[0]),
				//max: 80,
			},
		},
		hAxis : {
			format: '####',
			viewWindow: {
				min: yearArr[0],
				max: yearArr[yearArr.length-1],
			},
		},
		pointsVisible: false,
		lineWidth: 2,
		areaOpacity: 0.0,
		series : {
			0 : {color:"Black"},
			//1 : {color:"Green"},
		},
		trendlines: { 0: {}, 1: {}, 2: {}, 3: {},},
	};
	//Create the chart
	var chartType = "steppedArea";
	google.charts.setOnLoadCallback(function(){drawChart(chartArray, chartOptions, chartType, eleId)});
};

function dailyHistChart(eleId) {
	//Build the station, year, and parameter lists
	var stationArr = stationList.comp.slice();
	stationArr.unshift(stationList.reference);
	var yearArr = yearList.comp.slice();
	yearArr.unshift(yearList.reference);
	var paramArr = paramList.comp.slice();
	paramArr.unshift(paramList.reference);
	for (var i = 0; i < paramArr.length; i++) {
		switch (paramArr[i]) {
			case 'TMAX': paramArr[i] = 'TMAXHist'; break;
			case 'TMIN': paramArr[i] = 'TMINHist'; break;
			case 'TAVE': paramArr[i] = 'TAVEHist'; break;
			default: paramArr.splice(i, 1); console.log('not found');break;
		};
	};
	
	//Build the chart array
	var chartArray = [];
	chartArray[0] = ["BP"];
	for (var j = 0; j < stationArr.length; j++) {
		var station = stationArr[j];
		for (var k = 0; k < yearArr.length; k++) {
			var year = yearArr[k];
			for (var l = 0; l < paramArr.length; l++) {
				var param = paramArr[l];
				chartArray[0].push(station + "-" + year + "-" + param);
			};
		};
	};
	
	for (var i = 0; i < histBPArr.length; i++) {
		chartArray[i+1] = [histBPArr[i]];
		for (var j = 0; j < stationArr.length; j++) {
			var station = stationArr[j];
			for (var k = 0; k < yearArr.length; k++) {
				var year = yearArr[k]
				for (var l = 0; l < paramArr.length; l++) {
					var param = paramArr[l];
					if (dataObjHist[station][year][param].length != 0) {
						chartArray[i+1].push(dataObjHist[station][year][param][i]);
					};
				};
			};
		};
	};
	
	var chartOptions = {
		height: 300,
		chartArea: {
			top: 20,
			height: "80%",
			width: "80%",
		},
		legend: {
			position: 'top',
		},
		vAxis: {
			//title: 'kWh',
		},
		hAxis : {
			//format: 'M/d',
			viewWindow: {
				//min: trendPlotStart,
				//max: trendPlotEnd,
			},
		},
		pointsVisible: false,
		lineWidth: 2,
		series : {
			0 : {color:"Black"},
			//1 : {color:"Green"},
		},
	};
	//Create the chart
	var chartType = "scatter";
	google.charts.setOnLoadCallback(function(){drawChart(chartArray, chartOptions, chartType, eleId)});
};


function dailyXYChart(eleId) {
	//Build the station, year, and parameter lists
	var stationArr = stationList.comp.slice();
	stationArr.unshift(stationList.reference);
	var yearArr = yearList.comp.slice();
	yearArr.unshift(yearList.reference);
	var paramArr = paramList.comp.slice();
	paramArr.unshift(paramList.reference);
	
	//Build the chart array
	var chartArray = [];
	chartArray[0] = ["Base Station"];
	for (var j = 0; j < stationArr.length; j++) {
		var station = stationArr[j];
		for (var k = 0; k < yearArr.length; k++) {
			var year = yearArr[k];
			for (var l = 0; l < paramArr.length; l++) {
				var param = paramArr[l];
				if (dataObj[station][year][param].length != 0) {
					chartArray[0].push(station + "-" + year + "-" + param);
				};
			};
		};
	};
	
	for (var i = 0; i < dateArr.length; i++) {
		var baseStation = stationArr[0];
		var baseYear = yearArr[0];
		var baseParam = paramArr[0];
		chartArray[i+1] = [dataObj[baseStation][baseYear][baseParam][i]];
		for (var j = 0; j < stationArr.length; j++) {
			var station = stationArr[j];
			for (var k = 0; k < yearArr.length; k++) {
				var year = yearArr[k]
				for (var l = 0; l < paramArr.length; l++) {
					var param = paramArr[l];
					if (dataObj[station][year][param].length != 0) {
						chartArray[i+1].push(dataObj[station][year][param][i]);
					};
				};
			};
		};
	};
	
	var chartOptions = {
		height: 300,
		chartArea: {
			top: 20,
			height: "80%",
			width: "80%",
		},
		legend: {
			position: 'top',
		},
		vAxis: {
			//title: 'kWh',
		},
		hAxis : {
			//format: 'M/d/yy',
			viewWindow: {
				//min: trendPlotStart,
				//max: trendPlotEnd,
			},
		},
		pointsVisible: true,
		lineWidth: 0,
		series : {
			//0 : {color:"Blue"},
			//1 : {color:"Green"},
		},
	};
	//Create the chart
	var chartType = "scatter";
	google.charts.setOnLoadCallback(function(){drawChart(chartArray, chartOptions, chartType, eleId)});
};

function yearlyChart(eleId, pListObj) {
	//Build the station, year, and parameter lists
	var stationArr = stationList.comp.slice();
	stationArr.unshift(stationList.reference);
	var paramArr = pListObj.comp.slice();
	paramArr.unshift(pListObj.reference);
	
	var yVect = dataObjExt[stationList.reference].year['TAVEAve'];
	var xVect = yearNumArr;
	var regrOutput = regression(xVect, yVect);
	var regrVect = Array(yearNumArr.length).fill(null);
	var startIndex = yearNumArr.indexOf(1960);
	var endIndex = yearNumArr.indexOf(2020);
	for (var i = startIndex; i <=endIndex; i++) {
		var yValue = regrOutput.slope * xVect[i] + regrOutput.intercept;
		regrVect[i] = yValue;
	};
	//console.log(regrVect);

	//Build the chart array
	var chartArray = [];
	chartArray[0] = ["Year"];
	for (var j = 0; j < stationArr.length; j++) {
		var station = stationArr[j];
		for (var l = 0; l < paramArr.length; l++) {
			var param = paramArr[l];
			chartArray[0].push(station + "-" + param);
		};	
		chartArray[0].push("Regression")
	};
		
	for (var i = 0; i < yearArr.length; i++) {
		var year = yearNumArr[i];
		chartArray[i+1] = [year];
		for (var j = 0; j < stationArr.length; j++) {
			var station = stationArr[j];
			for (var k = 0; k < paramArr.length; k++) {
				var param = paramArr[k];
				var value = dataObjExt[station].year[param][i];
				chartArray[i+1].push(value);
			};
		};
		chartArray[i+1].push(regrVect[i])
	};
	
	var chartOptions = {
		height: 300,
		chartArea: {
			top: 20,
			height: "80%",
			width: "80%",
		},
		legend: {
			position: 'top',
		},
		vAxis: {
			title: 'Deg F',
			viewWindow: {
				//min: new Date(yearArr[0]),
				//max: 80,
			},
		},
		hAxis : {
			format: '####',
			viewWindow: {
				min: yearArr[0],
				max: yearArr[yearArr.length-1],
			},
		},
		pointsVisible: false,
		lineWidth: 2,
		series : {
			0 : {color:"green"},
			1 : {color:"lightgray", lineWidth:4},
		},
		/*trendlines: { 
			0: {color: "Black"},
			1: {},
			2: {},
			3: {},
		},*/
	};

	//Create the chart
	var chartType = "scatter";
	google.charts.setOnLoadCallback(function(){drawChart(chartArray, chartOptions, chartType, eleId)});
};

function yearlyDateChart(eleId, pListObj) {
	//Build the station, year, and parameter lists
	var stationArr = stationList.comp.slice();
	stationArr.unshift(stationList.reference);
	var paramArr = pListObj.comp.slice();
	paramArr.unshift(pListObj.reference);
	
	//Build the chart array
	var chartArray = [];
	chartArray[0] = ["Year"];
	for (var j = 0; j < stationArr.length; j++) {
		var station = stationArr[j];
		for (var l = 0; l < paramArr.length; l++) {
			var param = paramArr[l];
			chartArray[0].push(station + "-" + param);
		};	
	};
		
	for (var i = 0; i < yearNumArr.length; i++) {
		var year = yearNumArr[i];
		chartArray[i+1] = [year];
		for (var j = 0; j < stationArr.length; j++) {
			var station = stationArr[j];
			for (var k = 0; k < paramArr.length; k++) {
				var param = paramArr[k];
				var value = dataObjExt[station].year[param][i];
				chartArray[i+1].push(value);
			};
		};
	};
	
	var chartOptions = {
		height: 300,
		chartArea: {
			top: 20,
			height: "80%",
			width: "80%",
		},
		legend: {
			position: 'top',
		},
		vAxis: {
			title: 'Date',
			format: 'MMM-d',
			viewWindow: {
				//min: new Date(yearArr[0]),
				//max: 80,
			},
		},
		hAxis : {
			format: '####',
			viewWindow: {
				min: yearArr[0],
				max: yearArr[yearArr.length-1],
			},
		},
		pointsVisible: false,
		lineWidth: 2,
		areaOpacity: 0.0,
		series : {
			0 : {color:"Black"},
			1 : {color:"Green", lineWidth:4},
		},
		/*trendlines: { 
			0: {color: "Black"},
			1: {},
			2: {},
			3: {},
		},*/
	};

	//Create the chart
	var chartType = "steppedArea";
	google.charts.setOnLoadCallback(function(){drawChart(chartArray, chartOptions, chartType, eleId)});
};
function yearlyDataQuantityChart(eleId) {
	//Build the station, year, and parameter lists
	var stationArr = stationList.comp.slice();
	stationArr.unshift(stationList.reference);
	var paramArr = ['dataQuantity']
	
	//Build the chart array
	var chartArray = [];
	chartArray[0] = ["Year"];
	for (var j = 0; j < stationArr.length; j++) {
		var station = stationArr[j];
		for (var l = 0; l < paramArr.length; l++) {
			var param = paramArr[l];
			chartArray[0].push(station + "-" + param);
		};		
	};
		
	for (var i = 0; i < yearNumArr.length; i++) {
		var year = yearNumArr[i];
		chartArray[i+1] = [year];
		for (var j = 0; j < stationArr.length; j++) {
			var station = stationArr[j];
			for (var k = 0; k < paramArr.length; k++) {
				var param = paramArr[k];
				var value = dataObjExt[station].year[param][i];
				chartArray[i+1].push(value);
			};
		};
	};
	
	var chartOptions = {
		height: 300,
		chartArea: {
			top: 20,
			height: "80%",
			width: "80%",
		},
		legend: {
			position: 'top',
		},
		vAxis: {
			title: 'Valid Sample Pairs',
			//format: 'MMM',
			viewWindow: {
				//min: new Date(yearArr[0]),
				//max: 80,
			},
		},
		hAxis : {
			format: '####',
			viewWindow: {
				min: yearArr[0],
				max: yearArr[yearArr.length-1],
			},
		},
		pointsVisible: false,
		lineWidth: 2,
		series : {
			0 : {color:"Black"},
			//1 : {color:"Green"},
		},
	};
	//Create the chart
	var chartType = "steppedArea";
	google.charts.setOnLoadCallback(function(){drawChart(chartArray, chartOptions, chartType, eleId)});
};
function yearlyDeltaChart(eleId) {
	//Build the station, year, and parameter lists
	var stationArr = stationList.comp.slice();
	stationArr.unshift(stationList.reference);
	var paramArr = paramListAve.comp.slice();
	paramArr.unshift(paramListAve.reference);
	
	//Build the chart array
	var chartArray = [];
	chartArray[0] = ["Year"];
	for (var j = 0; j < stationArr.length; j++) {
		var station = stationArr[j];
		for (var l = 0; l < paramArr.length; l++) {
			var param = paramArr[l];
			chartArray[0].push(station + "-" + param);
		};		
	};
		
	for (var i = 0; i < yearNumArr.length; i++) {
		var year = yearNumArr[i];
		chartArray[i+1] = [year];
		for (var j = 0; j < stationArr.length; j++) {
			var station = stationArr[j];
			for (var k = 0; k < paramArr.length; k++) {
				var param = paramArr[k] + "Delta";
				var value = dataObjExt[station].year[param][i];
				chartArray[i+1].push(value);
			};
		};
	};
	
	var chartOptions = {
		height: 300,
		chartArea: {
			top: 20,
			height: "80%",
			width: "80%",
		},
		legend: {
			position: 'top',
		},
		vAxis: {
			title: 'Deg F',
			viewWindow: {
				//min: 0,
				//max: 80,
			},
		},
		hAxis : {
			format: '####',
			viewWindow: {
				min: yearArr[0],
				max: yearArr[yearArr.length-1],
			},
		},
		pointsVisible: false,
		lineWidth: 2,
		curveType: 'function',
		areaOpacity: 0.5,
		series : {
			//0 : {color:"Black"},
			//1 : {color:"Green"},
		},
		trendlines: { 
			0: {color: "Black"},
			1: {},
			2: {},
			3: {},
		},
	};
	//Create the chart
	var chartType = "steppedArea";
	google.charts.setOnLoadCallback(function(){drawChart(chartArray, chartOptions, chartType, eleId)});
};

function yearlyDeltaFiltChart(eleId) {
	//Build the station, year, and parameter lists
	var stationArr = stationList.comp.slice();
	stationArr.unshift(stationList.reference);
	var paramArr = paramListAve.comp.slice();
	paramArr.unshift(paramListAve.reference);
	
	//Build the chart array
	var chartArray = [];
	chartArray[0] = ["Year"];
	for (var j = 0; j < stationArr.length; j++) {
		var station = stationArr[j];
		for (var l = 0; l < paramArr.length; l++) {
			var param = paramArr[l];
			chartArray[0].push(station + "-" + param);
		};		
	};
		
	for (var i = 0; i < yearNumArr.length; i++) {
		var year = yearNumArr[i];
		chartArray[i+1] = [year];
		for (var j = 0; j < stationArr.length; j++) {
			var station = stationArr[j];
			for (var k = 0; k < paramArr.length; k++) {
				var param = paramArr[k] + "DeltaFilt";
				var value = dataObjExt[station].year[param][i];
				chartArray[i+1].push(value);
			};
		};
	};
		
	
	var chartOptions = {
		height: 300,
		chartArea: {
			top: 20,
			height: "80%",
			width: "80%",
		},
		legend: {
			position: 'top',
		},
		vAxis: {
			title: 'Deg F',
			viewWindow: {
				//min: 0,
				//max: 80,
			},
		},
		hAxis : {
			format: '####',
			viewWindow: {
				min: yearArr[0],
				max: yearArr[yearArr.length-1],
			},
		},
		pointsVisible: false,
		lineWidth: 2,
		curveType: 'function',
		//areaOpacity: 0.5,
		series : {
			//0 : {color:"Black"},
			//1 : {color:"Green"},
		},
	};
	//Create the chart
	var chartType = "scatter";
	google.charts.setOnLoadCallback(function(){drawChart(chartArray, chartOptions, chartType, eleId)});
};

function yearlyCompChart(eleId) {
	//Build the station, year, and parameter lists
	var stationArr = stationList.comp.slice();
	stationArr.unshift(stationList.reference);
	var paramArr = paramListAve.comp.slice();
	paramArr.unshift(paramListAve.reference);
	
	//Build the chart array
	var chartArray = [];
	chartArray[0] = ["Year"];
	for (var j = 0; j < stationArr.length; j++) {
		var station = stationArr[j];
		for (var l = 0; l < paramArr.length; l++) {
			var param = paramArr[l];
			chartArray[0].push(station + "-" + param);
		};		
	};
		
	for (var i = 0; i < yearNumArr.length; i++) {
		var year = yearNumArr[i];
		chartArray[i+1] = [year];
		for (var j = 0; j < stationArr.length; j++) {
			var station = stationArr[j];
			for (var k = 0; k < paramArr.length; k++) {
				var param = paramArr[k];
				var refValue = dataObjExt[stationList.reference]. year[param][i];
				var compValue = dataObjExt[station].year[param][i];
				var value = null;
				if (refValue != null && compValue != null) {
					value = compValue - refValue;
				};
				chartArray[i+1].push(value);
			};
		};
	};
	
	var chartOptions = {
		height: 300,
		chartArea: {
			top: 20,
			height: "80%",
			width: "80%",
		},
		legend: {
			position: 'top',
		},
		vAxis: {
			title: 'Deg F',
			viewWindow: {
				//min: new Date(yearArr[0]),
				//max: 80,
			},
		},
		hAxis : {
			format: '####',
			viewWindow: {
				min: yearArr[0],
				max: yearArr[yearArr.length-1],
			},
		},
		pointsVisible: false,
		lineWidth: 2,
		series : {
			0 : {color:"Black"},
			//1 : {color:"Green"},
		},
	};

	//Create the chart
	var chartType = "steppedArea";
	google.charts.setOnLoadCallback(function(){drawChart(chartArray, chartOptions, chartType, eleId)});
};

function yearlyFreezeChart(eleId) {
	//Build the station, year, and parameter lists
	var stationArr = stationList.comp.slice();
	stationArr.unshift(stationList.reference);
	var paramArr = ['lastFreezeDate', 'springArrives', /*'firstFreezeDate'*/]
	
	//Build the chart array
	var chartArray = [];
	chartArray[0] = ["Year"];
	for (var j = 0; j < stationArr.length; j++) {
		var station = stationArr[j];
		for (var l = 0; l < paramArr.length; l++) {
			var param = paramArr[l];
			chartArray[0].push(station + "-" + param);
		};		
	};
		
	for (var i = 0; i < yearArr.length; i++) {
		var year = Number(yearArr[i]);
		chartArray[i+1] = [year];
		for (var j = 0; j < stationArr.length; j++) {
			var station = stationArr[j];
			for (var k = 0; k < paramArr.length; k++) {
				var param = paramArr[k];
				var value = dataObjExt[station].year[param][i];
				chartArray[i+1].push(value);
			};
		};
	};
	
	var chartOptions = {
		height: 300,
		chartArea: {
			top: 20,
			height: "80%",
			width: "80%",
		},
		legend: {
			position: 'top',
		},
		vAxis: {
			title: 'Date',
			format: 'MMM-d',
			viewWindow: {
				//min: new Date(yearArr[0]),
				//max: 80,
			},
		},
		hAxis : {
			format: '####',
			viewWindow: {
				min: yearArr[0],
				max: yearArr[yearArr.length-1],
			},
		},
		pointsVisible: false,
		lineWidth: 2,
		areaOpacity: 0.0,
		series : {
			0 : {color:"Black", areaOpacity: 0.5,},
			//1 : {color:"Green"},
		},
		//trendlines: { 0: {}, 1: {}, 2: {}, 3: {},},
	};
	//Create the chart
	var chartType = "steppedArea";
	google.charts.setOnLoadCallback(function(){drawChart(chartArray, chartOptions, chartType, eleId)});
};

function yearlyFreezeChart2(eleId) {
	//Build the station, year, and parameter lists
	var stationArr = stationList.comp.slice();
	stationArr.unshift(stationList.reference);
	var yearArr = yearList.menu;
	var paramArr = ['firstFreezeDate']
	
	//Build the chart array
	var chartArray = [];
	chartArray[0] = ["Year"];
	for (var j = 0; j < stationArr.length; j++) {
		var station = stationArr[j];
		for (var l = 0; l < paramArr.length; l++) {
			var param = paramArr[l];
			chartArray[0].push(station + "-" + param);
		};		
	};
		
	for (var i = 0; i < yearArr.length; i++) {
		var year = Number(yearArr[i]);
		chartArray[i+1] = [year];
		for (var j = 0; j < stationArr.length; j++) {
			var station = stationArr[j];
			for (var k = 0; k < paramArr.length; k++) {
				var param = paramArr[k];
				var value = dataObjExt[station].year[param][i];
				chartArray[i+1].push(value);
			};
		};
	};
	
	var chartOptions = {
		height: 300,
		chartArea: {
			top: 20,
			height: "80%",
			width: "80%",
		},
		legend: {
			position: 'top',
		},
		vAxis: {
			title: 'Date',
			format: 'MMM-d',
			viewWindow: {
				//min: new Date(yearArr[0]),
				//max: 80,
			},
		},
		hAxis : {
			format: '####',
			viewWindow: {
				min: yearArr[0],
				max: yearArr[yearArr.length-1],
			},
		},
		pointsVisible: false,
		lineWidth: 2,
		areaOpacity: 0.0,
		//connectSteps: false,
		series : {
			0 : {color:"Black"},
			//1 : {color:"Green"},
		},
		trendlines: { 
			0: {}, 1: {}, 2: {}, 3: {},
		},
	};
	//Create the chart
	var chartType = "steppedArea";
	google.charts.setOnLoadCallback(function(){drawChart(chartArray, chartOptions, chartType, eleId)});
};

function yearlyFreezeChart3(eleId) {
	//Build the station, year, and parameter lists
	var stationArr = stationList.comp.slice();
	stationArr.unshift(stationList.reference);
	var yearArr = yearList.menu;
	var paramArr = ['lastFreezeDate']
	
	//Build the chart array
	var chartArray = [];
	chartArray[0] = ["Year"];
	for (var j = 0; j < stationArr.length; j++) {
		var station = stationArr[j];
		for (var l = 0; l < paramArr.length; l++) {
			var param = paramArr[l];
			chartArray[0].push(station + "-" + param);
		};		
	};
		
	for (var i = 0; i < yearArr.length; i++) {
		var year = Number(yearArr[i]);
		chartArray[i+1] = [year];
		for (var j = 0; j < stationArr.length; j++) {
			var station = stationArr[j];
			for (var k = 0; k < paramArr.length; k++) {
				var param = paramArr[k];
				var value = dataObjExt[station].year[param][i];
				chartArray[i+1].push(value);
			};
		};
	};
	
	var chartOptions = {
		height: 300,
		chartArea: {
			top: 20,
			height: "80%",
			width: "80%",
		},
		legend: {
			position: 'top',
		},
		vAxis: {
			title: 'Date',
			format: 'MMM-d',
			viewWindow: {
				//min: new Date(yearArr[0]),
				//max: 80,
			},
		},
		hAxis : {
			format: '####',
			viewWindow: {
				min: yearArr[0],
				max: yearArr[yearArr.length-1],
			},
		},
		pointsVisible: false,
		lineWidth: 2,
		areaOpacity: 0.0,
		//connectSteps: false,
		series : {
			0 : {color:"Black"},
			//1 : {color:"Green"},
		},
		trendlines: { 
			0: {}, 1: {}, 2: {}, 3: {},
		},
	};
	//Create the chart
	var chartType = "steppedArea";
	google.charts.setOnLoadCallback(function(){drawChart(chartArray, chartOptions, chartType, eleId)});
};

function yearlyFreezeDmgRiskChart(eleId) {
	//Build the station, year, and parameter lists
	var stationArr = stationList.comp.slice();
	stationArr.unshift(stationList.reference);
	var yearArr = yearList.menu;
	var paramArr = ['freezeDmgRisk']
	
	//Build the chart array
	var chartArray = [];
	chartArray[0] = ["Year"];
	for (var j = 0; j < stationArr.length; j++) {
		var station = stationArr[j];
		for (var l = 0; l < paramArr.length; l++) {
			var param = paramArr[l];
			chartArray[0].push(station + "-" + param);
		};		
	};
		
	for (var i = 0; i < yearArr.length; i++) {
		var year = Number(yearArr[i]);
		chartArray[i+1] = [year];
		for (var j = 0; j < stationArr.length; j++) {
			var station = stationArr[j];
			for (var k = 0; k < paramArr.length; k++) {
				var param = paramArr[k];
				var value = dataObjExt[station].year[param][i];
				chartArray[i+1].push(value);
			};
		};
	};
	
	var chartOptions = {
		height: 300,
		chartArea: {
			top: 20,
			height: "80%",
			width: "80%",
		},
		legend: {
			position: 'top',
		},
		vAxis: {
			title: 'Degree Days (F)',
			//format: 'MMM',
			viewWindow: {
				//min: new Date(yearArr[0]),
				//max: 80,
			},
		},
		hAxis : {
			format: '####',
			viewWindow: {
				min: yearArr[0],
				max: yearArr[yearArr.length-1],
			},
		},
		pointsVisible: false,
		lineWidth: 2,
		series : {
			0 : {color:"Black"},
			//1 : {color:"Green"},
		},
	};
	//Create the chart
	var chartType = "steppedArea";
	google.charts.setOnLoadCallback(function(){drawChart(chartArray, chartOptions, chartType, eleId)});
};

function monthlyChart(eleId) {
	//Build the station, year, and parameter lists
	var stationArr = stationList.comp.slice();
	stationArr.unshift(stationList.reference);
	var yearArr = yearList.menu;
	var paramArr = paramListAve.comp.slice();
	paramArr.unshift(paramListAve.reference);
	var monthArr = monthList.comp;
	
	//Build the chart array
	var chartArray = [];
	chartArray[0] = ["Year"];
	for (var j = 0; j < stationArr.length; j++) {
		var station = stationArr[j];
		for (var l = 0; l < paramArr.length; l++) {
			var param = paramArr[l];
			for (var m = 0; m  < monthArr.length; m++) {
				var month = monthArr[m];
				chartArray[0].push(station + "-" + param + "-" + month);
			};
		};		
	};
		
	for (var i = 0; i < yearArr.length; i++) {
		var year = Number(yearArr[i]);
		chartArray[i+1] = [year];
		for (var j = 0; j < stationArr.length; j++) {
			var station = stationArr[j];
			for (var k = 0; k < paramArr.length; k++) {
				var param = paramArr[k];
				for (var m = 0; m < monthArr.length; m++) {
					var month = monthArr[m];
					var value = dataObjExt[station].month[month][param][i];
					chartArray[i+1].push(value);
				};
			};
		};
	};
	
	var chartOptions = {
		height: 300,
		chartArea: {
			top: 20,
			height: "80%",
			width: "80%",
		},
		legend: {
			position: 'top',
		},
		vAxis: {
			title: 'Deg F',
			viewWindow: {
				//min: 0,
				//max: 80,
			},
		},
		hAxis : {
			format: '####',
			viewWindow: {
				min: yearArr[0],
				max: yearArr[yearArr.length-1],
			},
		},
		pointsVisible: false,
		lineWidth: 2,
		series : {
			0 : {color:"Black"},
			//1 : {color:"Green"},
		},
	};
	//Create the chart
	var chartType = "scatter";
	google.charts.setOnLoadCallback(function(){drawChart(chartArray, chartOptions, chartType, eleId)});
};

function monthlyDeltaChart(eleId) {
	//Build the station, year, and parameter lists
	var stationArr = stationList.comp.slice();
	stationArr.unshift(stationList.reference);
	var yearArr = yearList.menu;
	var paramArr = paramListAve.comp.slice();
	paramArr.unshift(paramListAve.reference);
	var monthArr = monthList.comp;
	
	//Build the chart array
	var chartArray = [];
	chartArray[0] = ["Year"];
	for (var j = 0; j < stationArr.length; j++) {
		var station = stationArr[j];
		for (var l = 0; l < paramArr.length; l++) {
			var param = paramArr[l];
			for (var m = 0; m  < monthArr.length; m++) {
				var month = monthArr[m];
				chartArray[0].push(station + "-" + param + "-" + month);
			};
		};		
	};
		
	for (var i = 0; i < yearArr.length; i++) {
		var year = Number(yearArr[i]);
		chartArray[i+1] = [year];
		for (var j = 0; j < stationArr.length; j++) {
			var station = stationArr[j];
			for (var k = 0; k < paramArr.length; k++) {
				var param = paramArr[k] + "Delta";
				for (var m = 0; m < monthArr.length; m++) {
					var month = monthArr[m];
					var value = dataObjExt[station].month[month][param][i];
					chartArray[i+1].push(value);
				};
			};
		};
	};
	
	var chartOptions = {
		height: 300,
		chartArea: {
			top: 20,
			height: "80%",
			width: "80%",
		},
		legend: {
			position: 'top',
		},
		vAxis: {
			title: 'Deg F',
			viewWindow: {
				//min: 0,
				//max: 80,
			},
		},
		hAxis : {
			format: '####',
			viewWindow: {
				min: yearArr[0],
				max: yearArr[yearArr.length-1],
			},
		},
		pointsVisible: false,
		lineWidth: 2,
		curveType: 'function',
		areaOpacity: 0.5,
		series : {
			//0 : {color:"Black"},
			//1 : {color:"Green"},
		},
	};
	//Create the chart
	var chartType = "steppedArea";
	google.charts.setOnLoadCallback(function(){drawChart(chartArray, chartOptions, chartType, eleId)});
};

function monthlyDeltaFiltChart(eleId) {
	//Build the station, year, and parameter lists
	var stationArr = stationList.comp.slice();
	stationArr.unshift(stationList.reference);
	var yearArr = yearList.menu;
	var paramArr = paramListAve.comp.slice();
	paramArr.unshift(paramListAve.reference);
	var monthArr = monthList.comp;
	
	//Build the chart array
	var chartArray = [];
	chartArray[0] = ["Year"];
	for (var j = 0; j < stationArr.length; j++) {
		var station = stationArr[j];
		for (var l = 0; l < paramArr.length; l++) {
			var param = paramArr[l];
			for (var m = 0; m  < monthArr.length; m++) {
				var month = monthArr[m];
				chartArray[0].push(station + "-" + param + "-" + month);
			};
		};		
	};
		
	for (var i = 0; i < yearArr.length; i++) {
		var year = Number(yearArr[i]);
		chartArray[i+1] = [year];
		for (var j = 0; j < stationArr.length; j++) {
			var station = stationArr[j];
			for (var k = 0; k < paramArr.length; k++) {
				var param = paramArr[k] + "DeltaFilt";
				for (var m = 0; m < monthArr.length; m++) {
					var month = monthArr[m];
					var value = dataObjExt[station].month[month][param][i];
					chartArray[i+1].push(value);
				};
			};
		};
	};
	
	var chartOptions = {
		height: 300,
		chartArea: {
			top: 20,
			height: "80%",
			width: "80%",
		},
		legend: {
			position: 'top',
		},
		vAxis: {
			title: 'Deg F',
			viewWindow: {
				min: -10,
				max: 10,
			},
		},
		hAxis : {
			format: '####',
			viewWindow: {
				min: yearArr[0],
				max: yearArr[yearArr.length-1],
			},
		},
		pointsVisible: false,
		lineWidth: 2,
		curveType: 'function',
		//areaOpacity: 0.5,
		series : {
			//0 : {color:"Black"},
			//1 : {color:"Green"},
		},
	};
	//Create the chart
	var chartType = "scatter";
	google.charts.setOnLoadCallback(function(){drawChart(chartArray, chartOptions, chartType, eleId)});
};

function decadeChart(eleId) {
	//Build the station, year, and parameter lists
	var stationArr = stationList.comp.slice();
	stationArr.unshift(stationList.reference);
	var decadeArr = decadeList.menu;
	var paramArr = paramListAve.comp.slice();
	paramArr.unshift(paramListAve.reference);
	var monthArr = monthList.comp;
	
	//Build the chart array
	var chartArray = [];
	chartArray[0] = ["Decade"];
	for (var j = 0; j < stationArr.length; j++) {
		var station = stationArr[j];
		for (var l = 0; l < paramArr.length; l++) {
			var param = paramArr[l];
			chartArray[0].push(station + "-" + param)
			chartArray[0].push({id: 'Max', role:'interval'});
			chartArray[0].push({id: 'Min', role:'interval'});
		};		
	};
			
	for (var i = 0; i < decadeArr.length; i++) {
		var decade = Number(decadeArr[i]);
		chartArray[i+1] = [decade + 5];
		for (var j = 0; j < stationArr.length; j++) {
			var station = stationArr[j];
			for (var k = 0; k < paramArr.length; k++) {
				var param = paramArr[k];
				var value = dataObjExt[station].decade[param][i];
				chartArray[i+1].push(value);
				var valueMax = dataObjExt[station].decade[param + 'Max'][i];
				chartArray[i+1].push(valueMax);
				var valueMin = dataObjExt[station].decade[param + 'Min'][i];
				chartArray[i+1].push(valueMin);
			};
		};
	};
	
	var chartOptions = {
		height: 300,
		chartArea: {
			top: 20,
			height: "80%",
			width: "80%",
		},
		legend: {
			position: 'top',
		},
		vAxis: {
			title: 'Deg F',
			viewWindow: {
			},
		},
		hAxis : {
			format: '####',
			viewWindow: {
				min: Number(decadeArr[0]),
				max: Number(decadeArr[decadeArr.length-1])+10,
			},
		},
		pointsVisible: false,
		lineWidth: 2,
		series : {
			0 : {color:"Black"},
			//1 : {color:"Green"},
		},
	};
	//Create the chart
	var chartType = "scatter";
	google.charts.setOnLoadCallback(function(){drawChart(chartArray, chartOptions, chartType, eleId)});
};

function decadeNormChart(eleId) {
	//Build the station, year, and parameter lists
	var stationArr = stationList.comp.slice();
	stationArr.unshift(stationList.reference);
	var decadeArr = decadeList.menu;
	var paramArr = paramListAve.comp.slice();
	paramArr.unshift(paramListAve.reference);
	var monthArr = monthList.comp;
	
	//Build the chart array
	var chartArray = [];
	chartArray[0] = ["Decade"];
	for (var j = 0; j < stationArr.length; j++) {
		var station = stationArr[j];
		for (var l = 0; l < paramArr.length; l++) {
			var param = paramArr[l];
			chartArray[0].push(station + "-" + param)
		};		
	};
			
	for (var i = 0; i < decadeArr.length; i++) {
		var decade = Number(decadeArr[i]);
		chartArray[i+1] = [decade + 5];
		for (var j = 0; j < stationArr.length; j++) {
			var station = stationArr[j];
			for (var k = 0; k < paramArr.length; k++) {
				var param = paramArr[k];
				var value = null;
				if (dataObjExt[station].decade[param][i] != null) {
					value = dataObjExt[station].decade[param][i] - dataObjExt[station].decade[param][2];
				};
				chartArray[i+1].push(value);
			};
		};
	};
	
	var chartOptions = {
		height: 300,
		chartArea: {
			top: 20,
			height: "80%",
			width: "80%",
		},
		legend: {
			position: 'top',
		},
		vAxis: {
			title: 'Deg F',
			viewWindow: {
			},
		},
		hAxis : {
			format: '####',
			viewWindow: {
				min: Number(decadeArr[0]),
				max: Number(decadeArr[decadeArr.length-1])+10,
			},
		},
		pointsVisible: false,
		lineWidth: 2,
		series : {
			0 : {color:"Black"},
			//1 : {color:"Green"},
		},
	};
	//Create the chart
	var chartType = "scatter";
	google.charts.setOnLoadCallback(function(){drawChart(chartArray, chartOptions, chartType, eleId)});
};


function decadeNormChart2(eleId) {
	//Build the station, year, and parameter lists
	var stationArr = ['Indy','MSP', 'Milw','Mad', 'Col']
	var decadeArr = decadeList.menu;
	var paramArr = paramListAve.comp.slice();
	paramArr.unshift(paramListAve.reference);
	var monthArr = monthList.comp;
	
	//Build the chart array
	var chartArray = [];
	chartArray[0] = ["Decade"];
	for (var j = 0; j < stationArr.length; j++) {
		var station = stationArr[j];
		for (var l = 0; l < paramArr.length; l++) {
			var param = paramArr[l];
			chartArray[0].push(stationObj[station].desc);
		};
	};
			
	for (var i = 0; i < decadeArr.length; i++) {
		var decade = Number(decadeArr[i]);
		chartArray[i+1] = [decade + 5];
		for (var j = 0; j < stationArr.length; j++) {
			var station = stationArr[j];
			for (var k = 0; k < paramArr.length; k++) {
				var param = paramArr[k];
				var value = null;
				if (dataObjExt[station].decade[param][i] != null) {
					value = dataObjExt[station].decade[param][i] - dataObjExt[station].decade[param][2];
				};
				chartArray[i+1].push(value);
			};
		};
	};
	
	var chartOptions = {
		height: 300,
		chartArea: {
			top: 20,
			height: "80%",
			right: "20%",
		},
		legend: {
			position: 'right',
		},
		vAxis: {
			title: 'Deg F',
			viewWindow: {
			},
		},
		hAxis : {
			format: '####',
			viewWindow: {
				min: Number(decadeArr[0]),
				max: Number(decadeArr[decadeArr.length-1])+10,
			},
		},
		pointsVisible: false,
		lineWidth: 2,
		series : {
			0 : {color:"Black"},
			//1 : {color:"Green"},
		},
	};
	//Create the chart
	var chartType = "scatter";
	google.charts.setOnLoadCallback(function(){drawChart(chartArray, chartOptions, chartType, eleId)});
};
function summaryRiseChart(eleId) {
	//Sort the dataObjSumArr array
	dataObjSumArr.sort((a, b) => (a.TAVERiseDecades < b.TAVERiseDecades) ? 1 : -1);

	//Build the chart array
	var chartArray = [];
	chartArray[0] = [
		"Station", 
		"Rise",
		{role: 'style'},
	];
		
	for (var i = 0; i < dataObjSumArr.length; i++) {
		chartArray[i+1] = [
			stationObj[dataObjSumArr[i].station].desc,
			dataObjSumArr[i].TAVERiseDecades,
			"color:" + dataObjSumArr[i].marker,
		];
	};
	
	var chartOptions = {
		height: 500,
		chartArea: {
			top: 20,
			height: "80%",
			left: "30%",
			//width: "70%",
		},
		legend: {
			position: 'none',
		},
		vAxis: {
			title: 'Station',
			viewWindow: {
				//min: decadeArr[0],
				//max: 80,
			},
		},
		hAxis : {
			title: 'Temperature Rise [Deg F]',
			//format: '####',
			viewWindow: {
				min: -1,
				max: 5,
			},
		},
		pointsVisible: false,
		lineWidth: 2,
		series : {
			0 : {color:"Black"},
			//1 : {color:"Green"},
		},
	};
	//Create the chart
	var chartType = "bar";
	google.charts.setOnLoadCallback(function(){drawChart(chartArray, chartOptions, chartType, eleId)});
};

function summaryMapChart(eleId) {
	//Build the chart array
	var chartArray = [];
	chartArray[0] = ['Lat', 'Long', 'Location', 'Marker'];
	for (var i = 0; i < dataObjSumArr.length; i++) {
		var station = dataObjSumArr[i].station;
		chartArray.push([
			stationObj[station].lat,
			stationObj[station].long,
			stationObj[station].desc,
			dataObjSumArr[i].marker,
		]);
	};
	
	
	var chartOptions = {
		height: 500,
		showInfoWindow: true,
		useMapTypeControl: true,
		mapType: 'normal',
		icons: {
			red: {
				normal: 'icons/redIcon.png',
				selected: 'icons/redIcon.png',
			},
			gold: {
				normal: 'icons/yellowIcon.png',
				selected: 'icons/yellowIcon.png',
			},
			green: {
				normal: 'icons/greenIcon.png',
				selected: 'icons/greenIcon.png',
			},
			darkblue: {
				normal: 'icons/blueIcon.png',
				selected: 'icons/blueIcon.png',
			},
		},
	};
	//Create the chart
	var chartType = "map";
	google.charts.setOnLoadCallback(function(){drawChart(chartArray, chartOptions, chartType, eleId)});

};

function summaryXYChart(eleId) {
	//Sort the dataObjSumArr array
	dataObjSumArr.sort((a, b) => (a.TAVERiseDecades < b.TAVERiseDecades) ? 1 : -1);

	//Build the chart array
	var chartArray = [];
	chartArray[0] = [
		"Rise", 
		"Population",
		{role: 'style'},
	];
		
	for (var i = 0; i < dataObjSumArr.length; i++) {
		var station = dataObjSumArr[i].station;
		chartArray[i+1] = [
			dataObjSumArr[i].TAVERiseDecades,
			stationObj[station].pop * 1000,
			"color:" + dataObjSumArr[i].marker,
		];
	};
	
	var chartOptions = {
		height: 500,
		chartArea: {
			top: 20,
			height: "80%",
			width: "70%",
		},
		legend: {
			position: 'none',
		},
		vAxis: {
			title: 'County Population',
			viewWindow: {
				//min: decadeArr[0],
				//max: 80,
			},
		},
		hAxis : {
			title: 'Temperature Rise [Deg F]',
			//format: '####',
			viewWindow: {
				//min: decadeArr[0],
				//max: trendPlotEnd,
			},
			//scaleType: 'log',
		},
		pointsVisible: true,
		lineWidth: 0,
		series : {
			0 : {color:"Black"},
			//1 : {color:"Green"},
		},
	};
	//Create the chart
	var chartType = "scatter";
	google.charts.setOnLoadCallback(function(){drawChart(chartArray, chartOptions, chartType, eleId)});
};




