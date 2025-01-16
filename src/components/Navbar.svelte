<script lang="ts">
	import Form from './Form.svelte';
	import { todos } from '../store/todoStore';

	$: counter = $todos.length;
	$: tasksDone = $todos.filter((task: { done: boolean }) => task.done).length;

	let form: Form;
</script>

<section class="hero is-primary welcome is-small">
	<div class="hero-body">
		<div class="container">
			<h1 class="title">Dashboard</h1>
			<h2 class="subtitle">
				To-do-list: {tasksDone}/{counter}
				<slot></slot>
			</h2>
		</div>
	</div>
</section>

<div class="box">
	<div class="container">
		<div class="field is-grouped">
			<button on:click={() => form.showForm()} class="button">add Task</button>
			<div class="tabs">
				<ul>
					<li><a href="/#/">Cards</a></li>
					<li><a href="/table">Table</a></li>
					<li><a href="/about">About my site</a></li>
				</ul>
			</div>
		</div>
	</div>
</div>

<Form bind:this={form} />
