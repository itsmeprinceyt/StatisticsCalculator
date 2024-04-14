const numbers = []; // C.I - 1st interval
const numbers2 = []; // C.I - 2nd interval
const numbersX = []; // x
const numbersF = []; // frequency
const numbersFX = []; // fx
const numbersDX = []; // dx
const numbersFDX = []; // fdx
const numbersD_ = []; // d'
const numbersFD_ = []; // fd'

//variables for storing result data
let A = 0;
let MidPointX=0;
let AdjustmentFactor = 0;
let totalSumF = 0;
let totalSumFX = 0;
let totalSumFDX = 0;
let totalSumFD_ = 0;
let totalNumber = 0;
let meanC_DM = 0;
let meanC_SM = 0;
let meanC_SDM = 0;
let InputBar = ``;
let classInterval = [];
let classIntervalbreak = [];
let _1stInterval = 0;
let _2ndInterval = 0;
let FrequencyDigit = 0;

let EnterDisable = false;
// variable for storing the name of the file
var url = window.location.pathname;
var filename = url.substring(url.lastIndexOf('/')+1);

// Enter button event listener
document.querySelector('.js-submit').addEventListener('click',()=>{
    takingValue();
})

// Enter button event listener using 'Enter' Key on keyboard
document.querySelector('.js-enter-input').addEventListener('keydown', (event) =>{
    if (event.key === 'Enter')
    {
        takingValue();
    }
})

// Calculate button event listener
document.querySelector('.js-calculate').addEventListener('click',()=>{
    if(filename=== 'conti-direct-method.html')
    {
        calculateDirectMethod();
    } else if(filename=== 'conti-shortcut-method.html')
    {
        calculateShortcutMethod();
    } else if(filename === 'conti-step-deviation-method.html')
    {
        calculateStepDeviationMethod();
    }
})

// Clear Button event listener
document.querySelector('.js-clear-everything').addEventListener('click',()=>{
    clearEverything();
})

//Taking Value from input
function takingValue() {
    if (EnterDisable === true) {
        return;
    }
    InputBar = document.querySelector('.js-enter-input').value;
    classInterval = InputBar.split(" ");
    classIntervalbreak = classInterval[0].split("-")
    _1stInterval = Number(classIntervalbreak[0]);
    _2ndInterval = Number(classIntervalbreak[1]);
    FrequencyDigit = Number(classInterval[1]);
    if(isNaN(_1stInterval) || isNaN(_2ndInterval) || isNaN(FrequencyDigit) )
    {
        clearEverything();
        ClassIntervalError();
        return
    }
    if (InputBar.value === '') {
        clearEverything();
        ClassIntervalError();
        return;
    }
    numbers.push(_1stInterval);
    numbers2.push(_2ndInterval);
    numbersF.push(FrequencyDigit);
    document.querySelector('.js-enter-input').value = ``;
    if(filename=== 'conti-direct-method.html')
    {
        DirectMethod();
    } else if(filename=== 'conti-shortcut-method.html')
    {
        ShortcutMethod();
    } else if(filename === 'conti-step-deviation-method.html')
    {
        StepDeviationMethod();
    }
}

// Showing Direct Method Data as it is being entered
function DirectMethod(){
    let htmlBody = `
        <tr>
            <th>C.I</th>
            <th>F</th>
            <th>X</th>
            <th>FX</th>
        </tr>`;
    let footerBody =`
        <tr style="font-size: 10px;">
            <th></th>
            <th>&sum;F = ${totalSumF}</th>
            <th></th>
            <th>&sum;FX = ${totalSumFX}</th>
        </tr>
        `;
    numbers.forEach((value,index)=>{
        htmlBody += `
        <tr>
            <td>${value}-${numbers2[index]}</td>
            <td>${numbersF[index]}</td>
            <td>${numbersX[index]}</td>
            <td>${numbersFX[index]}</td>
        </tr>`;
    })
    document.querySelector('.table-div').innerHTML = `<table>
        ${htmlBody}
        ${footerBody}
    </table>`;
}

