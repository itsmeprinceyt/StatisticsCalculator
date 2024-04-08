const allSelectButtons = document.querySelectorAll('.js-select-button');

allSelectButtons.forEach((button,index)=>{
    button.addEventListener('click',()=>{
        takeMeToNextPage(index);
    })
})
document.querySelector('.header-title').addEventListener('click',()=>{
    window.open('index.html',"_self");
})
document.querySelector('.header-icon').addEventListener('click',()=>{
    window.open('index.html',"_self");
})
function takeMeToNextPage(index)
{
    if (index === 0)
    {
        window.open('Pages/IndividualData/directmethod.html',"_self");
    }
    else if(index === 1)
    {
        window.open('Pages/IndividualData/directmethod.html',"_self");
    }
    else if(index === 2)
    {
        window.open('Pages/IndividualData/directmethod.html',"_self");
    }
    else if(index === 3)
    {
        window.open('Pages/IndividualData/directmethod.html',"_self");
    }
    else if(index === 4)
    {
        window.open('Pages/IndividualData/directmethod.html',"_self");
    }
    else if(index === 5)
    {
        window.open('Pages/IndividualData/directmethod.html',"_self");
    }
    else if(index === 6)
    {
        window.open('Pages/IndividualData/directmethod.html',"_self");
    }

}