const path = require("path");

const { app, BrowserWindow, ipcMain, dialog } = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    width: 600,
    height: 200,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.loadFile("index.html");

  win.setMenuBarVisibility(false);

  ipcMain.handle("dialog:openFile", async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog(win, {
      filters: [{ name: "Audio Files", extensions: ["mp3"] }],
    });
    if (canceled) {
      return null;
    } else {
      return filePaths[0];
    }
  });
}
app.whenReady().then(() => {
  createWindow();
});
