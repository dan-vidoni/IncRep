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

let mainWin;
let dashboardWin;

function createWindow() {
  mainWin = new BrowserWindow({});
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
  dashboardWin = new BrowserWindow({ height: 350, width: 500 });
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
  if (mainWin === null) {
    createWindow();
  }
});
