function TaskItem({ task, onEdit, onDelete, onToggle }) {
  const isCompleted = task.status === "Completed";
  return (
    <li className={`task-item ${isCompleted ? "completed" : ""}`}>
      <div className="task-info">
        <h3>{task.title}</h3>
        {task.description && <p>{task.description}</p>}
        <span className={`status ${isCompleted ? "done" : "pending"}`}>
          {task.status}
        </span>
      </div>
      <div className="task-actions">
        <button onClick={() => onToggle(task)}>
          {isCompleted ? "Undo" : "Complete"}
        </button>
        <button onClick={() => onEdit(task)}>Edit</button>
        <button className="danger" onClick={() => onDelete(task._id)}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
