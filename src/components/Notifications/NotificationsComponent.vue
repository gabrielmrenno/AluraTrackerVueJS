<template>
    <div class="notifications">
        <article class="message" :class="context[notification.type]" v-for="notification in notifications" :key="notification.id">
            <div class="message-header">{{ notification.title }}</div>
            <div class="message-body">
                {{ notification.text }}
            </div>
        </article>
    </div>
</template>

<script lang="ts">
import { NotificationType } from '@/interfaces/INotification';
import { useStore } from '@/store';
import { defineComponent, computed } from 'vue';



export default defineComponent({
    name: "NotificationsCopmponent",
    data () {
        return {
            context: {
                [NotificationType.SUCCESS]: 'is-success',
                [NotificationType.DANGER]: 'is-danger',
                [NotificationType.WARNING]: 'is-warning'
            }
        }
    },
    setup() {
        const store = useStore();
        return {
            notifications: computed(() => store.state.notifications)
        }
    }
})
</script>

<style scoped>
.notifications {
    position: absolute;
    right: 0;
    width: 300px;
    padding: 8px;
    z-index: 105;
}
</style>