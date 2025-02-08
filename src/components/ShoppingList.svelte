<script lang="ts">
	import { shoppingList, loadShoppingList, addShoppingItem, toggleBought, deleteShoppingItem } from '../store/shoppingStore';
	import { onMount } from 'svelte';
	import { blur } from 'svelte/transition';
    import ShoppingItem from './ShoppingItem.svelte';

	let newItem = '';
	let searchQuery = '';

	onMount(async () => {
		await loadShoppingList();
	});

	const handleAddItem = async () => {
		if (newItem.trim() !== '') {
			await addShoppingItem({ name: newItem, bought: false });
			newItem = '';
		}
	};

	const clearSearch = () => {
		searchQuery = '';
	};

	$: filteredItems = $shoppingList.filter(item =>
		item.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	$: unResolvedItems = filteredItems.filter(item => !item.bought)
	$: resolvedItems = filteredItems.filter(item => item.bought)

</script>

<div class="container" in:blur={{ amount: 5, delay: 400 }}>
	<h1 class="title">Shopping List</h1>
	<div class="input-container">
		<input
			type="text"
			bind:value={newItem}
			placeholder="Add a new item"
			class="input"
			on:keypress={(e) => e.key === 'Enter' && handleAddItem()}
		/>
		<button class="add-btn" on:click={handleAddItem}>Add</button>
	</div>

	<div class="input-container">
		<input
			type="text"
			bind:value={searchQuery}
			placeholder="Search items"
			class="input mr-2"
		/>
		<button class="button is-light" on:click={clearSearch}>Clear</button>
	</div>
	<div class="control">
	</div>

	<!-- Unresolved Items -->
	<div class="shopping-list">
		<h2>Items to Buy</h2>
		{#if unResolvedItems.length > 0}
			{#each unResolvedItems as item (item.id)}
				<ShoppingItem
					{item}
					onToggleBought={toggleBought}
					onDelete={deleteShoppingItem}
				/>
			{/each}
		{:else}
			<p>No items left to buy!</p>
		{/if}
	</div>

	<!-- Resolved Items -->
	<div class="shopping-list resolved-list">
		<h2>Resolved</h2>
		{#if resolvedItems.length > 0}
			{#each resolvedItems as item (item.id)}
				<ShoppingItem
					{item}
					onToggleBought={toggleBought}
					onDelete={deleteShoppingItem}
				/>
			{/each}
		{:else}
			<p>No resolved items yet!</p>
		{/if}
	</div>
</div>

<style>
	.container {
		margin: 20px;
	}
	.title {
		font-size: 2rem;
		margin-bottom: 20px;
	}
	.input-container {
		display: flex;
		align-items: center;
		margin-bottom: 20px;
	}
	.input {
		flex: 1;
		padding: 10px;
		border: 1px solid #ccc;
		border-radius: 5px;
	}
	.add-btn {
		margin-left: 10px;
		padding: 10px 20px;
		background: #4caf50;
		color: white;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		transition: background 0.3s ease;
	}
	.add-btn:hover {
		background: #45a049;
	}
	.shopping-list {
		margin-top: 20px;
	}
	.resolved-list {
		margin-top: 40px;
		border-top: 1px solid #ccc;
		padding-top: 20px;
	}
</style>
