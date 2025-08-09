import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
	name: 'anecdotes',
	initialState: [],
	reducers: {
		updateAnecdote(state, action) {
			const updatedAnecdote = action.payload
			return state.map((a) => (a.id !== updatedAnecdote.id ? a : updatedAnecdote));
		},
		appendAnecdote(state, action) {
			state.push(action.payload)
		},
		setAnecdotes(state, action) {
			return action.payload
		}
	}
})

export const { appendAnecdote, updateAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initialiseAnecdotes = () => {
	return async (dispatch) => {
		const anecdotes = await anecdoteService.getAll();
		dispatch(setAnecdotes(anecdotes));
	};
};

export const createAnecdote = content => {
	return async dispatch => {
		const newAnecdote = await anecdoteService.createNew(content)
		dispatch(appendAnecdote(newAnecdote))
	}
}

export const voteAnecdote = (anecdoteToUpdate) => {
	return async (dispatch) => {
		const newAnecdote = await anecdoteService.update(
			anecdoteToUpdate.id,
			anecdoteToUpdate
		);
		dispatch(updateAnecdote(newAnecdote));
	};
};

export default anecdoteSlice.reducer;
