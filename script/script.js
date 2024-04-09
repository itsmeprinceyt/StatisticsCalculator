// Selecting All buttons
const allSelectButtons = document.querySelectorAll('.js-select-button');

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
        window.open('Pages/IndividualData/directmethod.html',"_self");
    }else if(index === 3){
        window.open('Pages/IndividualData/directmethod.html',"_self");
    }else if(index === 4){
        window.open('Pages/IndividualData/directmethod.html',"_self");
    }else if(index === 5){
        window.open('Pages/IndividualData/directmethod.html',"_self");
    }else if(index === 6){
        window.open('Pages/IndividualData/directmethod.html',"_self");
    }
}
// Home title navigates to index
document.querySelector('.header-title').addEventListener('click',()=>{
    window.open('index.html',"_self");
})

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