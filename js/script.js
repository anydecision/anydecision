// Declaring Variables
var mainList = new Array();
var storeSelect = new Array();
var parent = new Array();
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

// Checks to see if there is a null value in 'mainList'
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
	// Sets the 0 position of storeSelect to an array of [0, 1, 2... length of mainList]
	for (i=0; i<mainList.length; i++) {
		storeSelect[n][i] = i;
	}
	parent[n] = -1;
	totalSize = 0;
	n++;
//?? Sets storeSelect array to a broken apparent numbered version of mainList
	for (i=0; i<storeSelect.length; i++) {
		// Runs through the 
		if(storeSelect[i].length>=2) {
			// Sets 'mid' to half the length of 'storeSelect' rounded up
			mid = Math.ceil(storeSelect[i].length/2);
			storeSelect[n] = new Array();
			// Sets the new array to the first half of the i position of 'storeSelect' (not including 'mid')
			storeSelect[n] = storeSelect[i].slice(0,mid);
			totalSize += storeSelect[n].length;
//?? Not sure what 'parent' even does
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
// Save users choice to the 'record' array
function sortList(flag){
	var i;
	var str;
	// If user clicked LEFT
	if (flag<0) {
		record[newRecord] = storeSelect[leftChoice][head1];
		head1++;
		newRecord++;
		finishSize++;
	// If user clicked RIGHT
	} else if (flag>0) {
		record[newRecord] = storeSelect[rightChoice][head2];
		head2++;
		newRecord++;
		finishSize++;
	} else {
		record[newRecord] = storeSelect[leftChoice][head1];
		head1++;
		newRecord++;
		finishSize++;
		record[newRecord] = storeSelect[rightChoice][head2];
		head2++;
		newRecord++;
		finishSize++;
	}
	// Processing after it has finished scanning the list of one
	// Sets the next position in the record array to the losing option (LEFT)
	if (head1<storeSelect[leftChoice].length && head2==storeSelect[rightChoice].length) {
		// rightChoice list is scanned - copy the rest of the list leftChoice
		while (head1<storeSelect[leftChoice].length){
			record[newRecord] = storeSelect[leftChoice][head1];
			head1++;
			newRecord++;
			finishSize++;
		}
	// Sets the next position in the record array to the losing option (RIGHT)	
	} else if (head1==storeSelect[leftChoice].length && head2<storeSelect[rightChoice].length) {
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
		// Reset record array before you make a new comparison
		if (head1==0 && head2==0) {
			for (i=0; i<mainList.length; i++) {
				record[i] = 0;
			}
			newRecord = 0;
		}
	} else if(storeSelect.length == 3){
		console.log('final answer', mainList[record[0]]);
		if(head1+head2 > 2){
			console.log('top three answers:', mainList[record[0]], mainList[record[1]], mainList[record[2]]);
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
	str += "<tr>"+"<td>Name</td>";
	if(finalResults.length > 1){
		str+= "<td style=\"text-align: center;\">Avg Rank</td>"
		for (i=0; i<finalResults.length; i++){
			str += "<td style=\"text-align: center;\">P"+(i+1)+"</td>";
		}
	} else {
		str += "<td style=\"text-align: center;\">Rank</td></tr>";
	}
	
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
	str += "<\/table></div><br \/><div id=\"resultOptions\"><div id=\"groupBox\"><h2>Group Decision<\/h2><hr /><p>With a group?<br />Let everyone have a say.</p><input id=\"next_btn\" type=\"button\" name=\"Next\" label=\"Next Person\" value=\"Next Person\" onClick=\"initList(); \"><\/div><div id=\"groupBox\"><h2>New Decision<\/h2><hr /><p>Done with this list?<br />Go back to create a new one.</p><a href=\"\/\" tabindex=\"-1\"><input id=\"reset_btn\" type=\"button\" name=\"Reset\" label=\"Reset\" value=\"Start Over\" onClick=\"goBack(); clearOptions(); reset();\"><\/div><\/div><\/a>";
	/*&nbsp; &nbsp; <input type=\"button\" value=\"Reset\" onClick=\"window.location.reload()\">*/
	document.getElementById("resultField").style.visibility = "visible";
	document.getElementById("resultField").innerHTML = str;
	document.getElementById("quiz").style.display = "none";
	document.getElementById("banner").innerHTML = "<div class=\"toolTip\"><span class=\"toolTipText\">Return to the first screen and lose result data.<\/span><input type=\"button\" name=\"Edit\" label=\"Edit List\" value=\"Edit List\" id=\"back_btn\" onclick=\"goBack(); reset();\"\/><\/div>";
}
// Display two elements to be compared
function showImage() {
	document.getElementById("tagLine").style.display = "none";
	document.getElementById("quiz").style.display = "inline";
	document.getElementById("banner").innerHTML = "<div class=\"toolTip\"><span class=\"toolTipText\">Return to the first screen and lose result data.<\/span><input type=\"button\" name=\"Edit\" label=\"Edit List\" value=\"Edit List\" id=\"back_btn\" onclick=\"goBack(); reset();\"\/><\/div>";
	document.getElementById("resultField").innerHTML = "";
	document.getElementById("resultField").style.visibility = "hidden";
	document.getElementById("options").style.display = "none";
	var str0 = Math.floor(finishSize*100/totalSize)+"%";
	var str1 = ""+namingBoxFunc(storeSelect[leftChoice][head1]);
	var str2 = ""+namingBoxFunc(storeSelect[rightChoice][head2]);
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
// Convert 'storeSelect' to 'mainList'
function namingBoxFunc(n){
	var textStr = mainList[n];
	return textStr;
}
	leftPress();
	rightPress();
// Allows the user to press the "Left" key instead of clicking the left option
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
function resetTime(){
	var difference = mainList.length-nullArray.length;
	if (difference > 1){
		timeEstimate = Math.floor(Math.pow(difference, 1.655)-2);
		document.getElementById("estimatedTime").innerHTML = "Approx. "+timeEstimate+" seconds";
		if (timeEstimate > 100){
			document.getElementById("estimatedTime").style.color = "#EF3E36";
		} else if (timeEstimate > 60 && timeEstimate < 100){
			document.getElementById("estimatedTime").style.color = "#F3B700";
		} else {
			document.getElementById("estimatedTime").style.color = "#22C1C3";
		}
	} else {
		timeEstimate = 0;
		document.getElementById("estimatedTime").innerHTML = "";
	}
}
function showData(){
	// Removes the default text in Option List
	document.getElementById("emptyOptions").innerHTML = " ";
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
		} else if(mainList.indexOf(inputText)==-1){
			// Adds the user provided text at the end of mainList
			mainList.push(inputText);
			// Suggests adding more options
			if ((mainList.length-nullArray.length)<2){
				document.getElementById("question").innerHTML = "Please add at least two:";
				document.getElementById("question").style.color = "inherit";
			}else{
				document.getElementById("question").innerHTML = "Submit any new options not listed:";
				document.getElementById("question").style.color = "inherit";				
			}
			// Tell user item has been added
			added();
		} else {
			// Suggests user should type an option
			document.getElementById("question").innerHTML = "Duplicate entries not allowed.";
			document.getElementById("question").style.color = "#f26430";
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
		document.getElementById("count").innerHTML = (mainList.length-nullArray.length)+" options";
	// Makes start button available if the mainList array has at least two non-null items
	if ((mainList.length-nullArray.length)>=2){
		document.getElementById("start_btn").disabled = false;
	};
	// Resets the optionChoices input field
	document.getElementById("optionChoices").innerHTML = "";
	// Fills in the optionChoices section from the mainList array
	for(i=0; i<mainList.length; i++){
		// If the i value of mainList isn't set to null
		if(mainList[i] != null){
			// Create items in optionChoices with an id, remove button, and mainList location of i
			document.getElementById("optionChoices").innerHTML += "<div id="+i+"><p>"+"<input type=\"button\" id=\"close_btn\"value=\" \" onclick=\"remove("+i+");\"/> "+mainList[i]+"<\/p><\/div>";
		}
	}
	if(restarted == true){
		document.getElementById("question").innerHTML = "Submit any new options not listed:";
		document.getElementById("question").style.color = "inherit";
		restarted = false;
	} else {
		document.getElementById("txtOption").focus();
	}
	resetTime();
}
// Allows the user to press the "Enter" key instead of clicking "Submit Option"
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
// Removes items from the options list
function remove(item){
	document.getElementById("start_btn").disabled = true;
	// Sets the selected item in mainList to null
	mainList.splice(item, 1, null);
	// Resets the section in optionChoices
	document.getElementById(item).innerHTML = "";
	document.getElementById(item).style.margin = "0px";
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
	document.getElementById("tagLine").style.display = "inherit";
	document.getElementById("quiz").style.display = "none";
	document.getElementById("banner").innerHTML = "<h1>From the list below,<br />remove any irrelevant items.</h1>";
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
function highlight(){
	document.getElementById("submission").style.border = "1px solid #5BC0EB";
}
function noHighlight(){
	document.getElementById("submission").style.border = "1px solid #efefef";
}
function reset(){
	finalResults = [];
}
function added(){
	var notice = document.getElementById("added");	
	notice.style.opacity = "100";
	setTimeout(function(){notice.style.opacity = "0"}, 1500);
}
function scrollFunction() {
	var scrollTopx = document.body.scrollTop;
	var scrollTopy = document.documentElement.scrollTop;
    if (scrollTopx > 2500 || scrollTopy > 2500) {
		document.getElementById("donate").classList.add('active');
		document.getElementById("help").classList.remove('active');
		document.getElementById("us").classList.remove('active');
    } else if (scrollTopx > 1500 || scrollTopy > 1500){
		document.getElementById("help").classList.add('active');
		document.getElementById("donate").classList.remove('active');
		document.getElementById("us").classList.remove('active');
	} else {
		document.getElementById("us").classList.add('active');
		document.getElementById("help").classList.remove('active');
		document.getElementById("donate").classList.remove('active');
	}
}
function check(){
	if(localStorage.getItem('tacos')){
		var myObject = JSON.parse(localStorage.getItem('tacos'));
		mainList = myObject;
		restarted = true;
		showData();
		localStorage.removeItem('tacos');
	} else if(localStorage.getItem('custom')){
		document.getElementById("txtOption").focus();
	}
}
function setLocalStorageCustom(){
	localStorage.setItem('custom', ' ');
}
function setLocalStorage(opt){
	switch (opt) {
    case 'samVac':
        var sendOpt = new Array("Relaxating Beach Trip", "Cruise Vacation", "Hiking / Camping Trip", "Skiing / Snowboarding");
        break;
    case 'samGot':
        var sendOpt = new Array("Arya Stark", "John Snow", "Daenerys Targaryen", "Sansa Stark");
        break;
    case 'samFoo':
        var sendOpt = new Array("Mexican Food", "Italian Cuisine", "Asian Food", "Seafood", "American Food");
        break;
    case 'foo':
        var sendOpt = new Array("Mexican Food", "Italian Cuisine", "Indian Food", "Thai Food", "Greek Cuisine", "Chinese Food", "Japanese Cuisine", "American Food", "Mediterranean Cuisine", "Korean Food",
"Vietnamese Food", "Seafood", "Southern Food");
        break;
    case 'vac':
        var sendOpt = new Array("Beach Trip", "Relaxation and/or Yoga Retreat", "Cruise Vacation", "Hiking / Camping Trip", "Backpacking / Hitch Hiking", "Hunting / Fishing Trip", "Skiing / Snowboarding",
"Safari Trek", "Sightseeing/Art and Culture", "Wine Tasting", "Golfing Trip", "Theme Park", "Road Trip", "Festival/Live Event", "Volunteering Trip", "Stay-cation");
        break;
    case 'mov':
        var sendOpt = new Array("Action", "Adventure", "Animated", "Comedy", "Crime", "Documentary", "Drama", "Family", "Fantasy", "Historical", "Horror", "Musical", "Mystery", "Romance",
"Romantic Comedy", "Sci-Fi", "Sports", "Spy", "Superhero", "Thriller Suspense", "War", "Western");
        break;
    case 'tat':
        var sendOpt = new Array("Face", "Behind Ear", "Neck", "Shoulder", "Bicep", "Forearm", "Wrist", "Hand", "Finger", "Upper Back", "Lower Back", "Chest", "Stomach", "Side/Ribs", "Buttocks",
"Thigh", "Calves", "Ankle", "Foot");
		break;
    case 'got':
        var sendOpt = new Array("Arya Stark", "Beric Dondarrion", "Bran Stark", "Brienne of Tarth", "Bronn", "Cersei Lannister", "Daenerys Targaryen", "Davos Seaworth", "Ellaria Sand", "Euron Greyjoy",
"Gendry", "Gilly", "Grey Worm", "Hodor", "Hot Pie", "Jaime Lannister", "Jaqen H'ghar (No One)", "Jon Snow", "Jorah Mormont", "Lyanna Mormont", "Melisandre", "Missandei", "Olenna Tyrell",
"Petyr Baelish (Littlefinger)", "Podrick Payne", "Qyburn", "Samwell Tarly", "Sansa Stark", "The Hound", "The Mountain", "The Night King", "Theon Greyjoy", "Tormund Giantsbane", "Tycho Nestoris",
"Tyrion Lannister", "Varys", "Yara Greyjoy");
		break;
    case 'net':
        var sendOpt = new Array("Stranger Things", "Orange is the New Black", "Dear White People", "A Series of Unfortunate Events", "G.L.O.W.", "Black Mirror", "Easy", "White Rabbit Project",
"The Crown", "Narcos", "13 Reasons Why", "House of Cards", "Master of None", "Love", "Girlboss", "Hemlock Grove");
		break;
}
	localStorage.setItem('tacos', JSON.stringify(sendOpt));
}