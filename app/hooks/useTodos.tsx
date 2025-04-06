import type { AxiosResponse } from 'axios';
import React from 'react';
import useSWR from 'swr';
import ax from '~/libs/client';

interface Todo {
  todo_id: number;
  title: string;
  description: string;
  is_completed: boolean;
  due_date: string;
  tags: string[];
}

interface NewTodo extends Omit<Todo, 'todo_id' | 'is_completed' | 'tags'> {}

export function useTodos() {
  const { data, error, isLoading } = useSWR(`/v1/todos`, fetchTodos);

  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [newTodo, setNewTodo] = React.useState<NewTodo>({
    title: '',
    description: '',
    due_date: '',
  });

  React.useEffect(() => {
    if (data && JSON.stringify(data) !== JSON.stringify(todos)) {
      setTodos(data);
    }
  }, [data]);

  function handleToggleTodo(id: number) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.todo_id === id ? { ...todo, is_completed: !todo.is_completed } : todo
      )
    );
  }

  async function handleAddTodo(e: React.FormEvent) {
    e.preventDefault();

    const payload: NewTodo = {
      title: newTodo.title,
      description: newTodo.description,
      due_date: new Date(newTodo.due_date).toISOString(),
    };

    try {
      const createdTodo = await createTodo(payload);
      setTodos([...todos, createdTodo]);
      setNewTodo({ title: '', description: '', due_date: '' });
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  }

  function handleDeleteTodo(id: number) {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.todo_id !== id));
  }

  function handleEditTodo(id: number) {
    // Implement edit logic here
    console.log(`Edit todo with id ${id}`);
  }

  return {
    todos,
    error,
    isLoading,
    newTodo,
    setNewTodo,
    handleToggleTodo,
    handleAddTodo,
    handleDeleteTodo,
    handleEditTodo,
  };
}

async function fetchTodos(url: string) {
  const res = await ax.get(url);
  return res.data;
}

async function createTodo(todo: NewTodo): Promise<Todo> {
  const response = await ax.post('/v1/todos', todo);
  return response.data;
}
