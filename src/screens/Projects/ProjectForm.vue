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
import { defineComponent } from 'vue';
import { useStore } from '@/store';
import { NotificationType } from '@/interfaces/INotification';
import { useNotifier } from '@/hooks/notifier';
import { PATCH_PROJECT, POST_PROJECT } from '@/store/actionsTypes';

export default defineComponent({
    name: "ProjectsForm",
    props: {
        id: {
            type: String,
        }
    },
    mounted() {
        if (this.id) {
            const project = this.store.state.projects.find(eachProject => eachProject.id === this.id);
            this.projectName = project?.name || '';
        }
    },
    data() {
        return {
            projectName: '',
        }
    },
    methods: {
        saveForm() {
            if (this.id) {
                this.store.commit(PATCH_PROJECT, {
                    id: this.id,
                    name: this.projectName
                });
                this.successResponse();
            } else {
                this.store.dispatch(POST_PROJECT, this.projectName)
                    .then(() => {
                        this.successResponse();
                    })
            }
        },
        successResponse() {
            this.projectName = '';
            this.notificate("Excelente", "O objeto foi cadastrado com sucesso", NotificationType.SUCCESS);
            this.$router.push('/projetos');
        }
    },
    setup() {
        const store = useStore();
        const { notificate } = useNotifier();
        return {
            store,
            notificate
        }
    },
});
</script>
