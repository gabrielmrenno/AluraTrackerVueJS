<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="is-flex is-align-items-center is-justify-content-space-between">
        <StopwatchComponent :time-in-seconds="timeInSeconds" />
        <FormButton @clicked="play" icon="fas fa-play" :is-disable="stopwatchRunning" />
        <FormButton @clicked="pause" icon="fas fa-pause" :is-disable="!stopwatchRunning" />
        <FormButton @clicked="finish" icon="fas fa-stop" :is-disable="canPause" />
    </div>
</template>

<script lang="ts">
import { defineComponent,  } from "vue";
import StopwatchComponent from "./StopwatchComponent.vue";
import FormButton from "./FormButton.vue";

export default defineComponent({
    name: "TimerComponent",
    emits: [
        'inTimerFinished',
        'inTimerPlayed',
        'inTimerPaused'
    ],
    components: {
        StopwatchComponent,
        FormButton
    },
    props: {
        timeInSeconds: {
            type: Number,
            required: true
        },
        stopwatchRunning: {
            type: Boolean,
            required: true
        }
    },
    computed: {
        canPause() {
            return this.timeInSeconds === 0
        }
    },
    methods: {
        play() {
            this.$emit('inTimerPlayed');
        },
        finish() {
            this.$emit('inTimerFinished', this.timeInSeconds);
        },
        pause() {
            this.$emit('inTimerPaused');
        }
    }
})
</script>
