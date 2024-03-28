import { useSelector } from "react-redux";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

export default function Upcoming() {
  const upComingTodos = useSelector((state) =>
    state.todo.todos.filter((todo) => todo.day === "upcoming")
  );
  const isOpen = useSelector((state) => state.todoForm.isOpen);

  return (
    <div className="w-full min-h-screen mx-auto">
      {isOpen && upComingTodos.length === 0 && <TodoForm day={"upcoming"} />}
      {isOpen && <TodoForm day={"upcoming"} />}
      <TodoList Todos={upComingTodos} day={"upcoming"} />
    </div>
  );
}
