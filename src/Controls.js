export default class Controls {
  
  constructor(parameters) {

    this.timer = null
    this.player = document.getElementById("lcars-audio-output")
    this.buttons = {
      play: document.querySelector('[data-action="play"]'),
      settings: document.querySelector('[data-action="settings"]'),
      setCurrent: document.querySelectorAll('[data-action="set-current"]'),
      activeClass: "lcars-button--active"
    }

  }

  init() {
  
    const playButton = this.buttons.play
    const settingsButton = this.buttons.settings
    const setCurrent = this.buttons.setCurrent

    this.updatePlayerStatus("paused")

    playButton.addEventListener("click", () => {
      this.playerStart()
    })

    setCurrent.forEach(button => {

      button.addEventListener("click", () => {  
        this.updateSrc(button)
      })

    });

  }

  playerStart() {
  
    const playButton = this.buttons.play
    const activeClass = this.buttons.activeClass
    const player = this.player
    const status = player.getAttribute("data-status")
    let playerCurrentSrc = player.getAttribute("src")

    if( "" || null == playerCurrentSrc )
      return

    if( status == "paused" && "" !== playerCurrentSrc ) {
      player.play()
      this.updatePlayerStatus("playing")
      
      playButton.classList.add(activeClass)
      playButton.textContent = "01A-Pause"

    } else {
      player.pause()
      this.updatePlayerStatus("paused")
      
      playButton.classList.remove(activeClass)
      
      if( "" || null == playerCurrentSrc ) {
        playButton.textContent = "01-Play"
      } else {
        playButton.textContent = "01-Awaiting Src"
      }

    }

  }

  updateSrc( button ) {
    
    const player = this.player
    const activeClass = this.buttons.activeClass
    const setCurrent = this.buttons.setCurrent
    const playButton = this.buttons.play

    const current = button.dataset.src

    if(current !== null || "")
      player.setAttribute("src", current)
      playButton.classList.remove(activeClass)
      
      this.updatePlayerStatus("paused")
      
      playButton.textContent = "01-Play"

    if( button.classList.contains(activeClass) ) {
      button.classList.remove(activeClass)
      player.setAttribute("src", "")
    } else {
      setCurrent.forEach(button => {
        button.classList.remove(activeClass)
      })
      button.classList.toggle(activeClass);
    }

  }

  updatePlayerStatus( status ) {
    const player = this.player
    if ( typeof status !== undefined )
      player.setAttribute("data-status", status)
  }

}