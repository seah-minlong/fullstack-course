const express = require("express");
const morgan = require("morgan");
const app = express();

morgan.token('content', function (req) {
	return JSON.stringify(req.body);
});

app.use(express.json());
app.use(
	morgan(":method :url :status :res[content-length] - :response-time ms :content")
);
app.use(express.static("dist"));

let persons = [
	{
		id: "1",
		name: "Arto Hellas",
		number: "040-123456",
	},
	{
		id: "2",
		name: "Ada Lovelace",
		number: "39-44-5323523",
	},
	{
		id: "3",
		name: "Dan Abramov",
		number: "12-43-234345",
	},
	{
		id: "4",
		name: "Mary Poppendieck",
		number: "39-23-6423122",
	},
];

app.get("/api/persons", (request, response) => {
	response.json(persons);
});

app.get("/info", (request, response) => {
	const entries = persons.length;
	const date = new Date().toString();

	response.send(`
		<div>Phonebook has info for ${entries} people </div>
		<div> ${date} </div>
	`)
});

app.get("/api/persons/:id", (request, response) => {
	const id = request.params.id;
	const person = persons.find((person) => person.id === id);

	console.log(person);
	if (!person) {
		response.status(404).end();
	}
		
	response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
	const id = request.params.id;
	const person = persons.find((person) => person.id === id);
	persons = persons.filter((person) => person.id !== id);

	console.log(person);
	if (!person) {
		response.status(404).end();
	}

	response.json(person);
});

const generateId = () => {
	return String(Math.floor(Math.random() * 1000000000000000));
};

app.post("/api/persons", (request, response) => {
	const body = request.body;

	if (!body.name || !body.number) {
		return response.status(400).json({
			error: "name or number missing",
		});
	} else if (persons.some(p => p.name === body.name)) {
		return response.status(400).json({
			error: "name must be unique",
		})
	}

	const person = {
		id: generateId(),
		name: body.name,
		number: body.number
	};

	persons = persons.concat(person);

	response.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});