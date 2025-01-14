import { writable } from 'svelte/store';

import type TaskEntity from '../models/entity/TaskEntity';



export const tasks = writable<TaskEntity[]>([]);