import { useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { useSelector } from 'react-redux'

const AnecdoteList = () => {
	const dispatch = useDispatch()
	const anecdotes = useSelector(({ anecdotes, filter }) => {
		const filteredAnecdotes = filter && filter.trim() !== ''
			? anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
			: anecdotes
		
		return filteredAnecdotes.sort((a, b) => b.votes - a.votes)
	})

	const vote = (id) => {
		dispatch(voteAnecdote(id))
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