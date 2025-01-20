<script lang="ts">
	import '../../node_modules/bulma/css/bulma.min.css';
	import List from '../components/List.svelte';
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';
	import { collection, getDocs } from 'firebase/firestore';
	import { db } from '../lib/firebase';
	import type TaskEntity from '../models/entity/TaskEntity';

	const tasks = writable<TaskEntity[]>([]);

	onMount(async () => {
		try {
			const querySnapshot = await getDocs(collection(db, 'todos'));
			const loadedTasks = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as TaskEntity[];
			tasks.set(loadedTasks); 
		} catch (error) {
			console.error('Error fetching tasks:', error);
		}
	});

	let counter = 0;
	let tasksDone = 0;
	$: tasks.subscribe((value) => {
		counter = value.length;
		tasksDone = value.filter((task) => task.done).length;
	});
</script>

<svelte:head><title>Dashboard: {tasksDone} / {counter}</title></svelte:head>

<List />
