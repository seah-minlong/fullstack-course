const mongoose = require("mongoose")

const personSchema = new mongoose.Schema({
	name: {
		type: String,
		minLength: 3,
		required: true
	},
	number: String,
})

// Mongoose convenion will name person to people in collection
const Person = mongoose.model("person", personSchema)

const addPerson = (pName, pNumber) => {
	const person = new Person({
		name: pName,
		number: pNumber,
	})

	person.save().then((result) => {
		console.log(`added ${result.name} number ${result.number} to phonebook`)
		mongoose.connection.close()
	})
}

const getPeople = () => {
	Person.find({}).then((result) => {
		console.log("phonebook:")
		result.forEach((p) => {
			console.log(`${p.name} ${p.number}`)
		})
		mongoose.connection.close()
	})
}

if (process.argv.length < 3) {
	console.log("give password as argument")
	process.exit(1)
} else if (process.argv.length === 3) {
	getPeople()
} else if (process.argv.length === 5) {
	const name = process.argv[3]
	const number = process.argv[4]

	addPerson(name, number)
} else {
	console.log("wrong params")
	process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://seahminlong:${password}@cluster0.ivjngog.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set("strictQuery", false)

mongoose.connect(url)


