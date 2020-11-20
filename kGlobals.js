//Declare the state machine status object
var currentState = {
	tabWindow: "",
	apiFetchCount: 0,
	apiFetchPending: false,
	dataFilesLoaded: false,
	dataFilesProcessed: false,
};

//Define processed data objects 
var dataObj = {};		//Station -> Year -> Param:array
var dateArr = [];		//Date array for dataObj
var dataObjHist = {};	//Station -> Year -> Param:array
var histBPArr = [];		//Breakpoint array for dataObjHist

//Build the standard date array
var newDate = new Date('12/31/2018');
for (var i = 0; i < 365; i++) {
	newDate.setDate(newDate.getDate() + 1); 
	dateArr[i] = new Date(newDate);
};

//Build the month object
var monthObj = {
	0: {name: "Jan",},
	1: {name: "Feb",},
	2: {name: "Mar",},
	3: {name: "Apr",},
	4: {name: "May",},
	5: {name: "Jun",},
	6: {name: "Jul",},
	7: {name: "Aug",},
	8: {name: "Sep",},
	9: {name: "Oct",},
	10: {name: "Nov",},
	11: {name: "Dec",},
};

//Build the dateArr index range for each month
for (month in monthObj) {
	monthObj[month].IR = [];
	for (var i = 0; i < dateArr.length; i++) {
		if (dateArr[i].getMonth() == month) {
			monthObj[month].IR.push(i)
		}
	}
};

//Build the histogram breakpoint vector
var lowLim = -40;
var hiLim = 110;
var bucket = 5;
histBPArr = [];
for (var i = lowLim; i <= hiLim; i+=5) {
	histBPArr.push(i);
};

//Define API request token header
var headerObj = {headers:{'Token':'gyeAwCNujWtcxFytbsQtkDvxllWpptYw'}}

//Define the year range and build the year, decade, and month sequence arrays.
var startYear = 1940;
var endYear = 2020;
var yearArr = [], yearNumArr = [];
for (var year = startYear; year <= endYear; year++) {
	yearArr.push(String(year));
	yearNumArr.push(year);
};

var decadeArr = [];
for (var decade = startYear; decade < endYear; decade+=10) {
	decadeArr.push(String(decade));
};


var stationList = {
	apiFetch:	['Indy'],
	menu:  		Object.keys(stationObj),
	//menu:	['Indy', 'MCA', 'MSP', 'UofM', 'Rose', ],
	reference: 	'Indy',
	comp: 		[],
};
var yearList = {
	apiFetch:	yearArr,
	menu:		yearArr,
	reference: '1960',
	comp:		[],
};

var decadeList = {
	menu: decadeArr,
};

var dayList = {
	reference: translateDateToStr(new Date()),
	min: 10,
	max: 40,
};

var paramList = {
	apiFetch: ['TMIN', 'TMAX'],
	menu:  ['TMIN', 'TAVE', 'TMAX'],
	comp: ['TAVE'],
	reference: 'TAVE',
};
var paramListAve = {
	menu:  ['TMINAve', 'TAVEAve', 'TMAXAve'],
	comp: [],
	reference: 'TAVEAve',
};
var paramListMinMax = {
	menu:  ['TMINMin', 'TMAXMax'],
	comp: [],
	reference: 'TMINMin',
};
var paramListFreeze = {
	menu:	['lastFreezeDate', 'firstFreezeDate'],
	comp: [],
	reference: 'lastFreezeDate',
};

var monthList = {
	menu: Object.keys(monthObj),
	comp: ['0'],
};

var apiFetchesTotal = stationList.apiFetch.length * yearList.apiFetch.length * paramList.apiFetch.length;
var apiRequests = 0;

