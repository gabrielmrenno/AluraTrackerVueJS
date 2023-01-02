import { NotificationType } from "@/interfaces/INotification"
import { store } from "@/store"
import { NOTIFICATE } from "@/store/mutationsTypes"

export const notificateMixin = {
    methods: {
        notificate( title: string, text: string, type: NotificationType ) {
            store.commit(NOTIFICATE, { title, text, type })
        }
    }
}