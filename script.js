// JavaScript Document
var snake=new Array(3);
var dotIn = new Object();
var x, y, intervalId, intervalId2, dotout, vector;
var score=0;
var faust=0;

function makeDot(x,y,numb){
	this.x=x;
	this.y=y;
	this.numb=numb;

}
// here we make form 10x10
function makeForm(){
	for (var x = 0; x < 10; x++) {
		for (var y = 0; y < 10; y++) {
			var newDiv = $("<div class='dot' id='dot" + x + y +"'>"+"</div>");
			newDiv.appendTo('.bigBang');
		};
	};
};


function brush(){
checkSnake();
clearInterval(intervalId);
intervalId = setInterval(function(){$("#dot"+snake[0].x+snake[0].y).toggleClass("dotOn")}, 200);
	for (var i = 1; i < snake.length; i++) {
		var dot =$("#dot"+snake[i].x+snake[i].y)
		dot.addClass('dotOn');
	};
	
};


function snakeIn(){
	do {
		 x = Math.floor(Math.random()*10);
		 y = Math.floor(Math.random()*10);
	} while((x<2 || x>6) || (y<1 || y>4))
	for (var i = 0; i < snake.length; i++) {
		var snakes = new makeDot(x+i,y,'Top');
		snake[i]= snakes;
		};
brush();
}
function dots(){
	do {
			 x = Math.floor(Math.random()*10);
			 y = Math.floor(Math.random()*10);
		} while((x<1 || x>8) || (y<1 || y>8))
	var dotIn = new makeDot(x,y,"dots");
	dotOut=dotIn;
	dot =$("#dot"+dotIn.x+dotIn.y)
	dot.addClass('dotEat');
	for (var i = 0; i < snake.length; i++) {
		if ((snake[i].x==dotOut.x)&&(snake[i].y==dotOut.y)) {
			dots();
		};
	};
}

function checkSnake(){
	for (var i = 0; i < snake.length-1; i++) {
		if ((snake[0].x==snake[i+1].x)&&(snake[0].y==snake[i+1].y)) {
			clearInterval(intervalId2);
			$('#score').empty();
			$('#score').append( "Snake is dead, like your dreams!"+ "<br />"+"Your score:  " + ++score);
			$('#Start').attr('disabled','disable');
		};
	};
}
	//      Move	!!!
function move(){
if ((snake[0].x==dotOut.x)&&(snake[0].y==dotOut.y)){
	var dot = new makeDot(dotOut.x,dotOut.y,0);
	snake[snake.length]=dotOut;
	score++;
	$('#score').empty();
	$('#score').append("Your score:  " + score);
		dots();
}
	for (var i = snake.length-1; i >0 ; i--) {
		var dot =$("#dot"+snake[i].x+snake[i].y);
		dot.removeClass('dotEat');
		dot.removeClass('dotOn');
		snake[i]=snake[i-1];
		}
}


function moveRight(){
move();
	if (snake[0].y==9) {
			var snakes = new makeDot(snake[0].x,snake[0].y-9,'Right');
		} else{		
			var snakes = new makeDot(snake[0].x,snake[0].y+1,'Right');
		}
		snake[0]= snakes;
	brush();
}

function moveLeft(){
	move();
		if (snake[0].y==0) {
			var snakes = new makeDot(snake[0].x,snake[0].y+9,'Left');
		} else{		
			var snakes = new makeDot(snake[0].x,snake[0].y-1,'Left');
		}
	snake[0]= snakes;
	brush();
}

function moveTop(){
	move();
		if (snake[0].x==0) {
			var snakes = new makeDot(snake[0].x+9,snake[0].y,'Top');
		} else{		
			var snakes = new makeDot(snake[0].x-1,snake[0].y,'Top');
		}
		snake[0]= snakes;
	brush();
}

function moveBot(){
	move();
		if (snake[0].x==9) {
			var snakes = new makeDot(snake[0].x-9,snake[0].y,'Bot');
		} else{		
			var snakes = new makeDot(snake[0].x+1,snake[0].y,'Bot');
		}
		snake[0]= snakes;
	brush();
}


function autoMove(){
faust=0;
switch (snake[0].numb){
	case 'Bot':  moveBot();
		break;
	case 'Top':  moveTop();
		break;
	case 'Right':  moveRight();
		break;
	case 'Left':  moveLeft();
		break;
	default: console.log("autoMovevERROR");
		break;
}

};


function clickb(){
	$('#Start').click(function(){ controle() })	
	$('#Stop').click(function(){ clearInterval(intervalId2)})	
	$('#Refresh').click(function(){
		clearInterval(intervalId2);
		$(".bigBang").empty();
		$('#score').empty();
		$('#score').append("Your score:  ");
		score=0;
		snake=new Array(3);
		makeForm();
		snakeIn();
		dots();
		controle();
		$('#Start').removeAttr('disabled');

	 })	
};
function controle(){
	
	clearInterval(intervalId2);
		intervalId2 = setInterval(autoMove, 400);
$(document).keypress(function( event ) {
	console.log(faust);
	if (faust!=1 ) {
		faust=1; 
			switch (event.which) {
			  case 119: 	if(snake[0].numb !='Bot'){snake[0].numb = 'Top';} 
			    break;
			  case  1094: 	if(snake[0].numb !='Bot'){snake[0].numb = 'Top';} 
			    break;
			  case 115: 	if(snake[0].numb !='Top'){snake[0].numb ='Bot';}
			    break;
			  case 1110: 	if(snake[0].numb !='Top'){snake[0].numb ='Bot';}
			    break;
			  case 97:		if(snake[0].numb !='Right'){snake[0].numb ='Left';}
			   	break;
			  case  1092:	if(snake[0].numb !='Right'){snake[0].numb ='Left';}
			    break;
			  case 100:		if(snake[0].numb !='Left'){snake[0].numb ='Right';}
			    break;
			  case 1074:	if(snake[0].numb !='Left'){snake[0].numb ='Right'; }
			    break;
			  default: faust=0;
			  	$('#score').empty();
				$('#score').append("Please use W S A D");
			    break;
			}
		}
		});
};

$(document).ready(function() {
	makeForm();
	snakeIn();
	dots();
	clickb();
	controle();
});

