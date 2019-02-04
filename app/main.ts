import { app, BrowserWindow, Event, ipcMain, shell } from 'electron';
import fs, { Stats } from 'fs-extra';
import mime from 'mime-types';
import { homedir, platform as getPlatform } from 'os';
import path from 'path';
import * as si from 'systeminformation';
import { DriveObject, FileObject } from 'types/objects';
import url from 'url';
import { promisify } from 'util';

let mainWindow: BrowserWindow;

const readDir: (path: string | Buffer) => Promise<string[]> = promisify(fs.readdir);
const getStat: (path: string | Buffer) => Promise<Stats> = promisify(fs.lstat);

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload)),
  );
};

const getHomePath = (): string => {
  const platform = getPlatform();
  let homeDir: string = '/';

  if (platform === 'linux') {
    homeDir = homedir();
  }

  return homeDir;
};

const HomePath: string = getHomePath();

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
    // mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, 'index.html'),
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

ipcMain.on('HOME_PATH_REQUEST', (event: Event) => {
  event.sender.send('HOME_PATH_RESPONSE');
});

ipcMain.on('PATH_REQUEST', async (event: Event, folderPath: string) => {
  try {
    const files: string[] = await readDir(folderPath);

    const stats: FileObject[] = await Promise.all(
      files.map(async (file: string): Promise<FileObject> => {
        const filePath = path.join(folderPath, file);
        const stat: Stats = await getStat(filePath);
        const isFile = stat.isFile();
        return {
          date: stat.birthtime,
          isFile,
          size: stat.size,
          title: file,
          type: isFile && mime.lookup(file),
        };
      }));

    event.sender.send('PATH_RESPONSE', stats);
  } catch {
    event.sender.send('PATH_RESPONSE', []);
  }
});

// ipcMain.on('FILE_MOVE_REQUEST', async (event: Event) => {
//   try {
//   } catch {
//     event.sender.send('FILE_MOVE_RESPONSE', []);
//   }
// });

ipcMain.on('OPEN_FILE_REQUEST', async (event: Event, filePath: string, fileName: string) => {
  try {
    const fullPath = path.join(filePath, fileName);
    const isSuccessful = shell.openItem(fullPath);
    event.sender.send('OPEN_FILE_RESPONSE', { success: isSuccessful });
  } catch (err) {
    event.sender.send('OPEN_FILE_RESPONSE', { success: false });
  }
});
