<script lang="ts">
    import MonthAccordion from '../../components/FinHealthy.svelte';
  
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  </script>
  
  <div class="container">
    <div class="notification is-primary has-text-centered">
      FinHealthy (Finances for your Health)
    </div>
  
    {#each months as month, index}
      <MonthAccordion {month} monthIndex={index} />
    {/each}
  </div>
  