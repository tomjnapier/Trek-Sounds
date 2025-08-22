<script setup>

    import { computed } from 'vue'

    const props = defineProps({
        updateSrc: Function,
        playerState: Object
    });

    function updateSource(src) {
        if ( typeof props.updateSrc === 'function' ) { 
            props.updateSrc(src)
        }
    }

    const sources = [
        {
            slug: "tng-bridge",
            title: "Bridge",
            src: "assets/audio/tng_bridge_1.mp3",
            classes: "lcars-button--gold"
        },
        {
            slug: "sick-bay",
            title: "Sick bay",
            src: "assets/audio/tng_sickbay_2.mp3",
            classes: "lcars-button--blue-navy"
        },
        {
            slug: "command-center",
            title: "Command Center",
            src: "assets/audio/tng_commandcenter.mp3",
            classes: "lcars-button--red"
        },
        {
            slug: "engine-room",
            title: "Engines",
            src: "assets/audio/tng_engine_2.mp3",
            classes: "lcars-button--lilac"
        },
        {
            slug: "quarters",
            title: "Quarters",
            src: "assets/audio/tng_room.mp3",
            classes: "lcars-button--blue-light"
        },
        {
            slug: "corridor",
            title: "Corridor",
            src: "assets/audio/tng_hum_clean.mp3",
            classes: "lcars-button--mauve"
        }
    ]

    function activeClass(source) {
        return props.playerState && props.playerState.src === source ? 'lcars-button--active' : '';
    }

</script>

<template>
    <section class="sounds">
        <ul class="lcars-button-group">
            <li v-for="source in sources">
                <button 
                    class="lcars-button lcars-text--l lcars-button--split" 
                    @click="updateSource(source.src)" 
                    :data-src="source.src" 
                    :data-name="source.slug" 
                    :class="[source.classes, activeClass(source.src)]">{{ source.title }}<span class="lcars-button__indicator"></span>
                </button>
            </li>
        </ul>
    </section>
</template>