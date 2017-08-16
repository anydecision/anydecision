// Declaring Variables
var mainList = new Array();
var lstMember = new Array();
var parent = new Array();
var equal = new Array();
var rec = new Array();
var cmp1,cmp2;
var head1,head2;
var nrec;
var numQuestion;
var totalSize;
var finishSize;
var finishFlag;
var restarted = false;
var finalResults = new Array();
var calculate = new Array();
var timeEstimate;

// Popular Categories
var fastFood = new Array("McDonald's", "Wendy's", "Taco Bell", "KFC", "Burger King", "Jack in the Box", "Five Guys", "Q'Doba", "Arby's", "Dairy Queen", "Domino's", "Pizza Hut", "Subway");
var movies = new Array("Kill Bill", "Pulp Fiction", "The Breakfast Club", "Up", "Toy Story", "Benjamin Button");
var collegePrograms = new Array("Engineering", "Political Science", "Economics", "Business Administration", "History", "English");
var popBooks = new Array("The Sorcerer's Stone", "The Chamber of Secrets", "The Prisoner of Azkaban", "The Goblet of Fire", "The Order of the Phoenix", "The Half-Blood Prince", "The Deathly Hallows");
var jBros = new Array("Joe Jonas", "Kevin Jonas", "Nick Jonas");
var tvNetflix = new Array("Stranger Things", "Orange is the New Black", "The Crown", "13 Reasons Why", "House of Cards", "Master of None", "Love", "Girlboss", "Narcos", "Hemlock Grove");
var travel = new Array("Los Angeles, California", "Loch Ness, Scotland", "Ibiza, Balearic Islands, Spain", "Bali, Indonesia", "Greek Islands, Greece", "Bora Bora, French Polynesia", "Machu Pichu, Peru" );
var adoption = new Array("Thailand", "Uganda", "China", "Ethiopia", "Ukraine", "Haiti", "South Korea", "The Phillipines", "India");

var popCatNums = new Array("fastFood", "movies", "collegePrograms", "jBros", "popBooks", "tvNetflix", "travel", "adoption");
var popCategories = new Array(fastFood, movies, collegePrograms, jBros, popBooks, tvNetflix, travel, adoption);


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
 
	// Sequence to be sorted
	lstMember[n] = new Array();
	for (i=0; i<mainList.length; i++) {
		lstMember[n][i] = i;
	}
	parent[n] = -1;
	totalSize = 0;
	n++;
 
	for (i=0; i<lstMember.length; i++) {
		// If the number of elements is two or more, divide by 2
		// Add the divided array to the end of lstMember
		if(lstMember[i].length>=2) {
			mid = Math.ceil(lstMember[i].length/2);
			lstMember[n] = new Array();
			lstMember[n] = lstMember[i].slice(0,mid);
			totalSize += lstMember[n].length;
			parent[n] = i;
			n++;
			lstMember[n] = new Array();
			lstMember[n] = lstMember[i].slice(mid,lstMember[i].length);
			totalSize += lstMember[n].length;
			parent[n] = i;
			n++;
		}
	}
 
	// Save the arrangment (Store array)
	for (i=0; i<mainList.length; i++) {
		rec[i] = 0;
	}
	nrec = 0;
 
	// Save list of draw results list
	// Key: value of link start point
	// Value: value of link end point
	for (i=0; i<=mainList.length; i++) {
		equal[i] = -1;
	}
 	cmp1 = lstMember.length-2;
	cmp2 = lstMember.length-1;
	head1 = 0;
	head2 = 0;
	numQuestion = 1;
	finishSize = 0;
	finishFlag = 0;
    document.body.scrollTop = 0; // For Chrome, Safari and Opera 
    document.documentElement.scrollTop = 0; // For IE and Firefox
	// Show the quiz
	showImage();
}
 
