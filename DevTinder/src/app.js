const express =  require('express');


const app = express();
const {adminAuth,userAuth} = require('./middlewares/auth');

app.use('/admin', adminAuth);
app.use('/user',userAuth);

app.get('/admin/getAllData',(req,res)=>{
    res.send('All data from Admin Route');
})

app.get('/user/getAllUsers',(req,res)=>{
    res.status(202).send('All data from User Route')
})



app.listen(3000, () => console.log('Server is running on port 3000'));



