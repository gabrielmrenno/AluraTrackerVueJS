<template>
    <header>
        <h1>
            <img src="../assets/logo.png" alt="Logo Alura Tracker">
        </h1>
        <button class="button" @click="changeTheme">
            {{ textButton }}
        </button>
    </header>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: "SideBar",
        emits: ['themeChanged'],
        data () {
            return {
                darkMode: false
            }
        },
        computed: {
            textButton() {
                if (this.darkMode) {
                    return "Desativar dark mode"
                }
                return "Ativar dark mode"
            }
        },
        methods: {
            changeTheme () {
                this.darkMode = !this.darkMode;

                this.$emit("themeChanged", this.darkMode);
            }
        }
    })
</script>

<style scoped>
    header {
        background: #0d3b66;
        width: 100%;
        height: 100vh;

        padding: 1rem;

        text-align: center;
    }

    /* Layout mobile */
    @media only screen and (max-width: 768px) {
        header {
            padding: 2.5rem;
            height: auto;
        }
    }
</style>