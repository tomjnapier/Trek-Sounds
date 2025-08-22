import Controls from "./Controls";
import { setupTray } from "./tray";
import { getCurrentWindow, Window } from '@tauri-apps/api/window';
import { exit, relaunch } from '@tauri-apps/plugin-process';

// const unlisten = async () => {
//   const currentWindow = await getCurrentWindow();
//   currentWindow.onFocusChanged(({ payload: focused }) => {
//     if( !focused ) {
//       currentWindow.hide();
//     }
//   })
// }

// // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
// unlisten();

window.addEventListener("DOMContentLoaded", () => {

  const controls = new Controls();
  controls.init()

  // async function doTray() {
  //   const tray = await setupTray();
  // }

  // doTray();

  const exitButton = document.querySelector('[data-action="terminate"]');
  exitButton.addEventListener('click', async () => {
    await exit(0);
  });

  const settingsButton = document.querySelector('[data-action="settings"]');
  settingsButton.addEventListener('click', async () => {
    console.log('click settings')
  });

})