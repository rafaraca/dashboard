<script>
	import Navbar from '../components/Navbar.svelte';
	import '@fortawesome/fontawesome-free/css/all.min.css'
	import 'bulma/css/bulma.min.css';
</script>

<header>
	<Navbar />
</header>

<main>
	<slot />
</main>
