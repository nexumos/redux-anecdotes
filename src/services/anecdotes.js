import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data.sort((a, b) => b.votes - a.votes);
};

const createNew = async (content) => {
  const object = { content, votes: 0 };
  const response = await axios.post(baseUrl, object);
  return response.data.sort((a, b) => b.votes - a.votes);
};

const vote = async (id) => {
  const initialResponse = await axios.get(baseUrl);
  const anecdotes = initialResponse.data;
  const anecdoteToChange = anecdotes.find((n) => n.id === id);
  const changedAnecdote = {
    ...anecdoteToChange,
    votes: anecdoteToChange.votes + 1,
  };
  await axios.put(`${baseUrl}/${id}`, changedAnecdote);
  const response = await axios.get(baseUrl);
  return response.data.sort((a, b) => b.votes - a.votes);
};

/*
      const id = action.payload;
      const anecdoteToChange = state.find((n) => n.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };
      return state
        .map((n) => (n.id !== id ? n : changedAnecdote))
        .sort((a, b) => b.votes - a.votes);
*/

export default { getAll, createNew, vote };
