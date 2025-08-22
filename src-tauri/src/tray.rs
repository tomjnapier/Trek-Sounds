use tauri::{ App, Manager, ActivationPolicy, image::Image };
use tauri_plugin_positioner::{ WindowExt, Position, on_tray_event };
use tauri::tray::{ TrayIconBuilder, TrayIconEvent, MouseButton, MouseButtonState };

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
  #[cfg(target_os = "macos")]
  app.set_activation_policy(ActivationPolicy::Accessory);

  Ok(())
}

/// Handle tray icon events (clicks etc.)
fn handle_tray_event(tray_handle: &tauri::tray::TrayIcon, event: tauri::tray::TrayIconEvent) {
  let app_handle = tray_handle.app_handle();

  // Let positioner handle event
  on_tray_event(&app_handle, &event);

  let window = match app_handle.get_webview_window("main") {
    Some(w) => w,
    None => return,
  };

  // Position window near tray
  let _ = window.as_ref().window().move_window(Position::TrayCenter);   

  if let TrayIconEvent::Click { button, button_state, .. } = event {
    if button == MouseButton::Left && button_state == MouseButtonState::Up {
          // Toggle visibility
      match window.is_visible() {
        Ok(true) => { let _ = window.hide(); },
        Ok(false) => { let _ = window.show(); let _ = window.set_focus(); },
        Err(_) => {},
      }
    }
  }
}