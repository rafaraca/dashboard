<script lang="ts">
	import type TaskEntity from '../models/entity/TaskEntity';
	import { todos } from '../store/todoStore';
	import { doc, updateDoc } from 'firebase/firestore';
	import { db } from '../lib/firebase'; 

	export let task: TaskEntity;

	async function handleUpdate(task: TaskEntity, event: Event) {
		const updatedTask = { ...task, done: (event.target as HTMLInputElement).checked };

		try {
			await updateDoc(doc(db, 'todos', task.id), { done: updatedTask.done });

			todos.update((currentTasks) => {
				const index = currentTasks.findIndex((t) => t.id === updatedTask.id);
				if (index !== -1) {
					currentTasks[index] = updatedTask;
				}
				return currentTasks;
			});
		} catch (error) {
			console.error('Erro ao atualizar tarefa:', error);
		}
	}
</script>

<style>
	.task {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
	}
	.task.done {
		background: lightgreen;
		text-decoration: line-through;
		transition: background-color 2s;
	}
	.text-input {
		flex-grow: 1;
		font-size: 1em;
		margin: 0;
	}
	.checkbox-done {
		margin-left: 1rem;
	}
</style>

<div class="task" class:done={task.done}>
	<h1 class="text-input">{task.name}: {task.description}</h1>
	<input
		type="checkbox"
		class="checkbox-done"
		bind:checked={task.done}
		on:change={(event) => handleUpdate(task, event)}
	/>
</div>
