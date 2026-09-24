var seconds     =20;
var show        = document.getElementById("countdown")

function render(){
    var minutes     = Math.floor(seconds/ 60) ;
    var reminder    = seconds % 60;

    // keep seconds a number and only pad it for display (0:09, 1:05, ...)
    show.innerHTML= minutes+":"+ (reminder < 10 ? "0" + reminder : reminder)
    if (seconds < 10){
        show.style.color="red"
        show.style.fontSize="20px"
    }
}

function secondpass(){
    seconds -= 1;
    if (seconds <= 0){
        // stop the timer so "done" is final and the last second (0:01) was shown
        clearInterval(countdown);
        show.innerHTML="done"
        return;
    }
    render()
}

render()
var countdown   = setInterval(secondpass,1000);