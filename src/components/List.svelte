<script lang="ts">
	import { todos, loadTodos, removeTodo, updateTodo } from '../store/todoStore';
	import { slide, fly } from 'svelte/transition';
	import { expoOut } from 'svelte/easing';
	import type TaskEntity from '../models/entity/TaskEntity';
	import { onMount } from 'svelte';

	onMount(async () => {
		await loadTodos();
	});

	async function handleUpdate(task: TaskEntity, event: Event) {
		const updatedTask = { ...task, done: (event.target as HTMLInputElement).checked };
		await updateTodo(task.id, updatedTask);
	}

	async function deleteTask(id: string) {
		const confirmMsg = confirm('Are you sure?');
		if (confirmMsg) {
			await removeTodo(id);
		}
	}
</script>

<div class="container mt-5">
	<div class="columns is-multiline">
		{#each $todos as task}
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
								on:blur={() => updateTodo(task.id, task)}
								on:keydown={(e) => e.key === 'Enter' && updateTodo(task.id, task)}
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

<style>
	.card:focus-within {
		background-color: #ffecba;
		transition: background-color 1s;
	}
</style>
