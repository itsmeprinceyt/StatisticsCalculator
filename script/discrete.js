const numbers = []; // x
const numbersF = []; // frequency
const numbersFX = []; // fx
const numbersDX = []; // dx
const numbersFDX = []; // fdx

//variables for storing result data
let A = 0;
let totalSumF = 0;
let totalSumFX = 0;
let totalSumFDX = 0;
let totalNumber = 0;
let meanD_DM = 0;
let meanD_SM = 0;

let EnterDisable = false;
let counter = 0;
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
    if(filename=== 'disc-direct-method.html')
    {
        calculateDirectMethod();
    } else if(filename=== 'disc-shortcut-method.html')
    {
        calculateShortcutMethod();
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
    const InputBar = document.querySelector('.js-enter-input');
    if (InputBar.value === '') {
        InvalidInput();
        return;
    }
    while(counter<1) // taking x
    {
        const InputValueC = Number(InputBar.value)
        numbers.push(InputValueC)
        InputBar.value = '';
        counter ++;
        return
    }
    const InputValueC = Number(InputBar.value)
    numbersF.push(InputValueC) // taking f
    InputBar.value = '';
    counter = 0;
    if(filename === 'disc-direct-method.html')
    {
        DirectMethod();
    } else if(filename==='disc-shortcut-method.html')
    {
        ShortcutMethod();
    }
}

// Showing Direct Method Data as it is being entered
function DirectMethod(){
    let htmlBody = `
        <tr>
            <th>X</th>
            <th>F</th>
            <th>FX</th>
        </tr>`;
    let footerBody =`
        <tr style="font-size: 10px;">
            <th></th>
            <th>&sum;F = ${totalSumF}</th>
            <th>&sum;FX = ${totalSumFX}</th>
        </tr>
        `;
    numbers.forEach((value,index)=>{
        htmlBody += `
        <tr>
            <td>${value}</td>
            <td>${numbersF[index]}</td>
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

// Calculating Mean using Direct Method 
function calculateDirectMethod()
{
    if(meanD_DM!== 0)
    {
        return
    }
    let Mark = false;
    totalNumber = numbers.length;
    if (totalNumber === 0)
    {
        CalculationError();
        return
    }
    numbers.forEach((value,index)=>{ // calculating Fx
        if(Number.isInteger(value))
        {
            let outputCheck = value * numbersF[index];
            if(Number.isInteger(outputCheck))
            {
                numbersFX.push(value * numbersF[index]);
            }
            else
            {
                numbersFX.push((value * numbersF[index]).toFixed(2));
                Mark = true;
            }
        } else{
            numbersFX.push((value * numbersF[index]).toFixed(2));
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
        totalSumF /= 100;
        totalSumFX /= 100;
        Mark = false;
    }
    meanD_DM =  (((totalSumFX / totalSumF) * 100 )/100).toFixed(2);
    EnterDisable = true;
    changeData(A,totalSumF,totalSumFX,totalSumFDX,totalNumber,meanD_DM,meanD_SM);
    document.querySelector('.result').style.opacity = 1;
    disableInputBox();
}

// Calculating Mean using Shortcut Method
function calculateShortcutMethod()
{
    if(meanD_SM!== 0)
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
    meanD_SM =  (((numbers[A] + totalSumFDX / totalSumF ) * 100 )/100).toFixed(2);
    EnterDisable = true;
    changeData(A,totalSumF,totalSumFX,totalSumFDX,totalNumber,meanD_DM,meanD_SM);
    document.querySelector('.result').style.opacity = 1;
    disableInputBox();
}

// Showing result
function changeData(A,totalSumF,totalSumFX,totalSumFDX,totalNumber,meanD_DM,meanD_SM)
{
    if(filename=== 'disc-direct-method.html')
    {
        DirectMethod();
        resultDirectMethod(totalSumFX,totalSumF,meanD_DM);
    } else if(filename=== 'disc-shortcut-method.html')
    {
        ShortcutMethod();
        resultShortcutMethod(A,totalNumber,totalSumF,totalSumFDX,meanD_SM)
    }
    
}

// Showing result for Direct Method
function resultDirectMethod(totalSumFX,totalSumF,meanD_DM)
{
    document.querySelector('.result').innerHTML = `
    <strong>&sum;F = ${totalSumF} <span style="font-size: 10px;">[Sum Of F]</span> 
    <br>
    &sum;FX = ${totalSumFX} <span style="font-size: 10px;">[Sum Of FX]</span> 
    <br>
    x̄ = ${meanD_DM} <span style="font-size: 10px;">[Mean]</span> </strong> 
    <hr>
    <strong>Formula:  x̄ = &sum;FX/&sum;F</strong>
    `;
    document.querySelector('.pre-mean').innerHTML = `<strong>Mean: ${meanD_DM}</strong>`;
}

// Showing result for Shortcut method
function resultShortcutMethod(A,totalNumber,totalSumF,totalSumFDX,meanD_SM)
{
    document.querySelector('.result').innerHTML = `
    <strong>A = ${numbers[A]} <span style="font-size: 10px;">[Key]</span> 
    <br>
    &sum;FDX = ${totalSumFDX} <span style="font-size: 10px;">[Sum Of FDX]</span> 
    <br>
    &sum;F = ${totalSumF} <span style="font-size: 10px;">[Sum Of F]</span> 
    <br>
    x̄ = ${meanD_SM} <span style="font-size: 10px;">[Mean]</span> </strong>
    <hr>
    <strong>Formula:  x̄ = A + &sum;FDX/&sum;F</strong>`;
    document.querySelector('.pre-mean').innerHTML = `<strong>Mean: ${meanD_SM}</strong>`;
}

// Javascript to clear all lists
function clearEverything()
{
    if (numbers.length=== 0) {ClearError();}
    numbers.splice(0,numbers.length);
    numbersF.splice(0,numbersF.length);
    numbersFX.splice(0,numbersFX.length);
    numbersDX.splice(0,numbersDX.length);
    numbersFDX.splice(0,numbersFDX.length);
    A = 0;
    totalSumF = 0;
    totalSumFX = 0;
    totalSumFDX = 0;
    totalNumber = 0;
    meanD_DM = 0;
    meanD_SM = 0;
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

// Javascript for navigating to home page
document.querySelector('.header-title').addEventListener('click',()=>{
    window.open('index.html',"_self");
})
document.querySelector('.header-icon').addEventListener('click',()=>{
    window.open('index.html',"_self");
})

