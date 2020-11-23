//Define the tab Bar
var tabBar2 = {
	tB201: {title: "Overview", function: "selectTabBarItem(\"tabBar2\", \"tB201\", \"main2\", \"dispSummary\")"},
	//tB207: {title: "Decades", function: "selectTabBarItem(\"tabBar2\", \"tB207\", \"main2\", \"dispDecade\")"},
	//tB204: {title: "Yearly", function: "selectTabBarItem(\"tabBar2\", \"tB204\", \"main2\", \"dispYearly\")"},
	//tB205: {title: "Monthly", function: "selectTabBarItem(\"tabBar2\", \"tB205\", \"main2\", \"dispMonthly\")"},
	//tB208: {title: "Daily", function: "selectTabBarItem(\"tabBar2\", \"tB208\", \"main2\", \"dispDaily\")"},
	//tB210: {title: "Day", function: "selectTabBarItem(\"tabBar2\", \"tB210\", \"main2\", \"dispCurrent\")"},
	//tB209: {title: "Phenology", function: "selectTabBarItem(\"tabBar2\", \"tB209\", \"main2\", \"dispPhenology\")"},
	//tB202: {title: "Fetch Data", function: "selectTabBarItem(\"tabBar2\", \"tB202\", \"main2\", \"dispFetchData\")"},
	//tB203: {title: "Get API Data", function: "selectTabBarItem(\"tabBar2\", \"tB203\", \"main2\", \"dispGetAPIData\")"},
};

//Define the window structure
var uiWindowObj2 = {
	header1: {title: "Local Climate Variation & Phenology Analysis",  class: "w3-teal"},
	main1: {
		tabBar2: tabBar2,
		//tabBar3: tabBar3,
		main2: {},
	},
	footer1: {title: "This is the Footer",},
};

//Define the menu, input, and button objects
//==================================

//Station - Reference dropdown menu
var stationRefMenuObj = {
	menuIdBase: "stationRefMenu",
	label: "Select Station",
	menuList: 'stationList.menu',
	selectedParam: 'stationList.reference',
	selectFuncName: 'selectDropDownItem',
};
//Station - Reference radio button group
var stationRefRadioButObj = {
	menuIdBase: 'stationRef',
	menuList: 'stationList.menu',
	selectedParam: 'stationList.reference',
	style: "width:100px;display:inline-block",
	selectFuncName: 'selectRadioBtn',
};	
//Station - Comparison checkbox group
var stationCheckBoxObj = {
	menuIdBase: 'station',
	menuList: 'stationList.menu',
	selectedParam: 'stationList.comp',
	style: "width:100px;display:inline-block",
	selectFuncName: 'selectCheckBox',
};
//Station  - Text Input
var stationInputObj = {
	inputId: 'stationInput',
	label: "Select Station",
	style: "width:200px",			//Add 'margin:auto' to center
	paramName: 'sampleDataObj.station',
	inputFuncName: 'selectInput',
};	

//Year - Reference radio button group
var yearRefRadioButObj = {
	menuIdBase: 'yearRef',
	menuList: 'yearList.menu',
	selectedParam: 'yearList.reference',
	width: 'm12',
	selectFuncName: 'selectRadioBtn',
};
//Year - Comparison Checkbox group
var yearCheckBoxObj = {
	menuIdBase: 'year',
	menuList: 'yearList.menu',
	selectedParam: 'yearList.comp',
	width: 'm12',
	selectFuncName: 'selectCheckBox',
};
//Year - Text input
var yearInputObj = {
	inputId: 'yearInput',
	label: "Select Year",
	style: "width:200px",			//Add 'margin:auto' to center
	paramName: 'sampleDataObj.year',	
	inputFuncName: 'selectInput',
};	

//Month - Checkbox group
var monthCheckBoxObj = {
	menuIdBase: 'month',
	menuList: 'monthList.menu',
	selectedParam: 'monthList.comp',
	width: 'm12',
	selectFuncName: 'selectCheckBox',
};

//Day text input
var dayInputObj = {
	inputId: 'dayInput',
	label: "Select Date (YYYYMMDD)",
	style: 'width:200px; margin:auto',	//Centered
	paramName: 'dayList.reference',
	inputFuncName: 'selectInput',
};	

