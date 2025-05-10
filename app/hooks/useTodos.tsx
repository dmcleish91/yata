import React from 'react';
import { toast } from 'sonner';
import useSWR from 'swr';
import { APIEndpoints } from '~/constants/api';
import {
  createResource,
  deleteResource,
  editResource,
  fetchData,
} from '~/libs/httpMethods';
import { handleError } from '~/libs/handleError';
import type { NewTodo, Todo } from '~/types/todo';

export function useTodos() {
  const { data, error, isLoading } = useSWR(APIEndpoints.TODOS, fetchData<Todo[]>);

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
      const response = await editResource<NewTodo, Todo>(
        APIEndpoints.EDIT_TODOS,
        payload
      );
      const updatedTodo = response.data;
      const updatedTodos = todos.map((todo) =>
        todo.todo_id === updatedTodo.todo_id ? updatedTodo : todo
      );
      setTodos(updatedTodos);
      setEditTodoID(null);
      setTodo({ todo_id: -1, title: '', description: '', due_date: '' });
    } else {
      try {
        const response = await createResource<NewTodo, Todo>(APIEndpoints.TODOS, payload);
        const createdTodo = response.data;
        setTodos([...todos, createdTodo]);
        setTodo({ todo_id: -1, title: '', description: '', due_date: '' });
      } catch (error) {
        handleError(error);
      }
    }
  }

  async function handleDeleteTodo(id: number) {
    const wasSuccessful = await deleteResource(APIEndpoints.DELETE_TODOS(id));
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
