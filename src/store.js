import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./features/Todo/todoSlice";
import signUpReducer from "./pages/signUpSlice";
import todoFormReducer from "./features/Todo/todoFormSlice";

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    signUp: signUpReducer,
    todoForm: todoFormReducer,
  },
});
