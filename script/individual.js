// variables for storing list of numbers
const numbers = [];
// variable for storing dx
const numbersDX = [];

//variables for storing result data
let A = 0;
let totalSum = 0;
let totalSumDX = 0;
let totalNumber = 0;
let meanDM = 0;
let meanSM = 0;

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
    if(filename=== 'indi-direct-method.html')
    {
        calculateDirectMethod();
    } else if(filename=== 'indi-shortcut-method.html')
    {
        calculateShortcutMethod();
    }
})

// Clear Button event listener
document.querySelector('.js-clear-everything').addEventListener('click',()=>{
    clearEverything();
})

//Taking Value from input
function takingValue(){
    if(EnterDisable=== true)
    {
        return;
    }
    const InputBar = document.querySelector('.js-enter-input');
    if ( InputBar.value === '')
    {
        document.querySelector('.error').textContent = `Empty field, please enter the value . . .`;
        setTimeout(()=>{
            document.querySelector('.error').innerHTML =``;
        },4000)
        return
    }
    const InputValueC = Number(InputBar.value)
    numbers.push(InputValueC)
    InputBar.value = '';
    if(filename === 'indi-direct-method.html')
    {
        DirectMethod();
    } else if(filename==='indi-shortcut-method.html')
    {
        ShortcutMethod();
    }
}

// Showing Direct Method Data as it is being entered
function DirectMethod(){
    let htmlBody = `
        <tr>
            <th>S.R</th>
            <th>X</th>
        </tr>`;
    let footerBody =`
        <tr style="font-size: 10px;">
            <th>N = ${totalNumber}</th>
            <th>&sum;X = ${totalSum}</th>
        </tr>
        `;
    numbers.forEach((value,index)=>{
        htmlBody += `
        <tr>
            <td>${index+1}</td>
            <td>${value}</td>
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
            <th>S.R</th>
            <th>X</th>
            <th>DX</th>
        </tr>`;
    let footerBody = `
        <tr style="font-size: 10px;">
            <th></th>
            <th></th>
            <th>&sum;DX = ${totalSumDX}</th>
        </tr>
        `;
    numbers.forEach((value,index)=>{
        htmlBody += `
        <tr>
            <td>${index+1}</td>
            <td>${value}</td>
            <td>${numbersDX[index]}</td>
        </tr>`;
    })
    document.querySelector('.table-div').innerHTML = `<table>
        ${htmlBody}
        ${footerBody}
    </table>`;
}

// Calculating Mean using Direct Method 
function calculateDirectMethod()
{
    if(meanDM!== 0)
    {
        return
    }
    totalNumber = numbers.length;
    if (totalNumber === 0)
    {
        document.querySelector('.error').textContent = `Calculation error, no data found . . .`;
        setTimeout(()=>{
            document.querySelector('.error').innerHTML =``;
        },4000)
        return
    }
    numbers.forEach((value)=>{
        totalSum += value;
    })
    meanDM =  (((totalSum / totalNumber ) * 100 )/100).toFixed(2);
    EnterDisable = true;
    changeData(A,totalSum,totalSumDX,totalNumber,meanDM,meanSM);
    document.querySelector('.result').style.opacity = 1;
    disableInputBox();
}

// Calculating Mean using Shortcut Method
function calculateShortcutMethod()
{
    if(meanSM!== 0)
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
        document.querySelector('.error').textContent = `Calculation error, no data found . . .`;
        setTimeout(()=>{
            document.querySelector('.error').innerHTML =``;
        },4000)
        return
    }
    totalSumDX = 0;
    numbers.forEach((value)=>{
        if(Number.isInteger(value))
        {
            numbersDX.push(value - numbers[A])
        } else{
            numbersDX.push((value - numbers[A]).toFixed(2))
            Mark = true;
        }
    })
    numbersDX.forEach((value)=>{
        if(Number.isInteger(value))
        {
            totalSumDX += value;
        } else{
            let toBeAdded = value * 100;
            totalSumDX += toBeAdded;
        }
    })
    if(Mark === true)
    {
        totalSumDX /=100;
        Mark = false;
    }
    meanSM =  (((numbers[A] + totalSumDX / totalNumber ) * 100 )/100).toFixed(2);
    EnterDisable = true;
    ShortcutMethod();
    changeData(A,totalSum,totalSumDX,totalNumber,meanDM,meanSM);
    document.querySelector('.result').style.opacity = 1;
    disableInputBox();
}

// Showing result
function changeData(A,totalSum,totalSumDX,totalNumber,meanDM,meanSM)
{
    if(filename=== 'indi-direct-method.html')
    {
        DirectMethod();
        resultDirectMethod(totalNumber,totalSum,meanDM);
    } else if(filename=== 'indi-shortcut-method.html')
    {
        ShortcutMethod();
        resultShortcutMethod(A,totalNumber,totalSumDX,meanSM)
    }
    
}

// Showing result for Direct Method
function resultDirectMethod(totalNumber,totalSum,meanDM)
{
    document.querySelector('.result').innerHTML = `
    <strong>(Total Numbers) N = ${totalNumber}
    <br>
    (Total Sum) &sum; = ${totalSum}
    <br>
    (Mean) x̄ = ${meanDM}</strong>
    <hr>
    <strong>Formula:  x̄ = &sum;X/N</strong>
    `;
    document.querySelector('.pre-mean').innerHTML = `<strong>Mean: ${meanDM}</strong>`;
}

// Showing result for Shortcut method
function resultShortcutMethod(A,totalNumber,totalSumDX,meanSM)
{
    document.querySelector('.result').innerHTML = `
    <strong>(Key) A = ${numbers[A]}
    <br>
    (Total Numbers) N = ${totalNumber}
    <br>
    (Total Sum) &sum; = ${totalSumDX}
    <br>
    (Mean) x̄ = ${meanSM}</strong>
    <hr>
    <strong>Formula:  x̄ = A + &sum;dx/N</strong>`;
    document.querySelector('.pre-mean').innerHTML = `<strong>Mean: ${meanSM}</strong>`;
}

// Javascript to clear all lists
function clearEverything()
{
    if (numbers.length=== 0)
    {
        document.querySelector('.error').textContent = `Please input your data first . . .`;
        setTimeout(()=>{
            document.querySelector('.error').innerHTML =``;
        },4000)
    }
    numbers.splice(0,numbers.length);
    numbersDX.splice(0,numbersDX.length);
    A = 0;
    totalSum = 0;
    totalSumDX = 0;
    totalNumber = 0;
    meanDM = 0;
    meanSM = 0;
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

// Javascript for navigating to home page
document.querySelector('.header-title').addEventListener('click',()=>{
    window.open('index.html',"_self");
})
document.querySelector('.header-icon').addEventListener('click',()=>{
    window.open('index.html',"_self");
})

