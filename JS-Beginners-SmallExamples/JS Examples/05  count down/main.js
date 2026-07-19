var seconds     =20;
var countdown   = setInterval(function(){secondpass()},1000);
var secondpass;
var show        = document.getElementById("countdown")

function secondpass(){
    var minutes     = Math.floor(seconds/ 60) ;
    var reminder    = seconds % 60;
    
    show.innerHTML= minutes+":"+ seconds
    if(seconds > 0){
        seconds -=1;
    }
    if (seconds < 10){
        seconds="0"+seconds;
        show.style.color="red"
        show.style.fontSize="20px"
    }
    if (seconds == 0){
        show.innerHTML="done"
    }
}