<script>
	export let entry;
</script>

<div class="diary-entry">
	<p>{entry.feeling}</p>
	<span class="timestamp">{new Date(entry.timestamp).toLocaleString()}</span>
</div>

<style>
	.diary-entry {
		margin-bottom: 15px;
		padding: 10px;
		border: 1px solid #ccc;
		border-radius: 5px;
	}
	.timestamp {
		display: block;
		font-size: 0.8rem;
		color: gray;
		margin-top: 5px;
	}
</style>
