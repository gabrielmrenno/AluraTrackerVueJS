<template>
    <div class="box form">
        <div class="columns">
            <div class="column is-5" role="form" aria-label="Formulário para criação de uma nova tarefa">
                <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar?" v-model="description">
            </div>
            <div class="column is-3">
                <div class="select">
                    <select v-model="projectId">
                        <option value="">Selecione o projeto</option>
                        <option
                            :value="project.id"
                            v-for="project in projects"
                            :key="project.id"
                        >
                            {{ project.name }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="column">
                <TimerComponent @in-timer-finished="finishtask" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import TimerComponent from "./TimerComponent.vue";
import { useStore } from "vuex";
import { key } from "@/store";

export default defineComponent({
    name: "FormComponent",
    emits: ['onSaveTask'],
    components: {
        TimerComponent
    },
    data (){
        return {
            description: '',
            projectId: ''
        }
    },
    methods: {
        finishtask(timeInSeconds: number): void {
            this.$emit('onSaveTask', {
                timeInSeconds,
                description: this.description,
                project: this.projects.find(eachProject => eachProject.id === this.projectId)
            })
            this.description = '';
        }
    },
    setup () {
        const store = useStore(key);

        return {
            projects: computed(() => store.state.projects)
        }
    }
})
</script>

<style>
    .form {
        color: var(--text-primary);
        background-color: var(--bg-primary);
    }
</style>
