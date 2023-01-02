import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import TasksScreen from "../screens/Tasks.vue"
import ProjectsScreen from "../screens/Projects.vue"
import ProjectForm from "../screens/Projects/ProjectForm.vue";
import ProjectList from "../screens/Projects/ProjectList.vue";

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: "Tasks",
        component: TasksScreen
    },
    {
        path: '/projetos',
        component: ProjectsScreen,
        children: [
            {
                path: '',
                name: "Projects",
                component: ProjectList
            },
            {
                path: 'novo',
                name: "New projects",
                component: ProjectForm
            },
            {
                path: ':id',
                name: "Edit projects",
                component: ProjectForm,
                props: true
            }
        ]
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router;