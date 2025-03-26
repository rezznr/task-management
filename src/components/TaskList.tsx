// src/components/TaskList.tsx
import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import { motion, AnimatePresence } from "framer-motion";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskListContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0;
  max-width: 800px;
  width: 100%;
`;

const TaskItem = styled(motion.li)<{ completed: boolean }>`
  display: flex;
  align-items: center;
  padding: 1rem;
  margin: 0.75rem 0;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 0.8rem;
  }

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }
`;

const TaskContent = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  margin-right: 1rem;
  width: 100%;

  @media (max-width: 768px) {
    margin-bottom: 0.5rem;
  }
`;

const CustomCheckbox = styled.div<{ checked: boolean }>`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 2px solid ${({ checked }) => (checked ? "#4CAF50" : "#ced4da")};
  background-color: ${({ checked }) => (checked ? "#4CAF50" : "transparent")};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;

  &:hover {
    border-color: #4caf50;
  }

  &:after {
    content: "✓";
    color: white;
    display: ${({ checked }) => (checked ? "block" : "none")};
    font-size: 14px;
  }
`;

const TaskText = styled.span<{ completed: boolean }>`
  margin: 0 1rem;
  transition: all 0.3s;
  font-size: 1.1rem;
  text-decoration: ${({ completed }) => (completed ? "line-through" : "none")};
  color: ${({ completed }) => (completed ? "#6c757d" : "#212529")};
  word-break: break-word;
  flex-grow: 1;
`;

const ActionButtons = styled.div`
  display: flex;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-end;
  }
`;

const StyledButton = styled(Button)`
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: #6c757d;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const EmptyStateIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle, onDelete }) => {
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    if (deleteId === id) {
      onDelete(id);
      setDeleteId(null);
    } else {
      setDeleteId(id);
    }
  };

  if (tasks.length === 0) {
    return (
      <EmptyState>
        <EmptyStateIcon>📝</EmptyStateIcon>
        <h3>Belum ada tugas</h3>
        <p>Tambahkan tugas pertama Anda untuk mulai!</p>
      </EmptyState>
    );
  }

  return (
    <TaskListContainer>
      <AnimatePresence>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            completed={task.completed}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0, margin: 0 }}
            transition={{ duration: 0.3 }}
          >
            <TaskContent>
              <CustomCheckbox
                checked={task.completed}
                onClick={() => onToggle(task.id)}
                aria-label={`Mark task "${task.title}" as ${
                  task.completed ? "incomplete" : "complete"
                }`}
              />
              <TaskText completed={task.completed}>{task.title}</TaskText>
            </TaskContent>
            <ActionButtons>
              <StyledButton
                variant={deleteId === task.id ? "danger" : "secondary"}
                onClick={() => handleDelete(task.id)}
                aria-label={`Delete task "${task.title}"`}
              >
                {deleteId === task.id ? "Confirm Delete" : "Delete"}
              </StyledButton>
            </ActionButtons>
          </TaskItem>
        ))}
      </AnimatePresence>
    </TaskListContainer>
  );
};

export default TaskList;
