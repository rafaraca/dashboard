<script>
	import { tasks } from '../store/stores';
	import ListAPI from '../store/ListAPI';
    import {v4 as uuidv4} from 'uuid';

	let name = '';
	let description = '';

	const addTask = () => {
        if(name.trim() === '' || description.trim() === '') return; 
		$tasks = [...$tasks, {id: uuidv4(), name, description, done: false}];
		ListAPI.addTask($tasks);
        name = '';
        description = '';
	};
</script>

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
			<button class="button is-danger">cancel</button>
		</div>
		
	</div>
</form>
