const electron = require('electron');
const ffmpeg = require('fluent-ffmpeg');
const { app, BrowserWindow, ipcMain } = electron;

let mainWindow;

app.on('ready', () => {
   mainWindow = new BrowserWindow({}); //Browser window has been assigned to a new variable.
   //we are passing an empty object, we can even add new configuration options.
   mainWindow.loadURL(`file://${__dirname}/index.html`) //We are instructing the browser window to load the HTML document
   //By calling the method loadURL
   //It looks into the current working directory and finds the html file.

});
//First argument - we will specify the event we are going to listen for.
//SEcond argument - a callback function to execute whenever 
//this message is received from main window.
ipcMain.on('video:submit', (event, path) => {
ffmpeg.ffprobe(path, (err, metadata) => {
  console.log('Video duration is:', metadata.format.duration)
  mainWindow.webContents.send(
    'video:metadata', 
    metadata.format.duration);

});
});