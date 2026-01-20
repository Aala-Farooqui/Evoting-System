import React, { useEffect, useState } from "react";

const API = "http://localhost:8082";

export default function VotingApp() {
  const [users, setUsers] = useState([]);
  const [elections, setElections] = useState([]);
  const [choices, setChoices] = useState([]);
  const [votes, setVotes] = useState([]);

  const [userName, setUserName] = useState("");
  const [electionName, setElectionName] = useState("");
  const [choiceName, setChoiceName] = useState("");

  const [selectedUser, setSelectedUser] = useState("");
  const [selectedElection, setSelectedElection] = useState("");
  const [selectedChoice, setSelectedChoice] = useState("");

  const [totalVotes, setTotalVotes] = useState(0);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    fetchUsers();
    fetchElections();
    fetchChoices();
    fetchVotes();
    fetchTotalVotes();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch(`${API}/get/users`);
    setUsers(await res.json());
  };

  const fetchElections = async () => {
    const res = await fetch(`${API}/get/elections`);
    setElections(await res.json());
  };

  const fetchChoices = async () => {
    const res = await fetch(`${API}/get/electionChoices`);
    setChoices(await res.json());
  };

  const fetchVotes = async () => {
    const res = await fetch(`${API}/get/votes`);
    setVotes(await res.json());
  };

  const fetchTotalVotes = async () => {
    const res = await fetch(`${API}/count/votes`);
    setTotalVotes(await res.json());
  };

  const addUser = async () => {
    await fetch(`${API}/add/user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: userName })
    });
    setUserName("");
    fetchUsers();
  };

  const addElection = async () => {
    await fetch(`${API}/add/election`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: electionName })
    });
    setElectionName("");
    fetchElections();
  };

  const addChoice = async () => {
    await fetch(`${API}/add/electionChoice`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: choiceName,
        election: { name: selectedElection }
      })
    });
    setChoiceName("");
    fetchChoices();
  };

  const addVote = async () => {
    await fetch(`${API}/add/vote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: { name: selectedUser },
        election: { name: selectedElection },
        electionChoice: { name: selectedChoice }
      })
    });
    fetchVotes();
    fetchTotalVotes();
  };

  const fetchWinner = async () => {
    const res = await fetch(`${API}/winner/election`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: selectedElection })
    });
    setWinner(await res.json());
  };

  const resetAllVotes = async () => {
    await fetch(`${API}/reset-votes`, { method: "DELETE" });
    fetchVotes();
    fetchTotalVotes();
    setWinner(null);
  };

  const resetVotesForElection = async () => {
    const election = elections.find(e => e.name === selectedElection);
    if (!election) return alert("Select election first");

    await fetch(`${API}/${election.id}/reset-votes`, { method: "DELETE" });
    fetchVotes();
    fetchTotalVotes();
    setWinner(null);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🗳️ E-Voting System</h1>

      {/* Add Section */}
      <div style={styles.card}>
        <h2>Add User</h2>
        <input style={styles.input} value={userName} onChange={e => setUserName(e.target.value)} />
        <button style={styles.primaryBtn} onClick={addUser}>Add User</button>

        <h2>Add Election</h2>
        <input style={styles.input} value={electionName} onChange={e => setElectionName(e.target.value)} />
        <button style={styles.primaryBtn} onClick={addElection}>Add Election</button>
      </div>

      {/* Choices */}
      <div style={styles.card}>
        <h2>Add Election Choice</h2>
        <input style={styles.input} value={choiceName} onChange={e => setChoiceName(e.target.value)} />
        <select style={styles.select} onChange={e => setSelectedElection(e.target.value)}>
          <option value="">Select Election</option>
          {elections.map(e => <option key={e.id}>{e.name}</option>)}
        </select>
        <button style={styles.primaryBtn} onClick={addChoice}>Add Choice</button>
      </div>

      {/* Vote */}
      <div style={styles.card}>
        <h2>Cast Vote</h2>
        <select style={styles.select} onChange={e => setSelectedUser(e.target.value)}>
          <option value="">Select User</option>
          {users.map(u => <option key={u.id}>{u.name}</option>)}
        </select>

        <select style={styles.select} onChange={e => setSelectedElection(e.target.value)}>
          <option value="">Select Election</option>
          {elections.map(e => <option key={e.id}>{e.name}</option>)}
        </select>

        <select style={styles.select} onChange={e => setSelectedChoice(e.target.value)}>
          <option value="">Select Choice</option>
          {choices.filter(c => c.election.name === selectedElection)
            .map(c => <option key={c.id}>{c.name}</option>)}
        </select>

        <button style={styles.voteBtn} onClick={addVote}>🗳️ Vote</button>
      </div>

      {/* Stats */}
      <div style={styles.card}>
        <h2>Statistics</h2>
        <p>Total Votes: <b>{totalVotes}</b></p>
        <button style={styles.primaryBtn} onClick={fetchWinner}>Get Winner</button>
        {winner && <p style={styles.winner}>🏆 Winner: {winner.name}</p>}
      </div>

      {/* Admin */}
      <div style={{ ...styles.card, borderLeft: "5px solid red" }}>
        <h2>Admin Actions</h2>

        <select style={styles.select} onChange={e => setSelectedElection(e.target.value)}>
          <option value="">Select Election</option>
          {elections.map(e => <option key={e.id}>{e.name}</option>)}
        </select>

        <button style={styles.warningBtn} onClick={resetVotesForElection}>
          Reset Selected Election
        </button>

        <button style={styles.dangerBtn} onClick={resetAllVotes}>
          Reset ALL Votes
        </button>
      </div>

      {/* Votes List */}
      <div style={styles.card}>
        <h2>All Votes</h2>
        <ul>
          {votes.map(v => (
            <li key={v.id}>
              {v.user.name} → {v.electionChoice.name} ({v.election.name})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* 🎨 Styles */
const styles = {
  container: {
    maxWidth: 900,
    margin: "auto",
    padding: 20,
    fontFamily: "Segoe UI, sans-serif",
    background: "#f5f7fa"
  },
  title: {
    textAlign: "center",
    marginBottom: 30
  },
  card: {
    background: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10
  },
  select: {
    width: "100%",
    padding: 10,
    marginBottom: 10
  },
  primaryBtn: {
    padding: 10,
    background: "#1976d2",
    color: "white",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    marginBottom: 10
  },
  voteBtn: {
    padding: 12,
    background: "#2e7d32",
    color: "white",
    border: "none",
    borderRadius: 6,
    fontSize: 16,
    cursor: "pointer"
  },
  warningBtn: {
    padding: 10,
    background: "#ff9800",
    color: "white",
    border: "none",
    borderRadius: 6,
    marginBottom: 10
  },
  dangerBtn: {
    padding: 10,
    background: "#d32f2f",
    color: "white",
    border: "none",
    borderRadius: 6
  },
  winner: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "green"
  }
};
