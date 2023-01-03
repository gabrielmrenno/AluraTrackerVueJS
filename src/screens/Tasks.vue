<template>
    <FormComponent @onSaveTask="saveTaskOnList" />
    <div class="list">
        <TaskComponent v-for="(task, index) in tasks" :key="index" :task="task" />
        <BoxComponent v-if="listIsEmpty">
            Bora ser produtivo, meu jovem!
        </BoxComponent>
    </div>
</template>
  
<script lang="ts">
import { defineComponent, computed } from 'vue';
import FormComponent from '../components/Tasks/FormComponent.vue'
import TaskComponent from '../components/Tasks/TaskComponent.vue'
import BoxComponent from '../components/Tasks/BoxComponent.vue'
import { ITask } from '../interfaces/ITask';
import { useStore } from '@/store';
import { GET_PROJECTS, GET_TASKS, POST_TASK } from '@/store/actionsTypes';

export default defineComponent({
    name: 'TasksScreen',
    components: {
        FormComponent,
        TaskComponent,
        BoxComponent
    },
    computed: {
        listIsEmpty(): boolean {
            return this.tasks.length === 0
        }
    },
    methods: {
        saveTaskOnList(task: ITask) {
            this.store.dispatch(POST_TASK, task);
        }
    },
    setup () {
        const store = useStore();
        store.dispatch(GET_TASKS);
        store.dispatch(GET_PROJECTS);
        return {
            store,
            tasks: computed(() => store.state.tasks)
        }
    }
});
</script>

<style scoped>
.list {
    padding: 1.25rem;
}
</style>