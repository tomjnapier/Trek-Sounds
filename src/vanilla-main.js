import Controls from "./Controls";

window.addEventListener("DOMContentLoaded", () => {

  const controls = new Controls();
  controls.init()

  const exitButton = document.querySelector('[data-action="terminate"]');
  exitButton.addEventListener('click', async () => {
    await exit(0);
  });

  const settingsButton = document.querySelector('[data-action="settings"]');
  settingsButton.addEventListener('click', async () => {
    console.log('click settings')
  });

})