import { IProject } from "@/interfaces/IProject";
import { Module } from "vuex";
import { State } from '@/store';
import { ADD_PROJECT, DEFINE_PROJECTS, DELETE_PROJECT_MUTATION, EDIT_PROJECT } from "@/store/mutationsTypes";
import { GET_PROJECTS, POST_PROJECT, PUT_PROJECT, DELETE_PROJECT } from "@/store/actionsTypes";
import { httpClient } from "@/http";

export interface ProjectState {
    projects: IProject[];
}

export const project: Module<ProjectState, State> = {
    mutations: {
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
        [DELETE_PROJECT_MUTATION](state, id: string) {
            state.projects = state.projects.filter(proj => proj.id != id);
        },
    },
    actions: {
        [GET_PROJECTS]({ commit }) {
            httpClient.get('/projetos')
                .then(response => commit(DEFINE_PROJECTS, response.data));
        },
        [POST_PROJECT]({ commit }, projectName: string) {
            return httpClient.post('/projetos', {name: projectName})
                .then(() => commit(ADD_PROJECT, projectName))
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        [PUT_PROJECT]({ commit }, project: IProject) {
            return httpClient.put(`/projetos/${project.id}`, {project})
                .then(response => this.commit(EDIT_PROJECT, response.data));
        },
        [DELETE_PROJECT]({ commit }, id: string) {
            return httpClient.delete(`/projetos/${id}`)
                .then(() => commit(DELETE_PROJECT_MUTATION, id))
        },
    }
}