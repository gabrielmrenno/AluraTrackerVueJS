<template>
    <div class="box has-text-weight-bold" :style="boxStyle">
        <slot></slot>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: "BoxComponent",
        data () {
            return {
                boxStyle: {
                    background: '#FAF0CA'
                }
            }
        }
    })
</script>
