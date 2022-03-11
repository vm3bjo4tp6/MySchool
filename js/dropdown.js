let BindingDropDownEvent = function(){
    document.querySelectorAll(".js-dropdown").forEach(button => {
        button.addEventListener("click",ChangeDispayStatus);
    });
}();

function ChangeDispayStatus(){
    if(this.classList.contains("toggle"))
    {
        document.querySelector(".nav").classList.toggle("js-unOpacity");
        document.querySelector("#main-nav").classList.toggle("js-unOpacity");
    }
    else
        this.querySelector("ul").classList.toggle("js-unHide");
}