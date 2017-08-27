// Declaring Variables
var mainList = new Array();
var storeSelect = new Array();
var parent = new Array();
var equal = new Array();
var record = new Array();
var leftChoice,rightChoice;
var head1,head2;
var newRecord;
var numQuestion;
var totalSize;
var finishSize;
var finishFlag;
var restarted = false;
var finalResults = new Array();
var calculate = new Array();
var timeEstimate;
var firstScroll = true;

// Popular Categories
var food = new Array("Mexican Food", "Italian Cuisine", "Indian Food", "Thai Food", "Greek Cuisine", "Chinese Food", "Japanese Cuisine", "American Food", "Mediterranean Cuisine", "Korean Food",
"Vietnamese Food", "Seafood", "Southern Food");
var vacation = new Array("Beach Trip", "Relaxation and/or Yoga Retreat", "Cruise Vacation", "Hiking/Camping Trip", "Backpacking/Hitch Hiking", "Hunting/Fishing Trip", "Skiing/Snowboarding",
"Safari Trek", "Sightseeing/Art and Culture", "Wine Tasting", "Golfing Trip", "Theme Park", "Road Trip", "Festival/Live Event", "Volunteering Trip", "Stay-cation");
var movieGenre = new Array("Action", "Adventure", "Animated", "Comedy", "Crime", "Documentary", "Drama", "Family", "Fantasy", "Historical", "Horror", "Musical", "Mystery", "Romance",
"Romantic Comedy", "Sci-Fi", "Sports", "Spy", "Superhero", "Thriller Suspense", "War", "Western");
var tattoo = new Array("Face", "Behind Ear", "Neck", "Shoulder", "Bicep", "Forearm", "Wrist", "Hand", "Finger", "Upper Back", "Lower Back", "Chest", "Stomach", "Side/Ribs", "Buttocks",
"Thigh", "Calves", "Ankle", "Foot");
var got = new Array("Arya Stark", "Beric Dondarrion", "Bran Stark", "Brienne of Tarth", "Bronn", "Cersei Lannister", "Daenerys Targaryen", "Davos Seaworth", "Ellaria Sand", "Euron Greyjoy",
"Gendry", "Gilly", "Grey Worm", "Hodor", "Hot Pie", "Jaime Lannister", "Jaqen H'ghar (No One)", "Jon Snow", "Jorah Mormont", "Lyanna Mormont", "Melisandre", "Missandei", "Olenna Tyrell",
"Petyr Baelish (Littlefinger)", "Podrick Payne", "Qyburn", "Samwell Tarly", "Sansa Stark", "The Hound", "The Mountain", "The Night King", "Theon Greyjoy", "Tormund Giantsbane", "Tycho Nestoris",
"Tyrion Lannister", "Varys", "Yara Greyjoy");
var tvNetflix = new Array("Stranger Things", "Orange is the New Black", "Dear White People", "A Series of Unfortunate Events", "G.L.O.W.", "Black Mirror", "Easy", "White Rabbit Project",
"The Crown", "Narcos", "13 Reasons Why", "House of Cards", "Master of None", "Love", "Girlboss", "Hemlock Grove");
var emoji = new Array("😀", "😁", "😂", "😅", "😜", "🤐", "😍", "🤗", "😳", "😇", "💩", "🙈", "🙉", "🙊", "💅", "💖");

var popCatNums = new Array("food", "vacation", "movieGenre", "tattoo", "got", "tvNetflix", "emoji");
var popCategories = new Array(food, vacation, movieGenre, tattoo, got, tvNetflix, emoji);


