<template>
    <BoxComponent class="task">
        <div class="columns" @click="onClickTask">
            <div class="column is-4">
                {{ task.description || "Tarefa sem descrição" }}
            </div>
            <div class="column is-3">
                {{ task.project?.name || 'N/D' }}
            </div>
            <div class="column">
                <StopwatchComponent :time-in-seconds="task.timeInSeconds" />
            </div>
            <button class="button ml-2 is-danger deleteButton" @click="deleteTask(task.id)">
                <span class="icon is-small">
                    <i class="fas fa-trash"></i>
                </span>
            </button>
        </div>
    </BoxComponent>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import StopwatchComponent from './StopwatchComponent.vue';
import BoxComponent from './BoxComponent.vue';
import { ITask } from '@/interfaces/ITask';
import { useStore } from '@/store';
import { DELETE_TASK } from '@/store/mutationsTypes';

export default defineComponent({
    name: "TaskCompoenent",
    components: {
        StopwatchComponent,
        BoxComponent
    },
    props: {
        task: {
            type: Object as PropType<ITask>,
            required: true
        }
    },
    setup(props, { emit }) {
        const store = useStore();

        function deleteTask (id: string) {
            store.dispatch(DELETE_TASK, id);
        }
        function onClickTask () {
            emit('onClickTask', props.task);
        }

        return {
            deleteTask,
            onClickTask
        }
    }
});
</script>

<style scoped>
    .task:hover {
        cursor: pointer;
    }
</style>