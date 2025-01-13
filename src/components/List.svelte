<script>
	import { tasks } from '../store/stores';
    import ListAPI from '../store/ListAPI';
	import { onMount } from 'svelte';

    onMount(async () => {
        $tasks =  await ListAPI.getTasks();
        console.log('✌️$tasks --->', $tasks);
    });
</script>

<div class="container mt-5">
	<div class="columns is-multiline">
		{#each $tasks as task}
			<div class="column is-one-third">
				<div class="card">
					<header class="card-header">
                        <p class="card-header-title is-centered">
                            {task.name}
                        </p>
					</header>
					<div class="card-content">
						<div class="content">
							{task.description}
						</div>
					</div>
				</div>
			</div>
            {:else}
                <h1 class="title is-4 mt-4">
                    Any task yet... (keep thinking)
                </h1>
		{/each}
	</div>
</div>
