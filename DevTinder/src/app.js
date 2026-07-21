const express =  require('express');
const app = express();
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
app.use('/FSK', (req, res) => {
    res.send('Hello FSK Server is running on port 3000');
})

app.use('/Farhan',(req,res)=>{
    res.send('Hello Farhan Server is running on port 3000');
})

