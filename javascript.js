var matrix = [[1,2,3,3,2],[1,2,3,1,2],[1,2,3,3,2],[2,1,3,2,3],[1,3,2,1,1]];
var oncard = [0,0];
var ongoingcard = -1
cards_in = " ";
var steps = 0
var done = 0;
var total = 5;
var username = "";
var gameover = new Audio("gameover.wav");
var wrong = new Audio("wrong_card.wav");



function start_game(){
    total = parseInt(document.getElementById("gridpick").value)
    username = document.getElementById("username").value
    k1 = document.getElementsByClassName("container_main")
    k1[0].style.display = "none";
    k1 = document.getElementsByClassName("container")
    k1[0].style.display = "block";
    window.location.href = '#popup1';
    show();
	

}


function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }


function show(){  

for(var i = 0 ;i < 1000;i++)
{   row1 = getRndInteger(0,4)
    col1 = getRndInteger(0,4)
    row2 = getRndInteger(0,4)
    col2 = getRndInteger(0,4)

    c2 = matrix[row1][col1];
    matrix[row1][col1] = matrix[row2][col2];
    matrix[row2][col2] = c2;

}

for(var  i = 0; i < total ;i++){
cards_in += '<div class = "rows" style="height:' +  parseInt(100/total).toString() + '%">'
for(var j  = 0 ;j < total;j++ )
{
    cards_in += '<card class="cards" style="width:'+ parseInt(100/total).toString() +'%" id="card'+ (i+1).toString() + (j+1).toString()  +'" onclick="cardclicked('+ (i+1).toString() + (j+1).toString() +')"><div class="front" ><div class="small"></div></div><div class="back">'

    if(matrix[i][j] == 1)
    { cards_in += '<img class="innerimage" src="img1.jpeg">'}
    else if(matrix[i][j] == 2){
        cards_in += '<img class="innerimage" src="img2.jpeg">'
    }
    else{
        cards_in += '<img class="innerimage" src="img3.jpeg">'
    }
    cards_in += '</div></card>'
}
cards_in += '</div>'
}

k1 = document.getElementsByClassName('mainbox');
k1[0].innerHTML = cards_in;
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

async function cardclicked(N){
    steps += 1
    var card_num = "card" + N.toString();
    oncard = [parseInt(N/10)-1,(N%10)-1]

    if(ongoingcard == -1)
    {   done += 1
        if(matrix[oncard[0]][oncard[1]] == 1)
        { ongoingcard = 1}
        else if(matrix[oncard[0]][oncard[1]] == 2){
            ongoingcard = 2
        }
        else{
            ongoingcard = 3
        }
        k1 = document.getElementById(card_num)
        console.log(k1.style.transform)
        k1.style.transform = "rotateY(180deg)";


        if(matrix[oncard[0]][oncard[1]] == 1)
        { present = '<img src="img1.jpeg">'}
        else if(matrix[oncard[0]][oncard[1]] == 2){
            present =  '<img  src="img2.jpeg">'
        }
        else{
            present =  '<img  src="img3.jpeg">'
        }
        
    
        k2 = document.getElementsByClassName("ongoingcard")
        k2[0].innerHTML = present

    }

    else{
        if(matrix[oncard[0]][oncard[1]] == ongoingcard)
        {   done += 1
            k1 = document.getElementById(card_num)
            if(k1.style.transform != "rotateY(180deg)")
            {k1.style.transform = "rotateY(180deg)";}
            if(done == total*total)
            {   await sleep(1000);
                completed();}
        
        }
        else
        {   wrong.play();
            k1 = document.getElementById(card_num)
            k1.style.transform = "rotateY(180deg)";
            await sleep(1000);
            k1.style.transform = "rotateY(0deg)"
           
        }
    }
    k1 = document.getElementsByClassName("totalstep")
   k1[0].innerHTML = steps.toString();
    
}

function swapchange(N){
    if(N != ongoingcard )
    {   steps += 5
        ongoingcard = N
        if(N == 1)
        {
            present =  '<img  src="img1.jpeg">'
        }
        else if(N == 2)
        {present =  '<img  src="img2.jpeg">'}
        else{
            present =  '<img  src="img3.jpeg">'
        }
        k2 = document.getElementsByClassName("ongoingcard")
        k2[0].innerHTML = present
    }

   k1 = document.getElementsByClassName("totalstep")
   k1[0].innerHTML = steps.toString();

}

function completed(){
    gameover.play()
    k2 = document.getElementsByClassName("container")
    k2[0].style.display = "none"
    
    final = '<img class="final_image" src="https://media.giphy.com/media/9vVCPK87Aw6v6/giphy.gif"><div class="final_sub"><h1 class="h11">Hurrah! Congratulations!!!</h1><h2 class="h12">Steps taken by '+ username +': '+steps.toString()+'</h2><button onclick="restart()" class="restart_button">Restart</button></div>'
 
    k2 = document.getElementsByClassName("finalscore")
    k2[0].style.display="flex"
    k2[0].innerHTML = final
    
}

function restart(){
    location.reload();

}