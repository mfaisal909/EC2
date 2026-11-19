import { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "./services/api";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTasks = async () => {
    try {
      setError("");
      const data = await getTasks();
      setTasks(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleAdd = async (task) => {
    const created = await createTask(task);
    setTasks((prev) => [created, ...prev]);
  };

  const handleUpdate = async (id, task) => {
    const updated = await updateTask(id, task);
    setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
    setEditing(null);
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  const handleToggle = async (task) => {
    const newStatus = task.status === "Completed" ? "Pending" : "Completed";
    const updated = await updateTask(task._id, { status: newStatus });
    setTasks((prev) => prev.map((t) => (t._id === task._id ? updated : t)));
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Task Manager</h1>
      </header>
      <main className="main">
        <TaskForm
          onSubmit={editing ? (t) => handleUpdate(editing._id, t) : handleAdd}
          initial={editing}
          onCancel={() => setEditing(null)}
        />
        {error && <p className="error">{error}</p>}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <TaskList
            tasks={tasks}
            onEdit={setEditing}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />
        )}
      </main>
    </div>
  );
}

export default App;
