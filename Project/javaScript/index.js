var eight_final = document.getElementById("tree").getElementsByClassName("8Final");
var q_final = document.getElementById("tree").getElementsByClassName("QFinal");
var s_final = document.getElementById("tree").getElementsByClassName("semiFinal");
var _final = document.getElementById("tree").getElementsByClassName("Final");
var _winner = document.getElementById("tree").getElementsByClassName("Winner");
var _message = document.getElementById("guess_sent_pop_up");

const _teams = ["Uruguay","Portugal","France","Argentina","Brazil","Mexico","Belgium",
"Japan","Spain","Russia","Croatia","Denmark","Sweden","Swiss","Colombia","England"];




function request(method, url, _data) {
    let data = _data || {};
    return new Promise((resolve, reject) => {
        let httpClient = new XMLHttpRequest();

        // configure request type
        httpClient.open(method, url, true);
        httpClient.setRequestHeader("Content-type", "application/json");

        // handle response
        httpClient.onreadystatechange = () => {
            if (httpClient.readyState == 4) {
                var response = httpClient.response;
                if(httpClient.status == 200) {
                    // success
                    resolve(response);
                } else {
                    // failure 
                    reject(response);
                }
            }
        };

        // send request
        httpClient.send(JSON.stringify(data));

    });
}


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



// check if the user change his guess in lower round off the playoff
function valid_stage(high,low,default_name){
    for (var i=0; i<high.length;i++){
        if (high[i].innerHTML != low[i*2].innerHTML &&
                high[i].innerHTML != low[i*2 + 1].innerHTML){
            high[i].innerHTML=default_name;
        }
    }

}

 
function chooseWinner(prevStage,currentStage,index){
    var j = Math.floor(index/2);

    if(prevStage[index].innerHTML != "QFinal" &&
    prevStage[index].innerHTML != "Semi-Final" &&
    prevStage[index].innerHTML != "Final"){
        currentStage[j].innerHTML=prevStage[index].innerHTML;
    }

    valid_stage(s_final,q_final,"Semi-Final");
    valid_stage(_final,s_final,"Final");
    valid_stage(_winner,_final,"Winner!");
}



document.getElementById("submit").addEventListener("click",submitGuess); 


let transform_data = arr => Array.from(arr).map(item => item.innerHTML);
function validate_array(arr) {
    for (let item of arr) {
        let valid = _teams.some( val => val == item );
        if (!valid) return false;
    }
    return true;
}

function validate_all_arrays() {
    let arrays = [q_final, s_final, _final, _winner];
    for (let arr of arrays) {
        let transformed = transform_data(arr);
        console.log(transformed);
        if (!validate_array(transformed)) {
            console.log("BAD ARRAY!");
            return false;
        }
    }
    console.log("array is ok.");
    return true;
}


function submitGuess(){
    var user = document.getElementById("add_user").value;

    if (!validate_all_arrays()) {
        _message.innerHTML = "Fill your guess!"
        console.log("DAMNIT!");
        return;
    }

    let guess = {
        q: transform_data(q_final),
        s: transform_data(s_final),
        fin: transform_data(_final),
        win: transform_data(_winner),
        user: user
    };


    request('POST', '/guess', guess).then(
        message => {
            _message.innerHTML=message;
        },
        message => {
            _message.innerHTML=message;
        }
    );

}





window.onload = function(){

    var modal = document.getElementById('myModal');
    var span = document.getElementsByClassName("close")[0];
    var guessBtn = document.getElementById("guessBTN");



    // When the user clicks on the button, open the modal 
    guessBtn.onclick = function() {
        modal.style.display = "block";
        _message.innerHTML = "";
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
