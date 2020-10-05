<script lang="ts">
  export let id:string
</script>

<section id={id} name={id} class="page {id}">
  <h1>
    <slot>Unnamed page</slot>
  </h1>
</section>
