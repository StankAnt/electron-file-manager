import { app, BrowserWindow, Event, ipcMain } from 'electron';
import path from 'path';
import * as si from 'systeminformation';
import { DriveObject } from 'types';
import url from 'url';

let mainWindow: BrowserWindow;

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload)),
  ).catch(console.log);
};

const getDiskInfo = async (): Promise<DriveObject[]> => {
  const drivesInfo = await si.fsSize();
  return drivesInfo
    .filter(item => item.mount === '/')
    .map(item => ({
      available: item.size - item.used,
      capacity: item.use,
      mount: item.mount,
      size: item.size,
    }));
};

app.on('ready', async () => {
  mainWindow = new BrowserWindow({ minWidth: 1024, minHeight: 768 });

  if (process.env.NODE_ENV !== 'production') {
    mainWindow.loadURL('http://localhost:8080');
    installExtensions();
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, '', 'index.html'),
        protocol: 'file:',
        slashes: true,
      }),
    );
  }
});

ipcMain.on('DRIVE_INFO_REQUEST', async (event: Event) => {
  const drives: DriveObject[] = await getDiskInfo();
  event.sender.send('DRIVE_INFO_RESPONSE', drives);
});
