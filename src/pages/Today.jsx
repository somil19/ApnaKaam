import { useSelector } from "react-redux";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import Welcome from "./Welcome";
import Greeting from "../components/Greeting";

export default function Today() {
  const todayTodos = useSelector((state) =>
    state.todo.todos.filter((todo) => todo.day === "today")
  );
  const isOpen = useSelector((state) => state.todoForm.isOpen);

  return (
    <div className="w-full min-h-screen mx-auto bg-gray-100">
      {todayTodos.length > 0 && <Greeting />}
      {!isOpen && todayTodos.length === 0 && <Welcome />}
      {todayTodos.length === 0 && isOpen && <TodoForm day={"today"} />}
      {todayTodos.length > 0 && (
        <TodoList todayTodos={todayTodos} day={"today"} />
      )}
      {isOpen && <TodoForm day={"today"} />} {/* Corrected line */}
    </div>
  );
}
