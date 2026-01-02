import { createServer } from "node:http";
import { readFile, writeFile } from "fs/promises";

const PORT = 3000;

const server = createServer((req, res) => {
	res.setHeader("Content-Type", "application/json");
	res.setHeader("Access-Control-Allow-Origin", "http://localhost:4000");

	if (req.method === "GET" && req.url === "/todos") {
		const todos = readFile("todos.json");
		res.write(JSON.stringify(todos));
		res.end();
	}

	if (req.method === "POST" && req.url === "/todos") {
		writeFile("todos.json", {
			id: Math.random(),
			todo: "new todo",
		});

		res.write(JSON.stringify({ success: true, message: "added todo" }));
		res.end();
	}

	// res.write("not found");
	// res.end();
});

server.listen(PORT, () => {
	console.log(`server listening on http://localhost:${PORT}`);
});
