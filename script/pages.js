const numbers = [];

document.querySelector('.js-submit').addEventListener('click',()=>{
    takingValue();
})
document.querySelector('.js-enter-input').addEventListener('keydown', (event) =>{
    if (event.key === 'Enter')
    {
        takingValue();
    }
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
            <th>S.R</th>
            <th>X</th>
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
    changeData(totalNumber,totalSum,mean);
    document.querySelector('.result').style.opacity = 1;
})
function changeData(totalNumber,totalSum,mean)
{
    document.querySelector('.result').innerHTML = `
    <strong>Total Numbers: ${totalNumber}</strong>
    <strong>Total Sum: ${totalSum}</strong>
    <strong>Mean: ${mean}</strong>`;
    document.querySelector('.pre-mean').innerHTML = `<strong>Mean: ${mean}</strong>`;
}
document.querySelector('.header-title').addEventListener('click',()=>{
    window.open('index.html',"_self");
})
document.querySelector('.header-icon').addEventListener('click',()=>{
    window.open('index.html',"_self");
})