//Parameter - Reference Radio button group
var paramRefRadioButObj = {
	menuIdBase: 'paramRef',
	menuList: 'paramList.menu',
	selectedParam: 'paramList.reference',
	width: 'm12',
	selectFuncName: 'selectRadioBtn',
};	
//Parameter - Comparison Checkbox group
var paramCheckBoxObj = {
	menuIdBase: 'param',
	menuList: 'paramList.menu',
	selectedParam: 'paramList.comp',
	width: 'm12',
	selectFuncName: 'selectCheckBox',
};
//Parameter - Text input
var paramInputObj = {
	inputId: 'paramInput',
	label: "Select Parameter",
	style: "width:200px",			//Add 'margin:auto' to center
	paramName: 'sampleDataObj.param',
	inputFuncName: 'selectInput',
};	

//Average Parameters - Reference radio button group
var paramAveRefRadioButObj = {
	menuIdBase: 'paramAveRef',
	menuList: 'paramListAve.menu',
	selectedParam: 'paramListAve.reference',
	style: "width:100px;display:inline-block",
	selectFuncName: 'selectRadioBtn',
};	
//Average Parameters - Comparison checkbox group
var paramAveCheckBoxObj = {
	menuIdBase: 'paramAve',
	menuList: 'paramListAve.menu',
	selectedParam: 'paramListAve.comp',
	style: "width:100px;display:inline-block",
	selectFuncName: 'selectCheckBox',
};
//Min/Max Parameters - Reference radio button group
var paramMinMaxRefRadioButObj = {
	menuIdBase: 'paramMinMaxRef',
	menuList: 'paramListMinMax.menu',
	selectedParam: 'paramListMinMax.reference',
	style: "width:100px;display:inline-block",
	selectFuncName: 'selectRadioBtn',
};	
//Min/Max Parameters - Comparison checkbox group
var paramMinMaxCheckBoxObj = {
	menuIdBase: 'paramMinMax',
	menuList: 'paramListMinMax.menu',
	selectedParam: 'paramListMinMax.comp',
	style: "width:100px;display:inline-block",
	selectFuncName: 'selectCheckBox',
};
//Freeze Date Parameters - Reference radio button group
var paramFreezeRefRadioButObj = {
	menuIdBase: 'paramFreezeRef',
	menuList: 'paramListFreeze.menu',
	selectedParam: 'paramListFreeze.reference',
	style: "width:100px;display:inline-block",
	selectFuncName: 'selectRadioBtn',
};	
//Freeze Date Parameters - Comparison checkbox group
var paramFreezeCheckBoxObj = {
	menuIdBase: 'paramFreeze',
	menuList: 'paramListFreeze.menu',
	selectedParam: 'paramListFreeze.comp',
	style: "width:100px;display:inline-block",
	selectFuncName: 'selectCheckBox',
};

//Date min temp text input
var dayMinInputObj = {
	inputId: 'dayMinInput',
	label: "Minimum Temp",
	style: 'width:200px; margin:auto',	//Centered
	paramName: 'dayList.min',
	inputFuncName: 'selectInput',
};	
//Date max temp text input
var dayMaxInputObj = {
	inputId: 'dayMaxInput',
	label: "Maximum Temp",
	style: 'width:200px; margin:auto',	//Centered
	paramName: 'dayList.max',
	inputFuncName: 'selectInput',
};	

//Phenology Case dropdown menu
var phenCaseMenuObj = {
	menuIdBase: "phenology",
	label: "Select Phenology Case",
	menuList: 'phenologyList.menu',
	selectedParam: 'phenologyList.selected',
	selectFuncName: 'selectDropDownItem',
};
	
//API Sample fetch button
var btnFetchSampleDataObj = {
	btnId: 'btnFetchSample',
	label: 'Fetch Sample',
	style: '',
	//style: 'text-align:center',		//Centered
	btnFuncName: 'selectFetchSampleDataBtn',
};
//API Station full data fetch button
var btnFetchStationDataObj = {
	btnId: 'btnFetchStation',
	label: 'Fetch Station',
	style: '',
	//style: 'text-align:center',		//Centered
	btnFuncName: 'selectFetchStationDataBtn',
};	
