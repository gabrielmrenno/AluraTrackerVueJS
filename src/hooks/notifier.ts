import { NotificationType } from "@/interfaces/INotification"
import { store } from "@/store";
import { NOTIFICATE } from "@/store/mutationsTypes";


type Notifier = {
    notificate: (title: string, text: string, type: NotificationType) => void;
}

function useNotifier(): Notifier {
    const notificate = ( title: string, text: string, type: NotificationType ) => {
        store.commit(NOTIFICATE, { title, text, type })
    }

    return {
        notificate
    }
}

export {
    useNotifier
};