import { InjectionKey } from "vue";
import { Store, createStore, useStore as vuexUseStore } from "vuex";
import { DEFINE_PROJECTS, ADD_PROJECT, ADD_TASK, DELETE_PROJECT, DELETE_TASK, EDIT_PROJECT, EDIT_TASK, NOTIFICATE, DEFINE_TASKS } from "./mutationsTypes";
import { INotification } from "../interfaces/INotification";
import { GET_PROJECTS, GET_TASKS, PATCH_PROJECT, POST_PROJECT, POST_TASK } from "./actionsTypes";

import { IProject } from "@/interfaces/IProject";
import { ITask } from "@/interfaces/ITask";
import { httpClient } from "@/http";

interface State {
    projects: IProject [],
    tasks: ITask [],
    notifications: INotification[]
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
    state: {
        projects: [],
        tasks: [],
        notifications: []
    },
    mutations: {
        // Projects mutations
        [DEFINE_PROJECTS](state, projects: IProject[]) {
            state.projects = projects;
        },
        [ADD_PROJECT](state, projectName: string) {
            const project = {
                id: new Date().toISOString(),
                name: projectName
            } as IProject;
            state.projects.push(project);
        },
        [EDIT_PROJECT](state, project: IProject) {
            const index = state.projects.findIndex(proj => proj.id === project.id);
            state.projects[index] = project;
        },
        [DELETE_PROJECT](state, id: string){
            state.projects = state.projects.filter(proj => proj.id != id);
        },

        // Tasks mutations
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

        // Notifications
        [NOTIFICATE](state, newNotification: INotification){
            newNotification.id = new Date().getTime();
            state.notifications.push(newNotification);

            setTimeout(() => {
                state.notifications = state.notifications.filter(notifcation => notifcation.id !== newNotification.id)
            }, 3000)
        }
    },
    actions: {
        // Projects
        [GET_PROJECTS]({ commit }) {
            httpClient.get('/projetos')
                .then(response => commit(DEFINE_PROJECTS, response.data));
        },
        [POST_PROJECT]({ commit }, projectName: string) {
            return httpClient.post('/projetos', {name: projectName})
                .then(() => commit(ADD_PROJECT, projectName))
        },
        [PATCH_PROJECT](context, project: IProject) {
            return httpClient.post(`/projetos/${project.id}`, {
                project
            })
        },
        [DELETE_PROJECT]({ commit }, id: string) {
            return httpClient.delete(`/projetos/${id}`)
                .then(() => commit(DELETE_PROJECT, id))
        },

        // Tasks
        [GET_TASKS]({ commit }) {
            httpClient.get('/tarefas')
                .then(response => commit(DEFINE_TASKS, response.data));
        },
        [POST_TASK]({ commit }, task: ITask) {
            return httpClient.post('/tarefas', task)
                .then(response => commit(ADD_TASK, response.data))
        },
        [PATCH_PROJECT](context, task: ITask) {
            return httpClient.post(`/tarefas/${task.id}`, {
                task
            })
        },
        [DELETE_PROJECT]({ commit }, id: string) {
            return httpClient.delete(`/tarefas/${id}`)
                .then(() => commit(DELETE_TASK, id))
        },
    }
});

export function useStore(): Store<State> {
    return vuexUseStore(key);
}