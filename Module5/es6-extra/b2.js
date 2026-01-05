const person = {
firstName:'John',
lastname:'Doe',
age:30,
gender: 'male',
occupation:'developer',
nationality:'America',
city:'New York',
hobbies:['reading','traveling','photography'],
languages:['English','Spanish'],
education:{
    degree:'Bachelor',
    major:'Computer Science',
    university:'Havard University'
}
}

const  {firstName,gender,education:{degree},languages} = person
const student = {firstName,gender,degree,languages}
console.log(student);
