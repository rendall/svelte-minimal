# Svelte Minimal

[![Dependencies Status](https://david-dm.org/rendall/svelte-minimal.svg)](https://david-dm.org/rendall/svelte-minimal)
[![Netlify Status](https://api.netlify.com/api/v1/badges/8e5757d5-9c4b-4b7b-8a71-2751518c8dbc/deploy-status)](https://app.netlify.com/sites/svelte-minimal/deploys)

Minimalist boilerplate designed to be a barebones frontend start to almost any web application, but especially a Single Page Application (SPA) and Progressive Web App (PWA)

If you're building an application in *Svelte 3* but *Sapper* is not suited for your needs, this may save you a few hours to days of development time.  See how it looks and behaves at <https://svelte-minimal.netlify.app/>

## Features

* SPA: Runs as a Single Page App
* PWA: Incorporates service-worker and web manifest
* Mobile and Desktop ready
* Automated build: `npm run build` compiles and moves everything to `/public`
* Painless development: `npm run frontend` opens a local server with hot module replacement (HMR)
* Not opinionated: so barebones that you can easily modify, add or remove almost anything without breaking it
* 100 Score in Lighthouse! (Well, not hard, tbh, given how minimalist this really is. But still! A good start)

## Usage

* Have basic knowledge of [*Svelte 3*](https://svelte.dev/) and frontend application development in general
* Put static files (e.g. images, fonts, html files) in `/static` and any of its subdirectories
* Develop in `/src` directory: `.svelte`, `.ts/.js`, `.scss/.css`
* `npm run frontend` will crank up a local server so you can see your changes immediately
* Files you want associated with the project but not tracked by git can be put in `/RAW`

## Tech stack

The tech stack uses Typescript, SASS and Webpack by default, but it's not necessary to use them. It will require a bit of work to jettison them though. This section is not a complete guide to doing that, but does have some general advice. If you manage it and want to share how, let me know

To jettison Webpack:

* You will need some other bundler, like Rollup

To jettison Typescript:

* Type `npx tsc --listEmittedFiles` into the console. The listed files (Likely only `main.js`) are the javascript versions of the Typescript files
* Inside the `.svelte` files change `<script lang="ts">` to `<script>`
* Following error messages and such, remove Typescript specific language (e.g. change `let main: HTMLElement` to `let main`)
* Modify your bundler as necessary
* Good luck! Consider using it, though, if you can

To jettison SASS:

* Type `npx sass .src/styles:.src/styles` and delete any `.scss` files
* Modify your bundler as necessary

## Installation

Make sure node is installed. Clone from the repository

`npm install`
then
`npm run frontend`

## Build

`npm run build` and now your project is in `/public`

## Credit

Some people and resources made this go much more quickly. If you contribute, you also will be listed here!

* [rixo](https://github.com/rixo/) over at [svelte-loader-hot](https://github.com/rixo/svelte-loader-hot) is kind and responsive, and his pioneering work on this made the *hot loading* part of this possible now rather than next year
* routing in *Svelte 3* is as-yet a bit immature, and [this article](https://codechips.me/svelte-routing-with-page-js-part-1/) by [codechips](https://github.com/codechips) helped speed me along the path
* [VisionMedia](https://github.com/visionmedia) created the router [pagejs](https://visionmedia.github.io/page.js/) that just worked out of the box
* Icons are from <https://material.io/resources/icons/>
