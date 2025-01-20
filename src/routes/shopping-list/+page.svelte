<script>
	import { blur } from 'svelte/transition';
    import ShoppingList from '../../components/ShoppingList.svelte';
</script>

<div class="container" in:blur={{ amount: 5, delay: 400 }}>
    <ShoppingList />
</div>