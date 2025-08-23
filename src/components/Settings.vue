<script setup>

    const props = defineProps({
        settings: Function
    })

    function handleSettings() {
        if ( typeof props.settings !== 'function' || !props.settings ) return;
        props.settings()
    }
</script>

<template>
    <header class="lcars-header">
        <h1 class="lcars-text--xl">Settings</h1>
    </header>
    <nav>
        <button class="lcars-button lcars-button--lilac lcars-button-square">Era</button>
        <button class="lcars-button lcars-button--lilac lcars-button-square">Visualiser</button>
        <button class="lcars-button lcars-button--lilac lcars-button-square">Timer</button>
        <button @click="handleSettings" class="lcars-button lcars-button--red lcars-button-square">06-Exit</button>
    </nav>
</template>

<style lang="scss">

nav {
    margin-top: -1.5rem;
    width: 6rem;
    border-top: 3.5rem solid var(--lcars-lilac);
    border-top-left-radius: 4rem 2rem;
}

.lcars-button-square {
    margin-top: 0.25rem;
    font-size: 1.25rem;
}

</style>