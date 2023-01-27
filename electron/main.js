// ES modules 目前不支持 (electron/electron#21457)
const { app, BrowserWindow, ipcMain } = require('electron')
const { join } = require('path')

const createWindow = () => {
  const win = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: join(__dirname, 'preload.cjs'),
    },
  })

  win.once('ready-to-show', () => {
    win.show()
  })

  if (process.env.NODE_ENV === 'development') {
    win.loadURL(`http://localhost:5173`)
  } else {
    win.loadFile(join(__dirname, '..', 'renderer', 'index.html'))
  }
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

ipcMain.handle('ping', () => 'pong')
