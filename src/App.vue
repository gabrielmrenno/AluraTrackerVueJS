<template>
  <main class="columns is-gapless is-multiline" :class="{ 'dark-mode': darkModeActived }">
    <div class="column is-one-quarter">
      <SideBar @themeChanged="changeTheme" />
    </div>
    <div class="column is-three-quarter content">
      <NotificationsComponent />
      <RouterView></RouterView>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SideBar from './components/SideBar.vue'
import NotificationsComponent from './components/Notifications/NotificationsComponent.vue';

export default defineComponent({
  name: 'App',
  components: {
    SideBar,
    NotificationsComponent
},
  data() {
    return {
      darkModeActived: false
    }
  },
  methods: {
    changeTheme(darkMode: boolean) {
      this.darkModeActived = darkMode;
    }
  }
});
</script>

<style scoped>
main {
  --bg-primary: #fff;
  --text-primary: #000
}

main.dark-mode {
  --bg-primary: #0d3b66;
  --text-primary: #ddd
}

.content {
  background-color: var(--bg-primary);
}
</style>
