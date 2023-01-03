import { InjectionKey } from "vue";
import { Store, createStore, useStore as vuexUseStore } from "vuex";
import { NOTIFICATE } from "./mutationsTypes";
import { INotification } from "../interfaces/INotification";
import { ProjectState, project } from "./modules/project";
import { TaskState, task } from "./modules/task";

export interface State {
    task: TaskState,
    notifications: INotification[]
    project: ProjectState
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
    state: {
        project: {
            projects: [],
        },
        task: {
            tasks: []
        },
        notifications: []
    },
    mutations: {
        // Notifications
        [NOTIFICATE](state, newNotification: INotification){
            newNotification.id = new Date().getTime();
            state.notifications.push(newNotification);

            setTimeout(() => {
                state.notifications = state.notifications.filter(notifcation => notifcation.id !== newNotification.id)
            }, 3000)
        }
    },
    modules: {
        project,
        task
    }
});

export function useStore(): Store<State> {
    return vuexUseStore(key);
}