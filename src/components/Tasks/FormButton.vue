<template>
    <button class="button" @click="clicked" :disabled="isDisable">
        <span class="icon">
            <i :class="icon"></i>
        </span>
    </button>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: "FormButton",
        emits: [
            "clicked"
        ],
        props: {
            isDisable: {
                type: Boolean
            },
            icon: {
                type: String
            },
        },
        methods: {
            clicked(){
                this.$emit("clicked");
            }
        }
    })
</script>

<style scoped>
    button:disabled{
        cursor: unset;
    }
</style>