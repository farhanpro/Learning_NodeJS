const crypto = require('crypto');
console.log('Starting blocking operations...');

const a = 1078698;
const b = 1078698;
//pbkdf2 - Password-Based Key Derivation Function 2

//Asynchronous version of pbkdf2
crypto.pbkdf2("password",'salt',5000,50,"sha512",(err,key)=>{console.log("Key is Generated")});

function multiplyFn(x,y)
{
    const result = a*b;
    return result;
}

var c = multiplyFn(a,b);
console.log("Multiplication Result is  :",c);