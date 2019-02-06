import { ipcRenderer } from 'electron';

export const emitGetHomePath = () => ipcRenderer.send('HOME_PATH_REQUEST');
export const emitGetDriveList = () => ipcRenderer.send('DRIVE_INFO_REQUEST');
export const emitOpenFile = () => ipcRenderer.send('OPEN_FILE_REQUEST');
export const emitPath = () => ipcRenderer.send('PATH_REQUEST');
