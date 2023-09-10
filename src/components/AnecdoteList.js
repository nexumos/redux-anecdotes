import { useSelector, useDispatch } from "react-redux";
import { voteFor } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const unfilteredAnecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);
  const anecdotes = unfilteredAnecdotes.filter((n) =>
    n.content.includes(filter)
  );
  const dispatch = useDispatch();

  const vote = (id) => {
    console.log("VOTE", id);
    dispatch(voteFor(id));
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
