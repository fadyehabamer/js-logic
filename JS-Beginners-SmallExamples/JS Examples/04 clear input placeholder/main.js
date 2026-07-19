var myinput = document.getElementById("input");
myinput.onfocus=function(){
    if (this.placeholder == "Type your name") {
        this.placeholder = "";
    }
}
myinput.onblur=function(){
    if (this.placeholder == "") {
        this.placeholder = "Type your name";
    }
}