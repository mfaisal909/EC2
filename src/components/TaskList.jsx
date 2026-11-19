import TaskItem from "./TaskItem";

function TaskList({ tasks, onEdit, onDelete, onToggle }) {
  if (tasks.length === 0) {
    return <p className="empty">No tasks yet. Add one above.</p>;
  }
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </ul>
  );
}

export default TaskList;
