<script>
	import { tasks } from '../store/stores';
	import ListAPI from '../store/ListAPI';
	import { v4 as uuidv4 } from 'uuid';

	let name = '';
	let description = '';
    let formVisible = '';

    export const showForm = () => formVisible=('is-active');

    const close = () => {
        formVisible = ''
    }

	const addTask = () => {
		if (name.trim() === '' || description.trim() === '') return;
		$tasks = [...$tasks, { id: uuidv4(), name, description, done: false }];
		ListAPI.addTask($tasks);
		name = '';
		description = '';
        formVisible = '';
	};
</script>

<div class="modal {formVisible}">
	<div class="modal-background"></div>
	<div class="modal-content">
		<div class="box">
			<form on:submit|preventDefault={addTask}>
				<div class="field">
					<div class="control">
						<input type="text" class="input" placeholder="Task name" bind:value={name} />
					</div>
				</div>
				<div class="field">
					<div class="control">
						<input class="textarea" placeholder="Task description" bind:value={description} />
					</div>
				</div>
				<div class="field is-grouped">
					<div class="control">
						<button type="submit" class="button is-primary">add</button>
					</div>
					<div class="control">
						<button on:click={close} class="button is-danger">cancel</button>
					</div>
				</div>
			</form>
		</div>
	</div>
    <button on:click={close} class="modal-close is-large" aria-label='close'></button>
</div>
