const comboBoxData={
    admission: ["正取", "備取", "未錄取"],
}

let InitializeComboBox = function(){
    let comboBoxItem;
    let comboBoxs = document.querySelectorAll(".combobox");
    comboBoxs.forEach(comboBox =>{
        comboBoxData[comboBox.id].forEach(item => {
            comboBoxItem = CreateElement("option", item);
            comboBoxItem.value = item;
            comboBox.appendChild(comboBoxItem);
        })
        comboBox.selectIndex = -1;
    })
}();
let BindingEvent = function(){
    document.querySelectorAll(".js-onChange").forEach(item => {
        item.addEventListener("change",Change);
    });
    document.querySelectorAll(".js-uplodefile").forEach(item => {
        item.addEventListener("change", ShowFile);
    })
}();

function Change(){
    if(this.name == "admission"){
        if(this.value == "正取" || this.value =="備取"){
            ClassListToggle(".js-hide-" + this.name, "hide", true);
        }
        else if(this.value == "未錄取"){
            ClassListToggle(".js-hide-" + this.name, "hide", false);
        }
    }
    else if(this.name == "study"){
        if(this.value == "yes"){
            ClassListToggle(".js-hide-" + this.name, "hide", true);
        }
        else if(this.value == "no"){
            ClassListToggle(".js-hide-" + this.name, "hide", false);
        }
    }
}
function ShowFile(){
    for (var i = 0; i < this.files.length; i++) {
        if (!this.files[i].type.match(/image.*/)) {
            continue;
        }
        console.log(this.nextElementSibling);
        const reader = new FileReader();
        reader.onload = (e => this.nextElementSibling.src = e.target.result);
        reader.readAsDataURL(this.files[i]);
    }
}


function ClassListToggle(selector, className, needExist){
    if(needExist){
        if(document.querySelector(selector).classList.contains(className)){
            document.querySelector(selector).classList.toggle(className);
        }       
    }
    else{
        if(!document.querySelector(selector).classList.contains(className)){
            document.querySelector(selector).classList.toggle(className);
        }
    }
}
function CreateElement(tag, text){
    let newTag = document.createElement(tag);
    let newNode = document.createTextNode(text);
    newTag.appendChild(newNode);
    return newTag;
}
