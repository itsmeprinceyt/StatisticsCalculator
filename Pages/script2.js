const numbers = [];

document.querySelector('.js-submit').addEventListener('click',()=>{
    takingValue();
})
function takingValue(){
    const InputBar = document.querySelector('.js-enter-input');
    if ( InputBar.value === '')
    {
        alert('Enter the value');
        return
    }
    const InputValueC = Number(InputBar.value)
    numbers.push(InputValueC)
    InputBar.value = '';
    PrintingValue();
}
function PrintingValue(){
    let htmlBody = `
        <tr>
            <td>S.R</td>
            <td>X</td>
        </tr>`;
    numbers.forEach((value,index)=>{
        htmlBody += `
        <tr>
            <td>${index+1}</td>
            <td>${value}</td>
        </tr>`;
    })
    document.querySelector('.table-div').innerHTML = `<table>
        ${htmlBody}
    </table>`;
}
document.querySelector('.js-calculate').addEventListener('click',()=>{
    let totalNumber = numbers.length;
    if (totalNumber === 0)
    {
        alert('Please enter the values first!')
        return
    }
    let totalSum = 0;
    numbers.forEach((value)=>{
        totalSum += value;
    })
    let mean =  (((totalSum / totalNumber ) * 100 )/100).toFixed(2);
    console.log(numbers)
    console.log(mean,totalNumber,totalSum)
    changeData(totalNumber,totalSum,mean);
})
function changeData(totalNumber,totalSum,mean)
{
    document.querySelector('.result').innerHTML = `Total Numbers: ${totalNumber}<br>Total Sum: ${totalSum}<br>Mean: ${mean}`;
}
document.querySelector('.header-title').addEventListener('click',()=>{
    window.open('../../../index.html',"_self");
})
document.querySelector('.header-icon').addEventListener('click',()=>{
    window.open('../../../index.html',"_self");
})