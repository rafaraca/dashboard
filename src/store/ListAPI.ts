import type TaskEntity from '../models/entity/TaskEntity';

export default class ListAPI {
    static async addTask(tasks: TaskEntity[]) {
        localStorage.setItem('tasks', JSON.stringify(tasks));   
    }

    static async getTasks() {
        return JSON.parse(localStorage.getItem('tasks') ?? '[]') as TaskEntity[];
    }

}