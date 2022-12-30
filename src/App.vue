<template>
  <main class="columns is-gapless is-multiline" :class="{ 'dark-mode' : darkModeActived }">
    <div class="column is-one-quarter">
      <SideBar @themeChanged="changeTheme"/>
    </div>
    <div class="column is-three-quarter content">
      <FormComponent @onSaveTask="saveTaskOnList"/>
      <div class="list">
        <TaskComponent v-for="(task, index) in tasks" :key="index" :task="task"/>
        <BoxComponent v-if="listIsEmpty">
          Bora ser produtivo, meu jovem!
        </BoxComponent>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SideBar from './components/SideBar.vue'
import FormComponent from './components/FormComponent.vue'
import TaskComponent from './components/TaskComponent.vue'
import BoxComponent from './components/BoxComponent.vue'
import ITask from './interfaces/ITasks';

export default defineComponent({
  name: 'App',
  components: {
    SideBar,
    FormComponent,
    TaskComponent,
    BoxComponent
  },
  data () {
    return {
      tasks: [] as ITask[],
      darkModeActived: false
    }
  },
  computed: {
    listIsEmpty (): boolean {
      return this.tasks.length === 0
    }
  },
  methods: {
    saveTaskOnList (task: ITask ) {
      this.tasks.push(task);
    },
    changeTheme(darkMode: boolean){
      this.darkModeActived = darkMode;
    }
  }
});
</script>

<style scoped>
  .list {
    padding: 1.25rem;
  }
  main {
    --bg-primary: #fff;
    --text-primary: #000
  }
  main.dark-mode {
    --bg-primary: #2b2d42;
    --text-primary: #ddd
  }
  .content {
    background-color: var(--bg-primary);
  }
</style>
