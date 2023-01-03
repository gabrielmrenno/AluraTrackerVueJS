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
import { defineComponent, computed, ref } from "vue";
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
    setup(props, { emit }) {
        const store = useStore(key);

        let stopwatch = 0;
        
        const projects = computed(() => store.state.project.projects);
        
        let stopwatchRunning = ref(false);
        const description = ref("");
        const projectId = ref("");
        const timeInSeconds = ref(0);

        function playTaks() {
            stopwatchRunning.value = true;
            stopwatch = setInterval(() => {
                timeInSeconds.value++;
            }, 1000)
        }

        function finishtask(): void {
            if (!projectId.value) {
                store.commit(NOTIFICATE, {
                    title: "Erro ao cadastrar a tarefa",
                    text: "Para cadastrar uma tarefa, ela deve estar vinculada à um projeto",
                    type: NotificationType.DANGER
                });
                stopwatchRunning.value = false;
                clearInterval(stopwatch);
                return;
            }
            const newTask = {
                timeInSeconds: timeInSeconds.value,
                description: description.value,
                project: projects.value.find(eachProject => eachProject.id === projectId.value)
            }
            emit('onSaveTask', newTask)
            description.value = '';
            projectId.value = '';
            stopwatchRunning.value = false;
            clearInterval(stopwatch);
            timeInSeconds.value = 0;
        }

        function pauseTaks() {
            stopwatchRunning.value = false;
            clearInterval(stopwatch);
        }

        return {
            projects,
            description,
            projectId,
            timeInSeconds,
            stopwatchRunning,
            playTaks,
            finishtask,
            pauseTaks
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
