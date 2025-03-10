import { useState, useEffect } from "react";
import "./App.css";

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, { text: task, completed: false }]);
    setTask("");
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleComplete = (index) => {
    setTasks(
      tasks.map((t, i) => (i === index ? { ...t, completed: !t.completed } : t))
    );
  };

  const startEditing = (index) => {
    setEditIndex(index);
    setEditText(tasks[index].text);
  };

  const saveEdit = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = editText;
    setTasks(updatedTasks);
    setEditIndex(null);
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "completed") return t.completed;
    if (filter === "pending") return !t.completed;
    return true;
  });

  return (
    <div className={`app-container ${darkMode ? "dark-mode" : ""}`}>
      <h2 className="title">To-Do List</h2>
      <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>
      <div className="spacer"></div>
      <div className="task-input">
        <input
          type="text"
          placeholder="Add a new task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button className="add-btn" onClick={addTask}>Add</button>
      </div>
      <div className="filter-buttons">
        <button className={`filter-btn ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>All</button>
        <button className={`filter-btn ${filter === "completed" ? "active" : ""}`} onClick={() => setFilter("completed")}>Completed</button>
        <button className={`filter-btn ${filter === "pending" ? "active" : ""}`} onClick={() => setFilter("pending")}>Pending</button>
      </div>
      <ul className="task-list">
        {filteredTasks.map((t, index) => (
          <li key={index} className={`task-item ${t.completed ? "task-completed" : ""}`}>
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => toggleComplete(index)}
              className="task-checkbox"
            />
            {editIndex === index ? (
              <div className="edit-container">
                <input
                  type="text"
                  className="edit-input"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button className="save-btn" onClick={() => saveEdit(index)}>Save</button>
              </div>
            ) : (
              <span className="task-text">
                {t.text}
              </span>
            )}
            <div className="task-actions">
              <button className="edit-btn" onClick={() => startEditing(index)}>Edit</button>
              <button className="delete-btn" onClick={() => removeTask(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}