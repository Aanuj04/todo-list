/*
  TODO:

  1. Understand how Node.js works. The anatomy of a node project,
  including npm (adding, removing, updating packages, local vs global packages),
  the package.json file, project scripts, dependencies and devDependencies.
  2. Understand the difference between synchronous and asynchronous programming.
  3. Understand promises in JS and difference between callbacks (.then) & async/await.
  4. Understand how fetch API works.
  5. Learn to handle errors & validate input that the client sends on server.
  6. Use apt error messages, http status codes to represent an endpoint's response.
  7. Learn to read and write files on the file system using node fs api.
  8. Learn how to use curl to quickly test api endpoints.
 */

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
