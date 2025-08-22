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
  
    if( !this.player ) return;
  
    const { play: playButton, setCurrent } = this.buttons

    this.updatePlayerStatus("paused")

    if ( playButton ) {
      playButton.addEventListener("click", () => {
        this.playerStart()
      })
    }

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
    const status = player.getAttribute("data-status") || "paused";
    const playerCurrentSrc = player.getAttribute("src") || "";

    if( !playerCurrentSrc ) return;

    if( status === "paused" ) {
      player.play()
      this.updatePlayerStatus("playing")
      
      if( playButton ) {
        playButton.classList.add(activeClass)
        playButton.textContent = "01A-Pause"
      }

    } else {
      player.pause()
      this.updatePlayerStatus("paused")
      
      if ( playButton ) {
        playButton.classList.remove(activeClass)
        playButton.textContent = playerCurrentSrc ? "01-Play" : "01-Awaiting Src";
      }

    }

  }

  updateSrc( button ) {
    
    const player = this.player
    
    const activeClass = this.buttons.activeClass
    const setCurrent = this.buttons.setCurrent
    const playButton = this.buttons.play

    const current = button.dataset.src || "";

    if(current !== null || "")
      player.setAttribute("src", current)
      playButton.classList.remove(activeClass)
      
      this.updatePlayerStatus("paused")
      
      playButton.textContent = "01-Play"

    if( button.classList.contains(activeClass) ) {
      button.classList.remove(activeClass)
      player.setAttribute("src", "")
    } else {
      setCurrent.forEach( button => button.classList.remove(activeClass) )
      button.classList.toggle(activeClass);
    }

  }

  updatePlayerStatus( status ) {
    const player = this.player
    if ( player && status !== undefined )
      player.setAttribute("data-status", status)
  }

}