function ShortcutMethod()
{
    let htmlBody = `
        <tr>
            <th>X</th>
            <th>F</th>
            <th>DX</th>
            <th>FDX</th>
        </tr>`;
    let footerBody =`
        <tr style="font-size: 10px;">
            <th></th>
            <th>&sum;F = ${totalSumF}</th>
            <th></th>
            <th>&sum;FDX = ${totalSumFDX}</th>
        </tr>
        `;
    numbers.forEach((value,index)=>{
        htmlBody += `
        <tr>
            <td>${value}</td>
            <td>${numbersF[index]}</td>
            <td>${numbersDX[index]}</td>
            <td>${numbersFDX[index]}</td>
        </tr>`;
    })
    document.querySelector('.table-div').innerHTML = `<table>
        ${htmlBody}
        ${footerBody}
    </table>`;
}

function StepDeviationMethod()
{

}

// Calculating Mean using Direct Method 
function calculateDirectMethod()
{
    if(meanC_DM!== 0)
    {
        return
    }
    let Mark = false;
    let Mark2 = false;
    totalNumber = numbers.length;
    if (totalNumber === 0)
    {
        CalculationError();
        return
    }

    // Converting inclusive to exclusive
    if (numbers2[0] !== numbers[1]) {
        InclusiveDetected();
        AdjustmentFactor = (numbers[1] - numbers2[0]) / 2;
        for (let i = 0; i < totalNumber; i++) {
            let temp1 = parseFloat(numbers[i].toFixed(2));
            let temp2 = parseFloat(numbers2[i].toFixed(2));
            numbers[i] = temp1 - AdjustmentFactor;
            numbers2[i] = temp2 + AdjustmentFactor;
        }
    }
    
    numbers.forEach((value,index)=>{ // calculating x
        if(Number.isInteger(value))
        {
            let outputCheck = (value + numbers2[index]) / 2;
            if(Number.isInteger(outputCheck))
            {
                numbersX.push((value + numbers2[index]) / 2);
            }
            else
            {
                numbersX.push(((value + numbers2[index]) / 2).toFixed(2));
                Mark = true;
            }
        } else{
            numbersX.push(((value + numbers2[index]) / 2).toFixed(2));
            Mark = true;
        }
    });
    numbers.forEach((value,index)=>{ // getting dx
        if(Number.isInteger(value))
        {
            let outputCheck = numbersX[index] * numbersF[index];
            if(Number.isInteger(outputCheck))
            {
                numbersFX.push(numbersX[index] * numbersF[index]);
            }
            else
            {
                numbersFX.push((numbersX[index] * numbersF[index]).toFixed(2));
                Mark = true;
            }
        } else{
            numbersFX.push((numbersX[index] * numbersF[index]).toFixed(2))
            Mark = true;
        }
    });
    numbersF.forEach((value)=>{ // adding F
        if(Number.isInteger(value))
        {
            totalSumF +=value;
        } else{
            let toBeAdded = value * 100;
            totalSumF +=toBeAdded;
            Mark2 = true;
        }
    })
    numbersFX.forEach((value)=>{ // adding fx
        if(Number.isInteger(value))
        {
            totalSumFX +=value;
        } else{
            let toBeAdded = value * 100;
            totalSumFX +=toBeAdded;
        }
    })
    if(Mark === true)
    {
        totalSumFX /= 100;
        Mark = false;
    }
    if(Mark2 === true)
    {
        totalSumF /= 100;
        Mark2= false;
    }
    meanC_DM =  (((totalSumFX / totalSumF) * 100 )/100).toFixed(2);
    EnterDisable = true;
    changeData(A,totalSumF,totalSumFX,totalSumFDX,totalNumber,meanC_DM,meanC_SM,meanC_SDM);
    document.querySelector('.result').style.opacity = 1;
    disableInputBox();
}

