const fs = require('fs');
const https = require('https');

console.log('Starting async operations...');
var a = 1078698;
var b = 1078698;

https.get('https://jsonplaceholder.typicode.com/todos/1', (res) => console.log('Received response from API'));

setTimeout(() => {console.log('5 seconds have passed');}, 5000);

fs.readFile('./filerender.txt', 'utf8', (err, data) => {console.log('Read file data:', data)})

function multiply(a, b) {
        const result = a * b;
        console.log('Multiplication result:', result);
        return result;
}

var c =  multiply(a, b);
console.log('Final result:', c);

