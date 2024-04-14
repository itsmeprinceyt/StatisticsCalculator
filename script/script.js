// Selecting All buttons
const allSelectButtons = document.querySelectorAll('.js-select-button');

var url = window.location.pathname;
var filename = url.substring(url.lastIndexOf('/')+1);

// Event listener added to take user to desired page
allSelectButtons.forEach((button,index)=>{
    button.addEventListener('click',()=>{
        takeMeToNextPage(index);
    })
})
function takeMeToNextPage(index)
{
    if (index === 0){
        window.open('indi-direct-method.html',"_self");
    }else if(index === 1){
        window.open('indi-shortcut-method.html',"_self");
    }else if(index === 2){
        window.open('disc-direct-method.html',"_self");
    }else if(index === 3){
        window.open('disc-shortcut-method.html',"_self");
    }else if(index === 4){
        window.open('conti-direct-method.html',"_self");
    }else if(index === 5){
        window.open('conti-shortcut-method.html',"_self");
    }else if(index === 6){
        window.open('conti-step-deviation-method.html',"_self");
    }else if (index === 7){
        window.open('indi-direct-method.html',"_self");
    }else if(index === 8){
        window.open('indi-shortcut-method.html',"_self");
    }else if(index === 9){
        window.open('disc-direct-method.html',"_self");
    }else if(index === 10){
        window.open('disc-shortcut-method.html',"_self");
    }else if(index === 11){
        window.open('conti-direct-method.html',"_self");
    }else if(index === 12){
        window.open('conti-shortcut-method.html',"_self");
    }else if(index === 13){
        window.open('conti-step-deviation-method.html',"_self");
    }
}

// Home icon navigates to icon
document.querySelector('.header-icon').addEventListener('click',()=>{
    window.open('index.html',"_self");
})

// Hamburger
const hamburger = document.querySelector('.ham-burger');
const mainMenu = document.querySelector('.hide');
hamburger.addEventListener('click',() =>{
    hamburger.classList.toggle('show');
    mainMenu.classList.toggle('hide');
})

//theme changer
let themeSelector = localStorage.getItem('themeSelector'); // it takes string
themeSelector = themeSelector ? themeSelector === 'true' : true; // so we compare if its a actual string that is true then it will assign boolean value true

getCurrentTheme();

function getCurrentTheme() {
    if (themeSelector === true) {
        const stylesheetToUpdate = "style/style.css";
        document.querySelector(".first-stylesheet-html").style.display = "block";
        document.querySelector(".second-stylesheet-html").style.display = "none";
        document.querySelector(".title-of-page-in-second-style").textContent = ``;
        document.getElementById("styleSheet").setAttribute("href", stylesheetToUpdate);
    } else {
        const stylesheetToUpdate = "style/style2.css";
        document.querySelector(".first-stylesheet-html").style.display = "none";
        document.querySelector(".second-stylesheet-html").style.display = "block";
        document.querySelector(".title-of-page-in-second-style").textContent = `Statistics Calculator by Mohd Uvaish`;
        document.getElementById("styleSheet").setAttribute("href", stylesheetToUpdate);
    }
}

document.querySelector('.changeTheme').addEventListener('click', () => {
    let currentStyleSheet = document.getElementById("styleSheet").getAttribute("href");
    let newStyleSheet;
    if (currentStyleSheet === "style/style.css") {
        newStyleSheet = "style/style2.css";
        document.querySelector(".first-stylesheet-html").style.display = "none";
        document.querySelector(".second-stylesheet-html").style.display = "block";
        document.querySelector(".title-of-page-in-second-style").textContent = `Statistics Calculator by Mohd Uvaish`;
        themeSelector = false;
    } else {
        newStyleSheet = "style/style.css";
        document.querySelector(".first-stylesheet-html").style.display = "block";
        document.querySelector(".second-stylesheet-html").style.display = "none";
        document.querySelector(".title-of-page-in-second-style").textContent = ``;
        themeSelector = true;
    }
    // Update local storage with the new theme selection
    localStorage.setItem('themeSelector', themeSelector);
    document.getElementById("styleSheet").setAttribute("href", newStyleSheet);
});