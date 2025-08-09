import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'

import NotificationContext from './components/NotificationContext'

import { useReducer } from 'react'

const notificationReducer = (state, action) => {
	switch (action.type) {
		case "SET":
			return action.payload
		default:
			return ''
	}
}

const App = () => {
	const queryClient = useQueryClient()

	const updateAnecdoteMutation = useMutation({
		mutationFn: updateAnecdote,
		onSuccess: (updatedAnecdote) => {
			const anecdotes = queryClient.getQueryData(['anecdotes'])
			queryClient.setQueryData(['anecdotes'], 
				anecdotes.map(a => a.id === updatedAnecdote.id ? updatedAnecdote : a))
		}
	})

	const [notification, notificationDispatch] = useReducer(notificationReducer, '')

	const handleVote = (anecdote) => {
		updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1})
		notificationDispatch({ type: 'SET', payload: `voted ${anecdote.content}`})

		setTimeout(() => {
			notificationDispatch({ type: 'CLEAR' })  // ✅ Correct - function and complete action
		}, 5000)
	}

	const result = useQuery({
		queryKey: ['anecdotes'],
		queryFn: getAnecdotes,
		retry: false,
		refetchOnWindowFocus: false
	})

	if (result.isLoading) {
		return <div>loading data...</div>
	}

	const anecdotes = result.data

	if (!anecdotes) {
		return <div>anecdote service not available due to problems in server</div>
	}

	return (
		<NotificationContext.Provider value={[notification, notificationDispatch]}>
			<h3>Anecdote app</h3>

			<Notification />
			<AnecdoteForm />

			{anecdotes.map(anecdote =>
				<div key={anecdote.id}>
					<div>
						{anecdote.content}
					</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => handleVote(anecdote)}>vote</button>
					</div>
				</div>
			)}
		</NotificationContext.Provider>
	)
}

export default App
