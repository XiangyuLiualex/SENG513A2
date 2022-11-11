let boxes = [];
let player1 = 0;
let player2 = 0;
let player3 =0;
let userId=1;
let userNum=0;
let colorNow="red"
let result=""
let isFinished=false;
let nodeNumberPerRow=5;
let m=0;

//there are three users: 1, 2, 3
//there are three colors: red, yellow, blue 


function load(){
	// initial values
	getNumberOfUser();
	getNumberOfNodes();
	boxes = [];
	m=nodeNumberPerRow-1;
	player1=player2=player3=0;

	let offset = window.innerWidth/(3*m);
	let length=5;

	console.log(window.innerWidth);
	console.log("offset: "+offset);

	if(userNum==3){
		$(".player3").css("visibility","visible");
	}
	// initial start points
	let startX= window.innerWidth/2 - (m*offset)/2;
	let startY = window.innerHeight/2 - (m*offset)/2 + 350;
	let html = "";
	$("#app").html(html);
	let c = 0;
	
	//create left up part nodes and lines
	for(let j=0; j<m; j++){
		for(let i=0; i<m; i++){
			let bid="b"+c
			let did="d"+c
			let hid="h"+c
			let vid="v"+c
			cnum=0;
			if(i==0){
				cnum=-1;
			}else{
				cnum=c-1;
			}

			html += `
				<div class="box" boxId="${c}" id="${bid}"  ></div>
				<div class="dot" id="${did}" ></div>						
				<div class="line h" id="${hid}" boxId1="${c}" boxId2="${c-m}"  drawn=-1></div>
				<div class="line v" id="${vid}" boxId1="${c}" boxId2="${cnum}"  drawn=-1></div>
				`;			
			 boxes.push(0);
			c++;
		}
		let rdid="rd"+j
		let rvid="rv"+j
		let bdid="bd"+j
		let bhid="bh"+j
		//create node and lines on right 
		html += `				
				<div class="dot" id="${rdid}"></div>
				<div class="line v" id="${rvid}" boxId1="${m*(j+1)-1}" boxId2="${-1}" drawn=-1></div>
				<div class="dot" id="${bdid}"></div>
				<div class="line h" boxId1="${((m-1)*m)+j}" boxId2="${-1}" id="${bhid}" drawn=-1></div>
				`;	
	}
	//create right down core 
	html += `<div class="dot" id="lastdot" drawn=-1></div>
	<br>
	<br>
	<br>`
	
	$("#app").html(html);

	//assignment the position for each nodes and lines
	let b=0
	for(let j=0; j<m; j++){
		for(let i=0; i<m; i++){

			let x = startX + i * offset,
				y = startY + j * offset;
			
			let bid="b"+b
			let did="d"+b
			let hid="h"+b
			let vid="v"+b

			console.log(document.getElementById(bid))
			console.log(bid)
			
			document.getElementById(bid).style.left=x+length/2+"px";
			document.getElementById(bid).style.top=y+length/2+"px";

			document.getElementById(did).style.left=x-length+"px";
			document.getElementById(did).style.top=y-length+"px";

			document.getElementById(hid).style.left=x+"px";
			document.getElementById(hid).style.top=y+"px";
			
			document.getElementById(vid).style.left=x+"px";
			document.getElementById(vid).style.top=y+"px";
			b++;
		}

		let xr = startX + m * offset,
			yr = startY + j * offset,
			xb = startX + j * offset,
			yb = startY + m * offset;

		let rdid="rd"+j,
			rvid="rv"+j,
			bdid="bd"+j,
			bhid="bh"+j;

		document.getElementById(rdid).style.left=xr-length+"px";
		document.getElementById(rdid).style.top=yr-length+"px";
		document.getElementById(rvid).style.left=xr+"px";
		document.getElementById(rvid).style.top=yr+"px";

		document.getElementById(bdid).style.left=xb-length+"px";
		document.getElementById(bdid).style.top=yb-length+"px";
		document.getElementById(bhid).style.left=xb+"px";
		document.getElementById(bhid).style.top=yb+"px";	

	}

	document.getElementById("lastdot").style.left=startX+m*offset-length+"px";
	document.getElementById("lastdot").style.top=startY+m*offset-length+"px";

	$(".h").css("height","5px");
	$(".h").css("width",offset+"px");
	$(".v").css("height",offset+"px");
	$(".v").css("width","5px");
	$(".box").css("height",offset+"px");
	$(".box").css("width",offset+"px");

	 applyEvents();
}

