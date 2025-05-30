import { BrowserWindow, ipcMain } from "electron"

export function registerUtilAPI(defaultWin: BrowserWindow) {
  ipcMain.on('set-size', (e, width: number, height: number) => {
    const win = BrowserWindow.fromWebContents(e.sender) ?? defaultWin;
    win.setContentSize(width, height);
    
    console.log(width,height);
    // 화면 중앙
    //win.center();
  });

  ipcMain.handle('get-size', (e) => {
    const win = BrowserWindow.fromWebContents(e.sender) ?? defaultWin;
    return win.getSize();           // [width, height]
  });
}