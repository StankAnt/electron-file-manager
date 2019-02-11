import { ipcRenderer } from 'electron';

export const emitGetHomePath = () => ipcRenderer.send('HOME_PATH_REQUEST');
export const emitGetDrivesList = () => ipcRenderer.send('DRIVE_INFO_REQUEST');
export const emitGetFilesList = (path: string) => ipcRenderer.send('PATH_REQUEST', path);
export const emitOpenFile = (path: string, fileName: string) => ipcRenderer.send('OPEN_FILE_REQUEST', path, fileName);
