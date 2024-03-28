import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  isOpen: false,
  isClosed: false,
  isUpdateForm: false,
  showNotification: false,
  todoTitle: "",
  notificationTime: "",
};

const todoFormSlice = createSlice({
  name: "todoForm",
  initialState: initialValue,
  reducers: {
    openForm: (state) => {
      state.isOpen = true;
    },
    closeForm: (state) => {
      state.isOpen = false;
    },
    closeUpdateForm: (state) => {
      state.isUpdateForm = !state.isUpdateForm;
    },
    setNotification: (state) => {
      state.showNotification = !state.showNotification;
    },
    setTodoTitle: (state, action) => {
      state.todoTitle = action.payload;
    },
    setNotificationTime: (state, action) => {
      state.notificationTime = action.payload;
    },
  },
});

export const {
  openForm,
  closeForm,
  closeUpdateForm,
  setNotification,
  setTodoTitle,
  setNotificationTime,
} = todoFormSlice.actions;
export default todoFormSlice.reducer;
