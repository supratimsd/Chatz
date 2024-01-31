const express=require('express')
// const { connection } = require('mongoose')
const app=express()
const http=require('http').createServer(app)

const port=process.env.PORT || 3000

http.listen(port,()=>{
    console.log(`App is listening on port ${port}`)
})

app.use(express.static(__dirname + '/public'))

app.get('/',(req,res)=>{
    // res.send("helllo connection")
    res.sendFile(__dirname +'/index.html')
})

const io=require('socket.io')(http)

io.on('connection', (socket)=>{
    console.log("connection done....")

    socket.on('message',(msg)=>{
        // console.log(msg)
        socket.broadcast.emit('message',msg)
    })
})