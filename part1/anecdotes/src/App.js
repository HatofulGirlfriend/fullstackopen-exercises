import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is the same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];
  const points = Array(anecdotes.length).fill(0)

  const [votes, setVotes] = useState(points);
  const [selected, setSelected] = useState(0);
  const [total, setTotal] = useState(0);

  
  const randomNumber = () => {
    setSelected(Math.floor(Math.random() * (anecdotes.length - 1) + 1));
  };
  
  const updateVotes = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
    const votesTotal = Math.max(...copy)
    setTotal(votesTotal)
  };

  const caculateMostVotes = () => {
    const votesTotal = Math.max(...votes)
    const indexVotes = votes.indexOf(votesTotal)
    return indexVotes
  }

  const mostVotes = caculateMostVotes()
  return (
    <>
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]} <br />
      has {votes[selected]} votes <br />
      <button onClick={updateVotes}>vote</button>
      <button onClick={randomNumber}>next anecdote</button>
      </div>
      <div>
      <h2>Anecdote with most votes</h2>
        {anecdotes[mostVotes]} <br />
        has {total} votes
      </div>
    </>
  );
};

export default App;
