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
                        <option :value="project.id" v-for="project in projects" :key="project.id">
                            {{ project.name }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="column">
                <TimerComponent @in-timer-finished="finishtask" @in-timer-paused="pauseTaks" @in-timer-played="playTaks"
                    :stopwatch-running="stopwatchRunning" :time-in-seconds="timeInSeconds" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import TimerComponent from "./TimerComponent.vue";
import { useStore } from "vuex";
import { key } from "@/store";
import { NOTIFICATE } from "@/store/mutationsTypes";
import { NotificationType } from "@/interfaces/INotification";

export default defineComponent({
    name: "FormComponent",
    emits: ['onSaveTask'],
    components: {
        TimerComponent
    },
    data() {
        return {
            description: '',
            projectId: '',
            timeInSeconds: 0,
            stopwatch: 0,
            stopwatchRunning: false,
            stopwatchPaused: false
        }
    },
    methods: {
        playTaks() {
            this.stopwatchRunning = true;
            this.stopwatchPaused = false;
            this.stopwatch = setInterval(() => {
                this.timeInSeconds++;
            }, 1000)
        },
        finishtask(timeInSeconds: number): void {
            if (!this.projectId) {
                this.store.commit(NOTIFICATE, {
                    title: "Erro ao cadastrar a tarefa",
                    text: "Para cadastrar uma tarefa, ela deve estar vinculada à um projeto",
                    type: NotificationType.DANGER
                });
                this.stopwatchRunning = false;
                clearInterval(this.stopwatch);
                return;
            }
            this.$emit('onSaveTask', {
                timeInSeconds,
                description: this.description,
                project: this.projects.find(eachProject => eachProject.id === this.projectId)
            })
            this.description = '';
            this.projectId = '';
            this.stopwatchRunning = false;
            clearInterval(this.stopwatch);
            this.timeInSeconds = 0;
        },
        pauseTaks() {
            this.stopwatchRunning = false;
            clearInterval(this.stopwatch);
        }
    },
    setup() {
        const store = useStore(key);

        return {
            store,
            projects: computed(() => store.state.project.projects),
            notifications: computed(() => store.state.notifications)
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
