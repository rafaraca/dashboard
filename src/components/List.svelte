<script lang="ts">
	import { tasks } from '../store/stores';
	import ListAPI from '../store/ListAPI';
	import { blur, slide, fly, scale } from 'svelte/transition';
	import { expoOut } from 'svelte/easing';
	import type TaskEntity from '../models/entity/TaskEntity';

	//export let task: TaskEntity;

	const edit = (id: string) => {
		ListAPI.addTask($tasks);
	};

	const deleteTask = (id: string) => {
		const confirmMsg = confirm('Are you sure?');
		if (confirmMsg) {
			$tasks = $tasks.filter((task) => task.id !== id);
			ListAPI.addTask($tasks);
		}
	};

	function handleUpdate(task: TaskEntity, event: Event) {
		const updatedTask = { ...task, done: (event.target as HTMLInputElement).checked };
		const taskIndex = $tasks.findIndex(t => t.id === updatedTask.id);
		if (taskIndex !== -1) {
			$tasks[taskIndex] = updatedTask;
			ListAPI.addTask($tasks);
		}
	}
</script>

<style>
	.card:focus-within{
		background-color: #ffecba;
		transition: background-color 1s;
	}
</style>

<div class="container mt-5">
	<div class="columns is-multiline">
		{#each $tasks as task}
			<div class="column is-one-third">
				<div
					class="card"
					in:fly={{ y: -150, x: 0, duration: 1000, delay: 500 }}
					out:slide={{ delay: 250, duration: 500, easing: expoOut }}
				>
					<header class="card-header">
						<button
							class="delete is-small"
							on:click={() => deleteTask(task.id)}
							aria-label="Delete task"
						></button>
						<p class="card-header-title is-centered level">
							{task.name}
							<input
								type="checkbox"
								bind:checked={task.done}
								on:change={(event) => handleUpdate(task, event)}
							/>
						</p>
					</header>
					<div class="card-content">
						<div class="content">
							<textarea
								class="textarea"
								rows="3"
								on:blur={() => edit(task.id)}
								on:keydown={(e) => e.key === 'Enter' && edit(task.id)}
								bind:value={task.description}
							></textarea>
						</div>
					</div>
				</div>
			</div>
		{:else}
			<h1 class="title is-4 mt-4">Any task yet... (keep thinking)</h1>
		{/each}
	</div>
</div>
