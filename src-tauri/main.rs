use cocoa::appkit::{NSApp, NSApplication, NSApplicationActivationPolicy::*};

unsafe {
    let app = NSApp();
    app.setActivationPolicy_(NSApplicationActivationPolicyAccessory);
}

fn main() {
  tauri::Builder::default()
}