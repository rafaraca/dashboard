<script lang="ts">
	import { blur, slide } from 'svelte/transition';
	import Task from '../../components/Task.svelte';
	import { tasks } from '../../store/stores';

    let undone = $tasks.filter((task) => !task.done).length;
	let sortTasks: typeof $tasks = [];

    $: {
		sortTasks = $tasks.sort((a, b) => Number(a.done) - Number(b.done));
    }
</script>

<div class="container" in:blur={{ amount: 5, delay: 400 }}>
    <input type="range" bind:value={undone} min="0" max={$tasks.length} step="1" />
	<div class="box">
		{#each sortTasks.slice(0, undone) as task (task.id)}
			<div transition:slide class="table">
				<Task {task} />
			</div>
		{:else}
			<p>All Done!!! ;-)</p>
		{/each}
	</div>
</div>

<style>
	.table {
		margin: 10px;
		padding: 10px;
		border: 1px solid #ccc;
		border-radius: 5px;
		border-bottom: 1px solid #eee;
	}
</style>
