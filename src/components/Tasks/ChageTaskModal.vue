<template>
    <div class="columns">
        <div class="modal" :class="{ 'is-active': showModal }" v-if="showModal">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <slot name="header"></slot>
                </header>
                <section class="modal-card-body">
                    <slot name="section"></slot>
                </section>
                <footer class="modal-card-foot">
                    <slot name="footer"></slot>
                </footer>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: "ChangeTaskModal",
    props: {
        showModal: {
            type: Boolean,
            required: true
        }
    }
})
</script>