<script setup>

    import { computed } from 'vue'

    const props = defineProps({
        play: Function,
        pause: Function,
        stop: Function,
        settings: Function,
        playerState: Object,

    })

    function togglePlay() {
        if ( typeof props.play !== 'function' || !props.playerState.src ) return;

        if ( props.playerState.status === "paused" ) { 
            props.play();
        } else if ( props.playerState.status == "playing" ) {
            props.pause();
        }
    }

    const playButtonText = computed(() => {
        const s = props.playerState
        if( s?.status === "playing" ) return "01-Pause"
        if( s?.src && s.status === "paused" ) return "01-Play"
        return '01-Awaiting Src'
    })

    function handleSettings() {
        if ( typeof props.settings !== 'function' || !props.settings ) return;
        props.settings()
    }

    function timer() {

    }

    function handleStop() {
        if (typeof props.stop === 'function') props.stop()
    }

    const buttons = computed(() => [
        {
            action: togglePlay,
            text: playButtonText,
            classes: "lcars-button lcars-button--pill lcars-button--orange lcars-text--m"
        },
        {
            action: handleSettings,
            text: "02-Settings",
            classes: "lcars-button lcars-button--pill lcars-button--mauve lcars-text--m"
        },
        {
            action: timer,
            text: "03-Timer",
            classes: "lcars-button lcars-button--pill lcars-button--lilac lcars-text--m"
        },
        {
            action: handleStop,
            text: "04-Stop",
            classes: "lcars-button lcars-button--pill lcars-button--gold lcars-text--m"
        },
    ])
</script>

<template>
    <section class="controls">
        <ul class="lcars-button-group lcars-button-group--grid">
            <li v-for="(button, i) in buttons" :key="i">
                <button @click="button.action" :class="button.classes">{{ button.text }}</button>
            </li>
        </ul>
    </section>
</template>

<style lang="scss">
.lcars-button {
    display: block;
    width: 100%;
    padding: 0.5rem;
    letter-spacing: 0.01rem;
    border: 0;
    text-align: left;
    position: relative;
    border-radius: 1px;
    transition: background 0.1s ease-in-out;
    cursor: pointer;
}

button.lcars-button--active {
  background-color: var(--lcars-yellow);
  color: var(--lcars-black);

  &:hover,
  &:focus-visible {
    background-color: var(--lcars-yellow--dark);
  }
}

.lcars-button--square {
  padding-top: 4rem;
  border-bottom-left-radius: .625rem;
}

.lcars-button--split {
  border-top-right-radius: 100vmax;
  border-bottom-right-radius: 100vmax;
}

.lcars-button__indicator {
  position: absolute;
  top: 0;
  right: 3rem;
  bottom: 0;
  width: 0.5rem;
  background-color: var(--lcars-black);
}

.lcars-button--pill {
  border-radius: 100vmax;
  padding-top: 1rem;
  padding-right: 1.5rem;
  padding-bottom: 0.25rem;
  text-align: right;
}

.lcars-button--pill-right {
  border-top-right-radius: 100vmax;
  border-bottom-right-radius: 100vmax;
  padding-top: 1rem;
  padding-right: 1.5rem;
  padding-bottom: 0.25rem;
  text-align: left;
}

.lcars-button-group {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.lcars-button-group {
  display: grid;
  grid-gap: 0.5rem;
}

.lcars-button-group--grid {
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 0.5rem;
}

// Button colours

.lcars-button--mauve {
  
  background-color: var(--lcars-mauve);
  
  &:hover,
  &:focus-visible {
    background-color: var(--lcars-mauve--dark);
  }

}

.lcars-button--mauve-light {
  background-color: var(--lcars-mauve--light);

  &:hover,
  &:focus-visible {
    background-color: var(--lcars-mauve);
  }

}

.lcars-button--mauve-dark {
  background-color: var(--lcars-mauve--dark);

  &:hover,
  &:focus-visible {
    background-color: var(--lcars-mauve);
  }

}

.lcars-button--red {
  background-color: var(--lcars-red);

  &:hover,
  &:focus-visible {
    background-color: var(--lcars-red--dark);
  }

}

.lcars-button--red-dark {
  background-color: var(--lcars-red--dark);

  &:hover,
  &:focus-visible {
    background-color: var(--lcars-red);
  }

}

.lcars-button--red-light {
  background-color: var(--lcars-red--light);

  &:hover,
  &:focus-visible {
    background-color: var(--lcars-red);
  }

}

.lcars-button--yellow {
  background-color: var(--lcars-yellow);
}

.lcars-button--sand {
  background-color: var(--lcars-sand);
}

.lcars-button--gold {
  background-color: var(--lcars-gold);

  &:hover,
  &:focus-visible {
    background-color: var(--lcars-gold--dark);
  }

}

.lcars-button--orange {
  background-color: var(--lcars-orange);

  &:hover,
  &:focus-visible {
    background-color: var(--lcars-orange--dark);
  }

}

.lcars-button--lilac {
  background-color: var(--lcars-lilac);

  &:hover,
  &:focus-visible {
    background-color: var(--lcars-lilac--dark);
  }

}

.lcars-button--blue { 
  background-color: var(--lcars-blue);
  
  &:hover,
  &:focus-visible {
    background-color: var(--lcars-blue--dark);
  }

}

.lcars-button--blue-light {
  background-color: var(--lcars-blue--light);

  &:hover,
  &:focus-visible {
    background-color: var(--lcars-blue);
  }

}

.lcars-button--blue-navy {
  background-color: var(--lcars-blue--navy);
  color: var(--lcars-yellow);

  &:hover,
  &:focus-visible {
    background-color: var(--lcars-blue--navy--dark);
  }

}
</style>