// Checks to see if there is a null value in mainList
function checkNull(namMem) {
    return namMem == null;
}
// If there are null objects, this function removes them from the array
function myFunction() {
	for(i=0; i<mainList.length; i++){
		if(mainList.some(checkNull)){
			var x = mainList.indexOf(null);
			mainList.splice(x,1);
			i--;
		}
	}
	nullArray = [];
}
// Variable initialization
function initList(){
	// Calls myFunction
	myFunction();
	var n = 0;
	var mid;
	var i;
	storeSelect[n] = new Array();
	for (i=0; i<mainList.length; i++) {
		storeSelect[n][i] = i;
	}
	parent[n] = -1;
	totalSize = 0;
	n++;
	for (i=0; i<storeSelect.length; i++) {
		if(storeSelect[i].length>=2) {
			mid = Math.ceil(storeSelect[i].length/2);
			storeSelect[n] = new Array();
			storeSelect[n] = storeSelect[i].slice(0,mid);
			totalSize += storeSelect[n].length;
			parent[n] = i;
			n++;
			storeSelect[n] = new Array();
			storeSelect[n] = storeSelect[i].slice(mid,storeSelect[i].length);
			totalSize += storeSelect[n].length;
			parent[n] = i;
			n++;
		}
	}
 	for (i=0; i<mainList.length; i++) {
		record[i] = 0;
	}
	newRecord = 0;
	for (i=0; i<=mainList.length; i++) {
		equal[i] = -1;
	}
 	leftChoice = storeSelect.length-2;
	rightChoice = storeSelect.length-1;
	head1 = 0;
	head2 = 0;
	numQuestion = 1;
	finishSize = 0;
	finishFlag = 0;
    document.body.scrollTop = 0; // For Chrome, Safari and Opera 
    document.documentElement.scrollTop = 0; // For IE and Firefox
	showImage();
}
function sortList(flag){
	var i;
	var str;
 
	// Save to record
	if (flag<0) {
		record[newRecord] = storeSelect[leftChoice][head1];
		head1++;
		newRecord++;
		finishSize++;
		while (equal[record[newRecord-1]]!=-1) {
			record[newRecord] = storeSelect[leftChoice][head1];
			head1++;
			newRecord++;
			finishSize++;
		}
	}
	else if (flag>0) {
		record[newRecord] = storeSelect[rightChoice][head2];
		head2++;
		newRecord++;
		finishSize++;
		while (equal[record[newRecord-1]]!=-1) {
			record[newRecord] = storeSelect[rightChoice][head2];
			head2++;
			newRecord++;
			finishSize++;
		}
	}
	else {
		record[newRecord] = storeSelect[leftChoice][head1];
		head1++;
		newRecord++;
		finishSize++;
		while (equal[record[newRecord-1]]!=-1) {
			record[newRecord] = storeSelect[leftChoice][head1];
			head1++;
			newRecord++;
			finishSize++;
		}
		equal[record[newRecord-1]] = storeSelect[rightChoice][head2];
		record[newRecord] = storeSelect[rightChoice][head2];
		head2++;
		newRecord++;
		finishSize++;
		while (equal[record[newRecord-1]]!=-1) {
			record[newRecord] = storeSelect[rightChoice][head2];
			head2++;
			newRecord++;
			finishSize++;
		}
	}
	// Processing after it has finished scanning the list of one
	if (head1<storeSelect[leftChoice].length && head2==storeSelect[rightChoice].length) {
		// rightChoice list is scanned - copy the rest of the list leftChoice
		while (head1<storeSelect[leftChoice].length){
			record[newRecord] = storeSelect[leftChoice][head1];
			head1++;
			newRecord++;
			finishSize++;
		}
	}
	else if (head1==storeSelect[leftChoice].length && head2<storeSelect[rightChoice].length) {
		// leftChoice list is scanned - copy the rest of the list rightChoice
		while (head2<storeSelect[rightChoice].length){
			record[newRecord] = storeSelect[rightChoice][head2];
			head2++;
			newRecord++;
			finishSize++;
		}
	}
	// If the user reaches the end of both lists go ahead and update the parent list
	if (head1==storeSelect[leftChoice].length && head2==storeSelect[rightChoice].length) {
		for (i=0; i<storeSelect[leftChoice].length+storeSelect[rightChoice].length; i++) {
			storeSelect[parent[leftChoice]][i] = record[i];
		}
		storeSelect.pop();
		storeSelect.pop();
		leftChoice = leftChoice-2;
		rightChoice = rightChoice-2;
		head1 = 0;
		head2 = 0;
		// Initialize the record before you make a new comparison
		if (head1==0 && head2==0) {
			for (i=0; i<mainList.length; i++) {
				record[i] = 0;
			}
			newRecord = 0;
		}
	}
	if (leftChoice<0) {
		str = "Option No."+(numQuestion-1)+"<br>"+Math.floor(finishSize*100/totalSize)+"% sorted.";
		document.getElementById("percentComplete").innerHTML = str;
		showResult();
		finishFlag = 1;
	}
	else {
		showImage();
	}
}
 
