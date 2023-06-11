# psy-svelte

Re-creating the classic Sleep and Cognition task(s) using the latest and greatest in web programming technologies.
Currently implments the Motor Sequence Task; hoping to generalize common elements to support the implementation
of a wide range of tasks.

This repo just contains the front end (what runs in the subject's browser). There has to also be a back-end to 
(at a minimum) communicate with the database to store responses. The front end can be compiled into a set of 
static files that can be hosted on Apache (i.e. nothing has to happen on the host other than to serve the files);
useful in the sadly common case that folks are stuck with old-timey consumer-grade web hosting platforms. See
https://github.com/chhotii-alex/antigen-sensitivity for details. A back-end is provided in a separate repo.

# Original svelte template README:
# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
