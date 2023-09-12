import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdotesAtStart = [];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart
  .map(asObject)
  .toSorted((a, b) => b.votes - a.votes);

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    // voteFor(state, action) {
    //   const id = action.payload;
    //   const anecdoteToChange = state.find((n) => n.id === id);
    //   const changedAnecdote = {
    //     ...anecdoteToChange,
    //     votes: anecdoteToChange.votes + 1,
    //   };
    //   return state
    //     .map((n) => (n.id !== id ? n : changedAnecdote))
    //     .sort((a, b) => b.votes - a.votes);
    // },
    appendAnecdote(state, action) {
      return state.concat(action.payload).sort((a, b) => b.votes - a.votes);
    },
    setAnecdotes(state, action) {
      return action.payload.sort((a, b) => b.votes - a.votes);
    },
  },
});

export const { appendAnecdote, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const voteFor = (id) => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.vote(id);
    dispatch(setAnecdotes(anecdotes));
  };
};

export default anecdoteSlice.reducer;