// View Results
function showResult() {
	var ranking = 1;
	var sameRank = 1;
	var str = "";
	finalResults.push(storeSelect[0]);
	calculate=[];
	var calc2= new Array();
	for (i=0; i < mainList.length; i++) {
		var sum = 0;
			for (j=0; j<finalResults.length; j++) {
				var condense = finalResults[j];
				sum+=condense.indexOf(i);
		}
		calculate.push(sum);
	}
		function sortInt(a,b) {
			return a - b;
		}
		var justin = new Array();
		for (i=0; i < calculate.length; i++) {
			calc2.push(calculate[i]);
		}
			calc2.sort(sortInt);
		for (i=0; i < mainList.length; i++) {
			justin.push(mainList[calculate.indexOf(calc2[i])]);
			calculate.splice((calculate.indexOf(calc2[i])), 1, null);
		}
	str+="<div id=\"winner\"><p>And the winner is:<\/p><span>"+justin[0]+"<\/span></div><br /><div id=\"scrollResults\"><table id=\"results\" align=\"center\">";
	// Table heading section
	str += "<tr>"+"<td>Name</td><td style=\"text-align: center;\">Rank</td>";
	if(finalResults.length > 1){
		for (i=0; i<finalResults.length; i++){
			str += "<td style=\"text-align: center;\">P"+(i+1)+"</td>";
		}
	}
	str += "</tr>"
	
	// Runs the length of mainList
	for (i=0; i < mainList.length; i++) {
		// Adds the name of each option in order of the justin array
		str += "<tr>"+"<td>"+justin[i]+"<\/td>";
		// Creates a row and adds the rank numbers in order
		str += "<td style=\"text-align: center;\">"+(i+1)+"</td>";
		// Adds the values of the options as they were ranked
		if(finalResults.length > 1){
			for (j=0; j<finalResults.length; j++) {
				var cond = finalResults[j];
				str += "<td style=\"text-align: center;\">"+(cond.indexOf(mainList.indexOf(justin[i]))+1)+"<\/td>";
			}
		}
		// Ends each row
		str += "<\/tr>";
	}
	str += "<\/table></div><br \/><div id=\"groupBox\"><h2>Group Decision<\/h2><hr /><p>With a group?<br />Let everyone have a say.</p><label id=\"next_lbl\">Next Person&nbsp;&nbsp;<input id=\"next_btn\" type=\"button\" name=\"Next\" label=\"Next Person\" value=\" \" onClick=\"initList(); \"><\/label><\/div>";
	/*&nbsp; &nbsp; <input type=\"button\" value=\"Reset\" onClick=\"window.location.reload()\">*/
	document.getElementById("resultField").style.visibility = "visible";
	document.getElementById("resultField").innerHTML = str;
	document.getElementById("quiz").style.display = "none";
	document.getElementById("banner").innerHTML = "<div class=\"toolTip\"><span class=\"toolTipText\">This will bring you back to the first screen and erase your result data.<\/span><input type=\"button\" name=\"Edit\" label=\"Edit List\" value=\"Edit List\" id=\"back_btn\" onclick=\"goBack(); reset();\"\/><\/div><div id=\"logo_sm\"><\/div>";
	loadAddThis();
}
// Call this function once the rest of the document is loaded
function loadAddThis() {
	addthis.init()
}
// Display two elements to be compared
function showImage() {
	document.getElementById("submittingOptions").style.display = "none";
	document.getElementById("tagLine").style.display = "none";
	document.getElementById("quiz").style.display = "inline";
	document.getElementById("banner").innerHTML = "<div class=\"toolTip\"><span class=\"toolTipText\">This will bring you back to the first screen and erase your result data.<\/span><input type=\"button\" name=\"Edit\" label=\"Edit List\" value=\"Edit List\" id=\"back_btn\" onclick=\"goBack(); reset();\"\/><\/div><div id=\"logo_sm\"><\/div>";
	document.getElementById("resultField").innerHTML = "";
	document.getElementById("resultField").style.visibility = "hidden";
	document.getElementById("options").style.display = "none";
	var str0 = Math.floor(finishSize*100/totalSize)+"%";
	var str1 = ""+toNameFace(storeSelect[leftChoice][head1]);
	var str2 = ""+toNameFace(storeSelect[rightChoice][head2]);
	document.getElementById("percentComplete").innerHTML = str0;
	document.getElementById("leftField").innerHTML = str1;
	document.getElementById("rightField").innerHTML = str2;
	numQuestion++;
	// Display a progress bar
	var bar = document.getElementById("progressBar");
	var width = Math.floor(finishSize*100/totalSize);
	if(width==0){
		width=1;
	}
	bar.style.width = width + '%';
}
	leftPress();
	rightPress();
// Allows the user to press "Left" instead of clicking the left option
function leftPress(){
	document.addEventListener("keyup", function(event) {
	event.preventDefault();
		if (event.keyCode == 37) {
			document.getElementById("leftField").click();
		};
	});
}
function rightPress(){
	document.addEventListener("keyup", function(event) {
	event.preventDefault();
		if (event.keyCode == 39) {
			document.getElementById("rightField").click();
		};
	});
}

