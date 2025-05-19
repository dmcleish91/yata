import React from 'react';
import { toast } from 'sonner';
import useSWR, { mutate } from 'swr';
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
  const {
    data: todosRaw,
    error,
    isLoading,
  } = useSWR(APIEndpoints.TODOS, fetchData<Todo[]>);

  const todos: Todo[] = Array.isArray(todosRaw) ? todosRaw : [];

  const [editTodoID, setEditTodoID] = React.useState<number | null>(null);
  const [todo, setTodo] = React.useState<NewTodo>({
    todo_id: -1,
    title: '',
    description: '',
    due_date: new Date().toISOString().split('T')[0],
  });

  function handleToggleTodo(id: number) {
    mutate(
      APIEndpoints.TODOS,
      (currentTodos: Todo[] = []) =>
        currentTodos.map((todo) =>
          todo.todo_id === id ? { ...todo, is_completed: !todo.is_completed } : todo
        ),
      false
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

    setTodo({
      todo_id: -1,
      title: '',
      description: '',
      due_date: new Date().toISOString().split('T')[0],
    });

    if (editTodoID) {
      const previousTodos = todos;
      const optimisticUpdatedTodos = todos.map((todo) =>
        todo.todo_id === editTodoID ? { ...todo, ...payload } : todo
      );

      mutate(APIEndpoints.TODOS, optimisticUpdatedTodos, false);

      try {
        const response = await editResource<NewTodo, Todo>(
          APIEndpoints.EDIT_TODOS,
          payload
        );
        const updatedTodo = response.data;
        mutate(
          APIEndpoints.TODOS,
          (currentTodos: Todo[] = []) =>
            currentTodos.map((todo) =>
              todo.todo_id === updatedTodo.todo_id ? updatedTodo : todo
            ),
          false
        );
        setEditTodoID(null);
        toast.success('Todo successfully edited');
      } catch (error) {
        mutate(APIEndpoints.TODOS, previousTodos, false);
        setTodo(payload);
        handleError(error);
      }
    } else {
      const previousTodos = todos;
      const optimisticNewTodo: Todo = {
        ...payload,
        todo_id: Date.now(),
        is_completed: false,
        tags: [],
      };

      mutate(APIEndpoints.TODOS, [optimisticNewTodo, ...todos], false);

      try {
        const response = await createResource<NewTodo, Todo>(APIEndpoints.TODOS, payload);
        const createdTodo = response.data;
        mutate(
          APIEndpoints.TODOS,
          (currentTodos: Todo[] = []) => [
            createdTodo,
            ...currentTodos.filter((todo) => todo.todo_id !== optimisticNewTodo.todo_id),
          ],
          false
        );
        toast.success('Todo successfully added');
      } catch (error) {
        mutate(APIEndpoints.TODOS, previousTodos, false);
        setTodo(payload);
        handleError(error);
      }
    }
  }

  async function handleDeleteTodo(id: number) {
    const previousTodos = todos;
    mutate(
      APIEndpoints.TODOS,
      (currentTodos: Todo[] = []) => currentTodos.filter((todo) => todo.todo_id !== id),
      false
    );

    try {
      const wasSuccessful = await deleteResource(APIEndpoints.DELETE_TODOS(id));
      if (!wasSuccessful) {
        throw new Error('Failed to delete todo');
      }
      toast.success('Successfully deleted entry');
    } catch (error) {
      mutate(APIEndpoints.TODOS, previousTodos, false);
      toast.error('Error deleting todo');
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
