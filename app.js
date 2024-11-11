const http=require('http');
const fs=require('fs');
let test='Enter your message';

const server=http.createServer((req, res)=>{
    const url=req.url;
    const method=req.method;
    if(url==='/'){
        res.write('<html>')
        res.write('<head><title>My First Message</title></head>')
        res.write(`<body><p>${test}</p><form action="/message" method="POST"><input type="text" name="msg"><button type="submit">Send</button><form></body>`)
        res.write('</html>')
        return res.end();
    }

    if(url==='/message' && method==='POST'){
        const body=[];
        req.on('data', (chunk)=>{
            body.push(chunk);
        });
        req.on('end',()=>{
            const parsedBody=Buffer.concat(body).toString();
            console.log(parsedBody);
            const message=parsedBody.split('=')[1];
            fs.writeFileSync('message.txt',message);
            fs.readFile('./message.txt','utf-8',(err,res)=>{
            if(err){
            console.log(err);
            }else{
            test=res;
            }})
        })
        
        res.statusCode=302;
        res.setHeader('Location','/');
        return res.end();
    }
    
});
server.listen(3000)