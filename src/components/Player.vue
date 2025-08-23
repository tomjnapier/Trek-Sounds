<script setup>

    import { ref, watch, onMounted } from 'vue'

    const props = defineProps({
        src: String
    })

    const audio = ref(null)

    watch(() => props.src, (newSrc) => {
        if (!audio.value) return
        audio.value.src = newSrc || ''
        audio.value.load()
    }, { immediate: true })

    function play() {
        audio.value?.play()
    }

    function pause() {
        audio.value?.pause()
    }

    function stop() {
        if (!audio.value) return
        audio.value.pause()
        audio.value.currentTime = 0
    }

    defineExpose({ play, pause, stop, audio })
</script>

<template>
    <section class="audio-player">
        <audio ref="audio" loop id="lcars-audio-output"></audio>
    </section>
</template>