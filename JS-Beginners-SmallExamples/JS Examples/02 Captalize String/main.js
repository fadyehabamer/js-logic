// Use this file in console.....

function Capitalize (string){
    var oldarray = string.split(" ");
    var newarray = [];

    for (var i = 0 ; i < oldarray.length ; i++  ){
        newarray.push(oldarray[i].charAt(0).toUpperCase() + oldarray[i].slice(1));
    }
    return newarray.join(" ")
}

console.log(Capitalize("fady ehab elmorsy amer"));