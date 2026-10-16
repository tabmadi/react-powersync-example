# React PowerSync Example

The smallest React app that uses [PowerSync](https://www.powersync.com) as a local-first database. It creates a SQLite database in the browser, writes rows to it, and shows them in a live query.

## What it shows

PowerSync runs SQLite in the browser with WebAssembly. The app reads and writes the local database, so every query works offline and returns at once. A sync service, when one is connected, moves the changes to and from a backend in the background.

This example shows the local half:

1. A `Schema` declares one table, `nodes`, with a `title` column. PowerSync adds the `id` column.
2. `PowerSyncDatabase` opens `example.db` in the browser.
3. `PowerSyncContext.Provider` gives the database to the components.
4. `usePowerSync().execute` writes a row. `useQuery` re-runs its query when the table changes, so the list updates with no extra code.

The data stays after a reload, because the database file lives in the browser storage.

## Run it

1. Install [mise](https://mise.jdx.dev/getting-started.html).
2. Install the tools and dependencies, then start the dev server:

   ```bash
   git clone git@github.com:tabmadi/react-powersync-example.git
   cd react-powersync-example
   mise install
   mise run setup
   mise run dev
   ```

3. Open `http://localhost:5173`, click **Add node** a few times, then reload the page. The rows are still there.

## How it works

| File | Holds |
| --- | --- |
| [`src/main.jsx`](src/main.jsx) | The schema, the database, and the two components |
| [`vite.config.js`](vite.config.js) | The Vite settings that PowerSync needs |
| [`pnpm-workspace.yaml`](pnpm-workspace.yaml) | The dependency build scripts that pnpm may run |

PowerSync runs SQLite in a web worker. So `vite.config.js` keeps the PowerSync and wa-sqlite packages out of the dependency pre-bundling, builds the workers as ES modules, and targets `esnext`. Without these settings, the dev server fails to load the database.

## What is deliberately missing

- **Sync**: no backend connector and no PowerSync service. A real app calls `db.connect(connector)` with a connector that fetches credentials and uploads local changes.
- **Updates and deletes**: the app only inserts.
- **Tests.**

## Tasks

| Task | Does |
| --- | --- |
| `mise run setup` | Installs the locked dependencies and the git hooks |
| `mise run dev` | Starts the Vite dev server |
| `mise run build` | Builds the app into `dist/` |
| `mise run lint` | Runs `lint:js`, `lint:md`, and `lint:secrets` |
| `mise run format` | Applies every formatter |
| `mise run check` | Runs `lint` and `test`. Run it before you finish a change |
| `mise run ci` | Runs exactly what CI runs. The `pre-push` hook runs it too |

## License

Apache License 2.0. See [LICENSE](LICENSE).