// Resets the program without losing the quiz options
function tryAgain(){
	nullArray = [];
	restarted = true;
	document.getElementById("submittingOptions").style.display = "inherit";
	document.getElementById("tagLine").style.display = "inherit";
	document.getElementById("quiz").style.display = "none";
	document.getElementById("banner").innerHTML = "<div id=\"logo\"><\/div>";
	document.getElementById("options").style.display = "inherit";
	document.getElementById("resultField").innerHTML = "";
	document.getElementById("resultField").style.visibility = "hidden";
}
 
// Convert numbers to names (emoticons)
function toNameFace(n){
	var str = mainList[n];
	return str;
}

function resetTime(){
	var difference = mainList.length-nullArray.length;
	if (difference > 1){
		timeEstimate = Math.floor(Math.pow(difference, 1.655)-2);
		document.getElementById("estimatedTime").innerHTML = "Approx. "+timeEstimate+" seconds";
	} else {
		timeEstimate = 0;
		document.getElementById("estimatedTime").innerHTML = "";
	}
}

function showData(){
	// Removes the default text in Option List
	document.getElementById("emptyOptions").innerHTML = " ";
	// Finds the index of the value of popCatNums
	function checkList(cList) {
		return cList == document.getElementById("popCats").value;
	}
	// Decides if the dropdown value matches an array
	if(popCatNums.some(checkList)){
		// Rests the list if the user selects a new dropdown
		for(i=0; i<mainList.length; i++){
			mainList.splice(i);
		}
		nullArray = [];		// Sets e equal to the index of the dropdown item
		var e = popCatNums.findIndex(checkList);
		// Runs the length of the dropdown item's array
		for(i=0; i<popCategories[e].length; i++){
			// Adds each item in the array at the end of mainList
			mainList.push(popCategories[e][i]);
		}
		restarted = true;
	} else {
		var inputText = document.getElementById("txtOption").value;
		// Determines if the user provided text has characters (not just spaces or left blank)
		if (/\S/.test(inputText)){
			// Allows a user to input a list from an Excel row (separated by tabs)
			if(/\t/.test(inputText)){
				var excelT = inputText.split("\t");
				for(i=0; i<excelT.length; i++){
					mainList.push(excelT[i]);
				}
				inputText = document.getElementById("txtOption").value = "";
			} else {
				// Adds the user provided text at the end of mainList
				mainList.push(inputText);
				// Suggests adding more options
				if ((mainList.length-nullArray.length)<2){
					document.getElementById("question").innerHTML = "Please add at least two:";
					document.getElementById("question").style.color = "inherit";
				}else{
					document.getElementById("question").innerHTML = "Or, submit your options: ";
					document.getElementById("question").style.color = "inherit";				
				}
			}
			document.getElementById("submission").style.border = "1px solid #5BC0EB";
			// Resets the input field
			inputText = document.getElementById("txtOption").value = "";
			document.getElementById("txtOption").innerHTML = inputText;
		} else {
			// Suggests user should type an option
			document.getElementById("question").innerHTML = "Please submit a valid option below:";
			document.getElementById("question").style.color = "#f26430";
			inputText = document.getElementById("txtOption").value = "";
			if(mainList.length == nullArray.length){
				document.getElementById("emptyOptions").innerHTML = "Add some options above and they will fill in down here!";
				document.getElementById("optionChoices").innerHTML = " ";
				//document.getElementById("count").innerHTML = " ";
			}
		};
	}
		document.getElementById("count").innerHTML = (mainList.length-nullArray.length)+" options";
	// Makes start button available if the mainList array has at least two non-null items
	if ((mainList.length-nullArray.length)>=2){
		document.getElementById("start_btn").disabled = false;
	};
	// Resets the dropdown menu and optionChoices input field
	document.getElementById("popCats").value = "default";
	document.getElementById("optionChoices").innerHTML = "";
	// Fills in the optionChoices section from the mainList array
	for(i=0; i<mainList.length; i++){
		// If the i value of mainList isn't set to null
		if(mainList[i] != null){
			// Create items in optionChoices with an id, remove button, and mainList location of i
			document.getElementById("optionChoices").innerHTML += "<p id="+i+">"+"<input type=\"button\" id=\"close_btn\"value=\" \" onclick=\"remove("+i+");\"/> "+mainList[i]+"<\/p>";
		}
	}
	if(firstScroll){
		var showView = document.getElementById("submittingOptions");
		showView.scrollIntoView(true);
		firstScroll = false;
	}
	if(restarted == true){
		document.getElementById("question").innerHTML = "Or, submit your options: ";
		document.getElementById("question").style.color = "inherit";
		restarted = false;
	} else {
		document.getElementById("txtOption").focus();
	}
	resetTime();
}
	
	
// Allows the user to press "Enter" instead of clicking "Submit Option"
function enterPress(){
	document.getElementById("txtOption")
	.addEventListener("keyup", function(event) {
	event.preventDefault();
		if (event.keyCode == 13) {
			document.getElementById("optionSubmit_btn").click();
		};
	});
}

