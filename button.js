document.querySelector('#address').addEventListener('input', function(evt) {
    let opcode = document.getElementById("opcode").value;
    let mode = document.getElementById("mode").value;
    let address = document.getElementById("address").value;

    let bundle = opcode + "," + mode + "," + address;

    const {ipcRenderer} = require('electron');

    // send opcode to main.js 
    ipcRenderer.send('asynchronous-message', bundle);

    // receive message from main.js
    ipcRenderer.on('asynchronous-reply', (event, arg) => {
        const finArr = arg.split(",");

        document.getElementById("binary").value = finArr[0];
        document.getElementById("mach").value = finArr[1];
    });
});

document.querySelector('#mode').addEventListener('input', function(evt) {
    let opcode = document.getElementById("opcode").value;
    let mode = document.getElementById("mode").value;
    let address = document.getElementById("address").value;

    let bundle = opcode + "," + mode + "," + address;

    const {ipcRenderer} = require('electron');

    // send opcode to main.js 
    ipcRenderer.send('asynchronous-message', bundle);

    // receive message from main.js
    ipcRenderer.on('asynchronous-reply', (event, arg) => {
        const finArr = arg.split(",");

        document.getElementById("binary").value = finArr[0];
        document.getElementById("mach").value = finArr[1];
    });
});

document.querySelector('#opcode').addEventListener('input', function(evt) {
    let opcode = document.getElementById("opcode").value;
    let mode = document.getElementById("mode").value;
    let address = document.getElementById("address").value;

    let bundle = opcode + "," + mode + "," + address;

    const {ipcRenderer} = require('electron');

    // send opcode to main.js 
    ipcRenderer.send('asynchronous-message', bundle);

    // receive message from main.js
    ipcRenderer.on('asynchronous-reply', (event, arg) => {
        const finArr = arg.split(",");

        document.getElementById("binary").value = finArr[0];
        document.getElementById("mach").value = finArr[1];
    });
});