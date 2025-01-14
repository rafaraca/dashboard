<script lang="ts">
	import '../../node_modules/bulma/css/bulma.min.css';
	import List from '../components/List.svelte';
	import { tasks } from '../store/stores';
    import ListAPI from '../store/ListAPI';
	import { onMount } from 'svelte';
    import type TaskEntity from '../models/entity/TaskEntity';

    onMount(async () => {
		$tasks = (await ListAPI.getTasks()) as TaskEntity[];
	});


	$: counter = $tasks.length;
	$: tasksDone = $tasks.filter((task) => task.done).length;
</script>

<svelte:head><title>Dashboard: {tasksDone} / {counter}</title></svelte:head>

<List />
