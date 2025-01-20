<script>
    export let isOpen = false;
    export let onConfirm;
    export let onCancel;
    export let message = "Are you sure?";
  </script>
  
  <div class={`modal ${isOpen ? 'is-active' : ''}`}>
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Confirmation</p>
        <button class="delete" aria-label="close" on:click={onCancel}></button>
      </header>
      <section class="modal-card-body">
        <p>{message}</p>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-danger" on:click={onConfirm}>Confirm</button>
        <button class="button" on:click={onCancel}>Cancel</button>
      </footer>
    </div>
  </div>
  
  <style>
    .modal-card {
      max-width: 400px;
    }
  </style>
  