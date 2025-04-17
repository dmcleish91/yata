import type { AxiosResponse } from 'axios';
import React from 'react';
import { toast } from 'sonner';
import useSWR from 'swr';
import ax from '~/libs/client';

type APIResponse<T> = {
  message: string;
  data: T;
};

export type Todo = {
  todo_id: number;
  title: string;
  description: string;
  is_completed: boolean;
  due_date: string;
  tags: string[];
};

type NewTodo = Omit<Todo, 'is_completed' | 'tags'>;

export function useTodos() {
  const { data, error, isLoading } = useSWR(`/v1/todos`, fetchTodos);

  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [editTodoID, setEditTodoID] = React.useState<number | null>(null);
  const [todo, setTodo] = React.useState<NewTodo>({
    todo_id: -1,
    title: '',
    description: '',
    due_date: new Date().toISOString().split('T')[0],
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
      todo_id: editTodoID || -1,
      title: todo.title,
      description: todo.description,
      due_date: new Date(todo.due_date).toISOString(),
    };

    if (editTodoID) {
      const response = await editTodo(payload);
      const updatedTodo = response.data;
      const updatedTodos = todos.map((todo) =>
        todo.todo_id === updatedTodo.todo_id ? updatedTodo : todo
      );
      setTodos(updatedTodos);
      setEditTodoID(null);
      setTodo({ todo_id: -1, title: '', description: '', due_date: '' });
    } else {
      try {
        const response = await createTodo(payload);
        const createdTodo = response.data;
        setTodos([...todos, createdTodo]);
        setTodo({ todo_id: -1, title: '', description: '', due_date: '' });
      } catch (error) {
        console.error('Failed to add todo:', error);
      }
    }
  }

  async function handleDeleteTodo(id: number) {
    const wasSuccessful = await deleteTodo(id);
    if (wasSuccessful) {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.todo_id !== id));
      toast.success('sucessfully deleted entry');
    } else {
      toast.error('error deleting todo');
    }
  }

  function clearEditAndResetTodo() {
    setEditTodoID(null);
    setTodo({ todo_id: -1, title: '', description: '', due_date: '' });
  }

  function handleEditTodo(id: number) {
    const todoToEdit = todos.find((todo) => {
      return id === todo.todo_id;
    });

    if (todoToEdit) {
      setEditTodoID(id);
      setTodo({
        todo_id: id,
        title: todoToEdit?.title,
        description: todoToEdit?.description,
        due_date: todoToEdit?.due_date.split('T')[0],
      });
    } else {
      toast.error('Unable to edit todo');
    }
  }

  return {
    todos,
    error,
    isLoading,
    todo,
    editTodoID,
    setTodo,
    handleToggleTodo,
    handleAddTodo,
    handleDeleteTodo,
    handleEditTodo,
    clearEditAndResetTodo,
  };
}

async function fetchTodos(url: string) {
  const res = await ax.get(url);
  return res.data;
}

async function createTodo(todo: NewTodo): Promise<APIResponse<Todo>> {
  const response = await ax.post('/v1/todos', todo);
  return response.data;
}

async function editTodo(todo: NewTodo): Promise<APIResponse<Todo>> {
  const response = await ax.post<APIResponse<Todo>>(`/v1/editTodo`, todo);
  return response.data;
}

async function deleteTodo(todo_id: number): Promise<boolean> {
  const response = await ax.delete(`/v1/todos?todo_id=${todo_id}`);
  return response.data.rows_affected === 1;
}
