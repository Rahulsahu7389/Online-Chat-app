import express from "express";
import { Server} from "socket.io";
import {createServer} from "http";
import { Socket } from "dgram";
import cors from "cors"

const port = 3000;

const app = express();
const server = createServer(app);//making new object
const io = new Server(server,{
    cors:{
    origin:"http://localhost:5173",
    method:["GET","POST"],
    credentials:true,
    },
});//made the circuit board


app.use(
    cors({
        origin:"http://localhost:5173",
    method:["GET","POST"],
    credentials:true,
    })
);

app.get("/",(req,res)=>{
    res.send("HELLO WORLD");
})

io.on("connection",(Socket)=>{//since io used so jb bhi  user join krta so sbhi ko mssg jata
    console.log('User Connected');
    console.log('ID',Socket.id);

    Socket.on("message",(data)=>{
        console.log(data);//client or frontend se data server me aayega
        //now want to send the data once received by the client
        io.emit("received-mssg",data)
    })

    // Socket.on("data-de-rha",(d)=>{
    //     // for(val  in d){
    //     //     console.log(val.name,"and",val.id)
    //     // }
    //     console.log(d);
        
    // })

    // Socket.emit("welcome",`welcome to the connection ${Socket.id}`);
    // Socket.broadcast.emit("welcome",`welcome to the connection ${Socket.id}`);--jis wale client ko reload kroge to baki me mssg jaega
    Socket.on("disconnect",()=>{
        console.log("user disconneted",Socket.id);
    })
    
})

server.listen(port,()=>{//phle app tha now server hai
    console.log(`Server is running on port ${port}`);
    
});