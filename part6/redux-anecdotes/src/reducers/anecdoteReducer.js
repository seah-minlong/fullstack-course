import { createSlice, current } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
	name: 'anecdotes',
	initialState: [],
	reducers: {
		createAnecdote(state, action) {
			state.push(action.payload)
		},
		voteAnecdote(state, action) {
			const updatedAnecdote = action.payload
			return state.map((a) => (a.id !== updatedAnecdote.id ? a : updatedAnecdote));
		},
		setAnecdotes(state, action) {
			return action.payload
		}
	}
})

export const { createAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer;
