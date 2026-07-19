var mytextarea=document.getElementById("my-text");
var myspan    =document.getElementById("my-span");
var maxlength = mytextarea.getAttribute("maxlength")

mytextarea.oninput=function(){
    myspan.innerHTML=maxlength-this.value.length;

    if (myspan.innerHTML == 0) {
        myspan.classList.add("changecolor");
    }else{
        myspan.classList.remove("changecolor");
    }
};
