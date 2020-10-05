<script lang="ts">
  import Page from "./components/Page.svelte";
  import page from "page";
  import { onMount, setContext } from "svelte";

  let topNav: HTMLElement;
  let main: HTMLElement;
  let observer: IntersectionObserver;
  let currPage: string = "home";

  const onMenuToggle = (on?) => () => {
    if (!topNav) return;
    const force = on === undefined ? !topNav.classList.contains("is-open") : on;
    topNav.classList.toggle("is-open", force);
  };

  const closeMenu = onMenuToggle(false);

  const setRoute = (pageName: string, route: string = `/${pageName}`) =>
    page(route, () => {
      currPage = pageName;
      const element: HTMLElement = document.getElementById(pageName);
      if (element) element.scrollIntoView();
      closeMenu();
    });

  /** Triggered when the page scrolls into view */
  const onPageChange = (set: IntersectionObserverEntry[]) => {
    if (set.length === 0) return;
    const e = set[0];
    if (!e.isIntersecting) return;
    const pageName = e.target.id;
    const route = pageName === "home" ? "/" : `/${pageName}`;
    const currUrl = new URL(window.location.href);

    // This means that the user scrolled the new page into view
    // not clicked, and so we need to add the page to the
    // address bar and history
    const isMismatch = currUrl.pathname !== route;
    if (isMismatch) {
      currPage = pageName
      history.pushState(null, null, route);
    }
  };

  onMount(() => {
    setRoute("home", "/");
    setRoute("about");
    setRoute("options");
    page.start();
    const options = {
      root: main,
      rootMargin: "0px",
      threshold: 1.0,
    };
    observer = new IntersectionObserver(onPageChange, options);
    const pages = Array.from(document.querySelectorAll(".page"));
    pages.forEach((p) => observer.observe(p));
  });
</script>

<header>
  <button on:click={onMenuToggle(true)} id="menu-button"><svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 0 24 24"
      width="24"><path d="M0 0h24v24H0z" fill="none" />
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" /></svg></button>
  <h1>Svelte Minimal</h1>
  <nav bind:this={topNav} id="top-nav">
    <button on:click={onMenuToggle(false)} id="nav_close-button">
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
      <li><a class:is-selected={currPage === 'home'} href="/">Home</a></li>
      <li>
        <a
          class:is-selected={currPage === 'options'}
          href="/options">Options</a>
      </li>
      <li>
        <a class:is-selected={currPage === 'about'} href="/about">About</a>
      </li>
    </ul>
  </nav>
</header>

<main bind:this={main}>
  <Page id="home">Home</Page>
  <Page id="options">Options</Page>
  <Page id="about">About</Page>
</main>
<footer>
  <p>allow whimsy</p>
</footer>
