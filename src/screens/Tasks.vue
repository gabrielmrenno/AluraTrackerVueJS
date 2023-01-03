<template>
    <FormComponent @onSaveTask="saveTaskOnList" />
    <div class="list">
        <TaskComponent v-for="(task, index) in tasks" :key="index" :task="task" @onClickTask="selectTask" />
        <BoxComponent v-if="listIsEmpty">
            Bora ser produtivo, meu jovem!
        </BoxComponent>
        <div class="modal" :class="{ 'is-active': selectedTask }" v-if="selectedTask">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Editando tarefa</p>
                    <button class="delete" aria-label="close" @click="closeModal"></button>
                </header>
                <section class="modal-card-body">
                    <div class="field">
                        <label for="taskDescription" class="label">
                            Nome do Projeto
                        </label>
                        <input type="text" class="input" v-model="newTaskDescription" id="taskDescription">
                    </div>
                </section>
                <footer class="modal-card-foot">
                    <button class="button is-success" @click="submitChanges">Salvar alterações</button>
                    <button class="button" @click="closeModal">Cancelar</button>
                </footer>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent, computed } from 'vue';
import FormComponent from '../components/Tasks/FormComponent.vue'
import TaskComponent from '../components/Tasks/TaskComponent.vue'
import BoxComponent from '../components/Tasks/BoxComponent.vue'
import { ITask } from '../interfaces/ITask';
import { useStore } from '@/store';
import { GET_PROJECTS, GET_TASKS, POST_TASK, PUT_TASK } from '@/store/actionsTypes';

export default defineComponent({
    name: 'TasksScreen',
    components: {
        FormComponent,
        TaskComponent,
        BoxComponent
    },
    data() {
        return {
            selectedTask: null as ITask | null,
            newTaskDescription: ''
        }
    },
    computed: {
        listIsEmpty(): boolean {
            return this.tasks.length === 0
        }
    },
    methods: {
        saveTaskOnList(task: ITask) {
            this.store.dispatch(POST_TASK, task);
        },
        selectTask(task: ITask) {
            this.selectedTask = task;
            this.newTaskDescription = task.description;
        },
        closeModal() {
            this.selectedTask = null;
        },
        submitChanges() {
            if(this.selectedTask){
                this.selectedTask.description = this.newTaskDescription;
                this.store.dispatch(PUT_TASK, this.selectedTask)
                    .then(() => this.closeModal());
            }
        }
    },
    setup() {
        const store = useStore();
        store.dispatch(GET_TASKS);
        store.dispatch(GET_PROJECTS);
        return {
            store,
            tasks: computed(() => store.state.task.tasks)
        }
    }
});
</script>

<style scoped>
.list {
    padding: 1.25rem;
}
</style>