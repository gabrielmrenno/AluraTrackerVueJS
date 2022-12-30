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
import { defineComponent } from 'vue';
import FormComponent from '../components/Tasks/FormComponent.vue'
import TaskComponent from '../components/Tasks/TaskComponent.vue'
import BoxComponent from '../components/Tasks/BoxComponent.vue'
import ITask from '../interfaces/ITask';

export default defineComponent({
    name: 'TasksScreen',
    components: {
        FormComponent,
        TaskComponent,
        BoxComponent
    },
    data() {
        return {
            tasks: [] as ITask[],
        }
    },
    computed: {
        listIsEmpty(): boolean {
            return this.tasks.length === 0
        }
    },
    methods: {
        saveTaskOnList(task: ITask) {
            this.tasks.push(task);
        }
    }
});
</script>

<style scoped>
.list {
    padding: 1.25rem;
}
</style>