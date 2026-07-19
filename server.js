import { createServer } from 'http';

// const server = http.createServer((req,res)=>{
//     //reply to them with a response
//     res.end('Hello World');
// });

const server = createServer(function(req,res){
    res.end('Hello World');
})
server.listen(6666);
