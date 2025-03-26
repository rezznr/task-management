// src/pages/TaskPage.tsx
import { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import Button from "../components/Button";
import Input from "../components/Input";
import TaskList from "../components/TaskList";
import { FaPlus, FaCheck, FaInbox, FaRegClock, FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

const fadeIn = keyframes`
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  padding: 2rem 1rem;
  background: linear-gradient(135deg, #e0f7fa 0%, #bbdefb 100%);
  transition: background 0.3s ease;

  @media (max-width: 768px) {
    padding: 1rem 0.5rem;
  }
`;

const TaskContainer = styled.div`
  max-width: 800px;
  width: 95%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 2.5rem;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.6s ease;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    width: 92%;
    padding: 1.5rem;
  }
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 2.5rem;

  h1 {
    color: #2c3e50;
    font-size: clamp(1.8rem, 5vw, 2.5rem);
    margin-bottom: 0.5rem;
    font-weight: 700;
    letter-spacing: -0.5px;
  }

  p {
    color: #7f8c8d;
    font-size: clamp(0.9rem, 3vw, 1rem);
  }
`;

const TaskForm = styled.form`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const StyledInput = styled(Input)`
  background-color: #f8f9fa;
  color: inherit;
  border: 1px solid #dee2e6;
  transition: all 0.2s ease;
  font-size: 1rem;

  &:focus {
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 2rem;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const FilterButton = styled(Button)<{ active: boolean }>`
  background-color: ${(props) => (props.active ? "#4a90e2" : "#f1f1f1")};
  color: ${(props) => (props.active ? "white" : "#555")};
  border-radius: 20px;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex: 1;
  font-weight: ${(props) => (props.active ? "600" : "400")};
  border: ${(props) => (props.active ? "2px solid #3a80d2" : "none")};
  box-shadow: ${(props) =>
    props.active ? "0 4px 8px rgba(0,0,0,0.2)" : "none"};
  transform: ${(props) => (props.active ? "scale(1.05)" : "scale(1)")};

  &:hover {
    transform: translateY(-3px)
      ${(props) => (props.active ? "scale(1.05)" : "scale(1)")};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    background-color: ${(props) => (props.active ? "#5a9ee2" : "#e5e5e5")};
  }

  ${(props) =>
    props.active &&
    css`
      animation: ${pulse} 0.3s ease;
      position: relative;

      &:before {
        content: "";
        position: absolute;
        bottom: -8px;
        left: 50%;
        transform: translateX(-50%);
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: #3a80d2;
      }
    `}
`;

const TaskStats = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  color: #555;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  @media (max-width: 480px) {
    padding: 0.8rem 0.5rem;
  }
`;

const StatItem = styled.div`
  text-align: center;
  padding: 0 1rem;

  .number {
    font-size: clamp(1.2rem, 4vw, 1.5rem);
    font-weight: bold;
    color: #4a90e2;
  }

  .label {
    font-size: clamp(0.7rem, 2vw, 0.8rem);
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: #95a5a6;
  background-color: #f9f9f9;
  border-radius: 12px;
  transition: all 0.3s ease;

  h3 {
    margin-bottom: 1rem;
    font-size: clamp(1.1rem, 4vw, 1.3rem);
  }

  p {
    font-size: clamp(0.9rem, 3vw, 1rem);
  }

  svg {
    font-size: 3rem;
    margin-bottom: 1rem;
    opacity: 0.5;
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;

  @media (max-width: 480px) {
    justify-content: center;
  }
`;

const TaskPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [isLoading, setIsLoading] = useState(true);

  // Load tasks from localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }

    setIsLoading(false);
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks, isLoading]);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const newTaskObj = {
      id: Date.now().toString(),
      title: newTask,
      completed: false,
    };

    setTasks([...tasks, newTaskObj]);
    setNewTask("");
    toast.success("Task added successfully!");
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );

    const task = tasks.find((task) => task.id === id);
    if (task) {
      toast.info(task.completed ? "Task marked as active" : "Task completed!");
    }
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
    toast.error("Task deleted");
  };

  const clearCompletedTasks = () => {
    if (
      window.confirm("Are you sure you want to delete all completed tasks?")
    ) {
      setTasks(tasks.filter((task) => !task.completed));
      toast.info("Completed tasks cleared!");
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const activeTasks = tasks.filter((task) => !task.completed).length;
  const completedTasks = tasks.filter((task) => task.completed).length;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AppContainer>
      <TaskContainer>
        <Header>
          <h1>Task Management</h1>
          <p>Organize your day, boost your productivity</p>
        </Header>

        <TaskStats>
          <StatItem>
            <div className="number">{tasks.length}</div>
            <div className="label">Total</div>
          </StatItem>
          <StatItem>
            <div className="number">{activeTasks}</div>
            <div className="label">Active</div>
          </StatItem>
          <StatItem>
            <div className="number">{completedTasks}</div>
            <div className="label">Completed</div>
          </StatItem>
        </TaskStats>

        <TaskForm onSubmit={addTask}>
          <StyledInput
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="What do you need to do today?"
            autoFocus
          />
          <Button
            type="submit"
            disabled={!newTask.trim()}
            style={{
              backgroundColor: "#4a90e2",
              color: "white",
              transition: "all 0.3s ease",
              whiteSpace: "nowrap",
            }}
          >
            <FaPlus /> Add Task
          </Button>
        </TaskForm>

        <FilterContainer>
          <FilterButton
            variant="secondary"
            onClick={() => setFilter("all")}
            active={filter === "all"}
          >
            <FaInbox /> All
          </FilterButton>
          <FilterButton
            variant="secondary"
            onClick={() => setFilter("active")}
            active={filter === "active"}
          >
            <FaRegClock /> Active
          </FilterButton>
          <FilterButton
            variant="secondary"
            onClick={() => setFilter("completed")}
            active={filter === "completed"}
          >
            <FaCheck /> Completed
          </FilterButton>
        </FilterContainer>

        {filteredTasks.length > 0 ? (
          <TaskList
            tasks={filteredTasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        ) : (
          <EmptyState>
            {filter === "all" && <FaInbox size={40} />}
            {filter === "active" && <FaRegClock size={40} />}
            {filter === "completed" && <FaCheck size={40} />}
            <h3>
              {filter === "all"
                ? "Your task list is empty"
                : filter === "active"
                ? "No active tasks"
                : "No completed tasks"}
            </h3>
            <p>
              {filter === "all"
                ? "Add your first task to get started!"
                : filter === "active"
                ? "Completed all tasks? Great job!"
                : "Complete some tasks to see them here"}
            </p>
          </EmptyState>
        )}

        {completedTasks > 0 && (
          <ActionsContainer>
            <Button
              variant="danger"
              onClick={clearCompletedTasks}
              style={{
                backgroundColor: "#ff5252",
                transition: "all 0.3s ease",
              }}
            >
              <FaTrash /> Clear Completed
            </Button>
          </ActionsContainer>
        )}
      </TaskContainer>

      <ToastContainer position="bottom-right" autoClose={3000} theme="light" />
    </AppContainer>
  );
};

export default TaskPage;
