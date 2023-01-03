<template>
    <section>
        <strong class="display">{{ timeFormatted }}</strong>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: "StopwatchComponent",
    props: {
        timeInSeconds: {
            type: Number,
            default: 0
        }
    },
    computed: {
        timeFormatted(): string {
            return new Date(this.timeInSeconds * 1000).toISOString().substring(11, 19);
        }
    },

})
</script>

<style scoped>
.display {
    color: var(--text-primary);
}
</style>