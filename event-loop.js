const fs = require('fs');
const a =100;

setImmediate(()=>console.log('Immediate callback executed'));

fs.readFile('./filerender.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    console.log('File data:', data);
});

setTimeout(()=>console.log("Timer Expired"),0);

function printA(){console.log('Value of a:', a)}

printA();

console.log('End of script execution');