<script lang="ts">
  import Page from "./components/Page.svelte";
  let topNav: HTMLElement;
  let page: string = "home";
  const onMenuToggle = () => topNav.classList.toggle("is-open");
  const onNavClick = (nav: string) => () => {
    onMenuToggle();
    page = nav;
  };
</script>

<header>
  <button on:click={onMenuToggle} id="menu-button"><svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 0 24 24"
      width="24"><path d="M0 0h24v24H0z" fill="none" />
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" /></svg></button>
  <h1>Svelte Minimal</h1>
  <nav bind:this={topNav} id="top-nav">
    <button on:click={onMenuToggle} id="nav_close-button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24">
        <path d="M0 0h24v24H0z" fill="none" />
        <path
          d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
      </svg>
    </button>
    <ul>
      <li><button on:click={onNavClick('home')}>Home</button></li>
      <li><button on:click={onNavClick('options')}>Options</button></li>
      <li><button on:click={onNavClick('about')}>About</button></li>
    </ul>
  </nav>
</header>

<main>
  {#if page === 'home'}
    <Page>Home</Page>
  {/if}
  {#if page === 'options'}
    <Page>Options</Page>
  {/if}
  {#if page === 'about'}
    <Page>About</Page>
  {/if}
</main>
<footer>
  <p>Allow whimsy</p>
</footer>