dataObj = {
	station0 : {
		1960 : {
			TMIN : [0,364],
			TMAX : [0,364],
			TAVE : [0,364],		//Secondary
			TAVESum : [0,364],	//Secondary
			TMINHist : [],		//Secondary
			TMAXHist : [],		//Secondary
			TAVEHist : [],		//Secondary
			TMINDelta : [0,364],	//Tertiary
			TMAXDelta : [0,364],	//Tertiary
			TAVEDelta : [0,364],	//Tertiary
			TMINDeltaSum : [0,364],	//Tertiary ** Eliminate
			TMAXDeltaSum : [0,364],	//Tertiary ** Eliminate 
			TAVEDeltaSum : [0,364],	//Tertiary
			TMINDelta32Sum : [0,364],	//Tertiary ** Eliminate
			TMAXDelta32Sum : [0,364],	//Tertiary ** Eliminate
			TAVEDelta32Sum : [0,364], //Tertiary
		},
	},
};
var dataObjExt = {
	station0 : {
		day: {
			TMINAve: [0,364],
			TMAXAve: [0,364],
			TAVEAve: [0,364],
		},
		month: {
			0 : {
				TMINAve: [0,59],
				TMAXAve: [0,59],
				TAVEAve: [0,59],
				TMINAveDelta : [0,59],
				TMAXAveDelta : [0,59],
				TAVEAveDelta : [0,59],
				TMINAveDeltaFilt: [0,59],
				TMAXAveDeltaFilt : [0,59],
				TAVEAveDeltaFilt : [0,59],
				TMINAveAve: 0,
				TMAXAveAve: 0,
				TAVEAveAve: 0,
			},
		},
		year: {
			TMINAve: [0,59],
			TMAXAve: [0,59],
			TAVEAve: [0,59],
			TMINAveDelta : [0,59],
			TMAXAveDelta : [0,59],
			TAVEAveDelta : [0,59],
			TMINAveDeltaFilt : [0,59],
			TMAXAveDeltaFilt : [0,59],
			TAVEAveDeltaFilt : [0,59],
			TMINAveAve: 0,
			TMAXAveAve: 0,
			TAVEAveAve: 0,
			lastFreezeDate: [0,59],
			lastFreezeDateAve: 0,	//** Eliminate
			firstFreezeDate: [0,59],
			springArrives: [0,59],	//The day that cumulative degree days above 32 passes threshold
			freezeDmgRisk: [0,59],	//Cumulative Degree Days above 32 on day of last freeze
			dataQuantity: [0, 59],
			TMINMin: [0,59],
			TMAXMax: [0,59],
			daysMaxOver90: [0,59],
			daysMaxOver100: [0,59],
			daysMinUnder0: [0,59],
			daysAveUnder32: [0,59],
		},
		decade: {
			TMINAve: [0,5],
			TMAXAve: [0,5],
			TAVEAve: [0,5],
			TMINAveMin: [0,5], 
			TMAXAveMin: [0,5], 
			TAVEAveMin: [0,5], //Min yearly average within decade
			TMINAveMax: [0,5], 
			TMAXAveMax: [0,5], 
			TAVEAveMax: [0,5], //Max yearly average within decade
		},
	},
};

//Data Summary Array
var dataObjSumArr = [
	{	station: "station01",
		pop: 0,
		TMINRiseDecades: 0,
		TMAXRiseDecades: 0,
		TAVERiseDecades: 0,
		marker: 'red',
	},
];

//Spring arrives cumulative degree days threshold
var springDegreeDays = 1000;

//Data quality factors
var QFDayAve = .1;
var QFMonthAve = .9;
var QFMonthAveAve = .1;
var QFYearAve = 1;  //Months in year that must have valid data in order to calculate yearly average
var QFYearAveAve = .1;
var QFDecadeAve = .6; //Years

//Phenology object
var phenologyObj = {
	"Aconite" : {
		title: "Winter Aconite",
		station: "Indy",
		eventDateArr: ['3/9/2013', '3/15/2014', '3/15/2015', '2/18/2017', '2/21/2018'],
		param: 'TAVEDelta32Sum',
	},
	"Daffodils" : {
		title: "Daffodil & Forsythia Joint Peak Bloom",
		station: "Indy",
		eventDateArr: ['3/14/2012', '4/9/2013', '4/9/2015', '3/20/2016', '3/4/2017'],
		param: 'TAVEDelta32Sum',
		image: 'images/Daffodils.jpg',
	},
	"Washington Street" : {
		title: "Washington Street Peak Bloom",
		station: "Indy",
		eventDateArr: ['3/21/2012', '4/15/2013', '4/15/2014', '3/28/2016'],
		param: 'TAVEDelta32Sum',
		image: 'images/WashingtonStreet.jpg',
	},
	"Crabapple Tree" : {
		title: "Crabapple Tree Peak Bloom",
		station: "Indy",
		eventDateArr: ['4/10/2016', '4/4/2017', '4/30/2018', '4/23/2019', '4/11/2020'],
		param: 'TAVEDelta32Sum',
		image: 'images/CrabappleTree.jpg',
	},
	"Morels" : {
		title: "First Morels",
		station: "Indy",
		eventDateArr: ['4/23/2011', '4/3/2012', '4/29/2014', '4/18/2015', '4/15/2016', '4/11/2017', '4/11/2020'],
		param: 'TAVEDelta32Sum',
	},
	"BlueBells" : {
		title: "Bluebells",
		station: "Indy",
		eventDateArr: ['4/18/2011', '4/26/2014', '4/18/2015', '4/15/2016', '4/14/2017', '4/28/2018', '4/11/2020'],
		param: 'TAVEDelta32Sum',
	},
	"Redbuds" : {
		title: "Redbud Bloom",
		station: "Indy",
		eventDateArr: ['3/21/2012', '4/26/2014', '4/18/2015', '4/20/2016', '4/13/2017', '4/29/2018',],
		param: 'TAVEDelta32Sum',
	},
	"Redbud and Dogwood" : {
		title: "Redbud and Dogwood Collective Peak Bloom",
		station: "Indy",
		eventDateArr: ['3/30/2012', '4/26/2014', '4/26/2015', '4/20/2016',],
		param: 'TAVEDelta32Sum',
	},
	"Phoebes" : {
		title: "Eastern Phoebes Arrive",
		station: "Indy",
		eventDateArr: ['3/15/2015', '3/13/2016', '3/4/2017', '3/5/2020'],
		param: 'TAVEDelta32Sum',
	},
};

var phenologyList = {
	menu: Object.keys(phenologyObj),
	selected: Object.keys(phenologyObj)[0],
};

var sampleDataObj = {
	station: 'Indy',
	year: '1990',
	param: 'TMIN',
};

//Moving average filter constant
var filterConstant = 5;