// Sort the list
// flag: comparison result
// -1・・Choose the left)
// 0・・Draw)
// 1・・Choose the Right)
function sortList(flag){
	var i;
	var str;
 
	// Save to rec
	if (flag<0) {
		rec[nrec] = lstMember[cmp1][head1];
		head1++;
		nrec++;
		finishSize++;
		while (equal[rec[nrec-1]]!=-1) {
			rec[nrec] = lstMember[cmp1][head1];
			head1++;
			nrec++;
			finishSize++;
		}
	}
	else if (flag>0) {
		rec[nrec] = lstMember[cmp2][head2];
		head2++;
		nrec++;
		finishSize++;
		while (equal[rec[nrec-1]]!=-1) {
			rec[nrec] = lstMember[cmp2][head2];
			head2++;
			nrec++;
			finishSize++;
		}
	}
	else {
		rec[nrec] = lstMember[cmp1][head1];
		head1++;
		nrec++;
		finishSize++;
		while (equal[rec[nrec-1]]!=-1) {
			rec[nrec] = lstMember[cmp1][head1];
			head1++;
			nrec++;
			finishSize++;
		}
		equal[rec[nrec-1]] = lstMember[cmp2][head2];
		rec[nrec] = lstMember[cmp2][head2];
		head2++;
		nrec++;
		finishSize++;
		while (equal[rec[nrec-1]]!=-1) {
			rec[nrec] = lstMember[cmp2][head2];
			head2++;
			nrec++;
			finishSize++;
		}
	}
 
	// Processing after it has finished scanning the list of one
	if (head1<lstMember[cmp1].length && head2==lstMember[cmp2].length) {
		// Cmp2 list is scanned - copy the rest of the list cmp1
		while (head1<lstMember[cmp1].length){
			rec[nrec] = lstMember[cmp1][head1];
			head1++;
			nrec++;
			finishSize++;
		}
	}
	else if (head1==lstMember[cmp1].length && head2<lstMember[cmp2].length) {
		// Cmp1 list is scanned - copy the rest of the list cmp2
		while (head2<lstMember[cmp2].length){
			rec[nrec] = lstMember[cmp2][head2];
			head2++;
			nrec++;
			finishSize++;
		}
	}
 
	// If you reach the end of both lists
	// Update the parent list
	if (head1==lstMember[cmp1].length && head2==lstMember[cmp2].length) {
		for (i=0; i<lstMember[cmp1].length+lstMember[cmp2].length; i++) {
			lstMember[parent[cmp1]][i] = rec[i];
		}
		lstMember.pop();
		lstMember.pop();
		cmp1 = cmp1-2;
		cmp2 = cmp2-2;
		head1 = 0;
		head2 = 0;
 
		// Initialize the rec before you make a new comparison
		if (head1==0 && head2==0) {
			for (i=0; i<mainList.length; i++) {
				rec[i] = 0;
			}
			nrec = 0;
		}
	}
 
	if (cmp1<0) {
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
	str += "<p>And the winner is:<\/p>"
	finalResults.push(lstMember[0]);
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
	str+="<div id=\"winner\">"+justin[0]+"</div><br /><div id=\"scrollResults\"><table id=\"results\" align=\"center\">";
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
	/*			if (j<mainList.length-1) {
					if (equal[lstMember[0][j]]==lstMember[0][j+1]) {
						sameRank++;
					} else {
						ranking += sameRank;
						sameRank = 1;
					}
				}
	*/
			}
		}
		// Ends each row
		str += "<\/tr>";
	}
	
//			if (previousResult.length>0){
//			str += "<\/table><table id=\"results2\" align=\"center\">";
//			for (i=0; i<previousResult.length; i++){
//				str += "<tr><td>"+(i+7)+". "+previousResult[i]+"<\/td><\/tr>";
//			}
//		}
	str += "<\/table></div><br \/><div id=\"groupBox\"><h2>Group Decision<\/h2><hr /><p>With a group?<br />Let everyone have a say.</p><label id=\"next_lbl\">Next Person&nbsp;&nbsp;<input id=\"next_btn\" type=\"button\" value=\" \" onClick=\"initList(); \"><\/label><\/div>";
	/*&nbsp; &nbsp; <input type=\"button\" value=\"Reset\" onClick=\"window.location.reload()\">*/
	document.getElementById("resultField").style.visibility = "visible";
	document.getElementById("resultField").innerHTML = str;
	document.getElementById("quiz").style.display = "none";
	document.getElementById("banner").innerHTML = "<div class=\"toolTip\"><span class=\"toolTipText\">This will bring you back to the first screen and erase your result data.<\/span><label id=\"back_lbl\"><input type=\"button\" id=\"back_btn\" value=\" \" onclick=\"goBack(); reset();\"\/>Edit List<\/label><\/div><div id=\"logo_sm\"><\/div>";

