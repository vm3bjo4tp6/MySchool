var logInStatus =false;
window.onload = function(){
    if(true){
    var item1 = document.getElementById("user_nav");
    var item2 = document.querySelector(".login_button");
    item1.classList.toggle("login_invisible");
    item2.classList.toggle("login_invisible");
    }
}

function checkLogIN(){
    logInStatus = true;
    location.href="../page/homepage.html";
}


let selectedAnswers = [];
let currentQuestion;
//填入ComboBox資料
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

            
let BindingButtonEvent = function(){
    //綁定新增或修改按紐顯示修改視窗事件
    document.querySelectorAll(".js-change-display").forEach(button => {
        button.addEventListener("click",ChangeDispayStatus);
    });
    //綁定儲存事件
    document.querySelectorAll(".js-save").forEach(button => {
        button.addEventListener("click",SavePersonalTopicData);
    });

    document.querySelectorAll(".js-pop-up-window").forEach(button => {
        button.addEventListener("click",ShowPopUpWindow);
    });

    let showTagBoardButtons = document.querySelectorAll(".showTagBoardButton");
    for(let i = 0 ; i< showTagBoardButtons.length ; i++)
        showTagBoardButtons[i].addEventListener("click", () => ShowTagBoard(showTagBoardButtons[i].id));
    document.querySelector(".fix-center-window .button-block .button").addEventListener("click",ConfirmSelectedTags);
}();

function ChangeDispayStatus(){
    let topicElement = FindNearleastElementWithID(this);
    topicElement.querySelector(".topic-column").classList.toggle("hidden");
    topicElement.querySelector(".edit-column").classList.toggle("hidden");
    topicElement.querySelector(".display-column").classList.toggle("hidden");
    topicElement.querySelector(".modify-column").classList.toggle("hidden");
}

function SavePersonalTopicData(){
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

function ShowPopUpWindow(){
    let topicElement = FindNearleastElementWithID(this);
    let tagBoard = document.querySelector(".tag-board");
    console.log(this);
    for(tag in tags[topicElement.id][this.name])
        console.log(tag);
}

function ShowTagBoard(question){
    let newTag, newNode;
    let tagBoard = document.querySelector(".tag-board");
    let probablyAnswers = GetPersonalImformationObject(question);
    currentQuestion = question;
    selectedAnswers = personalImformationDictionary[question] == undefined ? [] : personalImformationDictionary[question];
    ClearDispayBlock(tagBoard);
    for(let answer in probablyAnswers){
        newTag = CreateTag(probablyAnswers[answer],answer);
        if(selectedAnswers.indexOf(answer) > -1)
            newTag.classList.toggle("tag-selected");
        newTag.addEventListener("click", () => SelectTag(answer));
        tagBoard.appendChild(newTag);
    }
    document.querySelector(".fix-center-window").classList.toggle("hidden");
}

function SelectTag(tagID){
    let index = selectedAnswers.indexOf(tagID);
    document.getElementById(tagID).classList.toggle("tag-selected");
    if(index < 0)
        selectedAnswers.push(tagID);
    else
        selectedAnswers.splice(index, 1);
}

function ConfirmSelectedTags(){
    let tag;
    let displayTagElement = document.querySelector("#" + currentQuestion + " .show-selected-tag");
    let personalImformationObject = GetPersonalImformationObject(currentQuestion);
    personalImformationDictionary[currentQuestion] = selectedAnswers;
    document.querySelector(".fix-center-window").classList.toggle("hidden");
    ClearDispayBlock(document.querySelector(".tag-board"));
    ClearDispayBlock(displayTagElement);
    for(let i = 0 ; i < selectedAnswers.length ; i++)
    {
        tag = CreateTag(personalImformationObject[selectedAnswers[i]], selectedAnswers[i]);
        displayTagElement.appendChild(tag);
    }
}

function ClearDispayBlock(element){
    element.innerHTML="";
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


