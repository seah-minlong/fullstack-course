import { useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { useSelector } from 'react-redux'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
	const dispatch = useDispatch()
	const anecdotes = useSelector(({ anecdotes, filter }) => {
		// Redux Toolkit -> initial state of anecdotes immutable
		// Need make copy before sorting anecdotes
		// Else will see TypeError
		const filteredAnecdotes = filter && filter.trim() !== ''
			? [...anecdotes].filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
			: [...anecdotes]
		
		return filteredAnecdotes.sort((a, b) => b.votes - a.votes)
	})

	const vote = async (id) => {
		const anecdoteToChange = anecdotes.find((n) => n.id === id);
		const changedAnecdote = {
			...anecdoteToChange,
			votes: anecdoteToChange.votes + 1,
		};

		dispatch(voteAnecdote(changedAnecdote))
		dispatch(setNotification(`You voted '${changedAnecdote.content}'`))

		setTimeout(() => {
			dispatch(removeNotification())
		}, 5000)
	}

	return (
		<div>
			{anecdotes.map(anecdote =>
				<div key={anecdote.id}>
					<div>
						{anecdote.content}
					</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => vote(anecdote.id)}>vote</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default AnecdoteList