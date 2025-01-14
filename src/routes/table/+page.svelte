<script lang="ts">
	import { blur } from 'svelte/transition';
	import Task from '../../components/Task.svelte';
	import { tasks } from '../../store/stores';
</script>

<div class="container" in:blur={{ amount: 5, delay: 400 }}>
	<div class="box">
		{#each $tasks as task (task.id)}
			<div class="table">
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
