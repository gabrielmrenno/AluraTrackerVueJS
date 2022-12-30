import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import TasksScreen from "../screens/Tasks.vue"
import ProjectsScreen from "../screens/Projects.vue"

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: "Tasks",
        component: TasksScreen
    },
    {
        path: '/projetos',
        name: "Projects",
        component: ProjectsScreen
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router;