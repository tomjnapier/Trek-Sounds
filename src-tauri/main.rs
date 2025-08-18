fn main() {
  tauri::Builder::default().setup(|app| 
  app.set_activation_policy(ActivationPolicy::Accessory);
}