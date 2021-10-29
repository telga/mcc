const electron = require('electron');
const url = require('url');
const path = require('path');
const { remote, autoUpdater } = require('electron');

const {app, BrowserWindow, Menu} = electron;

const {ipcMain} = require('electron');
const { callbackify, inherits } = require('util');
const globalShortcut = electron.globalShortcut;

let mainWindow;

//Listen for ready
app.on('ready', function(){
    //New window
    mainWindow = new BrowserWindow({
        width: 312,
        height: 290,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });

    //Load html into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }));

    //Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    //Set non resizable
    mainWindow.setResizable(false);

    //Insert menu
    Menu.setApplicationMenu(mainMenu);
});

// receive message from index.html 
ipcMain.on('asynchronous-message', (event, arg) => {
    const initArr = arg.split(",");
    const fin = convert(initArr[0],initArr[1],initArr[2]);
  
    // send message to index.html
    event.sender.send('asynchronous-reply', fin);
});

//Menu template
const mainMenuTemplate = [
    {
        label: 'Clear',
        accelerator: process.platform == 'darwin' ? 'Command+D' :
        'Ctrl+D',
        click(){
            mainWindow.reload();
        }
    },
    {
        label: 'Quit',
        accelerator: process.platform == 'darwin' ? 'Command+Q' :
        'Ctrl+Q',
        click(){
            app.quit();
        }
    }
];

function convert(opcode, mode, address) {
    console.log(opcode);
    console.log(mode);
    console.log(address);

    var o;
    var m;
    var a;
    var dec;
    ;

    o = opcodeCalc(opcode);
	m = modeCalc(mode, o);
	a = addressCalc(address, o);

    bin = o + m + a;

    bin = bin.substring(3);

    var machineCode = parseInt(bin, 2).toString(16).toUpperCase();

    if (machineCode.length < 4) {
        switch(machineCode.length) {
            case 1:
                machineCode = "000" + machineCode;
                break;
            case 2:
                machineCode = "00" + machineCode;
                break;
            case 3:
                machineCode = "0" + machineCode;
                break;
            default:
                break;
        }	
    }
    
    machineCode = "0x" + machineCode;

    console.log("\nBinary: " + bin);
	console.log("\nMachine Code: " + machineCode);

    return bin + "," + machineCode;

}

function hexToBin(hex) {
    return (parseInt(hex, 16).toString(2)).padStart(8, '0');
}

function opcodeCalc(opcode) {
    var read = "0";
    var write = "1";
    var load = "2";
    var loadmem = "3";
    var store = "4";
    var storemem = "5";
    var add = "6";
    var addi = "7";
    var sub = "8";
    var subi = "9";
    var mul = "A";
    var muli = "B";
    var div = "C";
    var divi = "D";
    var mod = "E";
    var modi = "F";
    var and = "10";
    var or = "11";
    var not = "12";
    var teststatus = "13";
    var clear = "14";
    var jumpifnotzero = "15";
    var jumpifzero = "16";
    var jump = "17";
    var halt = "18";
    var op = opcode;

    switch(op) {
			case "read":
				op = read;
				break;
			case "write":
				op = write;
				break;
			case "load":
				op = load;
				break;
			case "loadmem":
				op = loadmem;
				break;
			case "store":
				op = store;
				break;
			case "storemem":
				op = storemem;
				break;
			case "add":
				op = add;
				break;
			case "addi":
				op = addi;
				break;
			case "sub":
				op = sub;
				break;
			case "subi":
				op = subi;
				break;
			case "mul":
				op = mul;
				break;
			case "muli":
				op = muli;
				break;
			case "div":
				op = div;
				break;
			case "divi":
				op = divi;
				break;
			case "mod":
				op = mod;
				break;
			case "modi":
				op = modi;
				break;
			case "and":
				op = and;
				break;
			case "or":
				op = or;
				break;
			case "not":
				op = not;
				break;
			case "teststatus":
				op = teststatus;
				break;
			case "clear":
				op = clear;
				break;
			case "jumpifnotzero":
				op = jumpifnotzero;
				break;
			case "jumpifzero":
				op = jumpifzero;
				break;
			case "jump":
				op = jump;
				break;
			case "halt":
				op = halt;
				break;
			default:
                console.log("opcode invalid.");
				break;
		}

        console.log("\nop: " + op);

        op = hexToBin(op);

        if (op.length < 5) {
			switch(op.length) {
				case 1:
					op = "0000" + op;
					break;
				case 2:
					op = "000" + op;
					break;
				case 3:
					op = "00" + op;
					break;
				case 4:
					op = "0" + op;
					break;
				default:
					break;
			}
		} 
	return op;
}

function modeCalc(mode, opcode) {

    var opcode = parseInt(opcode, 2).toString(16).toUpperCase();

    switch(opcode) {
        case "0":
        case "1":
        case "6":
        case "8":
        case "A":
        case "C":
        case "E":
        case "10":
        case "11":
        case "13":
        case "15":
        case "16":
        case "17":
        case "18":
            mode = "0";
            break;
        default:
            switch(mode) {
                case "A":case "a":
                    mode = "0";
                    break;
                case "B":case "b":
                    mode = "1";
                    break;
                default:
                    console.log("mode invalid.");
                    break;
            }
            break;
    }
    return mode;
}

function addressCalc(address, opcode) {

    var opcode = parseInt(opcode, 2).toString(16).toUpperCase();

    switch(opcode) {
        case "0":
        case "1":
        case "6":
        case "8":
        case "A":
        case "C":
        case "E":
        case "10":
        case "11":
        case "14":
        case "18":
            address = "00000000";
            break;
        case "2":
        case "3":
        case "4":
        case "5":
        case "15":
        case "16":
        case "17":
            address = hexToBin(address);
            
            if (address.length < 8) {
                switch(address.length) {
                    case 1:
                        address = "0000000" + address;
                        break;
                    case 2:
                        address = "000000" + address;
                        break;
                    case 3:
                        address = "00000" + address;
                        break;
                    case 4:
                        address = "0000" + address;
                        break;
                    case 5:
                        address = "000" + address;
                        break;
                    case 6:
                        address = "00" + address;
                        break;
                    case 7:
                        address = "0" + address;
                        break;
                    default:
                        break;
                }
            } 
            break;
        default:
            address = parseInt(address).toString(2);

            if (address.length < 8) {
                switch(address.length) {
                    case 1:
                        address = "0000000" + address;
                        break;
                    case 2:
                        address = "000000" + address;
                        break;
                    case 3:
                        address = "00000" + address;
                        break;
                    case 4:
                        address = "0000" + address;
                        break;
                    case 5:
                        address = "000" + address;
                        break;
                    case 6:
                        address = "00" + address;
                        break;
                    case 7:
                        address = "0" + address;
                        break;
                    default:
                        break;
                }
            } 
            break;
    }
    return address;
}


