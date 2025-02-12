import { useState } from "react"

const Button = ({ onClick, text }) => {
	return <button onClick={onClick}>{text}</button>
}

const indexOfMax = (arr) => {
	if (arr.length === 0) {
		return -1;
	}
	var max = arr[0];
	var maxIndex = 0;

	for (var i = 1; i < arr.length; i++) {
		if (arr[i] > max) {
			maxIndex = i;
			max = arr[i];
		}
	}
	return maxIndex;
}

const App = () => {
	const anecdotes = [
		"If it hurts, do it more often.",
		"Adding manpower to a late software project makes it later!",
		"The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
		"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
		"Premature optimization is the root of all evil.",
		"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
		"Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
		"The only way to go fast, is to go well.",
	];

	const [selected, setSelected] = useState(0)
	const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
	const [popular, setPopular] = useState(0)

	const getRandom = () => {
		const min = 0;
		const max = anecdotes.length;
		return Math.floor(min + Math.random() * (max - min))
	};

	const vote = () => {
		const copy = [...votes]
		copy[selected] += 1
		setVotes(copy)
		
		// Check for most popular
		setPopular(indexOfMax(copy))
	}
	

	return (
		<div>
			<h2>Anecdote of the day</h2>
			<div>{anecdotes[selected]}</div>
			<div>has {votes[selected]} votes</div>
			<Button onClick={vote} text="vote"/>
			<Button onClick={() => setSelected(getRandom())} text="next anecdote"/>
			<h2>Anecdote with most votes</h2>
			<div>{anecdotes[popular]}</div>
			<div>has {votes[popular]} votes</div>
		</div>
	);
};

export default App;
