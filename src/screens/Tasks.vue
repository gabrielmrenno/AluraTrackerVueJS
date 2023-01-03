<template>
    <FormComponent @onSaveTask="saveTaskOnList"/>
    <div class="list">
        <TaskComponent v-for="(task, index) in tasks" :key="index" :task="task" @onClickTask="selectTask"/>
        <BoxComponent v-if="listIsEmpty">
            Bora ser produtivo, meu jovem!
        </BoxComponent>
        <div class="columns">
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
    </div>
</template>
  
<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
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
    setup() {
        const store = useStore();
        store.dispatch(GET_TASKS);
        store.dispatch(GET_PROJECTS);

        const tasks = computed(() => store.state.task.tasks);

        const selectedTask = ref<ITask | null>(null);
        const newTaskDescription = ref('');

        const listIsEmpty = computed(() => !tasks.value);

        function saveTaskOnList(task: ITask) {
            store.dispatch(POST_TASK, task);
        }
        function selectTask(task: ITask) {
            selectedTask.value = task;
            newTaskDescription.value = task.description;
        }
        function closeModal() {
            selectedTask.value = null;
        }
        function submitChanges() {
            if(selectedTask.value){
                selectedTask.value.description = newTaskDescription.value;
                store.dispatch(PUT_TASK, selectedTask)
                    .then(() => closeModal());
            }
        }

        return {
            selectedTask,
            newTaskDescription,
            tasks,
            listIsEmpty,
            saveTaskOnList,
            selectTask,
            closeModal,
            submitChanges
        }
    }
});
</script>

<style scoped>
.list {
    padding: 1.25rem;
}
</style>