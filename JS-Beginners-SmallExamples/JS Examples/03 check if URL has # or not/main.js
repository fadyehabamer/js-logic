//method 1
//Using Window.location.hash

//method 1
var desiredword="x"
if(window.location.hash){
    if(window.location.hash.indexOf(desiredword)===1){  // 0 --> #
        console.log(desiredword + " is found")
    }
}
else{
    console.log("bad")
}

//method 2

if(window.location.hash){
    console.log(window.location.hash.substring(1))
}
else
{
    console.log("Not found")
}
