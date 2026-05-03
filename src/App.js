import { useEffect, useState } from "react";

const API = "http://localhost:5000/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchTasks = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!title) return;
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        completed: false,
      }),
    });
    setTitle("");
    setDescription("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    fetchTasks();
  };

  const toggleComplete = async (task) => {
    await fetch(`${API}/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        completed: !task.completed,
      }),
    });
    fetchTasks();
  };

  return (
    <div style={styles.app}>
      <h1 style={styles.title}>TRACK-ED ⚡</h1>

      <div style={styles.card}>
        <input
          style={styles.input}
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          style={styles.input}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button style={styles.button} onClick={addTask}>
          Add Task
        </button>
      </div>

      {tasks.map((task) => (
        <div key={task.id} style={styles.taskCard}>
          <h3 style={task.completed ? styles.completed : styles.text}>
            {task.title}
          </h3>
          <p style={{ color: "#aaa", fontSize: "14px" }}>{task.description}</p>
          <div>
            <button
              style={styles.button}
              onClick={() => toggleComplete(task)}
            >
              {task.completed ? "Undo" : "Complete"}
            </button>
            <button
              style={styles.delete}
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  app: {
    minHeight: "100vh",
    background: "radial-gradient(circle, #0a0f1c, #000)",
    color: "#00f7ff",
    textAlign: "center",
    padding: "30px",
    fontFamily: "Orbitron, sans-serif",
  },
  title: {
    fontSize: "3rem",
    textShadow: "0 0 20px #00f7ff",
  },
  card: {
    margin: "20px auto",
    padding: "20px",
    width: "300px",
    backdropFilter: "blur(15px)",
    background: "rgba(255,255,255,0.05)",
    borderRadius: "15px",
    boxShadow: "0 0 20px #00f7ff",
  },
  input: {
    width: "90%",
    padding: "10px",
    margin: "10px 0",
    background: "transparent",
    border: "1px solid #00f7ff",
    color: "white",
    borderRadius: "5px",
    outline: "none",
  },
  button: {
    padding: "10px",
    margin: "5px",
    borderRadius: "10px",
    background: "linear-gradient(45deg, #00f7ff, #00c3ff)",
    border: "none",
    boxShadow: "0 0 10px #00f7ff",
    cursor: "pointer",
    fontWeight: "bold",
  },
  delete: {
    padding: "10px",
    margin: "5px",
    borderRadius: "10px",
    background: "linear-gradient(45deg, #ff004c, #ff4d6d)",
    border: "none",
    boxShadow: "0 0 10px #ff004c",
    cursor: "pointer",
    fontWeight: "bold",
    color: "white",
  },
  taskCard: {
    margin: "20px auto",
    padding: "15px",
    width: "300px",
    backdropFilter: "blur(15px)",
    background: "rgba(255,255,255,0.05)",
    borderRadius: "15px",
    boxShadow: "0 0 20px rgba(0,255,255,0.2)",
  },
  completed: {
    textDecoration: "line-through",
    color: "#00ffaa",
  },
  text: {
    color: "#00f7ff",
  },
};

export default App;