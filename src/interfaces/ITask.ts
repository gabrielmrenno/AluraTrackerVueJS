import { IProject } from "./IProject";

export interface ITask {
    id: string,
    timeInSeconds: number,
    description: string,
    project?: IProject
}