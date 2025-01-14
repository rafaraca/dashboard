<script lang="ts">
	import { tasks } from '../store/stores';
	import ListAPI from '../store/ListAPI';
	import { onMount } from 'svelte';
	import type TaskEntity from '../models/entity/TaskEntity';
	import { blur, slide, fly, scale } from 'svelte/transition';
    import { expoOut } from 'svelte/easing';

	onMount(async () => {
		$tasks = (await ListAPI.getTasks()) as TaskEntity[];
		console.log('✌️$tasks --->', $tasks);
	});

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
</script>

<div class="container mt-5">
	<div class="columns is-multiline">
		{#each $tasks as task}
			<div class="column is-one-third">
				<div class="card" in:fly={{y: -150, x: 0, duration: 1000}} out:slide="{{delay: 250, duration: 500, easing: expoOut}}" >
					<header class="card-header">
						<button
							class="delete is-small"
							on:click={() => deleteTask(task.id)}
							aria-label="Delete task"
						></button>
						<p class="card-header-title is-centered level">
							{task.name}
							<input type="checkbox" on:blur={() => edit(task.id)} bind:checked={task.done} />
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
