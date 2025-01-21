import { writable } from 'svelte/store';

export const currentDay = writable(new Date().getDate());
export const currentMonth = writable(new Date().getMonth());
export const currentYear = writable(new Date().getFullYear());
