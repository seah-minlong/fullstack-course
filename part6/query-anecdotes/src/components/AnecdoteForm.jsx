import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../requests";
import NotificationContext from "../context/NotificationContext";
import { useContext } from "react";

const AnecdoteForm = () => {
	const queryClient = useQueryClient();
	const [notification, dispatch] = useContext(NotificationContext);

	const handleError = (error) => {
		dispatch({
			type: "SET",
			payload: `too short anecdote, must have length 5 or more`,
		});
		setTimeout(() => {
			dispatch({ type: "CLEAR" });
		}, 5000);
	};

	const newAnecdoteMutation = useMutation({
		mutationFn: createAnecdote,
		onSuccess: (newAnecdote) => {
			const anecdotes = queryClient.getQueryData(["anecdotes"]);
			queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote));

			dispatch({ type: "SET", payload: `anecdote ${newAnecdote.content}` });
			setTimeout(() => {
				dispatch({ type: "CLEAR" });
			}, 5000);
		},
		onError: handleError,
	});

	const onCreate = (event) => {
		event.preventDefault();
		const content = event.target.anecdote.value;
		event.target.anecdote.value = "";
		newAnecdoteMutation.mutate({ content, votes: 0 });
	};

	return (
		<div>
			<h3>create new</h3>
			<form onSubmit={onCreate}>
				<input name="anecdote" />
				<button type="submit">create</button>
			</form>
		</div>
	);
};

export default AnecdoteForm;
