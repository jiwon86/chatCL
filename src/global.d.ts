declare global {

  interface UtilAPI {
    setSize(width: number, height: number): void;
  }

  interface Window {
    electron: ElectronAPI,
    utilAPI: UtilAPI,
  }
}

export {}; 