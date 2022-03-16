let BindingEvent = function(){
    document.querySelectorAll(".js-dropdown").forEach(button => {
        button.addEventListener("click",DropDown);
    });
    document.querySelectorAll(".js-change").forEach(button => {
        button.addEventListener("click", ChangeDisplay);
    });
    document.querySelectorAll(".js-save").forEach(button => {
        button.addEventListener("click", SaveData);
    })
}();
let InitializeComboBox = function(){
    let comboBoxs, comboBoxItems, comboBoxItem;
    for(topic in conboBoxData){
        comboBoxs = document.getElementById(topic).querySelectorAll(".combobox");
        comboBoxs.forEach(question => {
            conboBoxData[topic][question.name].forEach(item => {
                comboBoxItem = CreateElement("option", item);
                comboBoxItem.value = item;
                question.appendChild(comboBoxItem);
            })
        })
    }
}();

function DropDown(){
    if(this.classList.contains("toggle"))
    {
        document.querySelector(".nav").classList.toggle("js-unOpacity");
        document.querySelector("#main-nav").classList.toggle("js-unOpacity");
    }
    else
        this.querySelector("ul").classList.toggle("js-unHide");
}
function ChangeDisplay(){
    let topic = FindNearleastElementWithID(this);
    console.log(topic);
    if(topic.id != "basic")
        topic.querySelector(".display-column").classList.toggle("hide");
    topic.querySelector(".modify-column").classList.toggle("hide");
}
function SaveData(){
    let topicElement = FindNearleastElementWithID(this);
    let answers = topicElement.querySelectorAll(".answer");
    let saveObject = {};
    for(let i = 0 ; i < answers.length ; i++){
        if(answers[i].type != "radio")
            saveObject[answers[i].name] = answers[i].value;
        else if(answers[i].type == "radio" && answers[i].checked)
            saveObject[answers[i].name] = answers[i].value;
    }
    console.log(saveObject);
}


function FindNearleastElementWithID(element){
    while(element.id == ""){
        element = element.parentElement;
    }
    return element;
};
function CreateElement(tag, text){
    let newTag = document.createElement(tag);
    let newNode = document.createTextNode(text);
    newTag.appendChild(newNode);
    return newTag;
}


