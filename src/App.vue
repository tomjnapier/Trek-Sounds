<script setup>
    import Status from './Status.vue'
    import Header from './Header.vue'
    import Sounds from './Sounds.vue'
    import Player from "./Player.vue"
    import Controls from "./Controls.vue"
    import Exit from './Exit.vue'
    import Visualiser from './Visualiser.vue'

    import { reactive, ref } from 'vue'
    
    const playerRef = ref(null)

    const playerState = reactive({
        status: "paused",
        src: null
    })

    function play() {
        playerState.status = "playing"
        playerRef.value?.play()
    }

    function stop() {
        playerState.src = null
        playerState.status = "paused"
        playerRef.value?.stop()
    }

    function pause() {
        playerState.status = "paused"
        playerRef.value?.pause()
    }

    function updateSrc(newSrc) {
        playerState.src = newSrc
        playerState.status = "paused"
    }

</script>

<template>
    <Header></Header>
    <main>
        <Status></Status>
        <Sounds 
            :playerState="playerState"   
            :updateSrc="updateSrc"/>
        <Player
            ref="playerRef"
            :src="playerState.src"
        />
        <Controls
            :playerState="playerState"
            :play="play" 
            :pause="pause"
            :stop="stop"
        />
    </main>
    <hr class="divider"></hr>
    <footer>
        <Exit></Exit>
        <Visualiser :status="playerState.status"/>
    </footer>
</template>

<style scoped>
</style>
<style lang="scss">
    :root {
    --lcars-red         : hsl(0, 50%, 60%);
    --lcars-red--light  : hsl(0, 45%, 73%);
    --lcars-red--dark   : hsl(0, 60%, 55%);
    
    --lcars-gold        : hsl(37, 96%, 54%);
    --lcars-gold--light : hsl(37, 91%, 59%);
    --lcars-gold--dark  : hsl(37, 100%, 44%);
    
    --lcars-orange      : hsl(20, 100%, 70%);
    --lcars-orange--light : hsl(20, 95%, 75%);
    --lcars-orange--dark: hsl(20, 100%, 60%);
    
    --lcars-lilac       : hsl(240, 100%, 80%);
    --lcars-lilac--light: hsl(240, 95%, 85%);
    --lcars-lilac--dark : hsl(240, 100%, 70%);
    
    --lcars-mauve       : hsl(322, 33%, 63%);
    --lcars-mauve--light: hsl(322, 28%, 73%);
    --lcars-mauve--dark : hsl(322, 38%, 58%);

    --lcars-sand        : hsl(30, 100%, 80%);

    --lcars-yellow      : hsl(66, 80%, 92%);
    --lcars-yellow--dark: hsl(66, 90%, 72%);
    
    --lcars-blue--navy  : hsl(200, 100%, 30%);
    --lcars-blue--navy--dark  : hsl(200, 100%, 25%);
    
    --lcars-blue        : hsl(220, 60%, 50%);
    --lcars-blue--light : hsl(210, 100%, 80%);
    --lcars-blue--dark  : hsl(220, 65%, 45%);
    
    --lcars-black       : hsl(0, 0%, 10%);

    font-family: "LCARS", Inter, Avenir, Helvetica, Arial, sans-serif;
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;
    text-transform: uppercase;

    color: #fff;
    background-color: var(--lcars-black);

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;

    }

    html, 
    body {
        margin: 0;
        padding: 0;
    }

    html {
        border-radius: 20px;
    }

    body {
        padding: 1.25rem;
        position: fixed;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    *, *:before, *:after {
        box-sizing: border-box;
    }

    section {
       margin-bottom: 1.25rem;
    }

    footer {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
    }

    @font-face {
        font-family: "LCARS";
        src: local("Helvetica Ultra Compressed");
    }

    .lcars-text,
    .lcars-button {
        font-family: "LCARS";
        text-transform: uppercase;
    }

    .lcars-text--xl {
        font-size: 2rem;
        line-height: 0.75;
    }

    .lcars-text--l {
        font-size: 1.5rem;
    }

    .lcars-text--m {
        font-size: 1.25rem;
    }

    .lcars-text--s {
        font-size: 1.125rem;
    }

    /* text colors */
    .lcars-text--mauve {
        color: var(--lcars-mauve);
    }

    .lcars-text--yellow {
        color: var(--lcars-yellow);
    }

    /* backgrounds */
    .lcars-bg--mauve,
    .lcars-button--mauve {
        background-color: var(--lcars-mauve);
    }

    .lcars-bg--mauve--light {
        background-color: var(--lcars-mauve--light);
    }

    .lcars-bg--red {
        background-color: var(--lcars-red);
    }

    .lcars-bg--red--light {
        background-color: var(--lcars-red--light);
    }

    .lcars-bg--yellow {
        background-color: var(--lcars-yellow);
    }

    .lcars-bg--sand {
        background-color: var(--lcars-sand);
    }

    .lcars-bg--gold {
        background-color: var(--lcars-gold);
    }

    .lcars-bg--orange {
        background-color: var(--lcars-orange);
    }

    .lcars-bg--lilac {
        background-color: var(--lcars-lilac);
    }

    .lcars-bg--red {
        background-color: var(--lcars-red);
    }

    .lcars-bg--blue {
        background-color: var(--lcars-blue);
    }

    .lcars-bg--blue-light {
        background-color: var(--lcars-blue--light);
    }

    .lcars-bg--blue-navy {
        background-color: var(--lcars-blue--navy);
        color: var(--lcars-yellow);
    }

    .divider {
        position: relative;
        display: block;
        width: 100%;
        height: 3.5rem;
        background-color: var(--lcars-red--light);
        border: 0;
        border-top-left-radius: 4rem 2rem;
        z-index: -1;
    }

    .divider::before {
        content: '';
        display: block;
        width: calc(100% - 6rem);
        height: 3rem;
        background: var(--lcars-black);
        position: absolute;
        bottom: 0;
        right: 0;
        border-top-left-radius: 3rem 2rem;
    }
</style>
