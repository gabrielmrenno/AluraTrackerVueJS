<!-- eslint-disable vue/multi-word-component-names -->
<template>
        <div class="is-flex is-align-items-center is-justify-content-space-between">
            <StopwatchComponent :time-in-seconds="timeInSeconds" />
            <FormButton @clicked="play" icon="fas fa-play" text="play" :is-disable="stopwatchRunning"/>
            <FormButton @clicked="finish" icon="fas fa-stop" text="stop" :is-disable="!stopwatchRunning"/>
        </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import StopwatchComponent from "./StopwatchComponent.vue";
import FormButton from "./FormButton.vue";

export default defineComponent({
    name: "TimerComponent",
    emits:[
        'inTimerFinished'
    ],
    components: {
        StopwatchComponent,
        FormButton
    },
    data(){
        return {
            timeInSeconds: 0,
            stopwatch: 0,
            stopwatchRunning: false
        }
    },

    methods: {
        play() {
            this.stopwatchRunning = true;
            this.stopwatch = setInterval(() => {
                this.timeInSeconds++;
            }, 1000)
        },
        finish() {
            this.stopwatchRunning = false;
            clearInterval(this.stopwatch);
            this.$emit('inTimerFinished', this.timeInSeconds);
            this.timeInSeconds = 0;
        }
    }
})
</script>
