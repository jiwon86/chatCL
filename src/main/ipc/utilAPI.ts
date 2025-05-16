import { BrowserWindow, ipcMain } from "electron"

export function registerUtilAPI(defaultWin: BrowserWindow) {
  ipcMain.on('set-size', (e, width: number, height: number) => {
    const win = BrowserWindow.fromWebContents(e.sender) ?? defaultWin;
    console.log(width,height);
    win.setContentSize(width, height);
    win.center();
  });

  ipcMain.handle('get-size', (e) => {
    const win = BrowserWindow.fromWebContents(e.sender) ?? defaultWin;
    return win.getSize();           // [width, height]
  });
}