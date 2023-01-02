import { IProject } from "@/interfaces/IProject";
import { ITask } from "@/interfaces/ITask";
import { InjectionKey } from "vue";
import { Store, createStore, useStore as vuexUseStore } from "vuex";
import { ADD_PROJECT, ADD_TASK, DELETE_PROJECT, DELETE_TASK, EDIT_PROJECT, EDIT_TASK, NOTIFICATE } from "./mutationsTypes";
import { INotification } from "../interfaces/INotification";

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
            task.id = new Date().toISOString();

            state.tasks.push(task);
        },
        [EDIT_TASK](state, task: ITask) {
            const index = state.tasks.findIndex(eachTask => eachTask.id === task.id);
            state.tasks[index] = task;
        },
        [DELETE_TASK](state, id: string){
            state.tasks = state.tasks.filter(eachTask => eachTask.id != id);
        },
        [NOTIFICATE](state, newNotification: INotification){
            newNotification.id = new Date().getTime();
            state.notifications.push(newNotification);

            setTimeout(() => {
                state.notifications = state.notifications.filter(notifcation => notifcation.id !== newNotification.id)
            }, 3000)
        }
    }
});

export function useStore(): Store<State> {
    return vuexUseStore(key);
}