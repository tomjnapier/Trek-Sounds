<script setup>

    import { exit, relaunch } from '@tauri-apps/plugin-process';
    
    function exitApp(event) {
        exit(0);
    }
</script>

<template>
    <section class="exit">
        <button @click="exitApp" class="lcars-button lcars-button--square lcars-button--red-light lcars-text--s">05-Terminate</button>        
    </section>
</template>

<style lang="scss">
    section.exit {
        width: 6rem;
        margin-bottom: 0;
    }
</style>