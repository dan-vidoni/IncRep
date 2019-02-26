const {
  app,
  BrowserWindow,
  Menu,
  globalShortcut,
  ipcMain
} = require("electron");
const { addBypassChecker } = require("electron-compile");
const url = require("url");
const path = require("path");

//TODO change to production when publishing
process.env.NODE_ENV = "production";

let mainWin;
let dashboardWin;

addBypassChecker(filePath => {
  return (
    filePath.indexOf(app.getAppPath()) === -1 &&
    (/.jpg/.test(filePath) ||
      /.ms/.test(filePath) ||
      /.png/.test(filePath) ||
      /.jpeg/.test(filePath))
  );
});

function createWindow() {
  mainWin = new BrowserWindow({ fullscreen: true });
  mainWin.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true
    })
  );

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

  globalShortcut.register("CommandOrControl+Shift+R", () => {
    createResetWindow();
  });

  mainWin.on("closed", () => {
    app.quit();
  });
}

function createResetWindow() {
  dashboardWin = new BrowserWindow({});
  dashboardWin.loadURL(
    url.format({
      pathname: path.join(__dirname, "dashboard.html"),
      protocol: "file:",
      slashes: true
    })
  );

  dashboardWin.on("close", function() {
    dashboardWin = null;
  });
}

ipcMain.on("reset", function() {
  mainWin.webContents.send("reset");
  dashboardWin.close();
});

ipcMain.on("closeResetWindow", function() {
  dashboardWin.close();
});

ipcMain.on("submit", function(e, message) {
  mainWin.webContents.send("submit", message);
  dashboardWin.close();
});

const menuTemplate = [
  {
    label: "IncRec",
    submenu: [
      {
        label: "Exit",
        accelerator: process.platform == "darwin" ? "Command+Q" : "Ctrl+Q",
        click() {
          app.quit();
        }
      }
    ]
  }
];

if (process.env.NODE_ENV !== "production") {
  menuTemplate.push({
    label: "dev tools",
    submenu: [
      {
        label: "Toggle DevTools",
        accelerator: process.platform == "darwin" ? "Command+I" : "Ctrl+I",
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        }
      }
    ]
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWin === null) {
    createWindow();
  }
});
