const electron = require('electron')

// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

global.CONFIG = require('./config.json');;

// register flash plugin
const develop = false;
let asarDir = '../app.asar.unpacked/plugins/';
if (develop) {
  asarDir = './plugins/';
}
let pluginName = 'pepflashplayer32_28_0_0_126.dll'
const flashplayer = path.join(__dirname, asarDir + pluginName)
app.commandLine.appendSwitch('ppapi-flash-path', flashplayer);
app.commandLine.appendSwitch('ppapi-flash-version', '28.0.0.126');

app.setLoginItemSettings({
  openAtLogin: true
})
// app.disableHardwareAcceleration()

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow() {
  // Create the browser window.
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize
  // win = new BrowserWindow({width, height})
  win = new BrowserWindow({
    width: width,
    height: height,
    frame: false,
    webPreferences: { // required if need use plugins
      plugins: true
    }
  })
  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  win.webContents.on('paint', (event, dirty, image) => {
    // updateBitmap(dirty, image.getBitmap())
  })

  // Emitted when the window is closed.
  win.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.