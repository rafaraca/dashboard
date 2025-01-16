<script lang="ts">
	import { todos } from '../store/todoStore'; 
	import { v4 as uuidv4 } from 'uuid';
	import { doc, setDoc, collection } from 'firebase/firestore';
	import { db } from '../lib/firebase'; 

	let name = '';
	let description = '';
	let formVisible = '';

	export const showForm = () => {
		formVisible = 'is-active';
	};

	const close = () => {
		formVisible = '';
		name = '';
		description = '';
	};

	const addTask = async () => {
		if (name.trim() === '' || description.trim() === '') return;

		const newTask = {
			id: uuidv4(),
			name,
			description,
			done: false,
		};

		try {
			await setDoc(doc(collection(db, 'todos'), newTask.id), newTask);
			todos.update((currentTasks) => [...currentTasks, newTask]);

			name = '';
			description = '';
			formVisible = '';
		} catch (error) {
			console.error('Erro ao adicionar tarefa:', error);
		}
	};
</script>

<style>
	.modal.is-active {
		display: block;
	}
	.modal:not(.is-active) {
		display: none;
	}
</style>

<div class="modal {formVisible}">
	<div class="modal-background"></div>
	<div class="modal-content">
		<div class="box">
			<form on:submit|preventDefault={addTask}>
				<div class="field">
					<div class="control">
						<input
							type="text"
							class="input"
							placeholder="Task name"
							bind:value={name}
						/>
					</div>
				</div>
				<div class="field">
					<div class="control">
						<textarea
							class="textarea"
							placeholder="Task description"
							bind:value={description}
						></textarea>
					</div>
				</div>
				<div class="field is-grouped">
					<div class="control">
						<button type="submit" class="button is-primary">Add</button>
					</div>
					<div class="control">
						<button type="button" on:click={close} class="button is-danger">
							Cancel
						</button>
					</div>
				</div>
			</form>
		</div>
	</div>
	<button on:click={close} class="modal-close is-large" aria-label="close"></button>
</div>