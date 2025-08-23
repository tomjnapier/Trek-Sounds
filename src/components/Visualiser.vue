<script setup>

    import { ref, watch, onUnmounted, onMounted } from 'vue'

    const props = defineProps({
        status: String
    })

    const data = [
        [ 2385, 8578232, 9, 5789, 3489, 3882 ],
        [ 2064, 2064962, 7, 9776, 126, 626 ],
        [ 34, 279, "", 89, 3465, 6589 ],
        [ 4768, 8967248, 7, 9798, 8476, 8969],
        [ 685, 3478, 8, 867, 48, 346],
        [ 757, 898990, 8, 200, 387, 285],
        [ 484, 947589, 7, 569, 56, 68] 
    ]

    let timer = data.length
    let start = ref(0)
    let intervalId = null

    function startTicker() {
        if (intervalId != null) return
        intervalId = setInterval(() => {
            start.value += 2
            if (start.value >= timer) start.value = 0
        }, 500)
    }

    function stopTicker() {
        if (intervalId == null) return
        clearInterval(intervalId)
        intervalId = null
    }

    watch(
        () => props.status,
        (s) => {
            if (s === 'playing') startTicker()
            else {
                stopTicker()
                start.value = 0
            }
        }
    )

onUnmounted(() => {
  stopTicker()
})
</script>

<template>
    <section class="visualiser">
        <div class="visualiser__alphanumeric">
            <table role="presentation">
                <tbody>
                    <tr v-for="(row, rowIndex) in data" :class="{ active: props.status === 'playing' && (rowIndex === start || rowIndex === (start + 1)) }">
                        <td v-for="(cell, cellIndex) in row">{{cell}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>
<style scoped lang="scss">

.visualiser {
    width: calc(100% - 8rem);
    overflow: visible;   
}

.visualiser__alphanumeric {
    margin-top: -2.7rem;
    color: var(--lcars-gold);
}

.visualiser__alphanumeric .active {
    color: var(--lcars-yellow);
} 

table {
    width: 100%;
    line-height: 0.7;
    font-size: 1.4rem;
    text-align: right;
}
</style>