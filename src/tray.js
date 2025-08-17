
import { moveWindow, Position, handleIconState } from '@tauri-apps/plugin-positioner';
import { TrayIcon } from '@tauri-apps/api/tray';
import { resolveResource } from '@tauri-apps/api/path';
import { Image } from '@tauri-apps/api/image';
import { getCurrentWindow } from '@tauri-apps/api/window';

export async function setupTray() {

  const iconPath = await resolveResource('icons/tray-icon.png');
  const icon = await Image.fromPath(iconPath);

  await TrayIcon.new({
    icon,
    "iconAsTemplate": true,
    action: async (event) => {

      // add the handle in the action to update the state
      await handleIconState(event);

      const currentWindow = await getCurrentWindow()
      const isVisible = await currentWindow.isVisible()

      if( event.type == "Click" && event.buttonState == "Down" ) {
        await moveWindow( Position.TrayCenter )

        if( isVisible ) {
          await currentWindow.hide()
        } else {
          await currentWindow.show()
          await currentWindow.setFocus()
        }
      }
    }
  });

}