//	for(i=0; i<lstMember[0].length; i++){
//		previousResult.push(mainList[lstMember[0][i]]);
//	}
}
// Display two elements to be compared
function showImage() {
	document.getElementById("submittingOptions").style.display = "none";
	document.getElementById("tagLine").style.display = "none";
	document.getElementById("quiz").style.display = "inline";
	
	document.getElementById("banner").innerHTML = "<div class=\"toolTip\"><span class=\"toolTipText\">This will bring you back to the first screen and erase your result data.<\/span><label id=\"back_lbl\"><input type=\"button\" id=\"back_btn\" value=\" \" onclick=\"goBack(); reset();\"\/>Edit List<\/label><\/div><div id=\"logo_sm\"><\/div>";

	document.getElementById("resultField").innerHTML = "";
	document.getElementById("resultField").style.visibility = "hidden";
	document.getElementById("options").style.display = "none";
	var str0 = Math.floor(finishSize*100/totalSize)+"%";
	var str1 = ""+toNameFace(lstMember[cmp1][head1]);
	var str2 = ""+toNameFace(lstMember[cmp2][head2]);
	document.getElementById("percentComplete").innerHTML = str0;
	document.getElementById("leftField").innerHTML = str1;
	document.getElementById("rightField").innerHTML = str2;
	numQuestion++;
	// Display a progress bar
	var bar = document.getElementById("progressBar");
	var width = Math.floor(finishSize*100/totalSize);
	bar.style.width = width + '%';
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
		// Sets e equal to the index of the dropdown item
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
			// Adds the user provided text at the end of mainList
			mainList.push(inputText);
			// Suggests adding more options
			if ((mainList.length-nullArray.length)<2){
				document.getElementById("question").innerHTML = "Please add at least two:";
				document.getElementById("question").style.color = "initial";
			}else{
				document.getElementById("question").innerHTML = "Or, submit your options: ";
				document.getElementById("question").style.color = "initial";				
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
	var showView = document.getElementById("submittingOptions");
	showView.scrollIntoView(true);
	if(restarted == true){
		document.getElementById("question").innerHTML = "Or, submit your options: ";
		document.getElementById("question").style.color = "initial";
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
		document.getElementById("question").style.color = "initial";
	} else if(mainList.every(checkNull)){
		document.getElementById("start_btn").disabled = true;
		document.getElementById("question").innerHTML = "Please add at least two:";
		document.getElementById("question").style.color = "initial";
	} else if((mainList.length-nullArray.length)<=1){
		document.getElementById("start_btn").disabled = true;
		document.getElementById("question").innerHTML = "Please add at least two:";
		document.getElementById("question").style.color = "initial";
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
	lstMember = [];
	nullArray = [];
	restarted = true;
	showData();
	document.getElementById("submittingOptions").style.display = "inherit";
	document.getElementById("tagLine").style.display = "inherit";
	document.getElementById("quiz").style.display = "none";
	document.getElementById("banner").innerHTML = "<div id=\"logo\"><\/div>";
	document.getElementById("options").style.display = "inherit";
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

function about(){
	document.getElementById("aboutScreen").style.display = "block";
	document.getElementById("fade").style.display = "block";
}
function aboutAndHelpClose(){
	document.getElementById("aboutScreen").style.display = "none";
	document.getElementById("fade").style.display = "none";
	document.getElementById("helpScreen").style.display = "none";
	document.getElementById("fade").style.display = "none";
}
function help(){
	document.getElementById("helpScreen").style.display = "block";
	document.getElementById("fade").style.display = "block";
}