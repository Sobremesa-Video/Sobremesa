Link: https://bejamas.io/hub/guides/guide-to-remix-framework

Remix file structure:
- app: folder where most of the web app development will be held
- node_modules: can ignore this as its just default node modules dependencies folder
- public: folder that holds static files and assets served to browser
- .gitignore: place to specify files that should be ignored when deployed
- package-lock.json & package.json: needed for tracking versions of "dependency tree" used in the web app
==Dependency tree: hierarchical structure of all packages that Remix needs to function correctly==

"app" file structure:
- routes: define various routes for pages in our app
- styles: consists of all the styles used (mainly css)
- entry.client.jsx: "entry point" to the client. through this file the static html is rendered. then it is hydrated (js, react loads, making it interactive)
- entry.server.jsx: "entry point" to the server. deals with how the app is rendered on the server, before being sent to the client. handles server-side rendering (SSR), generating static html that is sent to the browser.
- root: defines structure, layout, and logic of entire app. 
	- controls global layout: header, footer, nav for consistency
	- handles "global data fetching", meta tags, global styles, and error boundaries
