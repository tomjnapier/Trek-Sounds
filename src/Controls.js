export default class Controls {
  constructor(parameters) {
    this.playing = false
    this.timer = null
    this.player = document.getElementById("lcars-audio-output")
    this.buttons = {
      play: document.querySelector('[data-action="play"]'),
      settings: document.querySelector('[data-action="settings"]'),
      setCurrent: document.querySelectorAll('[data-action="set-current"]')
    }
  }

  init() {
    
    let current = null
    let playing = this.playing

    const player = this.player
    const playButton = this.buttons.play
    const settingsButton = this.buttons.settings
    const setCurrent = this.buttons.setCurrent

    playButton.addEventListener("click", () => {
      
      if( !playing ) {
        player.play()
        playing = true
        playButton.classList.add("lcars-button--active")
        playButton.textContent = "01A-Pause"
      } else {
        player.pause()
        playButton.classList.remove("lcars-button--active")
        playButton.textContent = "01-Play"
        playing = false
      }

    })

    settingsButton.addEventListener("click", () => {
      console.log("settings")
    })

    setCurrent.forEach(button => {

      button.addEventListener("click", (event) => {

        current = button.dataset.src
        player.setAttribute("src", current)

        setCurrent.forEach(button => {
          button.classList.remove("lcars-button--active")
        })

        button.classList.toggle("lcars-button--active");

      })

    });

  }

}