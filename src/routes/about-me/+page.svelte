<script lang="ts">
	import { onMount } from 'svelte';
	import { diaryEntries, loadDiaryEntries, addDiaryEntry } from '../../store/diaryStore';
	import DiaryEntry from '../../components/DiaryEntry.svelte';

	let newEntry = '';
	const characterLimit = 250;

	onMount(async () => {
		await loadDiaryEntries();
	});

	const handleAddEntry = async () => {
		if (newEntry.trim() !== '') {
			const timestamp = new Date().toISOString();
			await addDiaryEntry(newEntry, timestamp);
			newEntry = '';
		}
	};
</script>

<div class="container">
	<div class="diary-container">
		<h1>My Diary</h1>

		<div class="new-entry">
			<textarea
				bind:value={newEntry}
				placeholder="Write your thoughts here (max 250 characters)..."
				maxlength={characterLimit}
				class="text-area is-size-4"
			></textarea>
			<p>{newEntry.length}/{characterLimit}</p>

			<button class="add-btn" on:click={handleAddEntry} disabled={newEntry.trim() === ''}>
				Add Entry
			</button>
		</div>

		<div class="entry-list">
			{#each $diaryEntries as entry (entry.id)}
				<DiaryEntry {entry} />
			{:else}
				<p>No entries yet!</p>
			{/each}
		</div>
	</div>
</div>

<style>
	.diary-container {
		margin: 20px;
	}
	h1 {
		font-size: 2rem;
		margin-bottom: 20px;
	}
	.new-entry {
		margin-bottom: 20px;
	}
	.text-area {
		width: 100%;
		height: 80px;
		padding: 10px;
		border: 1px solid #ccc;
		border-radius: 5px;
		font-family: inherit;
	}
	.add-btn {
		margin-top: 10px;
		padding: 10px 20px;
		background: #4caf50;
		color: white;
		border: none;
		border-radius: 5px;
		cursor: pointer;
	}
	.add-btn:disabled {
		background: #ccc;
		cursor: not-allowed;
	}
	.entry-list {
		margin-top: 20px;
	}
</style>
