window.onload = function(){

    var modal = document.getElementById('myModal');
    var span = document.getElementsByClassName("close")[0];
    var guessBtn = document.getElementById("guessBTN");



    // When the user clicks on the button, open the modal 
    guessBtn.onclick = function() {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    
}

var eight_final = document.getElementById("tree").getElementsByClassName("8Final");
var q_final = document.getElementById("tree").getElementsByClassName("QFinal");
var s_final = document.getElementById("tree").getElementsByClassName("semiFinal");
var _final = document.getElementById("tree").getElementsByClassName("Final");
var _winner = document.getElementById("tree").getElementsByClassName("Winner");
const _teams = ["Uruguay","Portugal","France","Argentina","Brazil","Mexico","Belgium",
"Japan","Spain","Russia","Croatia","Denmark","Sweden","Swiss","Colombia","England"];



//init Round of 16
for (i=0; i<eight_final.length;i++){
    eight_final[i].innerHTML = _teams[i];
}

//add event listeners to all of the tree elements
for (i=0; i<eight_final.length;i++){
    const index = i;
    eight_final[i].addEventListener("click",function(){chooseWinner(eight_final,q_final,index);});
}

for (i=0; i<q_final.length;i++){
    const index = i;
    q_final[i].addEventListener("click",function(){chooseWinner(q_final,s_final,index);});
}

for (i=0; i<s_final.length;i++){
    const index = i;
    s_final[i].addEventListener("click",function(){chooseWinner(s_final,_final,index);});
}

for (i=0; i<_final.length;i++){
    const index = i;
    _final[i].addEventListener("click",function(){chooseWinner(_final,_winner,index);});
}



function chooseWinner(prevStage,currentStage,index){
    var j = Math.floor(index/2);

    if(prevStage[index].innerHTML != "QFinal" &&
    prevStage[index].innerHTML != "Semi-Final" &&
    prevStage[index].innerHTML != "Final"){

        currentStage[j].innerHTML=prevStage[index].innerHTML;
    }
}
