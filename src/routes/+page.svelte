<script>
	import '../../node_modules/bulma/css/bulma.min.css';
	import List from '../components/List.svelte';
	import { tasks } from '../store/stores';

	$: counter = $tasks.length;
	$: tasksDone = $tasks.filter((task) => task.done).length;
</script>

<svelte:head><title>Dashboard: {tasksDone} / {counter}</title></svelte:head>

<List />
