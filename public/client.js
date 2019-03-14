var socket = io('http://192.168.0.5:8000/');
//socket.emit('msg','how you doin');
let lab = document.getElementById("lab");
let control = document.getElementById("vol_control");
socket.on('gVol',(data) => { 
    control.value = data;
    lab.innerHTML = data;
    console.log(data);
});

setVolume = (val) => {
    control.value = val;
    lab.innerHTML = val;
    socket.emit('cVol',val);
};
