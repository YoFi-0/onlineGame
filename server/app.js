console.clear();
const path = require('path')
require('dotenv').config();
const express = require('express');
const app = express();
const lala = require('http').createServer(app);
const io = require('socket.io')(lala, {cros: {origin: '*'}});

app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')
app.set('views', `${__dirname}/views`)

app.get('/', (req, res)=>{
    res.render('game');
});

lala.listen(process.env.PORT, ()=>{
    console.log(`this app is ready http://localhost:${process.env.PORT}`);
});

var listalallololelebaqla = [];

io.on('connection', (soso)=>{
    console.log(`${soso.id} is connected`);
    listalallololelebaqla.push(soso.id)
    soso.on('bluePlayerClint', (data)=>{
        if(data.move && data.move == 'up'){
            console.log('blue moved up')
            soso.broadcast.emit('bluePlayerServer', {"move": "up", "py": data.py})
        } else if(data.move && data.move == 'down'){
            console.log('blue moved dwon')
            soso.broadcast.emit('bluePlayerServer', {"move": "down", "py": data.py})
        }
    });
    soso.on('redPlayerClint', (data)=>{
        if(data.move && data.move == 'up'){
            soso.broadcast.emit('redPlayerServer', {"move": "down", "py": data.py})
            console.log('red moved up')
        } else if(data.move && data.move == 'down'){
            soso.broadcast.emit('redPlayerServer', {"move": "down", "py": data.py})
            console.log('red moved dwon')
        }
    });
    soso.on('disconnect', ()=>{
        console.log(`${soso.id} disconnected`)
        listalallololelebaqla.map((value, index)=>{
            if(value == soso.id){
                listalallololelebaqla = listalallololelebaqla.slice(index, 1)
                console.log(listalallololelebaqla)
            }
        })
    });
    soso.on('ballMove', (data)=> {
        if(listalallololelebaqla[0] == soso.id){
            soso.broadcast.emit('ballServer', {"x": data.x, "y": data.y});
        }
    });
    soso.on('scoreClint', (data)=> {
        // if(listalallololelebaqla[0] == soso.id){
            console.log('some one score')
            soso.broadcast.emit('playersScore', {"blueScore": data.blueScore, "redScore": data.redScore});
        // }
    })
});