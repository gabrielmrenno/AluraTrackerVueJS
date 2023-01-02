export enum NotificationType {
    SUCCESS,
    DANGER,
    WARNING
}

export interface INotification {
    title: string,
    text: string,
    type: NotificationType,
    id: number
}