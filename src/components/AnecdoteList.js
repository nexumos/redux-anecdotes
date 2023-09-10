import { useSelector, useDispatch } from "react-redux";
import { voteFor } from "../reducers/anecdoteReducer";
import {
  notificationChange,
  notificationClear,
} from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const unfilteredAnecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);
  const anecdotes = unfilteredAnecdotes.filter((n) =>
    n.content.includes(filter)
  );
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voteFor(id));
    dispatch(notificationChange("You voted!"));
    setTimeout(() => {
      dispatch(notificationClear());
    }, "5000");
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
