<script>
	import { blur } from 'svelte/transition';
</script>

<div class="container" in:blur={{ amount: 5, delay: 400 }}>
    <div class="box">
        Table
    </div>
</div>
