// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod tray;

fn main() {
  tauri::Builder::default()
    .plugin(tauri_plugin_process::init())
    .setup(|app| {
        // Load plugins
        app.handle().plugin(tauri_plugin_positioner::init())?;

        // Setup tray (moved into its own module)
        tray::init_tray(app)?;

        Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
