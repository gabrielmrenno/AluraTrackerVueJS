<template>
    <FormComponent @onSaveTask="saveTaskOnList" />
    <div class="list">
        <BoxComponent v-if="listIsEmpty">
            Bora ser produtivo, meu jovem!
        </BoxComponent>
        <div class="field">
            <p class="control has-icons-left">
                <input class="input" type="text" placeholder="Digite para filtrar..." v-model="filter">
                <span class="icon is-small is-left">
                    <i class="fas fa-search"></i>
                </span>
            </p>
        </div>
        <TaskComponent v-for="(task, index) in tasks" :key="index" :task="task" @onClickTask="selectTask" />
        <ChangeTaskModal :show-modal="selectedTask !== null">
            <template v-slot:header>
                <p class="modal-card-title">Editando tarefa</p>
                <button class="delete" aria-label="close" @click="closeModal"></button>
            </template>
            <template v-slot:section>
                <div class="field">
                    <label for="taskDescription" class="label">
                        Nome do Projeto
                    </label>
                    <input type="text" class="input" v-model="newTaskDescription" id="taskDescription">
                </div>
            </template>
            <template v-slot:footer>
                <button class="button is-success" @click="submitChanges">Salvar alterações</button>
                <button class="button" @click="closeModal">Cancelar</button>
            </template>
        </ChangeTaskModal>
    </div>
</template>
  
<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import FormComponent from '../components/Tasks/FormComponent.vue';
import TaskComponent from '../components/Tasks/TaskComponent.vue';
import BoxComponent from '../components/Tasks/BoxComponent.vue';
import ChangeTaskModal from '@/components/Tasks/ChageTaskModal.vue';
import { ITask } from '../interfaces/ITask';
import { useStore } from '@/store';
import { GET_PROJECTS, GET_TASKS, POST_TASK, PUT_TASK } from '@/store/actionsTypes';

export default defineComponent({
    name: 'TasksScreen',
    components: {
        FormComponent,
        TaskComponent,
        BoxComponent,
        ChangeTaskModal
    },
    setup() {
        const store = useStore();
        store.dispatch(GET_TASKS);
        store.dispatch(GET_PROJECTS);

        const tasks = computed(() => store.state.task.tasks.filter(eachTask => !filter.value || eachTask.description.includes(filter.value)));
        // const tasks = computed(() => store.state.task.tasks);

        const selectedTask = ref<ITask | null>(null);
        const newTaskDescription = ref('');
        const filter = ref('');

        const listIsEmpty = computed(() => !tasks.value);

        // watchEffect(() => {
        //     store.dispatch(GET_TASKS, filter.value);
        // })

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
            if (selectedTask.value) {
                selectedTask.value.description = newTaskDescription.value;
                store.dispatch(PUT_TASK, selectedTask.value)
                    .then(() => closeModal());
            }
        }

        return {
            selectedTask,
            newTaskDescription,
            tasks,
            listIsEmpty,
            filter,
            saveTaskOnList,
            selectTask,
            closeModal,
            submitChanges,
        }
    }
});
</script>

<style scoped>
.list {
    padding: 1.25rem;
}
</style>