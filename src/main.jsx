import { PowerSyncContext, usePowerSync, useQuery } from "@powersync/react";
import { column, PowerSyncDatabase, Schema, Table } from "@powersync/web";
import { createRoot } from "react-dom/client";

const schema = new Schema({
	nodes: new Table({
		title: column.text,
	}),
});

// One database for the page. It lives in the browser, in OPFS or IndexedDB.
const db = new PowerSyncDatabase({
	schema,
	database: { dbFilename: "example.db" },
});

function AddNode() {
	const powerSync = usePowerSync();
	const onClick = async () => {
		const id = crypto.randomUUID();
		await powerSync.execute("INSERT INTO nodes (id, title) VALUES (?, ?)", [
			id,
			`Node ${id}`,
		]);
	};
	return (
		<button type="button" onClick={onClick}>
			Add node
		</button>
	);
}

function ListNodes() {
	const { data: nodes } = useQuery("SELECT * FROM nodes");
	return (
		<ul>
			{nodes.map((node) => (
				<li key={node.id}>{node.title}</li>
			))}
		</ul>
	);
}

function App() {
	return (
		<PowerSyncContext.Provider value={db}>
			<AddNode />
			<ListNodes />
		</PowerSyncContext.Provider>
	);
}

createRoot(document.getElementById("root")).render(<App />);
