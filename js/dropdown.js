let BindingDropDownEvent = function(){
    document.querySelectorAll(".js-dropdown").forEach(button => {
        button.addEventListener("click",ChangeDispayStatus);
    });
    document.querySelectorAll(".button-add").forEach(button => {
        button.addEventListener("click", AddNewItem);
    })
}();

function ChangeDispayStatus(){
    if(this.classList.contains("toggle"))
    {
        document.querySelector(".nav").classList.toggle("js-unOpacity");
        document.querySelector("#main-nav").classList.toggle("js-unOpacity");
        console.log("aaa");
    }
    else
        this.querySelector("ul").classList.toggle("js-unHide");
}
function AddNewItem(){
    let topic = FindNearleastElementWithID(this);
    console.log(topic);
    topic.querySelector(".display-column").classList.toggle("hide");
    topic.querySelector(".modify-column").classList.toggle("hide");
}

function FindNearleastElementWithID(element){
    while(element.id == ""){
        element = element.parentElement;
    }
    return element;
};