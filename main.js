const {
  app,
  BrowserWindow,
  Menu,
  globalShortcut,
  ipcMain
} = require("electron");
const url = require("url");
const path = require("path");

//TODO change to production when publishing
process.env.NODE_ENV = "production";

let win;
let resetWin;

function createWindow() {
  win = new BrowserWindow({});
  win.loadURL(
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

  win.on("closed", () => {
    win = null;
  });
}

function createResetWindow() {
  resetWin = new BrowserWindow({ height: 200, width: 300 });
  resetWin.loadURL(
    url.format({
      pathname: path.join(__dirname, "reset.html"),
      protocol: "file:",
      slashes: true
    })
  );

  resetWin.on("close", function() {
    resetWin = null;
  });
}

ipcMain.on("reset", function() {
  win.webContents.send("reset");
  resetWin.close();
});

ipcMain.on("closeResetWindow", function() {
  resetWin.close();
});

const menuTemplate = [
  {
    label: "App",
    submenu: [
      {
        label: "Quit",
        accelerator: process.platform == "darwin" ? "Command+Q" : "Ctrl+Q",
        click() {
          app.quit();
        }
      }
    ]
  }
];

//Add devtools for development mode
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
  if (win === null) {
    createWindow();
  }
});
