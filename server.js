const { exec } = require('child_process');
const express = require('express');
const app = express();
const server = app.listen(8000);
app.use(express.static('public'))

console.log('My nodejs sv is running');

const socket = require('socket.io');
let io = socket(server);
io.sockets.on('connection', (socket) => {
    console.log('New connection ' + socket.id);
    exec('amixer -D pulse get Master',(err, stdout, stderr) => {
        if (err) {
          console.error(err);
          return;
        }
        let out = stdout.split('\n');
        out = out[6].split('[');
        let vol = parseInt(out[1]);
        socket.emit('gVol',vol)
    });
    
    socket.on('cVol', (data) => {
        exec('amixer -D pulse sset Master '+data+'%',(err, stdout, stderr) => {
            if (err) {
              console.error(err);
              return;
            }
        });
    });
});