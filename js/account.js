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