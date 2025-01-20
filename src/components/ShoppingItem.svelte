<script lang="ts">
	export let item;
	export let onToggleBought: (id: string, bought: boolean) => void;
	export let onDelete: (id: string) => void;
</script>

<div class="shopping-item">
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
	<button class="delete-btn" on:click={() => onDelete(item.id)}>✖</button>
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
	.delete-btn {
		background: none;
		color: #f44336;
		border: none;
		cursor: pointer;
		font-size: 1.2rem;
	}
</style>