//Apply the event, 
function applyEvents(){
	$("div.line").bind('click', function(){

		let id1 = parseInt($(this).attr("boxId1"));
		let id2 = parseInt($(this).attr("boxId2"));  

		console.log("id 1 is: "+id1);
		console.log("id 2 is: "+id2);

		if(checkValid(this)){	
			let a = false, b = false;

			if(id1 >= 0){
				 a = addValue(id1);
			} 
			if(id2 >= 0){
				 b = addValue(id2);
			} 
			$(this).css("background-color",colorNow);
			$(this).css("border","1px solid #000");
			$(this).attr("drawn", 1);


			if(a === false && b === false){
				if(userNum==3){
					switchPlayerForThree();	
				}
				if(userNum==2){
					switchPlayerForTwo();	
				}
				
			}			
		}	
		if(isFinished){
			setTimeout(alert, 500, result);
		}
	});
}

// switch players when there are 3 users
function switchPlayerForThree(){
	console.log("User before is: "+userId)
	switch(userId){
		case 1: userId=2;
		break;
		case 2: userId=3;
		break;
		case 3: userId=1;
		break;
	}
	console.log("User now is: "+userId)

	console.log("Color before is: "+colorNow)
	switch(colorNow){
		case "red": colorNow="yellow";
		break;
		case "yellow": colorNow="blue";
		break;
		case "blue": colorNow="red";
		break;
	}
	console.log("Color now is: "+colorNow)

}
// swithc players when there are 2 users
function switchPlayerForTwo(){
	console.log("User before is: "+userId)
	switch(userId){
		case 1: userId=2;
		break;
		case 2: userId=1;
		break;
	}
	console.log("User now is: "+userId)

	console.log("Color before is: "+colorNow)
	switch(colorNow){
		case "red": colorNow="yellow";
		break;
		case "yellow": colorNow="red";
		break;
	}
	console.log("Color now is: "+colorNow)

}


// when box is created
function acquire(id){
	let color=colorNow;
	switch(userId){
		case 1: player1++;
		break;
		case 2: player2++;
		break;
		case 3: player3++;
		break;
	}
	
	$("div.box[boxId='"+id+"']").css("background-color", color);	
	boxes[id] = -1;

	$(".player1").text("Player1 : " + player1+"");
	$(".player2").text("Player2 : " + player2+"");
	$(".player3").text("Player3 : " + player3+"");

	let full = true;
	for(let i=0;i<boxes.length;i++){
		if(boxes[i] != -1){
			full = false;
			break;
		}
	}

	if(full){
		isFinished=true;

		if(userNum==3){
			if(player1>player2&&player1>player3){
				result="Player1 Wins!!!";
			}
			else if(player2>player1&&player2>player3){
				result="Player2 Wins!!!";
			}else if(player3>player1&&player3>player2){
				result="Player3 Wins!!!";
			}else if(player1==player2){
				result="Player1 and Player 2 Wins!!!";
			}else if(player1==player3){
				result="Player1 and Player 3 Wins!!!";
			}else if(player2==player3){
				result="Player2 and Player 3 Wins!!!";
			}else{
				result="No winner!!!";
			}
		}

		if(userNum==2){
			if(player1>player2){
				result="Player1 Wins!!!";
			}
			else if(player2>player1){
				result="Player2 Wins!!!";
			}
			else{
				result="No Winner!!!"
			}
		}

		
	}
}

// add value to boxes
function addValue(id){
	boxes[id]++;
	if(boxes[id] === 4){
		acquire(id);
		return true;
	}
	return false;
}

function getNumberOfNodes(){
	nodeNumberPerRow=prompt("Please enter the number of nodes per line (allow from 3 to 15): ");
	while(nodeNumberPerRow<3||nodeNumberPerRow>15){
		nodeNumberPerRow=prompt("Please enter the number of nodes per line (allow from 3 to 15): ");
	}
}

function getNumberOfUser(){
	userNum=prompt("Please enter the number of Player (allow 2 or 3): ");
	while(userNum!=2&&userNum!=3){
		userNum=prompt("Please enter the number of Player (allow 2 or 3): ");
	}
}

function checkValid(t){
	return($(t).attr("drawn") == -1);
}
load();