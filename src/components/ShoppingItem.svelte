<script lang="ts">
	export let item;
	export let onToggleBought: (id: string, bought: boolean) => void;
	export let onEdit: (id: string, newName: string) => void;
	export let onDelete: (id: string) => void;

	let isEditing = false;
	let editedName = item.name;

	const handleSave = () => {
		if (editedName.trim() !== '') {
			onEdit(item.id, editedName);
			isEditing = false;
		}
	};
</script>

<div class="shopping-item">
	{#if isEditing}
		<input
			type="text"
			bind:value={editedName}
			class="edit-input"
			on:keypress={(e) => e.key === 'Enter' && handleSave()}
		/>
		<button class="save-btn" on:click={handleSave}>Save</button>
		<button
			class="cancel-btn"
			on:click={() => {
				isEditing = false;
				editedName = item.name;
			}}>Cancel</button
		>
	{:else}
		<label class="checkbox-container">
			<input
				type="checkbox"
				checked={item.bought}
				on:change={() => onToggleBought(item.id, !item.bought)}
				class="checkmark"
			/>
			<span class="checkmark"></span>
			{item.name}
		</label>
		<div class="button-group">
			<button class="edit-btn mr-4" on:click={() => (isEditing = true)} aria-label="Edit item">
				<i class="fa-regular fa-pen-to-square" aria-hidden="true"></i>
			</button>
			<button class="delete-btn" on:click={() => onDelete(item.id)} aria-label="Delete item">
				<i class="fa-regular fa-trash-can" aria-hidden="true"></i>
			</button>
		</div>
	{/if}
</div>

<style>
	.shopping-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10px;
		border-bottom: 1px solid #ccc;
	}
	.checkbox-container {
		display: flex;
		align-items: center;
		cursor: pointer;
	}
	.checkbox-container input {
		display: none;
	}
	.checkmark {
		width: 20px;
		height: 20px;
		border: 2px solid #4caf50;
		border-radius: 50%;
		display: inline-block;
		margin-right: 10px;
		background: white;
		transition: background 0.3s ease;
	}
	.checkbox-container input[type='checkbox']:checked + .checkmark {
		background: #40b9e9;
	}
	.edit-input {
		padding: 5px;
		border: 1px solid #ccc;
		border-radius: 5px;
		margin-right: 5px;
	}
	.cancel-btn {
		margin-left: 10px;
		cursor: pointer;
		background: #4caf50;
		color: white;
		border: none;
		padding: 5px 10px;
		border-radius: 5px;
	}
	.cancel-btn:hover {
		background: #45a049;
	}
	.edit-btn {
		background: none;
		border: none;
		cursor: pointer;
		font-size: 1.2rem;
	}
	.delete-btn {
		background: none;
		color: #f44336;
		border: none;
		cursor: pointer;
		font-size: 1.2rem;
	}
</style>
