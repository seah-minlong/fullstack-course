require('dotenv').config()
const express = require("express");
const morgan = require("morgan");
const Person = require("./models/person");

const app = express();

morgan.token('content', function (req) {
	return JSON.stringify(req.body);
});

const requestLogger = morgan(
	":method :url :status :res[content-length] - :response-time ms :content"
);

app.use(express.static("dist"));
app.use(express.json());
app.use(requestLogger);

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

app.get("/api/persons/:id", (request, response, next) => {
	Person.findById(request.params.id)
		.then(person => {
			if (person) {
				response.json(person)
			} else {
				response.status(404).end()
			}
		})
		.catch(error => next(error))
});

app.delete("/api/persons/:id", (request, response, next) => {
	Person.findByIdAndDelete(request.params.id)
		.then(result => {
			response.status(204).end()
		})
		.catch(error => next(error))
});

app.put("/api/persons/:id", (request, response, next) => {
	const { name, number } = request.body;

	Person.findById(request.params.id)
		.then((person) => {
			if (!person) {
				return response.status(404).end();
			}

			person.name = name;
			person.number = number;

			return person.save().then((updatedPerson) => {
				response.json(updatedPerson);
			});
		})
		.catch((error) => next(error));
});

// create new person
app.post("/api/persons", (request, response, next) => {
	const body = request.body;

	const person = new Person({
		name: body.name,
		number: body.number
	});

	person.save()
		.then(savedPerson => {
			response.json(savedPerson);
		})
		.catch(error => next(error))
});

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: "unknown endpoint" });
};

// handler of requests with unknown endpoint
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
	console.error(error.message);

	if (error.name === "CastError") {
		return response.status(400).send({ error: "malformatted id" });
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	}

	next(error);
};

app.use(errorHandler)

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});