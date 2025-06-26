require('dotenv').config()
const express = require("express");
const morgan = require("morgan");
const Person = require("./models/person");

const app = express();

morgan.token('content', function (req) {
	return JSON.stringify(req.body);
});

app.use(express.json());
app.use(
	morgan(":method :url :status :res[content-length] - :response-time ms :content")
);
app.use(express.static("dist"));

app.get("/api/persons", (request, response) => {
	Person.find({}).then(person => {
		response.json(person)
	})
});

// app.get("/info", (request, response) => {
// 	const entries = persons.length;
// 	const date = new Date().toString();

// 	response.send(`
// 		<div>Phonebook has info for ${entries} people </div>
// 		<div> ${date} </div>
// 	`)
// });

app.get("/api/persons/:id", (request, response) => {
	Person.findById(request.params.id).then(person => {
		response.json(person);
	})
});

// app.delete("/api/persons/:id", (request, response) => {
// 	const id = request.params.id;
// 	const person = persons.find((person) => person.id === id);
// 	persons = persons.filter((person) => person.id !== id);

// 	console.log(person);
// 	if (!person) {
// 		response.status(404).end();
// 	}

// 	response.json(person);
// });

app.post("/api/persons", (request, response) => {
	const body = request.body;

	if (!body.name || !body.number) {
		return response.status(400).json({
			error: "name or number missing",
		});
	}

	const person = new Person({
		name: body.name,
		number: body.number
	});

	person.save().then(savedPerson => {
		response.json(savedPerson);
	})
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});