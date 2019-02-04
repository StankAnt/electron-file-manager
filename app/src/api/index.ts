import { ipcRenderer } from 'electron';

export const emitGetHomePath = () => ipcRenderer.send('HOME_PATH_REQUEST');