// Calculating Mean using Shortcut Method
function calculateShortcutMethod()
{
    if(meanC_SM!== 0)
    {
        return
    }
    let Mark = false;
    if(numbers.length % 2 === 0 )
    {
        A = Math.round(numbers.length /2);
    } else{
        A = Math.floor(numbers.length / 2);
    }
    totalNumber = numbers.length;
    if (totalNumber === 0)
    {
        CalculationError();
        return
    }
    numbers.forEach((value,index)=>{ // getting dx
        if(Number.isInteger(value))
        {
            let outputCheck = value-numbers[A]
            if(Number.isInteger(outputCheck))
            {
                numbersDX.push(value - numbers[A])
            }
            else
            {
                numbersDX.push((value - numbers[A]).toFixed(2));
                Mark = true;
            }
        } else{
            numbersDX.push((value - numbers[A]).toFixed(2))
            Mark = true;
        }
    });
    numbersF.forEach((value,index)=>{ // calculating fdx
        if(Number.isInteger(value))
        {
            let outputCheck = value * numbersDX[index];
            if(Number.isInteger(outputCheck))
            {
                numbersFDX.push(value * numbersDX[index]);
            }
            else
            {
                numbersFDX.push((value * numbersDX[index]).toFixed(2));
                Mark = true;
            }
        } else{
            numbersFDX.push((value * numbersDX[index]).toFixed(2));
            Mark = true;
        }
    })
    numbersF.forEach((value)=>{ // adding F
        if(Number.isInteger(value))
        {
            totalSumF +=value;
        } else{
            let toBeAdded = value * 100;
            totalSumF +=toBeAdded;
        }
    })
    numbersFDX.forEach((value)=>{ // adding fx
        if(Number.isInteger(value))
        {
            totalSumFDX +=value;
        } else{
            let toBeAdded = value * 100;
            totalSumFDX +=toBeAdded;
        }
    })
    if(Mark === true)
    {
        totalSumF /= 100;
        totalSumFDX /= 100;
        Mark = false;
    }
    meanC_SM =  (((numbers[A] + totalSumFDX / totalSumF ) * 100 )/100).toFixed(2);
    EnterDisable = true;
    changeData(A,totalSumF,totalSumFX,totalSumFDX,totalNumber,meanC_DM,meanC_SM);
    document.querySelector('.result').style.opacity = 1;
    disableInputBox();
}

function calculateStepDeviationMethod()
{

}

// Showing result
function changeData(A,totalSumF,totalSumFX,totalSumFDX,totalNumber,meanC_DM,meanC_SM,meanC_SDM)
{
    if(filename=== 'conti-direct-method.html')
    {
        DirectMethod();
        resultDirectMethod(totalSumFX,totalSumF,meanC_DM);
    } else if(filename=== 'conti-shortcut-method.html')
    {
        ShortcutMethod();
        resultShortcutMethod()
    } else if(filename === 'conti-step-deviation-method.html')
    {
        StepDeviationMethod();
        resultStepDeviationMethod();
    }
}

// Showing result for Direct Method
function resultDirectMethod(totalSumFX,totalSumF,meanC_DM)
{
    document.querySelector('.result').innerHTML = `
    <strong>&sum;F = ${totalSumF} <span style="font-size: 10px;">[Sum Of F]</span> 
    <br>
    &sum;FX = ${totalSumFX} <span style="font-size: 10px;">[Sum Of FX]</span> 
    <br>
    x̄ = ${meanC_DM} <span style="font-size: 10px;">[Mean]</span> </strong> 
    <hr>
    <strong>Formula:  x̄ = &sum;FX/&sum;F</strong>
    `;
    document.querySelector('.pre-mean').innerHTML = `<strong>Mean: ${meanC_DM}</strong>`;
}

// Showing result for Shortcut method
function resultShortcutMethod(A,totalNumber,totalSumF,totalSumFDX,meanC_SM)
{
    document.querySelector('.result').innerHTML = `
    <strong>A = ${numbers[A]} <span style="font-size: 10px;">[Key]</span> 
    <br>
    &sum;FDX = ${totalSumFDX} <span style="font-size: 10px;">[Sum Of FDX]</span> 
    <br>
    &sum;F = ${totalSumF} <span style="font-size: 10px;">[Sum Of F]</span> 
    <br>
    x̄ = ${meanC_SM} <span style="font-size: 10px;">[Mean]</span> </strong>
    <hr>
    <strong>Formula:  x̄ = A + &sum;FDX/&sum;F</strong>`;
    document.querySelector('.pre-mean').innerHTML = `<strong>Mean: ${meanC_SM}</strong>`;
}

