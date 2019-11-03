const { app, BrowserWindow } = require("electron");
const path = require("path");
const { enableLiveReload } = require("electron-compile");
enableLiveReload();

let windows = new Set()

const createWindow = () => {
  let newWindow = new BrowserWindow({
    show: false,
    width: 1200,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });
  newWindow.loadFile(path.join(__dirname, "./index.html"));
  newWindow.on("closed", () => {
    windows.delete(newWindow);
    newWindow = null;
  });
  newWindow.on("ready-to-show", () => {
    newWindow.show();
    newWindow.webContents.openDevTools();
  });
  windows.add(newWindow);
  return newWindow
};

app.on("ready", () => {
  createWindow()
});
