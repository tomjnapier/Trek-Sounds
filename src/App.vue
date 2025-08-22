<script setup>
import Status from './Status.vue'
import Header from './Header.vue'
import Sounds from './Sounds.vue'
import Player from "./Player.vue"
import Exit from './Exit.vue'
import Visualiser from './Visualiser.vue'
</script>

<template>
    <Header></Header>
    <main>
        <Status></Status>
        <Sounds></Sounds>
        <Player></Player>
        <hr class="divider"></hr>
        <Exit></Exit>
        <Visualiser></Visualiser>
    </main>
</template>

<style scoped>
</style>
<style>
</style>
