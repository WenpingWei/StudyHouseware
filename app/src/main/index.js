'use strict'
import { app, BrowserWindow, screen, globalShortcut, ipcMain } from 'electron'
const path = require('path')
const { exec } = require('child_process')
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}
let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */

  let size = screen.getPrimaryDisplay().workAreaSize
  mainWindow = new BrowserWindow({
    height: 760 || size.height,
    useContentSize: true,
    width: 1024 || size.width,
    frame: false,
    minimizable: false,
    fullscreen: false,
    closable: false,
    alwaysOnTop: false,
    kiosk: false,
    show: false,
    backgroundColor: '#283247',
    resizable: false,
    webPreferences: {
      webSecurity: false,
      devTools: true,
      javascript: true,
      plugins: true,
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  })
  // mainWindow.webContents.openDevTools()
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })
  mainWindow.loadURL(winURL)
  mainWindow.on('app-command', (e, cmd) => {
    if (cmd === 'browser-backward' && mainWindow.webContents.canGoBack()) {
      mainWindow.webContents.goBack()
    }
  })
  mainWindow.on('close', (e) => {
    let canQuit = true // 禁止程序关闭
    if (!canQuit) {
      e.preventDefault()
    }
  })
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

// 创建单例
const shouldQuit = app.makeSingleInstance((commandLine, workingDirectory) => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) {
      mainWindow.restore()
    } else {
      mainWindow.focus()
    }
  }
})

if (shouldQuit) {
  app.quit()
}

//启动采集程序

app.on('ready', createWindow)


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
/**
 * Auto start
 */
const exeName = path.basename(process.execPath)
app.setLoginItemSettings({
  openAtLogin: true,
  openAsHidden: false,
  path: process.execPath,
  args: [
    '--processStart', `${exeName}`
  ]
})
exec(`reg add "HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System" /v "EnableLUA" /d "0" /t REG_DWORD /f`)


