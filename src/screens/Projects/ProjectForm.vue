<template>
    <section>
        <form @submit.prevent="saveForm">
            <div class="field">
                <label for="projectName" class="label">
                    Nome do Projeto
                </label>
                <input type="text" class="input" v-model="projectName" id="projectName">
            </div>
            <div class="field">
                <button class="button" type="submit">
                    Salvar
                </button>
            </div>
        </form>
    </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from '@/store';
import { NotificationType } from '@/interfaces/INotification';
import { useNotifier } from '@/hooks/notifier';
import { PUT_PROJECT, POST_PROJECT } from '@/store/actionsTypes';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: "ProjectsForm",
    props: {
        id: {
            type: String,
        }
    },
    setup(props) {
        const router = useRouter();

        const store = useStore();
        const { notificate } = useNotifier();

        const projectName = ref("");

        if (props.id) {
            const project = store.state.project.projects.find(eachProject => eachProject.id === props.id);
            projectName.value = project?.name || '';
        }

        function saveForm() {
            if (props.id) {
                store.dispatch(PUT_PROJECT, {
                    id: props.id,
                    name: projectName.value
                })
                    .then(() => successResponse())
            } else {
                store.dispatch(POST_PROJECT, projectName.value)
                    .then(() => successResponse())
            }
        }

        function successResponse() {
            projectName.value = '';
            notificate("Excelente", "O objeto foi cadastrado com sucesso", NotificationType.SUCCESS);
            router.push('/projetos');
        }

        return {
            projectName,
            saveForm
        }
    },
});
</script>