var nullArray = new Array();
// Removes items from the list
function remove(item){
	document.getElementById("start_btn").disabled = true;
	// Sets the selected item in mainList to null
	mainList.splice(item, 1, null);
	// Resets the section in optionChoices
	document.getElementById(item).innerHTML = "";
	// Increases the nullArray by a single value
	nullArray.push(0);
	// Checks if mainList has a value of null
	function checkNull(namMem) {
		return namMem == null;
	}
	// Check to see if the Start button should be available
	if(mainList.length == 2 && mainList.some(checkNull)){
		document.getElementById("start_btn").disabled = true;
		document.getElementById("question").innerHTML = "Please add at least two:";
		document.getElementById("question").style.color = "inherit";
	} else if(mainList.every(checkNull)){
		document.getElementById("start_btn").disabled = true;
		document.getElementById("question").innerHTML = "Please add at least two:";
		document.getElementById("question").style.color = "inherit";
	} else if((mainList.length-nullArray.length)<=1){
		document.getElementById("start_btn").disabled = true;
		document.getElementById("question").innerHTML = "Please add at least two:";
		document.getElementById("question").style.color = "inherit";
	} else {
		document.getElementById("start_btn").disabled = false;
	};
	resetTime();
	if(mainList.length == nullArray.length){
			document.getElementById("emptyOptions").innerHTML = "Add some options above and they will fill in down here!";
			document.getElementById("count").innerHTML = "0 options";
	} else {
			document.getElementById("count").innerHTML = (mainList.length-nullArray.length)+" options";
	}
}
function goBack(){
	storeSelect = [];
	nullArray = [];
	restarted = true;
	showData();
	document.getElementById("submittingOptions").style.display = "inherit";
	document.getElementById("tagLine").style.display = "inherit";
	document.getElementById("quiz").style.display = "none";
	document.getElementById("banner").innerHTML = "<div id=\"logo\"><\/div>";
	document.getElementById("options").style.display = "inherit";
	document.getElementById("resultField").innerHTML = "";
	document.getElementById("resultField").style.visibility = "hidden";
}
function clearOptions(){
	for(i=0; i<mainList.length; i++){
		mainList.splice(i);
	}
	nullArray = [];
	document.getElementById("start_btn").disabled = true;
	restarted = true;
	showData();
	document.getElementById("emptyOptions").innerHTML = "Add some options above and they will fill in down here!";
	document.getElementById("count").innerHTML = "0 options";
}

function resetDrop(){
	document.getElementById("popCats").value = "default";
}
function highlight(){
	document.getElementById("submission").style.border = "1px solid #5BC0EB";
}
function noHighlight(){
	document.getElementById("submission").style.border = "1px solid #ddd";
}
function reset(){
	finalResults = [];
}
function popClose(){
	document.getElementById("aboutScreen").style.display = "none";
	document.getElementById("helpScreen").style.display = "none";
	document.getElementById("donateScreen").style.display = "none";	
	document.getElementById("fade").style.display = "none";
	document.body.style.position = "static";
	document.body.style.overflow = "auto";
	document.body.style.width = "inherit";
}
function about(){
	document.getElementById("aboutScreen").style.display = "block";
	document.getElementById("fade").style.display = "block";
	document.body.style.position = "fixed";
	document.body.style.overflowY = "scroll";
	document.body.style.width = "-webkit-fill-available";
}
function help(){
	document.getElementById("helpScreen").style.display = "block";
	document.getElementById("fade").style.display = "block";
	document.body.style.position = "fixed";
	document.body.style.overflowY = "scroll";
	document.body.style.width = "-webkit-fill-available";
}
function donate(){
	document.getElementById("donateScreen").style.display = "block";
	document.getElementById("fade").style.display = "block";
	document.body.style.position = "fixed";
	document.body.style.overflowY = "scroll";
	document.body.style.width = "-webkit-fill-available";
}