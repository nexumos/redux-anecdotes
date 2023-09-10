import { createSlice } from "@reduxjs/toolkit";

const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

// export const voteFor = (id) => {
//   return {
//     type: "VOTE",
//     payload: { id },
//   };
// };

// export const createAnecdote = (anecdote) => {
//   return {
//     type: "CREATE",
//     payload: {
//       content: anecdote,
//       id: getId(),
//       votes: 0,
//     },
//   };
// };

const initialState = anecdotesAtStart
  .map(asObject)
  .toSorted((a, b) => b.votes - a.votes);

// const anecdoteReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "VOTE":
//       const anecdoteToVoteFor = state.find((n) => n.id === action.payload.id);
//       const changedAnecdote = {
//         ...anecdoteToVoteFor,
//         votes: anecdoteToVoteFor.votes + 1,
//       };
//       return state
//         .map((n) => (n.id !== action.payload.id ? n : changedAnecdote))
//         .toSorted((a, b) => b.votes - a.votes);
//     case "CREATE":
//       return state.concat(action.payload).toSorted((a, b) => b.votes - a.votes);
//     default:
//       return state.toSorted((a, b) => b.votes - a.votes);
//   }
// };

//export default anecdoteReducer;

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    createAnecdote(state, action) {
      const content = action.payload;
      state
        .push({
          content,
          votes: 0,
          id: getId(),
        })
        .sort((a, b) => b.votes - a.votes);
    },
    voteFor(state, action) {
      const id = action.payload;
      const anecdoteToChange = state.find((n) => n.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };
      return state
        .map((note) => (note.id !== id ? note : changedAnecdote))
        .sort((a, b) => b.votes - a.votes);
    },
  },
});

export const { createAnecdote, voteFor } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
