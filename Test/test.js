A = 45;
totalSumFD_ = 54;
totalSumF = 80;
I = 10;
meanC_SDM =  (
    (
        (A + 
            (totalSumFD_ / totalSumF)*I
        ) * 100
    )
    /100)
    .toFixed(2);
console.log(meanC_SDM);
/*function gcd(a,b) // mini driver code
{
    while(b)
    {
        let temp=b;
        b=a%b;
        a=temp;
    }
    return a;
}
function findingGCD(myNumbers) // main CHF finding which will return a CHF
{
    let count = myNumbers.length;
    result = myNumbers[0]
    for(let i=0;i<myNumbers.length;i++)
    {
        result =gcd(result,myNumbers[i])
    }
    return result;
}
const myNumbers = [-30,-20,-10,0,10,20,30,40];
console.log(`${findingGCD(myNumbers)}`);*/
/*
function Main()
{
    function myFunction(myNumbers) {
        let myNumbers2 = myNumbers;
        myNumbers2.forEach((value,index)=> // making all numbers in the array positive
        {
            if(value<0)
            {
                myNumbers[index] = value * -1;
            }else{
                myNumbers[index] = value;
            }
        })
        let smaller = Math.min(...myNumbers2);
        let highest = Math.max(...myNumbers2);
        console.log(`${smaller}`);
        console.log(`${highest}`);
        let hcf = 1;
        let second = (myNumbers2.length+1) - (myNumbers2.length); 
        console.log(`length: ${myNumbers.length} & second = ${second}`)
        for(let i=0 ;i<myNumbers2.length-1;i++)
        {
            console.log(`i= ${i} & second= ${second}`)
            for (let o = 1; o <= smaller; o++) {
                console.log(`${hcf}`)
                console.log(`A= ${myNumbers[i]} B= ${myNumbers[second]}`);
                if ((myNumbers2[i] % o === 0) && (myNumbers2[second] % o === 0)) {
                    hcf = o;
                }
            }
            second++;
        }
        return hcf;
    }
    const num1 = 20;
    const num2 = 12;
    const myNumbers = [40,20,30,15,35,85,90,100,120];
    console.log("GCD of the giving numbers(20,12) is:", 
        myFunction(myNumbers));
        
    
}
Main()*/