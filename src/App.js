import { useSelector, useDispatch } from "react-redux";
import { voteFor, createAnecdote } from "./reducers/anecdoteReducer";

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const vote = (id) => {
    console.log("VOTE", id);
    dispatch(voteFor(id));
  };

  const create = (event) => {
    console.log("CREATE");
    event.preventDefault();
    const content = event.target.newAnecdote.value;
    event.target.newAnecdote.value = "";
    dispatch(createAnecdote(content));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={create}>
        <div>
          <input name="newAnecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default App;
