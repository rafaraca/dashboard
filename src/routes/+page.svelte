<svelte:head><title>Dashboard: {tasksDone} / {counter}</title></svelte:head>

<Navbar>To-do-list: {tasksDone}/{counter}</Navbar>

<List />

<!-- <a href="/about">About my site</a> -->

<script>
    import '../../node_modules/bulma/css/bulma.min.css';
    import Navbar from '../components/Navbar.svelte';
    import List from '../components/List.svelte';
    import {tasks} from '../store/stores' ;

    $: counter = $tasks.length;
    $: tasksDone = $tasks.filter(task => task.done).length;

</script>