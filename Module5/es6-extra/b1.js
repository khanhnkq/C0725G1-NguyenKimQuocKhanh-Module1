

const isPrime = (num)=>{
if (num < 2) return false;
if(num===2){
    return true;
}
if(num>2){
    for(i = 2;i<=Math.sqrt(num);i++){
        if(num%i===0){
            return false;
        }
    }
    return true;
}
};


const arr = [1,2,3,4,5,6,7,8,9,10]

let newArr = arr.filter(a=>isPrime(a))
console.log(newArr);

