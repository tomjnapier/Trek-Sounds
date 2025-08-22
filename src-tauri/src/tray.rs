use tauri::{
  App,
  Manager,
  ActivationPolicy,
  image::Image,
};

use tauri_plugin_positioner::{
  WindowExt, 
  Position, 
  on_tray_event
};
use tauri::tray::{
  TrayIconBuilder, 
  TrayIconEvent, 
  MouseButton, 
  MouseButtonState
};

pub fn init_tray(app: &mut App) -> tauri::Result<()> {
  // Resolve tray icon path
  let icon_path = app
    .path()
    .resolve("icons/tray-icon.png", tauri::path::BaseDirectory::Resource)?;

  // Build tray
  let tray = TrayIconBuilder::with_id("trek-tray")
    .icon(Image::from_path(icon_path).unwrap())
    .on_tray_icon_event(|tray_handle, event| {
      handle_tray_event( tray_handle, event )
    } ) // delegate to function
    .build(app)?;

  // Store tray in state
  app.manage(tray);

  // macOS: hide dock
  app.set_activation_policy(ActivationPolicy::Accessory);

  Ok(())
}

/// Handle tray icon events (clicks etc.)
fn handle_tray_event(tray_handle: &tauri::tray::TrayIcon, event: tauri::tray::TrayIconEvent) {
  let app = tray_handle.app_handle();

  // Let positioner handle event
  on_tray_event(&app.clone(), &event);

  if let Some(window) = app.get_webview_window("main") {
    // Position window near tray
   let _ = window.as_ref().window().move_window(Position::TrayCenter);   
    match event {
      TrayIconEvent::Click { button, button_state, .. } => {
        if button == MouseButton::Left && button_state == MouseButtonState::Up {
          // Toggle visibility
          if window.is_visible().unwrap_or(false) {
            window.hide().unwrap();
          } else {
            window.show().unwrap();
            window.set_focus().unwrap();
          }
        }
      }
      _ => {}
    }
  }
}