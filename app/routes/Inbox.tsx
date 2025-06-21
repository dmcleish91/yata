import type { Route } from "../+types/root";
import { ViewPort } from "~/components/ViewPort";
import TaskList from "~/components/task/TaskList";
import TaskModal from "~/components/task/TaskModal";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "YATA" },
    { name: "description", content: "Welcome to Yet Another Todo App!" },
  ];
}

export default function Home() {
  return (
    <ViewPort>
      <TaskList />
      <TaskModal />
    </ViewPort>
  );
}
