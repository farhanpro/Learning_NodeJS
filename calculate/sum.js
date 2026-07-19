//Modules protect the code from being accessed by other files.

function calculateSum(a,b){
    const sum = a + b;
    console.log(`The sum of ${a} and ${b} is: ${sum}`);
}

module.exports = { calculateSum };