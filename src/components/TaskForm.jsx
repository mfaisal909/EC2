import { useEffect, useState } from "react";

function TaskForm({ onSubmit, initial, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (initial) {
      setTitle(initial.title || "");
      setDescription(initial.description || "");
    } else {
      setTitle("");
      setDescription("");
    }
  }, [initial]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await onSubmit({ title: title.trim(), description: description.trim() });
    if (!initial) {
      setTitle("");
      setDescription("");
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="form-actions">
        <button type="submit">{initial ? "Update Task" : "Add Task"}</button>
        {initial && (
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;
