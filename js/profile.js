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
    application:{
        school: ["台灣大學","清華大學","交通大學","成功大學"],
        degree: ["高中","高職","大學","四技","二專","社區大學","碩士","在職碩士","博士"],
        subject: ["一般科","電機科","機械科","電子","財金","會計","國貿","商管"],
        result: ["錄取","未錄取"],
        relationship: ["父母","祖父母","兄弟"],
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

let InitializeComboBox = function(){
    let comboBoxs, comboBoxItems, comboBoxItem;
    let chartElements = document.querySelectorAll(".chart section");
    for(chartElement of chartElements)
    {
        comboBoxs = chartElement.querySelectorAll(".combobox");
        comboBoxs.forEach(question => {
            conboBoxData[chartElement.id][question.name].forEach(item => {
                comboBoxItem = CreateElement("option", { text : item});
                comboBoxItem.value = item;
                question.appendChild(comboBoxItem);
            })
        })
    }
}();

let BindingEvent = function(){
    document.querySelectorAll(".js-change-display-column").forEach(button => {
        button.addEventListener("click", ClickAddNewButton);
    });
    document.querySelectorAll(".js-save").forEach(button => {
        button.addEventListener("click", ClickSaveButton);
    });
}();

function ClickAddNewButton(){
    let topicElement = this.parentElement.parentElement;
    ChangeDisplay(topicElement);
}

function ClickSaveButton(){
    let topicElement = this.parentElement.parentElement.parentElement;
    let currentData = SaveData(topicElement);
    CreateDetailItems(topicElement.id, currentData);
    ChangeDisplay(topicElement);
}


function ChangeDisplay(element){
    if(element.id != "basic")
        element.querySelector(".display-column").classList.toggle("hide");
    element.querySelector(".modify-column").classList.toggle("hide");
}

function SaveData(element){
    let saveObject = {};
    let answers = element.querySelectorAll(".answer");
    
    for(let i = 0 ; i < answers.length ; i++){
        if(answers[i].type != "radio")
            saveObject[answers[i].name] = answers[i].value;
        else if(answers[i].type == "radio" && answers[i].checked)
            saveObject[answers[i].name] = answers[i].value;
    }
    TryAdd(element.id, saveObject);
    return saveObject;
}

let LoadData = function(){
    for(const key of Object.keys(personalImformationDictionary)){
        for(const item of personalImformationDictionary[key]){
            CreateDetailItems(key, item);
        }
    }
};

function CreateDetailItems(key, obj){
    let element = document.getElementById(key).querySelector(".display-column");
    let item = CreateElement("div", {class: "item"});
    let pic = CreateElement("div", {class: "pic"});
    let txt = CreateElement("div", {class: "txt"});
    let main = CreateElement("div", {class: "main"});
    let sub = CreateElement("div", {class: "sub"});
    let other = CreateElement("div", {class: "other"});

    switch(key){
        case "application":     
            main.appendChild(CreateElement("span", {text: obj["school"]}));
            main.appendChild(CreateElement("span", {text: obj["subject"]}));
            txt.appendChild(main);
            item.appendChild(txt);
            other.appendChild(CreateElement("span", {text: obj["result"]}));
            item.appendChild(other);
            element.appendChild(item);
            break;
        case "education":     
            pic.appendChild(CreateElement("img", {src: "http://picsum.photos/200/200?random=20"}));
            item.appendChild(pic);
            main.appendChild(CreateElement("span", {text: obj["school"]}));
            main.appendChild(CreateElement("span", {text: obj["subject"]}));
            main.appendChild(CreateElement("span", {text: obj["status"]}));
            txt.appendChild(main);
            sub.appendChild(CreateElement("span", {text: obj["start-year"]}));
            sub.appendChild(CreateElement("span", {text: "-"}));
            sub.appendChild(CreateElement("span", {text: obj["start-month"]}));
            sub.appendChild(CreateElement("span", {text: "~"}));
            sub.appendChild(CreateElement("span", {text: obj["finish-year"]}));
            sub.appendChild(CreateElement("span", {text: "-"}));
            sub.appendChild(CreateElement("span", {text: obj["finish-month"]}));
            txt.appendChild(sub);
            item.appendChild(txt);
            other.appendChild(CreateElement("span", {text: obj["system"]}));
            other.appendChild(CreateElement("span", {text: obj["score"]}));
            item.appendChild(other);
            element.appendChild(item);
            break;
        case "extracurricular":
            break;
        case "exam":
            pic.appendChild(CreateElement("img", {src: "http://picsum.photos/200/200?random=20"}));
            item.appendChild(pic);
            main.appendChild(CreateElement("span", {text: obj["type"]}));
            main.appendChild(CreateElement("span", {text: obj["item"]}));
            txt.appendChild(main);
            sub.appendChild(CreateElement("span", {text: obj["subject"]}));
            txt.appendChild(sub);
            item.appendChild(txt);
            other.appendChild(CreateElement("span", {text: obj["score"]}));
            item.appendChild(other);
            element.appendChild(item);
            break;
        case "essay":
            main.appendChild(CreateElement("span", {text: obj["title"]}));
            txt.appendChild(main);
            sub.appendChild(CreateElement("span", {text: obj["introduce"]}));
            txt.appendChild(sub);
            item.appendChild(txt);
            element.appendChild(item);
            break;
        }
}






function FindNearleastElementWithID(element){
    while(element.id == ""){
        element = element.parentElement;
    }
    return element;
};

function CreateElement(tag, obj){
    let newTag, newNode;
    newTag = document.createElement(tag);
    for(const key in obj){
        switch(key){
            case "text":
                newNode = document.createTextNode(obj[key]);
                newTag.appendChild(newNode);
                break;
            case "class":
                newTag.className = obj[key];
                break;
            case "src":
                newTag.src = obj[key];
                break;
        }
    }
    return newTag;
}

function TryAdd(topic, data){
    if(topic in personalImformationDictionary)
        personalImformationDictionary[topic].push(data);
    else
        personalImformationDictionary[topic] = new Array(data);
    
    console.log(personalImformationDictionary);
}