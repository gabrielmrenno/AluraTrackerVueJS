import { httpClient } from "@/http";
import { ITask } from "@/interfaces/ITask";
import { State } from "@/store";
import { GET_TASKS, POST_TASK, PUT_TASK } from "@/store/actionsTypes";
import { ADD_TASK, EDIT_TASK, DELETE_TASK, DEFINE_TASKS } from "@/store/mutationsTypes";
import { Module } from "vuex";


export interface TaskState {
    tasks: ITask[];
}

export const task: Module<TaskState, State> = {
    mutations: {
        [ADD_TASK](state, task: ITask) {
            state.tasks.push(task);
        },
        [EDIT_TASK](state, task: ITask) {
            const index = state.tasks.findIndex(eachTask => eachTask.id === task.id);
            state.tasks[index] = task;
        },
        [DELETE_TASK](state, id: string){
            state.tasks = state.tasks.filter(eachTask => eachTask.id != id);
        },
        [DEFINE_TASKS](state, tasks: ITask[]) {
            state.tasks = tasks;
        },
    },
    actions: {
        [GET_TASKS]({ commit }) {
            httpClient.get('/tarefas')
                .then(response => commit(DEFINE_TASKS, response.data));
        },
        [POST_TASK]({ commit }, task: ITask) {
            return httpClient.post('/tarefas', task)
                .then(response => commit(ADD_TASK, response.data))
        },
        [PUT_TASK]({ commit }, task: ITask) {
            return httpClient.put(`/tarefas/${task.id}`, task)
                .then(() => commit(EDIT_TASK, task));
        },
        [DELETE_TASK]({ commit }, id: string) {
            return httpClient.delete(`/tarefas/${id}`)
                .then(() => commit(DELETE_TASK, id))
        },
    }
}