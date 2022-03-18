// data
const job = {
    Finance: "財金",
    Marketing: "行銷",
    Business: "業務",
    Food: "餐飲",
    Travel: "旅遊",
    Educate: "教育",
    Medical: "醫療",
    Software: "軟體",
    Manufacture: "製造",
    News: "新聞"
}
const nationality = {
    Taiwan: "台灣",
    Japan: "日本",
    Korea: "韓國",
    China: "中國",
    England: "英國",
    America: "美國"
}
const tags={
    basic:{
        passportNation: ["台灣","中國","日本","韓國","美國"],
        dream: ["財金","行銷","業務","餐飲","旅遊","教育","醫療"],
    },
}
const conboBoxData={
    basic:{
        identity: ["一般生","原住民","體保生","僑生"],
        inhabit: ["台灣","中國","日本","韓國","美國"],
    },
    education:{
        school: ["台灣大學","清華大學","交通大學","成功大學"],
        degree: ["高中","高職","大學","四技","二專","社區大學","碩士","在職碩士","博士"],
        subject: ["一般科","電機科","機械科","電子","財金","會計","國貿","商管"],
        system: ["GPA","百分等級"],
        rank: ["前1%","前5%","前10%","前50%","後50%","不提供"],
        performance: ["穩定","時好時壞","越來越進步","慢慢退步","某年特別差"],
    },
    extracurricular:{
        type: ["運動","音樂","舞蹈","課程","公益"],
        item: ["籃球","棒球","羽球","網球","桌球"],
        role: ["一般","經理","隊長","其他"],
        rank: ["國際賽","國內賽","校隊","興趣"],
        award: ["國際認證","全國認證","地區認證","學校認證","其他"],
    },
    exam:{
        type: ["語言檢定","升學考試","證照檢定"],
        item: ["托福","雅思","N1","指考","學測"],
        subject: ["聽","說","讀","寫","國文"],
    },
}


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
    let chartElements = document.querySelectorAll(".chart section");
    for(chartElement of chartElements)
    {
        comboBoxs = chartElement.querySelectorAll(".combobox");
        comboBoxs.forEach(question => {
            conboBoxData[chartElement.id][question.name].forEach(item => {
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
    if(topic.id != "basic")
        topic.querySelector(".display-column").classList.toggle("hide");
    topic.querySelector(".modify-column").classList.toggle("hide");
}
function ValidRegister(){
    let rule = /@/;
    let validItem = document.querySelector("#username");
    let isOk = rule.test(validItem.value);
    console.log(isOk);
    return false;

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
    TryAdd(topicElement.id, saveObject);
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
function TryAdd(topic, data){
    if(topic in personalImformationDictionary)
        personalImformationDictionary[topic].push(data);
    else
        personalImformationDictionary[topic] = new Array(data);
}