function resultStepDeviationMethod()
{

}
// Javascript to clear all lists
function clearEverything()
{
    if (numbers.length=== 0) {ClearError();}
    numbers.splice(0,totalNumber);
    numbers2.splice(0,totalNumber);
    numbersX.splice(0,totalNumber);
    numbersF.splice(0,totalNumber);
    numbersFX.splice(0,totalNumber);
    numbersDX.splice(0,totalNumber);
    numbersFDX.splice(0,totalNumber);
    numbersD_.splice(0,totalNumber);
    numbersFD_.splice(0,totalNumber);
    A = 0;
    MidPointX = 0;
    AdjustmentFactor = 0;
    totalSumF = 0;
    totalSumFX = 0;
    totalSumFDX = 0;
    totalSumFD_ = 0;
    totalNumber = 0;
    meanC_DM = 0;
    meanC_SM = 0;
    meanC_SDM = 0;

    InputBar = ``;
    classInterval = [];
    classIntervalbreak = [];
    _1stInterval = 0;
    _2ndInterval = 0;
    FrequencyDigit = 0;

    EnterDisable = false;
    document.querySelector('.table-div').innerHTML = ``;
    document.querySelector('.result').innerHTML = ``;
    document.querySelector('.pre-mean').innerHTML = ``;
    document.querySelector('.result').style.opacity = 0;
    document.querySelector('.js-enter-input').disabled = false;
}

// Disable input box after clicking Calculate
function disableInputBox()
{
    document.querySelector('.js-enter-input').disabled = true;
}

// Invalid input errors
function InvalidInput(){
    document.querySelector('.error').textContent = `Input Error: Input field cannot be empty ...`;
    setTimeout(()=>{
        document.querySelector('.error').innerHTML =``;
    },4000);
}
function CalculationError(){
    document.querySelector('.error').textContent = `Calculation Error: No data found to calculate further ...`;
    setTimeout(()=>{
        document.querySelector('.error').innerHTML =``;
    },4000);
}
function ClearError(){
    document.querySelector('.error').textContent = `Clear Error: No data exists, cannot clear ...`;
    setTimeout(()=>{
        document.querySelector('.error').innerHTML =``;
    },4000);
}
function ClassIntervalError()
{
    document.querySelector('.error').textContent = `Input Error: Input is either empty or in incorrect form ...`;
    setTimeout(()=>{
        document.querySelector('.error').innerHTML=``;
    },4000);
}
function InclusiveDetected()
{
    document.querySelector('.error').textContent = `Inclusive Data Found: The Data will be converted into exclusive form ...`;
    setTimeout(()=>{
        document.querySelector('.error').innerHTML=``;
    },4000);
}

// Javascript for navigating to home page
document.querySelector('.title-of-page-in-second-style').addEventListener('click',()=>{
    window.open('index.html',"_self");
})
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
        const stylesheetToUpdate = "style/pages.css";
        document.querySelector(".title-of-page-in-second-style").textContent = ``;
        document.querySelector(".styleSheet").setAttribute("href", stylesheetToUpdate);
    } else {
        const stylesheetToUpdate = "style/pages2.css";
        document.querySelector(".title-of-page-in-second-style").textContent = `Statistics Calculator by Mohd Uvaish`;
        document.querySelector(".styleSheet").setAttribute("href", stylesheetToUpdate);
    }
}

document.querySelector('.changeTheme').addEventListener('click', () => {
    let currentStyleSheet = document.querySelector(".styleSheet").getAttribute("href");
    let newStyleSheet;
    if (currentStyleSheet === "style/pages.css") {
        newStyleSheet = "style/pages2.css";
        document.querySelector(".title-of-page-in-second-style").textContent = `Statistics Calculator by Mohd Uvaish`;
        themeSelector = false;
    } else {
        newStyleSheet = "style/pages.css";
        document.querySelector(".title-of-page-in-second-style").textContent = ``;
        themeSelector = true;
    }
    // Update local storage with the new theme selection
    localStorage.setItem('themeSelector', themeSelector);
    document.querySelector(".styleSheet").setAttribute("href", newStyleSheet);
});
